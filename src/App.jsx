import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Plus, X, Pencil, Trash2 } from 'lucide-react';


const STYLES = {
  listContainer: "w-[272px] bg-[#f1f2f4] rounded-xl shadow-sm flex flex-col max-h-full mx-auto mt-10 text-[#172b4d]",
  header: "px-3 py-3 flex justify-between items-center cursor-pointer",
  headerTitle: "font-semibold text-sm px-2 py-1 w-full border border-transparent focus:bg-white focus:border-[#388bff] focus:inset focus:outline-none rounded-[3px] transition-colors",
  cardList: "px-2 flex flex-col gap-2 overflow-y-auto min-h-[2px]",
  
  card: "bg-white p-2 rounded-lg shadow-sm border border-transparent hover:border-[#388bff] group relative text-sm cursor-pointer hover:bg-[#f8f9fa] text-slate-700 min-h-[36px]",
  cardContent: "leading-snug break-words pr-6", 
  iconGroup: "absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex gap-1 bg-white/80 p-0.5 rounded",
  iconButton: "p-1 hover:bg-[#ebecf0] rounded text-slate-500 hover:text-slate-700 transition-colors",
  composerContainer: "p-2",
  composerInput: "w-full p-2 rounded-lg shadow-sm border-none focus:ring-0 text-sm resize-none overflow-hidden bg-white mb-2",
  footer: "flex items-center gap-1.5 p-2 m-1 rounded-lg hover:bg-[#091e4224] text-[#44546f] cursor-pointer transition-colors duration-100",
  footerText: "text-sm font-medium ml-1",
  actionButton: "bg-[#0c66e4] hover:bg-[#0055cc] text-white font-medium text-sm px-3 py-1.5 rounded-[3px] transition-colors",
  closeButton: "p-1.5 hover:bg-[#091e4224] text-[#44546f] rounded ml-1 cursor-pointer"
};

const MockData = [
  { id: 1, title: "Research user flow for authentication" },
  { id: 2, title: "Draft system architecture diagram" },
  { id: 3, title: "Sync with PM regarding Q3 goals" }
];

export default function App() {
  const [cards, setCards] = useState(MockData);

  
  const [isComposing, setIsComposing] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const [listTitle, setListTitle] = useState("To Do");

 
  const composerRef = useRef(null);
  const editRef = useRef(null);

  
  useEffect(() => {
    if (isComposing && composerRef.current) {
      composerRef.current.focus();
    }
  }, [isComposing]);

  
  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus();
      editRef.current.select(); 
    }
  }, [editingId]);

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: Date.now(),
      title: newCardTitle
    };
    setCards([...cards, newCard]);
    setNewCardTitle("");
    composerRef.current.focus();
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const startEditing = (card) => {
    setEditingId(card.id);
    setEditTitle(card.title);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      
      setEditingId(null);
      return;
    }
    setCards(cards.map(c => c.id === editingId ? { ...c, title: editTitle } : c));
    setEditingId(null);
  };

  // --- KEYBOARD HANDLERS ---

  const handleComposerKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCard();
    } else if (e.key === 'Escape') {
      setIsComposing(false);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0055cc] flex justify-center items-start pt-20 font-sans antialiased">
      <div className={STYLES.listContainer}>

        {/* Header */}
        <div className={STYLES.header}>
          <input
            className={STYLES.headerTitle}
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onFocus={(e) => e.target.select()}
          />
          <div className="p-1 hover:bg-[#091e4224] rounded-md cursor-pointer text-[#44546f]">
            <MoreHorizontal size={16} />
          </div>
        </div>

        {/* Cards Area */}
        <div className={STYLES.cardList}>
          {cards.map((card) => (
            <div key={card.id} className={STYLES.card}>
              {editingId === card.id ? (
                // EDIT MODE
                <div className="relative z-10">
                  <textarea
                    ref={editRef}
                    className="w-full p-0 text-sm border-none focus:ring-0 resize-none bg-transparent"
                    rows={2}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={saveEdit}
                  />
                  <div className="text-xs text-slate-400 mt-1">Press Enter to save</div>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <p
                    className={STYLES.cardContent}
                    onClick={() => startEditing(card)}
                  >
                    {card.title}
                  </p>

                  {/* Hover Actions (Edit / Delete) */}
                  <div className={STYLES.iconGroup}>
                    <button
                      className={STYLES.iconButton}
                      onClick={(e) => { e.stopPropagation(); startEditing(card); }}
                      title="Edit"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      className={`${STYLES.iconButton} hover:text-red-600`}
                      onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }}
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Card Composer */}
        {isComposing ? (
          <div className={STYLES.composerContainer}>
            <textarea
              ref={composerRef}
              className={STYLES.composerInput}
              placeholder="Enter a title for this card..."
              rows={3}
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={handleComposerKeyDown}
            />
            <div className="flex items-center gap-1">
              <button className={STYLES.actionButton} onClick={handleAddCard}>
                Add card
              </button>
              <div className={STYLES.closeButton} onClick={() => setIsComposing(false)}>
                <X size={20} />
              </div>
            </div>
          </div>
        ) : (
          <div className={STYLES.footer} onClick={() => setIsComposing(true)}>
            <Plus size={16} />
            <span className={STYLES.footerText}>Add a card</span>
          </div>
        )}
      </div>
    </div>
  );
}
