import { AlertTriangle } from "lucide-react";

export default function ErrorFallback({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-red-400 ">
      <AlertTriangle className="w-16 h-16 mb-4 text-red-500" />
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-sm mb-4 max-w-md text-red-300">
        {error?.message ||
          "An unexpected error occurred. Please try again later."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
}
