/** GitHub star count for the header, cached for an hour. Returns null when the API is unreachable. */
export async function getGithubStars(): Promise<number | null> {
  try {
    const res = await fetch('https://api.github.com/repos/MicroClub-USTHB/mcoli-ui', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? null;
  } catch {
    return null;
  }
}

export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

/** Human contributors, most active first, cached for a day. Empty when the API is unreachable. */
export async function getGithubContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/MicroClub-USTHB/mcoli-ui/contributors?per_page=30',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data = (await res.json()) as {
      login: string;
      avatar_url: string;
      html_url: string;
      contributions: number;
      type: string;
    }[];
    return data
      .filter((c) => c.type === 'User')
      .map((c) => ({
        login: c.login,
        avatarUrl: c.avatar_url,
        profileUrl: c.html_url,
        contributions: c.contributions,
      }));
  } catch {
    return [];
  }
}
