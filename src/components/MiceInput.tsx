import { connect } from "react-redux";
import React, { ChangeEvent } from "react";
import { miceLoaded } from "../redux/Redux";
import { parseCSV } from "../domain/Parser";

type Props = typeof dispatchProps;

const MiceInputComponent: React.FC<Props> = props => {
    function onLoad(ev: ProgressEvent<FileReader>): any {
        if (typeof ev.target?.result === 'string') {
            const mice = parseCSV(ev.target.result);
            props.onLoaded({ mice: mice });
        }
    }
    function handleUpload(event: ChangeEvent<HTMLInputElement>): void {
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
