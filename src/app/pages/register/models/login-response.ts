import { User } from "../../../shared/models/user";

export interface LoginResponse {
	token: string;
	user: User
}
