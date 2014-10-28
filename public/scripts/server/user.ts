import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import register = baseAjax.user.register;
import UserFields = baseAjax.user.UserFields;

export function hash(password: string) : Promise<string> {
    return bcrypt.genSalt(10)
    .then((salt: string) => {
        return bcrypt.hash(password, salt);
    });
}

export function register(params: register.ParamsType) : Promise<register.ReturnType> {
    var id;
    var hashed;
    return hash(params.password)
    .then((_hash: string) => {
        hashed = _hash;
        return db.hmset("user:" + params.username, {
            username: params.username,
            hash: hashed,
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
    return db.hget("user:" + username, "hash")
    .then((hash) => {
        return bcrypt.compare(password, hash);
    })
    .then((result) => {
        console.log(result);
    })
}
