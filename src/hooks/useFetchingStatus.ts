import { useState } from "react";

function useFetchingStatus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return { loading, setLoading, error, setError };
}

export default useFetchingStatus;
