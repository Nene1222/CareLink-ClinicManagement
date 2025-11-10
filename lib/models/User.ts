import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true },
  role: {
    type: String,
    enum: [
      'admin',
      'doctor',
      'nurse',
      'receptionist',
      'pharmacist',
      'labTechnician',
      'accountant',
      'patient'
    ],
    required: true
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  profileImage: String,
  contactNumber: String,
}, { timestamps: true });

UserSchema.plugin(bcrypt);

export default mongoose.models.User || mongoose.model('User', UserSchema);