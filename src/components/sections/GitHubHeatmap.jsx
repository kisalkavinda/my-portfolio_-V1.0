import React, { useState, useEffect } from 'react';
import { ActivityCalendar } from 'react-activity-calendar';
import { Tooltip } from 'react-tooltip';
import { Github } from 'lucide-react';

const GitHubHeatmap = ({ githubUsername = "grubersjoe", _theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Alternative API endpoint without CORS issues
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub contributions: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Convert the API response to the format expected by react-activity-calendar
        const contributions = result.contributions;
        const formattedData = contributions.map(item => ({
          date: item.date,
          count: item.count,
          level: Math.min(4, Math.floor(item.count / 5)) // Convert count to level 0-4
        }));
        
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
        setError(err.message);
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
      )}
      <Tooltip id="react-tooltip" className="bg-background-main text-text-primary rounded-md p-2 text-sm" />
    </div>
  );
};

export default GitHubHeatmap;