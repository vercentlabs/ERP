export const programsOutboundAdapter = {
  name: "projects/programs.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/programs",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
