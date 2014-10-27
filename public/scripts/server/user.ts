import db = require('./db');
import bcrypt = require('./bcrypt');
import CommonAjax = require('./../common/common-ajax');
import Register = CommonAjax.User.Register;

export function register(params: Register.ParamsType) : Promise<Register.ReturnType> {
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
        return db.hmset("user:" + id, {
            username: params.username,
            hash: hash,
            id: id,
            email: params.email
        })
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
