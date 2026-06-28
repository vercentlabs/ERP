export const receivingCloseWorkflow = {
  module: "warehouse/receiving",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for warehouse/receiving record ${recordId}`;
  },
};
