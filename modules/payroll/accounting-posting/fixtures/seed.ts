import sample from "./sample.json";
import { accountingPostingService } from "../service";

export async function seedAccountingPosting() {
  return accountingPostingService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
