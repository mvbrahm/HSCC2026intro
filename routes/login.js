const express = require('express');
const router = express.Router();
const { generateKey, verifyPassword } = require('../utils/crypto');
const { postWithBearerToken, getWithBearerToken } = require('../utils/APIrequests');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login', result: "to be determined" });
});

router.post('/', async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        var url = `https://drive.api.hscc.bdpa.org/v1/users/${username}`;
        var token = process.env.BEARER_TOKEN;

        const userResponse = await getWithBearerToken(url, token);

        if (process.env.PRODUCTION == "false") {
            console.log(JSON.stringify(userResponse));
        }

        // DEBUG: show raw API response to find correct structure
        if (process.env.PRODUCTION == "false") {
            return res.render('login', { title: 'Login', message: JSON.stringify(userResponse) });
        }

        const { salt, key } = userResponse;
        const isValid = verifyPassword(password, salt, key);

        res.render('login', { title: 'Login', message: `Auth result: ${isValid}` });
    }
    catch (error) {
        console.log(error);
        res.render('login', { title: 'Login', message: 'Error during login' });
    }
});

module.exports = router;
