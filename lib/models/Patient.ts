import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  emergencyContact: {
    name: String,
    phoneNumber: String,
    relationship: String
  },
  medicalHistory: [{
    condition: String,
    diagnosis: String,
    date: Date
  }]
}, { timestamps: true });

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);