import { LocaleHelper, DeviceHelper, config } from '../helpers';

class BaseRepository {
    constructor(SessionStore) {
        this.BASE_URL = config('api.baseUrl', '');
        this.PATH = this.getPath();
        this.sessionStore = SessionStore;
    }

    getPath() {
        return '/';
    }

    index(offset, limit, order, direction, searchWord = '', params = {}) {
        return this.get(
            this.PATH,
            Object.assign(
                {
                    offset: offset || 0,
                    limit: limit || 0,
                    direction: direction || 'id',
                    order: order || 'asc',
                    query: searchWord || '',
                },
                params
            )
        );
    }

    getAuthHeaderInfo() {
        if (!this.sessionStore || !this.sessionStore.accessToken) {
            return {};
        }

        return {
            Authorization: 'Bearer ' + this.sessionStore.accessToken,
        };
    }

    getClientHeaderInfo() {
        return {
            'X-ROCKET-LOCALE': LocaleHelper.getLocaleName(),
            'X-ROCKET-VERSION': DeviceHelper.getAppVersion(),
            'X-ROCKET-OS-VERSION': DeviceHelper.getOS(),
            'X-ROCKET-OS-TYPE': DeviceHelper.getOSVersion(),
        };
    }

    getAuthHeaders() {
        if (!this.sessionStore || !this.sessionStore.accessToken) {
            return {};
        }

        return {
            Authentication: 'Bearer ' + this.sessionStore.accessToken,
        };
    }

    show(id, params = {}) {
        return this.get(this.PATH + '/' + id, params);
    }

    store(params = {}) {
        return this.post(this.PATH, params);
    }

    update(id, params = {}) {
        return this.put(this.PATH + '/' + id, params);
    }

    destroy(id, params = {}) {
        return this.delete(this.PATH + '/' + id, params);
    }

    get(url, params = {}) {
        return this.request('GET', url, params);
    }

    post(url, params = {}) {
        return this.request('POST', url, params);
    }

    put(url, params = {}) {
        params['_method'] = 'put';
        return this.request('POST', url, params);
    }

    delete(url, params = {}) {
        params['_method'] = 'delete';
        return this.request('POST', url, params);
    }

    request(method, url, params = {}, additionalHeaders = {}) {
        let realUrl = this.BASE_URL + url;
        let formData = new FormData();

        const headers = new Headers();
        const authInfo = this.getAuthHeaderInfo();
        Object.keys(authInfo).forEach(function(key) {
            headers.append(key, authInfo[key]);
        });
        const clientInfo = this.getClientHeaderInfo();
        Object.keys(clientInfo).forEach(function(key) {
            headers.append(key, clientInfo[key]);
        });
        Object.keys(additionalHeaders).forEach(function(key) {
            headers.append(key, additionalHeaders[key]);
        });

        if (method === 'GET' || method === 'HEAD') {
            let query = Object.keys(params)
                .map(
                    k =>
                        encodeURIComponent(k) +
                        '=' +
                        encodeURIComponent(params[k])
                )
                .join('&');
            realUrl = realUrl + '?' + query;

            return fetch(realUrl, {
                credentials: 'same-origin',
                method: method,
                headers: headers,
            })
                .then(response => response.json())
                .catch(error => console.log('Error', error));
        }

        if (params instanceof FormData) {
            formData = param;
        } else {
            Object.keys(params).forEach(function(key) {
                formData.append(key, params[key]);
            });
        }

        return fetch(realUrl, {
            credentials: 'same-origin',
            method: method,
            body: formData,
            headers: headers,
        })
            .then(response => response.json())
            .catch(error => console.log('Error', error));
    }
}

export default BaseRepository;
