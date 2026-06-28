export const onboardingCloseWorkflow = {
  module: "hr/onboarding",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for hr/onboarding record ${recordId}`;
  },
};
