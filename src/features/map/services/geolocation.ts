type Options = PositionOptions;

export function getCurrentPositionOnce(options?: Options) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      const error = new GeolocationPositionError();
      error.code = 0; // UNKNOWN_ERROR
      error.message = "Geolocation not supported";
      reject(error);
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
