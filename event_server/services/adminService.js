const Admin = require("../models/adminModel");

const AdminService = {
    async createAdmin(adminData) {
        console.log(adminData,"----------admindata")
        try {

            const admin = await Admin.create(adminData);
            console.log(admin,"----------------admin")
            return admin;
        } catch (error) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    },

    async getAdminById(id) {
        try {
            const admin = await Admin.findByPk(id);
            return admin;
        } catch (error) {
            throw new Error(`Error fetching admin: ${error.message}`);
        }
    },



    async updateAdmin(id, updates) {
        try {
            const [affectedRows, updatedAdmins] = await Admin.update(updates, {
                where: { id },
                returning: true, // Returns the updated rows
            });

            return affectedRows > 0 ? updatedAdmins[0] : null;
        } catch (error) {
            throw new Error(`Error updating admin: ${error.message}`);
        }
    },

    async findAdminByUsername(username) {
        try {
            const admin = await Admin.findOne({
                where: { username },
            });
            return admin;
        } catch (error) {
            console.log("Erroro while sign in : ", error)
            throw new Error(`Error finding admin by username: ${error.message}`);
        }
    },
};

module.exports = AdminService;
