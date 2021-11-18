export interface Destination {
	id: number;
	name: string;
	routeStatus: {
		isOperational: boolean;
		nonOperationalReason: string | null;
	};
	shuttles: Shuttle[];
}

export interface CelestialBody {
	id: number;
	name: string;
	type: string;
	parent: string;
	description: string;
	images: string[];
}

export interface Shuttle {
	id: number;
	name: string;
	capacity: number;
	launchpadLocation: string;
	basePrice: string;
	discount: number;
	etd: number; // Estimated Time for Departure
	eta: number; // Estimated Time for Arrival
	availableSeats: string[];
}

export interface Extra {
	id: number;
	name: string;
	price: string;
}
