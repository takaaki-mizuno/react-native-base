// @flow
import * as React from "react";
import {StyleSheet} from "react-native";
import BaseIcon  from 'react-native-vector-icons/SimpleLineIcons';
export type IconProps = {
    name: string,
    size: number,
    justifyContent: string,
    alignItems: "auto" | "left" | "right" | "center" | "justify",
    style: any,
};

class Icon extends React.PureComponent<IconProps> {

    static defaultProps = {
        color: "#000000",
        size: 32,
        justifyContent: 'center',
        alignItems: 'center',
    };

    computeStyle() {
        const {
            justifyContent,
            alignItems
        } = this.props;
        return StyleSheet.create({
            icon: {
                justifyContent,
                alignItems,
            },
        });
    }

    render(): React.Node {
        const {style, color, size, name} = this.props;
        const computedStyle = this.computeStyle();
        return <BaseIcon style={[style, computedStyle.icon]} {...{color, size, name}}/>
    }
}

export default Icon;
