const initialState = {
  signInError: false,
  success:false,
  loading:false
}

const SignInReducer=(state = initialState, action) => {
  switch(action.type) {
    case 'LOG_IN':
      return {
        ...state,
        signInError: false,
        success:false,
        signInErrorMessage: '',
        loading:true,
      }
    case 'LOG_IN_SUCCESS':
      return {
        signInError: false,
        success:true,
        loading:false,
      }
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        signInError: true,
        success:false,
        loading:false,
      }

    case 'SIGN_OUT':
      return {
        ...state,
        success:false
      }

    case 'SUPPRESS_SIGNIN_ERRORS':
      return{
        signInError: false,
      }

    default:
      return state
  }
}

export default SignInReducer;
