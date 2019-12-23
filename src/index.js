import './assets/styles/scss.scss';
import login from './scripts/logIn.js';

window.onload = () => {
  console.log(localStorage.token);
  if (localStorage) {
    console.log(localStorage.token);
    SendCurrent();
  } else {
    let firstPage = new login(container);
    firstPage.createPage();
  }
}

async function SendCurrent() {
  let response = await fetch('http://localhost:3000/api/users/current', {
    headers: {
      "x-access-token": localStorage.token
    }
  });
  if (response.status === 200) {
    document.body.innerHTML = 'You have entered in your account';
  }
  console.log(response)
}