import sample from "./sample.json";
import { payslipsService } from "../service";

export async function seedPayslips() {
  return payslipsService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
