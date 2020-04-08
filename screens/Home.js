import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image , FlatList, ActivityIndicator} from 'react-native';
import {Card, FAB} from 'react-native-paper';

const Home = (props)=>{
    
    const [data, setData] = useState([])
    const [loading, setLoading]= useState(true)
    useEffect(()=>{
        fetch("http://5e1ad8d9.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        })
    },[])



    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard} 
            key={item._id} 
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
            {
                loading?
                <ActivityIndicator size="large" color="#0000ff" />
                :
                <FlatList
                data = {data}
                renderItem={({item})=>{
                   return renderList(item)
                }}
                />
            }
            
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