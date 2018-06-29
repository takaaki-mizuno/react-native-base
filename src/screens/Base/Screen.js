import * as React from "react";
import {View} from "react-native";

import autobind from "autobind-decorator";
import Header from "../../components/Header"
import Styles from "./Styles"

type Props = {};

import {
    Content,
    Container
} from "native-base";

class Screen extends React.Component<Props> {

    getTitle() {
        return "";
    }

    getTitleColor() {
        return "primary";
    }

    getStyles() {
        return Styles;
    }

    getContent() {
        return (
            <View>
            </View>
        );
    }

    getRightButtonIcons() {
        return [];
    }

    getLeftButtonIcons() {
        return [];
    }

    @autobind
    handleOnLeftButtonPress(index, icon) {

    }

    @autobind
    handleOnRightButtonPress(index, icon) {

    }

    getHasBackButton() {
        return false;
    }

    getHeader() {
        return (
            <Header
                title={this.getTitle()}
                titleColor={this.getTitleColor()}
                hasBackButton={this.getHasBackButton()}
                leftButtonIcons={this.getLeftButtonIcons()}
                rightButtonIcons={this.getRightButtonIcons()}
                onLeftButtonPress={(index, icon) => {
                    this.handleOnLeftButtonPress(index, icon)
                }}
                onRightButtonPress={(index, icon) => {
                    this.handleOnRightButtonPress(index, icon)
                }}
            />
        )
    }

    getFooter() {
        return null;
    }

    render() {
        const header = this.getHeader();
        const footer = this.getFooter();
        return (
            <Container style={this.getStyles().container}>
                {header}
                <Content>
                    {this.getContent()}
                </Content>
                {footer}
            </Container>
        );
    }
}

export default Screen;
