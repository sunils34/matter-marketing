var controller = module.exports;
var _ = require('lodash');

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

    var html = "<br/><br/>";
    for(var key in req.body) {
      html += "<b>" + _.capitalize(key) + ":</b> " + req.body[key] + "<br/>";
    }

    var data = {
      from: from,
      to: to,
      subject: 'Matter - New Submission',
      text: html,
      html: html
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      res.render('pages/thanks.ejs', { csrfToken: req.csrfToken() })
    });
  }
}
