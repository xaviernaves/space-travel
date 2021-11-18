import { GetServerSideProps, NextPage } from "next";
import { API_URL } from "../../utils/consts";
import { capitalize } from "../../utils/functions";
import { CelestialBody, Destination, Extra } from "../../utils/types";
import Head from "next/head";
import styled from "@emotion/styled";
import { useState } from "react";
import Shuttle from "../../components/Shuttles/Shuttle";
import { Gradient } from "../../styles/GenericStyles";

const TripDescription = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px 0;
	padding-top: 56px;

	@media (min-width: 1024px) {
		flex-direction: row;
		padding-top: 96px;
	}
`;

const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 32px;

	@media (min-width: 1024px) {
		width: 50%;
	}
`;

type TripImageProps = {
	background: string;
};
const TripImage = styled.div<TripImageProps>`
	width: 100%;
	height: 221px;
	background: url("${(props) => props.background}") no-repeat top center;
	background-size: cover;
	transition: all 0.5s ease;

	@media (min-width: 600px) {
		height: 340px;
	}

	@media (min-width: 1024px) {
		width: 380px;
		height: 500px;
	}

	@media (min-width: 1500px) {
		width: 441px;
		height: 568px;
	}

	@media (min-width: 1980px) {
		width: 65%;
		max-width: 650px;
		height: 800px;
	}
`;

const DescriptionContainer = styled.div`
	width: 100%;

	@media (min-width: 1024px) {
		width: 50%;
	}

	@media (min-width: 1980px) {
		width: 40%;
	}
`;

const PlanetTitle = styled.div`
	width: fit-content;
	font-family: Orion;
	font-weight: bold;
	font-size: 3rem;
	${Gradient}

	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}
`;

const PlanetDescription = styled.p`
	font-size: 0.8rem;
	margin-top: 24px;

	@media (min-width: 1024px) {
		font-size: 1rem;
		margin-top: 48px;
	}
`;

const TripHeaderText = styled.h2`
	display: flex;
	flex-direction: row;
	text-align: center;
	width: 100%;
	font-family: Orion;
	font-weight: bold;
	font-size: 2.4rem;
	${Gradient}
	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}

	&:before,
	&:after {
		content: "";
		flex: 1 1;
		border-bottom: 1px solid;
		margin: auto;
	}
	&:before {
		margin-right: 24px;
	}
	&:after {
		margin-left: 24px;
	}
`;

const TripHeaderInner = styled.span`
	max-width: 50%;
`;

const ShuttlesContainer = styled.div`
	padding: 32px 0;
`;

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

			<TripDescription>
				<ImageContainer>
					<TripImage background="/img/trip.png" />
				</ImageContainer>

				<DescriptionContainer>
					<PlanetTitle>{destination.name}</PlanetTitle>
					<PlanetDescription>{body.description}</PlanetDescription>
				</DescriptionContainer>
			</TripDescription>

			<TripHeaderText>
				<TripHeaderInner>CHOOSE YOUR TRIP</TripHeaderInner>
			</TripHeaderText>

			<ShuttlesContainer>
				{destination.shuttles.map((shuttle, key) => (
					<Shuttle
						selectShuttle={selectShuttle}
						selected={selectedShuttle === shuttle.id}
						shuttle={shuttle}
						key={key}
						extras={extras}
					/>
				))}
			</ShuttlesContainer>
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
