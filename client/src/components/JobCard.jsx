

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateCoverLetter } from '../utils/AI'

const JobCard = ({application, onDelete, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    // Cover letter state
    const [showCoverLetter, setShowCoverLetter] = useState(false);
    const [coverLetter, setCoverLetter] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleStatusChange = (newStatus) => {
        onUpdate(application.id, newStatus);
    };

    const handleDelete = () => {
        onDelete(application.id);
        setShowDeleteConfirm(false);
    };

    const handleGenerateCoverLetter = async () => {
        setIsGenerating(true);
        try {
            const letter = await generateCoverLetter(
                application.company,
                application.position,
                application.notes,
                "Computer Science junior at St. John's University, seeking Summer 2026 SWE internship"
            );
            setCoverLetter(letter);
            setShowCoverLetter(true);
        } catch (error) {
            alert('Failed to generate cover letter. Please try again.');
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const statusConfig = {
        Applied: { 
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
            borderColor: "border-blue-200",
            dotColor: "bg-blue-500"
        },
        Interview: { 
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
            borderColor: "border-amber-200",
            dotColor: "bg-amber-500"
        },
        Offer: { 
            bgColor: "bg-green-50",
            textColor: "text-green-700",
            borderColor: "border-green-200",
            dotColor: "bg-green-500"
        },
        Rejected: { 
            bgColor: "bg-red-50",
            textColor: "text-red-700",
            borderColor: "border-red-200",
            dotColor: "bg-red-500"
        }
    };

    const currentStatus = statusConfig[application.status];
    const daysAgo = Math.floor((new Date() - new Date(application.applicationDate)) / (1000 * 60 * 60 * 24));

    return (
        <>
            <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
                {/* Header */}
                <div className="p-5 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {application.company}
                            </h3>
                            <p className="text-gray-600 font-medium">
                                {application.position}
                            </p>
                        </div>
                        
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${currentStatus.bgColor} ${currentStatus.textColor}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dotColor}`}></span>
                            {application.status}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-500">
                        {daysAgo === 0 ? 'Applied today' : daysAgo === 1 ? 'Applied yesterday' : `Applied ${daysAgo} days ago`}
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    {/* Term Badge */}
                    {application.term && (
                        <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {application.term}
                        </div>
                    )}

{/* Portal Link */}
{application.portalUrl && (
    <a
        href={application.portalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex text-sm text-emerald-600 hover:text-emerald-700 font-medium items-center gap-2"
    >
        View Application Portal
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
    </a>
)}

                    {/* Notes Section */}
                    {application.notes && (
                        <div>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-2"
                            >
                                <svg 
                                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                Notes
                            </button>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        key="notes"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-gray-50 border-l-2 border-emerald-500 p-3 rounded text-sm text-gray-700">
                                            {application.notes}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Status Update */}
                    <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            Update Status
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <button
                                    key={status}
                                    onClick={() => handleStatusChange(status)}
                                    className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                                        application.status === status
                                            ? `${config.bgColor} ${config.textColor} ${config.borderColor} border-2`
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Cover Letter Button */}
                    <button
                        onClick={handleGenerateCoverLetter}
                        disabled={isGenerating}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
                    </button>

                    {/* Delete Button */}
                    <AnimatePresence mode="wait">
                        {!showDeleteConfirm ? (
                            <motion.button
                                key="delete-button"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg font-medium transition-colors text-sm"
                            >
                                Delete
                            </motion.button>
                        ) : (
                            <motion.div
                                key="delete-confirm"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="bg-red-50 border border-red-200 rounded-lg p-3"
                            >
                                <p className="text-sm font-medium text-red-700 mb-2 text-center">
                                    Delete this application?
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-md text-sm font-medium border border-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Cover Letter Modal */}
            <AnimatePresence>
                {showCoverLetter && (
                    <motion.div
                        key="cover-letter-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCoverLetter(false)}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Cover Letter
                                    </h2>
                                    <button
                                        onClick={() => setShowCoverLetter(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="mb-4 pb-4 border-b border-gray-200">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">{application.position}</span> at <span className="font-semibold">{application.company}</span>
                                    </p>
                                </div>

                                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed mb-6">
                                    {coverLetter}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(coverLetter);
                                            alert('Copied to clipboard!');
                                        }}
                                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
                                    >
                                        Copy to Clipboard
                                    </button>
                                    <button
                                        onClick={() => setShowCoverLetter(false)}
                                        className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default JobCard