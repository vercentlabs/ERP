export const events = {
  created: "crm.opportunity.created",
  updated: "crm.opportunity.updated",
  deleted: "crm.opportunity.deleted",
  stageChanged: "crm.opportunity.stage_changed",
  assigned: "crm.opportunity.assigned",
  won: "crm.opportunity.won",
  lost: "crm.opportunity.lost",
} as const;

export type OpportunityEventType = (typeof events)[keyof typeof events];
