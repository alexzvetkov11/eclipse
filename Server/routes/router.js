const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const key = require('../config/key');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../config/db.js');
// const User = require('../model/User.js');

const userMiddleware = require('../middleware/users.js');

// const userController = require("../controller/userController");

router.get('/', (req, res, next) => {
    console.log("Welcome to our home");
    res.send({ msg: "Welcome to our home" });
})

router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
    console.log(req.body.username + " " + req.body.password);
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`,
        (err, result) => {
            if (result.length) {
                console.log(result);
                return res.send({
                    msg: 'This username is already in use!'
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            return res.send({ msg: err });
                        } else {
                            db.query(
                                `INSERT INTO users (id, username, password, permission, updatetime) VALUES (
                                    '${uuid.v4()}', ${db.escape(req.body.username)}, ${db.escape(hash)}, ${db.escape(req.body.permission)}, now())`,
                                (err, result) => {
                                    if (err) {
                                        throw err;
                                        return res.status(400).send({
                                            msg: err
                                        });
                                    }
                                    console.log("Register");
                                    return res.status(201).send({ msg: 'Registered!' });
                                }
                            );
                        }
                    });
                });
            }
        }
    );
    // User.findOne({ username: req.body.username }).then((user) => {
    //     if (user) {
    //         return res.status(400).send({ msg: "Username already exists." });
    //     } else {
    //         const newUser = new User({
    //             username: req.body.username,
    //             password: req.body.password,
    //             permission: req.bod.permission,
    //             datetime: new Date()
    //         });
    //         bcrypt.genSalt(10, (err, salt) => {
    //             bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                 if (err) throw err;
    //                 newUser.password = hash;
    //                 newUser.save()
    //                     .then((user) => {
    //                         res.statue(201).send({ msg: "ok" });
    //                     }).catch((err) => {
    //                         return res.status(400).send({ msg: "Username or Password is incorrect." });
    //                     });
    //             });
    //         });
    //     }
    // })
});


router.post('/login', userMiddleware.validateRegister, (req, res, next) => {
    // console.log(req.body.username + "  " + req.body.password);
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                return res.send({ msg: err });
            }
            if (!result.length) {
                return res.send({
                    msg: 'Username or password is incorrect!'
                });
            }
            bcrypt.compare(req.body.password, result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        return res.send({
                            msg: 'Username or password is incorrect!'
                        });
                    }
                    if (bResult) {
                        const token = jwt.sign({
                                username: result[0].username,
                                userId: result[0].id
                            },
                            key.secretOrKey, {
                                expiresIn: '7d'
                            }
                        );
                        db.query(
                            `UPDATE users SET updatetime = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logged in!',
                            token,
                            user: result[0]
                        });
                    }
                    return res.send({
                        msg: 'Username or password is is incorrect!'
                    });
                }
            );
        }
    );
});



router.get("/search_node", (req, res, next) => {
    var query = "SELECT pnodeid as id FROM isos.ercot_da where date=(select max(date) FROM isos.ercot_da) group by pnodeid order by pnodeid;";
    var reply = {};
    db.query(query, (err, result) => {
        if (err || !result.length) return res.send({ msg: err });
        // var temp = JSON.parse(JSON.stringify(result));
        result.forEach(e => e.group = e.id.length);
        reply["ercot_da"] = result;

        var query1 = "SELECT pnodeid as id FROM isos.ercot_rt where date=(select max(date) FROM isos.ercot_rt) group by pnodeid order by pnodeid;";
        db.query(query1, (err, result1) => {
            if (err || !result1.length) return res.send({ msg: err });
            //temp = JSON.parse(JSON.stringify(result));
            result.forEach(e => e.group = e.id.length);
            reply['ercot_rt'] = result;
            res.send({ msg: "ok", "nodes": reply });
            console.log("search_node");
        });
    })
})

router.get("/search_link", (req, res, next) => {
    // var query = "SELECT	source, sink, hedgetype FROM isos.ercot_crr_bids GROUP BY source, sink,	hedgetype ;";
    // var query = "SELECT source, sink, hedgetype FROM isos.ercot_crr_auction GROUP BY source, sink, hedgetype;";
    //var query = "select tt.source, tt.sink, tt.hedgetype FROM (SELECT source, sink, hedgetype FROM isos.ercot_crr_bids GROUP BY source , sink , hedgetype UNION SELECT source, sink, hedgetype FROM isos.ercot_crr_auction group by source, sink, hedgetype) as tt limit 1000";

    // var query = "SELECT source, sink, hedgetype FROM isos.ercot_crr_auction GROUP BY source, sink, hedgetype;";
    var query = "SELECT source, sink as target FROM isos.ercot_crr_nodes ;"
    db.query(query, (err, result) => {
        if (err || !result.length) return res.send({ msg: err });
        res.send({ msg: "ok", "links": result });
        console.log("serach_link");
    });
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
});
module.exports = router;