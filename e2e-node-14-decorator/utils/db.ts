 class DB {
    /**
     * Keep all data in the store
     */
    private dictionary = {};

    /**
     * Method to Get the value from the store as per given key
     * @param key
     */
    public get(key: any) {
        return this.dictionary[key];
    }

    /**
     * Method to set the value as per the given key.
     * @param key
     * @param data
     */
    public set(key: any, data: any) {
        this.dictionary[key] = data;
    }

    /**
     * Provide an iterator for each value in store
     * @param callback
     */
    public each(callback: (value: any, key: any) => any) {
        for (const key in this.dictionary) {
            if (Object.prototype.hasOwnProperty.call(this.dictionary,key)) {
                callback(this.dictionary[key], key);
            }
        }
    }

    /**
     * Remove the values from the store for given key
     * @param key
     */
    public remove(key: any) {
        delete this.dictionary[key];
    }

    /**
     * Clear the dictionary
     */
    public removeAll() {
        this.dictionary = {};
    }
}

export default new DB();
