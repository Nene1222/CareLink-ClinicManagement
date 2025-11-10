import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialization: { type: String, required: true },
  qualification: [String],
  licenseNumber: { type: String, required: true },
  consultationFee: Number,
  availability: [{
    day: String,
    startTime: String,
    endTime: String
  }],
  department: String,
  experience: Number
}, { timestamps: true });

export default mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);