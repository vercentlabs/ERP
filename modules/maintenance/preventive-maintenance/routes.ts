import type { Router } from "express";
import { preventiveMaintenanceController } from "./controller";
import { manifest } from "./manifest";

export function registerPreventiveMaintenanceRoutes(router: Router) {
  router.get(manifest.routeBase, preventiveMaintenanceController.list);
  router.post(manifest.routeBase, preventiveMaintenanceController.create);
  router.patch(`${manifest.routeBase}/:id`, preventiveMaintenanceController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, preventiveMaintenanceController.transition);
}
