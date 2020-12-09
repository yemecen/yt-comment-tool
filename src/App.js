import React from 'react';
import { Search } from './components/Search';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

function App() {

  return (
    <div className="App">
      <Container>
        <Row>
          <Col><Search /></Col>
        </Row>        
      </Container>
    </div>
  );
}

export default App;
