import type { Router } from "express";
import { programsController } from "./controller";
import { manifest } from "./manifest";

export function registerProgramsRoutes(router: Router) {
  router.get(manifest.routeBase, programsController.list);
  router.post(manifest.routeBase, programsController.create);
  router.patch(`${manifest.routeBase}/:id`, programsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, programsController.transition);
}
