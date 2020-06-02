import { connect } from "react-redux";
import { State } from "../redux/Redux";
import React from "react";
import Table from "react-bootstrap/Table";

type Props = ReturnType<typeof mapStateToProps>

const MiceTableComponent: React.FC<Props> = props => {
    return (<Table hover size="sm" style={{ display: "block", maxHeight: "300px", overflow: "auto" }} >
        <thead style={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <tr>
                <th>mouse id</th>
                <th>tumors</th>
                <th>volume</th>
            </tr>
        </thead>
        <tbody style={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            {props.mice.map(m => (<tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.tumors.length}</td>
                <td>{m.tumorsVolume()}</td>
            </tr>))}
        </tbody>
    </Table>);
};

const mapStateToProps = (state: State) => (
    { mice: state.mice }
);

export const MiceTable = connect(mapStateToProps)(MiceTableComponent)
