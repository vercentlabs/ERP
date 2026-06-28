export const qualityCertificatesOutboundAdapter = {
  name: "quality/quality-certificates.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-certificates",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
