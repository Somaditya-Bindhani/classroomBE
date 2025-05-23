const mongoose = require("mongoose");
const User = require("../models/student-model"); // Replace with the correct path to your User model
const dotenv = require("dotenv");
dotenv.config();
const userId = "6830e3997bfdbf12b4f50cbc";

// Utility to generate a fake date
const getRandomDate = () => {
  const day = Math.floor(Math.random() * 28) + 1;
  const month = Math.floor(Math.random() * 12) + 1;
  const year = 2025;
  return `${day}/${month}/${year}`;
};

// Random attendance type generator
const getRandomType = () => {
  const types = ["ATTENDED", "UNATTENDED", "CANCELLED"];
  return types[Math.floor(Math.random() * types.length)];
};

async function addAttendanceRecords() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // or your direct URI
    const user = await User.findById(userId);
    if (!user) {
      return console.log("User not found.");
    }

    user.subjects.forEach((subject) => {
      for (let i = 0; i < 20; i++) {
        subject.attendance.push({
          attendanceType: getRandomType(),
          date: getRandomDate(),
        });
      }
    });

    await user.save();
    console.log("20 randomized attendance records added per subject.");
  } catch (err) {
    console.error("Error updating user attendance:", err);
  } finally {
    await mongoose.disconnect();
  }
}

addAttendanceRecords();
