const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let tasks = [];

app.use(express.json());

// Get tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add new task
app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
