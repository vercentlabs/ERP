import type { Router } from "express";
import { exportsController } from "./controller";
import { manifest } from "./manifest";

export function registerExportsRoutes(router: Router) {
  router.get(manifest.routeBase, exportsController.list);
  router.post(manifest.routeBase, exportsController.create);
  router.patch(`${manifest.routeBase}/:id`, exportsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, exportsController.transition);
}
