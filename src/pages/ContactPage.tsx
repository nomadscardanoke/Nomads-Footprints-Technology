import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import { COMPANY_DETAILS } from '../data/siteData';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UploadCloud,
  FileText,
  FileImage,
  FileArchive,
  Trash2,
  AlertCircle,
  HelpCircle,
  Info,
  Layers,
  Palette,
  Printer,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  category: 'Vector / Logo' | 'Document Brief' | 'High-Res Image' | 'Archive / Assets';
}

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Printing & Branding');
  const [contactMethod, setContactMethod] = useState<'WhatsApp' | 'Phone' | 'Email'>('WhatsApp');
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<'print' | 'branding' | 'digital'>('print');
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newAttached: AttachedFile[] = Array.from(files).map((file, idx) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let category: AttachedFile['category'] = 'Document Brief';
      if (['ai', 'eps', 'svg', 'cdr'].includes(ext)) category = 'Vector / Logo';
      else if (['png', 'jpg', 'jpeg', 'webp', 'tiff', 'psd'].includes(ext)) category = 'High-Res Image';
      else if (['zip', 'rar', '7z', 'tar'].includes(ext)) category = 'Archive / Assets';

      const sizeFormatted =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      return {
        id: `${Date.now()}-${idx}-${file.name}`,
        name: file.name,
        size: sizeFormatted,
        type: ext.toUpperCase() || 'FILE',
        category,
      };
    });

    setAttachedFiles((prev) => [...prev, ...newAttached]);
  };

  const removeFile = (id: string) => {
    setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E50914', '#10B981', '#FFFFFF'],
    });
  };

  const handleSendViaWhatsApp = () => {
    const fileListText =
      attachedFiles.length > 0
        ? `\n*Attached Briefing Materials (${attachedFiles.length}):*\n` +
          attachedFiles.map((f) => `• ${f.name} (${f.type} - ${f.size})`).join('\n')
        : '';

    const text = `*New Contact & Briefing Inquiry - Nomads Footprints Website*
*Name:* ${name || 'Prospective Client'}
*Phone:* ${phone || 'Not specified'}
*Email:* ${email || 'Not specified'}
*Service:* ${service}
*Preferred Method:* ${contactMethod}${fileListText}
*Project Message:* ${message || 'Hello, I have requirements for this project.'}`;

    const url = `https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const getFileCategoryIcon = (category: AttachedFile['category']) => {
    switch (category) {
      case 'Vector / Logo':
        return <Palette className="w-4 h-4 text-red-500" />;
      case 'High-Res Image':
        return <FileImage className="w-4 h-4 text-amber-500" />;
      case 'Archive / Assets':
        return <FileArchive className="w-4 h-4 text-purple-400" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Phone className="w-3.5 h-3.5 text-red-500" />
            GET IN TOUCH WITH US
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            CONTACT NOMADS FOOTPRINTS
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Have a question, need a quote or want to discuss a project? Reach out to our technical and creative specialists today.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details & Direct Callouts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-heading font-extrabold text-xl text-white uppercase border-l-2 border-red-600 pl-3">
                CONTACT INFORMATION
              </h3>

              <div className="space-y-4 text-sm">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${COMPANY_DETAILS.phone}`}
                      className="font-heading font-bold text-white hover:text-red-400 text-base"
                    >
                      {COMPANY_DETAILS.displayPhone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Instant WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(COMPANY_DETAILS.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-bold text-emerald-400 hover:underline text-base block"
                    >
                      {COMPANY_DETAILS.displayPhone}
                    </a>
                    <span className="text-[11px] text-neutral-400 block">
                      Fastest response for project inquiries &amp; artwork reviews
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="font-heading font-semibold text-white hover:text-red-400 text-sm break-all"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Location &amp; Dispatch
                    </span>
                    <span className="font-heading font-semibold text-white text-sm">
                      {COMPANY_DETAILS.location} &bull; Nationwide Courier Dispatch
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                  <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <span className="font-heading font-semibold text-white text-sm">
                      {COMPANY_DETAILS.hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <span>REQUEST FORMAL QUOTATION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-2xl text-white uppercase">
                  SEND US A MESSAGE
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400">
                  Fill out the form below and our team will get back to you within 2-4 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-neutral-950 border border-emerald-500/60 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-black text-2xl text-white">
                    MESSAGE RECEIVED!
                  </h4>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{name}</strong>. Our business development team has received your message regarding{' '}
                    <strong className="text-red-400">{service}</strong> and will contact you via {contactMethod}.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={handleSendViaWhatsApp}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward to WhatsApp Now</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase px-4 py-3 rounded-xl"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                        Full Name: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David Mwangi"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                        Email Address: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@company.co.ke"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                        Phone / WhatsApp Number: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0752 634 016"
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500 text-sm"
                      />
                    </div>

                    {/* Service Needed */}
                    <div>
                      <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                        Service Needed:
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 text-sm"
                      >
                        <option value="Printing & Branding">Printing &amp; Branding</option>
                        <option value="IT Consultancy">IT Consultancy</option>
                        <option value="Website & App Development">Website &amp; App Development</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Corporate Stationery Package">Corporate Stationery Package</option>
                        <option value="Other Inquiries">Other Inquiries</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                      Preferred Contact Method:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WhatsApp', 'Phone', 'Email'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setContactMethod(method)}
                          className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                            contactMethod === method
                              ? 'bg-red-600 border-red-500 text-white shadow-md'
                              : 'bg-neutral-950 border-neutral-700 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1.5 uppercase tracking-wider">
                      Message / Project Details: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your requirements, preferred quantities, dimensions, timelines, or technical specifications..."
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-none p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 text-sm"
                    />
                  </div>

                  {/* File Attachment & Project Briefing Area */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-neutral-300 font-bold uppercase tracking-wider flex items-center gap-1.5 text-xs">
                        <UploadCloud className="w-4 h-4 text-red-500" />
                        <span>Attach Project Briefs / Artwork Files</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowGuideModal(true)}
                        className="text-[11px] text-red-400 hover:text-red-300 font-bold uppercase tracking-wider flex items-center gap-1 hover:underline"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Artwork &amp; Briefing Guide</span>
                      </button>
                    </div>

                    {/* Drag & Drop Upload Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        handleFileUpload(e.dataTransfer.files);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                        isDragging
                          ? 'border-red-500 bg-red-950/20'
                          : 'border-neutral-700 hover:border-red-600 bg-neutral-950/70 hover:bg-neutral-950'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-neutral-900 border border-white/10 text-red-500 flex items-center justify-center mx-auto">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                          <span className="text-red-400 font-bold">Click to browse</span> or drag and drop artwork files here
                        </p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
                          Supported: PDF, AI, EPS, SVG, PNG, JPG, PSD, TIFF, ZIP, DOCX (Up to 50MB per file)
                        </p>
                      </div>
                    </div>

                    {/* Quick Simulation Samples */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-500">Quick Simulation Add:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachedFiles((prev) => [
                            ...prev,
                            {
                              id: `sample-logo-${Date.now()}`,
                              name: 'Company_Brand_Logo_Vector.ai',
                              size: '3.4 MB',
                              type: 'AI',
                              category: 'Vector / Logo',
                            },
                          ])
                        }
                        className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 border border-white/10 transition-colors"
                      >
                        + Vector Logo (.AI)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachedFiles((prev) => [
                            ...prev,
                            {
                              id: `sample-brief-${Date.now()}`,
                              name: 'Print_Specs_And_Quantities_Brief.pdf',
                              size: '1.2 MB',
                              type: 'PDF',
                              category: 'Document Brief',
                            },
                          ])
                        }
                        className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 border border-white/10 transition-colors"
                      >
                        + Project Brief (.PDF)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachedFiles((prev) => [
                            ...prev,
                            {
                              id: `sample-mockup-${Date.now()}`,
                              name: 'Storefront_Signage_Mockup_300DPI.png',
                              size: '6.8 MB',
                              type: 'PNG',
                              category: 'High-Res Image',
                            },
                          ])
                        }
                        className="px-2 py-0.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 border border-white/10 transition-colors"
                      >
                        + 300DPI Mockup (.PNG)
                      </button>
                    </div>

                    {/* Attached Files List */}
                    {attachedFiles.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                          <span>Attached Materials ({attachedFiles.length})</span>
                          <button
                            type="button"
                            onClick={() => setAttachedFiles([])}
                            className="text-red-400 hover:underline text-[10px]"
                          >
                            Remove All
                          </button>
                        </div>

                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {attachedFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2.5 bg-neutral-950 border border-white/10 text-xs"
                            >
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className="p-1.5 bg-neutral-900 border border-white/10 shrink-0">
                                  {getFileCategoryIcon(file.category)}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-white truncate max-w-[200px] sm:max-w-xs text-xs">
                                    {file.name}
                                  </p>
                                  <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                                    <span className="font-mono">{file.size}</span>
                                    <span>&bull;</span>
                                    <span className="text-neutral-300 font-semibold">{file.category}</span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="p-1 text-neutral-500 hover:text-red-400 transition-colors ml-2"
                                title="Remove file"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-none shadow-xl flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry &amp; Brief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-none flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send Direct via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ===================== PROJECT REQUIREMENT & ARTWORK PREPARATION GUIDE ===================== */}
        <div className="mt-16 bg-black border border-white/10 p-6 sm:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-red-500 px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                PROFESSIONAL PRE-PRESS &amp; BRIEFING STANDARDS
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                PROJECT REQUIREMENT &amp; ARTWORK PREPARATION GUIDE
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
                Ensure flawless color fidelity, razor-sharp resolution, and zero production delays by reviewing our submission standards.
              </p>
            </div>

            {/* Guide Category Switcher */}
            <div className="flex items-center gap-1.5 bg-neutral-950 border border-white/10 p-1">
              <button
                onClick={() => setActiveGuideTab('print')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeGuideTab === 'print'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Commercial Print
              </button>
              <button
                onClick={() => setActiveGuideTab('branding')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeGuideTab === 'branding'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Signage &amp; Fleet
              </button>
              <button
                onClick={() => setActiveGuideTab('digital')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeGuideTab === 'digital'
                    ? 'bg-red-600 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Web &amp; Digital Systems
              </button>
            </div>
          </div>

          {/* Guide Content Display */}
          {activeGuideTab === 'print' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Color Mode: CMYK Only
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Commercial offset and digital printers use Cyan, Magenta, Yellow, and Key (Black). Converting RGB files to CMYK before export prevents unexpected color shift.
                </p>
                <div className="text-[11px] font-mono text-red-400 bg-black p-2 border border-white/5">
                  Standard: Coated FOGRA39 / US Web Coated (SWOP) v2
                </div>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  3mm - 5mm Bleed Margins
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Always extend background graphics 3mm past the cut line for stationery/brochures, and 5mm for packaging to avoid white paper edges during guillotine trimming.
                </p>
                <div className="text-[11px] font-mono text-red-400 bg-black p-2 border border-white/5">
                  Safe Zone: Keep text 4mm inside the trim boundary
                </div>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Resolution &amp; Font Outlines
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All raster photography must be at least 300 DPI at 100% scale. Convert all typography to vector curves/outlines (Create Outlines in Adobe Illustrator).
                </p>
                <div className="text-[11px] font-mono text-red-400 bg-black p-2 border border-white/5">
                  Preferred Export: PDF/X-1a:2001 or PDF/X-4
                </div>
              </div>
            </div>
          )}

          {activeGuideTab === 'branding' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Vector Scalability
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Logos, vehicle decals, and 3D acrylic signs require 100% vector line art (.AI, .EPS, .SVG) so they can scale infinitely for plotters and CNC routers without pixellation.
                </p>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Vehicle Template Blueprint
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Provide vehicle make, model, year, and side photos if requesting vehicle wraps. We superimpose your artwork onto exact manufacturer templates before vinyl printing.
                </p>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Pantone Matching (PMS)
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Specify Pantone Solid Coated reference codes for critical corporate brand colors to guarantee exact vinyl and spot ink formulation across all surfaces.
                </p>
              </div>
            </div>
          )}

          {activeGuideTab === 'digital' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Functional Scope &amp; User Flow
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Share your list of required features (e.g. M-Pesa STK push integration, customer portal, multi-role admin dashboard, SMS alerts, or analytics integrations).
                </p>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Brand Guidelines &amp; Copy
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Attach brand guidelines, primary hex codes, high-resolution product photography, and text copy for essential sitemap pages (About, Services, Case Studies).
                </p>
              </div>

              <div className="bg-neutral-950 border border-white/10 p-6 space-y-3">
                <div className="w-8 h-8 bg-red-600/20 text-red-500 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                  Hosting &amp; Domain Credentials
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  If migrating or deploying to existing infrastructure (cPanel, AWS, Cloudflare, Google Cloud, or Kenya Web Experts), prepare domain DNS access for launch day.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal for In-depth Artwork Specs */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-black border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-red-500" />
                  <h3 className="font-heading font-black text-lg text-white uppercase">
                    PRINT &amp; DESIGN BRIEFING SPECIFICATIONS
                  </h3>
                </div>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="text-neutral-400 hover:text-white font-mono text-sm px-2 py-1 bg-neutral-900 border border-white/10"
                >
                  ESC / Close
                </button>
              </div>

              <div className="space-y-4 text-xs text-neutral-300">
                <div className="p-3 bg-neutral-950 border border-white/10 space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    Preferred File Types
                  </h5>
                  <p className="text-neutral-400">
                    PDF (Press-Ready), Adobe Illustrator (.AI), Scalable Vector (.SVG), High-Res TIFF, or Layered PSD.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/10 space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    Bleed and Safety Margins
                  </h5>
                  <p className="text-neutral-400">
                    Include minimum 3mm bleed on all sides for business cards, flyers, and brochures. Keep essential text at least 4mm inside trim lines.
                  </p>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/10 space-y-1">
                  <h5 className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    Color Separation
                  </h5>
                  <p className="text-neutral-400">
                    All print files must be formatted in CMYK color space. Spot UV and Gold/Silver Foil elements should be supplied on separate 100% vector K-channel layers.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5"
                >
                  Understood &amp; Return
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
