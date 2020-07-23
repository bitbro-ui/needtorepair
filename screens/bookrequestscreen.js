import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput, Alert,KeyboardAvoidingView ,TouchableOpacity, SnapshotViewIOS} from 'react-native';
import Myheader from '../components/myheader';
import firebase from 'firebase';
import db from '../config';

export default class Bookrequest extends Component {
  constructor(){
    super();
    this.state={
      userid:firebase.auth().currentUser.email,
      bookname:'',
      reason:'',
      isbookrequestactive:'',
      requestedbookname:'',
      bookstatus:'',
      requestid:'',
      userdocid:'',
      docid:''
    }
  }
  createuniqueid(){
    return Math.random().toString(36).substring(7)
  }
  addrequest =async(bookname,reason)=>{
    var userid = this.state.userid
    var requestid = this.createuniqueid()
    db.collection('requestbooks').add({"userid":userid,
    "bookname":bookname,"reason":reason,
    "requestid":requestid,"bookstatus":"requested","date":firebase.firestore.FieldValue.serverTimestamp()})

  await this.getbookrequest()
  db.collection('users').where("emailid","==",userid).get().then().then((snapshot)=>{
    snapshot.forEach((doc)=>{db.collection('users').doc(doc.id).update({
      isbookrequestactive:true
    })
  })
  this.setState({
    bookname:'',
    reason:'',
    requestid:requestid
  })  
  return Alert.alert("book requested successfully")
})

recivebooks=(bookname)=>{
  var userid = this.state.userid
  var requestid = this.state.requestid
  db.collection('recievebooks').add({"userid":userid,"bookname":bookname,"requestid":requestid,"bookstatus":"recieved"})
}

getisbookrequestactive(){
  db.collection('users').where("emailid","==",this.state.userid)
  .onSnapshot(querySnapshot=>{querySnapshot.forEach(doc=>{
    this.setState({isbookrequestactive:doc.data().isbookrequestactive,userdocid:doc.id})
  })})
}

getbookrequest = ()=>{
  var bookrequest = db.collection('requestbooks').where('userid','===',this.state.userid).get().then((snapshot)=>{
    if(doc.data().bookstatus !== "recieved"){this.setState({
      requestid:doc.data().requestid,requestedbookname:doc.data().bookname,bookstatus:doc.data().bookstatus,docid:doc.id
    })
  }
  })}


  render(){
    return (
      <View style={{flex:1}}>
        <Myheader title="request book" navigation ={this.props.navigation}/>
        <KeyboardAvoidingView style ={styles.keyboardstyle}>
          <TextInput style = {styles.formTextInput} placeholder ={"enter book name"} onChangeText={(text)=>{this.setState({bookname:text})}}
          value ={this.state.bookname}/>
          <TextInput style = {[styles.formTextInput,{height:100}]}
          placeholder ={"why you need the book?"}
          multiline
          numberOfLines={10}
          onChangeText = {(text)=>{
            this.setState({reason:text})
          }}
          value={this.state.reason}/>
          <TouchableOpacity styles = {styles.button}
          onPress={()=>
            {this.addrequest(this.state.bookname,this.state.reason)}}>
              <Text>Request</Text>
          </TouchableOpacity>
  
          </KeyboardAvoidingView>
      </View>
    );
  }
  }

const styles=StyleSheet.create({ formTextInput:{ width:"75%", height:35, alignSelf:'center', borderColor:'#ffab91', borderRadius:10, borderWidth:1, marginTop:20, padding:10, }, button:{ width:"75%", height:"50%", justifyContent:'center', alignItems:'center', borderRadius:10, backgroundColor:"#ff5722", shadowColor:"#000", shadowOffset:{ width:0, height:8, }, shadowOpacity:0.44, shadowRadius:10.32, elevation:16, marginTop:20 }, })