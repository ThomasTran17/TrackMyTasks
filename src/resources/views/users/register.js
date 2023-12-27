"use strict";

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

const URL_IMAGE_DEFAULT = "abcd";

function start() {
    let main = $("#register");
    main.innerHTML = `
        <div> Hello world, we are Horizon </div>
        <div> Now, we will create register form </div>
        <form>
            <div>
                <label for="username">Username</label>
                <input type="text" name="username" id="username" />
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" />
            </div>
            <div>
                <label for="confirmPassword">
                Confirm Password
                </label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
            </div>
            <div>
                <label for="email">Email</label> 
                <input type="email" name="email" id="email" />
            </div>
            <div>
                <label for="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
            </div>
            <div>
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
            </div>
            <div>
                <label for="image">Upload image</label>
            <input type="file" name="image" id="image" />
            </div>
            <div>
                <button type="button" id="btnCancel">Cancel</button>
                <button type="button" id="btnRegister">Register</button>
            </div>
        </form>
       
        <div class="result">
            
        </div>
    `;
}

class User {
    constructor(
        username,
        password,
        email,
        firstName,
        lastName,
        image = URL_IMAGE_DEFAULT
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.image = image;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName) {
        this.firstName = firstName;
    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName) {
        this.lastName = lastName;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }
}

function register(user) {
    $(".result").innerHTML = `
        Your username is ${user.getUsername()} , your password is ${user.getPassword()} , your email is ${user.getEmail()} , 
        your first name is ${user.getFirstName()} and your last name is ${user.getLastName()} , your image is ${user.getImage()}
    `;
}

start();

$("#btnRegister").onclick = () => {
    /**
     * GET VALUE THEN CREATE THE NEW USER THEN PASS IT TO THE REGISTER() FUNCTION
     */
    let user = new User(
        $("#username").value,
        $("#password").value,
        $("#email").value,
        $("#firstName").value,
        $("#lastName").value
    );

    //Do with file
    let fileInput = $("#image");
    let file = fileInput.files[0];

    let promise = new Promise((resolve, reject) => {
        file ? resolve() : reject();
    });

    promise
        .then(() => {
            return new Promise((resolve) => {
                let reader = new FileReader();

                reader.addEventListener("load", (e) => {
                    let imageValue = URL.createObjectURL(file);
                    user.setImage(imageValue);
                    resolve();
                });

                reader.readAsDataURL(file);
            });
        })
        .catch(() => {})
        .finally(() => {
            register(user);
        });
};
