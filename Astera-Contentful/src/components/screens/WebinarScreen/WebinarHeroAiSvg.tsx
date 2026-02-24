export default function WebinarHeroAiSvg() {
  return (
    <svg
      className="webinar-hero-ai-svg"
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Stacked blocks / data layers */}
      <g opacity="0.9">
        <path d="M280 200h80v60H280z" fill="rgba(255,255,255,0.08)" />
        <path d="M260 220h80v60H260z" fill="rgba(255,255,255,0.06)" />
        <path d="M240 240h80v60H240z" fill="rgba(255,255,255,0.04)" />
      </g>
      {/* Central A / Astera mark */}
      <text x="200" y="180" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="120" fontWeight="700" fontFamily="system-ui, sans-serif">
        A
      </text>
      {/* Nodes / tech circles */}
      <circle cx="120" cy="80" r="12" fill="rgba(142,187,255,0.5)" />
      <circle cx="320" cy="100" r="10" fill="rgba(142,187,255,0.4)" />
      <circle cx="80" cy="180" r="8" fill="rgba(142,187,255,0.35)" />
      <circle cx="340" cy="200" r="14" fill="rgba(142,187,255,0.3)" />
      <circle cx="160" cy="260" r="9" fill="rgba(142,187,255,0.4)" />
      <circle cx="280" cy="280" r="11" fill="rgba(142,187,255,0.35)" />
      {/* Connection lines (data flow) */}
      <path d="M120 80 L200 140 M320 100 L240 160 M80 180 L160 200" stroke="rgba(142,187,255,0.2)" strokeWidth="1.5" fill="none" />
      <path d="M340 200 L260 220 M160 260 L200 200 M280 280 L240 240" stroke="rgba(142,187,255,0.15)" strokeWidth="1" fill="none" />
      {/* Hexagon accents */}
      <path d="M360 60 L375 70 L375 90 L360 100 L345 90 L345 70 Z" fill="rgba(255,255,255,0.06)" />
      <path d="M50 260 L65 270 L65 290 L50 300 L35 290 L35 270 Z" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}
