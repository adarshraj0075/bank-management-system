const express = require("express");
const app = express();
const port = 3000;
const mysql = require("./connection").con
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});
app.get("/withdraw", (req, res) => {
    res.render("withdraw")

});
app.get("/update", (req, res) => {
    res.render("update")

});
app.get("/transaction",(req,res)=>{
    res.render("transaction")
});
app.get("/delete", (req, res) => {
    res.render("delete")

});
// app.get("/transfer", (req, res) => {
//     res.render("transfer")

// });
app.get("/view", (req, res) => {
    let qry = "select * from testt1 ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});


app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, userid,phone, email, gender,amount,address } = req.query

    // Sanitization XSS...
    let qry = "select * from testt1 where email=? or phone=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into testt1 values(?,?,?,?,?,?,?)";
                mysql.query(qry2, [name,userid, phone, email, gender,amount,address], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
        }
    })
});


app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const { phone } = req.query;

    let qry = "select * from testt1 where phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false,data: results })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/searchstudent", (req, res) => {
    let qry = "select * from testt1 ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("search", { data: results });
        }

    });

});


app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from testt1 where phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, gender,amount,address } = req.query;
    let qry = "update testt1 set name=?, gender=?,amount=amount+?,address=? where phone=?";

    mysql.query(qry, [name, gender,amount,address, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { mesg: true })
            }
        }
    })

});

//h
app.get("/transactionsearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from testt1 where phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("transaction", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("transaction", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/transactionstudent", (req, res) => {
    // fetch data

    const { phone, amount } = req.query;
    let qry = "update testt1 set amount=amount+? where phone=?";

    mysql.query(qry, [amount, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("transaction", { mesg: true })
            }
        }
    })

});
//j
app.get("/withdrawsearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from testt1 where phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("withdraw", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("withdraw", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/withdrawstudent", (req, res) => {
    // fetch data

    const { phone, amount } = req.query;
    let qry = "update testt1 set amount=amount-? where phone=?";

    mysql.query(qry, [amount, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("withdraw", { mesg: true })
            }
        }
    })

});

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from testt1 where phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});
//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});