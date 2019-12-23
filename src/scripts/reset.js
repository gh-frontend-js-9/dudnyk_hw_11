import CreatePage from "./createPage";
import SignUpPage from './signUp.js';
import LogInPage from './logIn.js';

import {isFilled, validEmail, validPassword, validPasswords} from './validation.js'

export default class CreateResetPasswordPage extends CreatePage{
    createPage() {
        let title = this.addTitle('Reset password');
        
        let signUpAnchor = this.addLink('Not a member?');
        signUpAnchor.addEventListener('click', () => {
            this.root.innerHTML = '';
            let page = new SignUpPage(container);
            page.createPage();
        })

        let form = this.addForm('localhost:3000/api/users/reset_password', 'POST', 'form');

        let email = this.addInput('email', 'email', 'email', 'input', 'Email');
        let password = this.addInput('password', 'password', 'password','input', 'Password');
        let confirmationPassword = this.addInput('password', 'password', 'confirm-password','input', 'Confirmation password');

        let subm = this.addSubmit('Sign Up');
        
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            validEmail(email);
            validPassword(password);
            validPasswords(password, confirmationPassword)
            if (isFilled(email, password, confirmationPassword)) {
                Send();
                this.root.innerHTML = '';
                let page = new LogInPage(container);
                page.createPage();
            }
        });

        this.root.append(title);
        this.root.append(signUpAnchor);
        form.append(email);
        form.append(password);
        form.append(confirmationPassword);
        form.append(subm);
        this.root.append(form);
    }
}

async function Send() {
    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;
    let confirmationPassword = document.getElementById('confirm-password').value;

    let obj = {
    'password': password,
    'confirmationPassword': confirmationPassword,
    'email': email
    }
    
    console.log(obj)
    
    let response = await fetch('http://localhost:3000/api/users/reset_password', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .then((response) => {
    console.log(response);
    console.log(response.headers.get('x-auth-token'))
    })
}