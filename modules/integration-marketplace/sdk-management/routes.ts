import type { Router } from "express";
import { sdkManagementController } from "./controller";
import { manifest } from "./manifest";

export function registerSdkManagementRoutes(router: Router) {
  router.get(manifest.routeBase, sdkManagementController.list);
  router.post(manifest.routeBase, sdkManagementController.create);
  router.patch(`${manifest.routeBase}/:id`, sdkManagementController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, sdkManagementController.transition);
}
