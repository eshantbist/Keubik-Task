import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from './src/components/Login'
import Profile from './src/containers/Profile'
import ManageAddress from './src/containers/ManageAddress'
import AddAddress from './src/containers/AddAddress'
import UpdateAddress from './src/containers/UpdateAddress'
import ProfileHeader from './src/containers/ProfileHeader'
import {connect} from 'react-redux';

const AppNavigator = createStackNavigator({
  Home: {
      screen: Login,
      navigationOptions: ({navigation}) => ({
          header: null,
      }),
    },
  Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
          header : <ProfileHeader navigation={navigation}/>,
      }),
    },
  ManageAddress: {
    screen: ManageAddress,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Manage Address",
      headerStyle: {
        backgroundColor: '#006bb3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
    }),
  },
  AddAddress:{
    screen: AddAddress,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Add Address",
      headerStyle: {
        backgroundColor: '#006bb3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
    }),
  },
  UpdateAddress:{
    screen: UpdateAddress,
    navigationOptions: ({navigation}) => ({
      headerTitle: "Update Address",
      headerStyle: {
        backgroundColor: '#006bb3',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
    }),
  }
});

const StackContainer= createAppContainer(AppNavigator);

class AppStack extends Component {
  render() {
    return(
      <SafeAreaView style={{flex:1}}>
        <StackContainer/>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  SignInReducer: state.SignInReducer
})

export default connect(mapStateToProps)(AppStack)
