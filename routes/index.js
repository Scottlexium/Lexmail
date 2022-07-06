var express = require('express');
var router = express.Router();
// get json local data
const MailGen = require('mailgen');
const json = require('../users.json');
const nodemailer = require("nodemailer");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/send', function (req, res) {
  const {from, subject, Emails,name,logoLink,EventDescription,snippet, title, logoIMG, calendar, download, join, date, time, location, requirement, requirementText } = req.body;
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
      },{
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
            color: '#0089e1', // Optional action button color
            text: 'Add to Calendar!',
            link: calendar
          },
        },
        {
          button: {
            color: '#0089e1', // Optional action button color
            text: 'Event Link!',
            link: join
          }
        },
        {
          instructions: requirement,
          button: {
            color: '#0089e1', // Optional action button color
            text: requirementText,
            link: download
          }
        }
      ],
    }
  }
  const emailTemplate = mailGenerator.generate(email)
  require('fs').writeFileSync('preview.html', emailTemplate, 'utf8');
  // res.send(emailTemplate);
  // })
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD // naturally, replace both with your real credentials or an application-specific password
    }
  });

  const mailOptions = {
    from: from,
    to: Emails,
    subject: subject,
    html: emailTemplate
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send('Email sent to : ' + Emails)
      console.log('Email sent to : ' + Emails);
    }
  });
})
module.exports = router;
