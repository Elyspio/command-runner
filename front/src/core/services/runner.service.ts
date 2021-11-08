import { InlineObject } from "../apis/backend/generated";
import { inject, injectable } from "inversify";
import { RunnerApi } from "../apis/backend";
import { DiKeysApi } from "../di/di.keys.api";

@injectable()
export class RunnerService {
	@inject(DiKeysApi.runner)
	private runnerApi!: RunnerApi;

	public run = async (options: InlineObject) => {
		const now = Date.now();
		const data = await this.runnerApi.client.run(options).then((x) => x.data);
		return {
			duration: Date.now() - now,
			data,
		};
	};
}
