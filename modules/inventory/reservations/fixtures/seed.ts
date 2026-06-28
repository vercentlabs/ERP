import sample from "./sample.json";
import { reservationsService } from "../service";

export async function seedReservations() {
  return reservationsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
