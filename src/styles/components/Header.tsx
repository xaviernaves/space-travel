import styled from "@emotion/styled";
import { Gradient } from "../GenericStyles";

export const NavContainer = styled.div`
	display: flex;
	position: relative;
	z-index: 9999;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding-top: 32px;
`;

export const HeaderText = styled.span`
	font-weight: 100;
	letter-spacing: 0.1em;
	font-size: 0.8rem;

	@media (min-width: 1024px) {
		font-size: 1rem;
	}
`;

export const CompanyName = styled.div`
	font-family: Orion;
	font-weight: bold;
	font-size: 2.4rem;
	${Gradient}
	
	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}
`;