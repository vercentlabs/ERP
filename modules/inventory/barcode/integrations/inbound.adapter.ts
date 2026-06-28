export const barcodeInboundAdapter = {
  name: "inventory/barcode.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/barcode",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
