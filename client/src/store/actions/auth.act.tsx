import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    RESET_ALERT_MESSAGE
} from "./actionTypes/auth";
import { authService } from "../../services/auth.service"

export const authStart = () => {
    return {
      type: AUTH_START
    };
};

export const authSuccess = (data:string | string[], action: string) => {
    return {
        type: AUTH_SUCCESS,
        data: data,
        action: action,
    }
}

export const authFail = (message :any, action: string) => {
    return {
        type: AUTH_FAIL,
        message: message,
        action: action
    }
}

export const resetMessage = () => {
  return {
    type: RESET_ALERT_MESSAGE
  }
}

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};


export const authSignup = (data: any, action: any) => {
    return (dispatch:any) => {
      dispatch(authStart());
      authService
        .register(data)
        .then(res => {
          if (res.data.status === 200) {
            const email = res.data.email;
            dispatch(authSuccess(email, action));
          } else if(res.data.error.status === 409){
            dispatch(authFail(res.data.error.message, action));
          }
        })
        .catch(err => {
          dispatch(authFail(err,action))
        });
        setTimeout(() => {
          dispatch(resetMessage());
        }, 5000);
    };
}


export const authLogin = (data: any, action: any) => {
  return (dispatch:any) => {
    dispatch(authStart());
    authService
      .login(data)
      .then(res => {
        if (res.data.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token",token);
          dispatch(authSuccess(token, action));
        } else if(res.data.err.status === 404 || res.data.err.status === 401){
          dispatch(authFail(res.data.err.message, action));
        }
      })
      .catch(err => {
        dispatch(authFail({ err },action))
      });
      setTimeout(() => {
        dispatch(resetMessage());
      }, 5000);
  };
}
