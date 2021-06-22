import React from 'react';
import logo from './logo.svg';
import { ToDoList } from './features/list/toDoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>To-do List</h1>
        <ToDoList/>
      </header>
    </div>
  );
}

export default App;
