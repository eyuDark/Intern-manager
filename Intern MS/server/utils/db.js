import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "internms"
})
con.connect(function (err) {
    if (err) throw err
    console.log("Connected to DB!")
})

export default con;