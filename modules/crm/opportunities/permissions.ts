export const permissions = {
  view: "crm.opportunities.view",
  create: "crm.opportunities.create",
  update: "crm.opportunities.update",
  delete: "crm.opportunities.delete",
  assign: "crm.opportunities.assign",
  changeStage: "crm.opportunities.change_stage",
  export: "crm.opportunities.export",
  viewForecast: "crm.opportunities.view_forecast",
} as const;

export type OpportunityPermission = (typeof permissions)[keyof typeof permissions];
