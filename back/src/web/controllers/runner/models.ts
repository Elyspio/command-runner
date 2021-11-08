import { Integer, Property, Required } from "@tsed/schema";

class ExecException {
	@Property()
	cmd?: string;

	@Property(Boolean)
	killed?: boolean;

	@Integer()
	code?: number;

	@Property()
	signal?: NodeJS.Signals;
}

export class RunResponse {
	@Integer()
	@Required()
	code!: number | null;

	@Property(ExecException)
	error!: ExecException | null;

	@Property(String)
	signal!: string | null;

	@Property()
	@Required()
	stderr!: string;

	@Property()
	@Required()
	stdout!: string;
}

export class RunRequest {
	@Property()
	@Required()
	cwd!: string;

	@Property()
	@Required()
	command!: string;
}
