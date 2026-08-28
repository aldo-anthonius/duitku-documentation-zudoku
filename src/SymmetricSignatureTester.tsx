import React, { useState } from 'react';
import forge from 'node-forge';

export default function SymmetricSignatureTester() {
  const [httpMethod, setHttpMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [secretKey, setSecretKey] = useState('');
  
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
        if (!endpoint || !accessToken || !timestamp || !secretKey) {
          setError('Mohon isi Endpoint, Access Token, Timestamp, dan Secret Key.');
          setIsGenerating(false);
          return;
        }

        let minifiedBody = '';
        if (requestBody.trim() !== '') {
          try {
            const parsedJson = JSON.parse(requestBody);
            minifiedBody = JSON.stringify(parsedJson);
          } catch (jsonErr) {
            setError('Format JSON pada Request Body tidak valid. Pastikan formatnya benar.');
            setIsGenerating(false);
            return;
          }
        }

        const mdSha256 = forge.md.sha256.create();
        mdSha256.update(minifiedBody, 'utf8');
        const hashedBodyHex = mdSha256.digest().toHex().toLowerCase();

        const stringToSign = `${httpMethod}:${endpoint}:${accessToken}:${hashedBodyHex}:${timestamp}`;
        setDebugString(stringToSign);

        const hmac = forge.hmac.create();
        hmac.start('sha512', forge.util.encodeUtf8(secretKey));
        hmac.update(forge.util.encodeUtf8(stringToSign));

        const rawSignature = hmac.digest().bytes();
        const base64Signature = forge.util.encode64(rawSignature);

        setSignature(base64Signature);
      } catch (err) {
        console.error(err);
        setError('Gagal generate signature. Silakan cek kembali input Anda.');
      } finally {
        setIsGenerating(false);
      }
    }, 50);
  };

  return (
    <div className="border border-slate-300 dark:border-slate-700 rounded-lg p-6 my-6 bg-slate-50 dark:bg-slate-900 shadow-sm transition-colors duration-200">
      <h3 className="mt-0 text-slate-800 dark:text-slate-100 font-bold text-xl mb-4">🛠️ Symmetric Signature Tester</h3>
      
      <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3.5 rounded-md mb-6 text-sm border border-red-200 dark:border-red-800/50">
        <strong>⚠️ SECURITY WARNING:</strong><br/>
        Please <strong>DO NOT</strong> use your Production Secret Key here. This tool is strictly for testing purposes.
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">HTTP Method</label>
          <select 
            value={httpMethod}
            onChange={(e) => setHttpMethod(e.target.value)}
            className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="GET">GET</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="flex-[3]">
          <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">Endpoint (Relative Path)</label>
          <input 
            type="text" 
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="e.g. /webapi/api/disbursement/inquirysandbox"
            className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">Access Token (Bearer)</label>
        <input 
          type="text" 
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Paste the token from Get Token API here"
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

      <div className="mb-4">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">Request Body (JSON)</label>
        <textarea 
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          placeholder='{"PartnerReferenceNo": "INV-123", "Amount": {"Value": "50000.00", "Currency": "IDR"}}'
          rows={5}
          className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
        <small className="text-slate-500 dark:text-slate-400 mt-1 block">* The tool will automatically minify this JSON before hashing.</small>
      </div>

      <div className="mb-6">
        <label className="block mb-1.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">Client Secret (Secret Key)</label>
        <input 
          type="password" 
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          placeholder="Enter your API Secret Key"
          className="w-full p-2.5 rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
        {isGenerating ? 'Generating...' : 'Generate Symmetric X-SIGNATURE'}
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
            <label className="block mb-2 font-bold text-slate-700 dark:text-slate-300 text-sm">🔍 String to Sign (Before HMAC):</label>
            <code className="block break-all text-slate-600 dark:text-slate-400 text-xs font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
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