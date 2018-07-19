function loggedOut(req, res, next) {
  //logged in if both are true
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }
  return next();
}

function requiresLogin(req, res, next){
  if(req.session && req.session.userId){
    return next();

  }else{
    var err = new Error("You must be logged in to view this page");
    err.status = 401;
    return next(err)
  }

}
module.exports.requiresLogin = requiresLogin;
module.exports.loggedOut = loggedOut;
