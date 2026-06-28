export const receivingUpdateWorkflow = {
  module: "warehouse/receiving",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for warehouse/receiving record ${recordId}`;
  },
};
