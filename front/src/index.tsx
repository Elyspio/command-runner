import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { connect, ConnectedProps, Provider } from "react-redux";
import store, { StoreState } from "./store";
import { StyledEngineProvider, Theme, ThemeProvider } from "@mui/material";
import { themes } from "./config/theme";
import { Application } from "./view/components/Application";
import { Provider as DiProvider } from "inversify-react";
import { container } from "./core/di";

declare global {
	interface Window {
		config: {
			endpoints: {
				core: string;
				authentication: string;
			};
		};
	}
}

declare module "@mui/styles/defaultTheme" {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme extends Theme {}
}

const mapStateToProps = (state: StoreState) => ({ theme: state.theme.current });

const connector = connect(mapStateToProps);
type ReduxTypes = ConnectedProps<typeof connector>;

function Wrapper(props: ReduxTypes) {
	const theme = props.theme === "dark" ? themes.dark : themes.light;

	return (
		<DiProvider container={container}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Application />
				</ThemeProvider>
			</StyledEngineProvider>
		</DiProvider>
	);
}

const ConnectedWrapper = connector(Wrapper) as any;

ReactDOM.render(
	<Provider store={store}>
		<ConnectedWrapper />
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about services workers: https://bit.ly/CRA-PWA
