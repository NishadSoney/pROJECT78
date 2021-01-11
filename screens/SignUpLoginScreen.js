import * as React from "react";
import {TextInput, View, StyleSheet,Text,TouchableOpacity,Alert,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignUpLoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId:"",
            password:"",
            isModalVisible:'false',
            firstName:"",
            lastName:"",
            phoneNumber:"",
            address:"",
            confirmPassword:"",
        }
    }

    showModal=()=>{
        return(
            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {this.state.isModalVisible}>
                    <View style = {styles.modalcontainer}>
                        <ScrollView style = {{width:"100%",}}>
                            <KeyboardAvoidingView>
                                <View>
                                    <TextInput style = {styles.login}
                                    placeholder = "First Name"
                                    placeholderTextColor = 'orange'
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            firstName:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Last Name"
                                    placeholderTextColor = 'orange'
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            lastName:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Mobile Number"
                                    placeholderTextColor = 'orange'
                                    maxLength = {10}
                                    keyboardType = 'numeric'
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            phoneNumber:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Address"
                                    placeholderTextColor = 'orange'
                                    multiline = {true}
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            address:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Email ID"
                                    placeholderTextColor = 'orange'
                                    keyboardType = {'email-address'}
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            emailId:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Password"
                                    secureTextEntry = {true}
                                    placeholderTextColor = 'orange'
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            password:text
                                        })
                                    }}
                                    />
                                    <TextInput style = {styles.login}
                                    placeholder = "Confirm Password"
                                    secureTextEntry = {true}
                                    placeholderTextColor = 'orange'
                                    onChangeText = {(text)=>{
                                        this.setState({
                                            confirmPassword:text
                                        })
                                    }}
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity style = {styles.ButtonsignUp}
                                    onPress={()=>{
                                        this.toggleModal()
                                        this.userRegister(this.state.username,this.state.password,this.state.confirmPassword)
                                    }}> 
                                    <Text>Register</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style = {styles.ButtonsignUp}
                                    onPress = {()=>{
                                        this.setState({isModalVisible:false})
                                    }}>
                                        <Text>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
            </Modal>
        );
    }

    userRegister = (username,password,confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("The password does not match \nPlease check your password")
        }else{
            firebase.auth().createUserWithEmailAndPassword(username,password)
            .then((response)=>{
                return Alert.alert("User added successfuly")
            })
            .catch(function(error){
                var errorVode = error.code
                var errorMessage = error.message
                return Alert.alert(errorMessage)
            })
            db.collection('User').add({
                First_Name:this.state.firstName,
                Last_Name:this.state.lastName,
                Mobile_Number:this.state.phoneNumber,
                Email_Adderss:this.state.emailId,
                Address:this.state.address
            })
        }
    }

    userSignUp=(emailId,password)=>{
        firebase.auth().createUserWithEmailAndPassword(emailId,password)
        .then(()=>{
            return Alert.alert("User Added Successfully")
        })
        .catch(function(error){
            var errorCode = error.Code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            return Alert.alert("User Login Successfully")
        })
        .catch(function(error){
            var errorCode = error.Code
            var errorMessage = error.message
            return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View style = {{backgroundColor:'skyblue'}}>
                <View style = {{justifyContent:'center',alignItems:'center'}}>
                    {this.showModal()}
                </View>
                <View>
                    <Text style = {styles.title}>Barter</Text>
                </View>
                <View>
                    <TextInput
                    style = {styles.login}
                    placeholder = "enter your emailId."
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                    />
                    <TextInput
                    style = {styles.login}
                    placeholder = "enter your password."
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    />
                </View>
                <View>
                <TouchableOpacity 
                    style = {[styles.Buttonlogin,{marginBottom:50,marginTop:20}]}
                    onPress = {()=>{
                        this.userLogin(this.state.emailId,this.state.password)
                    }}>
                        <Text style = {styles.loginText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.ButtonsignUp}
                    onPress = {()=>{
                        this.userSignUp(this.state.emailId,this.state.password)
                    }}>
                        <Text style = {styles.signUpText}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        textAlign:'center',
        fontSize:50,
        fontWeight:250,
        marginTop:100,
        paddingBottom:90,
        color:'red',
    },
    login:{
        marginTop:10,
        width:350,
        height:50,
        borderBottomWidth:1.5,
        borderColor:"yellow",
        fontSize:22,
        alignSelf:"center",
        color:"black",
        paddingLeft:10,
        paddingRight:10,
    },
    Buttonlogin:{
        width:200,
        height:50,
        marginTop:50,
        borderBottomWidth:1.5,
        backgroundColor:"violet",
        alignSelf:"center",
    },
    loginText:{
        fontSize:30,
        fontWeight:200,
        textAlign:"center",
        textAlign:"center",
        color:"black",
    },
    ButtonsignUp:{
        width:200,
        height:50,
        borderBottomWidth:1.5,
        backgroundColor:"orange",
        alignSelf:"center",
        marginBottom:100,
        marginTop:-5,
    },
    signUpText:{
        fontSize:30,
        fontWeight:200,
        textAlign:"center",
        color:"black",
    }
})