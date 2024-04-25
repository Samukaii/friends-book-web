import { Attachment } from "../../pages/posts/models/post";

export interface User {
	id: number;
	name: string;
	surname: string;
	friends: number;
	email: string;
	following: boolean;
	profile?: Attachment;
	cover?: Attachment;
}
