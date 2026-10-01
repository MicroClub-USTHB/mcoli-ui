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
