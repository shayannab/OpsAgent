export default function SourceIllustrations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.07]">
      {/* Isometric Node Network */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="nodes" width="200" height="200" patternUnits="userSpaceOnUse">
            {/* Isometric connection lines */}
            <path d="M 100 0 L 200 50 L 200 150 L 100 200 L 0 150 L 0 50 Z"
              fill="none" stroke="#6366f1" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="200" stroke="#6366f1" strokeWidth="1" />
            <line x1="0" y1="50" x2="200" y2="150" stroke="#6366f1" strokeWidth="1" />
            <line x1="0" y1="150" x2="200" y2="50" stroke="#6366f1" strokeWidth="1" />

            {/* Node points */}
            <circle cx="100" cy="0" r="3" fill="#6366f1" />
            <circle cx="200" cy="50" r="3" fill="#6366f1" />
            <circle cx="0" cy="50" r="3" fill="#6366f1" />
            <circle cx="100" cy="200" r="3" fill="#6366f1" />
            <circle cx="200" cy="150" r="3" fill="#6366f1" />
            <circle cx="0" cy="150" r="3" fill="#6366f1" />
            <circle cx="100" cy="100" r="4" fill="#6366f1" className="animate-pulse" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nodes)" />
      </svg>
    </div>
  )
}
