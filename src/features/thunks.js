import { createAsyncThunk } from "@reduxjs/toolkit";

async function getObjectResponseValidated(response) {
  if (!response.ok) throw response.status

  const objectResponse = await response.json()

  if (objectResponse.error) throw objectResponse.error

  return objectResponse
}

async function getGameId() {

  const response = await fetch(
    "https://adivina-palabra.fly.dev/new/",
    { method: 'POST' }
  )
  
  return await getObjectResponseValidated(response)
}

async function checkTheWord(word) {
  const response = await fetch(
    `https://adivina-palabra.fly.dev/check/${word}`,
    { method: 'GET' }
  )

  return await getObjectResponseValidated(response)
}


async function checkEachLetter(letterAndIndex) {

  let data = { "position": letterAndIndex.position, "letter": letterAndIndex.letter }

  const response = await fetch(
    `https://adivina-palabra.fly.dev/guess/${letterAndIndex.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )

  return await getObjectResponseValidated(response)
}


async function checkTheLetters(lettersWithIndex) { 

  return Promise.all(lettersWithIndex.map((letterAndIndex) => {
    return checkEachLetter(letterAndIndex)
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