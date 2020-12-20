const key = require('../config/key');
module.exports = {
    validateRegister: (req, res, next) => {
        // username min length 3
        if (!req.body.username || req.body.username.length < 3) {
            return res.send({
                msg: 'Please enter a username with min. 3 chars'
            });
        }
        // password min 6 chars
        if (!req.body.password || req.body.password.length < 2) {
            return res.send({
                msg: 'Please enter a password with min. 6 chars'
            });
        }
        // password (repeat) does not match
        // if (!req.body.password_repeat ||
        //     req.body.password != req.body.password_repeat
        // ) {
        //     return res.status(400).send({
        //         msg: 'Both passwords must match'
        //     });
        // }
        console.log("middleware");
        next();
    },

    isLoggedIn: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, key.secretOrKey);
            req.userData = decoded;
            next();
        } catch (err) {
            return res.status(401).send({
                msg: 'Your session is not valid!'
            });
        }
    }
};