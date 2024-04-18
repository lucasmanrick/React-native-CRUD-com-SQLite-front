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
  const [numero,setNumero] = useState(0);
  const [tipo,setTipo] = useState('');

  const [takeClientId,setTakeClientId] = useState(0);
  const [takeTelId,setTakeTelId] = useState(0);

  function registro () {
    if(nomeCliente == '') {
      Alert.alert('o campo nome do cliente esta sem preencher')
      return
    }

    db.transaction(tx => {
      tx.executeSql('insert into tbl_telefones (numero, tipo) values (?,?)',
      [numero,tipo],
      (_,allInfo) => {
        setTakeTelId(allInfo.insertId)
      }
    )
    })

    db.transaction(tx => {
      tx.executeSql('insert into tbl_clientes (nome, data_nasc) values (?,?)',
      [nomeCliente,dataNasc],
      (_,allInfo) => {
        setTakeClientId(allInfo.insertId)
      }
    )
    })
  }
   

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('insert into telefones_has_clientes (telefone_id, cliente_id) values (?,?)',
      [takeClientId,takeTelId],
      (_,allInfo) => {
      }
    )
    })
  },[takeClientId])


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{display:'flex',flexDirection:"column",alignItems:'center', gap:50}}>
        <TextInput onChangeText={setNomeCliente} value={nomeCliente} placeholder='insira o nome do contato'></TextInput>
        <TextInput onChangeText={setDataNasc} value={dataNasc} placeholder='insira a data de nascimento'></TextInput>
        <TextInput onChangeText={setDataNasc} value={dataNasc} placeholder='insira o numero de telefone'></TextInput>
        <TextInput onChangeText={setDataNasc} value={dataNasc} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity onPress={() => {
          registro()
        }}><Text>registrar cliente</Text></TouchableOpacity>
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
