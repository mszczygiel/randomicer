import { connect } from "react-redux";
import React, { ChangeEvent } from "react";

interface OwnProps {

}

const MiceInputComponent: React.FC<OwnProps> = props => {
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

export const MiceInput = connect(null, null)(MiceInputComponent);