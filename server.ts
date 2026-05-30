import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const LEADS_FILE = path.join(process.cwd(), 'leads.json');

app.use(express.json());

// Ensure files are handled gracefully
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

function saveLead(lead: { name: string; phone: string; service: string; timestamp: string }) {
  const leads = getLeads();
  leads.unshift(lead);
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  return leads;
}

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/leads', (req, res) => {
  res.json(getLeads());
});

app.post('/api/leads/clear', (req, res) => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), 'utf-8');
  res.json({ success: true, leads: [] });
});

app.post('/api/leads', async (req, res) => {
  const { name, phone, service } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Ism va telefon raqami kiritilishi shart." });
  }

  const newLead = {
    name,
    phone,
    service: service || 'Konsultatsiya',
    timestamp: new Date().toISOString()
  };

  saveLead(newLead);

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  let telegramSent = false;
  let telegramError = null;

  if (botToken && chatId) {
    try {
      const textMessage = `🔔 *Yangi Mijoz (SMM Lid)*\n\n👤 *Ism:* ${name}\n📞 *Telefon:* \`${phone}\`\n💼 *Xizmat:* ${newLead.service}\n📅 *Vaqt:* ${new Date().toLocaleString('uz-UZ', { timeZone: 'UTC' })} (UTC)`;
      
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

      const responseData = await response.json();
      if (responseData.ok) {
        telegramSent = true;
      } else {
        telegramError = responseData.description || "Telegram bot xatosi yuklandi";
      }
    } catch (err: any) {
      telegramError = err.message || "Ulanish xatoligi";
    }
  } else {
    telegramError = "Bot tokeni yoki Chat ID topilmadi (sozlamalarni kiritish lozim)";
  }

  res.json({
    success: true,
    message: "Ajoyib! Ma'lumotlaringiz muvaffaqiyatli qabul qilindi.",
    telegramSent,
    telegramError,
    lead: newLead
  });
});

// Serve assets based on environment
async function initServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fullstack SMM Server is active on port: ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Initialization Failed", err);
});
