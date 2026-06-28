import type { Router } from "express";
import { usersController } from "./controller";
import { manifest } from "./manifest";

export function registerUsersRoutes(router: Router) {
  router.get(manifest.routeBase, usersController.list);
  router.post(manifest.routeBase, usersController.create);
  router.patch(`${manifest.routeBase}/:id`, usersController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, usersController.transition);
}
