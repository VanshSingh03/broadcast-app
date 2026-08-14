function Sidebar({ stats, onManagePlatforms }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path
              d="M4 12a8 8 0 0 1 8-8M4 12a8 8 0 0 0 8 8M4 12h16M12 4a8 8 0 0 1 8 8M12 4a8 8 0 0 0-8 8M12 20a8 8 0 0 0 8-8M12 20a8 8 0 0 1-8-8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <div>
          <p className="sidebar__title">Broadcast</p>
          <p className="sidebar__subtitle">Post once, reach everywhere</p>
        </div>
      </div>

      <nav className="sidebar__stats" aria-label="Post overview">
        <p className="sidebar__section-label">Overview</p>
        <div className="stat-row">
          <span className="stat-row__label">All posts</span>
          <span className="stat-row__value">{stats.total}</span>
        </div>
        <div className="stat-row">
          <span className="stat-row__label">
            <i className="dot dot--draft" /> Drafts
          </span>
          <span className="stat-row__value">{stats.draft}</span>
        </div>
        <div className="stat-row">
          <span className="stat-row__label">
            <i className="dot dot--scheduled" /> Scheduled
          </span>
          <span className="stat-row__value">{stats.scheduled}</span>
        </div>
        <div className="stat-row">
          <span className="stat-row__label">
            <i className="dot dot--published" /> Published
          </span>
          <span className="stat-row__value">{stats.published}</span>
        </div>
      </nav>

      <div className="sidebar__footer">
        <button className="btn btn--ghost-inverse" onClick={onManagePlatforms}>
          Manage platforms
        </button>
        <p className="sidebar__hint">
          Everything here is saved to this browser — no account needed for the prototype.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
