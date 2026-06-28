export const segmentsCloseWorkflow = {
  module: "crm/segments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for crm/segments record ${recordId}`;
  },
};
