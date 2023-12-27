// Import thư viện
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối tới cơ sở dữ liệu MongoDB
mongoose.connect(
    "mongodb+srv://owner:owner@tasktracking.clmxqm0.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;

// Xử lý lỗi kết nối tới cơ sở dữ liệu
db.on("error", console.error.bind(console, "Lỗi kết nối tới MongoDB:"));

// Định nghĩa schema và model cho người dùng
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User", userSchema);

// Cấu hình bodyParser để đọc dữ liệu từ request body dưới dạng JSON
app.use(bodyParser.json());

// Lấy tất cả người dùng
app.get("/users", (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Lỗi server" });
        } else {
            res.json(users);
        }
    });
});

// Lấy thông tin một người dùng dựa trên ID
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Lỗi server" });
        } else if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Người dùng không tồn tại" });
        }
    });
});

// Tạo một người dùng mới
app.post("/users", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
    });

    newUser.save((err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Lỗi server" });
        } else {
            res.status(201).json(user);
        }
    });
});

// Cập nhật thông tin một người dùng dựa trên ID
app.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUser = {
        name: req.body.name,
        email: req.body.email,
    };

    User.findByIdAndUpdate(userId, updatedUser, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Lỗi server" });
        } else if (user) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: "Người dùng không tồn tại" });
        }
    });
});

// Xóa một người dùng dựa trên ID
app.delete("/users/:id", (req, res) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Lỗi server" });
        } else if (user) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: "Người dùng không tồn tại" });
        }
    });
});

// Khởi chạy server
app.listen(3000, () => {
    console.log("API server đang chạy tại cổng 3000...");
});
