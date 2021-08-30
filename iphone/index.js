/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Cart from './src/screens/Cart';
import Login from './src/screens/Login';
import test from './test';
AppRegistry.registerComponent(appName, () => test);
