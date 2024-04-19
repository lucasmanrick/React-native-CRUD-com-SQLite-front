import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text,TextInput, TouchableOpacity, View } from 'react-native';
import {useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;

 
export default function DeletarClientes() {
  const navigation = useNavigation();

  const [idCli,setIdCli] = useState(0);
  const [idTel,setIdTel] = useState(0);
  const [idTHS,setIdTHS] = useState(0);

  const [receiveIds,setReceiveIds] = useState([])


  function pegaIdsTabelas () {
    db.transaction(tx => {
      tx.executeSql('Select cli.id ,tel.id as tel, ths.id as ths FROM telefones_has_clientes ths INNER JOIN tbl_clientes cli ON ths.cliente_id = cli.id inner join tbl_telefones tel ON tel.id = ths.telefone_id WHERE cli.id = ? ',
    [idCli],
    (_,{rows}) => {
        console.log(rows)
        setIdTel(rows._array[0].tel)
        setIdTHS(rows._array[0].ths)  
    }
  )
    })


    db.transaction(tx => {
      console.log('entrou tbl_cli')
      tx.executeSql('Delete from tbl_clientes WHERE id = ?',
      [idCli],
      (_,allInfo) => {
        console.log(allInfo)
      },
      (_,error) => {
        console.log(error)
      }
    )
    })

    db.transaction(tx => {
      console.log('entrou tbl_tel')
      tx.executeSql('Delete from tbl_telefones WHERE id = ?',
      [idTel],
      (_,allInfo) => {
        console.log(allInfo)
      },
      (_,error) => {
        console.log(error)
      }
    )
    })


    db.transaction(tx => {
      tx.executeSql('Delete from telefones_has_clientes WHERE id = ?',
      [idTHS],
      (_,allInfo) => {
        console.log(allInfo)
      },
      (_,error) => {
        console.log(error)
      }
    )
    })
  }




  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={{display:'flex',height:'100%',flexDirection:"column",alignItems:'center', backgroundColor:'darkred', gap:20}}>

    <Text>deletar dados de um cliente</Text>
        <TextInput style={{width:'90%',backgroundColor:'white', textAlign:'center'}} onChangeText={setIdCli} value={idCli.toString()} placeholder='insira o id do contato'></TextInput>
      <TouchableOpacity style={{backgroundColor:'dodgerblue', padding:10}} onPress={() => {
        pegaIdsTabelas()
        navigation.navigate('Home')
      }}><Text style={{color:'white'}}>deletar dados do cliente</Text></TouchableOpacity>
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