import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://vivid-nexus-sprint-one.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vivid Nexus backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend health check OK",
  });
});

app.post("/api/leads", async (req, res) => {
  const {
    clientName,
    email,
    whatsappNumber,
    corporateUrl,
    selectedPlan,
    planPrice,
    message,
    timestamp,
  } = req.body;

  if (!clientName || !email || !whatsappNumber) {
    return res.status(400).json({
      success: false,
      message: "Client name, email, and WhatsApp number are required",
    });
  }

  console.log("Lead received:", req.body);

  const leadText = `
New Vivid Nexus Lead

Client Name: ${clientName}
Client Email: ${email}
WhatsApp Number: ${whatsappNumber}
Corporate / Business URL: ${corporateUrl || "Not provided"}

Selected Plan: ${selectedPlan || "Not provided"}
Plan Price: ${planPrice || "Not provided"}

Message:
${message || "No message provided"}

Submitted At: ${timestamp || new Date().toISOString()}
`;

  res.status(200).json({
    success: true,
    message: "Lead submitted successfully",
  });

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS || !process.env.CEO_EMAIL) {
    console.error("Lead email skipped: missing mail env variables");
    return;
  }

  try {
    await sendLeadEmail({ email, selectedPlan, leadText });
  } catch (error) {
    console.error("Lead email failed:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Vivid Nexus backend running on port ${PORT}`);
});