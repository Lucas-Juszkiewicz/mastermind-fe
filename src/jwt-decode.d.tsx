import "jwt-decode";

declare module "jwt-decode" {
  export interface JwtPayload {
    email: string; // Add other properties as needed
    preferred_username: string;
    userId: string;
    // sub?: string;
  }
}
