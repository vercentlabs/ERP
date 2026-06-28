import sample from "./sample.json";
import { ticketsService } from "../service";

export async function seedTickets() {
  return ticketsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
