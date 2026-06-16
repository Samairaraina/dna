import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { supabase } from "../lib/supabase.js";

function SkeletonCard() {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="flex justify-between">
        <div className="flex gap-1">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function generateBibTeX(paper) {
  const key = paper.authors.split(",")[0].trim().toLowerCase() + (paper.journal.match(/\d{4}/)?.[0] || "2024");
  return `@article{${key},
  title={${paper.title}},
  author={${paper.authors}},
  journal={${paper.journal}},
  year={${paper.journal.match(/\d{4}/)?.[0] || "2024"}},
  citations={${paper.citations}},
  doi={${paper.doi || ""}}
}`;
}

function generateCitation(paper) {
  return `${paper.authors} (${paper.journal.match(/\d{4}/)?.[0] || "n.d."}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi || ""}`;
}

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [papers, setPapers] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let query = supabase.from("publications").select("*").order("citations", { ascending: false });

        if (search) {
          query = query.or(`title.ilike.%${search}%,authors.ilike.%${search}%,journal.ilike.%${search}%`);
        }

        if (selectedTag) {
          query = query.contains("tags", [selectedTag]);
        }

        const { data: pubs, error } = await query;
        if (error) throw error;
        setPapers(pubs || []);

        if (!selectedTag && !search) {
          const { data: allPubs } = await supabase.from("publications").select("tags");
          const tagSet = new Set();
          (allPubs || []).forEach((p) => (p.tags || []).forEach((t) => tagSet.add(t)));
          setAllTags([...tagSet].sort());
        }
      } catch (err) {
        console.error("Failed to fetch publications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, selectedTag]);

  const handleDownload = (paper) => {
    const bib = generateBibTeX(paper);
    const blob = new Blob([bib], { type: "application/x-bibtex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${paper.authors.split(",")[0].trim().toLowerCase()}-${paper.journal.match(/\d{4}/)?.[0] || "2024"}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCite = async (paper) => {
    const citation = generateCitation(paper);
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(paper.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = citation;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedId(paper.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="publications" className="section-padding bg-white dark:bg-gray-950" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-purple-600 dark:text-purple-400 mb-3">
              Research Library
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Research <span className="gradient-text">Publications</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of landmark CRISPR optimization publications.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search publications..." value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl glass text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/40" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              !selectedTag
                ? "bg-gradient-to-r from-crispr-400 to-aqua-400 text-white"
                : "glass text-gray-600 dark:text-gray-400 hover:shadow-md"
            }`}>All</button>
          {allTags.map((tag) => (
            <button key={tag} onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedTag === tag
                  ? "bg-gradient-to-r from-crispr-400 to-aqua-400 text-white"
                  : "glass text-gray-600 dark:text-gray-400 hover:shadow-md"
              }`}>{tag}</button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper, i) => (
              <motion.div key={paper.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card p-6 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium text-aqua-500 bg-aqua-50 dark:bg-aqua-900/20 px-2 py-1 rounded-full">{paper.journal}</span>
                  <span className="text-xs text-gray-400">{paper.citations} citations</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 leading-relaxed group-hover:text-aqua-600 dark:group-hover:text-aqua-400 transition-colors">{paper.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{paper.authors}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {(paper.tags || []).map((tag) => (
                      <span key={tag} className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleDownload(paper)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-aqua-500 transition-all" title="Download BibTeX">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                    <button onClick={() => handleCite(paper)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-aqua-500 transition-all relative" title="Copy citation">
                      {copiedId === paper.id ? (
                        <svg className="w-4 h-4 text-crispr-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      )}
                    </button>
                    {paper.doi && (
                      <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-aqua-500 transition-all" title="Open DOI">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && papers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No publications match your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </section>
  );
}
