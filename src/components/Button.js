// @flow
import * as React from "react";
import {StyleSheet, TouchableOpacity, TouchableNativeFeedback, View} from "react-native";

import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text as SVGText,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

import Text from "./Text";
import DeviceHelper from "../helpers/DeviceHelper";

type ButtonProps = {
    onPress: () => mixed,
    label?: string,
    disabled?: boolean,
    width: number,
    height: number,
};

class Button extends React.PureComponent<ButtonProps> {

    static defaultProps = {
        width: DeviceHelper.getScreenWidth(),
        height: 80,
    };

    render(): React.Node {
        const {
            onPress, label, disabled, width, height
        } = this.props;
        const opacity = disabled ? 0.5 : 1;
        let Btn: React.ComponentType<*>;
        if (disabled) {
            Btn = View;
        } else if (DeviceHelper.isIOS()) {
            Btn = TouchableOpacity;
        } else {
            Btn = TouchableNativeFeedback;
        }
        return (
            <Btn {...{onPress}}>
                <Svg
                    {...{width, height}}
                >
                    <Defs>
                        <Rect id="path-1" x={4} y={4} width={width-20} height={height-20} rx={22}/>
                    </Defs>
                    <G id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <G id="Button" transform="translate(8.000000, 8.000000)">
                            <G id="Rectangle-390">
                                <Use fill="#5D70F1" fillRule="evenodd" href="#path-1"/>
                                <Rect strokeOpacity={0.2} stroke="#5D70F1" strokeWidth={8} x={0} y={0} width={width-12} height={height-12} rx={26}/>
                            </G>
                        </G>
                    </G>
                </Svg>
            </Btn>
        );
    }
}

export default Button;
