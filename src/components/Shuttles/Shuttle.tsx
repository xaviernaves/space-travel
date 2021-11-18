import styled from "@emotion/styled";
import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
	Separator,
	CheckInputContainer,
	Check,
	CheckInput,
} from "../../styles/GenericStyles";
import { Extra, Shuttle } from "../../utils/types";
import Form from "./Form";
import Image from "next/image";
import Clock from "../Clock";
import Location from "../Location";

type ShuttleSelected = {
	selected: boolean;
	pointerEvents: number;
};
const ShuttleWrap = styled.div<ShuttleSelected>`
	padding: 32px;
	margin: 32px 0;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid ${(props) => (props.selected ? "white" : "transparent")};
	pointer-events: ${(props) => (props.pointerEvents ? "all" : "none")};
	user-select: ${(props) => (props.pointerEvents ? "auto" : "none")};
	opacity: ${(props) => (props.pointerEvents ? "1" : ".5")};
	border-radius: 5px;
`;

const ShuttleHeader = styled.div`
	display: flex;
`;

const ShuttleInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	margin-left: 20px;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

const ShuttleInfoLeft = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

const ShuttleTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

const ShuttleName = styled.h2`
	font-family: Orion;
	font-size: 1.5rem;
	letter-spacing: 0.1em;
	line-height: 1;
	margin: 0;
`;

const ShuttlePrice = styled.h2`
	font-size: 1.5rem;
	line-height: 1;
	margin: 8px 0;
`;

const ShuttleSeatsContainer = styled.div`
	@media (max-width: 1024px) {
		margin-top: 16px;
	}
`;

type ShuttleColor = {
	shuttleColor: string;
};
const getShuttleSeatColor = (available: number): string => {
	const colors = ["#FF535D", "#FF9559", "#FFC400", "#9BD0BE"];

	if (available > 20) return colors[3];
	if (available < 20 && available > 15) return colors[2];
	if (available < 15 && available > 10) return colors[1];
	return colors[0];
};

const ShuttleSeats = styled.div<ShuttleColor>`
	width: fit-content;
	color: ${(props) => props.shuttleColor};
	border: 2px solid ${(props) => props.shuttleColor};
	padding: 8px 16px;

	@media (min-width: 1024px) {
		margin-left: 32px;
	}
`;

const ShuttleTime = styled.div`
	margin-top: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	@media (min-width: 1024px) {
		flex-direction: row;
	}

	@media (max-width: 1024px) {
		& > span:first-of-type {
			margin-bottom: 8px;
		}
	}
`;

const ShuttleLocationContainer = styled.div<{ desktop: boolean }>`
	display: ${(props) => (props.desktop ? "block" : "none")};

	@media (max-width: 1024px) {
		display: ${(props) => (props.desktop ? "none" : "block")};
		margin: 16px 0;
	}
`;

interface Props {
	shuttle: Shuttle;
	selectShuttle: Dispatch<SetStateAction<number | null>>;
	selected: boolean;
	extras: Extra[];
}

const Shuttle = ({
	shuttle,
	selectShuttle,
	selected,
	extras,
}: Props): ReactElement => {
	return (
		<ShuttleWrap
			pointerEvents={shuttle.availableSeats.length > 0 ? 1 : 0}
			selected={selected}
			onClick={() => selectShuttle(shuttle.id)}
		>
			<ShuttleHeader>
				<CheckInputContainer type="radio">
					<CheckInput
						type="radio"
						name="shuttle"
						value={shuttle.id}
						checked={selected}
						onChange={() => selectShuttle(shuttle.id)}
					></CheckInput>
					<Check></Check>
				</CheckInputContainer>

				<ShuttleInfo>
					<ShuttleInfoLeft>
						<ShuttleTitle>
							<ShuttleName>{shuttle.name}</ShuttleName>
							<ShuttlePrice>{shuttle.basePrice}₿</ShuttlePrice>
						</ShuttleTitle>

						<ShuttleSeatsContainer>
							<ShuttleSeats
								shuttleColor={getShuttleSeatColor(
									shuttle.availableSeats.length
								)}
							>
								{shuttle.availableSeats.length} seat
								{shuttle.availableSeats.length > 1 && "s"} left
							</ShuttleSeats>
						</ShuttleSeatsContainer>
					</ShuttleInfoLeft>

					<ShuttleLocationContainer desktop={true}>
						<Location location={shuttle.launchpadLocation}></Location>
					</ShuttleLocationContainer>
				</ShuttleInfo>
			</ShuttleHeader>

			<ShuttleTime>
				<span>
					Estimated Time for Departure (ETD):{" "}
					<Clock deadline={shuttle.etd} to={shuttle.etd} />
				</span>
				<span>
					Estimated Time for Arrival (ETA):{" "}
					<Clock deadline={shuttle.eta} to={shuttle.eta} />
				</span>
			</ShuttleTime>

			<ShuttleLocationContainer desktop={false}>
				<Location location={shuttle.launchpadLocation}></Location>
			</ShuttleLocationContainer>

			{selected && (
				<>
					<Separator />
					<Form shuttle={shuttle} extras={extras} />
				</>
			)}
		</ShuttleWrap>
	);
};

export default Shuttle;
