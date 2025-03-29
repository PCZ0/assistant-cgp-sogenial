import express from "express";
import { sendMessage } from "./api/whatsapp.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ➤ Test simple : ouvre http://localhost:3000/send dans ton navigateur
app.get("/send", async (req, res) => {
  const testNumber = "33766233115"; // ← ton numéro WhatsApp testé dans 360dialog
  const testMessage = "Bonjour 👋 ceci est un test automatique depuis l'assistant CGP - Sogenial !";

  await sendMessage(testNumber, testMessage);
  res.send("✅ Message envoyé !");
});

app.listen(3000, () => {
  console.log("✅ Serveur lancé sur http://localhost:3000");
});
