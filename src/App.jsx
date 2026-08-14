import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost, duplicatePost } from "./postsSlice";
import Sidebar from "./components/Sidebar";
import Composer from "./components/Composer";
import QueueToolbar from "./components/QueueToolbar";
import PostList from "./components/PostList";
import PlatformManagerModal from "./components/PlatformManagerModal";
import ToastStack from "./components/ToastStack";

function App() {
  const dispatch = useDispatch();

  const posts = useSelector((state) =>
    state.posts.allIds.map((id) => state.posts.byId[id])
  );
  const platforms = useSelector((state) => state.platforms.list);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [showPlatformManager, setShowPlatformManager] = useState(false);
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, type = "success") => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((toast) => toast.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => setToasts((t) => t.filter((toast) => toast.id !== id));

  const platformsById = useMemo(
    () => Object.fromEntries(platforms.map((p) => [p.id, p])),
    [platforms]
  );

  const stats = useMemo(
    () => ({
      total: posts.length,
      draft: posts.filter((p) => p.status === "draft").length,
      scheduled: posts.filter((p) => p.status === "scheduled").length,
      published: posts.filter((p) => p.status === "published").length,
    }),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return posts
      .filter((p) => (statusFilter === "all" ? true : p.status === statusFilter))
      .filter((p) => (platformFilter === "all" ? true : p.platforms.includes(platformFilter)))
      .filter((p) =>
        query.trim() ? p.content.toLowerCase().includes(query.trim().toLowerCase()) : true
      );
  }, [posts, statusFilter, platformFilter, query]);

  const editingPost = editingId ? posts.find((p) => p.id === editingId) || null : null;

  const handleEdit = (id) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDuplicate = (id) => {
    const source = posts.find((p) => p.id === id);
    if (!source) return;
    dispatch(duplicatePost(source));
    pushToast("Duplicated as a new draft.", "success");
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    if (editingId === id) setEditingId(null);
    pushToast("Post deleted.", "success");
  };

  return (
    <div className="app-shell">
      <Sidebar stats={stats} onManagePlatforms={() => setShowPlatformManager(true)} />

      <main className="app-main">
        <Composer
          editingPost={editingPost}
          onCancelEdit={() => setEditingId(null)}
          pushToast={pushToast}
        />

        <section className="queue" aria-label="Your posts">
          <div className="queue__head">
            <h2>Your posts</h2>
            <span className="queue__count">{filteredPosts.length}</span>
          </div>

          <QueueToolbar
            query={query}
            onQueryChange={setQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            platforms={platforms}
            platformFilter={platformFilter}
            onPlatformChange={setPlatformFilter}
          />

          <PostList
            posts={filteredPosts}
            platformsById={platformsById}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            hasAnyPosts={posts.length > 0}
          />
        </section>
      </main>

      {showPlatformManager && (
        <PlatformManagerModal onClose={() => setShowPlatformManager(false)} pushToast={pushToast} />
      )}

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
