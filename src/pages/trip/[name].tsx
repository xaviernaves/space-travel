import { GetServerSideProps, NextPage } from "next";
import { API_URL } from "../../utils/consts";
import { capitalize } from "../../utils/functions";
import { CelestialBody, Destination, Extra } from "../../utils/types";
import Head from "next/head";
import { useState } from "react";
import Shuttle from "../../components/Shuttles/Shuttle";
import * as s from "../../styles/pages/TripStyles";

type TripType = {
	destination: Destination;
	body: CelestialBody;
	extras: Extra[];
};

const Trip: NextPage<TripType> = ({ destination, body, extras }) => {
	const [selectedShuttle, selectShuttle] = useState<number | null>(null);

	return (
		<>
			<Head>
				<title>EarthFly - {destination.name} Trip</title>
				<link rel="icon" href="../favicon.ico" />
			</Head>

			<s.TripDescription>
				<s.ImageContainer>
					<s.TripImage background="/img/trip.png" />
				</s.ImageContainer>

				<s.DescriptionContainer>
					<s.PlanetTitle>{destination.name}</s.PlanetTitle>
					<s.PlanetDescription>{body.description}</s.PlanetDescription>
				</s.DescriptionContainer>
			</s.TripDescription>

			<s.TripHeaderText>
				<s.TripHeaderInner>CHOOSE YOUR TRIP</s.TripHeaderInner>
			</s.TripHeaderText>

			<s.ShuttlesContainer>
				{destination.shuttles.map((shuttle, key) => (
					<Shuttle
						selectShuttle={selectShuttle}
						selected={selectedShuttle === shuttle.id}
						shuttle={shuttle}
						key={key}
						extras={extras}
					/>
				))}
			</s.ShuttlesContainer>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const name = context.query.name;
	if (typeof name == "string") {
		const destination = (await (await fetch(`${API_URL}/destinations?name=${capitalize(name)}`)).json())[0];
		const body = (await (await fetch(`${API_URL}/bodies?name=${capitalize(name)}`)).json())[0];
		const extras = await (await fetch(`${API_URL}/extras`)).json();

		return {
			props: {
				destination,
				body,
				extras,
			},
		};
	}

	return {
		props: {},
	};
};

export default Trip;
