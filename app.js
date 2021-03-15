class Form {
    constructor() {
        this.DOMElements = {
            form: document.querySelector('form'),
            inputs: document.querySelectorAll('input'),
            errors: document.querySelectorAll('.error'),
            fname: document.querySelector('#fname'),
            lname: document.querySelector('#lname'),
            email: document.querySelector('#email'),
            passw: document.querySelector('#passw'),
        };
        this.regEx = {
            fname: /^[a-zA-Z ]+$/,
            lname: /^[a-zA-Z ]+$/,
            email: /^[a-zA-z0-9._]+@[a-zA-z0-9._]+\.[a-zA-z0-9]{2,4}$/,
            passw: /^[a-zA-z0-9~!@#$%^&*()-=_+,./<>?;':"`]{8,20}$/,
        };
        this.errorMessages = {
            fname: 'Enter a correct name',
            lname: 'Enter a correct last name',
            email: 'Enter a correct email address',
            passw: 'Password length between 8 - 20 characters',
        };
    }
    validate() {
        this.validateForm();
        this.validateFname();
        this.validateLname();
        this.validateEmail();
        this.validatePassw();
    }
    validateForm() {
        this.DOMElements.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emptyInputs = [...this.DOMElements.inputs].filter((input) => {
                if (!input.value) return input;
            });
            emptyInputs.forEach((input) => {
                this.DOMElements.errors.forEach((error) => {
                    if (error.classList.contains(input.id)) {
                        error.innerHTML = `${input.placeholder} cannot be empty`;
                        error.classList.add('active');
                    }
                });
            });
            if (
                this.validateFname() &&
                this.validateLname() &&
                this.validateEmail() &&
                this.validatePassw()
            ) {
                this.formData = new FormData(e.target);
                alert(
                    `First Name: ${this.formData.get(
                        'fname'
                    )}\nLast Name: ${this.formData.get(
                        'lname'
                    )}\nEmail: ${this.formData.get(
                        'email'
                    )}\nPassword: ${this.formData.get('passw')}`
                );
                this.DOMElements.form.submit();
                this.DOMElements.form.reset();
            }
        });
    }
    validateFname() {
        this.DOMElements.fname.addEventListener('input', () => {
            if (this.DOMElements.fname.value.match(this.regEx.fname)) {
                this.searchError('fname').classList.remove('active');
            } else {
                this.searchError('fname').classList.add('active');
                this.searchError('fname').innerHTML = this.errorMessages.fname;
            }
        });
        return this.DOMElements.fname.value.match(this.regEx.fname)
            ? true
            : false;
    }
    validateLname() {
        this.DOMElements.lname.addEventListener('input', () => {
            if (this.DOMElements.lname.value.match(this.regEx.lname)) {
                this.searchError('lname').classList.remove('active');
            } else {
                this.searchError('lname').classList.add('active');
                this.searchError('lname').innerHTML = this.errorMessages.lname;
            }
        });
        return this.DOMElements.lname.value.match(this.regEx.lname)
            ? true
            : false;
    }
    validateEmail() {
        this.DOMElements.email.addEventListener('input', () => {
            if (this.DOMElements.email.value.match(this.regEx.email)) {
                this.searchError('email').classList.remove('active');
                return true;
            } else {
                this.searchError('email').classList.add('active');
                this.searchError('email').innerHTML = this.errorMessages.email;
            }
        });
        return this.DOMElements.email.value.match(this.regEx.email)
            ? true
            : false;
    }
    validatePassw() {
        this.DOMElements.passw.addEventListener('input', () => {
            if (this.DOMElements.passw.value.match(this.regEx.passw)) {
                this.searchError('passw').classList.remove('active');
                return true;
            } else {
                this.searchError('passw').classList.add('active');
                this.searchError('passw').innerHTML = this.errorMessages.passw;
            }
        });
        return this.DOMElements.passw.value.match(this.regEx.passw)
            ? true
            : false;
    }
    searchError(element) {
        let e = undefined;
        this.DOMElements.errors.forEach((error) => {
            if (error.classList.contains(`${element}`)) {
                e = error;
            }
        });
        return e;
    }
}

const F = new Form();
F.validate();
