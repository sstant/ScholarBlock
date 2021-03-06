import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Drizzle, generateStore } from "drizzle";
import { drizzleReactHooks } from 'drizzle-react'
import App from './App'
import options from "./drizzleOptions";
import Loading from './Loading';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

window.ethereum.on('accountsChanged', function (accounts) {
  window.location.reload();
})

ReactDOM.render(
<drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
   <Loading>
    <App />
   </Loading>
  </drizzleReactHooks.DrizzleProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();