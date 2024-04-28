import { PostsComponent } from "./pages/posts/posts.component";
import { authenticatedGuard } from "./core/guards/authenticated.guard";
import { LoginComponent } from "./pages/login/login.component";
import { nonAuthenticatedGuard } from "./core/guards/non-authenticated.guard";
import { RegisterComponent } from "./pages/register/register.component";
import { MyProfileComponent } from "./pages/my-profile/my-profile.component";
import { AppRoutes } from "./shared/models/app-routes";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { SearchFriendsComponent } from "./pages/search-friends/search-friends.component";

export const routes: AppRoutes = [
	{
		path: "profile/:id",
		component: UserProfileComponent,
		canActivate: [
			authenticatedGuard
		],
	},
	{
		path: "my-profile",
		component: MyProfileComponent,
		canActivate: [
			authenticatedGuard
		],
	},
	{
		path: "posts",
		component: PostsComponent,
		canActivate: [
			authenticatedGuard
		]
	},
	{
		path: "search-friends",
		component: SearchFriendsComponent,
		canActivate: [
			authenticatedGuard
		]
	},
	{
		path: "login",
		component: LoginComponent,
		data: {
			routeConfiguration: {
				showMenu: false,
				showFriends: false
			}
		},
		canActivate: [
			nonAuthenticatedGuard
		]
	},
	{
		path: "register",
		component: RegisterComponent,
		data: {
			routeConfiguration: {
				showMenu: false,
				showFriends: false
			}
		},
		canActivate: [
			nonAuthenticatedGuard
		]
	},
	{
		path: "",
		redirectTo: "posts",
		pathMatch: "full"
	},
];
