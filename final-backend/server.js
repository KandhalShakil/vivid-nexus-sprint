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
  try {
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

    if (!process.env.WEB3FORMS_ACCESS_KEY) {
      console.error("Missing WEB3FORMS_ACCESS_KEY");
      return res.status(500).json({
        success: false,
        message: "Email service is not configured",
      });
    }

    console.log("Lead received:", req.body);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New Lead - ${selectedPlan || "Vivid Nexus"}`,
        from_name: "Vivid Nexus Website",
        name: clientName,
        email,
        phone: whatsappNumber,
        corporateUrl: corporateUrl || "Not provided",
        selectedPlan: selectedPlan || "Not provided",
        planPrice: planPrice || "Not provided",
        message: message || "No message provided",
        submittedAt: timestamp || new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Web3Forms failed:", data);
      return res.status(500).json({
        success: false,
        message: "Failed to send lead email",
      });
    }

    console.log("Lead email sent successfully via Web3Forms");

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("Lead submission failed:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit lead",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Vivid Nexus backend running on port ${PORT}`);
});