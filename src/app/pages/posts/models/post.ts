import { User } from "../../../shared/models/user";

export interface Attachment {
	name: string;
	url: string;
	size: number;
	type: string;
}

export interface Post {
	id: number;
	title: string;
	description: string;
	active: boolean;
	createdBy: User;
	createdAt: string;
	image: Attachment;
}
