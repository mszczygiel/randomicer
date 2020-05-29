import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MiceInput } from './components/MiceInput';
import { reducer } from './redux/Redux';
import { MiceTable } from './components/MiceTable';

const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Row>
          <Col />
          <Col>
            <h1 className="text-primary">Randomicer</h1>
          </Col>
          <Col />
        </Row>
        <Row>
          <Col>
            <MiceInput></MiceInput>
          </Col>
        </Row>
        <Row>
          <Col>
            <MiceTable />
          </Col>
        </Row>

      </Container>
    </Provider>
  );
}

export default App;
