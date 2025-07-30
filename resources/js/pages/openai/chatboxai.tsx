// import { useState, useRef, useEffect } from "react";

// interface Message {
//   role: "user" | "assistant" | "system";
//   content: string;
// }

// export default function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "system",
//       content: "Kamu adalah asisten AI yang hanya membalas menggunakan Bahasa Indonesia. Jangan gunakan bahasa Inggris.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const createAssistantMessage = (content: string): Message => ({
//     role: "assistant",
//     content,
//   });

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input } as Message];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("/openai/chatboxai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
//         },
//         body: JSON.stringify({ messages: newMessages }),
//       });

//       if (!response.ok) {
//         throw new Error("Gagal mengirim pesan");
//       }

//       const data = await response.json();
//       const reply = data.reply || "Maaf, terjadi kesalahan.";

//       setMessages([...newMessages, createAssistantMessage(reply)]);
//     } catch (error) {
//       console.error(error);
//       setMessages([...newMessages, createAssistantMessage("Maaf, terjadi kesalahan di server.")]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !loading) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col max-w-lg mx-auto p-4 shadow-lg rounded-2xl bg-white h-[80vh]">
//       <div className="flex-1 overflow-y-auto space-y-2 p-2">
//         {messages
//           .filter((msg) => msg.role !== "system")
//           .map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-xl max-w-sm ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white self-end ml-auto"
//                   : "bg-gray-100 text-gray-800 self-start mr-auto"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}

//         {loading && (
//           <div className="bg-gray-200 text-gray-600 p-3 rounded-xl max-w-sm self-start mr-auto animate-pulse">
//             Mengetik<span className="dot-animation">...</span>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex mt-2 gap-2">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-xl p-2"
//           placeholder="Tulis pesan..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
//           disabled={loading}
//         >
//           Kirim
//         </button>
//       </div>
//     </div>
//   );
// }

// =========================================================================================

// import { useState, useRef, useEffect } from "react";

// interface Message {
//   role: "user" | "assistant" | "system";
//   content: string;
// }

// export default function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "system",
//       content: "Kamu adalah asisten AI yang hanya membalas menggunakan Bahasa Indonesia. Jangan gunakan bahasa Inggris.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const createAssistantMessage = (content: string): Message => ({
//     role: "assistant",
//     content,
//   });

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages: Message[] = [...messages, { role: "user", content: input }];

//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("/openai/chatboxai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
//         },
//         body: JSON.stringify({ messages: newMessages }),
//       });

//       if (!response.ok) {
//         throw new Error("Gagal mengirim pesan");
//       }

//       const data = await response.json();
//       const reply = sanitizeText(data.reply || "Maaf, terjadi kesalahan.");

//       setMessages([...newMessages, createAssistantMessage(reply)]);
//     } catch (error) {
//       console.error(error);
//       setMessages([...newMessages, createAssistantMessage("Maaf, terjadi kesalahan di server.")]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sanitizeText = (text: string) => {
//     // Hilangkan karakter yang berbahaya (basic sanitizer)
//     const div = document.createElement("div");
//     div.textContent = text;
//     return div.innerHTML;
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !loading) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col w-full max-w-lg mx-auto p-4 shadow-lg rounded-2xl bg-white h-[80vh]">
//       <div className="flex-1 overflow-y-auto space-y-3 p-2">
//         {messages
//           .filter((msg) => msg.role !== "system")
//           .map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-xl max-w-sm whitespace-pre-line break-words ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white self-end ml-auto"
//                   : "bg-gray-100 text-gray-800 self-start mr-auto"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}

//         {loading && (
//           <div className="bg-gray-200 text-gray-600 p-3 rounded-xl max-w-sm self-start mr-auto animate-pulse">
//             Mengetik...
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex mt-3 gap-2">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           placeholder="Tulis pesan..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
//           disabled={loading}
//         >
//           Kirim
//         </button>
//       </div>
//     </div>
//   );
// }
// =======================================================================
// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from 'react-markdown';

// interface Message {
//   role: "user" | "assistant" | "system";
//   content: string;
// }

// export default function ChatBox() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       role: "system",
//       content: "Kamu adalah asisten AI yang hanya membalas menggunakan Bahasa Indonesia. Jangan gunakan bahasa Inggris.",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, loading]);

