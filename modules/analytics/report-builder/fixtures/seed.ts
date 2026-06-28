import sample from "./sample.json";
import { reportBuilderService } from "../service";

export async function seedReportBuilder() {
  return reportBuilderService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
