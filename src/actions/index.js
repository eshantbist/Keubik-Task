import {LOG_IN,LOG_IN_SUCCESS,LOG_IN_FAILURE,SUPPRESS_SIGNIN_ERRORS,GET_LIST,SIGN_OUT} from './actionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export function authenticate(email, password) {
    return (dispatch) => {
      let lowerCaseEmail=email.toLowerCase();
      lowerCaseEmail =lowerCaseEmail.trim(lowerCaseEmail);
      dispatch(logIn())
        fetch('https://reqres.in/api/login',
        {
            method: 'POST',
            headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:lowerCaseEmail,password:password}),
        })
        .then(response => {
            response.json()
            .then(json => {
                if(json.hasOwnProperty('token')){
                    dispatch(logInSuccess())
                    AsyncStorage.setItem('user','true');
                    AsyncStorage.setItem('data',lowerCaseEmail);
                }
                else{
                    dispatch(logInFailure())
                }
            })
            .catch(err => {
                dispatch(logInFailure())
            })
        })
    }
  }

function logIn() {
    return {
        type: LOG_IN
    }
}

function logInSuccess() {
    return {
        type: LOG_IN_SUCCESS,
    }
}

function logInFailure() {
    return {
        type: LOG_IN_FAILURE,
    }
}

export function suppressLoginErrors(){
    return{
        type: SUPPRESS_SIGNIN_ERRORS,
    }
}

export function logOut(){
    return{
        type: SIGN_OUT,
    }
}

export function fetchList(email){
    return (dispatch) => {
        fetch('https://reqres.in/api/users?per_page=30')
        .then(response => {
            response.json()
            .then(json => {
                console.log(json.data);
                dispatch(getList(json.data))
            })
            .catch(err => {
                console.log(err)
            })
        })
    }
}

function getList(list){
    return{
        type:GET_LIST,
        list
    }
}
