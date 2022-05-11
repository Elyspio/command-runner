import { Default, Integer, Nullable, Optional, Property, Required } from "@tsed/schema";

class ExecException {
	@Property()
	@Nullable(String)
	cmd?: string;

	@Property(Boolean)
	@Optional()
	@Nullable(Boolean)
	killed?: boolean;

	@Integer()
	@Optional()
	@Nullable(Number)
	code?: number;

	@Property()
	@Optional()
	@Nullable(String)
	signal?: NodeJS.Signals;
}

export class RunResponse {
	@Integer()
	@Required()
	code!: number | null;

	@Property(ExecException)
	@Nullable(ExecException)
	error?: ExecException;

	@Property(String)
	@Nullable(String)
	signal?: string;

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

	@Property()
	@Default(false)
	admin!: boolean;
}

export class RunFromAppRequest extends RunRequest {
	@Property()
	@Required()
	token!: string;
}
