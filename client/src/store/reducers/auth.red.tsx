import * as actionTypes from "../actions/actionTypes/auth";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: false,
  loginError:null,
  message: null,
  userId: null,
  registerError: null,
  registerResp: null
};

const authStart = (state: any) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state: any, action: any) => {
  if(action.action==='login')
  {
    return updateObject(state, {
      token: action.data,
      error: null,
      loading: false,
      });

  }else if(action.action==='register'){
    console.log(action.data)
    return updateObject(state, {
      registerResp: action.data,
      error: null,
      loading: false,
      });
  }

};

const authFail = (state: any, action: any) => {
    
  if(action.action==='login')
  {
    return updateObject(state, {
      loginError: action.message,
      loading: false
    });
  } else if(action.action==='register') {
    return updateObject(state, {
      registerError: action.message,
      loading: false
    });
  }
}

const authLogout = (state:any) => {
  return updateObject(state, {
    token: null,
    userId:null,
    userName:null
  });
};

const resetMessage = (state:any) => {
  return updateObject(state, {
    registerError: null,
    registerResp: null,
    loginError: null
  })
}

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);

    case actionTypes.RESET_ALERT_MESSAGE:
      return resetMessage(state);

    default:
      return state;
  }
};

export default auth;