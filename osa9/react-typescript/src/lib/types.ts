interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartDecriptive extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartDecriptive {
	kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: "group";
}

interface CoursePartBackground extends CoursePartDecriptive {
	backgroundMaterial: string;
	kind: "background";
}

interface CoursePartSpecial extends CoursePartDecriptive {
	requirements: string[];
	kind: "special";
}

export type CoursePart =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;
