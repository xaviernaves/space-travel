import React from "react"
import Link from "next/link"
import * as s from "../styles/components/Header"

const Header = () => (
	<s.NavContainer>
		<Link href="/">
			<a>
				<s.HeaderText>· SPACE TRAVELLING AGENCY ·</s.HeaderText>
				<s.CompanyName>EARTHFLY</s.CompanyName>
			</a>
		</Link>
	</s.NavContainer>
);

export default Header;
