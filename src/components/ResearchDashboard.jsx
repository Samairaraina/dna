import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";

function SkeletonBar() {
  return (
    <div className="mb-4 animate-pulse">
      <div className="flex justify-between mb-1">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </div>
  );
}

function SkeletonRadial() {
  return (
    <div className="text-center animate-pulse">
      <div className="w-32 h-32 mx-auto mb-3 rounded-full bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}

function AnimatedBar({ label, value, color, isInView, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setCount(value), 300 + delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-bold text-gray-900 dark:text-white">{value}%</span>
      </div>
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
}

function RadialChart({ label, value, color, isInView, delay }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-3">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="currentColor" className="text-gray-100 dark:text-gray-800" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={radius} fill="none"
            stroke={`url(#grad-${label.replace(/\s/g, "")})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * (1 - value / 100) } : {}}
            transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id={`grad-${label.replace(/\s/g, "")}`} x1="0%" y1="0%" x2="100%" y2="0%">
              {color.includes("crispr") && (
                <><stop offset="0%" stopColor="#4ade80" /><stop offset="100%" stopColor="#22d3ee" /></>
              )}
              {color.includes("aqua") && (
                <><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#06b6d4" /></>
              )}
              {color.includes("yellow") && (
                <><stop offset="0%" stopColor="#facc15" /><stop offset="100%" stopColor="#eab308" /></>
              )}
              {color.includes("purple") && (
                <><stop offset="0%" stopColor="#c084fc" /><stop offset="100%" stopColor="#a855f7" /></>
              )}
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {isInView ? value : 0}%
          </span>
        </div>
      </div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

export default function ResearchDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: metrics, error } = await supabase.from("dashboard_metrics").select("*");
        if (error) throw error;

        const grouped = {};
        (metrics || []).forEach((m) => {
          const key = m.category === "off_target" ? "offTarget" : m.category;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(m);
        });

        setData(grouped);
      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const accuracy = data?.accuracy || [];
  const offTarget = data?.offTarget || [];
  const clinical = data?.clinical || [];
  const yoy = data?.yoy || [];

  const colorMap = {
    "Standard CRISPR": "from-gray-400 to-gray-500",
    "High-Fidelity Cas": "from-crispr-400 to-crispr-500",
    "Base Editing": "from-aqua-400 to-aqua-500",
    "Prime Editing": "from-yellow-300 to-yellow-500",
    "AI-Optimized Guides": "from-purple-400 to-purple-500",
  };

  const radialColorMap = {
    "Safety": "crispr",
    "Efficacy": "aqua",
    "Delivery": "yellow",
    "Specificity": "purple",
  };

  const offTargetColorMap = {
    "Standard CRISPR": "from-red-400 to-red-500",
    "High-Fidelity Cas": "from-crispr-400 to-crispr-500",
    "Base Editing": "from-aqua-400 to-aqua-500",
    "Prime Editing": "from-yellow-300 to-yellow-500",
    "AI-Optimized Guides": "from-purple-400 to-purple-500",
  };

  return (
    <section id="dashboard" className="section-padding bg-gray-50/50 dark:bg-gray-900/50" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          >
            <span className="inline-block px-3 py-1.5 rounded-full glass text-xs font-medium text-aqua-600 dark:text-aqua-400 mb-3">
              Research Dashboard
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Performance <span className="gradient-text">Metrics</span>
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track key performance indicators across our CRISPR optimization technologies in real time.
          </p>
        </motion.div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Editing Accuracy & Efficiency</h3>
            {loading ? (
              <>{[...Array(5)].map((_, i) => <SkeletonBar key={i} />)}</>
            ) : (
              accuracy.map((item, i) => (
                <AnimatedBar key={i} label={item.metric} value={item.value} color={colorMap[item.metric] || "from-crispr-400 to-crispr-500"} isInView={isInView} delay={100 + i * 100} />
              ))
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Off-Target Reduction</h3>
            {loading ? (
              <>{[...Array(5)].map((_, i) => <SkeletonBar key={i} />)}</>
            ) : (
              offTarget.map((item, i) => (
                <AnimatedBar key={i} label={item.metric} value={item.value} color={offTargetColorMap[item.metric] || "from-red-400 to-red-500"} isInView={isInView} delay={100 + i * 100} />
              ))
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Clinical Success Rates</h3>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4"><SkeletonRadial /><SkeletonRadial /><SkeletonRadial /><SkeletonRadial /></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {clinical.map((item, i) => (
                  <RadialChart key={i} label={item.metric} value={item.value} color={radialColorMap[item.metric] || "crispr"} isInView={isInView} delay={100 + i * 100} />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Year-over-Year Improvement</h3>
            {loading ? (
              <div className="space-y-4">{[...Array(5)].map((_, i) => <SkeletonBar key={i} />)}</div>
            ) : (
              <div className="space-y-6">
                {yoy.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 text-sm font-semibold text-gray-900 dark:text-white">{item.year}</div>
                    <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: `${item.value}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-crispr-400 to-aqua-400"
                      />
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}%</span>
                      <div className="text-xs text-gray-400">{i === 0 ? "Baseline" : `+${item.value - (yoy[i - 1]?.value || 0)}%`}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
