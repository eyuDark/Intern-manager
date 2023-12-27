import express from 'express'
import con from '../utils/db.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const router = express.Router()

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                {
                    role: "admin", email: email, id: result[0].id
                }, "jwt_secret_key", { expiresIn: '1d' }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Invalid email or password" })
        }
    });
});

router.get('/courses', (req, res) => {
    const sql = "SELECT * FROM course";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})
router.post('/add_course', (req, res) => {
    const sql = "INSERT INTO course (`name`) VALUES (?)"
    con.query(sql, [req.body.Course], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})


router.post('/add_intern', (req, res) => {
    const sql = `INSERT INTO intern 
    (name,email,password, address, salary, course_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.body.course_id
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.post('/add_coach', (req, res) => {
    const sql = `INSERT INTO coach 
    (name,email,password, course_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.course_id
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})



router.get('/interns', (req, res) => {
    const sql = "SELECT * FROM intern";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/manage_coach', (req, res) => {
    const sql = "SELECT * FROM coach";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/interns/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM intern WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/manage_coach/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM coach WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.put('/edit_intern/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE intern 
        set name = ?, email = ?, salary = ?, address = ?, course_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.course_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_coach/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE coach 
        set name = ?, email = ?, course_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.course_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})


router.delete('/delete_intern/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from intern where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_coach/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from coach where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/coach_count', (req, res) => {
    const sql = "select count(id) as coach from coach";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/intern_count', (req, res) => {
    const sql = "select count(id) as intern from intern";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFint from intern";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/coach_records', (req, res) => {
    const sql = "select * from coach"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as adminRouter }
