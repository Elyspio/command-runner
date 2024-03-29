import { Typography } from "@mui/material";
import React, { ReactChild } from "react";

export function Title(props: { children: ReactChild }) {
	return (
		<Typography style={{ fontSize: "120%" }} variant={"overline"}>
			{props.children}
		</Typography>
	);
}
