const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Import your route files here
const profileRoute = require("./routes/profileRoutes");
const userRoute = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const reactionRouter = require("./routes/reactionRoutes");
const commentRouter = require("./routes/commentRoutes");

app.use(express.json());

// Define your routes
app.use("/profile", profileRoute);
app.use("/user", userRoute);
app.use("/post", postRoutes);
app.use("/reaction", reactionRouter);
app.use("/comment", commentRouter);

// 404 Error Middleware
app.use((_req, res, _next) => {
	res.status(404).json({ message: "Route not found" });
});

// Central error handling middleware
app.use((err, _req, res, _next) => {
	console.error(err);
	res.status(500).json({ message: "Internal server error" });
});

// Connect to the database
mongoose
	.connect("DB_LOCAL")
	.then(() => {
		console.log("Connected to the database");
		const port = 5555;
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("Database connection error:", error);
	});
