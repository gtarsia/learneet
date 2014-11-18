
module url {
    export module article {
        export function get(id?: string) { 
            return (id != null ? "/article/" + id : "/article/:id");
        }
        export function create() { return "/create_article" }
        export function edit(id?: string) { 
            return (id != null ? "/edit_article/" + id : "/edit_article/:id");
        }
        export function addProposal(id?: string) { 
            return (id != null ? "/add_proposal/" + id : "/add_proposal/:id");
        }
    }
    export module user {
        export function register() { return "/register"; }
    }
}

export = url