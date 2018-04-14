// @flow
import * as React from "react";

import BaseText, {TextProps as BaseTextProps} from "./BaseText";

export type TextProps = {
    ...BaseTextProps,
};

class LabelText extends BaseText<TextProps> {

    static defaultProps = {
        ...BaseText,
    };
}

export default LabelText;
