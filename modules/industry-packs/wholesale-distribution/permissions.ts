export const permissions = {
  read: "industry-packs/wholesale-distribution:read",
  create: "industry-packs/wholesale-distribution:create",
  update: "industry-packs/wholesale-distribution:update",
  submit: "industry-packs/wholesale-distribution:submit",
  approve: "industry-packs/wholesale-distribution:approve",
  reject: "industry-packs/wholesale-distribution:reject",
  cancel: "industry-packs/wholesale-distribution:cancel",
  close: "industry-packs/wholesale-distribution:close",
  report: "industry-packs/wholesale-distribution:report",
} as const;

export type WholesaleDistributionPermission = (typeof permissions)[keyof typeof permissions];
