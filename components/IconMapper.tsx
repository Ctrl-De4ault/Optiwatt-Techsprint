
import React from 'react';

interface AppIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, className = "", size = 24 }) => {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  } as React.SVGProps<SVGSVGElement>;

  switch (name) {
    case 'fridge':
      return (
        <svg {...props}>
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="5" y1="10" x2="19" y2="10"/>
          <line x1="9" y1="5" x2="9" y2="7"/>
          <line x1="9" y1="15" x2="9" y2="19"/>
        </svg>
      );
    case 'ac':
      return (
        <svg {...props}>
          <path d="M2 14c0-3 2-3 2-3s2 0 2 3c0 3-2 3-2 3s-2 0-2-3Z"/>
          <path d="M10 14c0-3 2-3 2-3s2 0 2 3c0 3-2 3-2 3s-2 0-2-3Z"/>
          <path d="M18 14c0-3 2-3 2-3s2 0 2 3c0 3-2 3-2 3s-2 0-2-3Z"/>
          <path d="M2 10h20"/>
          <path d="M2 6h20"/>
        </svg>
      );
    case 'washer':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="12" cy="13" r="5"/>
          <path d="M12 8v1"/>
        </svg>
      );
    case 'oven':
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 10h18"/>
          <path d="M6 7h1"/>
          <path d="M9 7h1"/>
          <path d="M12 7h1"/>
          <circle cx="12" cy="14" r="3"/>
        </svg>
      );
    case 'light':
      return (
        <svg {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5 1 1 0 0 1-1-1.5V4a1 1 0 0 0-2 0v9a1 1 0 0 1-1 1.5 4.8 4.8 0 0 0-1 3.5v4"/>
          <path d="m18 10-2-1"/>
          <path d="m6 10 2-1"/>
          <path d="m12 2v2"/>
          <path d="m19 5-2 1"/>
          <path d="m5 5 2 1"/>
        </svg>
      );
    case 'building':
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
          <path d="M9 22v-4h6v4"/>
          <path d="M8 6h.01"/>
          <path d="M16 6h.01"/>
          <path d="M8 10h.01"/>
          <path d="M16 10h.01"/>
          <path d="M8 14h.01"/>
          <path d="M16 14h.01"/>
        </svg>
      );
    case 'campus':
      return (
        <svg {...props}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      );
  }
};
