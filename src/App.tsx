import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './redux/Redux';
import { MiceTable } from './components/MiceTable';
import { Randomization } from './components/Randomization';
import { RandomizationResult } from './components/RandomizationResult';
import { Help } from './components/Help';

const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Row className="align-items-center">
          <Col className="text-center">
            <h1 className="text-primary">Randomicer</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={{offset: 6}} className="text-right">
            <Help></Help>
          </Col>
        </Row>
        <Randomization />
        <hr />
        <Row>
          <Col>
            <h3 className="text-center">Input</h3>
            <MiceTable />
          </Col>
          <Col className="text-center">
            <h3>Output</h3>
            <RandomizationResult></RandomizationResult>
          </Col>
        </Row>

      </Container>
    </Provider>
  );
}

export default App;
