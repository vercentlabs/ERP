export const permissions = {
  view: "master_data.foundation.view",
  create: "master_data.foundation.create",
  update: "master_data.foundation.update",
  delete: "master_data.foundation.delete",
  export: "master_data.foundation.export",
} as const;

export type MasterDataPermission = (typeof permissions)[keyof typeof permissions];
