const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const { Info } = require("./models/info");
const { Page } = require("./models/page");
const fs = require("fs");

const password = fs.readFileSync(".password").toString().trim();

const app = express();
mongoose
    .connect(
        `mongodb+srv://emkay:${password}@cluster0-lbp6f.mongodb.net/test?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log("db connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/info", (req, res) => {
    const info = new Info(req.body);
    info.save((err, data) => {
        if (err) return res.json(err);
        console.log(data);
    });
    return res.status(200);
});

app.post("/page", (req, res) => {
    const page = new Page(req.body);
    page.save((err, data) => {
        if (err) return res.json(err);
        console.log(data);
    });
    return res.status(200);
});

app.get("/info/:address", (req, res) => {
    const address = req.params.address;
    Info.findOne({ address }, (err, data) => {
        if (err) return res.json(err);
        res.send(data);
        console.log(data);
    });
    return res.status(200);
});

app.get("/page/:address", (req, res) => {
    const address = req.params.address;
    Page.findOne({ address }, (err, data) => {
        if (err) return res.json(err);
        res.send(data);
        console.log(data);
    });
    return res.status(200);
});

app.patch("/info/:address/incLike", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate({ address }, { $inc: { likes: 1 } }, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
    });
    return res.status(200);
});

app.patch("/info/:address/decLike", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate({ address }, { $inc: { likes: -1 } }, (err, data) => {
        if (err) return res.json(err);
        console.log(data);
    });
    return res.status(200);
});

app.patch("/info/:address/incDisLike", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate(
        { address },
        { $inc: { dislikes: 1 } },
        (err, data) => {
            if (err) return res.json(err);
            console.log(data);
        }
    );
    return res.status(200);
});

app.patch("/info/:address/decDisLike", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate(
        { address },
        { $inc: { dislikes: -1 } },
        (err, data) => {
            if (err) return res.json(err);
            console.log(data);
        }
    );
    return res.status(200);
});

app.patch("/page/:address/incFollowers", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate(
        { address },
        { $inc: { followers: 1 } },
        (err, data) => {
            if (err) return res.json(err);
            console.log(data);
        }
    );
    return res.status(200);
});

app.patch("/page/:address/decFollowers", (req, res) => {
    const address = req.params.address;
    Info.findOneAndUpdate(
        { address },
        { $inc: { followers: -1 } },
        (err, data) => {
            if (err) return res.json(err);
            console.log(data);
        }
    );
    return res.status(200);
});

app.patch("/addFollowers/:address/:following", (req, res) => {
    const { address, following } = req.params;
    Page.findOneAndUpdate(
        { address },
        { $push: { following } },
        { new: true, upsert: true },
        function (err, data) {
            if (err) res.send("err");
            console.log(data);
        }
    );
});

app.get("/followers/:address", async (req, res) => {
    const { address } = req.params;
    try {
        page = await Page.findOne({ address });
        res.send(page.following);
        console.log(page);
    } catch (error) {
        res.send(err);
    }
    // console.log(page);
});

app.listen(5000, () => {
    console.log("port is running on port 5000");
});
