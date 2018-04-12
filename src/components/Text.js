// @flow
import * as React from "react";
import {Text as BaseText} from "react-native";

type TextProps = {
    color: string,
    children: string,
    align: "auto" | "left" | "right" | "center" | "justify",
    numberOfLines?: number
};

class Text extends React.PureComponent<TextProps> {

    static defaultProps = {
        type: "body",
        color: "#ffffff",
        align: "left"
    };

    render(): React.Node {
        const {children, numberOfLines, align: textAlign} = this.props;
        const color = (() => {
            return this.props.color;
        })();
        const computedStyle = [{ textAlign, color }];
        return <BaseText style={computedStyle} {...{numberOfLines}}>{children}</BaseText>;
    }
}

export default Text;
