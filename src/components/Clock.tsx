import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

type Clocktime = {
	deadline: number;
};
const ColoredClock = styled.span<Clocktime>`
	color: ${(props) => (props.deadline < 300000 ? "#FF535D" : "#9BD0BE")};
`;

type Props = {
	deadline: number;
	to: number;
};
const Clock = ({ deadline, to }: Props) => {
	const timer = useRef(0);
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const leading0 = (num: number) => {
		return num < 10 ? "0" + num : num;
	};

	const getTimeUntil = (deadline: number) => {
		const time = deadline - Date.now();

		if (time < 0) {
			setDays(0);
			setHours(0);
			setMinutes(0);
			setSeconds(0);
		} else {
			setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
			setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
			setMinutes(Math.floor((time / 1000 / 60) % 60));
			setSeconds(Math.floor((time / 1000) % 60));
		}
	};

	useEffect(() => {
		const date = new Date();
		timer.current = date.setSeconds(date.getSeconds() + deadline);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		setInterval(() => getTimeUntil(timer.current), 1000);

		return () => getTimeUntil(timer.current);
	}, [deadline]);

	return (
		<ColoredClock deadline={to}>
			{leading0(days)}d {leading0(hours)}h {leading0(minutes)}m{" "}
			{leading0(seconds)}s
		</ColoredClock>
	);
};

export default Clock;
