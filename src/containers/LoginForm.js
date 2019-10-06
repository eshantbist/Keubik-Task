import React, { Component } from 'react';
import { View, ActivityIndicator,Text, TextInput, TouchableOpacity,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticate,suppressLoginErrors} from '../actions'
import AsyncStorage from '@react-native-community/async-storage';
class LoginForm extends Component {

    state={
        email:'',
        password:'',
        isLoggedIn:false,
        formLoad:true,
    }

    componentWillReceiveProps=(nextProps)=>{
        console.log(nextProps.SignInReducer.success);
        if(nextProps.SignInReducer.success){
            this.props.navigation.navigate('Profile');
        }
    }

    componentDidMount=async()=>{
        const user = await AsyncStorage.getItem('user');
        if(user=="true"){
            this.props.navigation.navigate('Profile');
        }
        this.setState({formLoad:false});
    }

    signIn=()=>{
        const {email,password} = this.state;
        this.props.authenticate(email,password);
        this.setState({password:''});
    }

    suppressErrors=()=>{
        this.props.suppressLoginErrors();
    }
    render() {
        const {SignInReducer:{signInError,loading}} = this.props;

        if(this.state.formLoad){
            return null;
        }
        return (
            <View style={styles.container}>
                {signInError&&<Text style={{color:'white'}}>*Invalid Email or Password</Text>}
                <TextInput style = {styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.email}
                            onChangeText={val=>{this.setState({email:val})}}
                            keyboardType='email-address'
                            returnKeyType="next"
                            placeholder='Email'
                            onFocus={()=>this.suppressErrors()}
                            placeholderTextColor='rgba(225,225,225,0.7)'/>

                <TextInput style = {styles.input}
                           returnKeyType="go"
                           placeholder='Password'
                           placeholderTextColor='rgba(225,225,225,0.7)'
                           value={this.state.password}
                           onFocus={()=>this.suppressErrors()}
                           onChangeText={val=>{this.setState({password:val})}}
                           secureTextEntry/>
                {loading?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :<TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.signIn()}}>
                        <Text  style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
});

const mapDispatchToProps=(dispatch)=>{
   return bindActionCreators({
       authenticate,
       suppressLoginErrors
   },dispatch)
}

const mapStateToProps=(state)=>{
    return {SignInReducer:state.SignInReducer};
  }

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);