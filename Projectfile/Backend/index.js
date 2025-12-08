// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import authRoutes from "./routes/authRoutes.js"
// import adminRoutes from "./routes/adminRoutes.js"
// import flightRoutes from "./routes/flightRoutes.js"
// import customerRoutes from "./routes/customerRoutes.js"
// const app = express();

// app.use(express.json());
// app.use(bodyParser.json({limit: "30mb", extended: true}))
// app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
// app.use(cors());
// app.use(authRoutes,adminRoutes,flightRoutes,customerRoutes)
// // quick test route — copy/paste into index.js, restart server
// app.get('/fetch-flights', (req, res) => {
//   // sample data — format should match what frontend expects
//   const sample = [
//     {
//       _id: "1",
//       flightName: "Test Air 101",
//       flightId: "TA101",
//       origin: "Chennai",
//       destination: "Banglore",
//       departureTime: "10:00",
//       arrivalTime: "11:30",
//       basePrice: 2500,
//       totalSeats: 120
//     },
//     {
//       _id: "2",
//       flightName: "Test Air 202",
//       flightId: "TA202",
//       origin: "Banglore",
//       destination: "Chennai",
//       departureTime: "15:00",
//       arrivalTime: "16:30",
//       basePrice: 2600,
//       totalSeats: 60
//     }
//   ];
//   res.json(sample);
// });

// const PORT = 6001;
// mongoose.connect('mongodb://localhost:27017/FlightBookingMERN', { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// ).then(()=>{
//     console.log("Connected to db")
// }
// ).catch((e)=> console.log(`Error in db connection ${e}`));
// app.get('/fetch-flights', (req, res) => {
//   res.json([
//    { 
//       _id: "1",
//       flightName: "Indigo 101",
//       flightId: "6E101",
//       origin: "Chennai",
//       destination: "Banglore",
//       departureTime: "10:00 AM",
//       arrivalTime: "11:20 AM",
//       basePrice: 3200,
//       totalSeats: 120
//     },
//     {
//       _id: "2",
//       flightName: "Air India 202",
//       flightId: "AI202",
//       origin: "Banglore",
//       destination: "Chennai",
//       departureTime: "03:00 PM",
//       arrivalTime: "04:15 PM",
//       basePrice: 3500,
//       totalSeats: 80
//     }
//   ]);
// });
// app.get('/fetch-flights', (req, res) => {
//   res.json([
//     {
//       _id: "1",
//       flightName: "Indigo 101",
//       flightId: "6E101",
//       origin: "Chennai",
//       destination: "Banglore",
//       departureTime: "10:00 AM",
//       arrivalTime: "11:20 AM",
//       basePrice: 3200,
//       totalSeats: 120
//     },
//     {
//       _id: "2",
//       flightName: "Air India 202",
//       flightId: "AI202",
//       origin: "Banglore",
//       destination: "Chennai",
//       departureTime: "03:00 PM",
//       arrivalTime: "04:15 PM",
//       basePrice: 3500,
//       totalSeats: 80
//     }
//   ]);
// });
//         app.listen(PORT, ()=>{
//             console.log(`Running @ ${PORT}`);
//         });
// index.js (paste this entire file, replacing your current index.js)
import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import flightRoutes from "./routes/flightRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// register your routers exactly as before (keeps existing behavior)
// Temporary route to create a test user (REMOVE AFTER USE)
import bcrypt from 'bcrypt';
import User from './models/UserSchema.js'; // <-- adjust this path if your model file is in a different folder

app.get('/create-test-user', async (req, res) => {
  try {
    const email = 'sen123@gmail.com';
    const plain = '23456';

    // check if already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ ok: true, message: 'Test user already exists', email });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plain, salt);

    const newUser = new User({
      email,
      password: hashed,
      usertype: 'customer',   // change if your schema uses a different field name/value
      approval: 'approved'
    });

    await newUser.save();
    return res.json({ ok: true, message: 'Test user created', email });
  } catch (err) {
    console.error('create-test-user error', err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});
app.use(authRoutes, adminRoutes, flightRoutes, customerRoutes);

// --------------------
// IMPORTANT: Only one test route, placed AFTER the other routers so it won't be overridden
// Temporary test route — remove this once your real DB route works
app.get('/fetch-flights', (req, res) => {
  return res.json([
    {
      _id: "1",
      flightName: "Indigo 101",
      flightId: "6E101",
      origin: "Chennai",
      destination: "Banglore",
      departureTime: "10:00 AM",
      arrivalTime: "11:20 AM",
      basePrice: 3200,
      totalSeats: 120
    },
    {
      _id: "2",
      flightName: "Air India 202",
      flightId: "AI202",
      origin: "Banglore",
      destination: "Chennai",
      departureTime: "03:00 PM",
      arrivalTime: "04:15 PM",
      basePrice: 3500,
      totalSeats: 80
    }
  ]);
});
// --------------------

const PORT = process.env.PORT || 6002;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/FlightBookingMERN";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to db");
  app.listen(PORT, () => {
    console.log(`Running @ ${PORT}`);
  });
})
.catch((err) => {
  console.error("Error in db connection", err);
});