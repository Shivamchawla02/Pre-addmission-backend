import mongoose from 'mongoose';

const preAdmissionSchema = new mongoose.Schema({
  fullName: String,
  fatherName: String,
  motherName: String,
  dob: String,
  gender: String,
  email: String,
  phone: String,
  courses: [String],
  colleges: [String],
  cities: [String],
  category: String,
  remarks: String,
}, { timestamps: true });

const PreAdmission = mongoose.model('PreAdmission', preAdmissionSchema);
export default PreAdmission;
