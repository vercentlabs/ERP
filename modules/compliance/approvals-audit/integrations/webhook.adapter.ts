export const approvalsAuditWebhookAdapter = {
  name: "compliance/approvals-audit.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/approvals-audit",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
