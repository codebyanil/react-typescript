const AUTH_KEY = 'app-auth'; // @todo use the auth key from env

export function getToken() {
  return localStorage.getItem(AUTH_KEY);
}

export function setToken(token: string) {
  return localStorage.setItem(AUTH_KEY, token);
}

export function removeToken() {
  return localStorage.removeItem(AUTH_KEY);
}
