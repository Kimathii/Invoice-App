export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-[136px] px-6 text-center">
      {/* Illustration */}
      <div className="mb-10 w-[242px]">
        <EmptyIllustration />
      </div>

      <h2 className="mb-4 text-h2 text-text-primary dark:text-white">
        There is nothing here
      </h2>
      <p className="max-w-[220px] text-body text-text-muted dark:text-[#DFE3FA]">
        Create an invoice by clicking the{' '}
        <strong className="font-bold text-text-primary dark:text-white">New Invoice</strong>{' '}
        button and get started
      </p>
    </div>
  )
}

function EmptyIllustration() {
  return (
    <svg viewBox="0 0 242 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Envelope body */}
      <path
        d="M30 80 L121 130 L212 80 L212 170 Q212 180 202 180 L40 180 Q30 180 30 170 Z"
        fill="#F9FAFE"
        stroke="#DFE3FA"
        strokeWidth="2"
        className="dark:fill-[#252945] dark:stroke-[#252945]"
      />
      {/* Envelope flap */}
      <path
        d="M30 80 L121 130 L212 80 L175 50 Q170 46 164 46 L78 46 Q72 46 67 50 Z"
        fill="#F3F0FF"
        stroke="#DFE3FA"
        strokeWidth="2"
        className="dark:fill-[#1E2139] dark:stroke-[#252945]"
      />
      {/* Envelope top flap lines */}
      <path d="M30 80 L121 40 L212 80" stroke="#DFE3FA" strokeWidth="2" className="dark:stroke-[#252945]" />

      {/* Flying letters - left top */}
      <rect x="12" y="28" width="32" height="26" rx="3" fill="white" stroke="#DFE3FA" strokeWidth="1.5" className="dark:fill-[#252945] dark:stroke-[#494E6E]" transform="rotate(-15 12 28)" />
      <path d="M16 36 L36 36M16 41 L32 41" stroke="#DFE3FA" strokeWidth="1.5" strokeLinecap="round" className="dark:stroke-[#494E6E]" transform="rotate(-15 12 28)" />

      {/* Flying letters - right */}
      <rect x="188" y="55" width="32" height="26" rx="3" fill="white" stroke="#DFE3FA" strokeWidth="1.5" className="dark:fill-[#252945] dark:stroke-[#494E6E]" transform="rotate(10 188 55)" />
      <path d="M192 63 L212 63M192 68 L208 68" stroke="#DFE3FA" strokeWidth="1.5" strokeLinecap="round" className="dark:stroke-[#494E6E]" transform="rotate(10 188 55)" />

      {/* Flying letters - left bottom */}
      <rect x="5" y="110" width="28" height="22" rx="3" fill="white" stroke="#DFE3FA" strokeWidth="1.5" className="dark:fill-[#252945] dark:stroke-[#494E6E]" transform="rotate(-8 5 110)" />

      {/* Paper plane */}
      <path
        d="M185 148 L220 132 L200 160 L195 150 Z"
        fill="#7C5DFA"
        fillOpacity="0.3"
      />
      <path d="M195 150 L200 160 L185 148" fill="#7C5DFA" fillOpacity="0.5" />

      {/* Person - body */}
      <ellipse cx="121" cy="58" rx="22" ry="26" fill="#1E2139" className="dark:fill-[#0C0E16]" />

      {/* Person - jacket */}
      <path
        d="M99 70 Q95 110 90 130 L152 130 Q147 110 143 70 Q137 80 121 80 Q105 80 99 70Z"
        fill="#7C5DFA"
      />

      {/* Person - shirt */}
      <path d="M113 80 L121 95 L129 80 Q125 83 121 83 Q117 83 113 80Z" fill="white" />

      {/* Person - head */}
      <ellipse cx="121" cy="46" rx="16" ry="18" fill="#F4A261" />

      {/* Person - hair */}
      <path
        d="M105 42 Q106 28 121 26 Q136 28 137 42 Q132 34 121 34 Q110 34 105 42Z"
        fill="#1E2139"
        className="dark:fill-[#0C0E16]"
      />

      {/* Person - arm holding megaphone */}
      <path
        d="M137 75 Q155 60 168 52"
        stroke="#F4A261"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Megaphone */}
      <path d="M162 38 L180 28 L182 62 L164 52 Z" fill="#7C5DFA" />
      <rect x="155" y="44" width="12" height="14" rx="2" fill="#9277FF" />
      <path d="M182 35 Q190 45 182 55" stroke="#9277FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M185 31 Q196 45 185 59" stroke="#9277FF" strokeWidth="2" strokeLinecap="round" />

      {/* Dashed circle around person */}
      <circle
        cx="121"
        cy="90"
        r="68"
        stroke="#DFE3FA"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="dark:stroke-[#494E6E]"
      />
    </svg>
  )
}
