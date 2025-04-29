import {useState, useRef} from 'react'
import { toast } from 'react-toastify';
import { Trash2, Pencil } from 'lucide-react'
import { useAppDispatch } from '../hooks/rtkHook'
import { deleteNote, updateNote } from '../features/notesSlice.ts';
import Modal from './Modal';
import { useConfirmDialog } from "./ConfirmDialog";



function Note({title, content, id}: {title: string, content: string, id: string}) {
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const dispatch = useAppDispatch();

    const { openConfirm, ConfirmDialog } = useConfirmDialog();

    const handleDelteConfirmation = () => {
        openConfirm({
            title: "Delete File",
            message: "Are you sure you want to permanently delete this file?",
            confirmText: "Delete",
            cancelText: "Cancel",
            onConfirm: () => handleDeleteNote(),
          });
    }
    const handleDeleteNote = () => {
        try {
            dispatch(deleteNote(id));
            toast.info('Note deleted successfully!');
          } catch (err) {
            toast.error('Failed to delete note');
          }
        setIsNoteOpen(false);
    }

    const handleUpdateNote = () => {
        if (titleRef.current && contentRef.current) {
            const updatedNote = {
                id,
                title: titleRef.current.innerText,
                content: contentRef.current.innerText,
            };
            try {
                dispatch(updateNote(updatedNote));
                toast.success('Note updated successfully!');
              } catch (err) {
                toast.error('Failed to update note');
              }
            setIsEditing(false);
        }
    }    


    const handleUpdateCancel = () => {
        setIsEditing(false);
        if (titleRef.current) {
            titleRef.current.innerText = title;
        }
        if (contentRef.current) {
            contentRef.current.innerText = content;
        }
    }

  // This component is used to display a content with a title and a content text.
  return (
    <>
    <div key={id} onClick={()=>setIsNoteOpen(true)} className="w-full sm:w-[45%] md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/6
                 h-28 md:h-32 lg:h-36 xl:h-40 2xl:h-44
                 rounded-md bg-yellow-300 text-gray-900 
                 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
    >
        <div className='flex flex-col justify-start h-full p-2  '>
            <h1 className='text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{title}</h1>
            <p className="text-sm pt-4 pb-4 break-words line-clamp-2">{content}</p>
        </div>
    </div>
    {isNoteOpen && (<Modal isOpen={isNoteOpen} onClose={() => setIsNoteOpen(false)} className="w-[80dvw] h-[80dvh] flex justify-center items-center">
    <div className=' p-2  '>
            <h1 ref={titleRef}
          contentEditable={isEditing} suppressContentEditableWarning className='text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis' >{title}</h1>
            <p ref={contentRef}
          contentEditable={isEditing}
          suppressContentEditableWarning className="text-sm pt-4 pb-4 break-words line-clamp-2">{content}</p>
        </div>
        <div className='note-footer absolute bottom-0 left-0 w-full h-12  bg-gray-400'>
            <div className='flex justify-between items-center h-full p-2'>
            {isEditing ? (
            <div className='flex gap-2'>
            <button type="button" onClick={handleUpdateNote} className='bg-green-500 text-white rounded-md p-2'>Save</button>
            <button type="button" onClick={handleUpdateCancel} className='bg-red-500 text-white rounded-md p-2'>Cancel</button>
            </div>
          ) : (
            <button title='Edit Note' type="button" onClick={() => setIsEditing(true)} className='bg-blue-500 text-white rounded-md p-2'>
              <Pencil />
            </button>
          )}
                <button title='Delete Note' type="button" className='bg-red-500 text-white rounded-md p-2' onClick={()=>handleDelteConfirmation()}>{ConfirmDialog}<Trash2 /></button>
            </div>
        </div>
         </Modal>)}

    </>
  )
}

export default Note