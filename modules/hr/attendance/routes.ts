import type { Router } from "express";
import { attendanceController } from "./controller";
import { manifest } from "./manifest";

export function registerAttendanceRoutes(router: Router) {
  router.get(manifest.routeBase, attendanceController.list);
  router.post(manifest.routeBase, attendanceController.create);
  router.patch(`${manifest.routeBase}/:id`, attendanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, attendanceController.transition);
}
