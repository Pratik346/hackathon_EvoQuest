export default function LoadingSpinner({ fullScreen = false }) {
  const wrapper = fullScreen
    ? "min-h-screen flex items-center justify-center bg-black"
    : "flex items-center justify-center p-6";
  return (
    <div className={wrapper}>
      <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}