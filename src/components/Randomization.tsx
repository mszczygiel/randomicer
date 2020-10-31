import { connect } from "react-redux";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { MiceInput } from "./MiceInput";
import { State, setDistribution, randomizationStarted } from "../redux/Redux";
import { randomize, RandomizationError } from "../domain/Randomizer";
import { defaultRandomizationAlgorithm, findAlgorithm, randomizationAlgorithmNames } from "../algorithms/RandomizationAlgorithm";

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps;

const RandomizationComponent: React.FC<Props> = props => {
    const [noOfGroups, setNoOfGroups] = useState(2);
    const [micePerGroup, setMicePerGroup] = useState(2);
    const [minTumorVolume, setMinTumorVolume] = useState<number | undefined>(undefined);
    const [maxTumorVolume, setMaxTumorVolume] = useState<number | undefined>(undefined);
    const [algorithm, setAlgorithm] = useState(defaultRandomizationAlgorithm)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const randomizationPossible = props.mice.length > 1 && !props.randomizationRunning;

    function showError() {
        if (errorMessage.trim().length > 0) {
            return <Alert variant="danger">{errorMessage}</Alert>
        } else {
            return null;
        }
    }

    function runRandomization() {
        const res = randomize(props.mice, algorithm,
            {
                micePerGroup: micePerGroup,
                numberOfGroups: noOfGroups
            }, {
            minTumorsVolume: minTumorVolume,
            maxTumorsVolume: maxTumorVolume
        }
        );

        if (res instanceof RandomizationError) {
            setErrorMessage(res.message);
        } else if (res instanceof Promise) {
            props.randomizationStarted();
            res.then(dist => props.setRandomizationResult(dist));
        }
    }

    function progressIndicator() {
        if (props.randomizationRunning) {
            return (<span className="spinner-border spinner-border-sm" role="status"></span>)
        } else {
            return null;
        }
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
            <Row>
                <Col md="3">
                    <label htmlFor="algorithm">Algorithm</label>
                    <div className="input-group">
                        <select id="algorithm" onChange={
                            e => {
                                setAlgorithm(findAlgorithm(e.target.value));
                            }
                        }>
                            {randomizationAlgorithmNames.map(name =>
                                (<option key={`algorithm-${name}`} className="form-control" value={name}>{name}</option>)
                            )}
                        </select>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {showError()}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center">
                    <Button
                        disabled={!randomizationPossible}
                        className="btn btn-primary"
                        onClick={() => runRandomization()}
                    >
                        {progressIndicator()}
                        Randomize
                    </Button>
                </Col>
            </Row>
        </>);
};

const mapStateToProps = (state: State) => ({
    mice: state.mice,
    randomizationRunning: state.isRunningRandomization
});

const dispatchProps = {
    setRandomizationResult: setDistribution,
    randomizationStarted: randomizationStarted
};

export const Randomization = connect(mapStateToProps, dispatchProps)(RandomizationComponent);
