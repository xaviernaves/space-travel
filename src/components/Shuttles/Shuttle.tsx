import React, { Dispatch, ReactElement, SetStateAction } from "react";
import {
	Separator,
	CheckInputContainer,
	Check,
	CheckInput,
} from "../../styles/GenericStyles";
import { Extra, Shuttle } from "../../utils/types";
import Form from "./Form";
import Clock from "../Clock";
import Location from "../Location";
import * as s from "../../styles/components/Shuttles/Shuttle";

const getShuttleSeatColor = (available: number): string => {
	const colors = ["#FF535D", "#FF9559", "#FFC400", "#9BD0BE"];

	if (available > 20) return colors[3];
	if (available < 20 && available > 15) return colors[2];
	if (available < 15 && available > 10) return colors[1];
	return colors[0];
};

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
		<s.ShuttleWrap 
			pointerEvents={shuttle.availableSeats.length > 0 ? 1 : 0}
			selected={selected}
			onClick={() => selectShuttle(shuttle.id)}
		>
			<s.ShuttleHeader>
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

				<s.ShuttleInfo>
					<s.ShuttleInfoLeft>
						<s.ShuttleTitle>
							<s.ShuttleName>{shuttle.name}</s.ShuttleName>
							<s.ShuttlePrice>{shuttle.basePrice}₿</s.ShuttlePrice>
						</s.ShuttleTitle>

						<s.ShuttleSeatsContainer>
							<s.ShuttleSeats
								shuttleColor={getShuttleSeatColor(
									shuttle.availableSeats.length
								)}
							>
								{shuttle.availableSeats.length} seat
								{shuttle.availableSeats.length > 1 && "s"} left
							</s.ShuttleSeats>
						</s.ShuttleSeatsContainer>
					</s.ShuttleInfoLeft>

					<s.ShuttleLocationContainer desktop={true}>
						<Location location={shuttle.launchpadLocation}></Location>
					</s.ShuttleLocationContainer>
				</s.ShuttleInfo>
			</s.ShuttleHeader>

			<s.ShuttleTime>
				<span>
					Estimated Time for Departure (ETD):{" "}
					<Clock deadline={shuttle.etd} to={shuttle.etd} />
				</span>
				<span>
					Estimated Time for Arrival (ETA):{" "}
					<Clock deadline={shuttle.eta} to={shuttle.eta} />
				</span>
			</s.ShuttleTime>

			<s.ShuttleLocationContainer desktop={false}>
				<Location location={shuttle.launchpadLocation}></Location>
			</s.ShuttleLocationContainer>

			{selected && (
				<>
					<Separator />
					<Form shuttle={shuttle} extras={extras} />
				</>
			)}
		</s.ShuttleWrap>
	);
};

export default Shuttle;
