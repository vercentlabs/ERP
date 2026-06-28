import sample from "./sample.json";
import { creditNotesService } from "../service";

export async function seedCreditNotes() {
  return creditNotesService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
