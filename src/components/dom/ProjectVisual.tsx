import { memo } from "react";

export type VisualKind =
  | "chat"
  | "tokens"
  | "dashboard"
  | "map"
  | "schedule"
  | "queue"
  | "chart"
  | "bot"
  | "vote";

type Props = { kind: VisualKind; accent: string; label: string; className?: string };

const W = 320;
const H = 180;

/**
 * A lightweight, image-free preview: a small neon wireframe of the kind of
 * interface the project is. Pure SVG, so it is crisp at any size, costs no
 * network requests and never shows a broken image.
 */
const ProjectVisual = ({ kind, accent, label, className = "" }: Props) => {
  const a = accent;
  const dim = `${accent}33`;
  const faint = `${accent}1a`;
  const line = "#ffffff14";

  const body = (() => {
    switch (kind) {
      case "chat":
        return (
          <g>
            <rect x="12" y="34" width="70" height="134" rx="4" fill={faint} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <circle cx="26" cy={50 + i * 24} r="6" fill={i === 1 ? a : dim} />
                <rect x="38" y={46 + i * 24} width={34 - (i % 2) * 8} height="4" rx="2" fill={dim} />
                <rect x="38" y={53 + i * 24} width="22" height="3" rx="1.5" fill={line} />
              </g>
            ))}
            <rect x="94" y="44" width="110" height="20" rx="8" fill={dim} />
            <rect x="170" y="72" width="136" height="20" rx="8" fill={a} opacity="0.75" />
            <rect x="94" y="100" width="86" height="20" rx="8" fill={dim} />
            <rect x="200" y="128" width="106" height="14" rx="7" fill={a} opacity="0.45" />
            <rect x="94" y="150" width="212" height="18" rx="9" fill="none" stroke={dim} />
            <circle cx="296" cy="159" r="5" fill={a} />
          </g>
        );
      case "tokens":
        return (
          <g>
            {[1, 0.75, 0.5, 0.3, 0.15].map((o, i) => (
              <rect key={i} x={14 + i * 30} y="38" width="24" height="24" rx="5" fill={a} opacity={o} />
            ))}
            {["#00ffff", "#ff00ff", "#ffffff"].map((c, i) => (
              <rect key={c} x={14 + (i + 5) * 30} y="38" width="24" height="24" rx="5" fill={c} opacity="0.35" />
            ))}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={14 + i * 100} y="74" width="92" height="44" rx="6" fill={faint} stroke={dim} />
                <rect x={22 + i * 100} y="82" width="30" height="4" rx="2" fill={dim} />
                <rect x={22 + i * 100} y="94" width={44 - i * 6} height="10" rx="2" fill={a} opacity="0.8" />
              </g>
            ))}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x="14" y={128 + i * 14} width="292" height="10" rx="2" fill={i === 0 ? dim : faint} />
                <rect x="260" y={130 + i * 14} width="34" height="6" rx="3" fill={a} opacity={0.3 + i * 0.2} />
              </g>
            ))}
          </g>
        );
      case "dashboard":
        return (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={14 + i * 74} y="36" width="66" height="34" rx="5" fill={faint} stroke={dim} />
                <rect x={21 + i * 74} y="43" width="24" height="4" rx="2" fill={dim} />
                <rect x={21 + i * 74} y="53" width={30 + (i % 2) * 10} height="9" rx="2" fill={a} opacity="0.85" />
              </g>
            ))}
            <rect x="14" y="80" width="190" height="88" rx="5" fill={faint} />
            {[38, 56, 44, 70, 52, 62, 30, 66, 48].map((h, i) => (
              <rect key={i} x={24 + i * 20} y={160 - h} width="12" height={h} rx="2" fill={a} opacity={i === 3 ? 1 : 0.45} />
            ))}
            <rect x="212" y="80" width="94" height="88" rx="5" fill={faint} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <circle cx="224" cy={94 + i * 16} r="4" fill={i === 0 ? a : dim} />
                <rect x="234" y={92 + i * 16} width={58 - i * 6} height="4" rx="2" fill={dim} />
              </g>
            ))}
          </g>
        );
      case "map":
        return (
          <g>
            <rect x="12" y="34" width="296" height="134" rx="4" fill={faint} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`h${i}`} x1="12" x2="308" y1={50 + i * 22} y2={44 + i * 22} stroke={line} />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`v${i}`} y1="34" y2="168" x1={40 + i * 42} x2={52 + i * 42} stroke={line} />
            ))}
            <path d="M12 130 C 80 100, 140 150, 200 110 S 290 70, 308 84" stroke={dim} strokeWidth="6" fill="none" />
            <circle cx="160" cy="100" r="34" fill={a} opacity="0.08" stroke={dim} strokeDasharray="4 4" />
            {[[160, 100, 1], [120, 76, 0.6], [196, 124, 0.6], [238, 70, 0.4], [78, 132, 0.4]].map(([x, y, o], i) => (
              <g key={i} opacity={o}>
                <path d={`M${x} ${y} l-7 -11 a8 8 0 1 1 14 0 z`} fill={a} />
                <circle cx={x} cy={y - 14} r="3" fill="#0a0a0a" />
              </g>
            ))}
            <rect x="20" y="42" width="110" height="18" rx="9" fill="#0a0a0a" stroke={dim} />
            <circle cx="32" cy="51" r="4" fill="none" stroke={a} />
          </g>
        );
      case "schedule":
        return (
          <g>
            {["", "", "", "", "", ""].map((_, c) => (
              <rect key={c} x={44 + c * 44} y="36" width="38" height="8" rx="2" fill={dim} />
            ))}
            {[0, 1, 2, 3, 4].map((r) => (
              <g key={r}>
                <rect x="12" y={52 + r * 24} width="26" height="6" rx="2" fill={line} />
                {[0, 1, 2, 3, 4, 5].map((c) => {
                  const filled = (r * 7 + c * 3) % 5 < 2;
                  return (
                    <rect key={c} x={44 + c * 44} y={50 + r * 24} width="38" height="18" rx="3"
                      fill={filled ? a : faint} opacity={filled ? 0.25 + ((r + c) % 3) * 0.25 : 1} />
                  );
                })}
              </g>
            ))}
          </g>
        );
      case "queue":
        return (
          <g>
            <rect x="12" y="34" width="296" height="16" rx="3" fill={dim} />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i}>
                <rect x="12" y={56 + i * 22} width="296" height="18" rx="3" fill={i === 0 ? `${accent}26` : faint} />
                <circle cx="24" cy={65 + i * 22} r="4" fill={a} opacity={i < 2 ? 1 : 0.35} />
                <rect x="36" y={62 + i * 22} width={70 + (i % 3) * 14} height="5" rx="2" fill={dim} />
                <rect x="150" y={62 + i * 22} width="50" height="5" rx="2" fill={line} />
                <rect x="252" y={60 + i * 22} width="46" height="9" rx="4.5" fill={a} opacity={0.2 + (i % 3) * 0.25} />
              </g>
            ))}
          </g>
        );
      case "chart":
        return (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="14" x2="306" y1={56 + i * 30} y2={56 + i * 30} stroke={line} />
            ))}
            <path d="M14 140 L50 128 L86 132 L122 104 L158 112 L194 84 L230 92 L266 60 L306 70 L306 168 L14 168 Z" fill={a} opacity="0.12" />
            <path d="M14 140 L50 128 L86 132 L122 104 L158 112 L194 84 L230 92 L266 60 L306 70" stroke={a} strokeWidth="2.5" fill="none" />
            <path d="M14 150 L50 146 L86 136 L122 130 L158 120 L194 118 L230 104 L266 100 L306 92" stroke="#00ffff" strokeOpacity="0.5" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
            <circle cx="266" cy="60" r="5" fill={a} />
            <rect x="214" y="36" width="70" height="16" rx="4" fill="#0a0a0a" stroke={dim} />
            <rect x="222" y="42" width="40" height="4" rx="2" fill={a} />
          </g>
        );
      case "bot":
        return (
          <g>
            <rect x="96" y="32" width="128" height="140" rx="12" fill={faint} stroke={dim} />
            <rect x="106" y="42" width="80" height="16" rx="6" fill={dim} />
            <rect x="140" y="62" width="74" height="14" rx="6" fill={a} opacity="0.6" />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={106 + (i % 3) * 37} y={84 + Math.floor(i / 3) * 20} width="33" height="15" rx="3"
                fill={i === 4 ? a : dim} opacity={i === 4 ? 0.9 : 1} />
            ))}
            <circle cx="56" cy="80" r="22" fill="none" stroke={dim} />
            <path d="M44 80 l24 -10 -8 22 -4 -8 z" fill={a} opacity="0.8" />
            <rect x="244" y="62" width="62" height="8" rx="2" fill={dim} />
            <rect x="244" y="76" width="44" height="8" rx="2" fill={line} />
            <rect x="244" y="90" width="54" height="8" rx="2" fill={line} />
          </g>
        );
      case "vote":
        return (
          <g>
            <circle cx="78" cy="102" r="44" fill="none" stroke={faint} strokeWidth="18" />
            <circle cx="78" cy="102" r="44" fill="none" stroke={a} strokeWidth="18" strokeDasharray="160 277" transform="rotate(-90 78 102)" />
            <circle cx="78" cy="102" r="44" fill="none" stroke="#00ffff" strokeOpacity="0.5" strokeWidth="18" strokeDasharray="70 277" strokeDashoffset="-160" transform="rotate(-90 78 102)" />
            {[0.82, 0.58, 0.4, 0.22].map((w, i) => (
              <g key={i}>
                <rect x="150" y={48 + i * 30} width="80" height="5" rx="2" fill={dim} />
                <rect x="150" y={58 + i * 30} width="156" height="10" rx="5" fill={faint} />
                <rect x="150" y={58 + i * 30} width={156 * w} height="10" rx="5" fill={a} opacity={1 - i * 0.2} />
              </g>
            ))}
          </g>
        );
    }
  })();

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="#070707" />
      <rect width={W} height="22" fill="#0f0f0f" />
      <circle cx="12" cy="11" r="3" fill="#ef4444" opacity="0.7" />
      <circle cx="22" cy="11" r="3" fill="#eab308" opacity="0.7" />
      <circle cx="32" cy="11" r="3" fill="#22c55e" opacity="0.7" />
      <rect x="110" y="6" width="100" height="10" rx="5" fill="#ffffff0d" />
      {body}
    </svg>
  );
};

export default memo(ProjectVisual);
