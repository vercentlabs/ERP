export type OAuthToken = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
};

export function isTokenExpired(token: OAuthToken, now = new Date()) {
  return token.expiresAt ? new Date(token.expiresAt) <= now : false;
}
