
module url {
    export module article {
        export function get(id?: string) { 
            return (id != null ? "/articles/" + id : "/articles/:id");
        }
        export function create() { return "/create_article" }
        export function edit(id?: string) { 
            return (id != null ? "/edit_article/" + id : "/edit_article/:id");
        }
        export function partials() { return "/partials-article" }
    }
    export module change {
        export function get(articleId?: string, changeId?: string) { 
            return (changeId != null
                ? "/articles/:article_id/changes/:changes_id"
                : "/articles/" + articleId +"/changes/" + changeId);
        }
    }
    export module proposals {
        export function add(id?: string) { 
            return (id != null ? "/add_proposal/" + id : "/add_proposal/:id");
        }
        export function getAll(id?: string) {
            return (id != null ? "/proposals/" + id : "/proposals/:id");
        }
    }
    export module user {
        export function register() { return "/register"; }
    }
}

export = url