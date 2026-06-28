import type { Router } from "express";
import { constructionController } from "./controller";
import { manifest } from "./manifest";

export function registerConstructionRoutes(router: Router) {
  router.get(manifest.routeBase, constructionController.list);
  router.post(manifest.routeBase, constructionController.create);
  router.patch(`${manifest.routeBase}/:id`, constructionController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, constructionController.transition);
}
