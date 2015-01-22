import db = require('./db');
import bcrypt = require('./bcrypt');
import baseAjax = require('./../common/base-ajax');
import keys = require('./redis-keys');
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
        return db.hmset(keys.usernamesSets({user: params}), {id: id})
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
        'GET', baseKey + 'hash',
        'GET', baseKey + 'username',
        'GET', baseKey + 'email', 
        'GET', baseKey + 'activated')
    .then(values => {
        var user: any = {};
        user.id = values.shift();
        user.hash = values.shift();
        user.username = values.shift();
        user.email = values.shift();
        user.activated = values.shift();
        return user;
    })
}

export function auth(params: baseAuth.Params): Promise<baseAuth.Return> {
    var user;
    debugger;
    return get({user: params})
    .then((_user) => {
        user = _user;
        return bcrypt.compare(params.password, user.hash);
    })
    .then((result: boolean) => {
        return {
            why: (result ? '' : 'Invalid authentication'),
            ok: result,
            result: user
        }
    })
}
