import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;


export default function EditaIntegrado() {
  const navigation = useNavigation();
  const route = useRoute();

  const [novoNome, setNovoNome] = useState(route.params?.nome);
  const [novaData, setDataNasc] = useState(route.params?.data_nasc);
  const [novoNumero, setNumero] = useState(route.params?.numero);
  const [tipo, setTipo] = useState(route.params?.tipo);

  const [idCli, setIdCli] = useState(route.params?.id);
  const [idTel, setIdTel] = useState(route.params?.secondId);


  function alterarRegistro() {
    console.log('entrou')
    if (novoNome == '') {
      Alert.alert('o campo nome do cliente esta sem preencher')
      return
    }

    if (novaData == '') {
      Alert.alert('o campo nome do cliente esta sem preencher')
    }

    db.transaction(tx => {
      console.log('entrou2')
      tx.executeSql('Update tbl_telefones SET numero = ? , tipo = ? WHERE id = ?',
        [novoNumero, tipo, idTel],
        (_, allInfo) => {
          console.log(allInfo)
          tx.executeSql('UPDATE tbl_clientes SET nome = ?, data_nasc = ? WHERE id = ?',
            [novoNome, novaData, idCli],
            (_, allInfo) => {
              console.log(allInfo)
            }
          )
        }
      )
    })


  }



  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: 20 }}>

        <Text>alterar dados de um cliente</Text>
        <TextInput readOnly style={{ width: '90%', borderWidth: 2, textAlign: 'center' }} onChangeText={setIdCli} value={idCli.toString()} placeholder='insira o id do contato'></TextInput>
        <Text>nome:</Text>
        <TextInput style={{ width: '90%', borderWidth: 2, textAlign: 'center' }} onChangeText={setNovoNome} value={novoNome} placeholder='insira o nome do contato'></TextInput>
        <Text>data de nascimento</Text>
        <TextInput style={{ width: '60%', borderWidth: 2, textAlign: 'center' }} onChangeText={setDataNasc} value={novaData} placeholder='insira a data de nascimento'></TextInput>
        <Text>numero:</Text>
        <TextInput style={{ width: '60%', borderWidth: 2, textAlign: 'center' }} onChangeText={setNumero} value={novoNumero.toString()} placeholder='insira o numero de telefone'></TextInput>
        <Text>tipo:</Text>
        <TextInput style={{ width: '60%', borderWidth: 2, textAlign: 'center' }} onChangeText={setTipo} value={tipo} placeholder='insira o tipo do telefone ex. fixo/cel'></TextInput>
        <TouchableOpacity style={{ backgroundColor: 'dodgerblue', padding: 10 }} onPress={() => {
          alterarRegistro()
          navigation.navigate('Home')
        }}><Text style={{ color: 'white' }}>alterar dados do cliente</Text></TouchableOpacity>
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
