import React,{Component} from 'react';
import {Text,TouchableOpacity,Alert,StyleSheet} from 'react-native'
import { Container, Content, Input, Item} from 'native-base';

export default class AddAddress extends Component{

    state={
        type:'',
        name:'',
        phone:'',
        address1:'',
        address2:'',
        address3:'',
        pinCode:'',
        city:'',
        state:'',
        country:'',
        title:'',
        loading:false
    }

    onChangeText(key,value) {
        this.setState({ [key]:value })
    }

    addNewAddress=()=>{
        this.setState({loading:true});
        const {title,type,phone,name,address1,address2,address3,pinCode,city,state,country} = this.state;
        if(title==''||type==''||phone==''||name==''||address1==''||address2==''||address3==''||pinCode==''||city==''||state==''||country==''){
            Alert.alert('Error!!','Fill All fields');
        }
        else{
            let data = {
                "records": [
                    {
                        "fields": {
                            "type": type,
                            "phone": phone,
                            "address1": address1,
                            "name": name,
                            "address3": address3,
                            "address2": address2,
                            "pincode": pinCode,
                            "city": city,
                            "state": state,
                            "country": country,
                            "title": title
                        }
                    }
                ]
            }

            fetch(`https://api.airtable.com/v0/appwT5pbhzk2nnzko/Table%201`,
            {
                method: 'POST',
                headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer keye1yf2d3Owm8ZVo'
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                response.json()
                .then(json => {
                    this.props.navigation.navigate('ManageAddress');
                })
                .catch(err => {
                    Alert.alert('Error!!','Some Error Occurred');
                })
            })
            this.setState({loading:false});
        }
    }
    render(){

        return(
            <Container style={{marginHorizontal:10}}>
                <Content>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="To or From"
                            value={this.state.type}
                            autoCapitalize="none"
                            onChangeText={value => this.onChangeText('type',value)}
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Type of Address (Home, Work, etc.)"
                            value={this.state.title}
                            autoCapitalize="none"
                            onChangeText={value => this.onChangeText('title',value)}
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Name"
                            value={this.state.name}
                            onChangeText={value => this.onChangeText('name',value)}
                            autoCapitalize="none"
                            autoCorrect={false} />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Mobile"
                            value={this.state.phone}
                            onChangeText={value => this.onChangeText('phone',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Address Line 1"
                            value={this.state.address1}
                            onChangeText={value => this.onChangeText('address1',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Address Line 2"
                            value={this.state.address2}
                            onChangeText={value => this.onChangeText('address2',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Address Line 3"
                            value={this.state.address3}
                            onChangeText={value => this.onChangeText('address3',value)}
                            autoCapitalize="none"
                            autoCorrect={false} />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Pin Code"
                            value={this.state.pinCode}
                            onChangeText={value => this.onChangeText('pinCode',value)}
                            autoCapitalize="none"
                            autoCorrect={false} />
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="City"
                            value={this.state.city}
                            onChangeText={value => this.onChangeText('city',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="State"
                            value={this.state.state}
                            onChangeText={value => this.onChangeText('state',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <Item style={styles.inputItem}>
                        <Input
                            placeholder="Country"
                            value={this.state.country}
                            onChangeText={value => this.onChangeText('country',value)}
                            autoCapitalize="none"
                            autoCorrect={false}/>
                    </Item>
                    <TouchableOpacity onPress={()=>{this.addNewAddress()}} style={styles.addButton}>
                        <Text>Add address</Text>
                    </TouchableOpacity>
                </Content>
          </Container>
        )
    }
}

const styles = StyleSheet.create({
    addButton: {
        borderWidth:1,
        margin:20,
        borderColor:'gray',
        alignItems:'center',
        borderRadius:2,
        padding:10,
        backgroundColor:"#e0ebeb"
    },
    inputItem:{
        marginVertical:10
    },
});

