import React, { useState } from 'react';
import forge from 'node-forge';

export default function SignatureTester() {
  const [clientKey, setClientKey] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  
  const [signature, setSignature] = useState('');
  const [debugString, setDebugString] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setError('');
    setSignature('');
    setDebugString('');
    setIsGenerating(true);

    setTimeout(() => {
      try {
        if (!clientKey || !timestamp || !privateKey) {
          setError('Mohon isi Client Key, Timestamp, dan Private Key.');
          setIsGenerating(false);
          return;
        }

        const stringToSign = `${clientKey}|${timestamp}`;
        setDebugString(stringToSign);

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
        setIsGenerating(false); 
      }
    }, 50);
  };

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-6 my-6 bg-slate-50 dark:bg-slate-900 shadow-sm transition-colors duration-200">
      <h3 className="mt-0 text-slate-800 dark:text-slate-100 font-bold text-xl mb-4">🛠️ Asymmetric Signature Tester</h3>
      
      <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3.5 rounded-md mb-6 text-sm border border-red-200 dark:border-red-800/50">
        <strong>⚠️ SECURITY WARNING:</strong><br/>
        Please <strong>DO NOT</strong> use your Production Private Key here. This tool is strictly for testing purposes using your <strong>Sandbox Private Key</strong>. 
      </div>

      <div className="mb-4">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">X-CLIENT-KEY</label>
        <input 
          type="text" 
          value={clientKey}
          onChange={(e) => setClientKey(e.target.value)}
          placeholder="e.g. DBXXXX"
          className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">X-TIMESTAMP</label>
        <input 
          type="text" 
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          placeholder="e.g. 2022-09-16T13:00:00+07:00"
          className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">Private Key (Supports PEM or XML)</label>
        <textarea 
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Paste your Private Key here...&#10;It accepts both -----BEGIN PRIVATE KEY----- format AND <RSAKeyValue> format."
          rows={6}
          className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
      </div>

      <button 
        type="button" 
        onClick={handleGenerate}
        disabled={isGenerating} 
        className={`w-full py-3 px-4 rounded-md font-bold text-white transition-all duration-200 ${
          isGenerating 
            ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow active:scale-[0.99]'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate X-SIGNATURE'}
      </button>

      {error && (
        <div className="text-red-600 dark:text-red-400 mt-4 font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800/30">
          ❌ {error}
        </div>
      )}

      {signature && !isGenerating && (
        <div className="mt-6 flex flex-col gap-4">
          
          {/* Debug StringToSign */}
          <div className="p-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-md">
            <label className="block mb-2 font-bold text-slate-700 dark:text-slate-300 text-sm">🔍 String to Sign (Before RSA):</label>
            <code className="block break-all text-slate-600 dark:text-slate-400 text-sm font-mono bg-white dark:bg-slate-900 p-2.5 rounded border border-slate-200 dark:border-slate-700">
              {debugString}
            </code>
          </div>

          {/* Final Signature */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300 dark:border-emerald-700/50 rounded-md">
            <label className="block mb-2 font-bold text-emerald-800 dark:text-emerald-400 text-sm">✅ Generated Signature (Base64):</label>
            <code className="block break-all text-emerald-900 dark:text-emerald-100 text-sm font-mono font-semibold bg-white dark:bg-emerald-950/50 p-2.5 rounded border border-emerald-200 dark:border-emerald-800/50">
              {signature}
            </code>
          </div>

        </div>
      )}
    </div>
  );
}