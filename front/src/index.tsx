import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {connect, ConnectedProps, Provider} from "react-redux";
import store, {RootState} from "./store";
import Application from "./view/components/Application";
import {ThemeProvider} from '@material-ui/core';
import {themes} from "./config/theme";


const mapStateToProps = (state: RootState) => ({theme: state.theme.current})


const connector = connect(mapStateToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

class Wrapper extends Component<ReduxTypes> {
    render() {
        const theme = this.props.theme === "dark" ? themes.dark : themes.light;

        return (
            <ThemeProvider theme={theme}>
                <Application/>
            </ThemeProvider>
        );
    }
}

const ConnectedWrapper = connector(Wrapper) as any;

ReactDOM.render(
    <Provider store={store}>
        <ConnectedWrapper/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: https://bit.ly/CRA-PWA
