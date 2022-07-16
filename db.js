const {Pool} = require("pg");


const isProduction = process.env.NODE_ENV === "production";

const connectionString2 = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const connectionString = `postgres://dcijwsuyfvvrmt:c2795fdaa65eb9b876f235f1c953e64fb6b42b84906165587f5bf0b9170138b7@ec2-54-228-125-183.eu-west-1.compute.amazonaws.com:5432/ddhalebhr0oc4h`

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = { pool};