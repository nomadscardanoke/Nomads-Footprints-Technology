import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark-only' | 'compact' | 'footer';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const LogoMark: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label="Nomads Footprints Technology Logo Mark"
    >
      {/* Outer Left White Dot */}
      <circle cx="28" cy="80" r="8" fill="#FFFFFF" className="logo-white-part fill-white" />

      {/* Left Red Barbell / Peanut Node */}
      <g>
        <circle cx="58" cy="52" r="14" fill="#E50914" />
        <circle cx="58" cy="108" r="14" fill="#E50914" />
        <path
          d="M 48 52 C 48 70, 52 74, 52 80 C 52 86, 48 90, 48 108 L 68 108 C 68 90, 64 86, 64 80 C 64 74, 68 70, 68 52 Z"
          fill="#E50914"
        />
      </g>

      {/* Center White Barbell / Node (Taller & Centered) */}
      <g>
        <circle cx="90" cy="38" r="14" fill="#FFFFFF" className="logo-white-part fill-white" />
        <circle cx="90" cy="122" r="14" fill="#FFFFFF" className="logo-white-part fill-white" />
        <path
          d="M 80 38 C 80 65, 84 72, 84 80 C 84 88, 80 95, 80 122 L 100 122 C 100 95, 96 88, 96 80 C 96 72, 100 65, 100 38 Z"
          fill="#FFFFFF"
          className="logo-white-part fill-white"
        />
      </g>

      {/* Right Red Barbell / Peanut Node */}
      <g>
        <circle cx="122" cy="52" r="14" fill="#E50914" />
        <circle cx="122" cy="108" r="14" fill="#E50914" />
        <path
          d="M 112 52 C 112 70, 116 74, 116 80 C 116 86, 112 90, 112 108 L 132 108 C 132 90, 128 86, 128 80 C 128 74, 132 70, 132 52 Z"
          fill="#E50914"
        />
      </g>

      {/* Outer Right White Dot */}
      <circle cx="152" cy="80" r="8" fill="#FFFFFF" className="logo-white-part fill-white" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'dark',
  size = 'md',
}) => {
  const markSizes = {
    sm: 38,
    md: 48,
    lg: 60,
    xl: 76,
  };

  if (variant === 'mark-only') {
    return <LogoMark size={markSizes[size]} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-3.5 select-none group cursor-pointer ${className}`}>
      <div className="relative flex items-center shrink-0">
        <LogoMark size={markSizes[size]} />
      </div>
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className="font-black tracking-tight text-white uppercase text-xl sm:text-2xl font-heading">
            NOMADS <span className="text-red-600">FOOTPRINTS</span>
          </span>
        </div>
        <span className="font-extrabold tracking-[0.25em] text-[11px] sm:text-xs uppercase font-heading text-neutral-300 mt-1">
          TECHNOLOGY
        </span>
        {variant === 'full' && (
          <span
            className="text-xs sm:text-sm text-red-500 font-semibold tracking-wide italic mt-1.5"
            style={{ fontFamily: "'Caveat', cursive, sans-serif", fontSize: '0.98rem' }}
          >
            &ldquo;Your brand is in good hands.&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
