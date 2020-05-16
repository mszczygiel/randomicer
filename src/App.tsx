import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <Container>
      <Row>
        <Col />
        <Col>
          <h1 className="text-primary">Randomicer</h1>
        </Col>
        <Col />
      </Row>

    </Container>
  );
}

export default App;
