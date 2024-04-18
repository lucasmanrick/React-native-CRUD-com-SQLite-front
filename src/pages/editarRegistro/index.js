import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;

 
export default function EditarRegistro() {
  const navigation = useNavigation();
  const route = useRoute();
  

  const [novoNome,setNovoNome] = useState('');
  const [novaData,setDataNasc] = useState('');
  const [novoNumero,setNumero] = useState(0);
  const [tipo,setTipo] = useState('');

  const [idCli,setIdCli] = useState(0);
  const [idTel,setIdTel] = useState(0);


  if(route.params !== undefined) {
    setNovoNome(route.params?.nome)
    setDataNasc(route.params?.data_nasc)
    setNumero(route.params?.numero)
    setTipo(route.params?.tipo)
    setIdCli(route.params?.id)
    setIdTel(route.params?.secondId)
  }

  function alterarRegistro () {
    if(novoNome == '') {
      Alert.alert('o campo nome do cliente esta sem preencher')
      if(novaData == '') {
        Alert.alert('o campo nome do cliente esta sem preencher')
      }
      return
    }

    db.transaction(tx => {
      tx.executeSql('Update tbl_telefones SET numero = ? , tipo = ? WHERE id = ?',
      [novoNumero,tipo,idCli],
      (_,allInfo) => {

      }
    )
    })

    db.transaction(tx => {
      tx.executeSql('UPDATE tbl_clientes SET nome = ?, data_nasc = ? WHERE id = ?',
      [novoNome,novaData,idTel],
      (_,allInfo) => {
      }
    )
    })
  }
   


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{display:'flex',flexDirection:"column",alignItems:'center', gap:20}}>

      <Text>alterar dados de um cliente</Text>
          <TextInput style={{width:'90%', borderWidth:2, textAlign:'center'}} onChangeText={setIdCli} value={idCli.toString()} placeholder='insira o id do contato'></TextInput>
        <Text>nome:</Text>
          <TextInput style={{width:'90%', borderWidth:2, textAlign:'center'}} onChangeText={setNovoNome} value={novoNome} placeholder='insira o nome do contato'></TextInput>
        <Text>data de nascimento</Text>
          <TextInput style={{width:'60%', borderWidth:2, textAlign:'center'}} onChangeText={setDataNasc} value={novaData} placeholder='insira a data de nascimento'></TextInput>
        <Text>numero:</Text>
          <TextInput style={{width:'60%', borderWidth:2, textAlign:'center'}} onChangeText={setNumero} value={novoNumero.toString()} placeholder='insira o numero de telefone'></TextInput>
        <Text>tipo:</Text>
          <TextInput style={{width:'60%', borderWidth:2, textAlign:'center'}} onChangeText={setTipo} value={tipo} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity style={{backgroundColor:'dodgerblue', padding:10}} onPress={() => {
          alterarRegistro()
          console.log(novoNome,novaData,novoNumero,tipo,idCli)
          navigation.navigate('Home')
        }}><Text style={{color:'white'}}>alterar dados do cliente</Text></TouchableOpacity>
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
