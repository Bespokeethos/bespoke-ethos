export function CatalantModernBadge({ size = 180 }: { size?: number }) {
  return (
    <div 
      className="catalant-modern-badge relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Animated rainbow glow ring */}
      <div className="absolute inset-0 catalant-rainbow-ring rounded-[28%]"></div>
      
      {/* Badge container with white background */}
      <div className="absolute inset-[3px] flex flex-col items-center justify-center rounded-[28%] bg-white shadow-lg">
        {/* Vetted text */}
        <div className="text-[0.65em] font-semibold tracking-[0.2em] text-slate-700">
          VETTED
        </div>
        
        {/* Catalant text */}
        <div className="mt-1 text-[1.8em] font-bold leading-none text-slate-900">
          Catalant
        </div>
        
        {/* Consultant text */}
        <div className="text-[1.15em] font-semibold leading-none text-slate-900">
          Consultant
        </div>
        
        {/* Checkmark icon */}
        <div className="mt-3 flex h-[0.35em] w-[0.35em] items-center justify-center rounded-full bg-slate-900">
          <svg 
            className="h-[0.2em] w-[0.2em] text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={4}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
