import { useState } from "react";

interface Territory {
  id: string;
  name: string;
  color: string;
  region: string;
  position: { x: number; y: number; width: number; height: number };
}

const territories: Territory[] = [
  { id: "maleku", name: "Maleku", color: "#ea580c", region: "Northern Plains", position: { x: 200, y: 60, width: 100, height: 80 } },
  { id: "chorotega", name: "Chorotega", color: "#ca8a04", region: "Guanacaste", position: { x: 80, y: 100, width: 140, height: 110 } },
  { id: "huetar", name: "Huetar", color: "#0d9488", region: "Central Pacific", position: { x: 320, y: 180, width: 120, height: 100 } },
  { id: "cabecar", name: "Cabécar", color: "#2563eb", region: "Talamanca Mountains", position: { x: 360, y: 280, width: 150, height: 110 } },
  { id: "bribri", name: "Bribri", color: "#059669", region: "Talamanca", position: { x: 480, y: 330, width: 120, height: 100 } },
  { id: "terraba", name: "Térraba", color: "#e11d48", region: "Buenos Aires", position: { x: 280, y: 350, width: 110, height: 95 } },
  { id: "boruca", name: "Boruca", color: "#9333ea", region: "Southern Pacific", position: { x: 240, y: 390, width: 100, height: 90 } },
  { id: "ngobe", name: "Ngöbe", color: "#d97706", region: "Southern Zone", position: { x: 200, y: 360, width: 120, height: 100 } },
];

const territoryPaths: Record<string, string> = {
  "maleku": "M 200,60 Q 180,65 185,85 L 195,110 Q 210,130 240,135 L 280,138 Q 300,133 302,113 L 304,88 Q 299,68 279,63 L 239,59 Q 217,57 200,60 Z",
  "chorotega": "M 80,100 Q 60,110 68,135 L 88,170 Q 108,195 143,205 L 188,210 Q 215,203 218,175 L 220,140 Q 213,115 188,108 L 138,102 Q 103,97 80,100 Z",
  "huetar": "M 320,180 Q 295,188 305,210 L 320,240 Q 340,260 375,268 L 415,272 Q 438,265 440,243 L 442,215 Q 435,193 410,187 L 365,182 Q 338,178 320,180 Z",
  "cabecar": "M 360,280 Q 330,290 340,320 L 360,355 Q 385,380 420,390 L 470,395 Q 500,390 505,365 L 510,325 Q 505,295 480,285 L 430,277 Q 390,273 360,280 Z",
  "bribri": "M 480,330 Q 460,335 465,355 L 475,380 Q 490,400 520,410 L 560,415 Q 590,410 595,390 L 600,360 Q 595,340 575,333 L 535,327 Q 505,323 480,330 Z",
  "terraba": "M 280,350 Q 255,355 260,375 L 270,405 Q 285,425 315,435 L 355,442 Q 380,437 385,417 L 390,390 Q 385,370 365,363 L 325,355 Q 300,348 280,350 Z",
  "boruca": "M 240,390 Q 215,395 220,415 L 230,440 Q 245,460 275,470 L 315,475 Q 335,470 338,450 L 340,425 Q 335,405 315,398 L 275,392 Q 255,388 240,390 Z",
  "ngobe": "M 200,360 Q 175,365 180,385 L 190,415 Q 205,435 235,445 L 280,452 Q 305,447 310,427 L 315,395 Q 310,375 290,368 L 245,362 Q 220,358 200,360 Z"
};

interface TerritoryMapProps {
  highlightedTribeId: string;
}

export function TerritoryMap({ highlightedTribeId }: TerritoryMapProps) {
  const [hoveredTerritory, setHoveredTerritory] = useState<string | null>(null);
  const highlightedTribe = territories.find(t => t.id === highlightedTribeId);

  return (
    <div className="relative w-full bg-gradient-to-br from-muted/30 via-background to-muted/20 rounded-xl overflow-hidden border-2 border-border">
      <svg
        viewBox="0 0 650 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* COSTA RICA MAP - Clear and recognizable outline */}
        <path
          d="M 120 80 Q 140 70 160 75 L 200 85 Q 240 95 280 100 L 320 98 Q 360 95 390 100 L 420 110 Q 450 125 470 145 L 490 170 Q 505 195 512 225 L 518 260 Q 520 290 518 320 L 512 355 Q 500 385 480 410 L 450 435 Q 415 455 375 465 L 330 470 Q 285 472 245 465 L 205 452 Q 170 435 145 410 L 125 380 Q 110 350 105 315 L 102 275 Q 100 235 105 200 L 112 160 Q 115 120 120 80 Z"
          fill="hsl(var(--muted))"
          fillOpacity="0.3"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Non-highlighted territories (dimmed) */}
        {territories
          .filter(t => t.id !== highlightedTribeId)
          .map((territory) => {
            const pathData = territoryPaths[territory.id];
            const centerX = territory.position.x + territory.position.width / 2;
            const centerY = territory.position.y + territory.position.height / 2;
            
            return (
              <g key={territory.id}>
                <path
                  d={pathData}
                  fill={territory.color}
                  opacity="0.15"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                <text
                  x={centerX}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="12"
                  fontWeight="500"
                  className="pointer-events-none opacity-40"
                >
                  {territory.name}
                </text>
              </g>
            );
          })}

        {/* Highlighted territory (prominent) */}
        {highlightedTribe && (
          <g>
            {/* Outer glow */}
            <path
              d={territoryPaths[highlightedTribe.id]}
              fill={highlightedTribe.color}
              opacity="0.4"
              stroke="none"
              style={{
                filter: "blur(12px)",
              }}
            />
            
            {/* Main territory shape */}
            <path
              d={territoryPaths[highlightedTribe.id]}
              fill={highlightedTribe.color}
              opacity="0.95"
              stroke="#ffffff"
              strokeWidth="5"
              style={{
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.5))",
              }}
            />
            
            {/* Territory label */}
            <text
              x={highlightedTribe.position.x + highlightedTribe.position.width / 2}
              y={highlightedTribe.position.y + highlightedTribe.position.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontSize="22"
              fontWeight="900"
              className="pointer-events-none"
              style={{
                textShadow: "0 3px 10px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)",
                letterSpacing: "0.5px"
              }}
            >
              {highlightedTribe.name}
            </text>

            {/* Region name */}
            <text
              x={highlightedTribe.position.x + highlightedTribe.position.width / 2}
              y={highlightedTribe.position.y + highlightedTribe.position.height / 2 + 26}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="700"
              className="pointer-events-none"
              style={{
                textShadow: "0 2px 8px rgba(0,0,0,1)",
              }}
            >
              {highlightedTribe.region}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
