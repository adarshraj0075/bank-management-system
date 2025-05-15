const mysql = require("mysql")
const con = mysql.createConnection({
    host: process.env.DB_HOST || "yamabiko.proxy.rlwy.net",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "xsXJusgvZereNTfllxxFTRFKckcgZTmx",
    database: process.env.DB_NAME || "railway",
    port: process.env.DB_PORT || 53910
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connection created..!!");
});

module.exports.con = con;