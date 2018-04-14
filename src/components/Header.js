// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {
    Header as BaseHeader,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
} from "native-base";
import {inject} from "mobx-react";
import {config} from "../helpers";
import NavigationHelper from "../helpers/NavigationHelper"

@inject('navigation')
class Header extends React.Component {

    @autobind
    handlePressDrawerMenuButton() {
        const {navigation} = this.props;
        NavigationHelper.openDrawer(navigation)
    }

    getLeftButton()
    {
        if( config('navigation.type', 'drawer') === 'drawer' ){
            return (
                <Button transparent title="" onPress={this.handlePressDrawerMenuButton}>
                    <Icon
                        name="menu"
                    />
                </Button>
            )
        }else{
            return ("");
        }
    }

    render() {
        const leftButton = this.getLeftButton();
        return (
            <BaseHeader>
                <Left>
                    {leftButton}
                </Left>
                <Body>
                <Title>{this.props.title}</Title>
                </Body>
                <Right/>
            </BaseHeader>
        );
    }
}

export default Header;
