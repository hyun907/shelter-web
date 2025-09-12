import { useEffect, useState } from "react";
import { fetchNearbyShelters } from "../services/shelter";
import type { NearbyShelterApiResponse } from "../schemas/shelter.schema";
import { extractAxiosErrorMessage } from "@/common/utils/http";

export function useNearbyShelters(
  position: google.maps.LatLngLiteral | null,
  options?: { baseUrl?: string }
) {
  const [data, setData] = useState<NearbyShelterApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!position) return;

    let aborted = false;
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    fetchNearbyShelters({
      userLat: position.lat,
      userLot: position.lng,
      baseUrl: options?.baseUrl,
      signal: controller.signal
    })
      .then(res => {
        if (aborted) return;
        setData(res);
      })
      .catch(err => {
        if (aborted) return;
        setError(extractAxiosErrorMessage(err));
      })
      .finally(() => {
        if (aborted) return;
        setLoading(false);
      });

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [position, options?.baseUrl]);

  return { data, loading, error } as const;
}
