
require("dotenv").config();

const app = require("./src/app");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/db/db");

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://interview-lovat-one.vercel.app",
    "https://interview-dr4v-q5hla6saz-yash-pratap-singh-s-projects.vercel.app"
];

// CORS configuration
app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", "true");
    }

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Health-check route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running"
    });
});

// Database connection
connectDB();

// Local server + Socket.IO
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-message", (data) => {
        io.emit("receive-message", data);
    });
});

// Local development only
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
