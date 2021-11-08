import { RunnerService } from "./runner.service";
import { StorageService } from "./storage";

export const Services = {
	runner: new RunnerService(),
	storage: new StorageService(),
};