//   const createAssistantMessage = (content: string): Message => ({
//     role: "assistant",
//     content,
//   });

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages: Message[] = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("/openai/chatboxai", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
//         },
//         body: JSON.stringify({ messages: newMessages }),
//       });

//       if (!response.ok) {
//         throw new Error("Gagal mengirim pesan");
//       }

//       const data = await response.json();
//       const reply = data.reply || "Maaf, terjadi kesalahan.";

//       setMessages([...newMessages, createAssistantMessage(reply)]);
//     } catch (error) {
//       console.error(error);
//       setMessages([...newMessages, createAssistantMessage("Maaf, terjadi kesalahan di server.")]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !loading) {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col max-w-2xl mx-auto p-4 shadow-lg rounded-2xl bg-white h-[80vh]">
//       <div className="flex-1 overflow-y-auto space-y-3 p-2">
//         {messages
//           .filter((msg) => msg.role !== "system")
//           .map((msg, idx) => (
//             <div
//               key={idx}
//               className={`p-3 rounded-xl break-words ${
//                 msg.role === "user"
//                   ? "bg-blue-500 text-white self-end ml-auto"
//                   : "bg-gray-100 text-gray-800 self-start mr-auto"
//               }`}
//             >
//               {msg.role === "assistant" ? (
//                 <div className="prose prose-sm prose-blue">
//                 <ReactMarkdown>{msg.content}</ReactMarkdown>
//               </div>
              
//               ) : (
//                 <span>{msg.content}</span>
//               )}
//             </div>
//           ))}

//         {loading && (
//           <div className="bg-gray-200 text-gray-600 p-3 rounded-xl max-w-xs self-start mr-auto animate-pulse">
//             Mengetik...
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex mt-3 gap-2">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100"
//           placeholder="Tulis pesan..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           disabled={loading}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
//           disabled={loading}
//         >
//           Kirim
//         </button>
//       </div>
//     </div>
//   );
// }
// ===============================================================================================
import { useState, useRef, useEffect } from "react";
import AppLayout from "@/layouts/app-layout";
import ChatBubble from "@/components/ChatBubble";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: "Kamu adalah asisten AI yang hanya membalas menggunakan Bahasa Indonesia.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/chatboxai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-TOKEN":
            document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      const reply = typeof data.reply === "string" ? data.reply : "Maaf, terjadi kesalahan.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Maaf, terjadi kesalahan di server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  // Menampilkan preview gambar
 const url = URL.createObjectURL(file);
setMessages((prev) => [...prev, { role: "user", content: url }]);


  setLoading(true);

  try {
    const res = await fetch("/chatboxai/image", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN":
          document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "",
      },
      body: formData,
    });

    const data = await res.json();
    const reply = data.reply || "Tidak ada balasan dari AI.";
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  } catch {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Terjadi kesalahan saat memproses gambar." },
    ]);
  } finally {
    setLoading(false);
  }
};


  return (
    <AppLayout>
      <div className="flex flex-col w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-4xl mx-auto px-4 py-2 h-[85vh] overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-1 pb-2">
  <div className="flex flex-col min-h-full w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-4xl mx-auto px-2 sm:px-4">
    {messages.filter((msg) => msg.role !== "system").length === 0 && !loading ? (
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
          style={{ textShadow: "0 3px 9px rgba(0,0,0,0.5)" }}
        >
          Classy AI
        </div>
      </div>
    ) : (
      <div className="space-y-3">
        {messages
          .filter((msg) => msg.role === "user" || msg.role === "assistant")
          .map((msg, idx) => (
            <ChatBubble key={idx} role={msg.role as "user" | "assistant"} content={msg.content} />
          ))}
        {loading && <ChatBubble role="assistant" isLoading />}
        <div ref={messagesEndRef} />
      </div>
    )}
  </div>
</div>


        {/* Input area */}
        <div className="flex items-end gap-2 border-t pt-4 mt-4 dark:border-neutral-700">
           <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*"
              hidden
              id="image-upload"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-3 py-2 rounded-md transition dark:bg-neutral-700 dark:hover:bg-neutral-600"
            >
              📷 
            </label>
          </div> 

          <textarea
            rows={1}
            className="flex-1 resize-none max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            placeholder="Tanyakan sesuatu..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition disabled:opacity-50"
            disabled={loading}
          >
            Kirim
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
