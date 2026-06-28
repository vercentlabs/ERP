export const permissions = {
  read: "hr/onboarding:read",
  create: "hr/onboarding:create",
  update: "hr/onboarding:update",
  submit: "hr/onboarding:submit",
  approve: "hr/onboarding:approve",
  reject: "hr/onboarding:reject",
  cancel: "hr/onboarding:cancel",
  close: "hr/onboarding:close",
  report: "hr/onboarding:report",
} as const;

export type OnboardingPermission = (typeof permissions)[keyof typeof permissions];
