
export const customCss = `

  h1#description {
    color: #1a468d !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 2.3em;
  }
  /* card authorization */
  
  /* 1.(Light Mode Default) */
  .auth-box {
    border: 1px solid #e2e8f0 !important;
    border-radius: 8px !important;
    margin-bottom: 24px !important;
    overflow: hidden !important;
    background-color: #f8fafc !important;
  }

  /* 2. Gaya Kotak Utama (Dark Mode) */
  html.dark .auth-box {
    border: 1px solid #334155 !important;
    background-color: #162032 !important; /* Warna gelap ala Martis */
  }

  /* 3. Bagian Judul (Authorization) */
  .auth-title {
    font-size: 16px !important;
    font-weight: 700 !important;
    padding: 12px 16px !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }
  
  html.dark .auth-title {
    border-bottom: 1px solid #334155 !important;
    color: #f8fafc !important;
  }

  /* 4. Bagian Isi Teks */
  .auth-content {
    padding: 16px !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  .alert-box {
    background-color: #fffbeb !important; /* Kuning soft (Light Mode) */
    border: 1px solid #fde68a !important;
    border-left: 4px solid #f59e0b !important; /* Garis oranye tebal di kiri */
    border-radius: 8px !important;
    margin: 24px 0 !important;
    overflow: hidden !important;
  }

  html.dark .alert-box {
    background-color: #422006 !important; /* Coklat/Oranye gelap (Dark Mode) */
    border: 1px solid #78350f !important;
    border-left: 4px solid #f59e0b !important;
  }

  .alert-title {
    font-size: 15px !important;
    font-weight: 700 !important;
    padding: 12px 16px !important;
    color: #b45309 !important; /* Teks oranye tua */
    border-bottom: 1px solid #fde68a !important;
  }

  html.dark .alert-title {
    color: #fcd34d !important;
    border-bottom: 1px solid #78350f !important;
  }

  .alert-content {
    padding: 12px 16px 16px 16px !important;
    font-size: 14px !important;
    line-height: 1.6 !important;
  }

  /* Rapihin jarak bullet point di dalam kotak */
  .alert-content ul {
    margin: 0 !important;
    padding-left: 20px !important;
  }
  
  .alert-content li {
    margin-bottom: 8px !important;
  }
  
  .alert-content li:last-child {
    margin-bottom: 0 !important;
  }
  
  div:has(> a[href="https://zudoku.dev"]) {
    display: none !important;
  }

  /* ========================================= */
  /* POLISHING TAMPILAN API REFERENCE (UI/UX)  */
  /* ========================================= */

  /* 1. Bikin Card (Kotak Request/Response) Lebih Mewah / Mengambang */
  main [data-pagefind-body] > div > div.border,
  main .prose > div.border {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05) !important;
    border-color: #e2e8f0 !important;
    border-radius: 12px !important;
    transition: all 0.3s ease !important;
  }
  
  /* Hover effect biar interaktif */
  main .prose > div.border:hover {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1) !important;
    border-color: #cbd5e1 !important;
  }

  html.dark main .prose > div.border {
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3) !important;
    border-color: #334155 !important;
    background-color: #0f172a !important; /* Warna dark mode lebih pekat */
  }

  /* 2. Percantik Nama Parameter (userId, amountTransfer, dll) */
  .prose span.font-mono {
    color: #0284c7 !important; /* Biru terang */
    background-color: #f0f9ff !important; /* Background biru super pudar */
    padding: 2px 6px !important;
    border-radius: 4px !important;
    border: 1px solid #bae6fd !important;
    font-size: 13px !important;
  }

  html.dark .prose span.font-mono {
    color: #38bdf8 !important;
    background-color: #0c4a6e !important;
    border: 1px solid #0284c7 !important;
  }

  /* 3. Percantik Kotak "Example:" di bawah parameter */
  .prose code:not([class*="language-"]) {
    background-color: #f1f5f9 !important;
    color: #475569 !important;
    border-radius: 4px !important;
    padding: 2px 6px !important;
    font-size: 13px !important;
  }

  html.dark .prose code:not([class*="language-"]) {
    background-color: #1e293b !important;
    color: #cbd5e1 !important;
  }

  /* 4. Percantik Tombol/Pill (misal tab 200, 400 di Responses) */
  [role="tablist"] {
    background-color: #f8fafc !important;
    border-radius: 8px !important;
    padding: 4px !important;
    border: 1px solid #e2e8f0 !important;
  }
  
  html.dark [role="tablist"] {
    background-color: #1e293b !important;
    border-color: #334155 !important;
  }

`;