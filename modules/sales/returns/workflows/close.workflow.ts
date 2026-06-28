export const returnsCloseWorkflow = {
  module: "sales/returns",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/returns record ${recordId}`;
  },
};
