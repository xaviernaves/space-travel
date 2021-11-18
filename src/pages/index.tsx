import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { API_URL } from "../utils/consts";
import { LegacyRef, useRef } from "react";
import { Destination } from "../utils/types";
import PlanetCard from "../components/PlanetCard";
import * as s from "../styles/pages/HomeStyles";

const Home: NextPage<{ destinations: Destination[] }> = ({ destinations }) => {
	const planets: LegacyRef<HTMLDivElement> | undefined = useRef(null);

	return (
		<>
			<Head>
				<title>EarthFly - Space travelling agency</title>
				<link rel="icon" href="../favicon.ico" />
			</Head>

			<s.HeroSection>
				<s.Astronaut1 src="/img/imgLeft.png" alt="astronaut 1" />
				<s.Astronaut2 src="/img/imgRight.png" alt="astronaut 1" />

				<s.Headline>DISCOVER THE UNIVERSE</s.Headline>

				<s.ScrollDown onClick={() => planets.current?.scrollIntoView({ behavior: "smooth" })}>
					<s.HeaderText>Choose your trip</s.HeaderText>
					<s.Line />
				</s.ScrollDown>
			</s.HeroSection>

			<s.PlanetsSection ref={planets}>
				{destinations.map((value, key) => (
					<PlanetCard destination={value} key={key}></PlanetCard>
				))}
			</s.PlanetsSection>
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
