import crypto from 'crypto';

export default async function handler(req, res) {
  // 1. SETUP CORS (Supaya Zudoku di localhost boleh nembak ke sini)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Jika browser cuma ngecek CORS (Preflight request), kasih lampu hijau
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 2. TANGKAP DATA DARI ZUDOKU
  try {
    const { userId, amountTransfer, bankAccount, bankCode, email, purpose, custRefNumber, senderId, senderName } = req.body;

    // 3. AUTO-GENERATE TIMESTAMP & SIGNATURE
    const timestamp = Date.now();
    // ⚠️ GANTI DENGAN SECRET KEY DUITKU SANDBOX KAMU (Nanti di Vercel pakai process.env.SECRET_KEY)
    const SECRET_KEY = "MASUKKAN_SECRET_KEY_KAMU_DISINI"; 

    const seed = `${email}${timestamp}${bankCode}${bankAccount}${amountTransfer}${purpose}${SECRET_KEY}`;
    const signature = crypto.createHash('sha256').update(seed).digest('hex');

    // 4. SUSUN DATA UNTUK DIKIRIM KE DUITKU ASLI
    const duitkuRequest = {
      userId, amountTransfer, bankAccount, bankCode, email, purpose, timestamp,
      custRefNumber: custRefNumber || "000000000200",
      senderId: senderId || 23423,
      senderName: senderName || "JAMET",
      signature
    };

    // 5. TEMBAK KE API SANDBOX DUITKU
    const response = await fetch('https://sandbox.duitku.com/webapi/api/disbursement/inquirysandbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duitkuRequest)
    });

    const data = await response.json();

    // (Opsional) Bikin dinamis sesuai yang diketik user di layar
    data._dynamic_email_echo = email;

    // 6. KEMBALIKAN KE ZUDOKU
    return res.status(200).json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Gagal memproses request ke Duitku" });
  }
}