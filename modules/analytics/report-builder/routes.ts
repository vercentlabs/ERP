import type { Router } from "express";
import { reportBuilderController } from "./controller";
import { manifest } from "./manifest";

export function registerReportBuilderRoutes(router: Router) {
  router.get(manifest.routeBase, reportBuilderController.list);
  router.post(manifest.routeBase, reportBuilderController.create);
  router.patch(`${manifest.routeBase}/:id`, reportBuilderController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, reportBuilderController.transition);
}
