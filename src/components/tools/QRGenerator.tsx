
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQR = () => {
    if (!text.trim()) return;
    
    // Using QR Server API for QR code generation
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
    setQrCode(qrUrl);
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        QR Code Generator
      </h2>

      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text or URL
          </label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text, URL, or any data to generate QR code"
            rows={4}
          />
        </div>

        <Button onClick={generateQR} disabled={!text.trim()} className="w-full mb-6">
          Generate QR Code
        </Button>

        {qrCode && (
          <div className="text-center space-y-4">
            <div className="bg-white p-4 rounded-lg inline-block">
              <img 
                src={qrCode} 
                alt="Generated QR Code" 
                className="max-w-full h-auto"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={downloadQR} variant="outline" className="flex-1">
                Download
              </Button>
              <Button 
                onClick={() => window.open(qrCode, '_blank')} 
                variant="outline" 
                className="flex-1"
              >
                Open in New Tab
              </Button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              QR Code contains: {text.length > 50 ? text.substring(0, 50) + '...' : text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
