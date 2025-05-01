import PreAdmission from '../models/PreAdmission.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitForm = async (req, res) => {
  const {
    fullName,
    fatherName,
    motherName,
    dob,
    gender,
    phone,
    email,
    courses = [],
    colleges = [],
    cities = [],
    category,
    remarks = "",
  } = req.body;

  try {
    // 1. Send welcome email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to Our Institution!',
      html: `
        <h2>Welcome, ${fullName}!</h2>
        <p>Thank you for submitting your pre-admission form. We’re excited to have you join our institution.</p>
        <h4>Your details:</h4>
        <ul>
          <li><strong>Father’s Name:</strong> ${fatherName}</li>
          <li><strong>Mother’s Name:</strong> ${motherName}</li>
          <li><strong>DOB:</strong> ${dob}</li>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Courses:</strong> ${courses.join(', ')}</li>
          <li><strong>Colleges:</strong> ${colleges.join(', ')}</li>
          <li><strong>Cities:</strong> ${cities.join(', ')}</li>
          <li><strong>Category:</strong> ${category}</li>
          <li><strong>Remarks:</strong> ${remarks || 'None provided'}</li>
        </ul>
        <p>If you have any questions, feel free to reach out.</p>
      `,
    });

    // 2. Send admin notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '📝 New Pre-Admission Submission',
      html: `
        <h3>New Submission from ${fullName}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Father’s Name:</strong> ${fatherName}</p>
        <p><strong>Mother’s Name:</strong> ${motherName}</p>
        <p><strong>DOB:</strong> ${dob}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Courses:</strong> ${courses.join(', ')}</p>
        <p><strong>Colleges:</strong> ${colleges.join(', ')}</p>
        <p><strong>Cities:</strong> ${cities.join(', ')}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Remarks:</strong> ${remarks || 'None provided'}</p>
      `,
    });

    // 3. Save to MongoDB
    const newForm = new PreAdmission({
      fullName,
      fatherName,
      motherName,
      dob,
      gender,
      phone,
      email,
      courses,
      colleges,
      cities,
      category,
      remarks,
    });

    await newForm.save();

    // 4. Respond to frontend
    res.status(200).json({ message: 'Form submitted, emails sent & saved to DB!' });
  } catch (err) {
    console.error('Error in /api/submit-form:', err);
    res.status(500).json({ error: 'Server error sending emails or saving data' });
  }
};

export const getPreAdmissions = async (req, res) => {
  try {
    const forms = await PreAdmission.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (err) {
    console.error('Error fetching pre-admissions:', err);
    res.status(500).json({ error: 'Error fetching data' });
  }
};

export const getPreAdmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await PreAdmission.findById(id);  // Corrected 'Preadmission' to 'PreAdmission'
    if (!student) {
      return res.status(404).json({ message: 'Pre-admission student not found' });  // Corrected message
    }
    res.json(student);
  } catch (err) {
    console.error('Error fetching pre-admission by ID:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};


