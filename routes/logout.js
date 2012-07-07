module.exports = function (req, res) {
  // delete the session from couch.
  // also delete any other login bits.
  req.couch.logout(next)

  function next () {
    // delete the couchdb session, if we have one.
    req.session.del('name')
    req.session.del('error')
    res.cookies.set('name', '')
    req.session.del('profile', function (er) {
      if (er) return res.error(er)
      req.session.get('done', function (er, done) {
        res.redirect(done || '/')
      })
    })
  }
}
