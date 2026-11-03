"use client";
import { useCallback, useEffect, useState } from "react";
import { useSession } from "@/core/hooks/SessionProvider";
import {
  approveReviewUser,
  publishFranchise,
  readAdminReviews,
  reviewFranchise,
} from "../repositories/adminReview.repository";
import type { ReviewApplication, ReviewUser } from "../types/admin.type";
import { AdminReview } from "./AdminReview";
export function AdminReviewContainer({
  section = "applications",
}: {
  section?: "users" | "applications";
}) {
  const { session } = useSession();
  const [users, setUsers] = useState<ReviewUser[]>([]);
  const [applications, setApplications] = useState<ReviewApplication[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await readAdminReviews();
      setUsers(data.users);
      setApplications(data.applications);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (session?.role === "superadmin") void load();
    else setLoading(false);
  }, [session, load]);
  async function run(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setNotice("");
    try {
      await fn();
      await load();
      setNotice("Acción confirmada.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se confirmó.");
    } finally {
      setBusy(false);
    }
  }
  if (session?.role !== "superadmin") return null;
  return (
    <AdminReview
      section={section}
      users={users}
      applications={applications}
      error={error}
      notice={notice}
      busy={busy}
      loading={loading}
      onRefresh={() => void load()}
      onKyc={(id, approved) => void run(() => approveReviewUser(id, approved))}
      onReview={(id, status, note, version) =>
        void run(() => reviewFranchise(id, status, note, version))
      }
      onPublish={(id, symbol, units) =>
        void run(() => publishFranchise(id, symbol, units))
      }
    />
  );
}
