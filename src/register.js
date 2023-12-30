"use strict";

let $ = document.querySelector.bind(document);
let $$ = document.querySelectorAll.bind(document);

const URL_IMAGE_DEFAULT = "abcd";

const userAPI = "http://localhost:8000/account/register";

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
                <label for="fullname">Full Name</label>
                <input type="text" name="fullname" id="fullname" />
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
        fullname,
        email,
        avatar = URL_IMAGE_DEFAULT
    ) {
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.avatar = avatar;
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

    getFullname() {
        return this.fullname;
    }

    setFullname(fullname) {
        this.fullname = fullname;
    }

    getAvatar() {
        return this.avatar;
    }

    setAvatar(avatar) {
        this.avatar = avatar;
    }
}

function register(user) {
    let options = {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };
    fetch(userAPI, options)
        .then((data) => data.json())
        .then((update) => {
            console.log(update);
        })
        .catch((e) => {
            console.log(e);
        });
}

start();

$("#btnRegister").onclick = () => {
    /**
     * GET VALUE THEN CREATE THE NEW USER THEN PASS IT TO THE REGISTER() FUNCTION
     */
    let user = new User(
        $("#username").value,
        $("#password").value,
        $("#fullname").value,
        $("#email").value
    );

    readFileAndGetImage()
        .then((imageURL) => {
            user.setAvatar(imageURL);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(register.bind(this, user));

    function readFileAndGetImage() {
        let imageURL;
        let fileInput = $("#image");
        let file = fileInput.files[0];

        if (file) {
            imageURL = new Promise((resolve) => {
                let reader = new FileReader();
                reader.addEventListener("load", (e) => {
                    resolve(URL.createObjectURL(file));
                });
                reader.readAsDataURL(file);
            });
        }

        return imageURL
            ? Promise.resolve(imageURL)
            : Promise.reject(
                  "You didn't upload any image, so we will set your avatar is default avatar"
              );
    }
};
