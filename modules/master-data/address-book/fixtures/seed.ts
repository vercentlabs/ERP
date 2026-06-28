import sample from "./sample.json";
import { addressBookService } from "../service";

export async function seedAddressBook() {
  return addressBookService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
