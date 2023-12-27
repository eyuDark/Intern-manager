import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/task', (req, res) => {
    const sql = "SELECT * FROM task";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query er" })
        return res.json({ Status: true, Result: result })
    })
})
router.post("/intern_login", (req, res) => {
    const sql = "SELECT * from intern where email = ? ";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "intern", email: email, id: result[0].id },
                        "jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            })

        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});

router.get('/intern_task/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM task WHERE intern_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})


router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM intern where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result)
    })
})

router.put('/tasks/:id', (req, res) => {
    const internId = req.params.id;
    const taskId = req.body.task_id; // Add this line
    const progress = 'Completed'; // Assuming 'Completed' is the progress when the button is clicked to mark as done

    // SQL query to update the task progress
    const sql = 'UPDATE task SET progress = ? WHERE intern_id = ? AND task_id = ?'; // Modify this line

    // Execute the SQL query
    con.query(sql, [progress, internId, taskId], (err, result) => { // Modify this line
        if (err) {
            console.error(err);
            res.status(500).json({ status: 'error', message: 'Failed to update task progress' });
        } else {
            // SQL query to fetch the updated task
            const sql = 'SELECT * FROM task WHERE intern_id = ? AND task_id = ?'; // Modify this line
            con.query(sql, [internId, taskId], (err, result) => { // Modify this line
                if (err) {
                    console.error(err);
                    res.status(500).json({ status: 'error', message: 'Failed to fetch updated task' });
                } else {
                    res.json({ status: 'success', message: 'Task progress updated successfully', task: result[0] });
                }
            });
        }
    });
});






router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

// router.get('/interns', (req, res) => {
//     const sql = "SELECT * FROM intern";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })
// router.get('/intern_details/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM intern WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })

// router.get('/intern_details', (req, res) => {
//     const sql = "SELECT * FROM intern";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })


export { router as InternRouter } 