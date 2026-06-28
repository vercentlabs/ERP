import type { Router } from "express";
import { importsController } from "./controller";
import { manifest } from "./manifest";

export function registerImportsRoutes(router: Router) {
  router.get(manifest.routeBase, importsController.list);
  router.post(manifest.routeBase, importsController.create);
  router.patch(`${manifest.routeBase}/:id`, importsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, importsController.transition);
}
