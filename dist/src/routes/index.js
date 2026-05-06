import { Router } from "express";
const router = Router();
// Example route
router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});
export default router;
//# sourceMappingURL=index.js.map