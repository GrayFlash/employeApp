import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({navigation}) => {
    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState("")
    const [Email, setEmail] = useState("")
    const [Salary, setSalary] = useState("")
    const [Position, setPosition] = useState("")
    const [Picture, setPicture] = useState("")
    const [modal, setmodal] = useState(false)

    const submitData = ()=>{

// Update the link below everytime you run the app unless you employ Heroku


        fetch("http://a8d2fa85.ngrok.io/send-data",{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //_id,
                name: Name,
                email:Email,
                phone:Phone,
                salary:Salary,
                picture:Picture,
                position:Position

            })
        })
        .then(res=>res.json())
        .then(data=>{
            Alert.alert(`Details of ${data.name} have been saved succesfully`)
            navigation.navigate("Home")
        })
        .catch(err=>{
            Alert.alert("Some Error")
            console.log(err)
        })
    }


    const pickFromGallery = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Image,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
              });
              if(!data.cancelled){
                let newfile = { 
                  uri:data.uri, 
                  type:`test/${data.uri.split(".")[1]}`,
                  name:`test/${data.uri.split(".")[1]}`
              }
                handleUpload(newfile)
            }
        }
        else{
            Alert.alert("you need to give permissions!")
        }
    }
    const pickFromCamer = async()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA);
        
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Image,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
              });
              if(!data.cancelled){
                  let newfile = { 
                    uri:data.uri, 
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test/${data.uri.split(".")[1]}`
                }
                  handleUpload(newfile)
              }

        }
        else{
            Alert.alert("you need to give permissions!")
        }
    }
    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset','employeeApp')
        data.append("cloud_name","graystack")

        fetch("https://api.cloudinary.com/v1_1/graystack/image/upload",{
            method:"post",
            body: data
        }).then(res=>res.json()).
        then(data=>{
            //console.log(data)
            setPicture(data.url)
            setmodal(false)
        })
    }
    return(
        <View style = {styles.root}>
            
            <TextInput
                label='Name'
                theme = {theme}
                mode='outlined'
                value={Name}
                onChangeText={text => {setName ( text )}}
            />
            
            <TextInput
                label='Position'
                theme = {theme}
                mode='outlined'
                value={Position}
                onChangeText={text => {setPosition ( text )}}
            />
            <KeyboardAvoidingView behavior="position">
            <TextInput
                label='Phone'
                theme = {theme}
                mode='outlined'
                value={Phone}
                keyboardType="number-pad"
                onChangeText={text => {setPhone ( text )}}
            />
            <TextInput
                label='Email'
                theme = {theme}
                mode='outlined'
                value={Email}
                onChangeText={text => {setEmail ( text )}}
            />
            <TextInput
                label='Salary'
                theme = {theme}
                mode='outlined'
                value={Salary}
                onChangeText={text => {setSalary ( text )}}
            />
            </KeyboardAvoidingView>
            <View style = {styles.saveButtonsView}>
            <Button 
            theme={theme} 
            icon={Picture==""?"upload" :"check"}
            mode="contained" 
            onPress={()=> setmodal(true) }>
                Upload Image
            </Button>
            </View>
            <View style = {styles.saveButtonsView}>
            <Button theme={theme} 
            icon="content-save" 
            mode="contained" 
            onPress={()=> submitData() }>
                Save
            </Button>
            </View>
            <Modal
            animationTye="slide"
            transparent={true}
            visible= {modal}
            onRequestClose={()=>{
                setmodal(false)
            }}
            >

                <View style={styles.modalView}>
                    
                    <View style={styles.modalButtonView}>
                    <Button theme={theme} icon="upload" mode="contained" onPress={()=> pickFromCamer() }>
                    From Camera
                    </Button>
                    <Button theme={theme} icon="upload" mode="contained" onPress={()=> pickFromGallery() }>
                    From Gallery
                    </Button>
                    
                    </View>
                    <Button theme={theme} icon="cancel" onPress={()=> setmodal(false) }>
                    Cancel
                    </Button>
                </View>
            </Modal>
            
        </View>
    )
}
const theme = {
    colors:{
        primary:"skyblue",
    },
    //padding: 10,
}
const styles = StyleSheet.create({
    root:{
        flex:1,
        margin: 10,
        padding:10
    },
    saveButtonsView:{
        padding:10,
      //  alignItems:'center',
        //justifyContent:"space-around",
    },
    modalButtonView:{
        flexDirection: 'row',
        justifyContent:"space-around",
        alignItems: 'center',
        padding:10
    },
    modalView:{
        position: "absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    }
})


export default CreateEmployee;