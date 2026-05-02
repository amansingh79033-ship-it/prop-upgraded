import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Loader2, Download, ShieldCheck, TrendingUp, Building, Scale, Landmark, AlertTriangle, FileCheck } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface RegulatoryData {
  projectName: string;
  rera: any;
  bda: any;
  bankApprovals: any[];
  litigations: any;
  environmental: any;
  fireSafety: any;
  amenities: any;
  construction: any;
}

// Simulate regulatory data fetching
const fetchRegulatoryData = async (projectName: string): Promise<RegulatoryData> => {
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  return {
    projectName,
    rera: {
      number: `RERA/2024/${Math.floor(Math.random() * 10000)}`,
      status: Math.random() > 0.2 ? 'Approved' : 'Pending',
      date: '2024-01-15',
      validUntil: '2026-01-14',
      details: 'Registered under Karnataka RERA Act, 2016'
    },
    bda: {
      approved: Math.random() > 0.3,
      planNumber: `BDA-${Math.floor(Math.random() * 5000)}`,
      zone: 'Residential',
      far: Math.random() > 0.5 ? '2.5' : '1.75',
      details: 'Building plan sanctioned by BDA'
    },
    bankApprovals: [
      { name: 'HDFC Bank', status: 'Approved', date: '2024-02-01' },
      { name: 'SBI', status: 'Approved', date: '2024-01-20' },
      { name: 'ICICI Bank', status: Math.random() > 0.7 ? 'Pending' : 'Approved', date: '2024-03-10' },
      { name: 'Axis Bank', status: 'Approved', date: '2024-02-15' }
    ],
    litigations: {
      count: Math.floor(Math.random() * 3),
      cases: Math.random() > 0.8 ? [
        { type: 'Land Dispute', status: 'Resolved', date: '2023-05-15' },
        { type: 'Environmental Clearance', status: 'Active', date: '2024-01-10' }
      ] : [],
      summary: Math.random() > 0.8 ? 'Minor resolved disputes' : 'No active litigations'
    },
    environmental: {
      clearance: Math.random() > 0.4,
      type: 'Category B',
      date: '2023-12-01',
      authority: 'SEIAA'
    },
    fireSafety: {
      noc: Math.random() > 0.3,
      number: `FS-${Math.floor(Math.random() * 2000)}`,
      validUntil: '2025-12-31'
    },
    amenities: {
      total: 25,
      completed: Math.floor(Math.random() * 15) + 10,
      upcoming: Math.floor(Math.random() * 5)
    },
    construction: {
      progress: Math.floor(Math.random() * 60) + 20,
      possession: 'Dec 2025',
      currentStage: 'Structure Work'
    }
  };
};

