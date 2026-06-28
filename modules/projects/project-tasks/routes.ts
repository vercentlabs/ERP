import type { Router } from "express";
import { projectTasksController } from "./controller";
import { manifest } from "./manifest";

export function registerProjectTasksRoutes(router: Router) {
  router.get(manifest.routeBase, projectTasksController.list);
  router.post(manifest.routeBase, projectTasksController.create);
  router.patch(`${manifest.routeBase}/:id`, projectTasksController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, projectTasksController.transition);
}
