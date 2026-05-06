import app from "./app.js";
import { env } from "./config/env.js";
const PORT = env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map