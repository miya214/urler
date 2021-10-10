export interface PROPS_PROFILE {
  id: number;
  nickname: string;
}

export interface PROPS_NICKNAME {
  nickname: string;
}

export interface PROFILE {
  id: number;
  user: string;
  nickname: string;
  created_on: string;
}

export interface RESPONSE_UPDATE_PROFILE_FAILURE {
  nickname: string[] | null;
  auth: string[] | null;
  code: string;
}

export interface PROFILE_STATE {
  isLoadingProf: boolean;
  openProfile: boolean;
  errorMessages: string[];
  myprofile: PROFILE;
  profiles: PROFILE[];
}
