import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import baseUser = baseAjax.user;
import register = baseUser.register;
import baseAuth = baseUser.auth;
import UserFields = baseUser.UserFields;

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

export function auth(params: baseAuth.ParamsType): Promise<baseAuth.ReturnType> {
    return db.hget("user:" + params.username, "hash")
    .then((hash) => {
        return bcrypt.compare(params.password, hash);
    })
    .then((result: boolean) => {
        return {
            why: (result ? '' : 'Invalid authentication'),
            ok: result,
            result: result
        }
    })
}
