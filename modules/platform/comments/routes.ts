import type { Router } from "express";
import { commentsController } from "./controller";
import { manifest } from "./manifest";

export function registerCommentsRoutes(router: Router) {
  router.get(manifest.routeBase, commentsController.list);
  router.post(manifest.routeBase, commentsController.create);
  router.patch(`${manifest.routeBase}/:id`, commentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, commentsController.transition);
}
