import dns from 'dns/promises';

export default async function handler(req, res) {
  try {
    const serverDomain = 'homelab.cforsythe.me';
    const ip = await dns.lookup(serverDomain);
    res.status(200).json({ ip: ip.address });
  } catch (error) {
    res.status(500).json({ error: 'Could not resolve DNS' });
  }
}