export const ticketsInboundAdapter = {
  name: "helpdesk/tickets.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/tickets",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
