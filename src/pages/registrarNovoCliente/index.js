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
      <View style={{display:'flex',flexDirection:"column",alignItems:'center',height:'100%' ,gap:50, backgroundColor:'darkgreen'}}>
        <Text style={{color:'white',fontWeight:'bold', fontSize:30 ,padding:10}}>Registre um novo cliente</Text>
        <TextInput style={{backgroundColor:'white', color:'black', borderWidth:2, width:'60%', height:40, textAlign:"center"}} onChangeText={setNomeCliente} value={nomeCliente} placeholder='insira o nome do contato'></TextInput>
        <TextInput style={{backgroundColor:'white', color:'black', borderWidth:2, width:'60%', height:40, textAlign:"center"}} onChangeText={setDataNasc} value={dataNasc} placeholder='insira a data de nascimento'></TextInput>
        <TextInput style={{backgroundColor:'white', color:'black', borderWidth:2, width:'60%', height:40, textAlign:"center"}} onChangeText={setNumero} value={numero} placeholder='insira o numero de telefone'></TextInput>
        <TextInput style={{backgroundColor:'white', color:'black', borderWidth:2, width:'60%', height:40, textAlign:"center"}} onChangeText={setTipo} value={tipo} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity style={{width:'60%', display:'flex',flexDirection:'row' ,justifyContent:'center',backgroundColor:'green',borderWidth:1, borderColor:'white' }} onPress={() => {
          insertData()
          navigation.navigate("Home")
        }}><Text style={{color:'white',fontWeight:'bold' ,padding:10}}>registrar cliente</Text></TouchableOpacity>
      </View>
      <SVGAElement xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,154.7C672,128,768,64,864,69.3C960,75,1056,149,1152,197.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></SVGAElement>
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