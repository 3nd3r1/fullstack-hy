import { CoursePart } from "../lib/types";
import { assertNever } from "../lib/utils";

const partStyle = {
	marginTop: 24,
	marginBottom: 24,
};

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
	switch (coursePart.kind) {
		case "basic":
			return (
				<div style={partStyle}>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<em>{coursePart.description}</em>
				</div>
			);
		case "group":
			return (
				<div style={partStyle}>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<p>project exercises {coursePart.groupProjectCount}</p>
				</div>
			);
		case "background":
			return (
				<div style={partStyle}>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<em>{coursePart.description}</em>
					<p>{coursePart.backgroundMaterial}</p>
				</div>
			);
		case "special":
			return (
				<div style={partStyle}>
					<h3>
						{coursePart.name} {coursePart.exerciseCount}
					</h3>
					<em>{coursePart.description}</em>
					<p>required skills: {coursePart.requirements.join(", ")}</p>
				</div>
			);
		default:
			return assertNever(coursePart);
	}
};

export default Part;
