import { sendMessage } from './whatsapp.js';

export default async function handler(req, res) {
  const testNumber = process.env.PHONE_NUMBER_ID;
  const testMessage = "Bonjour 👋 ceci est un test automatique depuis l'assistant CGP - Sogenial !";

  try {
    await sendMessage(testNumber, testMessage);
    res.status(200).send("✅ Message envoyé !");
  } catch (error) {
    res.status(500).send("❌ Erreur lors de l'envoi");
  }
}
