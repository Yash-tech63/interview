const express = require("express");
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const interviewRoutes = require("./routes/interviewroutes")
const chatRoutes = require("./routes/chat.routes")
const cors = require("cors")


const app = express();
app.use(cookieParser())
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://interview-lovat-one.vercel.app",
    "https://interview-dr4v-emgb8shos-yash-pratap-singh-s-projects.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        callback(null, !origin ||
            allowedOrigins.includes(origin) ||
            /^https:\/\/interview-[a-z0-9]+-yash-pratap-singh-s-projects\.vercel\.app$/.test(origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

app.use(
    "/api/chatbot",
    chatRoutes
);
const faceRoutes =
    require("./routes/faceroute");

app.use(
    "/api/face",
    faceRoutes
);
// app.get("/", {
//     message: "backened is running"
// })

module.exports = app;