import { GetServerSideProps, NextPage } from "next";
import { API_URL } from "../../utils/consts";
import { capitalize } from "../../utils/functions";
import { CelestialBody, Destination } from "../../utils/types";
import Head from "next/head";

const Trip: NextPage<{ destination: Destination, body: CelestialBody }> = ({ destination, body }) => {
	return <div>
		<Head>
			<title>EarthFly - {destination.name} Trip</title>
			<link rel="icon" href="../favicon.ico" />
		</Head>
		{destination.name}
	</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const name = context.query.name;
	if (typeof name == "string") {
		const destination = (await (await fetch(`${API_URL}/destinations?name=${capitalize(name)}`)).json())[0];
		const body = (await (await fetch(`${API_URL}/bodies?name=${capitalize(name)}`)).json())[0];
		return {
			props: {
				destination,
				body
			},
		};
	}

	return {
		props: {}
	}
};

export default Trip;
