"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const main = $("#login");

const loginAPI = "http://localhost:8000/account/login";

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

function login(username, password) {
    let user = {
        username: username,
        password: password,
    };

    fetch(loginAPI, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
        });
}

start();

$("#btnLogin").onclick = () => {
    let username = $("#username").value;
    let password = $("#password").value;
    login(username, password);
};
