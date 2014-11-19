export interface Validation {
    ok: Boolean;
    because: string;
}

export function notOkBase(base: string): (reason: string) => Validation {
    return (reason: string) => {
        return { ok: false, because: base + ' ' + reason }
    }
}

export function ok() { return { ok: true, because: ''}; }

export module article {

}

export module version {
    export function changesDescription(changesDescription: string) {
        var notOk = notOkBase('Changes description should');
        if (typeof changesDescription != 'string')
            return notOk('be of type string')
        if (changesDescription.length <= 15)
            return notOk('be longer than 15 characters')
        return ok();
    }
}


export module user {
    export function isUsernameTaken(username: string) {

    }
    export function isPasswordSafeEnough(password: string) {

    }
    export function isEmailTaken() {

    }
}