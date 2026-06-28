export type ApprovalStep = {
  name: string;
  role: string;
  minAmount?: number;
};

export function resolveApprovalSteps(amount: number, steps: ApprovalStep[]) {
  return steps.filter((step) => step.minAmount === undefined || amount >= step.minAmount);
}
