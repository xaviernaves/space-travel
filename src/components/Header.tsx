import React, { ReactNode } from "react"
import Link from "next/link"
import styled from "@emotion/styled"

const NavContainer = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding-top: 32px;
`;

const HeaderText = styled.span`
	font-weight: 100;
	letter-spacing: 0.1em;
	font-size: 0.8rem;

	@media (min-width: 1024px) {
		font-size: 1rem;
	}
`;

const CompanyName = styled.div`
	font-family: Orion;
	font-weight: bold;
	font-size: 2.4rem;
	background: linear-gradient(90deg, #ffffff 0%, #fff3f0 40%, #ff3d00 70%);
	background-size: 100%;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;

	@media (min-width: 1024px) {
		font-size: 3.8rem;
	}
`;

const Header = () => (
	<NavContainer>
		<Link href="/">
			<a>
				<HeaderText>· SPACE TRAVELLING AGENCY ·</HeaderText>
				<CompanyName>EARTHFLY</CompanyName>
			</a>
		</Link>
	</NavContainer>
);

export default Header;
