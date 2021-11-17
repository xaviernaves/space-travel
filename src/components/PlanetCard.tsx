import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { CelestialBody, Destination } from "../utils/types";
import { API_URL } from "../utils/consts";
import Link from "next/link";

const PlanetCard = styled.div`
	width: 100%;
	border-radius: 4px;
	padding: 24px;
	background-color: black;
`;

const Center = styled.div`
	display: flex;
	justify-content: center;
`;

const Image = styled.img`
	width: 100%;
`;

const Name = styled.span`
	display: block;
	font-family: Orion;
	font-size: 2rem;
	font-weight: bold;
	letter-spacing: 0.1em;
	margin-top: 24px;
`;

const Price = styled.p`
	font-weight: bold;
	font-size: 1.1rem;
	margin: 8px 0;
`;

interface Props {
	destination: Destination;
}

const Card = ({ destination }: Props) => {
	const [body, setBody] = useState<CelestialBody>();

	useEffect(() => {
		(async () => {
			setBody((await (await fetch(`${API_URL}/bodies?name=${destination.name}`)).json())[0]);
		})();
	}, [destination]);

	const image = () => {
		if (!body) return;
		if (body.images.length > 0) {
			return <Image src={body.images[0]} alt={destination.name}></Image>;
		}
	};

	return (
		<Link href={`/trip/${destination.name.toLowerCase()}`}>
			<a>
				<PlanetCard>
					<Center>{image()}</Center>
					<Name>{destination.name}</Name>
					<Price>From 12₿</Price>
				</PlanetCard>
			</a>
		</Link>
	);
};

export default Card;