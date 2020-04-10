import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image , FlatList, Alert} from 'react-native';
import {Card, FAB} from 'react-native-paper';

const Home = (props)=>{
    
    const [data, setData] = useState([])
    const [loading, setLoading]= useState(true)

    const  fetchData = () =>{

// Update the link below everytime you run the app unless you employ Heroku

        fetch("http://4402781f.ngrok.io/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])



    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard} 
            //key={item._id} 
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
                keyExtractor={item=>item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading}
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