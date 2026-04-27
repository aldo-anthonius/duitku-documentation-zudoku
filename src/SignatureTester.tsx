import React, { useState } from 'react';
import forge from 'node-forge';

export default function SignatureTester() {
    // state untuk menyimpan nilai dari input
  const [clientKey, setClientKey] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // <-- Tambahan state untuk animasi loading

  const handleGenerate = () => {
    // Reset state dan nyalakan efek loading
    setError('');
    setSignature('');
    setIsGenerating(true);

    // Beri jeda sangat sedikit (50ms) agar UI sempat merender status kosong/loading
    setTimeout(() => {
      try {
        if (!clientKey || !timestamp || !privateKey) {
          setError('Mohon isi Client Key, Timestamp, dan Private Key.');
          setIsGenerating(false);
          return;
        }

        const stringToSign = `${clientKey}|${timestamp}`;
        let privateKeyObj;
        const pkString = privateKey.trim();
        
        // format RSAKeyValue
        if (pkString.startsWith('<RSAKeyValue>')) {
          const getXmlValue = (tag: string) => {
            const match = new RegExp(`<${tag}>(.*?)</${tag}>`).exec(pkString);
            return match ? match[1] : '';
          };

          const b64ToBigInt = (b64: string) => {
            const hex = forge.util.bytesToHex(forge.util.decode64(b64));
            // @ts-ignore
            return new forge.jsbn.BigInteger(hex, 16);
          };

          privateKeyObj = forge.pki.setRsaPrivateKey(
            b64ToBigInt(getXmlValue('Modulus')),
            b64ToBigInt(getXmlValue('Exponent')),
            b64ToBigInt(getXmlValue('D')),
            b64ToBigInt(getXmlValue('P')),
            b64ToBigInt(getXmlValue('Q')),
            b64ToBigInt(getXmlValue('DP')),
            b64ToBigInt(getXmlValue('DQ')),
            b64ToBigInt(getXmlValue('InverseQ'))
          );
          // format BEGIN PRIVATE KEY (pem)
        } else {
          privateKeyObj = forge.pki.privateKeyFromPem(pkString);
        }

        const md = forge.md.sha256.create();
        md.update(stringToSign, 'utf8');

        const rawSignature = privateKeyObj.sign(md);
        const base64Signature = forge.util.encode64(rawSignature);

        setSignature(base64Signature);
      } catch (err) {
        console.error(err);
        setError('Gagal generate signature. Pastikan format Private Key sudah benar (PEM atau XML).');
      } finally {
        // Matikan efek loading setelah selesai
        setIsGenerating(false); 
      }
    }, 50); // Jeda 50ms
  };

  return (
    <div style={{ border: '1px solid #475569', borderRadius: '8px', padding: '20px', marginTop: '20px', marginBottom: '20px', backgroundColor: '#0f172a' }}>
      <h3 style={{ marginTop: '0', color: '#f8fafc' }}>🛠️ Asymmetric Signature Tester</h3>
      
      <div style={{ backgroundColor: '#7f1d1d', color: '#fca5a5', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
        <strong>⚠️ SECURITY WARNING:</strong><br/>
        Please <strong>DO NOT</strong> use your Production Private Key here. This tool is strictly for testing purposes using your <strong>Sandbox Private Key</strong>. 
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#cbd5e1' }}>X-CLIENT-KEY</label>
        <input 
          type="text" 
          value={clientKey}
          onChange={(e) => setClientKey(e.target.value)}
          placeholder="e.g. DBXXXX"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#1e293b', color: 'white' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#cbd5e1' }}>X-TIMESTAMP</label>
        <input 
          type="text" 
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="e.g. 2022-09-16T13:00:00+07:00"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#1e293b', color: 'white' }}
        />
      </div>

        <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#cbd5e1' }}>Private Key (Supports PEM or XML)</label>
            <textarea 
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="Paste your Private Key here...&#10;It accepts both -----BEGIN PRIVATE KEY----- format AND <RSAKeyValue> format."
            rows={6}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#1e293b', color: 'white', fontFamily: 'monospace' }}
            />
        </div>

      <button 
        type="button" // <-- Memastikan ini tidak memicu submit event
        onClick={handleGenerate}
        disabled={isGenerating} // <-- Tombol mati sebentar saat loading
        style={{ 
          backgroundColor: isGenerating ? '#475569' : '#2563eb', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: isGenerating ? 'not-allowed' : 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        {isGenerating ? 'Generating...' : 'Generate X-SIGNATURE'}
      </button>

      {error && (
        <div style={{ color: '#ef4444', marginTop: '15px', fontWeight: 'bold' }}>
          ❌ {error}
        </div>
      )}

      {signature && !isGenerating && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#064e3b', border: '1px solid #059669', borderRadius: '6px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#a7f3d0' }}>✅ Generated Signature (Base64):</label>
          <code style={{ wordBreak: 'break-all', color: 'white' }}>{signature}</code>
        </div>
      )}
    </div>
  );
}