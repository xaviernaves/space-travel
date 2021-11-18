import React, { useEffect, useState } from "react";
import { CelestialBody, Destination, Shuttle } from "../utils/types";
import { API_URL } from "../utils/consts";
import Link from "next/link";
import Clock from "./Clock";
import * as s from "../styles/components/PlanetCardStyles";

interface Props {
	destination: Destination;
}

const Card = ({ destination }: Props) => {
	const [body, setBody] = useState<CelestialBody>();
	const [cheapestShuttle, setCheapestShuttle] = useState<Shuttle | undefined>();

	useEffect(() => {
		(async () => {
			setBody((await (await fetch(`${API_URL}/bodies?name=${destination.name}`)).json())[0]);
		})();

		if (destination.shuttles.length > 0) {
			setCheapestShuttle(
				destination.shuttles.reduce((prev, curr) =>
					Number(prev.basePrice) < Number(curr.basePrice) ? prev : curr
				)
			);
		}
	}, [destination]);

	const image = () => {
		if (!body) return;
		if (body.images.length > 0) {
			return <s.Image src={body.images[0]} alt={destination.name}></s.Image>;
		}
	};

	return (
		<Link href={`/trip/${destination.name.toLowerCase()}`}>
			<a>
				<s.PlanetCard>
					<s.Center>{image()}</s.Center>
					<s.Name>{destination.name}</s.Name>
					<s.Price>
						{cheapestShuttle && `From ${cheapestShuttle.basePrice}₿`}
					</s.Price>
					<s.EstimatedTime>
						{cheapestShuttle ? (
							<span>
								Estimated Time for Departure (ETD):{" "}
								<Clock
									deadline={cheapestShuttle.etd}
									to={cheapestShuttle.etd}
								/>
							</span>
						) : (
							<span>No departures</span>
						)}
					</s.EstimatedTime>
				</s.PlanetCard>
			</a>
		</Link>
	);
};

export default Card;
