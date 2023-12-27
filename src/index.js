const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

const port = 3000;
const path = require("path");
const route = require("./routes");
const db = require("./config/db");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
// Connect to DB
db.connect();

//Route init
route(app);

app.use(express.static(path.join(__dirname, "public")));

//Template engine
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.set("views", path.join(__dirname, "resources", "views"));

const morgan = require("morgan");

//HTTP logger
app.use(morgan("combined"));

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
