function loggedOut(req, res, next){
  if (req.sessions && req.session.userId){
    console.log('Im logged in');
    return res.redirect('/map');
  }
  return next();
}
module.exports.loggedOut = loggedOut;
