export const qualityCertificatesInboundAdapter = {
  name: "quality/quality-certificates.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-certificates",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
