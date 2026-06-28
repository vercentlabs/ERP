import sample from "./sample.json";
import { generalLedgerService } from "../service";

export async function seedGeneralLedger() {
  return generalLedgerService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
