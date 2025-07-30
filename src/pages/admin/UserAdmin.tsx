import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Users } from "lucide-react";

type User = {
  id: string;
  name?: string;
  email: string;
  role?: string;
  isOnline?: boolean;
};

type LoginHistory = {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  loginAt?: any; // Firestore Timestamp OR ISO string
  ip?: string;
  device?: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);

  // Ambil data users real-time
  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "users")), (snap) => {
      setUsers(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[]
      );
    });
    return () => unsub();
  }, []);

  // Ambil login history real-time, urut terbaru
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "login_history"), orderBy("loginAt", "desc")),
      (snap) => {
        setLoginHistory(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as LoginHistory[]
        );
      }
    );
    return () => unsub();
  }, []);

  // Helper: cari log login terakhir per user
  function getLastLogin(userId: string): LoginHistory | undefined {
    return loginHistory.find((log) => log.userId === userId);
  }

  // Helper: format tanggal
  function formatDate(val: any) {
    if (!val) return "-";
    if (val.seconds) return new Date(val.seconds * 1000).toLocaleString("id-ID");
    const d = new Date(val);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("id-ID");
  }

  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-0">
      {/* HEADER */}
      <header className="w-full px-4 py-3 z-20 flex items-center mb-4">
        <div className="flex items-center gap-3">
          <Users className="w-7 h-7 text-gray-100" />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            User Management
          </span>
        </div>
      </header>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block rounded-xl border border-gray-100 bg-white/80 shadow-md overflow-x-auto">
        <table className="min-w-[900px] w-full text-[13px] md:text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="p-3 font-semibold text-left">Name</th>
              <th className="p-3 font-semibold text-left">Email</th>
              <th className="p-3 font-semibold text-left">Role</th>
              <th className="p-3 font-semibold text-left">Status</th>
              <th className="p-3 font-semibold text-left">Last Login</th>
              <th className="p-3 font-semibold text-left">Login IP</th>
              <th className="p-3 font-semibold text-left">Device</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400 italic">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const lastLogin = getLastLogin(user.id);
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">{user.name || "-"}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          user.role === "admin"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="p-3">
                      {user.isOnline ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                          Online
                        </span>
                      ) : (
                        <span className="text-gray-400">Offline</span>
                      )}
                    </td>
                    <td className="p-3">
                      {lastLogin ? formatDate(lastLogin.loginAt) : "-"}
                    </td>
                    <td className="p-3">{lastLogin?.ip || "-"}</td>
                    <td className="p-3 truncate max-w-xs">{lastLogin?.device || "-"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD LIST */}
      <div className="sm:hidden space-y-4">
        {users.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white/80 shadow p-4 text-center text-gray-400 italic">
            No users found
          </div>
        ) : (
          users.map((user) => {
            const lastLogin = getLastLogin(user.id);
            return (
              <div
                key={user.id}
                className="rounded-lg border border-gray-100 bg-white/90 shadow-sm p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-gray-800 text-base">
                    {user.name || "-"}
                  </div>
                  <div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${
                          user.role === "admin"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {user.role || "user"}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 break-all">
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  {user.isOnline ? (
                    <span className="inline-flex items-center gap-1 text-green-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                      Online
                    </span>
                  ) : (
                    <span className="text-gray-400">Offline</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Last Login:</span>{" "}
                  {lastLogin ? formatDate(lastLogin.loginAt) : "-"}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Login IP:</span> {lastLogin?.ip || "-"}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Device:</span> {lastLogin?.device || "-"}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserManagement;
