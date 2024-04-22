import { modelQuerys } from '../model/index';


export const controllerCheck = {
  criaTblCliTelHasCli: () => {
    modelQuerys.createTables()
  },
  registroDeUmNovoCliente: (nomeCliente,dataNasc,numero,tipo) => {
    modelQuerys.insertData(nomeCliente,dataNasc,numero,tipo)
  },
  selecionaTodosClientes: () => {
    return modelQuerys.selectCli() 
  }
}