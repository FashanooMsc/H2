const router =  require("express").Router();
const { pool } = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
try {
//res.json(req.user);

//const userDetail = await pool.query("SELECT * FROM usertable6 WHERE user_uid = $1", [req.user]);

const userDetail = await pool.query("SELECT user_name FROM usertable6 WHERE user_uid = $1", [req.user]);

res.json(userDetail.rows[0]);

} catch(err) {
    console.error(err.message)
    res.status(500).json("Server error");
}

});

module.exports = router;