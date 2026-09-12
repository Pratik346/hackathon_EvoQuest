import { useState } from "react";
import { getAdvice } from "../../api/ai.api";
import AIAnalysis from "./AIAnalysis";
import RecommendationCard from "./RecommendationCard";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";
import EmptyState from "../common/EmptyState";

export default function AIAdvisor({ prompt = "" }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAdvice(prompt);

      setResult(res.data);
    } catch (e) {
      setError(
        e?.response?.data?.message ||
          e?.message ||
          "Unable to generate AI advice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {prompt && (
        <div className="rounded-lg border border-purple-700 bg-purple-950/30 p-3">
          <p className="text-xs uppercase tracking-wide text-purple-400">
            Selected prompt
          </p>

          <p className="mt-1 text-sm text-gray-200">
            {prompt}
          </p>
        </div>
      )}

      <Button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "✨ Analyze My Progress"}
      </Button>

      {loading && <LoadingSpinner />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={analyze}
        />
      )}

      {!loading && !error && result && (
        <>
          <AIAnalysis analysis={result.analysis} />

          <div className="grid gap-3 sm:grid-cols-2">
            {result.recommendations.map((rec, i) => (
              <RecommendationCard
                key={`${rec.title}-${i}`}
                recommendation={rec}
              />
            ))}
          </div>
        </>
      )}

      {!loading && !error && !result && (
        <EmptyState
          icon="🤖"
          title="No analysis yet"
          subtitle="Click above to get personalized quest recommendations."
        />
      )}
    </div>
  );
}