import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useEffect } from "react";
import Clock from "../components/Clock";
import Location from "../components/Location";
import { usePurchaseContext } from "../context/PurchaseContext";
import { H2, Price, Separator } from "../styles/GenericStyles";
import Link from "next/link";
import * as s from "../styles/pages/PurchaseStyles";

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

			<s.Background></s.Background>
			<s.Container>
				<s.PurchaseWrapper>
					<s.PurchaseHeader>
						<H2 style={{ marginBottom: 24 }}>THE ADVENTURE STARS NOW</H2>
						<s.Thanks>Thank you for your purchase</s.Thanks>
					</s.PurchaseHeader>
					<Separator />
					<s.PurchaseInfo>
						<s.PurchaseInfoHeader>
							<s.RocketName>{shuttle.name}</s.RocketName>
							<s.TripInfo>
								<Location location={shuttle.launchpadLocation}></Location>
								<s.NextTrip>
									Next Trip: <Clock deadline={shuttle.etd} to={shuttle.etd} />
								</s.NextTrip>
							</s.TripInfo>
						</s.PurchaseInfoHeader>
						{inputs.extras[0] !== "" && (
							<s.PurchaseExtras>
								<s.ExtrasText>Extras</s.ExtrasText>
								<s.ExtrasList>
									{inputs.extras.map((extra, key) => (
										<s.Extra key={key}>{extra}</s.Extra>
									))}
								</s.ExtrasList>
							</s.PurchaseExtras>
						)}
						<Price>Total: {price}₿</Price>
					</s.PurchaseInfo>
					<Separator />
					<Link href="/" passHref>
						<s.ReturnHome>Return Home</s.ReturnHome>
					</Link>
				</s.PurchaseWrapper>
			</s.Container>
		</>
	);
};

export default Purchase;
