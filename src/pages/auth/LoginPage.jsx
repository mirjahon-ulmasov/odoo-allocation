import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "store/auth";
import { useTranslation } from "react-i18next";
import { NotificationManager } from "react-notifications";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	TextField,
} from "@mui/material";

export default function LoginPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState(localStorage.getItem("email") || "");
	const [showPassword, setShowPassword] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		if (email === "") NotificationManager.error("Invalid Email address");
		if (email === "" || password === "") return;
		const data = {
			email,
			password,
		};
		dispatch(login({ data, navigate }));
	};
	return (
		<div className="login">
			<h1>Please Log in</h1>
			<form onSubmit={submitHandler}>
				<TextField
					value={email}
					label="Email"
					sx={{ m: 1, width: "100%" }}
					variant="outlined"
					onChange={(e) => setEmail(e.target.value)} />
				<FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
					<InputLabel htmlFor="password">Password</InputLabel>
					<OutlinedInput
						id="password"
						value={password}
						label="Password"
						type={showPassword ? "text" : "password"}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword((prev) => !prev)}
									onMouseDown={(e) => e.preventDefault()}
									edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<Button type="submit" variant="contained">
					{t("buttons.logIn")}
				</Button>
			</form>
		</div>
	);
}
