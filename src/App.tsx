import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createReducer } from 'typesafe-actions';
import { MiceInput } from './components/MiceInput';

interface State {
  value: number;
}
type Action = { type: 'dupa' };
const initialState = { value: 0 };
const reducer = createReducer<State, Action>(initialState)
  .handleType('dupa', (state, action) => state);
const store = createStore(reducer);

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

      </Container>
    </Provider>
  );
}

export default App;
