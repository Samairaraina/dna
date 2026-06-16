export default function ResearchVideo() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-card">
              <video
                className="w-full aspect-video object-cover"
                controls
                preload="metadata"
                poster="/photo.png"
              >
                <source src="/Revolutionizing_Genetic_Engine.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="space-y-5">
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-crispr-600 dark:text-crispr-400">
              Featured Research
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Revolutionizing Genetic Engineering
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Watch our breakthrough CRISPR optimization pipeline in action. This demonstration
              showcases high-fidelity editing across multiple genomic targets with real-time
              off-target reduction monitoring and AI-guided guide RNA selection.
            </p>
            <ul className="space-y-2">
              {[
                "Real-time Cas9 editing visualization",
                "Off-target cleavage reduction tracking",
                "AI-optimized guide RNA design workflow",
                "Base & Prime editing comparison",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4 mt-0.5 text-crispr-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
