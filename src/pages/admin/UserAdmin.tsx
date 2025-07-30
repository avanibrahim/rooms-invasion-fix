import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

type User = {
  id: string;
  name?: string;
  email: string;
  role?: string;
  isOnline?: boolean;
  lastLoginAt?: any;
};

type LoginHistory = {
  id: string;
  userId: string;
  userName?: string;
  userEmail?: string;
  loginAt?: any;
  ip?: string;
  device?: string;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);

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

  const getLastLoginIP = (userId: string) => {
    const history = loginHistory.find((log) => log.userId === userId);
    return history ? history.ip || "-" : "-";
  };

  const getLastLoginDevice = (userId: string) => {
    const history = loginHistory.find((log) => log.userId === userId);
    return history ? history.device || "-" : "-";
  };

  return (
    <div className="max-w-full px-2 sm:px-6 md:px-0 py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-100 tracking-tight text-left md:text-left">
        User Management
      </h2>
      {/* DESKTOP TABLE */}
      <div className="hidden sm:block rounded-xl border border-gray-100 bg-white/80 shadow-md overflow-x-auto">
        <table className="min-w-[800px] w-full text-[13px] md:text-sm">
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
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="p-3">{user.name || "-"}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${user.role === "admin"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600"}
                    `}>
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
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-3">
                    {user.lastLoginAt
                      ? new Date(user.lastLoginAt.seconds * 1000).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-3">{getLastLoginIP(user.id)}</td>
                  <td className="p-3">{getLastLoginDevice(user.id)}</td>
                </tr>
              ))
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
          users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border border-gray-100 bg-white/90 shadow-sm p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-gray-800 text-base">
                  {user.name || "-"}
                </div>
                <div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${user.role === "admin"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-100 text-gray-600"}
                    `}>
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
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt.seconds * 1000).toLocaleString()
                  : "-"}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Login IP:</span> {getLastLoginIP(user.id)}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Device:</span> {getLastLoginDevice(user.id)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;
