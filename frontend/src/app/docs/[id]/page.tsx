"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, House, Bold, Italic, List, ListOrdered, Sparkle, Undo, Send, FileUp } from "lucide-react";
import { apiClient } from "@/lib/clients/api-client";
import { useDocContent } from "@/features/docs/hooks/use-doc-content";

import jsPDF from "jspdf";

interface ParamProps {
    params: {
        id: string;
    };
}


export default function App(props: ParamProps) {
    const docId = props.params.id;

    const docContent = useDocContent({ docId: docId });

    const editorRef = useRef<HTMLDivElement | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [editorHistory, setEditorHistory] = useState<string[]>([]); // Stack to store history of editor content
    const [messageInput, setMessageInput] = useState(""); // State to capture input

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.innerHTML);
        }
    };



    const insertHelloWorld = () => {
        if (editorRef.current) {
            const selection = window.getSelection();
            if (selection?.rangeCount) {
                const range = selection.getRangeAt(0);
                range.deleteContents();
                const helloWorldNode = document.createTextNode("Hello World");
                range.insertNode(helloWorldNode);
            }
        }
    };

    const handleBold = () => {
        document.execCommand("bold");
    };

    const handleItalic = () => {
        document.execCommand("italic");
    };


const handlePDFUpload = async () => {
    if (editorRef.current) {
        // Get content from the editor
        const content = editorRef.current.innerHTML;

        // Generate PDF using jsPDF
        const doc = new jsPDF();
        doc.html(content, {
            callback: (pdf) => {
                // Convert the PDF to a Blob
                const pdfBlob = pdf.output("blob");

                // Create FormData
                const formData = new FormData();
                formData.append("content", pdfBlob, "document.pdf");
                formData.append("title", "Document");
                formData.append("is_public", "true");

                // Upload PDF to the server
                apiClient(`/api/stories/docs/`, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        alert("PDF uploaded successfully!");
                        docContent.refetch(); // Refresh content
                    })
                    .catch((error) => {
                        console.error("Error uploading PDF:", error);
                        alert("Failed to upload PDF.");
                    });
            },
        });
    } else {
        alert("Editor content is empty.");
    }
};


    const handleRefine = () => {
        const res = apiClient(`/api/stories/docs/${docId}/refine/`);

        if (res) {
            docContent.refetch();
            setMessages((prevMessages) => [...prevMessages, `Chatbot: Refined to proper Benglai.`]);
        }
    };

    // Handle focus and blur events
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = async () => {
        setIsFocused(false);
        // save the content
        const saveRes = await apiClient(`/api/stories/docs/${docId}/`, {
            method: "PATCH",
            body: JSON.stringify({
                content: editorRef.current?.innerHTML,
            }),
        });

        if (saveRes) {
            docContent.refetch();
        }
    };

    // Toggle the sidebar visibility (for chatbot)
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Undo action (both editor and chatbot)
    const undoAction = () => {
        if (editorHistory.length > 0) {
            const previousState = editorHistory.pop();
            setEditorHistory([...editorHistory]); // Update state without mutating
            if (editorRef.current && previousState) {
                editorRef.current.innerHTML = previousState; // Set the content back to previous state
            }
        }
    };

    // Handle Chatbot commands and update the editor
    const handleChatbotResponse = async (message: string) => {
        setMessages((prevMessages) => [...prevMessages, `You: ${message}`]);


        const currentMessage = editorRef.current?.innerHTML;
        const saveRes = await apiClient(`/api/stories/docs/${docId}/`, {
            method: "PATCH",
            body: JSON.stringify({
                content: currentMessage,
            }),
        });

        if (!saveRes) {
            alert("You don't have permission to chat with the AI.");
        }

        const res = await apiClient(`/api/stories/docs/${docId}/ai/`, {
            method: "POST",
            body: JSON.stringify({
                command: message,
            }),
        });

        if (!res) {
            setMessages((prevMessages) => [...prevMessages, `Chatbot: "Sorry, I didn't understand that."`]);
            return;
        }

        docContent.refetch();

        
        
        if (editorRef.current) {
            setEditorHistory((prev) => [...prev, editorRef.current.innerHTML]); // Save the editor's current state for undo
            editorRef.current.innerHTML += `<p>${message}</p>`; // Append the message as new content
        }
        setMessages((prevMessages) => [...prevMessages, `Chatbot: Done.`]);

    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            handleChatbotResponse(messageInput); // Send message to chatbot
            setMessageInput(""); // Clear the input after sending
        }
    };

    // Listen for the Ctrl+Z event to trigger undo
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "z") {
                undoAction();
            }
        };

        // Add event listener for keydown event (for undo)
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [editorHistory]);

    useEffect(() => {
        console.log('docId', docId);
        if (docContent.data) {
            if (editorRef.current) {
                editorRef.current.innerHTML = docContent.data.content;
            }
        }
    }, [docContent]);

    return (
        <div className="relative overflow-y-auto">
            {/* Header */}
            <div className="w-full fixed top-18 bg-white h-10 flex items-center p-5 text-gray-800 gap-5 z-10">
                <House size={15} />
                <ChevronRight size={12} />
                Untitled
                <Sparkle
                    size={15}
                    color={"purple"}
                    className="ml-auto cursor-pointer"
                    onClick={toggleSidebar} // Toggle sidebar visibility
                />
            </div>

            {/* Main content */}
            <div className="flex w-full mt-20 mb-20">
                {/* Editor and Toolbar container */}
                <div
                    className={`ml-10 w-full flex flex-row transition-all duration-300 ${isSidebarOpen ? "md:w-3/5" : "md:w-4/5"}`}
                >

                    <div
                        ref={editorRef}
                        contentEditable
                        suppressContentEditableWarning
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`min-h-[500px] w-full bg-white outline-none text-gray-800 p-20 rounded-xl ${isFocused ? "border-2 border-blue-500" : "border-2 border-gray-300"
                            }`}
                        style={{
                            backgroundColor: "#f9f9f9",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        Start typing...
                    </div>

                    {/* Toolbar */}



                </div>

                {/* Sidebar (AI Chatbot) */}
                <div>
                    <div className="bg-white fixed ml-5 top-40 shadow-lg p-1 rounded-md flex flex-col gap-2">
                        <button
                            className="p-1 text-slate-500 rounded hover:bg-slate-500/15"
                            onClick={handleBold}
                        >
                            <Bold size={20} />
                        </button>
                        <button
                            className="p-1 text-slate-500 rounded hover:bg-slate-500/15"
                            onClick={handleItalic}
                        >
                            <Italic size={20} />
                        </button>
                        <button
                            className="p-1 text-slate-500 rounded hover:bg-slate-500/15"
                            onClick={handleRefine}
                        >
                            অ
                        </button>
                        <button
                            className="p-1 text-slate-500 rounded hover:bg-slate-500/15"
                            onClick={handlePDFUpload}
                        >
                            <FileUp size={17} />
                        </button>
                    </div>
                    <div
                        className={`mt-32 transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                            } fixed top-0 right-0 w-80 bg-white shadow-lg p-5 overflow-y-auto h-full z-20`}
                        style={{
                            height: "80vh", // Full height for the sidebar
                        }}
                    >
                        <h2 className="text-xl font-bold">AI Chatbot</h2>
                        <div className="mt-4">Chat with your AI assistant!</div>

                        {/* Messages */}
                        <div className="flex flex-col gap-2 mt-4">
                            {messages.map((msg, index) => (
                                <div key={index}>{msg}</div>
                            ))}
                        </div>

                        {/* Chatbot Response Input */}
                        <div className="fixed bottom-10 flex gap-2 items-center">

                            <div className="">
                                <textarea
                                    placeholder="Type your message..."
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)} // Bind the input state
                                />
                            </div>

                            {/* Send Button */}
                            <div className="">
                                <button
                                    onClick={handleSendMessage} // Trigger message send
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    <Send />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
