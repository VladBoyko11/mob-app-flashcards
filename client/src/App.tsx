import './App.css';
import {Provider} from "react-redux";
import store from './redux/store'
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>NEXT JS BRANCH</div>
      <BrowserRouter>
          <Header />
          <Main store={store}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
