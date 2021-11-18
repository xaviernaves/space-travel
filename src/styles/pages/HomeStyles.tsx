import styled from "@emotion/styled";
import { Gradient } from "../GenericStyles";

export const HeaderText = styled.span`
	font-weight: 100;
	letter-spacing: 0.1em;
	font-size: 0.8rem;

	@media (min-width: 1024px) {
		font-size: 1rem;
	}
`;

export const HeroSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: relative;
	padding: 30px 0;
	height: 100vh;
	min-height: 30em;

	@media (min-width: 1200px) {
		min-height: 50em;
	}

	@media (min-width: 1980px) {
		margin: 0px 182px;
		min-height: 60em;
	}
`;

export const Astronaut1 = styled.img`
	position: absolute;
	top: 0;
	left: 0;
	margin-top: 56px;
	width: 80px;
	height: 103px;

	@media (min-width: 1200px) {
		width: 256px;
		height: 329px;
	}

	@media (min-width: 1980px) {
		width: 346px;
		height: 445px;
	}
`;

export const Astronaut2 = styled.img`
	position: absolute;
	top: 96px;
	right: 0;
	margin-top: 56px;
	width: 167px;
	height: 215px;

	@media (min-width: 1200px) {
		top: 40px;
		width: 360px;
		height: 439px;
		margin-top: 96px;
	}

	@media (min-width: 1600px) {
		width: 439px;
		height: 536px;
	}

	@media (min-width: 1980px) {
		width: 495px;
		height: 604px;
	}

	@media (min-width: 2550px) {
		width: 566px;
		height: 729px;
	}
`;

export const Headline = styled.h1`
	position: relative;
	opacity: 0.75;
	font-family: Orion;
	font-size: 4.7rem;
	font-weight: bold;
	${Gradient}

	width: 100%;
	letter-spacing: 0.05em;
	margin-top: 24px;

	@media (min-width: 1024px) {
		font-size: 6.7rem;
		max-width: 802px;
	}

	@media (min-width: 1980px) {
		font-size: 8rem;
		max-width: 980px;
	}
`;

export const ScrollDown = styled.div`
	position: relative;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Line = styled.div`
	width: 1px;
	height: 128px;
	margin-top: 16px;
	background-color: white;
`;

export const PlanetsSection = styled.section`
	display: grid;
	grid-gap: 50px;
	padding: 50px 0;

	@media (min-width: 700px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1550px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 1980px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 2530px) {
		grid-template-columns: repeat(5, 1fr);
	}
`;