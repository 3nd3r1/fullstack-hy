//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => !isNaN(Number(value));

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumberArray = (value: any): boolean => {
	if (!Array.isArray(value)) return false;
	return (value as number[]).every((v) => isNumber(v));
};
