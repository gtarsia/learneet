import Promise = require('bluebird');
var bcryptjs: any = require('bcryptjs');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

function promisify<T>(fn): Promise<T> {
    return new Promise<T>(
    function(resolve: (result: T) => any,
             reject: (error: any) => void) {
        debugger;
        fn(function(err, result) {
            if (!isOk(err, reject)) result;
            resolve(result);
        });
    });
}

module bcrypt {
    export function genSalt(size: Number): Promise<string> {
        return promisify<string>(bcryptjs.genSalt.bind(bcryptjs, size))
    }
    export function hash(s: string, salt: string): Promise<string> {
        debugger;
        return promisify<string>(bcryptjs.hash.bind(bcryptjs, s, salt));
    }
    export function compare(key: string, hash: string): Promise<string> {
        return bcryptjs.compare(key, hash);
    }
}

export = bcrypt