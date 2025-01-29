const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For hashing passwords
const app = express();

const { initDatabase } = require('./models');
const  AdminService  = require('./services/adminService'); 

const participantRoutes = require('./routes/participantRoutes');
const adminRoutes = require('./routes/adminRoutes');

const PORT = process.env.PORT || 3040;

app.use(cors({
    // origin: `http://localhost:5173`,
    origin: `https://totfd.fun`,
}));

app.use(express.json());

app.use('/api', participantRoutes);
app.use('/api/admin', adminRoutes);

/**
 * Function to create a default admin account if it doesn't exist.
 */
const createDefaultAdmin = async () => {
    const username = 'admin';
    const password = 'Vinay@1234';

    try {
        // Check if the admin account already exists
        const existingAdmin = await AdminService.findAdminByUsername(username);
        if (existingAdmin) {
            console.log('Default admin account already exists.');
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin account
        await AdminService.createAdmin({
            username,
            password: hashedPassword,
        });

        console.log('Default admin account created successfully.');
    } catch (error) {
        console.error('Error creating default admin account:', error.message);
    }
};

// Initialize database and start the server
initDatabase().then(async () => {
    // Create the default admin account
    await createDefaultAdmin();

    // Start the server after database initialization is complete
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
