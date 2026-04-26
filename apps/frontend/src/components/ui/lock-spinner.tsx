export function LockSpinner() {
  return (
    <div className="inline-flex items-center justify-center">
      <style>{`
        @keyframes lock-open {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .lock-shackle {
          animation: lock-open 1.5s ease-in-out infinite;
        }
      `}</style>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <circle cx="12" cy="16" r="1"></circle>
        <g className="lock-shackle">
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </g>
      </svg>
    </div>
  );
}