
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

  /* Menargetkan menu Transfer Online, Response Code, dan SNAP Regis & Auth di Sidebar */
  a[href$="/transferonline"],
  a[href$="/responsecode"],
  a[href$="/authentication"] {
      font-weight: 700 !important; /* Membuat teks jadi Bold */
      font-size: 1.05rem !important; /* Memperbesar sedikit ukuran teks (standar biasanya 0.875rem atau 1rem) */
  }
`;