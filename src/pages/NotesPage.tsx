import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { SquarePlus } from 'lucide-react'
import '../index.css'
import { useAppSelector, useAppDispatch } from '../hooks/rtkHook'
import Note from '../components/Note'
import Modal from '../components/Modal';
import { addNote } from '../features/notesSlice';


function NotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  console.log("Notes:", notes);


  const handleNoteAdd = () => {
    if (!inputRef.current?.value && !textareRef.current?.value) {
      alert('Please provide a title or content for the note.');
      return;
    }
    const newNote = {
      id: crypto.randomUUID(), // Generate a unique ID for the note
      title: inputRef.current?.value || 'Untitled',
      content: textareRef.current?.value || 'No content provided',
    };

    try {
      dispatch(addNote(newNote));
      toast.success('Note added successfully!');
    } catch (error) {
      toast.error('Failed to add note');
    }
    setIsModalOpen(false); // Close the modal after adding the note
  };
  
  return (
 <>
 <div className='header w-full h-[10dvh] flex justify-between items-center p-4 bg-gray-900 text-white '>
 <div><img src="https://www.macworld.com/wp-content/uploads/2024/05/notes-icon.png?w=1024" alt="notes-image" className='w-12 h-8' /></div>
 <h1 className='text-3xl font-bold'>Notes</h1>
 <button type="button" title="Add Note" onClick={()=>setIsModalOpen(true)}>
 <SquarePlus />
 </button>
 </div>
 <div className='w-full h-[85dvh] content flex flex-wrap  justify-center p-2 gap-2 overflow-auto hide-scrollbar' ref={containerRef}>{
  notes.map((note) => <Note key={note.id} id={note.id} content={note.content} title={note.title} />)
  }</div>
  <div className='add-note-modal'>
    {isModalOpen && ( <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className="w-[80dvw] h-[80dvh] flex justify-center items-center overflow-auto hide-scrollbar"> 
      <div className='flex flex-col justify-center items-center w-full '>
        <h1 className='text-2xl font-bold'>Add New Note</h1>
        <input type="text" ref={inputRef} placeholder="Title" className='border-2 border-gray-300 rounded-md p-2 m-2 w-1/2' />
        <textarea ref={textareRef} placeholder="Content" className='border-2 border-gray-300 rounded-md p-2 m-2 w-1/2 min-h-12 max-h-60 hide-scrollbar'  ></textarea>
        <button type="button" onClick={() => handleNoteAdd()} className='bg-blue-500 text-white rounded-md p-2'>Add Note</button>
      </div>
    </Modal>)}
    
    {/* Add your modal component here */}
  </div>
 <div className='footer absolute bottom-0 left-0 bg-amber-400 w-full h-[5dvh] flex justify-center items-center'>
  <p className='text-sm'>Made with ❤️ by <a href="https://www.linkedin.com/in/devazeem/" className='text-blue-500' target="_blank" rel='noopener'>Mohd Azeem Malik</a></p>
  <p className='text-sm'>© {year}</p>
 </div>
 </>
  )
}

export default NotesPage