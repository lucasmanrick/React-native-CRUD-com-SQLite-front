import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useNavigation } from "@react-navigation/native";
import { controllerCheck } from '../../controller/index';
import Wavesvg from "../../../assets/wave.svg";



export default function Home() {
  const navigation = useNavigation();




  useEffect(() => {
    controllerCheck.criaTblCliTelHasCli()
  },[])



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{backgroundColor:'#aef' ,display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: "space-between", height: '100%' }}>
        <Text style={{ fontSize: 20 }}>Home</Text>
        <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: '900', color: '#aef', textDecorationLine:'underline',width:'90%' ,borderRadius:20,padding:10, backgroundColor:'dodgerblue' }}>Seja bem vindo a sua lista telefonica</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("telefones") }} style={{ marginTop: 20, backgroundColor: 'blue', width: "50%", borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Ver contatos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("registrarCliente") }} style={{ backgroundColor: 'blue', width: "50%", borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>registrar contatos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("editarRegistro") }} style={{ backgroundColor: 'blue', width: "50%", borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>editar contato</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("deletaCliente") }} style={{ backgroundColor: 'blue', width: "50%", borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>deletar contato</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("pesquisarClientes") }} style={{ backgroundColor: 'blue', width: "50%", borderRadius: 5, padding: 10 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>pesquisar contato</Text>
        </TouchableOpacity>

        <View style={{width:'100%',backgroundColor:'#aef'}}>
          <Wavesvg
            style={{ borderWidth: 1, borderColor: "black" }}
            width="200%"
            height={200}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    marginTop: 30,
    height: '100%',
  }
});
