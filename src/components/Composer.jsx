import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost, updatePost } from "../postsSlice";
import { toDatetimeLocalValue } from "../utils/format";
import PlatformPreviewCard from "./PlatformPreviewCard";

const emptyForm = {
  content: "",
  platformIds: [],
  scheduleOn: false,
  scheduleValue: "",
};

function Composer({ editingPost, onCancelEdit, pushToast }) {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms.list);

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingPost) {
      setForm({
        content: editingPost.content,
        platformIds: editingPost.platforms,
        scheduleOn: editingPost.status === "scheduled",
        scheduleValue: toDatetimeLocalValue(editingPost.scheduledAt),
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingPost]);

  const togglePlatform = (id) => {
    setForm((f) => ({
      ...f,
      platformIds: f.platformIds.includes(id)
        ? f.platformIds.filter((p) => p !== id)
        : [...f.platformIds, id],
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    onCancelEdit();
  };

  const validate = () => {
    if (!form.content.trim()) {
      pushToast("Write something before saving.", "error");
      return false;
    }
    if (form.platformIds.length === 0) {
      pushToast("Pick at least one platform.", "error");
      return false;
    }
    if (form.scheduleOn && !form.scheduleValue) {
      pushToast("Choose a date and time to schedule for.", "error");
      return false;
    }
    if (form.scheduleOn && new Date(form.scheduleValue).getTime() <= Date.now()) {
      pushToast("Scheduled time needs to be in the future.", "error");
      return false;
    }
    return true;
  };

  const submit = (status) => {
    if (status !== "draft" && !validate()) return;
    if (status === "draft" && !form.content.trim()) {
      pushToast("Write something before saving.", "error");
      return;
    }

    const scheduledAt = form.scheduleOn ? new Date(form.scheduleValue).getTime() : null;
    const resolvedStatus = form.scheduleOn && status === "published" ? "scheduled" : status;

    const payload = {
      content: form.content.trim(),
      platforms: form.platformIds,
      status: resolvedStatus,
      scheduledAt: resolvedStatus === "scheduled" ? scheduledAt : null,
    };

    if (editingPost) {
      dispatch(updatePost({ id: editingPost.id, changes: payload }));
      pushToast("Post updated.", "success");
    } else {
      dispatch(addPost(payload));
      pushToast(
        resolvedStatus === "draft"
          ? "Saved to drafts."
          : resolvedStatus === "scheduled"
          ? "Post scheduled."
          : "Post published.",
        "success"
      );
    }
    resetForm();
  };

  const selectedPlatforms = platforms.filter((p) => form.platformIds.includes(p.id));
  const primaryLabel = form.scheduleOn ? "Schedule post" : "Publish now";

  return (
    <section className="composer" aria-label="Compose a post">
      {editingPost && (
        <div className="composer__editing-banner">
          Editing a saved post
          <button type="button" className="link-button" onClick={resetForm}>
            Cancel and start new
          </button>
        </div>
      )}

      <textarea
        className="composer__textarea"
        placeholder="What do you want to say? Write it once — we'll show how it lands on each platform."
        value={form.content}
        onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
        rows={5}
      />

      <div className="composer__platforms">
        <p className="composer__label">Post to</p>
        <div className="chip-row">
          {platforms.map((platform) => {
            const active = form.platformIds.includes(platform.id);
            return (
              <button
                type="button"
                key={platform.id}
                className={`chip ${active ? "chip--active" : ""}`}
                style={active ? { "--chip-color": platform.color } : undefined}
                onClick={() => togglePlatform(platform.id)}
                aria-pressed={active}
              >
                <i className="chip__dot" style={{ background: platform.color }} />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="composer__schedule">
        <label className="switch">
          <input
            type="checkbox"
            checked={form.scheduleOn}
            onChange={(e) => setForm((f) => ({ ...f, scheduleOn: e.target.checked }))}
          />
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
          Schedule for later
        </label>
        {form.scheduleOn && (
          <input
            type="datetime-local"
            className="composer__datetime"
            value={form.scheduleValue}
            onChange={(e) => setForm((f) => ({ ...f, scheduleValue: e.target.value }))}
          />
        )}
      </div>

      <div className="composer__actions">
        <button type="button" className="btn btn--ghost" onClick={() => submit("draft")}>
          Save as draft
        </button>
        <button type="button" className="btn btn--primary" onClick={() => submit("published")}>
          {primaryLabel}
        </button>
      </div>

      <div className="preview-strip">
        <p className="composer__label">
          Live preview{" "}
          <span className="composer__label-muted">— one card per platform you picked</span>
        </p>
        {selectedPlatforms.length === 0 ? (
          <p className="preview-strip__empty">
            Select at least one platform above to see how this post will look there.
          </p>
        ) : (
          <div className="preview-strip__row">
            {selectedPlatforms.map((platform) => (
              <PlatformPreviewCard key={platform.id} platform={platform} content={form.content} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Composer;
