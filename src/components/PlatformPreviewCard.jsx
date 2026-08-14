function PlatformPreviewCard({ platform, content }) {
  const count = content.length;
  const ratio = platform.limit ? count / platform.limit : 0;
  const over = count - platform.limit;

  let state = "ok";
  if (ratio >= 1) state = "over";
  else if (ratio >= 0.85) state = "warn";

  const dialColor =
    state === "over" ? "#C23B3B" : state === "warn" ? "#B4790A" : platform.color;
  const degrees = Math.min(ratio, 1) * 360;

  const dialStyle = {
    background: `conic-gradient(${dialColor} ${degrees}deg, #E4E1D8 0deg)`,
  };

  return (
    <div className="preview-card" style={{ "--platform-color": platform.color }}>
      <div className="preview-card__head">
        <span className="preview-card__platform">
          <i className="preview-card__swatch" />
          {platform.name}
        </span>
        <span className={`preview-card__dial preview-card__dial--${state}`} style={dialStyle}>
          <span className="preview-card__dial-inner">
            {state === "over" ? `+${over}` : count}
          </span>
        </span>
      </div>
      <p className="preview-card__body">
        {content ? content : <span className="preview-card__placeholder">Nothing written yet</span>}
      </p>
      <p className={`preview-card__limit preview-card__limit--${state}`}>
        {count} / {platform.limit} characters
        {state === "over" && " — trim before sending"}
      </p>
    </div>
  );
}

export default PlatformPreviewCard;
