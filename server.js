import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors()); // Mengizinkan Zudoku nembak ke sini
app.use(express.json()); // Membaca JSON dari Zudoku

// secret key duitku
const SECRET_KEY = "de56f832487bc1ce1de5ff2cfacf8d9486c61da69df6fd61d5537b6b7d6d354d"; 

app.post('/inquirysandbox', async (req, res) => {
  try {
    // 1. Tangkap data yang diketik user di Zudoku
    const { userId, amountTransfer, bankAccount, bankCode, email, purpose, custRefNumber, senderId, senderName } = req.body;

    // 2. AUTO-GENERATE TIMESTAMP
    const timestamp = Date.now();

    // 3. AUTO-CALCULATE SIGNATURE SHA256
    const seed = `${email}${timestamp}${bankCode}${bankAccount}${amountTransfer}${purpose}${SECRET_KEY}`;
    const signature = crypto.createHash('sha256').update(seed).digest('hex');

    // 4. Susun data untuk dikirim ke Duitku ASLI
    const duitkuRequest = {
      userId,
      amountTransfer,
      bankAccount,
      bankCode,
      email,
      purpose,
      timestamp,
      custRefNumber: custRefNumber || "000000000200",
      senderId: senderId || 23423,
      senderName: senderName || "Testing",
      signature
    };

    // 5. Tembak ke API Sandbox Duitku
    const response = await fetch('https://sandbox.duitku.com/webapi/api/disbursement/inquirysandbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duitkuRequest)
    });

    const data = await response.json();

    // 6. BIKIN DINAMIS: Kita sisipkan email/nama yang diketik user ke dalam respon Duitku!
    // Supaya di layar Zudoku kelihatan responnya berubah sesuai ketikanmu
    data._dynamic_email_echo = email;
    data._dynamic_sender_echo = senderName;

    // 7. Kembalikan hasilnya ke layar Zudoku
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal hit ke Duitku Asli" });
  }
});


app.post('/transfersandbox', async (req, res) => {
  try {
    const { userId, amountTransfer, bankAccount, bankCode, email, purpose, custRefNumber, accountName, disburseId } = req.body;
    const timestamp = Date.now();

    // ⚠️ PERHATIAN: RUMUS SIGNATURE TRANSFER BEDA DENGAN INQUIRY!
    // Sesuai dokumentasi Duitku: email + timestamp + bankCode + bankAccount + accountName + custRefNumber + amountTransfer + purpose + disburseId + secretKey
    const seed = `${email}${timestamp}${bankCode}${bankAccount}${accountName}${custRefNumber}${amountTransfer}${purpose}${disburseId}${SECRET_KEY}`;
    const signature = crypto.createHash('sha256').update(seed).digest('hex');

    const duitkuRequest = {
      userId, amountTransfer, bankAccount, accountName, custRefNumber, bankCode, email, purpose, timestamp, disburseId, signature
    };

    const response = await fetch('https://sandbox.duitku.com/webapi/api/disbursement/transfersandbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(duitkuRequest)
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal hit Transfer Duitku Asli" });
  }
});

// Jalankan server di port 3001 (karena Zudoku pakai 3000)
app.listen(3001, () => {
  console.log('🚀 Proxy Server Duitku jalan di http://localhost:3001');
});