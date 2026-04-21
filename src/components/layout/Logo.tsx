interface LogoProps {
  size?: number
}

export default function Logo({ size = 103 }: LogoProps) {
  const radius = Math.round((20 / 103) * size)
  
  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        borderRadius: `0 ${radius}px ${radius}px 0`
      }}
    >
      {/* Top rectangle — #7C5DFA — FULL HEIGHT */}
      <div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          background: '#7C5DFA',
          borderRadius: `0 ${radius}px ${radius}px 0`
        }}
      />
      
      {/* Bottom rectangle — #9277FF, overlays bottom portion */}
      <div
        className="absolute"
        style={{
          left: 0,
          right: 0,
          top: '50.49%',
          bottom: '-50.49%',
          background: '#9277FF',
          borderRadius: `0 ${radius}px ${radius}px 0`,
          transform: 'matrix(-1, 0, 0, 1, 0, 0)'
        }}
      />
      
      {/* White circle — 40×40 centered */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          width: (40 / 103) * size,
          height: (40 / 103) * size,
          transform: 'translate(-50%, -50%)',
          background: '#FFFFFF',
          borderRadius: '50%'
        }}
      />
      
      {/* Triangle cutout — apex at circle center, extends upward */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          width: (28.85 / 103) * size,
          height: (29 / 103) * size,
          transform: 'translate(-50%, -100%)', // Apex at center, extends up
          clipPath: 'polygon(50% 100%, 0% 0%, 100% 0%)', // Upside-down triangle
          background: '#7C5DFA'
        }}
      />
    </div>
  )
}