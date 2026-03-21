exports.getLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Login', isloggedin: false });
};

exports.postLogin = (req, res) => {
    req.session.isloggedin = true;
    res.redirect('/');
};

exports.postlogout = (req, res) => {
    req.session.destroy(() => {
       res.redirect('/login');
    });
};