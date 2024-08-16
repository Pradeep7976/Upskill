var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var os=require("os")

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const sendGridMail = require("@sendgrid/mail");

const cors = require("cors");
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

sendGridMail.setApiKey(process.env.SEND_GRID_API_KEY);

function getApprove(mailperson, en_courseid) {
  return {
    to: mailperson,
    from: "gta5zx10r1@gmail.com",
    subject: "xyz",
    text: "Sucessfully registred",
    html: en_courseid,
  };
}

async function sendapprovemessage(mailperson, en_courseid) {
  try {
    console.log(mailperson);
    await sendGridMail.send(getApprove(mailperson, en_courseid));
    return true;
  } catch (error) {
    const message = "mail not sent successfully";
    if (error.response) {
      console.error(error.response.body);
    }
    return false;
  }
}

router.post("/send", async (req, res) => {
  try {
    const en_email = req.body.email;
    const en_courseid = req.body.courseid;

    console.log(en_email);
    if (sendapprovemessage(en_email, en_courseid)) {
      res.status(200).send("mail sent");
    } else {
      res.status(400).send("error while sending the mail");
    }
  } catch (err) {
    res.status(400).send("internal server error");
  }
});

module.exports = router;
