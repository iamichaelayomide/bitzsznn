const EVENT = { slug: "batch-b2-pop-party-akure", title: "Batch B2 POP Party", price: 3000 };

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) return response.status(503).json({ error: "Payments are not configured yet." });

  const { email, eventSlug, name, phone, quantity: rawQuantity } = request.body || {};
  const quantity = Number(rawQuantity);
  if (eventSlug !== EVENT.slug) return response.status(400).json({ error: "This event is not available for payment." });
  if (!String(email || "").includes("@") || !String(name || "").trim() || !String(phone || "").trim()) {
    return response.status(400).json({ error: "Please provide valid buyer details." });
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
    return response.status(400).json({ error: "Choose between 1 and 10 tickets." });
  }

  const origin = (process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.host}`).replace(/\/$/, "");
  const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secretKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: String(EVENT.price * quantity * 100),
      callback_url: `${origin}/payments/callback`,
      currency: "NGN",
      email,
      metadata: { eventSlug: EVENT.slug, eventTitle: EVENT.title, name: String(name).trim(), phone: String(phone).trim(), quantity },
    }),
  });
  const result = await paystackResponse.json();
  if (!paystackResponse.ok || !result.status || !result.data?.authorization_url) {
    return response.status(502).json({ error: result.message || "Payment could not be started." });
  }
  return response.status(200).json({ authorizationUrl: result.data.authorization_url });
}
