export type User = {
    id: string;
    name: string;
    email: string;
    sex: string;
    country: string;
    city: string;
    phoneNumber: string;
    description: string;
    username: string;
    password: boolean;
    role: string;
    active: boolean;
    tokenExpiredAt: string;
    match: {
      id: string;
      username: string;
      matchName: string;
      match: boolean;
    };
    action: {
      id: string;
      name: string;
      DATA: boolean;
      USER: boolean;
      USER_ADD: boolean;
      USER_UPDATE: boolean;
      USER_DELETE: boolean;
    };
  };
  
  export interface Match {
    id: string;
    username: string;
    matchName: string;
    match: boolean;
  };
  
  export interface Action {
    id: string;
    name: string;
  }
  