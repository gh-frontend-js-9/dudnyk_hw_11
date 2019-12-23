import CreatePage from './createPage.js';
import SignUpPage from './signUp.js';
import ResetPage from './reset.js';

import {isFilled, validEmail, validPassword} from './validation.js'

export default class CreateLogInPage extends CreatePage{
    createPage() {
        let form = this.addForm('http://localhost:3000/api/users/login', 'POST', 'form');
        
        let title = this.addTitle('Log In');

        let singUpAnchor = this.addLink('Not a member?');
        
        singUpAnchor.addEventListener('click', () => {
            this.root.innerHTML = '';
            let page = new SignUpPage(container);
            page.createPage();
        })

        let email = this.addInput('text', 'email', 'email', 'input', 'Email')
        let password = this.addInput('password', 'password', 'password','input', 'Password')

        let subm = this.addSubmit("Log In");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            
            validEmail(email)
            validPassword(password);

            if (isFilled(email, password)) {
                Send();
            }
        });

        let forgotPasswordAnchor =  this.addLink('Forgot Password?');
        forgotPasswordAnchor.style.alignSelf = 'center';
        forgotPasswordAnchor.addEventListener('click', () => {
            this.root.innerHTML = '';
            let page = new ResetPage(container);
            page.createPage();
        })

        this.root.append(title);
        this.root.append(singUpAnchor);
        form.append(email);
        form.append(password);
        form.append(subm);
        this.root.append(form);
        this.root.append(forgotPasswordAnchor);
    }
}

async function Send() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById('password').value;

    let obj = {
    "email": email,
    "password": pass
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
        if (response.status !== 200 && document.getElementsByClassName('badresponse').length < 1) {
            let badResponse = document.createElement('p');
            badResponse.setAttribute('class', 'badresponse');
            badResponse.textContent = 'Password or email is wrong';
            document.body.after(badResponse);
        } else {
            document.body.innerHTML = 'You have entered in your account';

        }
        if (response.status === 200) {
            localStorage.setItem('token', response.headers.get('x-auth-token'))
        }
        console.log(response);
        console.log(response.headers.get('x-auth-token'))
    })
}
