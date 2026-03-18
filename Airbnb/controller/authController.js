exports.getLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Login', isloggedin: false });
};

exports.postLogin = (req, res) => {
    req.isloggedin = true;
    res.redirect('/');
};