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
    console.log(user);

    $(".result").innerHTML = `
        Thanh cong
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

    let getImage = readFileAndGetImageURL();
    getImage
        .then((imageURL) => {
            user.setImage(imageURL);
        })
        .catch(() => {})
        .finally(register.bind(null, user));

    function readFileAndGetImageURL() {
        let fileInput = $("#image");
        let file = fileInput.files[0];
        let result;

        if (file) {
            result = new Promise((resolve) => {
                let reader = new FileReader();
                reader.addEventListener("load", (e) => {
                    resolve(URL.createObjectURL(file));
                });
                reader.readAsDataURL(file);
            });
        }

        return result
            ? result
            : Promise.reject(
                  "You didn't upload image, so we will set default avatar"
              );
    }
};
