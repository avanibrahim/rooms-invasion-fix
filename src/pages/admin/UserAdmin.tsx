import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { Trash2, Search, User, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast"; // Shadcn toast

// Types
type UserType = {
  id: string;
  name?: string;
  email: string;
  role?: string;
  isOnline?: boolean;
};
type LoginHistoryType = {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  loginAt?: any;
  ip?: string;
  device?: string;
};

const OnlineIndicator: React.FC<{ online?: boolean }> = ({ online }) => (
  <span className="inline-flex items-center gap-1 text-xs font-semibold">
    <span
      className={`w-2.5 h-2.5 rounded-full ${
        online ? "bg-emerald-500" : "bg-gray-300"
      } border border-white`}
    />
    <span className={online ? "text-emerald-600" : "text-gray-400"}>
      {online ? "Online" : "Offline"}
    </span>
  </span>
);

// --- Pagination helpers ---
const PAGE_SIZE = 10;
const getCompactPages = (total: number, current: number) => {
  // window 3 angka
  const start = current <= 2 ? 1 : Math.min(current, Math.max(1, total - 2));
  const end = Math.min(start + 2, total);
  const pages: number[] = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return { pages, start, end };
};

const UserLoginProPanel: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistoryType[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  // Pager
  const [currentPage, setCurrentPage] = useState<number>(1);
  const listTopRef = useRef<HTMLDivElement | null>(null);

  // Ambil data users realtime
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "users")), (snap) => {
      setUsers(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserType[]
      );
    });
    return () => unsub();
  }, []);

  // Ambil login history (semua atau filter per user)
  useEffect(() => {
    let qRef = query(collection(db, "login_history"), orderBy("loginAt", "desc"));
    if (selectedUserId) {
      qRef = query(
        collection(db, "login_history"),
        where("userId", "==", selectedUserId),
        orderBy("loginAt", "desc")
      );
    }
    const unsub = onSnapshot(qRef, (snap) => {
      setLoginHistory(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LoginHistoryType[]
      );
    });
    return () => unsub();
  }, [selectedUserId]);

  // Reset ke halaman 1 bila filter user berubah / data berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUserId, loginHistory.length]);

  // Format tanggal
  function formatDate(val: any) {
    if (!val) return "-";
    if (val.seconds) return new Date(val.seconds * 1000).toLocaleString("id-ID");
    const d = new Date(val);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("id-ID");
  }

  async function handleDeleteHistory(id: string) {
    if (!window.confirm("Yakin ingin menghapus riwayat login ini?")) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "login_history", id));
      toast({
        title: "Berhasil dihapus",
        description: "Riwayat login telah dihapus.",
        variant: "default",
        duration: 2600,
      });
    } catch (e) {
      toast({
        title: "Gagal menghapus",
        description: (e as any).message || "Terjadi error",
        variant: "destructive",
        duration: 3200,
      });
    }
    setDeleting(null);
  }

  // Filter user untuk pencarian
  const filteredUsers = users.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(search.toLowerCase().trim()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase().trim())
  );

  const selectedUser = selectedUserId
    ? users.find((u) => u.id === selectedUserId)
    : undefined;

  // --- Derived pagination data for login history ---
  const totalLogs = loginHistory.length;
  const totalPages = Math.max(1, Math.ceil(totalLogs / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = useMemo(
    () => loginHistory.slice(startIndex, startIndex + PAGE_SIZE),
    [loginHistory, startIndex]
  );

  // Scroll ke atas daftar saat ganti halaman
  useEffect(() => {
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  // Controls
  const goToPage = (p: number) => {
    const safe = Math.min(Math.max(1, p), totalPages);
    if (safe !== currentPage) setCurrentPage(safe);
  };
  const { pages, start } = getCompactPages(totalPages, currentPage);
  const showLeftDots = start > 1;
  const showRightDots = start === 1 && totalPages > 3;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-full md:w-[320px] md:min-h-screen bg-white/80 border-r border-gray-100 flex-shrink-0 shadow-sm relative z-10 flex flex-col">
        {/* HEADER USERS */}
        <div className="px-4 py-5 border-b border-gray-100 bg-white sticky top-0 z-20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-bold text-lg text-gray-800 tracking-tight">
                Users
              </span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {users.length}
            </span>
          </div>
          {/* Search */}
          <div className="relative group">
            <input
              type="text"
              className={`w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 transition pr-9 ${
                searchFocus ? "ring-2 ring-gray-100" : ""
              }`}
              placeholder="Cari nama/email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* USER NAV */}
        <nav className="flex-1 flex flex-col py-3 overflow-y-auto pr-1">
          <ul className="space-y-2 flex-1 flex flex-col">
            <li>
              <button
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 transition font-semibold border-l-4 ${
                  selectedUserId === null
                    ? "bg-gray-50 text-gray-900 shadow border-l-gray-900"
                    : "hover:bg-gray-50 text-gray-700 border-l-transparent"
                }`}
                onClick={() => setSelectedUserId(null)}
              >
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-800">
                  <User className="w-5 h-5" />
                </span>
                Semua User
                <span className="ml-auto text-xs text-gray-400 font-normal">
                  {users.length}
                </span>
              </button>
            </li>

            {filteredUsers.length === 0 && (
              <li className="px-3 text-gray-400 italic text-sm mt-3">
                Tidak ada user ditemukan
              </li>
            )}

            {filteredUsers.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full rounded-lg flex items-center gap-3 px-3 py-2.5 transition border-l-4 ${
                    selectedUserId === user.id
                      ? "bg-gray-100 text-gray-900 shadow border-l-gray-900"
                      : "hover:bg-gray-50 text-gray-700 border-l-transparent"
                  }`}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 font-semibold">
                    {user.name?.[0]?.toUpperCase() ||
                      user.email?.[0]?.toUpperCase() ||
                      "U"}
                  </span>
                  <span className="flex-1 flex flex-col items-start min-w-0">
                    <span className="truncate font-semibold text-[15px]">
                      {user.name || "-"}
                    </span>
                    <span className="truncate text-xs text-gray-500">
                      {user.email}
                    </span>
                  </span>
                  <OnlineIndicator online={user.isOnline} />
                  {user.role === "admin" && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                      Admin
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-h-screen px-2 md:px-7 py-6 bg-transparent flex flex-col">
        <div className="max-w-5xl w-full mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div className="space-y-1">
              <h2 className="font-bold text-2xl text-gray-900 tracking-tight">
                Riwayat Login
              </h2>
              <div className="text-xs text-gray-500">
                {selectedUserId ? (
                  <>
                    Pengguna:{" "}
                    <span className="font-semibold text-gray-700">
                      {selectedUser?.name || "-"}
                    </span>{" "}
                    <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                      {selectedUser?.email}
                    </span>
                  </>
                ) : (
                  "Semua login user"
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {totalLogs} log • Halaman {currentPage} dari {totalPages}
              </span>
              {selectedUserId && (
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                  title="Hapus filter pengguna"
                >
                  <X className="w-3.5 h-3.5" />
                  Hapus filter
                </button>
              )}
            </div>
          </div>

          {/* Anchor untuk scroll-to-top pager */}
          <div ref={listTopRef} />

          {/* DESKTOP TABLE */}
          <div className="hidden md:block rounded-xl border border-gray-100 bg-white/90 shadow overflow-auto max-h-[72vh]">
            <table className="min-w-[880px] w-full text-[13px] md:text-[15px]">
              <thead className="sticky top-0 z-10 bg-gray-100/95 backdrop-blur">
                <tr className="text-gray-700">
                  <th className="p-3 font-semibold text-left w-14">#</th>
                  <th className="p-3 font-semibold text-left">Nama</th>
                  <th className="p-3 font-semibold text-left">Email</th>
                  <th className="p-3 font-semibold text-left">Login</th>
                  <th className="p-3 font-semibold text-left">IP</th>
                  <th className="p-3 font-semibold text-left">Device</th>
                  <th className="p-3 w-14"></th>
                </tr>
              </thead>
              <tbody>
                {pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-400 italic">
                      Tidak ada riwayat login
                    </td>
                  </tr>
                ) : (
                  pageItems.map((log, idx) => (
                    <tr
                      key={log.id}
                      className={`transition ${
                        idx % 2 === 1 ? "bg-gray-50/60" : "bg-white"
                      } hover:bg-gray-50`}
                    >
                      <td className="p-3 text-gray-500">
                        {startIndex + idx + 1}
                      </td>
                      <td className="p-3 font-semibold text-gray-900 whitespace-nowrap">
                        {log.userName || "-"}
                      </td>
                      <td className="p-3 text-gray-700 whitespace-nowrap">
                        {log.userEmail || "-"}
                      </td>
                      <td className="p-3 text-gray-700 whitespace-nowrap">
                        {formatDate(log.loginAt)}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700">
                          {log.ip || "-"}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
                          {log.device || "-"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          className={`text-red-500 hover:bg-red-50 rounded-full p-1.5 transition ${
                            deleting === log.id ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          onClick={() => handleDeleteHistory(log.id)}
                          disabled={deleting === log.id}
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARD LIST */}
          <div className="md:hidden space-y-4">
            {pageItems.length === 0 ? (
              <div className="rounded-xl border border-gray-100 bg-white/80 shadow p-6 text-center text-gray-400 italic">
                Tidak ada riwayat login
              </div>
            ) : (
              pageItems.map((log, idx) => (
                <div
                  key={log.id}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm p-4 flex flex-col gap-2 relative"
                >
                  <div className="absolute right-3 top-3">
                    <button
                      className={`text-red-500 hover:bg-red-50 rounded-full p-1.5 transition ${
                        deleting === log.id ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleDeleteHistory(log.id)}
                      disabled={deleting === log.id}
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-semibold">
                      {(log.userName || log.userEmail || "?")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 text-base truncate">
                        {log.userName || "-"}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {log.userEmail || "-"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                    <span className="rounded-md bg-gray-50 px-2 py-1">
                      <span className="font-medium text-gray-500">#</span>{" "}
                      {startIndex + idx + 1}
                    </span>
                    <span className="rounded-md bg-gray-50 px-2 py-1">
                      <span className="font-medium text-gray-500">Login:</span>{" "}
                      {formatDate(log.loginAt)}
                    </span>
                    <span className="rounded-md bg-gray-50 px-2 py-1">
                      <span className="font-medium text-gray-500">IP:</span>{" "}
                      <span className="font-mono">{log.ip || "-"}</span>
                    </span>
                    <span className="rounded-md bg-gray-50 px-2 py-1">
                      <span className="font-medium text-gray-500">Device:</span>{" "}
                      {log.device || "-"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination controls (desktop & mobile sama) */}
          <nav
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;
            </button>

            {showLeftDots && (
              <span className="px-2 text-gray-500 select-none">…</span>
            )}

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`h-9 min-w-9 px-3 py-2 rounded-lg text-sm border ${
                  p === currentPage
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            ))}

            {showRightDots && (
              <span className="px-2 text-gray-500 select-none">…</span>
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;
            </button>
          </nav>

          {/* Range info */}
          <div className="mt-2 text-center text-xs text-gray-500">
            Menampilkan{" "}
            <span className="font-semibold text-gray-700">
              {totalLogs === 0 ? 0 : startIndex + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-gray-700">
              {Math.min(startIndex + PAGE_SIZE, totalLogs)}
            </span>{" "}
            dari <span className="font-semibold text-gray-700">{totalLogs}</span>{" "}
            log
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLoginProPanel;
