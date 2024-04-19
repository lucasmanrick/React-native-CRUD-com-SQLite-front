import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Telefone from './src/pages/telefones';
import RegistrarCliente from './src/pages/registrarNovoCliente';
import EditarRegistro from './src/pages/editarRegistro';
import DeletarClientes from './src/pages/deletaCliente';
import PesquisarClientes from './src/pages/pesquisarClientes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{title:'tela inicial', headerTintColor:'white',headerShown:false }}/>
        <Stack.Screen name='telefones' component={Telefone} options={{headerShown:true}}/>
        <Stack.Screen name='registrarCliente' component={RegistrarCliente} options={{headerShown:true}}/>
        <Stack.Screen name='editarRegistro' component={EditarRegistro} options={{headerShown:true}}/>
        <Stack.Screen name='deletaCliente' component={DeletarClientes} options={{headerShown:true}}/>
        <Stack.Screen name='pesquisarClientes' component={PesquisarClientes} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
