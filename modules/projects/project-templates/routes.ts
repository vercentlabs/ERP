import type { Router } from "express";
import { projectTemplatesController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectTemplatesRoutes(router: Router) {
  router.get(manifest.routeBase, projectTemplatesController.list);
  router.post(manifest.routeBase, projectTemplatesController.create);
  router.patch(`${manifest.routeBase}/:id`, projectTemplatesController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectTemplatesController.transition);
}
