const Header = ({ title }) => {
	return <h2>{title}</h2>;
};

const Part = ({ part }) => {
	return (
		<tr>
			<td>{part.name}</td>
			<td>{part.exercises}</td>
		</tr>
	);
};

const Total = ({ parts }) => {
	const total = parts.reduce((ac, part) => ac + part.exercises, 0);
	return (
		<tr>
			<th>Total</th>
			<th>{total}</th>
		</tr>
	);
};

const Content = ({ parts }) => {
	return (
		<div>
			<table style={{ margin: "auto" }}>
				<tbody>
					{parts.map((part) => (
						<Part key={part.id} part={part} />
					))}
					<Total parts={parts} />
				</tbody>
			</table>
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header title={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

export default Course;
