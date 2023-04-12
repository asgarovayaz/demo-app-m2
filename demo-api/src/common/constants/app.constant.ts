export const APP_NAME = 'DEMO M2';
export const APP_DESCRIPTION = 'Demo with NestJS';
export const SUPPORT_COMPANY_NAME = 'Ayaz Asgarov';
export const SUPPORT_COMPANY_EMAIL = 'asgarov.ayaz@gmail.com';
export const SUPPORT_COMPANY_SITE = 'https://aatex.az';

export const SWAGGER_API_ROOT = 'documentation';
export const SWAGGER_API_NAME = `${APP_NAME} API`;
export const SWAGGER_API_DESCRIPTION = APP_DESCRIPTION;
export const SWAGGER_API_CURRENT_VERSION = '0.1';

export const SECRET_KEY_NAME = 'N_JWT_SECRET_KEY';
export const EXP_TIME_KEY_NAME = 'N_JWT_EXPIRATION_TIME';

export const REFRESH_TOKEN_SECRET_KEY_NAME = 'N_JWT_REFRESH_TOKEN_SECRET';
export const REFRESH_TOKEN_EXP_TIME_KEY_NAME =
  'N_JWT_REFRESH_TOKEN_EXPIRATION_TIME';

export const JWT_COOKIE_NAME = 'DEMOM2A';
export const REFRESH_TOKEN_COOKIE_NAME = 'DEMOM2R';

export const RESET_JWT_TOKEN_COOKIE = `${JWT_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`;
export const RESET_REFRESH_TOKEN_COOKIE = `${REFRESH_TOKEN_COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0`;

export const AuthCookieString = (token: string, jwtExpTime) => {
  return `${JWT_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${jwtExpTime}s`;
};

export const RefreshCookieString = (token: string, jwtExpTime) => {
  return `${REFRESH_TOKEN_COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${jwtExpTime}s`;
};
