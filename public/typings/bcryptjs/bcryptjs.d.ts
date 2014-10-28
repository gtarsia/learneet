
declare module bcryptjs {

    function genSalt(size: Number, cb: (err, salt) => void);
    function hash(key: string, salt: string, cb: (err, hash) => void);
    function compare(key: string, hash: string, cb: (err, res) => void);
}