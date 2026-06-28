import type { Router } from "express";
import { managementReportingController } from "./controller";
import { manifest } from "./manifest";

export function registerManagementReportingRoutes(router: Router) {
  router.get(manifest.routeBase, managementReportingController.list);
  router.post(manifest.routeBase, managementReportingController.create);
  router.patch(`${manifest.routeBase}/:id`, managementReportingController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, managementReportingController.transition);
}
