const express = require('express'); // Create a node js web server to handle HTTP requests

const bodyParser = require("body-parser"); // Parse request payload to JSON
const Joi = require('joi'); // Validate payload schema

const nodemailer = require('nodemailer'); // Allows us to send emails
const cors = require('cors')// Enable cross site scripting

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
    `🎊 Hello 🎊
    \n “You are the one thing in this world, above all other things, that you must never give up."
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “I would say what others have said: It gets better. One day, you’ll find your tribe."
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “My dark days made me stronger. Or maybe I already was strong, and they made me prove it.”
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “You don’t have to be positive all the time. It’s perfectly okay to feel sad."
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “This feeling will pass. The fear is real but the danger is not.”
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “Your present circumstances don’t determine where you go."
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “Tough times never last, but tough people do!”
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “I keep moving ahead, as always, knowing deep down inside that I am a good person and that I am worthy of a good life.”
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “Happiness can be found even in the darkest of times, if one only remembers to turn on the light.”
    \n Sincerly,
    \n Cope Mailer 😊`,

    `🎊 Hello 🎊
    \n “In the middle of winter I at last discovered that there was in me an invincible summer.”
    \n Sincerly,
    \n Cope Mailer 😊`,
];

router.post("/user", (request, response) => {
    if (request.body) {

        const schema = Joi.object({
            id: Joi.number().required(),
            name: Joi.string().required(),
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
    response.status(201).send(request.body).end();
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
            }, 60000);
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
        subject: `10 Minute Dose Of Mental Health For ${user.name}`,
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