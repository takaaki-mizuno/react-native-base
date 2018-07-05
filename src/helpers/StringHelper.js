// @flow

class StringHelper {
    static includeJapanese(string) {
        return string.match(
            /[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]/
        );
    }
}

export default StringHelper;
