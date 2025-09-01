import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();
app.get("/", (req, res) => {
    console.log("db= ", process.env.DB);
    return res.send("Hello Shivam!");
});
app.listen(process.env.PORT, () => {
    console.log(`server is running at ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map