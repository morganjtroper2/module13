const searchGithubUsers = async () => {
  try {
    const start = Math.floor(Math.random() * 10000000) + 1;
    console.log('GitHub Token:', import.meta.env.VITE_GITHUB_TOKEN || 'Token not found');

    const response = await fetch(`https://api.github.com/users?since=${start}&per_page=10`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const users = await response.json();

    const limitedUsers = users.slice(0, 10);

    const detailedUsers = await Promise.all(
      limitedUsers.map(async (user: { login: string }) => {
        try {
          const userDetailsResponse = await fetch(`https://api.github.com/users/${user.login}`, {
            headers: {
              Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            },
          });

          if (!userDetailsResponse.ok) {
            throw new Error(`Failed to fetch details for ${user.login}`);
          }

          return await userDetailsResponse.json();
        } catch (error) {
          console.error(`Skipping user ${user.login} due to error:`, error);
          return null; 
        }
      })
    );

    return detailedUsers.filter(user => user !== null);
  } catch (err) {
    console.error('Error fetching user details:', err);
    return [];
  }
};

export { searchGithubUsers };