// BackButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton() {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div className="back-button-container">
			<button className="back-button" onClick={goBack}>
				<span className="back-icon">&#8592;</span> Back
			</button>
		</div>
	);
}

export default BackButton;

