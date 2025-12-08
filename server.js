import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Import node-fetch

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GitHub Contributions API proxy
app.get('/api/github-contributions', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'GitHub username is required.' });
  }

  try {
    const githubApiResponse = await fetch(`https://ghchart.rshah.org/contributions?user=${username}`);
    if (!githubApiResponse.ok) {
      throw new Error(`Failed to fetch from GitHub contributions API: ${githubApiResponse.statusText}`);
    }
    const data = await githubApiResponse.json();
    res.json(data);
  } catch (error) {
    console.error('Error proxying GitHub contributions API:', error);
    res.status(500).json({ error: 'Failed to retrieve GitHub contributions.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});