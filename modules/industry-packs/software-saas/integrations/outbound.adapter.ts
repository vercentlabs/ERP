export const softwareSaasOutboundAdapter = {
  name: "industry-packs/software-saas.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/software-saas",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
