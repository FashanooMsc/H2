const router = require("express").Router()
const { pool } = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering

router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body( name, email, password)
        const { user_name, user_email, user_password } = req.body;

        //2. check if user exist( if exist then throw error)
        const user = await pool.query("SELECT * FROM usertable6 WHERE user_email = $1", [user_email])

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exist");
        }

        //3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPasword = await bcrypt.hash(user_password, salt);

        //4. enter the new user inside our database
        const newUser = await pool.query("INSERT INTO usertable6 (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *", [user_name, user_email, bcryptPasword]);
        //  res.json(newUser)

        // 5. generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_uid);
        res.json({ token });

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destruscture the req.body
        const { user_email, user_password } = req.body;

        //2. check if user doesn't exist 
        const user = await pool.query("SELECT * FROM usertable6 WHERE user_email = $1", [user_email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //3. check if incoming password is the same as database password
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_uid);
        res.json({ token });


    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/isverify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;