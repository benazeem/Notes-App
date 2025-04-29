import React from 'react';
import { CircleX } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50 `}
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-lg p-6 relative ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                    title="Close Modal"
                >
                    <CircleX />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;