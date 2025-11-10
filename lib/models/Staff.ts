import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  specialization: { type: String },
  phoneNumber: { type: String },
}, { timestamps: true });

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema);