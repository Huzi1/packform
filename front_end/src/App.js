import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Routes from './Routes';

const App = () => {
  return (
    <div className="App" style={{ heigt: "100%" }}>
      <Routes />
    </div>
  );
}

export default App;
