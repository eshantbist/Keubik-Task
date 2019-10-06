import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Card,Body,CardItem,Right} from 'native-base';
export default function AddressItem(props) {
    const {address} = props;
    return (
        <Card>
            <CardItem header bordered style={styles.cardStyle}>
                <Text style={[styles.texts,{fontWeight:"bold"}]}>{address.fields.name}</Text>
                <Right><Text style={styles.texts}>{address.fields.type}</Text></Right>
            </CardItem>
            <CardItem bordered>
            <Body>
                <Text style={styles.texts}>
                    {address.fields.address1}, {address.fields.address2}, {address.fields.address3}
                </Text>
                <Text style={styles.texts}>
                    {address.fields.city}, {address.fields.state}, {address.fields.pincode}
                </Text>
                <Text style={styles.texts}>
                    {address.fields.country}
                </Text>
                <Text style={styles.texts}>
                    Phone-number: {address.fields.phone}
                </Text>
            </Body>
            </CardItem>
            <CardItem footer bordered style={styles.cardStyle}>
                <View style={styles.footerContainer}>
                    <TouchableOpacity onPress={props.edit} style={styles.buttons}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.delete} style={styles.buttons}>
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </CardItem>
        </Card>
    );
  }

const styles = StyleSheet.create({
    buttons: {
        borderWidth:1,
        borderRadius:5,
        borderColor:"gray",
        padding:5,
        width:"30%",
        alignItems:'center',
        backgroundColor:'#f5f5f0'
    },
    texts:{
        fontSize:15
    },
    cardStyle:{
        borderColor:'#006bb3',
        backgroundColor:'#e6f7ff'
    },
    footerContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:"space-between"
    }
});