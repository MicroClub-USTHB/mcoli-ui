// Liveness probe for the container health check (Dockerfile HEALTHCHECK, Dokploy swarm settings).
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json({ status: 'ok' });
}
