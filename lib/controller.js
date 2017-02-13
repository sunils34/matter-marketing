var controller = module.exports;
var _ = require('lodash');
var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');

controller.index = function(req, res, next) {
  res.render('pages/index.ejs')
}

controller.start = function(req, res, next) {

  if(req.route.methods.get) {
    res.render('pages/start.ejs', { csrfToken: req.csrfToken() })
  }
  // obtained post data
  else if(req.route.methods.post) {
    delete req.body._csrf;

    const url = req.query.url;
    var api_key = process.env.MAILGUN_API_KEY;
    var domain  = process.env.MAILGUN_DOMAIN;
    var from    = process.env.MAILGUN_FROM;
    var to      = process.env.MAILGUN_TO;
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var body = req.body;

    var html = "<br/><br/>";
    for(var key in body) {
      html += "<b>" + _.capitalize(key) + ":</b> " + body[key] + "<br/>";
    }

    var data = {
      from: from,
      to: to,
      subject: 'Matter - New Submission',
      text: html,
      html: html
    };

    var doc = new GoogleSpreadsheet('1Z-IA7VMa078-AfZj-D7DelPfKzCuEzZbkp0Ebh3oEdM');
    var sheet;

    async.series([
      function setAuth(step) {
        // OR, if you cannot save the file locally (like on heroku) 
        var creds_json = {
          client_email: process.env.SHEETS_EMAIL,
          private_key: process.env.SHEETS_KEY
        }

        doc.useServiceAccountAuth(creds_json, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log(err);
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[0];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
      function workingWithCells(step) {
        sheet.addRow({
          Name: body.name,
          Email: body.email,
          Company: body.company,
          Phone: body.phone,
          Role: body.role,
          Company_Size: body.company_size,
          Goals: body.goals,
          Other: body.other
        }, function(err, cells) {
          console.log(err);
          step();
        });
      },
      function sendEmail(step) {
        step();
        mailgun.messages().send(data, function (error, body) {
          console.log(body);
        });
      }
    ], function finish(err) {
      if(err) next(err);
      res.render('pages/thanks.ejs', { csrfToken: req.csrfToken() })
    });
  }
}

