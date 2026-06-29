export interface KeycloakToken {
  realm_access: {
    roles: string[];
  };

  preferred_username: string;
  email: string;
  exp: number;
}
