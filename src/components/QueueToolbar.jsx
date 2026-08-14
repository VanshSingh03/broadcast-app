const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "draft", label: "Drafts" },
  { id: "scheduled", label: "Scheduled" },
  { id: "published", label: "Published" },
];

function QueueToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusChange,
  platforms,
  platformFilter,
  onPlatformChange,
}) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="toolbar__search"
        placeholder="Search your posts…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <div className="toolbar__filters">
        <div className="segmented">
          {STATUS_FILTERS.map((f) => (
            <button
              type="button"
              key={f.id}
              className={`segmented__item ${statusFilter === f.id ? "segmented__item--active" : ""}`}
              onClick={() => onStatusChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          className="toolbar__select"
          value={platformFilter}
          onChange={(e) => onPlatformChange(e.target.value)}
        >
          <option value="all">All platforms</option>
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default QueueToolbar;
