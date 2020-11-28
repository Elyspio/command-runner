import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import "./Runner.scss"
import {extract} from "../util/Utils";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from "@material-ui/core/Container";
import {Apis} from "../../../core/apis";
import {Services} from "../../../core/services";


function Runner() {

    const [command, setCommand] = React.useState("");
    const [directory, setDirectory] = React.useState("/");

    const result = {
        value: extract(React.useState("")),
        open: extract(React.useState(false)),
        click: (e: React.MouseEvent) => {
            result.open.set(!result.open.get)
            e.stopPropagation()
        }
    }

    const error = {
        value: extract(React.useState("")),
        open: extract(React.useState(false)),
        click: (e: React.MouseEvent) => {
            error.open.set(!error.open.get)
            e.stopPropagation()
        }
    }


    const run = React.useCallback(async () => {

        let {data: resultValue} = await Services.runner.run({command, cwd: directory});

        if (resultValue?.error) {
            result.open.set(false);
            error.open.set(true);
            error.value.set(resultValue?.stderr)
            result.value.set("")
        }
        if (resultValue?.stdout) {
            error.open.set(false);
            result.open.set(true);
            error.value.set("")
            result.value.set(resultValue?.stdout)
        }

    }, [command, directory, error.open, error.value, result.open, result.value])

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
