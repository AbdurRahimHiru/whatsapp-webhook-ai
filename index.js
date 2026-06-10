const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// =======================
// META WEBHOOK VERIFY
// =======================
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = "my_verify_token";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verified ✔️");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// =======================
// RECEIVE WHATSAPP MESSAGES
// =======================
app.post("/webhook", (req, res) => {
    console.log("📩 Incoming WhatsApp Message:");
    console.log(JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// =======================
// POLICY PAGES (IMPORTANT FOR META)
// =======================

app.get("/privacy-policy", (req, res) => {
    res.send("<h1>Privacy Policy</h1><p>We use WhatsApp API for automation.</p>");
});

app.get("/terms", (req, res) => {
    res.send("<h1>Terms of Service</h1><p>No spam or abuse allowed.</p>");
});

app.get("/delete-data", (req, res) => {
    res.send("<h1>Delete Data</h1><p>Email: abdurrahimhiru976@gmail.com</p>");
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("🚀 Webhook server running on port", PORT);
});
