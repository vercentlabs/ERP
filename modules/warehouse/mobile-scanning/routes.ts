import type { Router } from "express";
import { mobileScanningController } from "./controller";
import { manifest } from "./manifest";

export function registerMobileScanningRoutes(router: Router) {
  router.get(manifest.routeBase, mobileScanningController.list);
  router.post(manifest.routeBase, mobileScanningController.create);
  router.patch(`${manifest.routeBase}/:id`, mobileScanningController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, mobileScanningController.transition);
}
