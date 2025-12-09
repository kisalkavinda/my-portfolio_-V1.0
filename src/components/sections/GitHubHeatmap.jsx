import React, { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Tooltip } from 'react-tooltip';
import { Github } from 'lucide-react';

const GitHubHeatmap = ({ githubUsername = "grubersjoe", _theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async (retryCount = 0) => {
      try {
        setLoading(true);
        setError(null);

        // Try multiple APIs in order of preference
        let response;
        let apiUsed = null;

        // Try API 1: Vercel API via CORS Proxy (to bypass localhost restrictions)
        try {
          // Using corsproxy.io as it handles redirects better and is more reliable
          // Note: corsproxy.io requires the target URL to be encoded
          response = await fetch(`https://corsproxy.io/?${encodeURIComponent(`https://github-contributions.vercel.app/api/v1/${githubUsername}`)}`, {
            signal: AbortSignal.timeout(10000)
          });
          if (response.ok) {
            apiUsed = 'vercel';
            console.log('Using Vercel API (via corsproxy.io) for contributions');
          }
        } catch (e) {
          console.log('Vercel API proxy failed, trying next...', e.message);
        }

        // Try API 2: Jogruber API (fallback)
        if (!apiUsed) {
          try {
            response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`, {
              signal: AbortSignal.timeout(8000)
            });
            if (response.ok) {
              apiUsed = 'jogruber';
              console.log('Using Jogruber API for contributions');
            }
          } catch (e) {
            console.log('Jogruber API failed, trying GitHub Events API...');
          }
        }

        // Fallback API 3: GitHub Events (limited to 90 days but always available)
        if (!apiUsed) {
          response = await fetch(`https://api.github.com/users/${githubUsername}/events/public`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          });
          apiUsed = 'github-events';
          console.log('Using GitHub Events API (limited to 90 days)');
        }

        if (!response.ok) {
          throw new Error(`All APIs failed`);
        }

        const result = await response.json();
        let formattedData = [];

        // Parse data based on which API worked
        if (apiUsed === 'vercel') {
          // Vercel API format: { contributions: [{ date, count, intensity }] }
          // Use intensity value directly as it's more reliable
          // Data comes in reverse chronological (Dec -> Jan), so we MUST reverse it
          formattedData = result.contributions
            .reverse() // Fix: Reverse to get Jan -> Dec order
            .map(item => ({
              date: item.date,
              count: parseInt(item.intensity) * 3, // Convert intensity to approximate count
              level: parseInt(item.intensity)
            }));
        } else if (apiUsed === 'jogruber') {
          // Jogruber API format: { contributions: [{ date, count }] }
          formattedData = result.contributions.map(item => ({
            date: item.date,
            count: item.count,
            level: Math.min(4, Math.floor(item.count / 5))
          }));
        } else {
          // GitHub Events API - limited data
          const contributionsByDate = {};
          const today = new Date();
          const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

          for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
            contributionsByDate[new Date(d).toISOString().split('T')[0]] = 0;
          }

          result.forEach(event => {
            const date = event.created_at.split('T')[0];
            if (contributionsByDate.hasOwnProperty(date)) {
              contributionsByDate[date]++;
            }
          });

          formattedData = Object.entries(contributionsByDate).map(([date, count]) => ({
            date,
            count,
            level: Math.min(4, Math.floor(count / 2))
          }));
        }

        setData(formattedData);
      } catch (err) {
        if (retryCount < 1) {
          setTimeout(() => fetchData(retryCount + 1), 3000);
          return;
        }

        if (process.env.NODE_ENV === 'development') {
          console.warn('GitHub contributions unavailable:', err.message);
        }
        setError('Unable to load GitHub activity');
      } finally {
        setLoading(false);
      }
    };

    if (githubUsername) {
      fetchData();
    }
  }, [githubUsername]);

  // Custom color scale
  const customTheme = {
    light: ['#ebedf0', 'var(--accent-10)', 'var(--accent-20)', 'var(--accent-30)', 'var(--accent)'],
    dark: ['#161b22', 'var(--accent-10)', 'var(--accent-20)', 'var(--accent-30)', 'var(--accent)'],
  };

  const getColorScheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-accent text-text-primary">
      <h3 className="text-2xl font-bold mb-4 text-center text-accent">
        <Github size={28} className="inline-block mr-2 align-middle" /> GitHub Activity
      </h3>

      {error && (
        <p className="text-center text-red-500 mb-4">
          Error: {error}
        </p>
      )}

      {loading && !error && (
        <p className="text-center text-text-secondary mb-4">Loading contributions...</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-text-secondary mb-4">No contributions found for {githubUsername}.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="flex justify-center w-full overflow-x-auto">
          <ActivityCalendar
            data={data}
            blockSize={12}
            blockMargin={4}
            colorScheme={getColorScheme()}
            theme={customTheme}
            showWeekdayLabels
            renderBlock={(block, activity) =>
              React.cloneElement(block, {
                'data-tooltip-id': 'react-tooltip',
                'data-tooltip-content': `${activity.date}: ${activity.count} contributions`,
                'data-tooltip-place': 'top',
              })
            }
          />
        </div>
      )}
      <Tooltip id="react-tooltip" className="bg-background-main text-text-primary rounded-md p-2 text-sm" />
    </div>
  );
};

export default GitHubHeatmap;