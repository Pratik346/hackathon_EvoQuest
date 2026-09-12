export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="text-center p-6 text-red-400">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-2 px-4 py-1 rounded bg-red-600/20 border border-red-500">
          Retry
        </button>
      )}
    </div>
  );
}