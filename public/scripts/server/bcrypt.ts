import Promise = require('bluebird');
var bcryptjs: any = Promise.promisifyAll(require('bcryptjs'));

module bcrypt {

    export function genSalt(size: Number): Promise<string> {
        return bcryptjs.genSalt(size);
    }
    export function hash(key: string): Promise<string> {
        return bcryptjs.hash(key);
    }
    export function compare(key: string, hash: string): Promise<string> {
        return bcryptjs.compare(key, hash);
    }
}

export = bcrypt