
import { Constants } from "../common/constants";
import { goTo } from "../router/index";

class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.links = [
            { href: Constants.routes.index, name: "Home", class: "home-link" },
            { href: Constants.routes.posts, name: "Posts", class: "posts-link" },
            { href: Constants.routes.users, name: "Users", class: "users-link" },
        ];
        const shadow = this.attachShadow({ mode: "open" });
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "main-menu");
        const style = document.createElement("style");
        this.searchType = Constants.search.types.post;

        style.textContent = `
            .main-menu {
                display: flex;
                align-items: center;   
                padding: 5px;
            }

            .global-search {
                font-size: 16px;
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 4px 20px;
                width: 100%;
                margin: 0 50px;
            }

            .global-search::placeholder {
                color: #aaa;
            }
        `;

        shadow.appendChild(wrapper);
        shadow.appendChild(style);

        this.links.forEach(link => {
            const linkEl = document.createElement("nav-link");
            linkEl.setAttribute("class", `main-link ${link.class}`);
            linkEl.setAttribute("href", link.href);
            linkEl.setAttribute("text", link.name);
            wrapper.appendChild(linkEl);
        });

        const search = document.createElement("input");
        search.setAttribute("class", "global-search");
        search.addEventListener("keyup", (e) => {
            e.stopPropagation();
            if (e.key === "Enter") {
                e.preventDefault();
                const searchText = e.target.value;
                console.log("search", searchText);
            };
        });

        wrapper.appendChild(search);
    }

    updateSearch() {
        const shadow = this.shadowRoot;
        const input = shadow.querySelector("input");
        const search = this.getAttribute("search");
        input.value = search;
        switch (this.searchType) {
            case Constants.search.types.post:
                input.setAttribute("placeholder", "Search post...");
                break;
            case Constants.search.types.user:
                input.setAttribute("placeholder", "Search user...");
                break;
            default:
                input.setAttribute("placeholder", "Search..");
                break;
        };
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const searchText = this.getAttribute("search");
        this.searchType = this.getAttribute("type") || Constants.search.types.post;
        if (searchText) {
            const input = shadow.querySelector("input");
            input.value = searchText;
        }

        const { pathname: path } = new URL(window.location.href);
        const link = this.links.find(l => l.href === path);

        if (link) {
            const linkEl = shadow.querySelector(`.${link.class}`);
            linkEl.setAttribute("selected", "true");
        };
    }

    static get observedAttributes() {
        return ["search", "type"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "search":
                this.updateSearch();
                break;
            case "type":
                this.searchType = newValue;
                this.updateSearch();
                break;
        }
    }
}

customElements.define('main-nav', NavComponent);