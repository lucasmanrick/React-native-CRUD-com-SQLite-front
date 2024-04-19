import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;

 
export default function Home() {
  const navigation = useNavigation();


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_clientes (id integer PRIMARY KEY AUTOINCREMENT, nome TEXT, data_nasc TEXT)')
      console.log('criado tbl clientes')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_telefones (id integer PRIMARY KEY AUTOINCREMENT, numero INTEGER, tipo TEXT)')
      console.log('criado tbl telefones')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS telefones_has_clientes (id integer PRIMARY KEY AUTOINCREMENT, telefone_id INTEGER, cliente_id INTEGER, FOREIGN KEY (telefone_id) REFERENCES tbl_telefones(id), FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id) )')
      console.log('criado tbl telefoneshasclientes')
    })
  },[])



  function teste () {
    
    db.transaction(tx => {
      tx.executeSql('select * from telefones_has_clientes',
    [],
  (_,allReturn)=> {
    console.log(allReturn.rows)})
    })
  }

  teste()

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
