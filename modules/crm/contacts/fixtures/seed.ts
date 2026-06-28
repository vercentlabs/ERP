import sample from "./sample.json";
import { contactsService } from "../service";

export async function seedContacts() {
  return contactsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
