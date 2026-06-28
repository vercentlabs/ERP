export type Connector = {
  id: string;
  name: string;
  authType: "api-key" | "oauth" | "webhook";
  scopes: string[];
};

export function defineConnector(connector: Connector) {
  return connector;
}
