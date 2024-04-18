import React, {useEffect,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
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
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>Pagina Telefone</Text>
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
