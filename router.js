class Router {
    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('root');
        window.onpopstate = this.loadRoute.bind(this);
        this.loadRoute();
    }

    loadRoute() {
        const path = window.location.pathname;
        const route = this.routes[path] || this.routes['/'];
        fetch(route)
            .then(response => response.text())
            .then(html => {
                this.rootElem.innerHTML = html;
            });
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.loadRoute();
    }
}

const routes = {
    '/': 'home.html',
    '/services': 'services.html',
    '/about': 'about.html',
    '/contact': 'contact.html',
    '/social': 'social.html',
    '/blog': 'blog.html'
};

const router = new Router(routes);

document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        router.navigate(e.target.href);
    }
});