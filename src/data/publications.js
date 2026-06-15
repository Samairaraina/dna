export const publications = [
{
id: 1,
title: "High-fidelity CRISPR-Cas9 nucleases with no detectable genome-wide off-target effects",
author: "Kleinstiver, B.P. et al.",
journal: "Nature",
year: 2016,
citations: 2450,
tags: ["High-Fidelity", "Cas9", "Off-Target"],
pdf: "/papers/high-fidelity-cas9.pdf",
link: "https://www.nature.com"
},
{
id: 2,
title: "Programmable editing of a target base in genomic DNA without double-stranded DNA cleavage",
author: "Komor, A.C. et al.",
journal: "Nature",
year: 2016,
citations: 3800,
tags: ["Base Editing", "Deaminase", "dCas9"],
pdf: "/papers/base-editing-komor.pdf",
link: "https://www.nature.com"
},
{
id: 3,
title: "Search-and-replace genome editing without double-strand breaks or donor DNA",
author: "Anzalone, A.V. et al.",
journal: "Nature",
year: 2019,
citations: 3200,
tags: ["Prime Editing", "Reverse Transcriptase", "pegRNA"],
pdf: "/papers/prime-editing-anzalone.pdf",
link: "https://www.nature.com"
},
{
id: 4,
title: "Engineered CRISPR-Cas9 variants with decreased off-target effects",
author: "Slaymaker, I.M. et al.",
journal: "Science",
year: 2016,
citations: 1800,
tags: ["eSpCas9", "Specificity", "Engineered"],
pdf: "/papers/espcas9-slaymaker.pdf",
link: "https://www.science.org"
},
{
id: 5,
title: "Rationally engineered Cas9 nucleases with improved specificity",
author: "Kleinstiver, B.P. et al.",
journal: "Science",
year: 2016,
citations: 2100,
tags: ["SpCas9-HF1", "Rational Design", "Specificity"],
pdf: "/papers/spcas9-hf1-kleinstiver.pdf",
link: "https://www.science.org"
},
{
id: 6,
title: "Improving CRISPR-Cas9 genome editing efficiency by fusion with chromatin-modulating peptides",
author: "Ding, X. et al.",
journal: "Nature Biotechnology",
year: 2021,
citations: 450,
tags: ["Efficiency", "Chromatin", "Fusion"],
pdf: "/papers/chromatin-fusion-ding.pdf",
link: "https://www.nature.com"
},
{
id: 7,
title: "Lipid nanoparticle delivery of CRISPR-Cas9 for in vivo genome editing",
author: "Finn, J.D. et al.",
journal: "Cell Reports",
year: 2018,
citations: 890,
tags: ["Delivery", "LNP", "In Vivo"],
pdf: "/papers/lnp-delivery-finn.pdf",
link: "https://www.cell.com"
},
{
id: 8,
title: "Deep learning predicts CRISPR-Cas9 guide RNA efficiency and off-target activity",
author: "Kim, H.K. et al.",
journal: "Nature Communications",
year: 2020,
citations: 670,
tags: ["Deep Learning", "Guide RNA", "AI"],
pdf: "/papers/ai-guide-rna-kim.pdf",
link: "https://www.nature.com"
},
{
id: 9,
title: "Epigenome editing by a CRISPR-Cas9-based acetyltransferase activates genes from promoters and enhancers",
author: "Hilton, I.B. et al.",
journal: "Nature Biotechnology",
year: 2015,
citations: 1200,
tags: ["Epigenetic Editing", "dCas9", "Acetylation"],
pdf: "/papers/epigenome-editing-hilton.pdf",
link: "https://www.nature.com"

}
];
import React, { useState } from "react";
import { publications } from "../data/publications";
import { Search, Download, ExternalLink } from "lucide-react";

const Publications = () => {
const [searchTerm, setSearchTerm] = useState("");
const [selectedTag, setSelectedTag] = useState("All");

const allTags = [
"All",
...new Set(publications.flatMap((paper) => paper.tags))
];

const filteredPublications = publications.filter((paper) => {
const matchesSearch =
paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
paper.journal.toLowerCase().includes(searchTerm.toLowerCase());


const matchesTag =
  selectedTag === "All" ||
  paper.tags.includes(selectedTag);

return matchesSearch && matchesTag;


});

return ( <section id="publications" className="py-24 px-6"> <div className="max-w-7xl mx-auto">


    <h2 className="text-5xl font-bold text-center mb-10">
      Research Publications
    </h2>

    <div className="relative max-w-3xl mx-auto mb-8">
      <Search className="absolute left-4 top-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search publications by title, author, or journal..."
        className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => setSelectedTag(tag)}
          className={`px-5 py-2 rounded-full transition-all ${
            selectedTag === tag
              ? "bg-cyan-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredPublications.map((paper) => (
        <div
          key={paper.id}
          className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-cyan-600 font-medium">
              {paper.journal}, {paper.year}
            </span>

            <span className="text-gray-500 text-sm">
              {paper.citations} citations
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3">
            {paper.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {paper.author}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {paper.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href={paper.pdf}
              download
              className="flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-xl"
            >
              <Download size={18} />
              Download
            </a>
            

            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border px-4 py-2 rounded-xl"
            >
              <ExternalLink size={18} />
              View
            </a>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>


);
};

export default Publications;
