import type { Router } from "express";
import { documentsController } from "./controller";
import { manifest } from "./manifest";

export function registerDocumentsRoutes(router: Router) {
  router.get(manifest.routeBase, documentsController.list);
  router.post(manifest.routeBase, documentsController.create);
  router.patch(`${manifest.routeBase}/:id`, documentsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, documentsController.transition);
}
