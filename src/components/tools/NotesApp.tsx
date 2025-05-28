
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    if (!title.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setTitle('');
    setContent('');
    setIsEditing(false);
  };

  const updateNote = () => {
    if (!selectedNote || !title.trim()) return;

    const updatedNotes = notes.map(note =>
      note.id === selectedNote.id
        ? { ...note, title: title.trim(), content: content.trim(), updatedAt: new Date() }
        : note
    );

    setNotes(updatedNotes);
    setSelectedNote({ ...selectedNote, title: title.trim(), content: content.trim(), updatedAt: new Date() });
    setIsEditing(false);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    } else {
      setTitle('');
      setContent('');
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Notes App
      </h2>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Notes ({notes.length})
            </h3>
            <Button
              onClick={() => {
                setSelectedNote(null);
                setTitle('');
                setContent('');
                setIsEditing(true);
              }}
              size="sm"
            >
              New Note
            </Button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notes.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No notes yet. Create your first note!
              </div>
            ) : (
              notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => selectNote(note)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedNote?.id === note.id
                      ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500'
                      : 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-white truncate">
                        {note.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {note.content || 'No content'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {note.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Note Editor */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
          {!selectedNote && !isEditing ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <h3 className="text-xl font-medium mb-2">Welcome to Notes</h3>
              <p>Select a note to view or create a new one to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {isEditing ? (selectedNote ? 'Edit Note' : 'New Note') : 'View Note'}
                </h3>
                <div className="flex gap-2">
                  {!isEditing && selectedNote && (
                    <Button onClick={startEditing} variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                  {isEditing && (
                    <>
                      <Button onClick={cancelEditing} variant="outline" size="sm">
                        Cancel
                      </Button>
                      <Button
                        onClick={selectedNote ? updateNote : createNewNote}
                        size="sm"
                        disabled={!title.trim()}
                      >
                        {selectedNote ? 'Update' : 'Create'}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing your note..."
                  rows={12}
                  disabled={!isEditing}
                />
              </div>

              {selectedNote && !isEditing && (
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-600">
                  Created: {selectedNote.createdAt.toLocaleString()} | 
                  Last updated: {selectedNote.updatedAt.toLocaleString()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesApp;
