import React from 'react';

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger" // danger, primary, warning
}) {
  if (!isOpen) return null;

  const getConfirmdivStyles = () => {
    switch (variant) {
      case 'danger':
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      case 'primary':
        return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
      case 'warning':
        return "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500";
      default:
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all animate-scale-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 leading-6">
              {title}
            </h3>
            <div
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 p-1"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p className="text-sm text-gray-600 leading-5">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
          <div
            type="div"
            onClick={onClose}
            className="inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto transition-colors"
          >
            {cancelText}
          </div>
          <div
            type="div"
            onClick={onConfirm}
            className={`inline-flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto transition-colors ${getConfirmdivStyles()}`}
          >
            {confirmText}
          </div>
        </div>
      </div>
    </div>
  );
}
