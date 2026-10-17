
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const interviewRoutes = require("./routes/interviewroutes");
const chatRoutes = require("./routes/chat.routes");
const faceRoutes = require("./routes/faceroute");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://interview-dr4v.vercel.app",
    "https://interview-lovat-one.vercel.app",
    "https://interview-dr4v-emgb8shos-yash-pratap-singh-s-projects.vercel.app"
];

// CORS middleware must run before routes
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Interview backend is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/chatbot", chatRoutes);
app.use("/api/face", faceRoutes);

module.exports = app;
