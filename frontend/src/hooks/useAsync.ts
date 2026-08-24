import { useEffect, useState } from "react";
import type { ApiState } from "../services/api";

export function useAsync<T>(loader: () => Promise<T>, fallback: T): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: fallback, loading: true, error: null });

  useEffect(() => {
    let active = true;
    loader()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (active) setState({ data: fallback, loading: false, error: "Content unavailable" });
      });

    return () => {
      active = false;
    };
  }, [loader, fallback]);

  return state;
}
