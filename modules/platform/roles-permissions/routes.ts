import type { Router } from "express";
import { rolesPermissionsController } from "./controller";
import { manifest } from "./manifest";

export function registerRolesPermissionsRoutes(router: Router) {
  router.get(manifest.routeBase, rolesPermissionsController.list);
  router.post(manifest.routeBase, rolesPermissionsController.create);
  router.patch(`${manifest.routeBase}/:id`, rolesPermissionsController.update);
  router.post(`${manifest.routeBase}/:id/:action(submit|approve|reject|cancel|close)`, rolesPermissionsController.transition);
}
