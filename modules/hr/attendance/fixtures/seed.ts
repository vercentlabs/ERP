import sample from "./sample.json";
import { attendanceService } from "../service";

export async function seedAttendance() {
  return attendanceService.create(sample, {
    tenantId: sample.tenantId,
    actorId: "seed",
    roles: ["admin"],
    permissions: ["*"],
  });
}
