import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DatabaseConnection } from '../../../databases/database';

const db = new DatabaseConnection.getConnection;


export default function Telefone() {
 
  const [contatos,setContatos] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('select * from telefones_has_clientes thc inner join tbl_telefones tel ON tel.id = thc.telefone_id inner join tbl_clientes cli ON cli.id = thc.cliente_id',
    [],
    (_,{rows}) => {console.log(`todos cadastros retorno ${rows._array}`)
    setContatos(rows._array)
  },
  (_,error) => {
    console.error(error)
  }
  )
    })
  },[])

  return (
    <View style={{height:'100%'}}>

      
      <ScrollView style={styles.safeArea}>
        <View style={{display:'flex',flexDirection:'column',justifyContent:'space-between', gap:40}}>

      {contatos.map((el,index) => (

        <View key={el.id} style={{display:'flex', flexDirection:'row', width:'100%', height:100,backgroundColor:'white',gap:10}}>

          <View style={{display:'flex', flexDirection:'column', width:'60%'}}>
            <View><Text>nome:{el.nome}</Text></View>
            <View><Text>data de nascimento:{el.data_nasc}</Text></View>
          </View>
          <View style={{display:'flex', flexDirection:'column', width:'40%'}}>
            <View><Text>numero:{el.numero}</Text></View>
            <View><Text>{el.tipo}</Text></View>
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
    width:'100%',
    height:'100%',

    backgroundColor:'gray'
  }
});
