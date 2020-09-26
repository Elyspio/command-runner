import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import "./Runner.scss"
import {Utils} from "../util/Utils";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from "@material-ui/core/Container";
import {Model} from "../../../core/model";
import {Helper} from "../../helper";
import {createModal} from "../../helper/modal";
import {Api} from "../../../core/api";


function Runner() {

    const [command, setCommand] = React.useState("");
    const [directory, setDirectory] = React.useState("/");

    const result = {
        value: Utils.Component.extract(React.useState("")),
        open: Utils.Component.extract(React.useState(false)),
        click: (e: React.MouseEvent) => {
            result.open.set(!result.open.get)
            e.stopPropagation()
        }
    }

    const error = {
        value: Utils.Component.extract(React.useState("")),
        open: Utils.Component.extract(React.useState(false)),
        click: (e: React.MouseEvent) => {
            error.open.set(!error.open.get)
            e.stopPropagation()
        }
    }

    React.useEffect(() => {
        if (!Model.Account.isAuthenticated()) {

            const text : createModal["text"] = {
                title: "Authentication error",
                content: "You need to be logged in to access this page"
            }

            let actions : createModal["actions"] = [{
                text: "Login on other page",
                onClick: Model.Account.goToLoginPage,
                role: "ok"
            }];


            Helper.Modal.createPortalModal({text, actions})
        }
    }, [])


    const run = React.useCallback(async () => {

        let resultValue = ""
        let errorValue = "";

        try {
            resultValue = await Api.Runner.run(command).then(x => x.text());
        } catch (e) {
            errorValue = e.message;
        }

        result.value.set(resultValue);
        if (resultValue) result.open.set(true);

        error.value.set(errorValue);
        if (errorValue) error.open.set(true);

    }, [command, error.open, error.value, result.open, result.value])

    return (
        <Container className={"Runner"}>
            <Box className="form">
                <TextField label="Command" value={command} onChange={e => setCommand(e.target.value)} variant="outlined"/>
                <TextField label="Working directory" value={directory} onChange={e => setDirectory(e.target.value)} variant="outlined"/>
                <Button color={"primary"} variant={"outlined"} onClick={run}>Run</Button>
            </Box>

            <Box className={"output"}>

                {result.value.get && <Accordion expanded={result.open.get} onClick={result.click} className={"result"}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={"title"}>Result</Typography>
					</AccordionSummary>
					<AccordionDetails>
                          <pre className={"content"}>
                              {result.value.get}
                          </pre>
					</AccordionDetails>
				</Accordion>}

                {error.value.get && <Accordion expanded={error.open.get} onClick={error.click} className={"error"}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon/>}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={"title"}>Error</Typography>
					</AccordionSummary>
					<AccordionDetails>
                          <pre className={"content"}>
                              {error.value.get}
                          </pre>
					</AccordionDetails>
				</Accordion>}

            </Box>
        </Container>
    );
}

export default Runner;
