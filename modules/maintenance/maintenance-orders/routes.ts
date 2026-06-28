import type { Router } from "express";
import { maintenanceOrdersController } from "./controller";
import { manifest } from "./manifest";

export function registerMaintenanceOrdersRoutes(router: Router) {
  router.get(manifest.routeBase, maintenanceOrdersController.list);
  router.post(manifest.routeBase, maintenanceOrdersController.create);
  router.patch(`${manifest.routeBase}/:id`, maintenanceOrdersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, maintenanceOrdersController.transition);
}
