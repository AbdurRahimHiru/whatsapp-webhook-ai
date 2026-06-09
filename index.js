const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Webhook verification (Meta)
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "my_verify_token";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Receive messages
app.post("/webhook", (req, res) => {
    console.log("📩 Incoming WhatsApp Message:");
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Webhook server running on port", PORT);
});