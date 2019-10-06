import {combineReducers} from 'redux';
import SignInReducer from './SignInReducer'
import UserListReducer from './UserListReducer'

const rootReducer= combineReducers({
    SignInReducer,
    UserListReducer
})

export default rootReducer;
