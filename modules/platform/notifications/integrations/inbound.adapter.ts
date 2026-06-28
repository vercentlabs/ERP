export const notificationsInboundAdapter = {
  name: "platform/notifications.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/notifications",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
