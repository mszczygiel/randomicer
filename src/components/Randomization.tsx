import { connect } from "react-redux";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MiceInput } from "./MiceInput";

type Props = undefined;

const RandomizationComponent: React.FC<Props> = props => {
    return (
        <>
            <Row>
                <Col className="text-center">
                    <MiceInput />
                </Col>
            </Row>
            <Row>
                <Col>
                    <label htmlFor="no-of-groups">No of groups</label>
                    <div className="input-group">
                        <input id="no-of-groups" className="form-control" type='number' placeholder="No of groups" min="2" defaultValue="2"></input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="mice-per-group">Mice per group</label>
                    <div className="input-group">
                        <input id="mice-per-group" className="form-control" type='number' placeholder="Mice per group" defaultValue="2" min="2"></input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="lower-tumor-threshold">Min TV</label>
                    <div className="input-group">
                        <input id="lower-tumor-threshold" className="form-control" type='number' step="0.01" placeholder="Lower TV threshold" min="0"></input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="upper-tumor-threshold">Max TV</label>
                    <div className="input-group">
                        <input id="upper-tumor-threshold" className="form-control" type='number' step="0.01" placeholder="Upper TV threshold" min="0"></input>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <button type="button" className="btn btn-primary">Randomize</button>
                </Col>
            </Row>
        </>);
};

export const Randomization = connect(undefined, undefined)(RandomizationComponent);
