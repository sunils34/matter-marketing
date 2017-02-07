
/**
 * errorHandler
 * Handle errors properly
 *
 */

module.exports.errorHandler = function(err, req, res, next) {
  console.log(err);
  if (err.code == 'EBADCSRFTOKEN') {
    // handle CSRF token errors here
    res.status(403);
    res.send('Whoops, it looks like the form is broken');
  }
  else {
    return next(err)
  }
}

/**
 * notFoundHandler
 */
module.exports.notFoundHandler = function(req, res, next) {
  res.redirect('/');
}
