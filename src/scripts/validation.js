export function isFilled(...inps) {
    return !inps.some(inp => inp.style.borderColor === 'red')
}

export function validEmail(inp) {
    if (!isValidEmail(inp.value) && inp.style.borderColor !==  'red') { 
        required(inp, 'Email must be greater than 8 and less than 255');

    } else if (inp.style.borderColor === 'red') {
        inp.style.border = '1px solid black';
        inp.nextSibling.remove()
    }
}

export function validPassword(inp) {
    if (inp.value.length < 8 && inp.style.borderColor !==  'red') {
        required(inp, 'Password must be greater than 8 and less than 255');

    } else if (inp.style.borderColor === 'red') {
        inp.style.border = '1px solid black';
        inp.nextSibling.remove()
    }
}

export function validName(inp) {
    if (!inp.value && inp.style.borderColor !== 'red') {
        required(inp, 'Must be filled')

    } else if (inp.style.borderColor === 'red') {
        inp.style.border = '1px solid black';
        inp.nextSibling.remove()
    } 
}

export function validPasswords(pass1, pass2) {
    if (pass1.value !== pass2.value && pass2.style.borderColor !== 'red') {
        required(pass2, 'Does not match password')

    } else if (pass2.style.borderColor === 'red') {
        pass2.style.border = '1px solid black';
        pass2.nextSibling.remove()
    }
    
}

function required(element, text) {
    element.style.border = '1px solid red';
    let explanation = document.createElement('p');
    explanation.style.color = 'red';
    explanation.style.fontSize = '12px';
    explanation.textContent = text
    element.after(explanation)
}

function isValidEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email) && 8 < email.length && email.length < 255;
}