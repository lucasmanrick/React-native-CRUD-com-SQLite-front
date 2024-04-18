import * as SQLite from 'expo-sqlite';


export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase('meubanco.db') //faz conexão com o banco de dados local sqllite

}