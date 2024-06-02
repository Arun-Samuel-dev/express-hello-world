
module.exports= {
    ensureAuthenticated
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
//   res.json({status:false, message:'Not loggedin; Please login !'});
}
