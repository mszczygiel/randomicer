import { connect } from "react-redux";
import { State } from "../redux/Redux";
import { Group } from "../domain/Randomizer";
import React from "react";
import Table from "react-bootstrap/Table";

type Props = ReturnType<typeof mapDispatchToProps>;

const RandomizationResultComponent: React.FC<Props> = props => {
    if (props.distribution === null) {
        return null;
    }

    return (<>
        {props.distribution?.groups.map((g, idx) => <GroupComponent group={g} id={idx}></GroupComponent>)}
    </>);
};

interface GroupComponentProps {
    group: Group,
    id: number
};
const GroupComponent: React.FC<GroupComponentProps> = props => {
    const mice = props.group.mice.sort((m1, m2) => m2.tumorsVolume() - m1.tumorsVolume());
    return (
        <>
            <h4>G{props.id + 1} AVG({props.group.tumorsMean().toFixed(3)}) MED({props.group.tumorsMedian().toFixed(3)}) SD({props.group.tumorsStdDev().toFixed(3)})</h4>
            <Table size="sm">
                <thead>
                    <th>id</th>
                    <th>TV</th>
                    <th>NT</th>
                </thead>
                <tbody>
                    {mice.map(mouse => (<>
                        <tr>
                            <td>{mouse.id}</td>
                            <td>{mouse.tumorsVolume()}</td>
                            <td>{mouse.tumors.length}</td>
                        </tr>
                    </>))}
                </tbody>
            </Table>
        </>);
}

const mapDispatchToProps = (state: State) => ({
    distribution: state.distribution
});

export const RandomizationResult = connect(mapDispatchToProps)(RandomizationResultComponent);
