import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;

 
export default function RegistrarCliente() {
  const navigation = useNavigation();

  const [nomeCliente,setNomeCliente] = useState('');
  const [dataNasc,setDataNasc] = useState('');
  const [numero,setNumero] = useState('');
  const [tipo,setTipo] = useState('');

  let takeClientId = 0
  let takeTelId = 0

  // Função para inserir dados
  const insertData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tbl_clientes (nome,data_nasc) VALUES (?,?);',
        [nomeCliente,dataNasc],
        (_, { insertId }) => {
          const clienteId = insertId;
          tx.executeSql(
            'INSERT INTO tbl_telefones (numero,tipo) VALUES (?,?);',
            [numero,tipo],
            (_, { insertId }) => {
              const telefoneId = insertId;
              tx.executeSql(
                'INSERT INTO telefones_has_clientes (cliente_id, telefone_id) VALUES (?, ?);',
                [clienteId, telefoneId]
              );
            }
          );
        }
      );
    });
  }


  // useEffect(() => {
   
  // },[takeClientId])


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{display:'flex',flexDirection:"column",alignItems:'center', gap:50}}>
        <TextInput onChangeText={setNomeCliente} value={nomeCliente} placeholder='insira o nome do contato'></TextInput>
        <TextInput onChangeText={setDataNasc} value={dataNasc} placeholder='insira a data de nascimento'></TextInput>
        <TextInput onChangeText={setNumero} value={numero} placeholder='insira o numero de telefone'></TextInput>
        <TextInput onChangeText={setTipo} value={tipo} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity style={{backgroundColor:'green'}} onPress={() => {
          insertData()
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