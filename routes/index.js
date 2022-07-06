var express = require('express');
var router = express.Router();
// get json local data
const MailGen = require('mailgen');
const json = require('../users.json');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const SERVICE = process.env.SERVICE;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lexmail' });
});

router.post('/send', async function (req, res) {
  const { from, subject, Emails, name, logoLink, EventDescription, snippet, title, logoIMG, calendar, download, join, date, time, location, requirement, requirementText, btnColor } = req.body;
  // const Emails = [];
  // get the email and name from json
  // json.forEach((user) => {
  //   Emails.push(user['E-mail']);
  // });
  const mailGenerator = new MailGen({
    theme: 'default',
    product: {
      name: name,
      link: logoLink,
      logo: logoIMG
    },
  })

  const email = {
    body: {
      title: title,
      action: [{
        instructions: snippet
      }, {
        instructions: EventDescription,
      }],
      table: {
        data: [
          {
            title: 'Date',
            description: date,
          },
          {
            title: 'Time',
            description: time,
          },
          {
            title: 'Location',
            description: location,
          }
        ],
        columns: {
          // Optionally, customize the column widths
          customWidth: {
            title: '20%',
            description: '80%'
          },
          // Optionally, change column text alignment
          customAlignment: {
            description: 'right'
          }
        }
      },
      action: [
        {
          button: {
            color: btnColor, // Optional action button color
            text: 'Add to Calendar!',
            link: calendar
          },
        },
        {
          button: {
            color: btnColor, // Optional action button color
            text: 'Event Link!',
            link: join
          }
        },
        {
          instructions: requirement,
          button: {
            color: btnColor, // Optional action button color
            text: requirementText,
            link: download
          }
        }
      ],
    }
  }
  const emailTemplate = mailGenerator.generate(email)
  require('fs').writeFileSync('preview.html', emailTemplate, 'utf8');

  const transporter = nodemailer.createTransport({
    service: SERVICE,
    auth: {
      user: USER,
      pass: PASSWORD 
    }
  });

  const mailOptions = {
    from: from,
    to: Emails,
    subject: subject,
    html: emailTemplate
  };

  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(400).json({
          message: 'An error occured: ', error
        })
      } else {
        return res.status(200).json({
          message: 'Email sent: ' + Emails
        })
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error occured: ', error
    })
  }
})
module.exports = router;
