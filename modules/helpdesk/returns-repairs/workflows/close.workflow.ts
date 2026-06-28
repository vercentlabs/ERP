export const returnsRepairsCloseWorkflow = {
  module: "helpdesk/returns-repairs",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/returns-repairs record ${recordId}`;
  },
};
