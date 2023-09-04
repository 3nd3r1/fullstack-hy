import { NextFunction, Request, Response } from "express";
import { BadInputError, NotFoundError } from "../errors";

const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof BadInputError) {
		res.status(500).send(err.message);
	} else if (err instanceof NotFoundError) {
		res.status(404).send(err.message);
	} else if (err instanceof Error) {
		res.status(400).send("Error: " + err.message);
	} else {
		res.status(400).send("Something went wrong");
	}
};

export default errorHandler;
