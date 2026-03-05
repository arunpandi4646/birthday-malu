const EmojiLogo = ({ label = 'React Bits', emoji = '\uD83C\uDF89' }) => {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
      style={{
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label={`${label} logo`}
    >
      <span className="text-lg leading-none" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/90">
        {label}
      </span>
    </div>
  );
};

export default EmojiLogo;
