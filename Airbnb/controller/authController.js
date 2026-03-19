exports.getLogin = (req, res) => {
    res.render('auth/login', { pageTitle: 'Login', isloggedin: false });
};

exports.postLogin = (req, res) => {
    res.cookie('loggedin', true);
    res.redirect('/');
};

exports.postlogout = (req, res) => {
    res.clearCookie('loggedin');
    res.redirect('/login');
};