import './style.css';

const displayScore = document.querySelector('#display-score');
const scoreForm = document.querySelector('#add-score-form');
const refreshBtn = document.querySelector('.refresh-btn');

const createNewGame = async () => {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Code Mode',
      }),
    },
  );
};

const submitScoreToApi = async (userName, userScore) => {
  const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/GpRLcTphddAlZCSJitez/scores/';
  await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: userName,
      score: userScore,
    }),
  });
};

const fetchScores = async () => {
  const URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/GpRLcTphddAlZCSJitez/scores/';
  const response = await fetch(URL);

  const data = await response.json();

  displayScore.innerHTML = '';
  data.result.forEach((e) => {
    displayScore.innerHTML += `<li>${e.user}: ${e.score}</li>`;
  });
};

const clearFields = () => {
  const clear = document.querySelectorAll('input');
  clear.forEach((e) => {
    e.value = '';
  });
};

refreshBtn.addEventListener('click', () => {
  fetchScores();
});

window.addEventListener('load', () => {
  fetchScores();
});

document
  .querySelector('#add-score')
  .addEventListener('click', async (event) => {
    const userName = scoreForm.querySelector('#user-name').value;
    const userScore = scoreForm.querySelector('#user-score').value;
    if (event.target.classList.contains('add-score-btn')) {
      event.preventDefault();
      await submitScoreToApi(userName, userScore);
      clearFields();
      fetchScores();
    }
  });

createNewGame();
