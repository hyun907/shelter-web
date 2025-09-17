type Options = PositionOptions;

export function getCurrentPositionOnce(options?: Options) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      const error = new GeolocationPositionError();
      Object.defineProperty(error, "code", { value: 0 }); // UNKNOWN_ERROR
      Object.defineProperty(error, "message", { value: "Geolocation not supported" });
      reject(error);
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}
