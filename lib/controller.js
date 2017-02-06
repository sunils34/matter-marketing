var controller = module.exports;


controller.apply = function(req, res, next) {
  const url = req.query.url;
  res.send('You are on this page: ' + req.path);
  var api_key = process.env.MAILGUN_API_KEY;
  var domain  = process.env.MAILGUN_DOMAIN;
  var from    = process.env.MAILGUN_FROM;
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var data = {
    from: from,
    to: 'sunils34@gmail.com',
    subject: 'New Submission',
    text: 'Testing some Mailgun awesomness part 4!'
  };

  mailgun.messages().send(data, function (error, body) {
      console.log(body);
  });
}
