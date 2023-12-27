var React = require("react");
var DefaultLayout = require("./layouts/default");
var LoginLayout = require("./layouts/login");

function HelloMessage(props) {
    return (
        <DefaultLayout title={props.title}>
            <LoginLayout.loginLayout></LoginLayout.loginLayout>
        </DefaultLayout>
    );
}

module.exports = HelloMessage;
