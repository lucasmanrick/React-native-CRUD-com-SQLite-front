import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { controllerCheck } from '../../controller/index';




export default function RegistrarCliente() {
  const navigation = useNavigation();

  const [nomeCliente,setNomeCliente] = useState('');
  const [dataNasc,setDataNasc] = useState('');
  const [numero,setNumero] = useState('');
  const [tipo,setTipo] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{display:'flex',flexDirection:"column",alignItems:'center', gap:50}}>
        <TextInput onChangeText={setNomeCliente} value={nomeCliente} placeholder='insira o nome do contato'></TextInput>
        <TextInput onChangeText={setDataNasc} value={dataNasc} placeholder='insira a data de nascimento'></TextInput>
        <TextInput onChangeText={setNumero} value={numero} placeholder='insira o numero de telefone'></TextInput>
        <TextInput onChangeText={setTipo} value={tipo} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity style={{backgroundColor:'green'}} onPress={() => {
          controllerCheck.registroDeUmNovoCliente(nomeCliente,dataNasc,numero,tipo)
          navigation.navigate("Home")
        }}><Text style={{color:'white'}}>registrar cliente</Text></TouchableOpacity>
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