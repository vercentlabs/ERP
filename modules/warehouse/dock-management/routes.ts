import type { Router } from "express";
import { dockManagementController } from "./controller";
import { manifest } from "./manifest";

export function registerDockManagementRoutes(router: Router) {
  router.get(manifest.routeBase, dockManagementController.list);
  router.post(manifest.routeBase, dockManagementController.create);
  router.patch(`${manifest.routeBase}/:id`, dockManagementController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, dockManagementController.transition);
}
