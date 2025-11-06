"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [sceneDescription, setSceneDescription] = useState("");
  const [vfxBreakdown, setVfxBreakdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<"marathi" | "english">("english");

  const generateBreakdown = async () => {
    if (!sceneDescription.trim()) return;

    setLoading(true);
    setVfxBreakdown("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sceneDescription,
          language,
        }),
      });

      const data = await response.json();
      setVfxBreakdown(data.breakdown);
    } catch (error) {
      console.error("Error generating breakdown:", error);
      setVfxBreakdown("Error generating VFX breakdown. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exampleScenes = [
    {
      title: "Epic Dragon Battle",
      description:
        "A massive dragon soaring through storm clouds at sunset, breathing fire onto a medieval castle. Heavy rain, lightning strikes, cinematic wide-angle shot with dramatic lighting. Camera follows dragon in sweeping aerial motion.",
    },
    {
      title: "Magical Portal Opening",
      description:
        "Night scene in ancient forest. A glowing blue portal opens with swirling energy particles, mystical runes floating around it. Soft blue-purple lighting, mist on ground. Camera slow push-in, ethereal atmosphere.",
    },
    {
      title: "Sci-Fi City Destruction",
      description:
        "Futuristic metropolis at dusk. Massive explosion from alien weapon, shockwave rippling through buildings, debris flying, glass shattering. Orange-blue color grade, dramatic slow motion, camera shake effect.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                VFX Director Pipeline
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Professional Scene Breakdown & Pipeline Supervision
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("english")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  language === "english"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("marathi")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  language === "marathi"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                मराठी
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-semibold mb-4 text-purple-400">
                Scene Description
              </h2>
              <textarea
                value={sceneDescription}
                onChange={(e) => setSceneDescription(e.target.value)}
                placeholder="Describe your VFX scene in detail: location, mood, characters, effects, time of day, camera style..."
                className="w-full h-64 bg-black/50 border border-gray-700 rounded-lg p-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <button
                onClick={generateBreakdown}
                disabled={loading || !sceneDescription.trim()}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating Pipeline...
                  </span>
                ) : (
                  "Generate VFX Breakdown"
                )}
              </button>
            </div>

            {/* Example Scenes */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
              <h3 className="text-lg font-semibold mb-4 text-pink-400">
                Example Scenes
              </h3>
              <div className="space-y-3">
                {exampleScenes.map((scene, index) => (
                  <button
                    key={index}
                    onClick={() => setSceneDescription(scene.description)}
                    className="w-full text-left bg-black/30 hover:bg-black/50 border border-gray-700 hover:border-purple-500 rounded-lg p-4 transition-all"
                  >
                    <h4 className="font-semibold text-purple-300 mb-1">
                      {scene.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {scene.description.slice(0, 80)}...
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-4 text-pink-400">
              VFX Pipeline Breakdown
            </h2>
            <div className="bg-black/50 border border-gray-700 rounded-lg p-6 min-h-[600px] max-h-[800px] overflow-y-auto">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin animation-delay-150" />
                    </div>
                    <p className="mt-6 text-gray-400 animate-pulse">
                      Analyzing scene and generating pipeline...
                    </p>
                  </motion.div>
                ) : vfxBreakdown ? (
                  <motion.div
                    key="breakdown"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="prose prose-invert prose-purple max-w-none"
                  >
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold text-purple-400 mb-4 border-b border-gray-700 pb-2">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-semibold text-pink-400 mt-6 mb-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-purple-300 mt-4 mb-2">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-300 mb-3 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-300">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-purple-300 font-semibold">
                            {children}
                          </strong>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-800 text-pink-300 px-2 py-1 rounded text-sm">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {vfxBreakdown}
                    </ReactMarkdown>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <svg
                      className="w-24 h-24 text-gray-700 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                      />
                    </svg>
                    <p className="text-gray-500 text-lg">
                      Describe your scene and click Generate
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Get a complete VFX pipeline breakdown with technical
                      parameters
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Complete Pipeline",
              description:
                "Scene layout, particle simulation, lighting, animation, compositing",
              icon: "🎬",
            },
            {
              title: "Technical Parameters",
              description:
                "Detailed settings for emitters, gravity, turbulence, render specs",
              icon: "⚙️",
            },
            {
              title: "Bilingual Support",
              description: "Professional guidance in both Marathi and English",
              icon: "🌐",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500 transition-all"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 py-6 text-center text-gray-500 text-sm">
        <p>VFX Director Pipeline | Professional Scene Breakdown Tool</p>
        <p className="mt-1">
          Designed for VFX artists, pipeline supervisors, and AI automation
        </p>
      </footer>
    </div>
  );
}
