import * as React from "react";
import {
    Container,
    Content,
} from "native-base";

import Header from "../../components/Header"
import Styles from "./Styles"

type Props = {
};

class Screen extends React.Component<Props> {

    getTitle() {
        return "";
    }

    getStyles() {
        return Styles;
    }

    getContent() {
        return (
            <Content>
            </Content>
        );
    }

    render() {
        return (
            <Container style={this.getStyles().container}>
                <Header title={this.getTitle()} {...this.props} />
                {this.getContent()}
            </Container>
        );
    }
}

export default Screen;
