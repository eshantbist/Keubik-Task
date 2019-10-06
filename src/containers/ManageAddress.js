import React,{Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,ActivityIndicator,Alert,StyleSheet} from 'react-native'
import { Container, Content, Icon,Card,CardItem} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import AddressItem from '../components/AddressItem'

export default class ManageAddress extends Component{

    state={
        loading:true,
        data:[]
    }
    componentDidMount=()=>{
        this.fetchData();
    }

    fetchData=()=>{
        console.log("fetching");
        this.setState({loading:true});
        fetch('https://api.airtable.com/v0/appwT5pbhzk2nnzko/Table%201?api_key=keye1yf2d3Owm8ZVo')
        .then(response => {
            response.json()
            .then(json => {
                console.log(json.records);
                this.setState({data:json.records,loading:false});
            })
            .catch(err => {
                console.log(err)
                this.setState({loading:false});
            })
        })
    }

    goToAdd=()=>{
        this.props.navigation.navigate("AddAddress");
    }

    deleteAddress=(item)=>{
        Alert.alert(
            'Warning!!',
            'Are you sure you want to delete',
            [
            {
                text: 'Yes',
                onPress: () =>
                this.deleteSuccess(item),
            },
            {
                text: 'No',
            }
            ],
            { cancelable: false }
        );
    }

    deleteSuccess=(item)=>{
        this.setState({loading:true});
        fetch(`https://api.airtable.com/v0/appwT5pbhzk2nnzko/Table%201?records[]=${item.id}`,
        {
            method: 'DELETE',
            headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer keye1yf2d3Owm8ZVo'
            }
        })
        .then(response => {
            response.json()
            .then(json => {
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
                this.setState({loading:false});
            })
        })
    }

    editAddress=(item)=>{
        this.props.navigation.navigate("UpdateAddress",{item});
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <NavigationEvents
                        onWillFocus={payload => {this.fetchData()}}
                    />
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        return(
            <Container>
                <NavigationEvents
                    onWillFocus={payload => {this.fetchData()}}
                />
                <Content>
                <Card>
                    <TouchableOpacity onPress={()=>this.goToAdd()}>
                        <CardItem bordered>
                            <View style={styles.cardItem}>
                                <Text>Add New Address</Text>
                                <Icon name="arrow-forward" />
                            </View>
                        </CardItem>
                    </TouchableOpacity>
                </Card>
                <FlatList
                    style={styles.list}
                    data={this.state.data}
                    keyExtractor={item => item.type}
                    renderItem={({ item }) => (
                        <AddressItem
                            address={item}
                            key={item.type}
                            delete={()=>this.deleteAddress(item)}
                            edit={()=>this.editAddress(item)}
                        />
                        )}
                />
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cardItem:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:'100%'
    },
    list:{
        marginTop:10,
        marginHorizontal:20
    }
});
