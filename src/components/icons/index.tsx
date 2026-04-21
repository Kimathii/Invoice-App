export function ChevronLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className={className}>
      <path d="M6 1L1.5 5.5L6 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="7" height="11" viewBox="0 0 7 11" fill="none" className={className}>
      <path d="M1 1L5.5 5.5L1 10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" className={className}>
      <path d="M1 1L5.5 5.5L10 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className={className}>
      <path d="M5.5 1V10M1 5.5H10" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

export function TrashIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.47 0l1.06 1.06H13V2.47H0V1.06h3.47L4.53 0h3.94zM1.06 14.12V4.24h10.88v9.88A1.59 1.59 0 0110.35 16H2.65a1.59 1.59 0 01-1.59-1.88z" fill="currentColor"/>
    </svg>
  )
}

export function MoonIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export function SunIcon({ className = '' }: { className?: string }) {
  return (
    <svg 
      width="10" 
      height="10" 
      viewBox="0 0 10 10" 
      fill="none" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M4.91783 0C2.20609 0 0 2.20652 0 4.91826C0 7.63 2.20609 9.83652 4.91783 9.83652C7.62913 9.83652 9.83565 7.63043 9.83565 4.91826C9.83565 2.20609 7.62913 0 4.91783 0Z" 
        fill="currentColor"
      />
    </svg>
  )
}

export function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M14 2H13V1a1 1 0 00-2 0v1H5V1a1 1 0 00-2 0v1H2a2 2 0 00-2 2v11a1 1 0 001 1h14a1 1 0 001-1V4a2 2 0 00-2-2zm1 12H1V7h14v7zm0-8H1V4a1 1 0 011-1h1v1a1 1 0 002 0V3h6v1a1 1 0 002 0V3h1a1 1 0 011 1v2z" fill="#7C5DFA"/>
    </svg>
  )
}

export function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20.513 0L28 14H13.026L20.513 0Z" fill="white"/>
      <path d="M7.487 26L0 12h14.974L7.487 26Z" fill="white" fillOpacity="0.7"/>
    </svg>
  )
}
