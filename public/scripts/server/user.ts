import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import register = baseAjax.user.register;
import UserFields = baseAjax.user.UserFields;

export function hash() : Promise<string> {
    return bcrypt.genSalt(10)
    .then((salt: string) => {
        return bcrypt.hash(salt);
    });
}

export function register(params: register.ParamsType) : Promise<register.ReturnType> {
    var id;
    var hash;
    return hash(params.password)
    .then((_hash: string) => {
        hash = _hash;
        return db.incr("user:ids")
    })
    .then((_id: string) => {
        id = _id;
        return db.hmset("user:" + id, {
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

export function auth(username: string, password: string) {

}
