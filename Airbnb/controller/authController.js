const { check } = require("express-validator");

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

exports.getSignup = (req, res) => {
    res.render('auth/signup', { pageTitle: 'SignUp', isloggedin: false });
};

exports.postSignup = [
    check('firstname').notEmpty().withMessage('First name is required').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters long').matches(/^[A-Za-z]+$/).withMessage('First name must contain only letters'),
    check('lastname').notEmpty().withMessage('Last name is required').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long').matches(/^[A-Za-z]+$/).withMessage('Last name must contain only letters'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage('Password must contain at least one letter and one number'),
    check('confirmPassword').notEmpty().withMessage('Confirm password is required').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    check("userType").notEmpty().withMessage("User type is required").isIn(["host", "guest"]).withMessage("Invalid user type"),
    check("acceptTerms").equals("on").withMessage("You must accept the terms and conditions"),
    
    (req, res) => {
        const {firstname, lastname, email, password, userType} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render('auth/signup', { 
                pageTitle: 'SignUp', 
                isloggedin: false, 
                errorMessage: errors.array()[0].msg,
                oldInput: { firstname, lastname, email, password, userType }
             });
        }
        res.redirect('/login');
    }
];