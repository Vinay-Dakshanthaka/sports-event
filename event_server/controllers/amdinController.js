const AdminService = require("../services/adminService");
const ParticipantsService = require("../services/participantsService");
const { BASE_URL } = require("../config/baseUrl");
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const secretKey =  process.env.JWT_SECRET;


const AdminController = {
    async addAdmin(req, res) {
        const { username, password } = req.body;
         console.log(req.body,"-----------------------")
        try {
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
              console.log(hashedPassword,"----------------------pass")
            const admin = await AdminService.createAdmin({
                username,
                password: hashedPassword,
            });
               
            res.status(201).json({
                message: "Admin added successfully",
                admin: { id: admin.id, username: admin.username },
            });
        } catch (error) {
            console.error("Error saving the admin data: ", error);
            res.status(500).json({ error: error.message });
        }
    },

    async updateAdminPassword(req, res) {
        const { id } = req.params;
        const { password } = req.body;

        try {
            if (!password) {
                return res.status(400).json({ error: "New password is required" });
            }

            // Hash the new password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const updatedAdmin = await AdminService.updateAdmin(id, { password: hashedPassword });

            if (!updatedAdmin) {
                return res.status(404).json({ error: "Admin not found" });
            }

            res.status(200).json({
                message: "Password updated successfully",
                admin: updatedAdmin,
            });
        } catch (error) {
            console.error("Error updating the password: ", error);
            res.status(500).json({ error: error.message });
        }
    },

    async loginAdmin(req, res) {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }

            const admin = await AdminService.findAdminByUsername(username);

            if (!admin) {
                return res.status(404).json({ error: "Admin not found" });
            }

            // Compare the entered password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            const token = jwt.sign({ admin_id: admin.id }, secretKey, {
                expiresIn: '7d', // 7 days expiration
            });

            

            res.status(200).json({
                message: "Login successful",
                admin: { id: admin.id, username: admin.username , role : "ADMIN", token},
            });
        } catch (error) {
            console.error("Error logging in the admin: ", error);
            res.status(500).json({ error: error.message });
        }
    },

    async fetchAllParticipants(req, res) {
        const admin_id = req.admin_id;
        const admin = AdminService.getAdminById(admin_id);
        if(!admin){
            return res.status(403).json({error : "Access Forbidden"});
        }
        const particpants = await ParticipantsService.allParticipants();

        res.status(200).json({
            message: "Participants fetched successfully ",
            particpants: particpants,
        });
    }
};

module.exports = AdminController;
