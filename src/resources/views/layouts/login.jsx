var React = require("react");

function loginLayout(props) {
    return (
        <div>
            <div>Hello world, we are Horizon</div>
            <div>Now, we will create form login</div>
            <form method="POST" action="login">
                <div>
                    <label for="username">Username or email:</label>
                    <input type="text" name="username" id="username" />
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input type="text" name="password" id="password" />
                </div>

                <div>
                    <button
                        type="button"
                        id="btnLogin"
                        onclick="console.log('kkk'))"
                    >
                        Log in
                    </button>
                </div>
            </form>

            <div class="result">{props.users}</div>
        </div>
    );
}

function authentication(username, password, users) {
    for (let user of users) {
        if (
            user.username.toUpperCase() === username.toUpperCase() &&
            user.password == password
        ) {
            return user;
        }
    }

    return null;
}

function login(username, password) {
    const userAPI = "http://localhost:3000/user/storage";

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

module.exports = { loginLayout, login };
