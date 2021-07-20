import React, { useState, useEffect } from 'react';
import axios from 'axios'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap' //Animate-Spinner

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import './App.css';

function App() {

  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(false)

  async function getPlayers() {
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
    { dataField: "name", text: "Nome do jogador", filter: textFilter() },
    { dataField: "points_per_game", text: "Pontos por jogo", filter: textFilter() },
    { dataField: "three_point_made_per_game", text: " Três pontos feitos por jogo", filter: textFilter() },
    { dataField: "team_name", text: "Time do jogador", filter: textFilter() },
  ]

  useEffect(()=> {
    getPlayers()
    
  },[])
  
  return (
    <div className="App">

        <h1>Tabela NBA</h1>

        { loading ? (
            <BootstrapTable 
            keyField="name"
            data={info}
            columns={columns}
            pagination={paginationFactory()}
            filter={filterFactory()}
          />
        ) : (
          <>
            <ReactBootstrap.Spinner animation="border" /> 
          </>
        )}
  </div>
  );
}

export default App;
