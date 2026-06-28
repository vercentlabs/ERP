export const returnsRepairsOutboundAdapter = {
  name: "helpdesk/returns-repairs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/returns-repairs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
