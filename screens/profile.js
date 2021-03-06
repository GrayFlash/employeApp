import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView,  Platform, Alert } from 'react-native';
import {Linking } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Title , Card, Button} from 'react-native-paper';
import { MaterialIcons, Feather } from '@expo/vector-icons';
export default function Profile(props){
    
    const {_id, name, picture, phone, email, salary, position} = props.route.params.item


// Update the link below everytime you run the app unless you employ Heroku

    console.log(_id)
    const deleteEmployee = (_id) =>{
        fetch("http://1c4a7ac6.ngrok.io/delete",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id:_id
            })
        }).then(res=>res.json())
        .then(deletedEmp=>{
            Alert.alert(`${deletedEmp.name}`)
            props.navigation.navigate("Home")
        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

    const openDial=()=>{
 
            Linking.openURL(`tel:${phone}`)     
    }
    const openMail=()=>{
            Linking.openURL(`mailto:${email}`)
    }
    return(
        <View style = {styles.root}>
            <LinearGradient
                colors={["#0033ff","#6bc1ff"]}
                style={{height:"20%"}}
            />
            <View style={{alignItems:"center"}}>
                <Image
                    style={{width:140, height:140, borderRadius:70, marginTop:-70}}
                    source={{uri:picture}}
                />
            </View>
            <ScrollView >
                <View style={styles.description}>
                <Title>{name}</Title>
                <Text style={{fontSize:18}}>{position}</Text>
                </View>
                <Card style = {styles.myCard} onPress={()=>openMail()}>
                    <View style={styles.cardContent}>
                        <MaterialIcons name="email" size={32} color="red"/>
                        <Text style={styles.myText}>{email}</Text>
                    </View>
                </Card>
                <Card style = {styles.myCard} onPress={()=>openDial()}>
                    <View style={styles.cardContent}>
                        <Feather name="phone" size={32} color="green"/>
                                <Text style={styles.myText}>{phone}</Text>
                    </View>
                </Card>
                <Card style = {styles.myCard} >
                    <View style={styles.cardContent}>
                        <MaterialIcons name="attach-money" size={32} color="yellow"/>
                        <Text style={styles.myText}>{salary}</Text>
                    </View>
                </Card>
                <View  style= {styles.buttonDesign }>
                    <Button 
                    icon="square-edit-outline"
                    mode="container"
                    theme={theme}
                    onPress={() => {
                        props.navigation.navigate("Create",
                            {_id, name, picture, phone, email, salary, position}
                        ) }}
                    >
                        Edit
                    </Button>
                    <Button 
                    icon="delete"
                    mode="container"
                    theme={theme}
                    onPress={() => deleteEmployee(_id)}
                    >
                        Fire Employee
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const theme = {
    colors:{
        primary:"blue",
    },
    //padding: 10,
}

const styles = StyleSheet.create({
    root:{
        flex:1,
    },
    description:{
        alignItems: "center",
    },
    myCard:{
        margin:3,
    },
    cardContent:{
        flexDirection:'row',
        padding:10
    },
    myText:{
        fontSize:20,
        marginTop:3,
        marginLeft:7
    },
    buttonDesign:{
        flexDirection: 'row', 
        justifyContent:"space-around", 
        padding: 10,
    },
});
