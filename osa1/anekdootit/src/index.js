import ReactDOM from "react-dom/client";
import App from "./App";

//ReactDOM.render(<App />, document.getElementById("root"));

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
