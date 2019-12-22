async function Send() {

  let stat = document.getElementById("one");
  
  // let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let pass = document.getElementById('password').value;

  let obj = {
    "email": email,
    "password": pass
    // "name": name
  }
  console.log(obj)

  let response = await fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then((response) => {
    console.log(response.headers);
  })
  .then((response) => console.log(response.json()) ); 

  /* fetch('http://localhost:3000/api/users/login', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });

  console.log(response.status +"--" +response.headers.get('x-auth-token'));*/

}

let form = document.getElementById("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  Send();
});