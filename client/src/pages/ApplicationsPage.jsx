import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import JobForm from '../components/JobForm'
import JobCard from '../components/JobCard'
import { IoStatsChart } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import { GrPersonalComputer } from "react-icons/gr";
import { MdCelebration } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";

const ApplicationsPage = () => {
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem('jobApplications');
        return saved ? JSON.parse(saved) : [];
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterTerm, setFilterTerm] = useState('all');

    useEffect(() => {
        localStorage.setItem('jobApplications', JSON.stringify(applications));
    }, [applications]);

    const addApplication = (newApplication) => {
        const applicationWithId = {
            id: Date.now(),
            ...newApplication
        };
        setApplications([...applications, applicationWithId]);
        setIsModalOpen(false);
    };

    const deleteApplication = (id) => {
        setApplications(applications.filter((app) => app.id !== id));
    };

    const updateApplication = (id, newStatus) => {
        const updatedApplications = applications.map((app) => {
            if(app.id === id){
                return {...app, status: newStatus};
            }
            return app;
        });
        setApplications(updatedApplications);
    };

    const uniqueTerms = [...new Set(applications.map(app => app.term).filter(Boolean))].sort();

    const stats = {
        total: applications.length,
        applied: applications.filter(app => app.status === 'Applied').length,
        interview: applications.filter(app => app.status === 'Interview').length,
        offer: applications.filter(app => app.status === 'Offer').length,
        rejected: applications.filter(app => app.status === 'Rejected').length,
    };

    const filteredApplications = applications.filter(app => {
        const statusMatch = filterStatus === 'all' || app.status === filterStatus;
        const termMatch = filterTerm === 'all' || app.term === filterTerm;
        return statusMatch && termMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">
                        Applications
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Track and manage your internship or job applications!
                    </p>
                </motion.div>

                {/* Stats Cards */}
                {/* Stats Cards */}
<motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-10"
>
    <StatCard 
        label="Total" 
        value={stats.total} 
        icon={<IoStatsChart />}
        color="emerald"
        onClick={() => setFilterStatus('all')}
        isActive={filterStatus === 'all'}
    />
    <StatCard 
        label="Applied" 
        value={stats.applied} 
        icon={<BsFillSendFill />}
        color="blue"
        onClick={() => setFilterStatus('Applied')}
        isActive={filterStatus === 'Applied'}
    />
    <StatCard 
        label="Interview" 
        value={stats.interview} 
        icon={<GrPersonalComputer />}
        color="amber"
        onClick={() => setFilterStatus('Interview')}
        isActive={filterStatus === 'Interview'}
    />
    <StatCard 
        label="Offers" 
        value={stats.offer} 
        icon={<MdCelebration />}
        color="green"
        onClick={() => setFilterStatus('Offer')}
        isActive={filterStatus === 'Offer'}
    />
    <StatCard 
        label="Rejected" 
        value={stats.rejected} 
        icon={<FaXmark />}
        color="red"
        onClick={() => setFilterStatus('Rejected')}
        isActive={filterStatus === 'Rejected'}
    />
</motion.div>

                {/* Action Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4 mb-8"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-lg transition-colors font-semibold shadow-sm flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Application
                        </motion.button>

                        {uniqueTerms.length > 0 && (
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium text-gray-700">
                                    Term:
                                </label>
                                <select
                                    value={filterTerm}
                                    onChange={(e) => setFilterTerm(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-medium text-gray-700"
                                >
                                    <option value="all">All Terms</option>
                                    {uniqueTerms.map(term => (
                                        <option key={term} value={term}>{term}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    {/* Active Filters */}
                    {(filterStatus !== 'all' || filterTerm !== 'all') && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-wrap items-center gap-2"
                        >
                            <span className="text-sm font-medium text-gray-600">Filters:</span>
                            {filterStatus !== 'all' && (
                                <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-sm font-medium">
                                    {filterStatus}
                                    <button
                                        onClick={() => setFilterStatus('all')}
                                        className="hover:bg-emerald-200 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {filterTerm !== 'all' && (
                                <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-sm font-medium">
                                    {filterTerm}
                                    <button
                                        onClick={() => setFilterTerm('all')}
                                        className="hover:bg-emerald-200 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setFilterStatus('all');
                                    setFilterTerm('all');
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Clear all
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        >
                            <motion.div 
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden"
                            >
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-900">
                                            New Application
                                        </h2>
                                        <button 
                                            onClick={() => setIsModalOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 text-2xl"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                                    <JobForm 
                                        onAddApplication={addApplication}
                                        onClose={() => setIsModalOpen(false)}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Applications Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {filterStatus === 'all' && filterTerm === 'all' 
                            ? `All Applications (${filteredApplications.length})` 
                            : `Filtered Results (${filteredApplications.length})`}
                    </h2>
                    
                    {filteredApplications.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-16 text-center border border-gray-200">
                            <div className="text-6xl mb-4"></div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No applications found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filterStatus !== 'all' || filterTerm !== 'all'
                                    ? 'Try adjusting your filters' 
                                    : 'Add your first application to get started'}
                            </p>
                            {filterStatus === 'all' && filterTerm === 'all' && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Add Application
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredApplications.map((app) => (
                                    <JobCard 
                                        key={app.id}
                                        application={app}
                                        onDelete={deleteApplication}
                                        onUpdate={updateApplication}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}

const StatCard = ({ label, value, icon, color, onClick, isActive }) => {
    const colors = {
        emerald: 'bg-emerald-500 text-white',
        blue: 'bg-blue-500 text-white',
        amber: 'bg-amber-500 text-white',
        green: 'bg-green-500 text-white',
        red: 'bg-red-500 text-white'
    };

    return (
        <motion.button 
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`text-left bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 ${
                isActive ? 'border-emerald-500' : 'border-transparent'
            }`}
        >
            <div className="flex items-center justify-between mb-2">
                <div className={`${colors[color]} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>
                    {icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {value}
                </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-gray-600">
                {label}
            </p>
        </motion.button>
    );
};

export default ApplicationsPage