import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

interface OwnProps {

}
type Props = OwnProps;

export const Help: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <svg className="bi bi-question-circle" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            </Button>
            <Collapse in={open}>
                <div className="text-justify">
                    <h5>
                        File format:
                    </h5>
                    <p>
                        Each mouse entry spans 2 rows and N columns (where N = max number of tumors in any mouse). Columns are separated with <em>;</em>
                    </p>
                    <p>
                        For example, to represent 5 mice, where mouse with id 2 has two tumors (3.5x4.1 and 1.2x2.1), whereas rest have 1 (all 3.5x4.1) one could prepare file with the following content:
                    </p>
                    <pre>
                        1;3.5;<br />
                        ;4.1;<br />
                        2;3.5;1.2<br />
                        ;4.1;2.1<br />
                        3;3.5;<br />
                        ;4.1;<br />
                        4;4.1;<br />
                        ;3.5;<br />
                        5;3.5;<br />
                        ;4.1;
                    </pre>
                    <h5>
                        Issues
                    </h5>
                    <p>
                        If you encounter any issue or have improvement idea, please use raise issue on <a href="https://github.com/mszczygiel/randomicer/issues" target="__blank">Github</a>
                    </p>
                </div>
            </Collapse>
        </>
    );
};
