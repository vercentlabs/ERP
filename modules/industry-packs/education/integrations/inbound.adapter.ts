export const educationInboundAdapter = {
  name: "industry-packs/education.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/education",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
