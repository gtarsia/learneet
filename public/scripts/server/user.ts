import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import register = baseAjax.user.register;
import UserFields = baseAjax.user.UserFields;

export function register(params: register.ParamsType) : Promise<register.ReturnType> {
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
        return create({
            username: params.username,
            hash: hash,
            id: id,
            email: params.email,
            activated: false
        });
    })
    .then((res: string) => {
        return {
            ok: true,
            why: '',
            result: (res == 'OK')
        }
    });
}

export function create(user: UserFields) {
    return db.hmset("user:" + user.id, {
        username: user.username,
        hash: user.hash,
        id: user.id,
        email: user.email,
        activated: user.activated
    });
}

export function auth(username: string, password: string) {

}
