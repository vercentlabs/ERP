export const events = {
  created: "crm.lead.created",
  updated: "crm.lead.updated",
  deleted: "crm.lead.deleted",
  statusChanged: "crm.lead.status_changed",
  assigned: "crm.lead.assigned",
  conversionStarted: "crm.lead.conversion_started",
  converted: "crm.lead.converted",
  partyCreatedFromLead: "master_data.party.created_from_lead",
  customerCreatedFromLead: "master_data.customer.created_from_lead",
} as const;

export type LeadEventType = (typeof events)[keyof typeof events];
