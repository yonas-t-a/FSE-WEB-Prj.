const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const passwordCriteria = document.getElementById('passwordCriteria');
const lengthCriteria = document.getElementById('lengthCriteria');
const uppercaseCriteria = document.getElementById('uppercaseCriteria');
const lowercaseCriteria = document.getElementById('lowercaseCriteria');
const numberCriteria = document.getElementById('numberCriteria');
const specialCharCriteria = document.getElementById('specialCharCriteria');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

password.addEventListener('input', e => {
    validatePasswordCriteria(e.target.value);
});

password2.addEventListener('input', e => {
    validatePasswordMatch();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const usernameValue = username ? username.value.trim() : null;
    const password2Value = password2 ? password2.value.trim() : null;

    if (username) {
        if (usernameValue === '') {
            setError(username, 'Name is required');
        } else {
            setSuccess(username);
        }
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (!isPasswordValid(passwordValue)) {
        setError(password, 'Password does not meet the criteria');
    } else {
        setSuccess(password);
    }

    if (password2) {
        if (password2Value === '') {
            setError(password2, 'Please confirm your password');
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords don't match");
        } else {
            setSuccess(password2);
        }
    }
};

const isPasswordValid = password => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

    return length && uppercase && lowercase && number && specialChar;
};

const validatePasswordCriteria = password => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

    updateCriteria(lengthCriteria, length);
    updateCriteria(uppercaseCriteria, uppercase);
    updateCriteria(lowercaseCriteria, lowercase);
    updateCriteria(numberCriteria, number);
    updateCriteria(specialCharCriteria, specialChar);
};

const updateCriteria = (element, isValid) => {
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
    }
};

const validatePasswordMatch = () => {
    if (password2.value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2.value !== password.value) {
        setError(password2, "Passwords don't match");
    } else {
        setSuccess(password2);
    }
};






