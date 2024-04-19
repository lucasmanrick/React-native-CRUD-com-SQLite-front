import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DatabaseConnection } from '../../../databases/database';
import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";

const db = new DatabaseConnection.getConnection;


export default function Telefone() {

  const navigation = useNavigation();
  const route = useRoute();

  const [contatos, setContatos] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select cli.id, cli.nome, cli.data_nasc, tel.id as idtel, tel.numero,tel.tipo from telefones_has_clientes thc inner join tbl_telefones tel ON tel.id = thc.telefone_id inner join tbl_clientes cli ON cli.id = thc.cliente_id',
        [],
        (_, { rows }) => {
          console.log(`todos cadastros retorno ${rows._array}`)
          setContatos(rows._array)
        },
        (_, error) => {
          console.error(error)
        }
      )
    })
  }, [])




  return (
    <View style={{ height: '100%' }}>


      <ScrollView style={styles.safeArea}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>

          {contatos.map((el, index) => (
           
            <View key={el.id} style={{ display: 'flex', flexDirection: 'row', width: '90%', height: 150, backgroundColor: 'white', gap: 10, padding: 5, borderRadius: 5, elevation: 10 }}>

              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '65%', gap: 10 }}>
                <View><Text>nome:{el.id}</Text></View>
                <View><Text>nome:{el.nome}</Text></View>
                <View><Text>data de nascimento:{el.data_nasc}</Text></View>
                <View><Text>numero:{el.numero} ({el.tipo})</Text></View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column',justifyContent:"flex-end",height:'100%', width: '35%', gap: 5 }}>
              
                <TouchableOpacity onPress={() => {
                  console.log(el)
                  navigation.navigate('editarRegistro',{id:el.id,secondId:el.idtel,nome:el.nome,data_nasc:el.data_nasc,numero:el.numero,tipo:el.tipo})
                }} style={{width:'90%', padding:5, borderRadius:5 ,backgroundColor:'dodgerblue'}}><Text style={{color:'white', textAlign:'center'}}>Editar dados</Text></TouchableOpacity>
              </View>
            </View>)
          )}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    height: '100%',
  }
});