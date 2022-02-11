import React from "react";
import { render } from "react-dom";

const Application: React.FunctionComponent<{}> = () => <h1>Wrong</h1>;

render(<Application />, document.getElementById("root"));
