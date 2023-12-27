"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const main = $("#login");

const userAPI = "http://localhost:3000/user/login";

function start() {
    main.innerHTML = `
        <div>Hello world, we are Horizon</div>
        <div>Now, we will create form login</div>
        <form>
            <div>
                <label for="username"'>Username or email:</label>
                <input type="text" name="username" id="username" />
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="text" name="password" id="password" />
            </div>

            <div>
                <button type="button" id='btnLogin'>Log in</button>
            </div>
        </form>

        <div class="result">
            
        </div>
        
    `;
}

function authentication(username, password, users) {
    let ussss = users[0].username;
    for (let user of users) {
        if (
            user.username.localeCompare(username) &&
            user.password == password
        ) {
            return user;
        }
    }

    return null;
}

function login(username, password) {
    fetch(userAPI)
        .then((response) => response.json())
        .then((users) => {
            let user = authentication(username, password, users);
            if (user) {
                $(".result").innerHTML = `
                    Dang nhap thanh cong
                `;
            } else {
                $(".result").innerHTML = `
                    Dang nhap that bai
                `;
            }
        })
        .catch((err) => {
            console.error(err);
        });
}

start();

$("#btnLogin").onclick = () => {
    let username = $("#username").value;
    let password = $("#password").value;
    login(username, password);
};
