import { AxiosResponse } from "axios";

export class BaseService {
	protected unwrap(data: AxiosResponse) {
		return data.data;
	}
}
