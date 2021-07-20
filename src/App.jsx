import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap'

import React, { useState, useEffect } from 'react';
import axios from 'axios'

import './App.css';

function App() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(false)

  async function getPlayrs() {
    try {
      const data  = await axios.get('https://nba-players.herokuapp.com/players-stats')
        console.log(data)
        setInfo(data.data)
        setLoading(true)
      
    } catch (error) {
        console.log(error)
    }
  }

  const columns = [
    { dataField: "name", text: "Nome do jogador" },
    { dataField: "points_per_game", text: "Pontos por jogo" },
    { dataField: "three_point_made_per_game", text: " Três pontos feitos por jogo" },
    { dataField: "team_name", text: "Time do jogador" },
  ]

  useEffect(()=> {
    getPlayrs()
  },[])
  
  return (
    <div className="App">

        { loading ? (
            <BootstrapTable 
            keyField="name"
            data={info}
            columns={columns}
            pagination={paginationFactory()}
          />
        ) : (
          <ReactBootstrap.Spinner animation="border" /> 
        )}
  </div>
  );
}

export default App;
