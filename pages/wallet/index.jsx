import { useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [privateKeys, setPrivateKeys] = useState([]);
  const [walletName, setWalletName] = useState('');
  const [walletCount, setWalletCount] = useState(1); // Set initial count to 1
  const [isLoading, setIsLoading] = useState(false);
  const [wallets, setWallet] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get('/api/generate-private-key', {
        params: { count: walletCount }
      });
      const { wallets } = response.data;
      setWallet(wallets)
      const privateKeyList = wallets.map(wallet => wallet.privateKey);
      setPrivateKeys(privateKeyList);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  const handleExport = () => {
    const jsonData = JSON.stringify(wallets, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${walletName}.json`;
    link.click();
  };

  const handleDecrementCount = () => {
    if (walletCount > 1) {
      setWalletCount(walletCount - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Wallet Private Key Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-bold mb-2" htmlFor="wallet-name">Wallet Name</label>
            <input
              className="w-full bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
              type="text"
              id="wallet-name"
              name="wallet-name"
              placeholder="Enter wallet name"
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-700 font-bold mb-2" htmlFor="wallet-count">Wallet Count</label>
            <div className="flex items-center">
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                onClick={handleDecrementCount}
                disabled={walletCount === 1} // Disable the button when count is 1
              >
                -
              </button>
              <input
                className="w-full bg-gray-100 rounded-lg py-2 px-4 mx-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
                type="input"
                id="wallet-count"
                name="wallet-count"
                placeholder="Enter wallet count"
                value={walletCount}
                onChange={(e) => setWalletCount(parseInt(e.target.value))}
              />
              <button
                className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                type="button"
                onClick={() => setWalletCount(walletCount + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-6">
            <button
              className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:bg-purple-500'}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Private Key'}
            </button>
          </div>
        </form>
        {privateKeys.length > 0 && (
          <div className="mb-4">
            <label className="block text-lg text-gray-700 font-bold mb-2" htmlFor="private-key">Private Key</label>
            <textarea
              className="w-full bg-gray-100 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
              id="private-key"
              name="private-key"
              rows="5"
              readOnly
              value={privateKeys.join('\n')}
            />
          </div>
        )}
        {privateKeys.length > 0 && (
          <div className="mb-6">
            <button
              className={`w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:bg-green-400'}`}
              type="button"
              onClick={handleExport}
              disabled={isLoading}
            >
              Export to JSON
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
