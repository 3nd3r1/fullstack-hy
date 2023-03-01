import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reviewReducer from "./reducer";

const store = createStore(reviewReducer);

const Statistics = ({ stats }) => (
	<table style={{ textAlign: "center" }}>
		<tbody>
			<tr>
				<th>good</th>
				<th>ok</th>
				<th>bad</th>
			</tr>
			<tr>
				<td>{stats.good}</td>
				<td>{stats.ok}</td>
				<td>{stats.bad}</td>
			</tr>
		</tbody>
	</table>
);
const App = () => {
	const styles = {
		mainDiv: {
			margin: "auto",
			width: "50%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			paddingTop: "50px",
			fontFamily: "Helvetica",
			fontSize: "24px",
		},
		reviewButton: {
			padding: "10px",
			fontSize: "24px",
			margin: "4px",
			borderRadius: "10px",
			cursor: "pointer",
			userSelect: "none",
		},
	};
	return (
		<div style={styles.mainDiv}>
			<div>
				<button
					style={styles.reviewButton}
					onClick={(e) => store.dispatch({ type: "GOOD" })}
				>
					good
				</button>
				<button
					style={styles.reviewButton}
					onClick={(e) => store.dispatch({ type: "OK" })}
				>
					ok
				</button>
				<button
					style={styles.reviewButton}
					onClick={(e) => store.dispatch({ type: "BAD" })}
				>
					bad
				</button>
				<button
					style={styles.reviewButton}
					onClick={(e) => store.dispatch({ type: "ZERO" })}
				>
					reset stats
				</button>
			</div>
			<Statistics stats={store.getState()} />
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
	root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
