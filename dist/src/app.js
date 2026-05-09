import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Health check route
app.get("/", (req, res) => {
    res.send("Server is running...");
});
// API routes
app.use("/api/v1", routes);
// ❌ IMPORTANT: Global error handler MUST be last
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map