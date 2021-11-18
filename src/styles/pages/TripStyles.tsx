import styled from "@emotion/styled";
import { Gradient } from "../GenericStyles";

export const TripDescription = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px 0;
	padding-top: 56px;

	@media (min-width: 1024px) {
		flex-direction: row;
		padding-top: 96px;
	}
`;

export const ImageContainer = styled.div`
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
export const TripImage = styled.div<TripImageProps>`
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

export const DescriptionContainer = styled.div`
	width: 100%;

	@media (min-width: 1024px) {
		width: 50%;
	}

	@media (min-width: 1980px) {
		width: 40%;
	}
`;

export const PlanetTitle = styled.div`
	width: fit-content;
	font-family: Orion;
	font-weight: bold;
	font-size: 3rem;
	${Gradient}

	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}
`;

export const PlanetDescription = styled.p`
	font-size: 0.8rem;
	margin-top: 24px;

	@media (min-width: 1024px) {
		font-size: 1rem;
		margin-top: 48px;
	}
`;

export const TripHeaderText = styled.h2`
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

export const TripHeaderInner = styled.span`
	max-width: 50%;
`;

export const ShuttlesContainer = styled.div`
	padding: 32px 0;
`;
