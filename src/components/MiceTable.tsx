import { connect } from "react-redux";
import { State } from "../redux/Redux";
import React from "react";

type Props = ReturnType<typeof mapStateToProps>

const MiceTableComponent: React.FC<Props> = props => {
    return (<table className="table">
        <thead>
            <tr>
                <th>id</th>
                <th>tumors</th>
                <th>volume</th>
            </tr>
        </thead>
        <tbody>
            {props.mice.map(m => (<tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.tumors.length}</td>
                <td>{m.tumorsVolume()}</td>
            </tr>))}
        </tbody>
    </table>);
};

const mapStateToProps = (state: State) => (
    { mice: state.mice }
);

export const MiceTable = connect(mapStateToProps)(MiceTableComponent)
