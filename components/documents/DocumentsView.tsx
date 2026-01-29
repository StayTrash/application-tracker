'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchDocuments, addDocument, updateDocument, deleteDocument } from '@/lib/store/features/documents/documentsSlice';
import { addToast } from '@/lib/store/features/ui/uiSlice';
import { Document, DocumentType } from '@/types';
import { Plus, FileText, StickyNote, BookOpen, Trash2, Save, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentsView = () => {
    const dispatch = useAppDispatch();
    const { documents } = useAppSelector(state => state.documents);
    const [selectedDocId, setSelectedDocId] = useState<string | null>(documents.length > 0 ? documents[0].id : null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const sortedDocs = [...documents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const selectedDoc = documents.find(d => d.id === selectedDocId) || null;

    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch]);

    useEffect(() => {
        if (!selectedDocId && documents.length > 0) {
            setSelectedDocId(documents[0].id);
        }
    }, [documents, selectedDocId]);

    useEffect(() => {
        if (selectedDoc) {
            setTitle(selectedDoc.title);
            setContent(selectedDoc.content);
        }
    }, [selectedDocId, selectedDoc]);

    const handleCreate = (type: DocumentType) => {
        const newDoc = {
            title: 'Untitled ' + (type === 'cover_letter' ? 'Cover Letter' : type === 'note' ? 'Note' : 'Requirement'),
            content: '',
            type,
        };
        dispatch(addDocument(newDoc));
    };

    const handleSave = () => {
        if (!selectedDocId) return;
        dispatch(updateDocument({
            id: selectedDocId,
            data: { title, content }
        }));
        dispatch(addToast({ message: 'Document saved', type: 'success' }));
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            dispatch(deleteDocument(id));
            if (selectedDocId === id) setSelectedDocId(null);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        dispatch(addToast({ message: 'Copied to clipboard', type: 'success' }));
    };

    const getTypeIcon = (type: DocumentType) => {
        switch (type) {
            case 'cover_letter': return <FileText size={16} className="text-indigo-400" />;
            case 'note': return <StickyNote size={16} className="text-amber-400" />;
            case 'requirement': return <BookOpen size={16} className="text-emerald-400" />;
        }
    };

    return (
        <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-zinc-950">
            {/* Sidebar List */}
            <div className="w-64 border-r border-slate-200 dark:border-zinc-800 flex flex-col bg-white dark:bg-zinc-950">
                <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950">
                    <h2 className="font-semibold text-slate-800 dark:text-zinc-100">Documents</h2>
                    <div className="flex gap-1">
                        <button onClick={() => handleCreate('cover_letter')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title="New Cover Letter"><FileText size={16} /></button>
                        <button onClick={() => handleCreate('note')} className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded text-slate-400 dark:text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="New Note"><StickyNote size={16} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {sortedDocs.map(doc => (
                        <button
                            key={doc.id}
                            onClick={() => setSelectedDocId(doc.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm text-left transition-all ${selectedDocId === doc.id ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-500/20' : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-zinc-200'}`}
                        >
                            {getTypeIcon(doc.type)}
                            <div className="flex-1 truncate font-medium">{doc.title}</div>
                        </button>
                    ))}
                    {sortedDocs.length === 0 && (
                        <div className="text-center p-8 text-slate-400 dark:text-zinc-600 text-xs">No documents yet</div>
                    )}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-zinc-950 relative">
                {selectedDoc ? (
                    <div className="flex flex-col h-full max-w-3xl mx-auto w-full p-8 md:p-12 animate-in fade-in duration-300">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm">
                                {getTypeIcon(selectedDoc.type)}
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-transparent text-2xl md:text-3xl font-bold text-slate-800 dark:text-zinc-100 placeholder:text-slate-300 dark:placeholder:text-zinc-600 outline-none w-full border-none focus:ring-0 p-0"
                                placeholder="Untitled Document"
                            />

                            <div className="flex items-center gap-2">
                                <button onClick={handleSave} className="text-slate-400 dark:text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-2" title="Save Changes">
                                    <Save size={18} />
                                </button>
                                <button onClick={handleCopy} className="text-slate-400 dark:text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2" title="Copy to Clipboard">
                                    <Copy size={18} />
                                </button>
                                <button onClick={() => handleDelete(selectedDoc.id)} className="text-slate-400 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-2" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Editor */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-1 w-full bg-transparent text-slate-700 dark:text-zinc-300 text-base leading-relaxed placeholder:text-slate-300 dark:placeholder:text-zinc-600 resize-none outline-none border-none focus:ring-0 p-0 font-mono"
                            placeholder="Start typing..."
                            spellCheck={false}
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600">
                        <FileText size={48} className="mb-4 opacity-30" />
                        <p>Select a document to view</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentsView;
