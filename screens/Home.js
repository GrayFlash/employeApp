import React from 'react';
import { StyleSheet, Text, View, Image , FlatList} from 'react-native';
import {Card, FAB} from 'react-native-paper';

const Home = (props)=>{
    const data = [

        {id:"1", name:"Mukesh", position:"Web-Developer", email:"mukesh@gmail.com", salary:"10 LPA", phone:"7885566218" , picture:"https://images.unsplash.com/photo-1508674861872-a51e06c50c9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"},
        {id:"2", name:"Ramesh", position:"App-Developer",email:"ramesh@gmail.com", salary:"15 LPA", phone:"9425566644", picture:"https://images.unsplash.com/photo-1548094891-c4ba474efd16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=770&q=80"},
        {id:"3", name:"Mukhtesh", position:"Ml-Developer",email:"mukhtesh@gmail.com", salary:"8 LPA", phone:"7475500245",  picture:"https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"}

    ];
    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard} 
            key={item.id} 
            onPress={()=> props.navigation.navigate("Profile", {item} )}>
            <View style={styles.cardView}>
                <Image
                 style={styles.imageStyle}
                 source={{uri:item.picture}}
                />
                <View style={styles.textStyle}>
                <Text > {item.name}</Text>
                <Text > {item.position}</Text>
                </View>
               
              </View>
           </Card>
        )
    })
    return(
        <View style={{flex:1}}>
            <FlatList
                data = {data}
                renderItem={({item})=>{
                   return renderList(item)
                }}
            />
            <FAB
            onPress={() => props.navigation.navigate("Create")}
                style= {styles.fab}
                small ={false}
                icon="plus"
            />
        </View>
    );
}

const styles= StyleSheet.create({

    mycard:{
        margin:5,
        padding:5,
        
    },
    imageStyle:{
        width:80,
        height:80, 
        borderRadius:40 
    },
    cardView:{
        flexDirection:'row',
        padding:5
    },
    textStyle:{
        fontSize: 22,
        marginLeft: 10,
    },
    fab:{
        position:'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
export default Home