import { createAsyncThunk } from "@reduxjs/toolkit";

async function getGameId() {

  const response = await fetch(
    "https://adivina-palabra.fly.dev/new/",
    { method: 'POST' }
  )

  if (!response.ok) throw response.status

  const id = await response.json()

  return id
}

async function checkTheWord(word) {
  const response = await fetch(
    `https://adivina-palabra.fly.dev/check/${word}`,
    { method: 'GET' }
  )

  if (!response.ok) throw response.status

  const isValid = await response.json()

  return isValid
}


async function checkEachLetter(objectData) {

  let data = { "position": objectData.position, "letter": objectData.letter }

  // try {
  //   const response = await fetch(
  //     `https://adivina-palabra.fly.dev/guess/${objectData.id}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     }
  //   )
  //   return await response.json()

  // } catch (error) {
  //   throw error
  // }

  const response = await fetch(
    `https://adivina-palabra.fly.dev/guess/${objectData.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )

  if (!response.ok) throw response.status

  return await response.json()

}


async function checkTheLetters(arrayData) { /*Sin implementar! es copia y pega*/

  return Promise.all(arrayData.map((objectData) => {
    return checkEachLetter(objectData)
  }))

}

const checkLetters = createAsyncThunk(
  "word/custom",
  checkTheLetters
)

const checkWord = createAsyncThunk(
  "error/custom",
  checkTheWord
)

const startGame = createAsyncThunk(
  "game/custom",
  getGameId
)

export { startGame, checkWord, checkLetters }  