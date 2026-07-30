"use client";

import { useEffect, useState } from "react";
import { Inbox, Search, Mail, Trash2, CheckCircle, Archive, MessageSquare } from "lucide-react";

interface MessageItem {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  projectDetails: string;
  status: string;
  createdAt: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMsg, setSelectedMsg] = useState<MessageItem | null>(null);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/contact?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [search]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg({ ...selectedMsg, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/contact?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMsg?.id === id) setSelectedMsg(null);
      }
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold font-[var(--font-lato)] text-white">
          Client Inquiries Inbox
        </h1>
        <p className="text-xs text-[#8e8e93] font-[var(--font-inter)] mt-1">
          Review project inquiries submitted through your website contact forms
        </p>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-[#121826]/70 border border-white/10 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e8e93]" />
          <input
            type="text"
            placeholder="Search by name, email, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#090b0e] border border-white/10 rounded-xl text-white text-xs placeholder-[#71717a] focus:outline-none focus:border-[#06ACFE]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-5 rounded-2xl bg-[#121826]/70 border border-white/10 overflow-hidden p-4 space-y-3">
          {isLoading ? (
            <div className="py-16 text-center text-[#8e8e93]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06ACFE] mx-auto mb-4" />
              <span>Loading messages...</span>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-sm text-[#8e8e93] text-center py-12">
              No inquiries found in inbox.
            </p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMsg(msg);
                  if (msg.status === "UNREAD") updateStatus(msg.id, "READ");
                }}
                className={`p-4 rounded-xl cursor-pointer border transition-all ${
                  selectedMsg?.id === msg.id
                    ? "bg-[#06ACFE]/10 border-[#06ACFE]"
                    : "bg-[#090b0e]/60 border-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-white font-[var(--font-lato)]">
                    {msg.fullName}
                  </span>
                  {msg.status === "UNREAD" && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                      UNREAD
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8e8e93] line-clamp-2">
                  {msg.projectDetails}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#71717a] mt-3">
                  <span>{msg.email}</span>
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Selected Message Detail Column */}
        <div className="lg:col-span-7 rounded-2xl bg-[#121826]/70 border border-white/10 p-6 flex flex-col justify-between">
          {!selectedMsg ? (
            <div className="py-24 text-center text-[#8e8e93] flex flex-col items-center justify-center">
              <MessageSquare className="w-12 h-12 mb-3 text-[#06ACFE]/40" />
              <p className="text-base font-bold text-white mb-1">
                Select an Inquiry
              </p>
              <p className="text-xs">
                Click on any client inquiry on the left to read full details
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Detail Header */}
              <div className="flex items-start justify-between pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-extrabold font-[var(--font-lato)] text-white">
                    {selectedMsg.fullName}
                  </h2>
                  <p className="text-xs text-[#06ACFE] font-medium mt-1">
                    {selectedMsg.email} {selectedMsg.whatsapp !== "Not provided" ? `• WhatsApp: ${selectedMsg.whatsapp}` : ""}
                  </p>
                  <span className="text-[11px] text-[#71717a] mt-1 block">
                    Received: {new Date(selectedMsg.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(selectedMsg.id, "ARCHIVED")}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8e8e93] hover:text-white transition-colors"
                    title="Archive"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detail Content */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8e8e93] mb-3 font-[var(--font-lato)]">
                  Project Inquiry Details
                </h3>
                <div className="p-4 rounded-xl bg-[#090b0e] border border-white/5 text-sm text-[#9ea3ae] leading-relaxed whitespace-pre-wrap font-[var(--font-inter)]">
                  {selectedMsg.projectDetails}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: Your Inquiry to Sajib`}
                  className="px-6 py-3 rounded-xl bg-[#06ACFE] hover:bg-[#0098e6] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(6,172,254,0.35)]"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
