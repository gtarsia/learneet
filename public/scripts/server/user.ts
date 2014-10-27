import db = require('./db');
import bcrypt = require('./bcrypt');

module user {
    export interface RegisterParams { 
        username: string; password: string; email: string;
    }
    export function register(params: RegisterParams) {
        var id;
        var hash;
        return bcrypt.genSalt(10)
        .then((salt: string) => {
            return bcrypt.hash(salt);
        })
        .then((_hash: string) => {
            hash = _hash;
            return db.incr("user:ids")
        })
        .then((_id: string) => {
            id = _id;
            db.hmset("user:" + id, {
                username: params.username,
                hash: hash,
                id: id,
                email: params.email
            })
        });
    }

    export function auth(username: string, password: string) {

    }
}

export = user;