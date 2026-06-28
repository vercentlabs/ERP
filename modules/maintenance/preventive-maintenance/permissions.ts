export const permissions = {
  read: "maintenance/preventive-maintenance:read",
  create: "maintenance/preventive-maintenance:create",
  update: "maintenance/preventive-maintenance:update",
  submit: "maintenance/preventive-maintenance:submit",
  approve: "maintenance/preventive-maintenance:approve",
  reject: "maintenance/preventive-maintenance:reject",
  cancel: "maintenance/preventive-maintenance:cancel",
  close: "maintenance/preventive-maintenance:close",
  report: "maintenance/preventive-maintenance:report",
} as const;

export type PreventiveMaintenancePermission = (typeof permissions)[keyof typeof permissions];
