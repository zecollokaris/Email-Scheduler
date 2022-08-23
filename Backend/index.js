const express = require('express');

const bodyParser = require("body-parser");
const Joi = require('joi');

const nodemailer = require('nodemailer');
const cors = require('cors')

const SENDER = "copemailer@gmail.com";

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SENDER,
        pass: 'ftphaqiqanakbqem'
    }
});

const router = express.Router();

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Store in array
const users = [];

const messages = [
    "This is message 1 😊 Welcome",
    "This is message 2",
    "This is message 3",
    "This is message 4",
    "This is message 5",
    "This is message 6",
    "This is message 7",
    "This is message 8",
    "This is message 9",
    "This is message 10",
];

router.post("/user", (request, response) => {
    if (request.body) {

        const schema = Joi.object({
            id: Joi.number().required(),
            email: Joi.string().email().required(),
        })

        const user = request.body;

        user.id = users.length + 1;

        // Validate request body
        const result = schema.validate(user);

        if (result.error != null) response.status(400).send();

        users.push(user);

        sendEmail(user);
    }
    response.status(201).send(request.body);
});


// Function to send message to user

async function sendEmail(user) {
    const sendEmailPromise = new Promise((resolve, reject) => {
        try {

            let currentIndex = 0;

            // Random Indexes
            const randomizedIndexes = messages.map(message => messages.indexOf(message))
                .map((message) => ({
                    sort: Math.random(),
                    value: message
                }))
                .sort((firstMessage, secondMessage) => firstMessage.sort - secondMessage.sort)
                .map((message) => message.value)

            const interval = setInterval(() => {
                // Node mailer functionality
                sendEmailViaNodeMailer(user, messages[randomizedIndexes[currentIndex]]);
                if (currentIndex === 9) {
                    clearInterval(interval);
                    resolve(user);
                }
                currentIndex++;
            }, 1000);
        } catch (err) {
            reject(err);
        }
    });
    await sendEmailPromise;
}

async function sendEmailViaNodeMailer(user, message) {
    var mailOptions = {
        from: SENDER,
        to: user.email,
        subject: `10 Minute Dose Of Mental Health to user ${user.id}`,
        text: message
    };

    gmailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

app.use("/", router);

app.listen(8080, () => {
    console.log("Started on PORT 8080");
})