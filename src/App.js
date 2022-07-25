import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  render() {
    return (
      <div>
        <Form />
        <Card />
      </div>
    );
  }
}

export default App;
