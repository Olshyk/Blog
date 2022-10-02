import { createUser, login, updateUser } from '../../service';

export const setUser = (payload) => ({ type: 'SET_USER', payload });

export const setUserError = (payload) => ({ type: 'SET_USER_ERROR', payload });

export const editError = (payload) => ({ type: 'SET_EDIT_ERROR', payload });

export const isErrorUsername = (payload) => ({
  type: 'SET_USERNAME_ERROR',
  payload,
});

export const isErrorEmail = (payload) => ({
  type: 'SET_EMAIL_ERROR',
  payload,
});

export const logOut = () => ({ type: 'LOGOUT' });

export const registration = (payload) => async (dispatch) => {
  try {
    const res = await createUser(payload);
    if (res.username) {
      dispatch(isErrorUsername(true));
      return;
    }
    if (res.email) {
      dispatch(isErrorEmail(true));
      return;
    }
    dispatch(setUser(res.user));
    localStorage.setItem('token', JSON.stringify(res.user.token));
    localStorage.setItem('user', JSON.stringify(res.user));
    setUserError(false);
  } catch (e) {
    console.log(`error  ${e}`);
    dispatch(setUserError(true));
  }
};

export const auth = (payload) => async (dispatch) => {
  try {
    const res = await login(payload);
    dispatch(setUser(res.user));
    dispatch(setUserError(false));
  } catch (e) {
    console.log(`error  ${e}`);
    dispatch(setUserError(true));
  }
};

export const updateUserProfile = (payload) => async (dispatch) => {
  try {
    const res = await updateUser(payload);
    if (res.username) {
      dispatch(isErrorUsername(true));
      dispatch(editError(true));
    }
    if (res.email) {
      dispatch(isErrorEmail(true));
      dispatch(editError(true));
    }
    if (res.user) {
      dispatch(setUser(res.user));
      localStorage.setItem('user', JSON.stringify(res.user));
      dispatch(editError(false));
      dispatch(isErrorEmail(false));
      dispatch(isErrorUsername(false));
    }
  } catch (e) {
    console.log(`error  ${e}`);
    dispatch(editError(true));
  }
};
