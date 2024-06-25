const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const todosFilePath = path.join(__dirname, 'todos.json');

app.use(bodyParser.json());

// Endpoint to add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;

    // Read the existing tasks from the JSON file
    fs.readFile(todosFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read tasks' });
        }

        const tasks = JSON.parse(data);

        // Add the new task to the tasks array
        tasks.tasks.push(newTask);

        // Write the updated tasks back to the JSON file
        fs.writeFile(todosFilePath, JSON.stringify(tasks, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save task' });
            }

            res.status(200).json({ message: 'Task added successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});