import { describe, expect, it } from "vitest";
import { manifest } from "../manifest";

describe("hr/departments workflows", () => {
  it("is tenant-scoped and has a route base", () => {
    expect(manifest.tenantScoped).toBe(true);
    expect(manifest.routeBase).toContain("/api/");
  });
});
