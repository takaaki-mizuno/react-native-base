// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import {Text} from "react-native";

export type TextProps = {
    color: string,
    children: string,
    align: "auto" | "left" | "right" | "center" | "justify",
    numberOfLines?: number,
    size: number,
    width?: number,
    height?: number,
    style: any,
    fontFamily: string,
};

class BaseText extends React.PureComponent<TextProps> {

    static defaultProps = {
        color: "#ffffff",
        align: "left",
        size: 14,
        fontFamily: "Cochin",
    };

    computeStyle() {
        const {align: textAlign, size: fontSize, fontFamily} = this.props;
        const color = (() => {
            return this.props.color;
        })();
        return StyleSheet.create({
            text: {
                ...{textAlign, fontSize, color, fontFamily}
            },
        });
    }

    render(): React.Node {
        const {style, numberOfLines, children} = this.props;
        const computedStyle = this.computeStyle();
        return <Text style={[style, computedStyle.text]} {...{numberOfLines}}>{children}</Text>;
    }
}

export default BaseText;
