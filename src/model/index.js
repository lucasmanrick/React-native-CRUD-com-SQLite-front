import react,{useState} from 'react';
import { DatabaseConnection } from '../../databases/database';

const db = new DatabaseConnection.getConnection;



export const modelQuerys = {
  createTables: () => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_clientes (id integer PRIMARY KEY AUTOINCREMENT, nome TEXT, data_nasc TEXT)')
      console.log('criado tbl clientes')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS tbl_telefones (id integer PRIMARY KEY AUTOINCREMENT, numero INTEGER, tipo TEXT)')
      console.log('criado tbl telefones')
    })

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS telefones_has_clientes (id integer PRIMARY KEY AUTOINCREMENT, telefone_id INTEGER, cliente_id INTEGER, FOREIGN KEY (telefone_id) REFERENCES tbl_telefones(id), FOREIGN KEY (cliente_id) REFERENCES tbl_clientes(id) )')
      console.log('criado tbl telefoneshasclientes')
    })
  },

  insertData: (nomeCliente,dataNasc,numero,tipo) => {
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
                [clienteId, telefoneId],
                (_,allInfo) => {
                  console.log(allInfo)
                }, (_,error) => {
                  console.error(error)
                }
              );
            }
          );
        }
      );
    });
  },

  selectCli: () => {
    db.transaction(tx => {
      tx.executeSql('select cli.id, cli.nome, cli.data_nasc, tel.id as idtel, tel.numero,tel.tipo from telefones_has_clientes thc inner join tbl_telefones tel ON tel.id = thc.telefone_id inner join tbl_clientes cli ON cli.id = thc.cliente_id',
        [],
        (_, { rows }) => {
          setRetornoCli(rows._array)
        },
        (_, error) => {
         console.error(error)
        }
      )
    })
    console.log('dados retornados do model para o controller:' + retornaResultado )
  } 
  

}

