const express = require("express");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const adminRoutes = require("./routes/admin");
const stateRoutes = require("./routes/state");
const districtRoutes = require("./routes/district");
const prisma = require("@prisma/client").PrismaClient;


const PORT=process.env.PORT|| 3000;
const app = express();
const prismaClient = new prisma();

app.use(express.json());
app.use(sessionMiddleware);

app.get("/", (req,res)=>{
    res.send("Hi you are on the home pae now");
})

// Simulate Login for Testing
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await prismaClient.user.findUnique({
        where: { username },
    });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.user = { id: user.id, role: user.role };
    res.json({ message: "Login successful", role: user.role });
});

app.use("/admin", adminRoutes);
app.use("/state", stateRoutes);
app.use("/district", districtRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 
