const mongoose = require("mongoose");
const url =
    "mongodb+srv://owner:owner@tasktracking.clmxqm0.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "TaskTracking",
        });
        console.log("Connection succesfully!");
    } catch (error) {
        console.log("Connection Failure!");
    }
}
module.exports = { connect };
