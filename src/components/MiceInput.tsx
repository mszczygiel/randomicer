import { connect } from "react-redux";
import React, { ChangeEvent, Dispatch } from "react";
import { Action, miceLoaded } from "../redux/Redux";

type Props = typeof dispatchProps;

const MiceInputComponent: React.FC<Props> = props => {
    function onLoad(ev: ProgressEvent<FileReader>): any {
        console.log(ev.target?.result);
    }
    function handleUpload(event: ChangeEvent<HTMLInputElement>): void {
        console.log(event.target.files);
        const file = event.target.files?.item(0);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = onLoad;
            reader.readAsText(file);
        }
    }
    return (
        <div>
            <input type="file" accept=".txt,.csv,text/plain,text/csv" onChange={handleUpload}></input>
        </div>
    );
};

const dispatchProps = {
    onLoaded: miceLoaded
};

export const MiceInput = connect(undefined, dispatchProps)(MiceInputComponent);