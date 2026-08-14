import { formatRelativeTime, formatScheduleLabel } from "../utils/format";

function PostCard({ post, platformsById, onEdit, onDuplicate, onDelete }) {
  const knownPlatforms = post.platforms
    .map((id) => platformsById[id])
    .filter(Boolean);

  return (
    <article className="post-card">
      <header className="post-card__head">
        <span className={`badge badge--${post.status}`}>{post.status}</span>
        <span className="post-card__time">
          {post.status === "scheduled" && post.scheduledAt
            ? formatScheduleLabel(post.scheduledAt)
            : `Updated ${formatRelativeTime(post.updatedAt)}`}
        </span>
      </header>

      <p className="post-card__content">{post.content}</p>

      <div className="post-card__platforms">
        {knownPlatforms.map((platform) => (
          <span key={platform.id} className="tag">
            <i className="tag__dot" style={{ background: platform.color }} />
            {platform.name}
          </span>
        ))}
        {post.platforms.length !== knownPlatforms.length && (
          <span className="tag tag--muted">+ removed platform</span>
        )}
      </div>

      <footer className="post-card__actions">
        <button type="button" className="link-button" onClick={() => onEdit(post.id)}>
          Edit
        </button>
        <button type="button" className="link-button" onClick={() => onDuplicate(post.id)}>
          Duplicate
        </button>
        <button
          type="button"
          className="link-button link-button--danger"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>
      </footer>
    </article>
  );
}

export default PostCard;
