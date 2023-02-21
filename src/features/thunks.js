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


async function checkTheLetters(arrayWithLetters, gameId) { 

  let lettersWithIndex = arrayWithLetters.map((letter, index) => {
    return {
      "position": index,
      "letter": letter.toLowerCase(),
      "id": gameId
    }
  })

  return Promise.all(lettersWithIndex.map((letterAndIndex) => {
    return checkEachLetter(letterAndIndex)
  }))

}

async function checkTheWord(objectWordAndId) {

  const response = await fetch(
    `https://adivina-palabra.fly.dev/check/${objectWordAndId.word.join('')}`,
    { method: 'GET' }
  )

  const objectResponse = await getObjectResponseValidated(response)

  if (!objectResponse.valid) {
    throw 'La palabra no está en la lista'
  }

  return await checkTheLetters(objectWordAndId.word, objectWordAndId.id)
}

const checkWord = createAsyncThunk(
  "wordle/fetchWord",
  checkTheWord
)

const startGame = createAsyncThunk(
  "wordle/fetchGameId",
  getGameId
)

export { startGame, checkWord }  