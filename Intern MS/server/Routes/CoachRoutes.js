import express from 'express'
import con from '../utils/db.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()


router.post("/coach_login", (req, res) => {
    const sql = "SELECT * from coach where email = ? ";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "coach", email: email, id: result[0].id },
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

router.get('/interns/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT intern.id AS intern_id, intern.name AS intern_name, intern.course_id
        FROM intern
        JOIN coach ON intern.course_id = coach.course_id
        WHERE coach.id = ?`;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        const interns = result.map(({ intern_id, intern_name }) => ({ id: intern_id, name: intern_name }));
        return res.json({ Status: true, Result: interns });
    });
});
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
router.get('/status/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM task WHERE intern_id = ?`;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM task WHERE intern_id = ?`;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});




router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

router.get('/internlist/:id', (req, res) => {
    const id = req.params.id;
    const sql = `
        SELECT intern.id AS intern_id, intern.name AS intern_name
        FROM intern
        JOIN coach ON intern.course_id = coach.course_id
        WHERE coach.id = ?`;

    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        const interns = result.map(({ intern_id, intern_name }) => ({ id: intern_id, name: intern_name }));
        return res.json({ Status: true, Result: interns });
    });
});

router.post('/add_task', (req, res) => {
    const { task_name, task_desc, deadline, intern_id } = req.body;

    const sql = `INSERT INTO task (task_name, task_desc, deadline, intern_id) VALUES (?, ?, ?, ?)`;
    con.query(sql, [task_name, task_desc, deadline, intern_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Status: false, Error: 'Failed to add task' });
        }
        return res.status(200).json({ Status: true, Message: 'Task added successfully' });
    });
});

router.get('/details/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM coach where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result)
    })
});

export { router as CoachRouter }
