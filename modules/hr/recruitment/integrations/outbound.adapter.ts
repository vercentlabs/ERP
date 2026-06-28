export const recruitmentOutboundAdapter = {
  name: "hr/recruitment.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/recruitment",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
