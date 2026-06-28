const memory = new Map<string, string>();

export async function saveToken(token: string) {
  memory.set("token", token);
}

export async function readToken() {
  return memory.get("token");
}
