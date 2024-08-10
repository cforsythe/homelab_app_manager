import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [apps, setApps] = useState([]);
  const [selectedTab, setSelectedTab] = useState('internal'); // Default to 'internal'
  const [isInternal, setIsInternal] = useState(false); // State to check if the user is on an internal IP

  useEffect(() => {
    async function fetchApps() {
      const response = await fetch('/api/apps');
      const data = await response.json();
      setApps(data);
    }

    async function fetchClientIp() {
      const response = await fetch('/api/getClientIp');
      const { ip } = await response.json();
      
      console.log(ip);
      // Check if the IP is in the range of internal IPs or localhost
      const internalIpRanges = [
        /^192\.168\./,
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^127\.0\.0\.1/  // localhost
      ];
      const isInternalIp = internalIpRanges.some(range => range.test(ip));
      setIsInternal(isInternalIp);

      // If not internal, switch to 'public' tab
      if (!isInternalIp) {
        setSelectedTab('public');
      }
    }

    fetchClientIp();
    fetchApps();
  }, []);

  const filteredApps = apps.filter(isInternal ? app => app.category === selectedTab : app => app.category === 'public');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Homelab App Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full bg-cyan-700 p-4 text-white shadow">
        <h1 className="text-3xl font-bold text-center">Homelab App Manager</h1>
      </header>

      <main className="container mx-auto p-6 mt-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setSelectedTab('internal')}
            disabled={!isInternal}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedTab === 'internal' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-600 border border-cyan-600'} ${!isInternal ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            Internal
          </button>
          <button
            onClick={() => setSelectedTab('public')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedTab === 'public' ? 'bg-cyan-600 text-white' : 'bg-white text-cyan-600 border border-cyan-600'}`}
          >
            Public
          </button>
        </div>

        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredApps.map((app, index) => (
              <a
                key={index}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white w-40 h-40 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow transform hover:-translate-y-1 flex flex-col items-center justify-center"
              >
                <img 
                  src={app.image} 
                  alt={app.name} 
                  className="w-24 h-24 object-contain rounded-lg mb-2"
                />
                <h2 className="text-sm font-semibold text-gray-800 text-center">{app.name}</h2>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">Loading apps...</p>
        )}
      </main>
    </div>
  );
}