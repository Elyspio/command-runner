import React from "react";
import {Modal, PropTypes, Theme, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ReactDOM from "react-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

export type createModal = { text: text, actions: actions, options?: options };

type text = {
    title: string,
    content: string,
}

type actions = {
    text: string
    role?: "ok" | "cancel"
    onClick: () => void
}[]

type options = {
    preventExit: boolean
}


const getModalStyle = {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


const MyModal = ({actions, options, text}: createModal) => {
    const [open, setOpen] = React.useState(true);
    const classes = useStyles();

    const createModalButton = ({role, text, onClick}: actions[number]) => {

        let color: PropTypes.Color = "default"

        let _onclick = onClick

        if (role === "ok") {
            color = "primary"
            _onclick = () => {
                setOpen(false);
                onClick();
            }
        }
        if (role === "cancel") {
            color = "secondary"
            _onclick = () => {
                setOpen(false);
                onClick();
            }
        }

        return <Button color={color} onClick={_onclick}>{text}</Button>
    }

    return <Modal open={open}>
        <div className={"modal " + classes.paper} style={getModalStyle}>
            <div className={"modal-title"}>
                <Typography>{text.title}</Typography>
            </div>

            <div className="modal-content">
                <Typography>{text.content}</Typography>
            </div>

            <div className="actions">
                {actions.map(createModalButton)}
            </div>
        </div>
    </Modal>
}
export const createPortalModal = (args: createModal) => {
    let elementById = document.getElementById("modal") as HTMLElement;
    ReactDOM.render(<MyModal {...args}/>, elementById)
}
