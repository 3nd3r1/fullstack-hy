import { CoursePart } from "../lib/types";
import Part from "./part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<div>
			{courseParts.map((coursePart, index) => (
				<Part key={index} coursePart={coursePart} />
			))}
		</div>
	);
};

export default Content;
