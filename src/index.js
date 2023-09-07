import "./style.css";

const scoreForm = document.querySelector("#add-score-form");
const userName = scoreForm.querySelector("#user-name").value;
const userScore = scoreForm.querySelector("#user-score").value;
const addScoreBtn = scoreForm.querySelector(".add-score-btn");
const refreshBtn = document.querySelector(".refresh-btn");

async function createNewGame() {
  const response = await fetch(
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Code Mode",
        user: userName,
        score: userScore,
      }),
    }
  );

  if (response) {
    const result = await response.json();
    const startIndex =
      result.result.indexOf("Game with ID: ") + "Game with ID: ".length;
    const endIndex = result.result.indexOf(" added.");

    const gameId = result.result.substring(startIndex, endIndex);
    return gameId;
  } else {
    console.error("Request failed with status:", response.status);
  }
}

let gameId = await createNewGame();

async function refreshScores() {
  let URL =
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/" +
    gameId +
    "/scores/";
  const response = await fetch(URL);

  if (response) {
    const scores = await response.json();
    console.log(scores);
  } else {
    console.error("Request failed with status:", response.status);
  }
}

refreshScores();
