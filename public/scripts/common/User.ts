export module UserJs {
    export class User {
        logIn(username: string, password: string, fn:(err: Error) => any) {
            console.log('Loggueando al usuario: ' + username +
                ', password: ' + password);
            fn(new Error('Not Implemented Exception'));
        }
        isLogged(): boolean {
            throw new Error('Not implemented');
        }
    }
}