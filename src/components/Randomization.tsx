import { connect } from "react-redux";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MiceInput } from "./MiceInput";
import { State } from "../redux/Redux";

type Props = ReturnType<typeof mapStateToProps>;

const RandomizationComponent: React.FC<Props> = props => {
    const [noOfGroups, setNoOfGroups] = useState(2);
    const [micePerGroup, setMicePerGroup] = useState(2);
    const [minTumorVolume, setMinTumorVolume] = useState<number | undefined>(undefined);
    const [maxTumorVolume, setMaxTumorVolume] = useState<number | undefined>(undefined);
    const randomizationPossible = props.mice.length > 1;

    function randomize() {
        console.log(noOfGroups, micePerGroup, minTumorVolume, maxTumorVolume);
    }

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
                        <input id="no-of-groups"
                            className="form-control"
                            type='number'
                            placeholder="No of groups"
                            min="2"
                            value={noOfGroups}
                            onChange={e => setNoOfGroups(e.target.valueAsNumber)}
                        >
                        </input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="mice-per-group">Mice per group</label>
                    <div className="input-group">
                        <input id="mice-per-group"
                            className="form-control"
                            type='number'
                            placeholder="Mice per group"
                            min="2"
                            value={micePerGroup}
                            onChange={e => setMicePerGroup(e.target.valueAsNumber)}
                        >
                        </input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="lower-tumor-threshold">Min TV</label>
                    <div className="input-group">
                        <input id="lower-tumor-threshold"
                            className="form-control"
                            type='number'
                            step="0.01"
                            placeholder="Lower TV threshold" min="0"
                            value={minTumorVolume || ''}
                            onChange={e => {
                                if (e.target.value === '') {
                                    setMinTumorVolume(undefined);
                                } else {
                                    setMinTumorVolume(e.target.valueAsNumber);
                                }
                            }}
                        >

                        </input>
                    </div>
                </Col>
                <Col>
                    <label htmlFor="upper-tumor-threshold">Max TV</label>
                    <div className="input-group">
                        <input id="upper-tumor-threshold"
                            className="form-control"
                            type='number'
                            step="0.01"
                            placeholder="Upper TV threshold"
                            min="0"
                            value={maxTumorVolume || ''}
                            onChange={e => {
                                if (e.target.value === '') {
                                    setMaxTumorVolume(undefined);
                                } else {
                                    setMaxTumorVolume(e.target.valueAsNumber);
                                }
                            }}></input>
                    </div>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button
                        disabled={!randomizationPossible}
                        className="btn btn-primary"
                        onClick={(e: any) => randomize()}
                    >
                        Randomize
                    </Button>
                </Col>
            </Row>
        </>);
};

const mapStateToProps = (state: State) => ({
    mice: state.mice
});

export const Randomization = connect(mapStateToProps)(RandomizationComponent);
