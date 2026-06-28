export const slasInboundAdapter = {
  name: "helpdesk/slas.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/slas",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
