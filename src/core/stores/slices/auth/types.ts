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

export interface RESPONSE_REGISTER {
  email: string;
  id: string;
}

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

export interface AUTH_STATE {
  isAuth: boolean;
  isLoadingAuth: boolean;
  isAfterRegister: boolean;
  isAfterResetPassword: boolean;
}
