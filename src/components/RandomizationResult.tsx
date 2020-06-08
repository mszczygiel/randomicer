import { connect } from "react-redux";
import { State } from "../redux/Redux";
import { Group, Distribution } from "../domain/Randomizer";
import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

type Props = ReturnType<typeof mapDispatchToProps>;

const RandomizationResultComponent: React.FC<Props> = props => {
    if (props.distribution === undefined) {
        return null;
    }

    return (<>
        <DownloadDistributionComponent distribution={props.distribution}></DownloadDistributionComponent>
        {props.distribution.groups.map((g, idx) => <GroupComponent key={`group-${idx}`} group={g} id={idx}></GroupComponent>)}
    </>);
};

interface GroupComponentProps {
    group: Group,
    id: number
};

interface DownloadDistributionComponentProps {
    distribution: Distribution
};

const DownloadDistributionComponent: React.FC<DownloadDistributionComponentProps> = props => {
    const symbols = ["_ _", "_ o", "o _", "o o", "_ oo", "oo _", "oo oo", "o oo", "oo o"];
    function renderGroup(group: Group, idx: number): string {
        const header = `Sym;LP;TV;NT;G${idx};AVG;${group.tumorsMean()};MED;${group.tumorsMedian()};SD;${group.tumorsStdDev()}`;
        let content = "";
        group.mice.sort((m1, m2) => m2.tumorsVolume() - m1.tumorsVolume()).forEach((mouse, idx) => {
            const symbol = symbols[idx % symbols.length];
            content += `${symbol};${mouse.id};${mouse.tumorsVolume()};${mouse.tumors.length}\n`
        });
        return `${header}\n${content}`;
    }
    const blob = new File(props.distribution.groups.map((g, idx) => renderGroup(g, idx + 1)), "result.csv");
    const href = URL.createObjectURL(blob);
    return (<a href={href} download><Button variant="success">Download</Button></a>);
}


const GroupComponent: React.FC<GroupComponentProps> = props => {
    const mice = props.group.mice.sort((m1, m2) => m2.tumorsVolume() - m1.tumorsVolume());
    return (
        <>
            <h4>G{props.id + 1} AVG({props.group.tumorsMean().toFixed(3)}) MED({props.group.tumorsMedian().toFixed(3)}) SD({props.group.tumorsStdDev().toFixed(3)})</h4>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>TV</th>
                        <th>NT</th>
                    </tr>
                </thead>
                <tbody>
                    {mice.map(mouse => (
                        <tr key={`mouse-${mouse.id}`}>
                            <td>{mouse.id}</td>
                            <td>{mouse.tumorsVolume()}</td>
                            <td>{mouse.tumors.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>);
}

const mapDispatchToProps = (state: State) => ({
    distribution: state.distribution
});

export const RandomizationResult = connect(mapDispatchToProps)(RandomizationResultComponent);
