import type { Router } from "express";
import { oauthConnectionsController } from "./controller";
import { manifest } from "./manifest";

export function registerOauthConnectionsRoutes(router: Router) {
  router.get(manifest.routeBase, oauthConnectionsController.list);
  router.post(manifest.routeBase, oauthConnectionsController.create);
  router.patch(`${manifest.routeBase}/:id`, oauthConnectionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, oauthConnectionsController.transition);
}
