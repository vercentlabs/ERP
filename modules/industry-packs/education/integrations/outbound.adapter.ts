export const educationOutboundAdapter = {
  name: "industry-packs/education.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/education",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
