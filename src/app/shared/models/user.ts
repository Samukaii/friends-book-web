import { Attachment } from "../../pages/posts/models/post";

export interface User {
	id: number;
	name: string;
	surname: string;
	nickname: string;
	friends: number;
	email: string;
	following: boolean;
	followersCount: number;
	followingCount: number;
	profile?: Attachment;
	cover?: Attachment;
}
