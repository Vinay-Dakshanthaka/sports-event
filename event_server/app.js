const express = require('express');
const cors = require('cors');
const app = express();

const { initDatabase } = require('./models'); 

const participantRoutes = require('./routes/participantRoutes')
const adminRoutes = require('./routes/adminRoutes')

const PORT = process.env.PORT || 3040;

app.use(cors({
    origin: `http://localhost:5173`, 
}));

app.use(express.json()); 

app.use('/api', participantRoutes);
app.use('/api/admin', adminRoutes);



// Initialize database and start the server
initDatabase().then(async () => {
    // Start the server after database initialization is complete
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
