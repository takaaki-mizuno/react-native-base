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

    request(method, url, params = {}) {
        let realUrl = this.BASE_URL + url;
        let formData = new FormData();
        console.log('Base URL:' + this.BASE_URL);

        const headers = new Headers();
        const authInfo = this.getAuthHeaderInfo();
        Object.keys(authInfo).forEach(function(key) {
            headers.append(key, authInfo[key]);
        });
        const clientInfo = this.getClientHeaderInfo();
        Object.keys(clientInfo).forEach(function(key) {
            headers.append(key, clientInfo[key]);
        });

        console.log(headers);

        if (method === 'GET' || method === 'HEAD') {
            let query = Object.keys(params)
                .map(key => {
                    if (Array.isArray(params[key])) {
                        const queries = [];
                        for (const data of params[key]) {
                            queries.push(
                                encodeURIComponent(key) +
                                    '[]=' +
                                    encodeURIComponent(data)
                            );
                        }
                        return queries.join('&');
                    } else {
                        return (
                            encodeURIComponent(key) +
                            '=' +
                            encodeURIComponent(params[key])
                        );
                    }
                })
                .join('&');
            realUrl = realUrl + '?' + query;

            console.log('GET URL:' + realUrl);

            return fetch(realUrl, {
                credentials: 'same-origin',
                method: method,
                headers: headers,
            })
                .then(response => {
                    console.log(response);
                    return response.text();
                })
                .then(html => {
                    console.log(html);
                    const json = JSON.parse(html);
                    return new Promise(function(resolve) {
                        resolve(json);
                    });
                })
                .catch(error => console.log('Error', error));
        }

        if (params instanceof FormData) {
            formData = params;
        } else {
            Object.keys(params).forEach(key => {
                if (Array.isArray(params[key])) {
                    for (const data of params[key]) {
                        formData.append(key + '[]', data);
                    }
                } else {
                    formData.append(key, params[key]);
                }
            });
        }

        console.log(method + ' : URL:' + realUrl);
        console.log(formData);

        return fetch(realUrl, {
            credentials: 'same-origin',
            method: method,
            body: formData,
            headers: headers,
        })
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(html => {
                console.log(html);
                const json = JSON.parse(html);
                return new Promise(function(resolve) {
                    resolve(json);
                });
            })
            .catch(error => console.log('Error', error));
    }
}

export default BaseRepository;
