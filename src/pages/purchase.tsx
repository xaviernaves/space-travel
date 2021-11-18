import styled from "@emotion/styled";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Clock from "../components/Clock";
import Location from "../components/Location";
import { usePurchaseContext } from "../context/PurchaseContext";
import { H2, Price, Separator } from "../styles/GenericStyles";
import Link from "next/link";

const Background = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 0;
	top: 0;
	left: 0;
	padding: 0 16px;
	width: 100%;
	height: 100%;
	min-height: 500px;
	background: url("/img/successful_purchase_bg.png") no-repeat center;
	background-size: cover;

	@media (min-width: 1024px) {
		min-height: 700px;
	}
`;

const Container = styled.div`
	margin: 50px 0;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	min-height: calc(100vh - 250px);

	@media (min-width: 1024px) {
		min-height: calc(100vh - 400px);
	}
`;

const PurchaseWrapper = styled.div`
	padding: 32px 24px;
	width: 100%;
	max-width: 900px;
	min-height: 200px;
	background-color: #0e0e0e;

	@media (min-width: 1024px) {
		padding: 64px;
	}
`;

const PurchaseHeader = styled.div`
	text-align: center;
`;

const Thanks = styled.p`
	font-size: 1.2rem;
	margin-bottom: 40px;

	@media (min-width: 1024px) {
		font-size: 1.5rem;
		font-weight: bold;
	}
`;

const PurchaseInfo = styled.div`
	display: flex;
	flex-direction: column;
`;

const PurchaseInfoHeader = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 16px;

	@media (min-width: 1024px) {
		flex-direction: row;
	}
`;

const RocketName = styled.h2`
	font-family: Orion;
	font-size: 1.5rem;
	letter-spacing: 0.1em;
	line-height: 1;
	margin: 0;
`;

const TripInfo = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
    font-size: 1.1rem;

	@media (max-width: 1024px) {
		margin: 16px 0;
	}
`;

const NextTrip = styled.span`
	@media (min-width: 1024px) {
		margin-left: 32px;
	}
`;

const PurchaseExtras = styled.div`
	display: flex;
	flex-direction: column;
`;

const ExtrasText = styled.p`
	font-size: 1.2rem;
	margin: 0;
	text-decoration: underline;
`;

const ExtrasList = styled.ul`
	padding-left: 20px;
	margin-top: 10px;
	margin-bottom: 16px;
`;

const Extra = styled.li`
	padding: 5px 0;
`;

const ReturnHome = styled.a`
    display: block;
    font-size: 1.1rem;
	color: white;
	margin-top: 40px;
	text-decoration: underline;
    
	@media (max-width: 1024px) {
        margin-top: 25px;
		text-align: center;
	}
`;

const Purchase: NextPage = () => {
	const router = useRouter();
	const {
		data: { inputs, price, shuttle },
	} = usePurchaseContext();

	useEffect(() => {
		if (!shuttle.name) router.push('/');
	});

	return (
		<>
			<Head>
				<title>EarthFly - Successful purchase</title>
				<link rel="icon" href="../favicon.ico" />
			</Head>

			<Background></Background>
			<Container>
				<PurchaseWrapper>
					<PurchaseHeader>
						<H2 style={{ marginBottom: 24 }}>THE ADVENTURE STARS NOW</H2>
						<Thanks>Thank you for your purchase</Thanks>
					</PurchaseHeader>
					<Separator />
					<PurchaseInfo>
						<PurchaseInfoHeader>
							<RocketName>{shuttle.name}</RocketName>
							<TripInfo>
								<Location location={shuttle.launchpadLocation}></Location>
								<NextTrip>
									Next Trip: <Clock deadline={shuttle.etd} to={shuttle.etd} />
								</NextTrip>
							</TripInfo>
						</PurchaseInfoHeader>
						{inputs.extras[0] !== "" && (
							<PurchaseExtras>
								<ExtrasText>Extras</ExtrasText>
								<ExtrasList>
									{inputs.extras.map((extra, key) => (
										<Extra key={key}>{extra}</Extra>
									))}
								</ExtrasList>
							</PurchaseExtras>
						)}
						<Price>Total: {price}₿</Price>
					</PurchaseInfo>
					<Separator />
					<Link href="/" passHref>
						<ReturnHome>Return Home</ReturnHome>
					</Link>
				</PurchaseWrapper>
			</Container>
		</>
	);
};

export default Purchase;
