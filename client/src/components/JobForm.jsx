import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { extractJobDetails } from '../utils/AI'

const JobForm = ({onAddApplication, onClose}) => {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Applied");
    const [applicationDate, setApplicationDate] = useState(
        new Date().toISOString().split('T')[0]
    );
    const [term, setTerm] = useState("");
    const [portalUrl, setPortalUrl] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // AI features
    const [jobUrl, setJobUrl] = useState("");
    const [isExtracting, setIsExtracting] = useState(false);

    const handleAIExtract = async () => {
        if (!jobUrl) {
            alert('Please enter a job URL first!');
            return;
        }
        
        setIsExtracting(true);
        try {
            const details = await extractJobDetails(jobUrl);
            setCompany(details.company || "");
            setPosition(details.position || "");
            setNotes(details.notes || "");
            setPortalUrl(jobUrl);
        } catch (error) {
            alert('Failed to extract job details. Please try again or fill manually.');
            console.error(error);
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 300));

        const newApplication = {
            company,
            position,
            status,
            applicationDate,
            term,
            portalUrl,
            notes
        };

        onAddApplication(newApplication);

        setCompany("");
        setPosition("");
        setStatus("Applied");
        setApplicationDate(new Date().toISOString().split('T')[0]);
        setTerm("");
        setPortalUrl("");
        setNotes("");
        setJobUrl("");
        setIsSubmitting(false);
    };

    const statusOptions = [
        { value: "Applied", color: "bg-blue-500" },
        { value: "Interview", color: "bg-amber-500" },
        { value: "Offer", color: "bg-green-500" },
        { value: "Rejected", color: "bg-red-500" }
    ];

    const termOptions = [
        "Summer 2026",
        "Fall 2026", 
        "Winter 2027",
        "Spring 2027",
        "Summer 2027",
        "Full-time 2026",
        "Full-time 2027",
        "Other"
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* AI Auto-fill Section */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Quick Fill from URL
                </label>
                
                <div className="flex gap-2">
                    <input
                        type="url"
                        placeholder="Paste job posting URL..."
                        value={jobUrl}
                        onChange={(e) => setJobUrl(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                    />
                    <button
                        type="button"
                        onClick={handleAIExtract}
                        disabled={isExtracting || !jobUrl}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed font-medium text-sm transition-colors"
                    >
                        {isExtracting ? 'Loading...' : 'Extract'}
                    </button>
                </div>
                
                <p className="text-xs text-gray-600 mt-2">
                    Paste a job URL to auto-fill company, position, and details
                </p>
            </div>

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500">or enter manually</span>
                </div>
            </div>

            {/* Company Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Company Name *
                </label>
                <input
                    placeholder="e.g. Google, Meta, Amazon"
                    type='text'
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            {/* Position Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Position Title *
                </label>
                <input 
                    placeholder="e.g. Software Engineer Intern"
                    type='text'
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            {/* Term Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Term <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <select
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                    <option value="">Select a term...</option>
                    {termOptions.map(termOption => (
                        <option key={termOption} value={termOption}>{termOption}</option>
                    ))}
                </select>
            </div>

            {/* Status Select */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {statusOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => setStatus(option.value)}
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                                status === option.value
                                    ? `${option.color} text-white border-transparent`
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {option.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Application Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Application Date *
                </label>
                <input 
                    type="date"
                    value={applicationDate}
                    onChange={(e) => setApplicationDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            {/* Applicant Portal URL */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Portal URL <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <input
                    type="url"
                    value={portalUrl}
                    onChange={(e) => setPortalUrl(e.target.value)}
                    placeholder="https://company.com/careers/applications/123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
            </div>

            {/* Notes Textarea */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='Referrals, requirements, deadlines, etc.'
                    rows="3"
                    maxLength={500}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                    {notes.length}/500 characters
                </p>
            </div>

            {/* Form Buttons */}
            <div className="flex gap-3 pt-4">
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Adding...' : 'Add Application'}
                </button>
                <button 
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default JobForm