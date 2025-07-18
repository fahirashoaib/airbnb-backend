// server.js
const cookieParser = require("cookie-parser");
const connectDB = require("./dbConnect");
const { adminAuth, userAuth } = require("./middleware/auth");
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT;

// Cookie Parser
app.use(cookieParser());

// Middleware
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/user", userAuth, (req, res) => res.send("User Route"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Connecting the Database
connectDB();


// Routes
app.use("/api/Auth", require("./routes/user"));
app.use('/api/Auth', require('./routes/listings'));
app.use('/api/Auth', require('./routes/booking'));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})