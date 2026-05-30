import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  const LEADS_FILE = path.join(process.cwd(), 'leads.json');

  function getLeads() {
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const data = fs.readFileSync(LEADS_FILE, 'utf-8');
        return JSON.parse(data);
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  // Handle Fetching Leads
  if (req.method === 'GET') {
    return res.status(200).json(getLeads());
  }

  // Handle Form Submission
  if (req.method === 'POST') {
    const { name, phone, service } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ error: "Ism va telefon raqami kiritilishi shart." });
    }

    const newLead = {
      name,
      phone,
      service: service || 'Konsultatsiya',
      timestamp: new Date().toISOString()
    };

    // Save locally (Graceful fallback on stateless Vercel)
    try {
      const leads = getLeads();
      leads.unshift(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (e) {
      console.log('Local persistence skipped on serverless runtime.');
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    let telegramSent = false;
    let telegramError = null;

    if (botToken && chatId) {
      try {
        const textMessage = `🔔 *Yangi Mijoz (SMM Lid)*\n\n👤 *Ism:* ${name}\n📞 *Telefon:* \`${phone}\`\n💼 *Xizmat:* ${newLead.service}`;
        const apiURL = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: textMessage,
            parse_mode: 'Markdown'
          })
        });

        const responseData: any = await response.json();
        if (responseData.ok) {
          telegramSent = true;
        } else {
          telegramError = responseData.description || "Telegram API validation error";
        }
      } catch (err: any) {
        telegramError = err.message || "Connection logic error";
      }
    } else {
      telegramError = "Bot tokeni yoki Chat ID topilmadi (sozlamalarni kiritish lozim)";
    }

    return res.status(200).json({
      success: true,
      message: "Ajoyib! Ma'lumotlaringiz muvaffaqiyatli qabul qilindi.",
      telegramSent,
      telegramError,
      lead: newLead
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
