export const returnsUpdateWorkflow = {
  module: "sales/returns",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/returns record ${recordId}`;
  },
};
