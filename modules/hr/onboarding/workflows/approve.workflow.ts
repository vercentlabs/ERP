export const onboardingApproveWorkflow = {
  module: "hr/onboarding",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/onboarding record ${recordId}`;
  },
};
