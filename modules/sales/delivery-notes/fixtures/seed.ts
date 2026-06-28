import sample from "./sample.json";
import { deliveryNotesService } from "../service";

export async function seedDeliveryNotes() {
  return deliveryNotesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
