export const permissions = {
  view: "crm.leads.view",
  create: "crm.leads.create",
  update: "crm.leads.update",
  delete: "crm.leads.delete",
  assign: "crm.leads.assign",
  convert: "crm.leads.convert",
  export: "crm.leads.export",
} as const;

export type LeadPermission = (typeof permissions)[keyof typeof permissions];
