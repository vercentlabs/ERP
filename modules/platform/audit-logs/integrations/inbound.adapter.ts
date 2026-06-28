export const auditLogsInboundAdapter = {
  name: "platform/audit-logs.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/audit-logs",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
