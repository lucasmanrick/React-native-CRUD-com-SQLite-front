import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useNavigation } from "@react-navigation/native";
import { controllerCheck } from '../../controller/index';



 
export default function Home() {
  const navigation = useNavigation();




  useEffect(() => {
    controllerCheck.criaTblCliTelHasCli()
  },[])



  // function teste () {
    
  //   db.transaction(tx => {
  //     tx.executeSql('delete from tbl_telefones',
  //   [],
  // (_,allReturn)=> {
  //   console.log(allReturn.rows)})
  //   })
  // }

  // teste()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{display:'flex',flexDirection:"column",alignItems:'center', gap:50}}>
        <Text style={{fontSize:20}}>Home</Text>
        <Text style={{fontSize:20}}>Seja bem vindo a sua lista telefonica</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("telefones")}} style ={{backgroundColor:'blue',width:"50%"}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center'}}>Ver contatos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("registrarCliente")}} style ={{backgroundColor:'blue',width:"50%"}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center'}}>registrar contatos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("editarRegistro")}} style ={{backgroundColor:'blue',width:"50%"}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center'}}>editar contato</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("deletaCliente")}} style ={{backgroundColor:'blue',width:"50%"}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center'}}>deletar contato</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate("pesquisarClientes")}} style ={{backgroundColor:'blue',width:"50%"}}>
          <Text style={{color:'white',fontSize:20,textAlign:'center'}}>pesquisar contato</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    marginTop: 30
  }
});
