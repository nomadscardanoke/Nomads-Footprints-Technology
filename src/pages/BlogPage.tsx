import React, { useState } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/siteData';
import {
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  User,
  ArrowRight,
  X,
  CheckCircle2,
  Share2,
  MessageCircle,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/siteData';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal: (service?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Technology',
    'Branding',
    'Web Development',
    'Business Growth',
    'Design',
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-red-500" />
            INSIGHTS &amp; RESOURCES
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            DIGITAL &amp; BRANDING KNOWLEDGE HUB
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Stay informed with technology, branding, digital marketing and business insights crafted to help your company scale.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-950/60'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-neutral-900 border border-neutral-800 hover:border-red-600/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-950/30 transition-all flex flex-col justify-between group cursor-pointer"
              onClick={() => setActivePost(post)}
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-neutral-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-red-500" />
                      {post.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white group-hover:text-red-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-bold text-red-500 group-hover:text-red-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* FULL ARTICLE MODAL */}
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="relative w-full max-w-3xl bg-neutral-900 border border-red-900/50 rounded-2xl shadow-2xl overflow-hidden text-neutral-100 my-8 animate-in zoom-in-95 duration-200">
              {/* Header Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-4 right-4 text-white bg-neutral-950/80 hover:bg-neutral-800 p-2 rounded-full border border-neutral-700"
                  aria-label="Close article modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                    {activePost.category}
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    {activePost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-neutral-300">
                    <span>By {activePost.author}</span>
                    <span>&bull;</span>
                    <span>{activePost.date}</span>
                    <span>&bull;</span>
                    <span>{activePost.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {activePost.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Key takeaways callout */}
                <div className="bg-neutral-950 border border-red-900/40 rounded-2xl p-5 sm:p-6 space-y-3">
                  <h4 className="font-heading font-bold text-sm text-red-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Key Executive Takeaways
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-neutral-300">
                    {activePost.keyTakeaways.map((takeaway, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Share & Action */}
                <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      const title = activePost.title;
                      setActivePost(null);
                      onOpenQuoteModal(`Inquiry from article: ${title}`);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <span>Implement This Strategy</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=${encodeURIComponent(`Hello Nomads, I just read your article "${activePost.title}" and would like to learn more.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Discuss on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
