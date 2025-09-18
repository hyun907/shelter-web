export interface RoutePathParams {
  startLat: number;
  startLot: number;
  goalLat: number;
  goalLot: number;
}

export interface RouteGuide {
  distance: number;
  duration: number;
  instructions: string;
  pointIndex: number;
  type: number;
}

export interface RouteOptimal {
  guide: RouteGuide[];
  path: [number, number][];
}

export interface RoutePathResponse {
  code: number;
  message: string;
  currentDateTime: string;
  route: {
    traoptimal: RouteOptimal[];
  };
}
