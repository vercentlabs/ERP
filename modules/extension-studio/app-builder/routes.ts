import type { Router } from "express";
import { appBuilderController } from "./controller";
import { manifest } from "./manifest";

export function registerAppBuilderRoutes(router: Router) {
  router.get(manifest.routeBase, appBuilderController.list);
  router.post(manifest.routeBase, appBuilderController.create);
  router.patch(`${manifest.routeBase}/:id`, appBuilderController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, appBuilderController.transition);
}
