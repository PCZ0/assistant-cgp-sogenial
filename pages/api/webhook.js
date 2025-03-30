export default function handler(req, res) {
  if (req.method === "GET") {
    // Validation du webhook par 360dialog / Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("✅ Webhook vérifié !");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    console.log("📩 Message reçu :", JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  }
}
