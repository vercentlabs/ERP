export const routesOutboundAdapter = {
  name: "logistics/routes.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/routes",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
