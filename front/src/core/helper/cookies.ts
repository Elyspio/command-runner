    /**
     * Add a cookie to document
     * @param name name of the token
     * @param value name of token
     * @param expire number of day before token expiration
     */
    export function setCookie(name: string, value: string, expire: number) {
        const d = new Date();
        d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    /**
     * Get a cookie from its name
     * @param name name of the cookie
     */
    export function getCookie(name: string) {
        name = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

