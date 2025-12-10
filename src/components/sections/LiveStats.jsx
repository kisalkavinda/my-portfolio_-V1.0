import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, TrendingUp, Star, GitFork, Code, Users, Activity } from 'lucide-react'
import GitHubHeatmap from './GitHubHeatmap'; // Import GitHubHeatmap
import GlitchText from '../common/GlitchText'

const LiveStats = () => {
  const [githubData, setGithubData] = useState(null)
  const [loading, setLoading] = useState(true)
  const githubUsername = 'kisalkavinda'

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      setLoading(true)

      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`)

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data')
      }

      const userData = await userResponse.json()

      // Fetch repos data
      const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`)

      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repos')
      }

      const reposData = await reposResponse.json()

      // Calculate stats
      const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0)
      const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0)
      const languages = {}

      reposData.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1
        }
      })

      const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang)

      setGithubData({
        ...userData,
        totalStars,
        totalForks,
        topLanguages,
        recentRepos: reposData.slice(0, 5)
      })

    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      alert(`Could not fetch GitHub data. Please check:\n1. Username is correct: "${githubUsername}"\n2. GitHub API is accessible\n3. You have internet connection\n\nError: ${error.message}`)

      // Don't set fallback data - keep loading state or show error
      setGithubData(null)
    } finally {
      setLoading(false)
    }
  }

  // LinkedIn stats (simulated - LinkedIn API requires OAuth)
  const linkedInStats = {
    connections: '83',
    postImpressions: '54',
    profileViews: '14',
    searchAppearances: '2'
  }

  if (loading) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Separator line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />

        {/* Full section gradient overlay - transparent top, visible bottom */}
        <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-text-secondary">Fetching live GitHub data...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!githubData) {
    return (
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Separator line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-75 blur-sm z-0" />

        {/* Full section gradient overlay - transparent top, visible bottom */}
        <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <p className="text-red-500 mb-4">⚠️ Could not load GitHub data</p>
            <p className="text-text-secondary mb-4">
              Please check your internet connection or GitHub username
            </p>
            <motion.button
              onClick={fetchGitHubData}
              className="px-6 py-2 bg-accent hover:bg-highlight rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Try Again
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  const statCards = [
    // GitHub Stats
    {
      icon: Code,
      label: 'Public Repos',
      value: githubData?.public_repos || '0',
      color: 'from-accent to-accent',
      platform: 'GitHub',
      category: 'github'
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: githubData?.totalStars || '0',
      color: 'from-yellow-500 to-orange-500',
      platform: 'GitHub',
      category: 'github'
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: githubData?.totalForks || '0',
      color: 'from-blue-500 to-cyan-500',
      platform: 'GitHub',
      category: 'github'
    },
    {
      icon: Users,
      label: 'Followers',
      value: githubData?.followers || '0',
      color: 'from-green-500 to-emerald-500',
      platform: 'GitHub',
      category: 'github'
    }
  ]

  const linkedinStats = [
    {
      icon: Users,
      label: 'Connections',
      value: linkedInStats.connections,
      color: 'from-blue-600 to-blue-700',
      platform: 'LinkedIn',
      category: 'linkedin'
    },
    {
      icon: TrendingUp,
      label: 'Post Reach',
      value: linkedInStats.postImpressions,
      color: 'from-accent to-highlight',
      platform: 'LinkedIn',
      category: 'linkedin'
    },
    {
      icon: Activity,
      label: 'Profile Views',
      value: linkedInStats.profileViews,
      color: 'from-accent to-accent',
      platform: 'LinkedIn',
      category: 'linkedin'
    },
    {
      icon: TrendingUp,
      label: 'Search Appears',
      value: linkedInStats.searchAppearances,
      color: 'from-highlight to-highlight',
      platform: 'LinkedIn',
      category: 'linkedin'
    }
  ]

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Separator line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-75 blur-sm z-0" />
      {/* Full section gradient overlay - transparent top, visible bottom */}
      <div className="absolute inset-0 pointer-events-none z-0 dark:bg-gradient-to-b dark:from-transparent dark:via-black/25 dark:to-black/55" />
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-highlight rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="relative text-4xl md:text-5xl font-bold mb-4 font-display">
            Live <GlitchText text="Stats" />
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real-time data from GitHub and LinkedIn
          </p>
        </motion.div>

        {/* GitHub Stats Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Github className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold">GitHub Statistics</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                className="relative bg-surface bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent/20 hover:border-accent/50 transition-all group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 15px var(--accent-60), 0 0 30px var(--accent-40)' }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-5 h-5 text-surface" />
                  </motion.div>

                  <div className="text-3xl font-bold bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>

                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* LinkedIn Stats Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Linkedin className="w-6 h-6 text-accent" />
            <h3 className="text-2xl font-bold">LinkedIn Statistics</h3>
            <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/30">
              Estimated
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {linkedinStats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative bg-surface bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-accent/20 hover:border-accent/50 transition-all group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 0 15px var(--accent-60), 0 0 30px var(--accent-40)' }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-5 h-5 text-surface" />
                  </motion.div>

                  <div className="text-3xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#4dfffe] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top Languages */}
        {githubData?.topLanguages && (
          <motion.div
            className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/20 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Github className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Most Used Languages</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {githubData.topLanguages.map((lang, index) => (
                <motion.span
                  key={lang}
                  className="px-4 py-2 bg-gradient-to-r from-accent/10 to-highlight/10 border border-accent/30 rounded-full text-accent font-semibold"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Activity */}
        {githubData?.recentRepos && githubData.recentRepos.length > 0 && (
          <motion.div
            className="bg-surface bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-accent/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-accent" />
              <h3 className="text-2xl font-bold">Recent Github Repositories</h3>
            </div>

            <div className="space-y-3">
              {githubData.recentRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-surface/20 bg-surface/30 rounded-lg hover:bg-accent/10 transition-all group border border-accent/20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-accent group-hover:text-highlight transition-colors">
                        {repo.name}
                      </h4>
                      {repo.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={12} />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* GitHub Activity Heatmap */}
        <motion.div
          className="mt-8 p-4 rounded-xl border-accent" // Added border-accent here
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <GitHubHeatmap githubUsername={githubUsername} />
        </motion.div>

        {/* Last Updated */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-text-secondary">
            📊 Stats updated in real-time via API • Last refreshed: {new Date().toLocaleString()}
          </p>
          <motion.button
            onClick={fetchGitHubData}
            className="mt-4 px-6 py-2 bg-accent hover:bg-highlight rounded-lg text-sm font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 Refresh Data
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default LiveStats