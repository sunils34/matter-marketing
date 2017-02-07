var controller = module.exports;


controller.start = function(req, res, next) {

  if(req.route.methods.get) {
    res.render('pages/apply.ejs', { csrfToken: req.csrfToken() })
  }
  // obtained post data
  else if(req.route.methods.post) {
    delete req.body._csrf;

    const url = req.query.url;
    res.send('You are on this page: ' + req.path);
    var api_key = process.env.MAILGUN_API_KEY;
    var domain  = process.env.MAILGUN_DOMAIN;
    var from    = process.env.MAILGUN_FROM;
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    var data = {
      from: from,
      to: 'sunils34@gmail.com',
      subject: 'Matter - New Submission',
      text: JSON.stringify(req.body)
    };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
}
