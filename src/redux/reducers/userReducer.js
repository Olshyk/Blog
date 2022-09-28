const initialState = {
  isLogin: false,
  user: {},
  isError: false,
  isErrorName: false,
  isErrorMail: false,
  isEditError: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, isLogin: true, user: action.payload };
    case 'SET_USER_ERROR':
      return { ...state, isError: action.payload };
    case 'SET_EDIT_ERROR':
      return { ...state, isEditError: action.payload };
    case 'SET_USERNAME_ERROR':
      return { ...state, isErrorName: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, isErrorMail: action.payload };
    case 'LOGOUT':
      return { ...state, isLogin: false, user: {} };
    default:
      return state;
  }
};
