// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Set the server port using environment variable or default to 8080
const PORT = process.env.PORT || 8080;

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Sample data: list of web projects
const projects = [
    {
        id: 1,
        title: "React Game!",
        description: "Tic tac toe game created using Create React app.",
        URL: "http://heroku/myapp/game/"
    },
    {
        id: 2,
        title: "Online store",
        description: "Online store created with HTML, CSS and JavaScript.",
        URL: "https://git.com/myrepos/shop/index"
    }
];

// Route to get all projects
app.get('/api', (req, res) => {
    res.json(projects);
});

// Route to add a new project
app.post('/api', (req, res) => {
    const newProject = req.body;
    projects.push(newProject);
    res.json(newProject);
});

// Route to delete a project by its ID
app.delete('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = projects.findIndex(project => project.id === id);
    if(index !== -1) {
        projects.splice(index, 1);
        res.json({ message: 'Deleted successfully' });
    } else {
        res.json({ message: 'Project not found' });
    }
});

// Route to update a project by its ID
app.put('/api/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const project = projects.find(proj => proj.id === id);
    if(project) {
        if(title) project.title = title;
        if(description) project.description = description;
        res.json(project);
    } else {
        res.json({ message: 'Project not found' });
    }
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
