import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const LEADS_FILE = path.join(process.cwd(), 'leads.json');

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
    return res.status(200).json({ success: true, leads: [] });
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed to clear database', details: e.message });
  }
}
