console.log("🔄 Redeploy triggered");

export default function handler(req, res) {
  if (req.method === "GET") {
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
    return res.sendStatus(200);
  }

  res.sendStatus(404);
}
