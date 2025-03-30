export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Méthode non autorisée");
  }

  const messageData = req.body?.messages?.[0];
  if (!messageData) {
    return res.status(200).send("Aucun message à traiter");
  }

  const from = messageData.from;
  const userMessage = messageData.text?.body || "";

  console.log(`📩 Message reçu de ${from}: ${userMessage}`);

  // 👉 Logique IA (exemple simple pour commencer)
  let response = "Merci pour votre message. Nous vous répondons dans les meilleurs délais.";

  if (userMessage.toLowerCase().includes("scpi")) {
    response = "Nos SCPI : Cœur de Régions, Cœur d’Europe, Cœur de Ville, Cœur d’Avenir. Souhaitez-vous un comparatif ?";
  } else if (userMessage.toLowerCase().includes("opci") || userMessage.toLowerCase().includes("opci france")) {
    response = "L’OPPCI France Régions Opportunités est accessible à partir de 100 000 € via un réemploi de 150-0 B Ter.";
  }

  // 👉 Appel à l’API WhatsApp pour répondre automatiquement
  const axios = (await import("axios")).default;
  const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
  const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

  await axios.post(
    `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: from,
      text: { body: response },
    },
    {
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.status(200).send("Message traité");
}
