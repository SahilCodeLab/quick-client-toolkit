
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Edit } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotesApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const createNote = () => {
    if (title.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setNotes([note, ...notes]);
      setSelectedNote(note.id);
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  };

  const updateNote = () => {
    if (selectedNote && title.trim()) {
      setNotes(notes.map(note =>
        note.id === selectedNote
          ? { ...note, title: title.trim(), content: content.trim(), updatedAt: new Date() }
          : note
      ));
      setIsEditing(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote === id) {
      setSelectedNote(null);
      setTitle('');
      setContent('');
      setIsEditing(false);
    }
  };

  const selectNote = (note: Note) => {
    setSelectedNote(note.id);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const startNewNote = () => {
    setSelectedNote(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const currentNote = selectedNote ? notes.find(note => note.id === selectedNote) : null;

  return (
    <div className="flex h-[600px] gap-6">
      {/* Notes List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-600 pr-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notes</h2>
          <Button onClick={startNewNote} size="sm">
            New Note
          </Button>
        </div>

        <div className="space-y-2 overflow-y-auto h-[500px]">
          {notes.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No notes yet. Create your first note!
            </div>
          ) : (
            notes.map(note => (
              <div
                key={note.id}
                className={`p-3 rounded-lg cursor-pointer border transition-colors ${
                  selectedNote === note.id
                    ? 'bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
                onClick={() => selectNote(note)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800 dark:text-white truncate flex-1">
                    {note.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <X size={14} />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {note.content || 'No content...'}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {note.updatedAt.toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1">
        {selectedNote || isEditing ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {isEditing ? 'New Note' : 'Edit Note'}
              </h3>
              <div className="flex gap-2">
                {!isEditing && currentNote && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                )}
                {isEditing && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        if (currentNote) {
                          setTitle(currentNote.title);
                          setContent(currentNote.content);
                        } else {
                          setSelectedNote(null);
                          setTitle('');
                          setContent('');
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={selectedNote ? updateNote : createNote}
                      disabled={!title.trim()}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <Input
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={!isEditing}
                className="text-lg font-medium"
              />
              <Textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!isEditing}
                className="flex-1 resize-none"
              />
            </div>

            {currentNote && !isEditing && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Created: {currentNote.createdAt.toLocaleString()} | 
                Updated: {currentNote.updatedAt.toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">No note selected</h3>
              <p>Select a note from the list or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesApp;
