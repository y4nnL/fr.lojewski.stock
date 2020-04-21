export const AUTH_NS = 'auth';

export const AUTH_USER = 'user';
export const AUTH_IS_AUTHENTICATED = 'isAuthenticated';
export const AUTH_LOGIN = 'login';
export const AUTH_LOGOUT = 'logout';

export const AUTH_GETTER_IS_AUTHENTICATED = `${AUTH_NS}/${AUTH_IS_AUTHENTICATED}`;

export const AUTH_MUTATION_USER = `${AUTH_NS}/${AUTH_USER}`;

export const AUTH_DISPATCH_LOGIN = `${AUTH_NS}/${AUTH_LOGIN}`;
export const AUTH_DISPATCH_LOGOUT = `${AUTH_NS}/${AUTH_LOGOUT}`;
