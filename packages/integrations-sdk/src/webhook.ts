export type WebhookDelivery = {
  url: string;
  event: string;
  payload: unknown;
};

export async function deliverWebhook(delivery: WebhookDelivery) {
  const response = await fetch(delivery.url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ event: delivery.event, payload: delivery.payload }),
  });
  return { ok: response.ok, status: response.status };
}
