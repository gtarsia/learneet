import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import keys = require('./redis-keys');
import baseUser = baseAjax.user;
import register = baseUser.register;
import baseAuth = baseUser.auth;
import UserFields = baseUser.UserFields;
import avatar = require('./avatar');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function notOkObj(reason: string): any {
    return {
        ok: false,
        why: reason
    }
}

export function okObj<T>(obj: T): any {
    return {
        ok: true,
        why: '',
        result: obj
    }
}

export function hash(password: string) : Promise<string> {
    return bcrypt.genSalt(10)
    .then((salt: string) => {
        return bcrypt.hash(password, salt);
    });
}

export function register(params: register.Params) : Promise<register.Return> {
    var userwithid;
    var id;
    var hashed;
    return hash(params.password)
    .then((_hash: string) => {
        hashed = _hash;
        return db.incr(keys.usersIdCounter())
    })
    .then(_id => {
        userwithid = {user: {id: _id}};
        id = _id;
        return db.sadd(keys.usersIdSet(), _id)
    })
    .then(ok => {
        return db.sadd(keys.usernamesSets({user: params}), id)
    })
    .then(ok => {
        return db.hmset(keys.user(userwithid), {
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

export function get(params: {user: {username: string}}): Promise<baseUser.UserFields> {
    var baseKey = keys.usersBase() + ':*->';
    return db.sort(keys.usernamesSets(params), 'by', 'nosort', 
        'GET', baseKey + 'id',
        'GET', baseKey + 'username',
        'GET', baseKey + 'email', 
        'GET', baseKey + 'activated',
        'GET', baseKey + 'avatar_url')
    .then(values => {
        var user: any = {};
        user.id = values.shift();
        user.username = values.shift();
        user.email = values.shift();
        user.activated = values.shift();
        user.avatar_url = values.shift();
        return user;
    })
}

export function getHash(params: {user: {username: string}}): Promise<baseUser.UserFields> {
    var baseKey = keys.usersBase() + ':*->';
    debugger;
    return db.sort(keys.usernamesSets(params), 'by', 'nosort', 
        'GET', baseKey + 'hash')
    .then(values => {
        debugger;
        var user: any = {};
        user.hash = values.shift();
        return user;
    })
}

export function uploadAvatar(args: {user: {id: string}; image: {path: string}}) {
    return avatar.upload(args.image.path)
    .then(url => {
        return db.hmset(keys.user(args), {avatar_url: url})
    })
}

export function auth(params: baseAuth.Params): Promise<baseAuth.Return> {
    var user;
    var equals;
    return getHash({user: params})
    .then((_user) => {
        user = _user;
        return bcrypt.compare(params.password, user.hash);
    })
    .then((equals: boolean) => {
        if (equals)
            return get({user: params})
            .then(res => {
                return okObj(res);
            })
        else return notOkObj('Invalid authentication');
    })
}
