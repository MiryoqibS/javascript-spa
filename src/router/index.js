import { Constants } from "../common/constants";
import Route from "route-parser";

import MainPage from "../pages/main.template";
import UsersPage from "../pages/users.template";
import PostsPage from "../pages/posts.template";

export const Routes = {
    Main: new Route(Constants.routes.index),
    Users: new Route(Constants.routes.users),
    Posts: new Route(Constants.routes.posts),
};

export const render = (path) => {
    let result = "<h1>404</h1>";
    if (Routes.Main.match(path)) {
        result = MainPage();
    } else if (Routes.Posts.match(path)) {
        result = PostsPage();
    } else if (Routes.Users.match(path)) {
        result = UsersPage();
    };
    document.querySelector("#app").innerHTML = result;
};

export const goTo = (path) => {
    window.history.pushState({ path }, path, path);
    render(path);
};

const initRouter = () => {
    window.addEventListener("popstate", e => {
        render(new URL(window.location.href).pathname);
    });
    document.querySelectorAll('[href^="/"]').forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const { pathname: path } = new URL(e.target.href);
            goTo(path);
        });
    });
    render(new URL(window.location.href).pathname);
};

export default initRouter;