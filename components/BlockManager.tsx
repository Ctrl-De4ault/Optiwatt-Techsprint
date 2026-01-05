
import React, { useState, useRef, useEffect } from 'react';
import { Block, Room } from '../types';
import { AppIcon } from './IconMapper';

interface BlockManagerProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  darkMode?: boolean;
}

const Icons = {
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Activity: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  ),
  Calendar: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  ),
  Zap: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  )
};

const ICON_OPTIONS = [
  { id: 'building', label: 'Building' },
  { id: 'campus', label: 'Campus' },
  { id: 'fridge', label: 'Utility' },
  { id: 'light', label: 'Lighting' },
  { id: 'oven', label: 'Server Room' }
];

interface VisualIconSelectProps {
  value: string;
  onChange: (val: string) => void;
  darkMode?: boolean;
  compact?: boolean;
}

const VisualIconSelect: React.FC<VisualIconSelectProps> = ({ value, onChange, darkMode, compact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = ICON_OPTIONS.find(opt => opt.id === value) || ICON_OPTIONS[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between transition-all border outline-none ${
          compact 
            ? `bg-transparent border-none px-0 py-0` 
            : `px-6 py-4 rounded-2xl focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-black/20 border-white/10 text-white hover:border-white/30' : 'bg-gray-50 border-gray-100 text-black hover:border-gray-300'}`
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            <AppIcon name={selectedOption.id} size={compact ? 24 : 18} />
          </div>
          {!compact && <span className="text-sm font-bold">{selectedOption.label}</span>}
        </div>
        {!compact && <div className="opacity-50"><Icons.ChevronDown /></div>}
      </button>

      {isOpen && (
        <div className={`absolute z-[110] w-64 mt-2 rounded-2xl border shadow-2xl animate-in fade-in zoom-in-95 duration-200 ${
          darkMode ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-100'
        } ${compact ? 'left-0' : 'left-0 right-0'}`}>
          <div className="p-2 space-y-1">
            {ICON_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  value === option.id
                    ? (darkMode ? 'bg-white text-black font-black' : 'bg-black text-white font-black')
                    : (darkMode ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black')
                }`}
              >
                <div className={`${value === option.id ? (darkMode ? 'text-black' : 'text-white') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
                  <AppIcon name={option.id} size={18} />
                </div>
                <span className="text-xs font-bold">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BlockManager: React.FC<BlockManagerProps> = ({ blocks, setBlocks, darkMode }) => {
  const [newBlock, setNewBlock] = useState({ name: '', address: '', icon: 'building' });
  const [newRoomName, setNewRoomName] = useState<{ [key: string]: string }>({});
  const [showBlockForm, setShowBlockForm] = useState(false);
  
  // States for Block editing
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState({ name: '', address: '', icon: '' });

  // States for Room actions modal
  const [selectedRoomInfo, setSelectedRoomInfo] = useState<{ blockId: string, room: Room } | null>(null);
  const [isModifyingRoom, setIsModifyingRoom] = useState(false);
  const [modifiedRoomName, setModifiedRoomName] = useState('');
  const [viewingLogs, setViewingLogs] = useState(false);

  const addBlock = () => {
    if (!newBlock.name.trim()) return;
    const block: Block = {
      id: `b-${Date.now()}`,
      name: newBlock.name,
      address: newBlock.address || 'No address set',
      icon: newBlock.icon || 'building',
      rooms: []
    };
    setBlocks([...blocks, block]);
    setNewBlock({ name: '', address: '', icon: 'building' });
    setShowBlockForm(false);
  };

  const deleteBlock = (blockId: string) => {
    if (window.confirm('Are you sure you want to delete this block and all its room definitions?')) {
      setBlocks(blocks.filter(b => b.id !== blockId));
    }
  };

  const startEditing = (block: Block) => {
    setEditingBlockId(block.id);
    setEditFields({ name: block.name, address: block.address, icon: block.icon });
  };

  const saveEdit = () => {
    if (!editFields.name.trim() || !editingBlockId) return;
    setBlocks(blocks.map(b => b.id === editingBlockId ? { 
      ...b, 
      name: editFields.name, 
      address: editFields.address, 
      icon: editFields.icon 
    } : b));
    setEditingBlockId(null);
  };

  const addRoom = (blockId: string) => {
    const roomName = newRoomName[blockId];
    if (!roomName?.trim()) return;
    
    setBlocks(blocks.map(b => {
      if (b.id === blockId) {
        return {
          ...b,
          rooms: [...b.rooms, { id: `r-${Date.now()}`, name: roomName }]
        };
      }
      return b;
    }));
    
    setNewRoomName({ ...newRoomName, [blockId]: '' });
  };

  const updateRoomName = () => {
    if (!selectedRoomInfo || !modifiedRoomName.trim()) return;
    setBlocks(blocks.map(b => {
      if (b.id === selectedRoomInfo.blockId) {
        return {
          ...b,
          rooms: b.rooms.map(r => r.id === selectedRoomInfo.room.id ? { ...r, name: modifiedRoomName } : r)
        };
      }
      return b;
    }));
    setSelectedRoomInfo(null);
    setIsModifyingRoom(false);
  };

  const deleteRoom = (blockId: string, roomId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId) {
        return {
          ...b,
          rooms: b.rooms.filter(r => r.id !== roomId)
        };
      }
      return b;
    }));
    setSelectedRoomInfo(null);
  };

  const getDailyLogs = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const logs = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const usage = (Math.random() * 15 + 2).toFixed(1);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : days[d.getDay()];
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      logs.push({
        day: dayName,
        date: dateStr,
        usage: `${usage} kWh`,
        event: i % 3 === 0 ? 'Optimal efficiency maintained' : i % 2 === 0 ? 'Partial peak usage detected' : 'Standard load cycle',
        trend: Math.random() > 0.5 ? 'up' : 'down'
      });
    }
    return logs;
  };

  const dailyLogs = getDailyLogs();

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>Structure Management</h2>
          <p className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Define and organize your energy blocks, locations, and their respective rooms.</p>
        </div>
        <button 
          onClick={() => setShowBlockForm(!showBlockForm)}
          className={`px-8 py-4 rounded-3xl text-sm font-bold shadow-xl transition-all hover:scale-[1.02] ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          {showBlockForm ? 'Cancel' : 'Create New Block'}
        </button>
      </div>

      {showBlockForm && (
        <div className={`p-8 rounded-[32px] border animate-in slide-in-from-top-4 duration-300 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-xl shadow-black/5'}`}>
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>New Block Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
             <div className="md:col-span-2">
              <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Icon</label>
              <VisualIconSelect 
                value={newBlock.icon}
                onChange={(icon) => setNewBlock({...newBlock, icon})}
                darkMode={darkMode}
              />
            </div>
            <div className="md:col-span-4">
              <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Block Name</label>
              <input 
                type="text" 
                placeholder="e.g. Primary Residence"
                className={`w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-black'}`}
                value={newBlock.name}
                onChange={(e) => setNewBlock({...newBlock, name: e.target.value})}
              />
            </div>
            <div className="md:col-span-4">
              <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Address</label>
              <input 
                type="text" 
                placeholder="e.g. 123 Power St"
                className={`w-full px-6 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-black/20 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-black'}`}
                value={newBlock.address}
                onChange={(e) => setNewBlock({...newBlock, address: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && addBlock()}
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <button 
                onClick={addBlock}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {blocks.map((block) => (
          <div key={block.id} className={`content-card p-10 transition-all relative group overflow-hidden ${darkMode ? 'bg-white/5 border-white/10' : ''}`}>
            {/* Action Toolbar */}
            <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => startEditing(block)}
                className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-black'}`}
                title="Edit Block"
              >
                <Icons.Edit />
              </button>
              <button 
                onClick={() => deleteBlock(block.id)}
                className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-red-900/30 text-gray-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-400 hover:text-red-600'}`}
                title="Delete Block"
              >
                <Icons.Trash />
              </button>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${darkMode ? 'bg-white/10 text-white' : 'bg-gray-50 text-black'}`}>
                {editingBlockId === block.id ? (
                  <VisualIconSelect 
                    compact
                    value={editFields.icon}
                    onChange={(icon) => setEditFields({...editFields, icon})}
                    darkMode={darkMode}
                  />
                ) : (
                  <AppIcon name={block.icon} size={24} />
                )}
              </div>
              <div className="flex-1">
                {editingBlockId === block.id ? (
                  <div className="space-y-3">
                    <input 
                      type="text"
                      autoFocus
                      placeholder="Name"
                      className={`w-full text-xl font-black px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-black'}`}
                      value={editFields.name}
                      onChange={(e) => setEditFields({...editFields, name: e.target.value})}
                    />
                    <input 
                      type="text"
                      placeholder="Address"
                      className={`w-full text-xs font-medium px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${darkMode ? 'bg-black/40 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                      value={editFields.address}
                      onChange={(e) => setEditFields({...editFields, address: e.target.value})}
                    />
                    <div className="flex gap-2">
                       <button onClick={saveEdit} className="flex items-center gap-1 text-xs font-bold text-green-500 hover:scale-105 transition-all bg-green-500/10 px-3 py-1.5 rounded-lg">
                          <Icons.Check /> Save
                       </button>
                       <button onClick={() => setEditingBlockId(null)} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:scale-105 transition-all bg-red-500/10 px-3 py-1.5 rounded-lg">
                          <Icons.X /> Cancel
                       </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-black'}`}>{block.name}</h3>
                    <div className={`flex items-center gap-1.5 text-xs font-bold mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Icons.MapPin />
                      <span>{block.address}</span>
                    </div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-2 ${darkMode ? 'text-blue-400/60' : 'text-blue-600/60'}`}>{block.rooms.length} Rooms defined</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {block.rooms.map((room) => (
                <button 
                  key={room.id} 
                  onClick={() => {
                    setSelectedRoomInfo({ blockId: block.id, room });
                    setModifiedRoomName(room.name);
                    setViewingLogs(false);
                    setIsModifyingRoom(false);
                  }}
                  className={`w-full group/room flex items-center justify-between p-5 rounded-[24px] border transition-all hover:scale-[1.01] active:scale-[0.99] ${darkMode ? 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/20' : 'bg-gray-50 border-gray-100 text-gray-700 hover:bg-white hover:shadow-xl hover:shadow-black/5 hover:border-blue-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                    </div>
                    <span className="font-bold tracking-tight">{room.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${darkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>Active</span>
                    <span className="opacity-0 group-hover/room:opacity-100 transition-opacity text-blue-500">
                      <Icons.ChevronRight />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add room..."
                className={`flex-1 px-4 py-3 text-sm rounded-xl border focus:outline-none transition-all ${darkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-100 text-black'}`}
                value={newRoomName[block.id] || ''}
                onChange={(e) => setNewRoomName({ ...newRoomName, [block.id]: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addRoom(block.id)}
              />
              <button 
                onClick={() => addRoom(block.id)}
                className={`px-4 py-3 rounded-xl font-bold text-sm transition-all ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                Add Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Room Action Modal - Control Center */}
      {selectedRoomInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div 
            className={`w-full max-w-xl rounded-[48px] p-0 shadow-[0_32px_80px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] ${darkMode ? 'bg-slate-900/95 border border-white/10 text-white' : 'bg-white border border-gray-100 text-black'}`}
          >
            {/* Modal Header */}
            <div className={`p-10 pb-6 flex justify-between items-start border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-2xl ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    <AppIcon name="light" size={24} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${darkMode ? 'text-white' : 'text-black'}`}>Room Control Center</span>
                </div>
                <h3 className="text-4xl font-black tracking-tight">{selectedRoomInfo.room.name}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-wider">Live System Connected</span>
                  </div>
                  <span className="text-[10px] font-bold opacity-30">ID: {selectedRoomInfo.room.id}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRoomInfo(null)}
                className={`p-3 rounded-full transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black'}`}
              >
                <Icons.X />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-10 pt-6 space-y-8 custom-scrollbar">
              {!viewingLogs && !isModifyingRoom && (
                <>
                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-6 rounded-[32px] border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <Icons.Zap />
                        <span className="text-[10px] font-black uppercase tracking-widest">Today's Load</span>
                      </div>
                      <div className="text-2xl font-black">4.2 <span className="text-sm font-bold opacity-40">kWh</span></div>
                    </div>
                    <div className={`p-6 rounded-[32px] border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="flex items-center gap-2 mb-2 opacity-50">
                        <Icons.Activity />
                        <span className="text-[10px] font-black uppercase tracking-widest">Efficiency</span>
                      </div>
                      <div className="text-2xl font-black text-emerald-500">92 <span className="text-sm font-bold opacity-40">%</span></div>
                    </div>
                  </div>

                  {/* Main Action Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    <button 
                      onClick={() => setIsModifyingRoom(true)}
                      className={`group flex items-center justify-between p-8 rounded-[36px] border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200'}`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-3xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"><Icons.Edit /></div>
                        <div>
                          <p className="text-lg font-extrabold">Room Identity</p>
                          <p className="text-sm opacity-50 font-medium">Change labels and classification</p>
                        </div>
                      </div>
                      <Icons.ChevronRight />
                    </button>
                    
                    <button 
                      onClick={() => setViewingLogs(true)}
                      className={`group flex items-center justify-between p-8 rounded-[36px] border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200'}`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-3xl bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300"><Icons.Activity /></div>
                        <div>
                          <p className="text-lg font-extrabold">Full Energy Audit</p>
                          <p className="text-sm opacity-50 font-medium">Historical logs and trend analysis</p>
                        </div>
                      </div>
                      <Icons.ChevronRight />
                    </button>

                    <div className={`p-8 rounded-[36px] border border-dashed flex items-center gap-6 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                      <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500"><Icons.Info /></div>
                      <div>
                        <p className="text-sm font-bold">Optimization Available</p>
                        <p className="text-xs opacity-50 font-medium">Switch to Eco-mode to save 12% monthly.</p>
                      </div>
                      <button className="ml-auto text-[10px] font-black uppercase tracking-widest bg-amber-500 text-white px-4 py-2 rounded-xl">Auto-Apply</button>
                    </div>

                    <button 
                      onClick={() => {
                        if(window.confirm('Confirm permanent deletion of this room?')) {
                          deleteRoom(selectedRoomInfo.blockId, selectedRoomInfo.room.id);
                        }
                      }}
                      className={`flex items-center gap-6 p-8 rounded-[36px] border text-left transition-all hover:scale-[1.02] mt-4 ${darkMode ? 'bg-rose-500/5 border-rose-500/10 hover:bg-rose-500/10 text-rose-500' : 'bg-rose-50 border-rose-100 hover:bg-rose-100 text-rose-600'}`}
                    >
                      <div className={`p-4 rounded-3xl ${darkMode ? 'bg-rose-500/10' : 'bg-rose-500/5'}`}><Icons.Trash /></div>
                      <div>
                        <p className="text-lg font-extrabold">Remove Environment</p>
                        <p className="text-sm opacity-50 font-medium">Delete all associated metadata</p>
                      </div>
                    </button>
                  </div>
                </>
              )}

              {isModifyingRoom && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => setIsModifyingRoom(false)} className="p-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <div>
                      <h4 className="text-2xl font-black">Identity Settings</h4>
                      <p className="text-sm opacity-50 font-medium">Update the name of this environment space.</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 ml-2">Display Name</label>
                    <input 
                      type="text"
                      autoFocus
                      className={`w-full px-8 py-6 text-lg font-bold rounded-[28px] border outline-none focus:ring-4 focus:ring-blue-500/20 transition-all ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                      value={modifiedRoomName}
                      onChange={(e) => setModifiedRoomName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && updateRoomName()}
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => setIsModifyingRoom(false)}
                      className={`flex-1 py-5 rounded-3xl font-black text-sm uppercase tracking-widest transition-all ${darkMode ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                    >
                      Back
                    </button>
                    <button 
                      onClick={updateRoomName}
                      className="flex-1 py-5 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all"
                    >
                      Commit Changes
                    </button>
                  </div>
                </div>
              )}

              {viewingLogs && (
                <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => setViewingLogs(false)} className="p-2.5 rounded-2xl hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <div>
                      <h4 className="text-2xl font-black">7-Day Usage Log</h4>
                      <p className="text-sm opacity-50 font-medium uppercase tracking-[0.1em]">{selectedRoomInfo.room.name} Environment</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {dailyLogs.map((log, idx) => (
                      <div key={idx} className={`p-6 rounded-[32px] border transition-all flex flex-col gap-3 group/log ${darkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-100'}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl transition-all duration-300 ${darkMode ? 'bg-blue-500/10 text-blue-400 group-hover/log:bg-blue-500 group-hover/log:text-white' : 'bg-blue-50 text-blue-600 group-hover/log:bg-blue-600 group-hover/log:text-white'}`}>
                              <Icons.Calendar />
                            </div>
                            <div>
                              <p className="text-base font-black tracking-tight">{log.day}</p>
                              <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{log.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-xl font-black ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{log.usage}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-3 mt-1 pt-4 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
                          <div className={`w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] ${log.trend === 'up' ? 'text-orange-500 bg-orange-500' : 'text-emerald-500 bg-emerald-500'}`} />
                          <p className="text-[11px] font-bold opacity-60 leading-tight">{log.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setViewingLogs(false)}
                    className={`w-full py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl transition-all ${darkMode ? 'bg-white text-black hover:bg-gray-200 shadow-white/5' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'}`}
                  >
                    Close Audit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockManager;
