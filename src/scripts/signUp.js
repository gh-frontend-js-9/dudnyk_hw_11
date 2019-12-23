import CreatePage from './createPage';
import LogInPage from './logIn.js';

import {isFilled, validEmail, validPassword, validName} from './validation.js'

export default class CreateSignUpPage extends CreatePage{
    createPage() {
        let title = this.addTitle('Sign Up');
        
        let form = this.addForm('http://localhost:3000/api/users', 'POST', 'form')
        
        let logInAnchor = this.addLink("Existing member?");
        
        logInAnchor.addEventListener('click', () => {
            this.root.innerHTML = '';
            let page = new LogInPage(container);
            page.createPage();
        })
        
        let email = this.addInput('email', 'email', 'email', 'input', 'Email');
        let password = this.addInput('password', 'password', 'password','input', 'Password')
        let name = this.addInput('text', 'name', 'name', 'input', 'Name')

        let subm = this.addSubmit('Sign Up');

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            validEmail(email);
            validPassword(password);
            validName(name);
            
            if (isFilled(email, password, name)) {
                Send();
            }
        });

        this.root.append(title);
        this.root.append(logInAnchor);

        form.append(email);
        form.append(password);
        form.append(name);
        form.append(subm);

        this.root.append(form);
    }
}

async function Send() {
    let email = document.getElementById("email").value;
    let password = document.getElementById('password').value;
    let name = document.getElementById('name').value;

    let obj = {
    'email': email,
    'password': password,
    'name': name
    }
    
    console.log(obj)
    
    let response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
    })
    .then((response) => {
    console.log(response);
    console.log(response.headers.get('x-auth-token'));
    document.body.innerHTML = 'You have created an account'
    })
}