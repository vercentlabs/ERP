export const serialBatchesWebhookAdapter = {
  name: "inventory/serial-batches.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/serial-batches",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
