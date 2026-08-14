import PostCard from "./PostCard";

function PostList({ posts, platformsById, onEdit, onDuplicate, onDelete, hasAnyPosts }) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">
          {hasAnyPosts ? "Nothing matches those filters" : "No posts yet"}
        </p>
        <p className="empty-state__body">
          {hasAnyPosts
            ? "Try clearing the search or switching the status filter."
            : "Write your first post above and it'll show up here as a draft, scheduled item, or published post."}
        </p>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          platformsById={platformsById}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default PostList;
