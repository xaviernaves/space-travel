import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { API_URL } from "../utils/consts";
import { LegacyRef, useRef, useState } from "react";
import { Destination } from "../utils/types";
import PlanetCard from "../components/PlanetCard";

const HeaderText = styled.span`
	font-weight: 100;
	letter-spacing: 0.1em;
	font-size: 0.8rem;

	@media (min-width: 1024px) {
		font-size: 1rem;
	}
`;

const HeroSection = styled.section`
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

const Astronaut1 = styled.img`
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

const Astronaut2 = styled.img`
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

const Headline = styled.h1`
	position: relative;
	opacity: 0.75;
	font-family: Orion;
	font-size: 4.7rem;
	font-weight: bold;
	background: linear-gradient(90deg, #ffffff 0%, #fff3f0 40%, #ff3d00 70%);
	background-size: 100%;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;

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

const ScrollDown = styled.div`
	position: relative;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Line = styled.div`
	width: 1px;
	height: 128px;
	margin-top: 16px;
	background-color: white;
`;

const PlanetsSection = styled.section`
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

const Home: NextPage<{ destinations: Destination[] }> = ({ destinations }) => {
	const planets: LegacyRef<HTMLDivElement> | undefined = useRef(null);

	return (
		<>
			<Head>
				<title>EarthFly - Space travelling agency</title>
				<link rel="icon" href="../favicon.ico" />
			</Head>

			<HeroSection>
				<Astronaut1 src="/img/imgLeft.png" alt="astronaut 1" />
				<Astronaut2 src="/img/imgRight.png" alt="astronaut 1" />

				<Headline>DISCOVER THE UNIVERSE</Headline>

				<ScrollDown onClick={() => planets.current?.scrollIntoView({ behavior: "smooth" })}>
					<HeaderText>Choose your trip</HeaderText>
					<Line />
				</ScrollDown>
			</HeroSection>

			<PlanetsSection ref={planets}>
				{destinations.map((value, key) => (
					<PlanetCard destination={value} key={key}></PlanetCard>
				))}
			</PlanetsSection>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const response = (await (await fetch(`${API_URL}/destinations`)).json());

	return {
		props: {
			destinations: response,
		},
	};
};

export default Home;
