import './style.css';

const submitForm = document.querySelector('form');
const refreshBtn = document.querySelector('.refresh');
const ul = document.querySelector('ul');
const ID = 'tpNceP8w2wNQwoM978fc';
const baseURl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

const postData = async (data = {}) => {
  const postedData = await fetch(`${baseURl}/${ID}/scores`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return postedData.json();
};

const getData = async () => {
  const data = await fetch(`${baseURl}/${ID}/scores`);
  return data.json();
};

const displayData = async () => {
  const data = await getData();
  ul.innerHTML = '';
  data.result.forEach((obj) => {
    ul.innerHTML += `<li>${obj.user}: ${obj.score}</li>`;
  });
};

// listners
document.addEventListener('DOMContentLoaded', displayData);

submitForm.addEventListener('submit', (e) => {
  const user = document.querySelector('.user').value;
  const score = document.querySelector('.score').value;
  e.preventDefault();
  postData({ user, score });
  submitForm.reset();
});

refreshBtn.addEventListener('click', displayData);
