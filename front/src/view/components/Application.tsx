import * as React from 'react';
import {Paper} from "@material-ui/core";
import "./Application.scss"
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {toggleTheme} from "../../store/module/theme/action";
import Appbar from "./appbar/Appbar";
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Runner from "./runner/Runner";
import {Drawer} from "./util/drawer/Drawer";
import {RootState} from "../../store";

const mapStateToProps = (state: RootState) => ({theme: state.theme.current})

const mapDispatchToProps = (dispatch: Dispatch) => ({toggleTheme: () => dispatch(toggleTheme())})

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

export interface Props {
}

interface State {
}

class Application extends React.Component<Props & ReduxTypes, State> {

    render() {

        return (
            <Paper square={true} className={"Application"}>
                <Drawer position={"right"} actions={[{onClick: this.props.toggleTheme, text: "Switch lights", icon: <Brightness5Icon/>}]}>
                    <div className="content">
                        <Appbar appName={"Runner"}/>
                        <Runner/>
                        <div id="modal"/>
                    </div>
                </Drawer>
            </Paper>
        );
    }
}

export default connector(Application)
