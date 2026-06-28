import type { Router } from "express";
import { projectsController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectsRoutes(router: Router) {
  router.get(manifest.routeBase, projectsController.list);
  router.post(manifest.routeBase, projectsController.create);
  router.patch(`${manifest.routeBase}/:id`, projectsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectsController.transition);
}
