import type { Router } from "express";
import { webhooksController } from "./controller";
import { manifest } from "./manifest";

export function registerWebhooksRoutes(router: Router) {
  router.get(manifest.routeBase, webhooksController.list);
  router.post(manifest.routeBase, webhooksController.create);
  router.patch(`${manifest.routeBase}/:id`, webhooksController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, webhooksController.transition);
}
