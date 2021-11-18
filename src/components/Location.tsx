import styled from "@emotion/styled";
import React from "react";
import Image from "next/image";

const ShuttleLocation = styled.div`
	display: flex;
	align-items: center;
`;

const LocationName = styled.div`
	margin-left: 9px;
`;

type Props = {
	location: string;
};
const Location = ({ location }: Props) => {
	return (
		<ShuttleLocation>
			<Image src="/location.svg" width="20" height="20" alt="location" />
			<LocationName>{location}</LocationName>
		</ShuttleLocation>
	);
};

export default Location;
