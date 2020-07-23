import React ,{Component} from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import {Header,Icon,Badge} from 'react-native-elements';

const BellIconWithBadge=(props)=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() =>props.navigation.navigate('notification')}/>
         <Badge
          value="1"
         containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
      </View>
    )
  }
  
  const Myheader = props => {
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969'  onPress={() => props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        rightComponent={<BellIconWithBadge {...props}/>}
        backgroundColor = "#eaf8fe"
      />
    );
  };
  
  export default Myheader;