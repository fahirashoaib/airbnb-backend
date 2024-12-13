const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        const admin = new User({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'adminpassword',
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created');
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
