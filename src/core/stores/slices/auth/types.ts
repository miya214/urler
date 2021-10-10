export interface PROPS_AUTH {
  email: string;
  password: string;
}

export interface RESPONSE_AUTH {
  access: string;
  refresh: string;
}

export interface PROPS_REGISTER {
  email: string;
  password: string;
  re_password: string;
}

export interface RESPONSE_REGISTER_SUCCESS {
  id: string;
  email: string;
}

export interface RESPONSE_REGISTER_FAILURE {
  email: string[] | null;
  password: string[] | null;
  re_password: string[] | null;
}

export type RESPONSE_REGISTER =
  | RESPONSE_REGISTER_SUCCESS
  | RESPONSE_REGISTER_FAILURE;

export interface PROPS_USER_ACTIVATE {
  uid: string;
  token: string;
}

export interface PROPS_RESET_PASSWORD {
  email: string;
}

export interface PROPS_RESET_PASSWORD_CONFIRM {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

export interface RESPONSE_ERROR_MESSAGE {
  detail: string;
}

export interface AUTH_STATE {
  isAuth: boolean;
  isUserActive: boolean;
  isLoadingAuth: boolean;
  isAfterRegister: boolean;
  isAfterResetPassword: boolean;
  errorMessages: string[];
}
