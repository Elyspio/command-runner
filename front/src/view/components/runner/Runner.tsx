import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./Runner.scss";
import { extract } from "../../hooks/Utils";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RunnerService } from "../../../core/services/runner.service";
import { useInjection } from "inversify-react";
import { DiKeysService } from "../../../core/di/di.keys.service";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { login } from "../../../store/module/authentication/authentication.action";
import { useAppDispatch } from "../../../store";
import { Chip, Divider, Paper } from "@mui/material";

function Runner() {
	const [command, setCommand] = React.useState("");
	const [directory, setDirectory] = React.useState("/");

	const services = {
		runner: useInjection<RunnerService>(DiKeysService.core.runner),
		authentication: useInjection<AuthenticationService>(DiKeysService.authentication),
	};

	const result = {
		value: extract(React.useState("")),
		open: extract(React.useState(false)),
		duration: extract(React.useState(0)),
		click: (e: React.MouseEvent) => {
			result.open.set(!result.open.get);
			e.stopPropagation();
		},
		loading: extract(React.useState(false)),
	};

	const error = {
		value: extract(React.useState("")),
		open: extract(React.useState(false)),
		click: (e: React.MouseEvent) => {
			error.open.set(!error.open.get);
			e.stopPropagation();
		},
	};

	const dispatch = useAppDispatch();

	const run = React.useCallback(async () => {
		if (!(await services.authentication.isLogged())) {
			dispatch(login());
		}
		result.loading.set(true);
		let { data: resultValue, duration } = await services.runner.run({ command, cwd: directory });
		result.loading.set(false);

		error.value.set(resultValue.stderr ?? "");
		result.value.set(resultValue.stdout ?? "");

		error.open.set(!!resultValue.stderr);
		result.open.set(!!resultValue.stdout);

		result.duration.set(duration);
	}, [result.loading, command, directory, error.open, error.value, result.open, result.value, services.runner, dispatch, services.authentication, result.duration]);

	return (
		<Paper className={"Runner"} sx={{ margin: 4 }}>
			<Box className="form">
				<TextField label="Command" fullWidth value={command} onChange={(e) => setCommand(e.target.value)} variant="outlined" />
				<TextField label="Working directory" fullWidth value={directory} onChange={(e) => setDirectory(e.target.value)} variant="outlined" />
				<Button color={"primary"} variant={"outlined"} onClick={run} disabled={result.loading.get}>
					Run
				</Button>
			</Box>

			<Box className={"output"} sx={{}}>
				{result.value.get && (
					<Accordion expanded={result.open.get} className={"result"} sx={{ bgcolor: "background.default" }}>
						<AccordionSummary onClick={result.click} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography variant={"overline"} sx={{ display: "flex", alignItems: "center" }}>
								stdout <Chip sx={{ marginLeft: 1 }} label={`${(result.duration.get / 1000).toFixed(2)}s`} />
							</Typography>
						</AccordionSummary>
						<Divider />
						<AccordionDetails>
							<pre className={"content"}>{result.value.get}</pre>
						</AccordionDetails>
					</Accordion>
				)}

				{error.value.get && (
					<Accordion expanded={error.open.get} className={"error"} sx={{ bgcolor: "background.default" }}>
						<AccordionSummary onClick={error.click} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
							<Typography variant={"overline"}>stderr</Typography>
						</AccordionSummary>
						<Divider />
						<AccordionDetails>
							<pre className={"content"}>{error.value.get}</pre>
						</AccordionDetails>
					</Accordion>
				)}
			</Box>
		</Paper>
	);
}

export default Runner;