export const Propsync: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [reportData, setReportData] = useState<RegulatoryData | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadingMessages = [
    'Parsing project details...',
    'Crawling RERA database...',
    'Checking BDA approvals...',
    'Verifying bank approvals...',
    'Searching litigation records...',
    'Generating comprehensive report...'
  ];

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const data = await fetchRegulatoryData(searchQuery);
      setReportData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const generatePDF = async () => {
    if (!reportData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header with gradient effect
    doc.setFillColor(26, 26, 26);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Logo/Branding
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PROPSYNC', pageWidth - 20, 15, { align: 'right' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Property Intelligence', pageWidth - 20, 22, { align: 'right' });
    doc.setTextColor(34, 197, 94); // Green accent
    doc.text('propsync.xyz', pageWidth - 20, 28, { align: 'right' });

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprehensive Regulatory Report', 20, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(reportData.projectName, 20, 63);

    let yPos = 75;

    // RERA Section
    doc.setFillColor(26, 26, 26);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RERA Registration', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    const reraData = [
      ['Registration Number', reportData.rera.number],
      ['Status', reportData.rera.status],
      ['Registration Date', reportData.rera.date],
      ['Valid Until', reportData.rera.validUntil],
      ['Details', reportData.rera.details]
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['Field', 'Details']],
      body: reraData,
      theme: 'striped',
      headStyles: { fillColor: [26, 26, 26] },
      margin: { left: 20, right: 20 }
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    // BDA Section
    doc.setFillColor(34, 197, 94); // Green
    doc.setTextColor(255, 255, 255);
    doc.text('BDA Approval', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    const bdaData = [
      ['Approval Status', reportData.bda.approved ? 'Approved' : 'Pending'],
      ['Plan Number', reportData.bda.planNumber],
      ['Zone', reportData.bda.zone],
      ['FAR', reportData.bda.far],
      ['Details', reportData.bda.details]
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['Field', 'Details']],
      body: bdaData,
      theme: 'striped',
      headStyles: { fillColor: [34, 197, 94] },
      margin: { left: 20, right: 20 }
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Bank Approvals
    doc.setFillColor(59, 130, 246); // Blue
    doc.setTextColor(255, 255, 255);
    doc.text('Bank Approvals', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    const bankData = reportData.bankApprovals.map(bank => [
      bank.name,
      bank.status,
      bank.date
    ]);
    autoTable(doc, {
      startY: yPos,
      head: [['Bank', 'Status', 'Date']],
      body: bankData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 20, right: 20 }
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Litigations
    doc.setFillColor(239, 68, 68); // Red
    doc.setTextColor(255, 255, 255);
    doc.text('Litigation Status', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Total Cases: ${reportData.litigations.count}`, 20, yPos);
    yPos += 5;
    doc.text(`Summary: ${reportData.litigations.summary}`, 20, yPos);
    yPos += 8;

    if (reportData.litigations.cases.length > 0) {
      const litigationData = reportData.litigations.cases.map((c: any) => [
        c.type,
        c.status,
        c.date
      ]);
      autoTable(doc, {
        startY: yPos,
        head: [['Type', 'Status', 'Date']],
        body: litigationData,
        theme: 'striped',
        headStyles: { fillColor: [239, 68, 68] },
        margin: { left: 20, right: 20 }
      });
      yPos = (doc as any).lastAutoTable.finalY + 15;
    } else {
      yPos += 10;
    }

    // Environmental & Fire Safety (separate sections)
    
    // Environmental
    doc.setFillColor(16, 185, 129); // Emerald
    doc.setTextColor(255, 255, 255);
    doc.text('Environmental Clearance', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    const envData = [
      ['Status', reportData.environmental.clearance ? 'Approved' : 'Pending'],
      ['Type', reportData.environmental.type],
      ['Authority', reportData.environmental.authority],
      ['Date', reportData.environmental.date]
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['Field', 'Value']],
      body: envData,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] },
      margin: { left: 20, right: 20 }
    });

    // Fire Safety (new page or continue)
    doc.addPage();
    yPos = 30;
    doc.setFillColor(245, 158, 11); // Amber
    doc.setTextColor(255, 255, 255);
    doc.text('Fire Safety NOC', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    const fireData = [
      ['NOC Status', reportData.fireSafety.noc ? 'Obtained' : 'Not Obtained'],
      ['Number', reportData.fireSafety.number],
      ['Valid Until', reportData.fireSafety.validUntil]
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['Field', 'Value']],
      body: fireData,
      theme: 'striped',
      headStyles: { fillColor: [245, 158, 11] },
      margin: { left: 20, right: 20 }
    });
    yPos = (doc as any).lastAutoTable.finalY + 15;

    // Construction Progress
    doc.setFillColor(139, 92, 246); // Purple
    doc.setTextColor(255, 255, 255);
    doc.text('Construction Status', 20, yPos);
    yPos += 10;
    
    doc.setTextColor(0, 0, 0);
    const progressData = [
      ['Progress', `${reportData.construction.progress}%`],
      ['Current Stage', reportData.construction.currentStage],
      ['Expected Possession', reportData.construction.possession]
    ];
    autoTable(doc, {
      startY: yPos,
      head: [['Metric', 'Value']],
      body: progressData,
      theme: 'striped',
      headStyles: { fillColor: [139, 92, 246] },
      margin: { left: 20, right: 20 }
    });

    // Footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated by propsync.xyz | Page ${i} of ${totalPages}`, pageWidth / 2, 290, { align: 'center' });
    }

    // Save PDF
    doc.save(`${reportData.projectName.replace(/\s+/g, '_')}_Regulatory_Report.pdf`);
  };

  const getStatusColor = (status: string) => {
    if (status === 'Approved' || status === 'Obtained') return 'text-green-600 bg-green-50';
    if (status === 'Pending') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <section id="propsync" className="relative py-20 lg:py-32 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border-2 border-green-600 mb-6"
          >
            <Sparkles className="w-4 h-4 text-green-700" />
            <span className="text-sm font-semibold text-green-800">Powered by Propsync.xyz</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6"
          >
            Regulatory Compliance
            <br />
            <span className="text-green-600">Intelligence Platform</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-12"
          >
            Instant access to RERA, BDA, Bank Approvals, Litigations, and complete regulatory compliance data. 
            Powered by AI, trusted by thousands.
          </motion.p>
        </AnimatedSection>

        {/* Search Box */}
        {!reportData && (
          <AnimatedSection delay={0.3}>
            <div className="max-w-4xl mx-auto mb-20">
              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-black rounded-2xl blur opacity-20 group-hover:opacity-30" />
                
                <div className="relative flex items-center bg-white border-4 border-black rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute left-6 z-10">
                    <Search className="w-6 h-6 text-black" />
                  </div>

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={windowWidth < 640 ? "tell me project" : "Enter project name (e.g., Embassy Greenshore)"}
                    className="w-full pl-16 pr-32 py-6 bg-transparent text-black text-lg placeholder:text-gray-400 outline-none"
                  />

                  <motion.button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Analyze</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>

              {/* Loading State */}
              <AnimatePresence>
                {isSearching && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto mt-12"
                  >
                    <div className="bg-white border-4 border-black rounded-2xl p-8 shadow-2xl">
                      <div className="relative h-32 mb-6">
                        <motion.div
                          className="absolute inset-0 border-4 border-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-4 border-4 border-green-600 rounded-full"
                          animate={{ rotate: -360 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-12 h-12 text-green-600" />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <motion.p
                          key={loadingStep}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-black font-medium text-lg"
                        >
                          {loadingMessages[loadingStep]}
                        </motion.p>
                        
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-600"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        )}

        {/* Report Display */}
        {reportData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Action Bar */}
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <h3 className="text-2xl font-bold text-black">{reportData.projectName}</h3>
              <div className="flex gap-3">
                <motion.button
                  onClick={generatePDF}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-black hover:from-green-500 hover:to-gray-800 text-white font-semibold rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>Export PDF Report</span>
                </motion.button>
                <motion.button
                  onClick={() => setReportData(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl"
                >
                  New Search
                </motion.button>
              </div>
            </div>

            {/* RERA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-4 border-black rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-black rounded-xl">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black">RERA Registration</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Registration Number</p>
                  <p className="font-semibold text-black">{reportData.rera.number}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full font-semibold ${getStatusColor(reportData.rera.status)}`}>
                    {reportData.rera.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Valid Until</p>
                  <p className="font-semibold text-black">{reportData.rera.validUntil}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Details</p>
                  <p className="text-gray-700">{reportData.rera.details}</p>
                </div>
              </div>
            </motion.div>

            {/* BDA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-4 border-green-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-600 rounded-xl">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black">BDA Approval</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Approval Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full font-semibold ${getStatusColor(reportData.bda.approved ? 'Approved' : 'Pending')}`}>
                    {reportData.bda.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Plan Number</p>
                  <p className="font-semibold text-black">{reportData.bda.planNumber}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Zone</p>
                  <p className="text-gray-700">{reportData.bda.zone}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">FAR</p>
                  <p className="font-semibold text-black">{reportData.bda.far}</p>
                </div>
              </div>
            </motion.div>

            {/* Bank Approvals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-4 border-blue-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Landmark className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black">Bank Approvals</h4>
              </div>
              <div className="grid gap-3">
                {reportData.bankApprovals.map((bank, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-black">{bank.name}</p>
                      <p className="text-sm text-gray-600">{bank.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(bank.status)}`}>
                      {bank.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Litigations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border-4 border-red-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-600 rounded-xl">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black">Litigation Status</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-red-600">{reportData.litigations.count}</div>
                  <div>
                    <p className="text-sm text-gray-600">Total Cases</p>
                    <p className="font-semibold text-black">{reportData.litigations.summary}</p>
                  </div>
                </div>
                {reportData.litigations.cases.length > 0 && (
                  <div className="grid gap-3">
                    {reportData.litigations.cases.map((caseItem: any, idx: number) => (
                      <div key={idx} className="p-4 bg-red-50 rounded-xl border-l-4 border-red-600">
                        <p className="font-semibold text-black">{caseItem.type}</p>
                        <div className="flex gap-4 mt-2">
                          <span className={`text-sm px-2 py-1 rounded ${getStatusColor(caseItem.status)}`}>
                            {caseItem.status}
                          </span>
                          <span className="text-sm text-gray-600">{caseItem.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Additional Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Environmental */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white border-4 border-emerald-600 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-600 rounded-xl">
                    <FileCheck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-black">Environmental Clearance</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-semibold ${getStatusColor(reportData.environmental.clearance ? 'Approved' : 'Pending')}`}>
                      {reportData.environmental.clearance ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-black">{reportData.environmental.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Authority:</span>
                    <span className="font-semibold text-black">{reportData.environmental.authority}</span>
                  </div>
                </div>
              </motion.div>

              {/* Fire Safety */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white border-4 border-amber-600 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-600 rounded-xl">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-black">Fire Safety NOC</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">NOC Status:</span>
                    <span className={`font-semibold ${getStatusColor(reportData.fireSafety.noc ? 'Obtained' : 'Not Obtained')}`}>
                      {reportData.fireSafety.noc ? 'Obtained' : 'Not Obtained'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span className="font-semibold text-black">{reportData.fireSafety.validUntil}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Construction Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white border-4 border-purple-600 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-600 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-black">Construction Progress</h4>
              </div>
              <div className="space-y-4">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Completion
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        {reportData.construction.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-purple-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${reportData.construction.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Current Stage</p>
                    <p className="font-semibold text-black">{reportData.construction.currentStage}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-600">Expected Possession</p>
                    <p className="font-semibold text-black">{reportData.construction.possession}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Propsync;
