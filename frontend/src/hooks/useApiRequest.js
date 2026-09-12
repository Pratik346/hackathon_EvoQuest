import { useState, useCallback } from "react";

/**
 * Wraps any async API call with consistent loading/error/data state.
 * Usage: const { data, loading, error, run } = useApiRequest(getShopItems);
 *        useEffect(() => { run(); }, [run]);
 */
export function useApiRequest(requestFn) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError("");
      try {
        const res = await requestFn(...args);
        setData(res.data);
        return res.data;
      } catch (e) {
        setError(e.message || "Something went wrong.");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [requestFn]
  );

  return { data, setData, loading, error, run };
}