import styled from "@emotion/styled";

type ShuttleSelected = {
	selected: boolean;
	pointerEvents: number;
};
export const ShuttleWrap = styled.div<ShuttleSelected>`
	padding: 32px;
	margin: 32px 0;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid ${(props) => (props.selected ? "white" : "transparent")};
	pointer-events: ${(props) => (props.pointerEvents ? "all" : "none")};
	user-select: ${(props) => (props.pointerEvents ? "auto" : "none")};
	opacity: ${(props) => (props.pointerEvents ? "1" : ".5")};
	border-radius: 5px;
`;

export const ShuttleHeader = styled.div`
	display: flex;
`;

export const ShuttleInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	margin-left: 20px;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

export const ShuttleInfoLeft = styled.div`
	display: flex;
	flex-direction: column;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

export const ShuttleTitle = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ShuttleName = styled.h2`
	font-family: Orion;
	font-size: 1.5rem;
	letter-spacing: 0.1em;
	line-height: 1;
	margin: 0;
`;

export const ShuttlePrice = styled.h2`
	font-size: 1.5rem;
	line-height: 1;
	margin: 8px 0;
`;

export const ShuttleSeatsContainer = styled.div`
	@media (max-width: 1024px) {
		margin-top: 16px;
	}
`;

type ShuttleColor = {
	shuttleColor: string;
};
export const ShuttleSeats = styled.div<ShuttleColor>`
	width: fit-content;
	color: ${(props) => props.shuttleColor};
	border: 2px solid ${(props) => props.shuttleColor};
	padding: 8px 16px;

	@media (min-width: 1024px) {
		margin-left: 32px;
	}
`;

export const ShuttleTime = styled.div`
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

export const ShuttleLocationContainer = styled.div<{ desktop: boolean }>`
	display: ${(props) => (props.desktop ? "block" : "none")};

	@media (max-width: 1024px) {
		display: ${(props) => (props.desktop ? "none" : "block")};
		margin: 16px 0;
	}
`;
