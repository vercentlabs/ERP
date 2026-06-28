export const professionalServicesOutboundAdapter = {
  name: "industry-packs/professional-services.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/professional-services",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
