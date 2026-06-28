export const leaveInboundAdapter = {
  name: "hr/leave.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/leave",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
