import "../styles/globals.css";
import type { AppProps } from "next/app";
import styled from "@emotion/styled";
import Header from "../components/Header";

const Wrapper = styled.div`
	height: 100%;
	min-height: 100vh;
	color: white;
	background-color: #0e0e0e;
	padding: 0px 16px;

	@media (min-width: 1200px) {
		padding: 0px 182px;
	}
`;

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Wrapper>
			<Header/>
			<Component {...pageProps} />
		</Wrapper>
	);
}

export default App;
