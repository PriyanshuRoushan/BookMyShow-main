import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true, 
        unique: true 
    },
   phone: {
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true, minlength: 8, select: false },
    createdAt: 
    { 
        type: Date, 
        default: Date.now 
    }
});

userSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
