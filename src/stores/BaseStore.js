
class BaseStore {
    constructor(rootStore=null) {
        this.rootStore = rootStore;
        this.rehydrate = undefined;
    }

    registerRehydrate(rehydrate)
    {
        this.rehydrate = rehydrate;
    }

    getName()
    {
        return this.constructor.name;
    }
}

export default BaseStore;
