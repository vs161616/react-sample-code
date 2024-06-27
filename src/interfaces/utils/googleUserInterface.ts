/**
 * Interface representing user information retrieved from Google authentication.
 */
export interface UserInfo {
  /** The issuer identifier for the token, representing the identity provider that issued the token. */
  iss: string;

  /** The authorized party that can use the token. */
  azp: string;

  /** The audience for the token, typically the client ID of your application. */
  aud: string;

  /** The subject identifier for the token, usually the user ID. */
  sub: string;

  /** The hosted domain name for Google Apps for Work accounts. */
  hd: string;

  /** The user's email address. */
  email: string;

  /** Indicates whether the user's email address has been verified. */
  email_verified: boolean;

  /** The "not before" time, indicating when the token becomes valid. */
  nbf: number;

  /** The user's full name. */
  name: string;

  /** URL to the user's profile picture. */
  picture: string;

  /** The user's given name (first name). */
  given_name: string;

  /** The user's family name (last name). */
  family_name: string;

  /** The issued at time, indicating when the token was generated. */
  iat: number;

  /** The expiration time, indicating when the token expires. */
  exp: number;

  /** Unique identifier for the token. */
  jti: string;
}
