type RouteI = {
    path: string
    view: () => HTMLElement | string
}
type RoutesI = RouteI[]

interface RouterI {

}

export class Router implements RouterI {
    private routes: RoutesI = [{ path: '/404', view: () => 'Page Not Found' }];
    private static history: History = window.history
    private location: Location = window.location

    constructor(_routes: RoutesI) {
        this.routes = [..._routes, ...this.routes]
        this.init()
    }

    private pathRegex(path: string) {
        return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")
    }

    public redirect(url: string | URL) {
        Router.history.pushState({}, "", url)
        this.injectView()
    }

    public static useHistory(): { history: History } {
        return { history: Router.history }
    }

    private injectView() {
        const _matches = this.routes?.map((route: RouteI, index) => ({
            id: index,
            route: route,
            isMatch: !!this.location.pathname.match(this.pathRegex(route.path))
        }))

        let currentLocation = _matches?.find(match => match.isMatch)
        if (!currentLocation) {
            this.redirect("/404")
        }
        let _view = currentLocation.route.view()
        let root = document.getElementById("root")
        if (typeof _view === 'string') {

            root.innerHTML = _view
        } else {
            root.replaceChildren(_view)
        }
    }
    private init() {
        window.addEventListener("popstate", () => {
            this.injectView()
        });

        document.body.addEventListener("click", (e: any) => {

            if (e.target.matches('[data-link]')) {
                e.preventDefault()
                this.redirect(e.target.href)
            }

        });

        this.injectView()
    }
}