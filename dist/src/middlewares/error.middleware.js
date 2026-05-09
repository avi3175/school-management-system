export const globalErrorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
//# sourceMappingURL=error.middleware.js.map