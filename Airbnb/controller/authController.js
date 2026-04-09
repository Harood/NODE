const { check, validationResult } = require("express-validator");
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        isloggedin: false,
        errors: [],
        oldInput: {
            email: ''
        }
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        if (!user) {
            return res.status(422).render('auth/login', {
                pageTitle: 'Login',
                isloggedin: false,
                errors: ['Invalid email or password'],
                oldInput: { email }
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(422).render('auth/login', {
                pageTitle: 'Login',
                isloggedin: false,
                errors: ['Incorrect password'],
                oldInput: { email }
            });
        }

        req.session.isloggedin = true;
        req.session.user = {
            id: user._id.toString(),
            email: user.email,
            userType: user.userType
        };

        return req.session.save((saveError) => {
            if (saveError) {
                console.error('Error saving login session:', saveError);
                return res.status(500).render('auth/login', {
                    pageTitle: 'Login',
                    isloggedin: false,
                    errors: ['An error occurred while logging in. Please try again.'],
                    oldInput: { email }
                });
            }

            res.redirect('/');
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).render('auth/login', {
            pageTitle: 'Login',
            isloggedin: false,
            errors: ['An error occurred while logging in. Please try again.'],
            oldInput: { email }
        });
    }
};

exports.postlogout = (req, res) => {
    req.session.destroy(() => {
       res.redirect('/login');
    });
};

exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        pageTitle: 'SignUp',
        isloggedin: false,
        errors: [],
        oldInput: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            userType: 'guest'
        }
    });
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
                errors: errors.array().map(err => err.msg),
                oldInput: { firstname, lastname, email, password, userType }
             });
        }

        bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const newUser = new User({ firstname, lastname, email, password: hashedPassword, userType });
                return newUser.save();
            })
            .then(() => {
                console.log('User registered successfully');
                res.redirect('/login');
            }).catch(err => {
                console.error('Error registering user:', err);
                res.status(500).render('auth/signup', {
                    pageTitle: 'SignUp',
                    isloggedin: false,
                    errors: ['An error occurred while registering. Please try again.'],
                    oldInput: { firstname, lastname, email, password, userType }
                });
            });
    }
];