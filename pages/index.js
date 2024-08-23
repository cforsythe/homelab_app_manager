import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [apps, setApps] = useState([]);
  const [selectedTab, setSelectedTab] = useState('public'); // Default to 'internal'
  const [isInternal, setIsInternal] = useState(false); // State to check if the user is on an internal IP
  const [serverPublicIp, setServerPublicIp] = useState(null);

  // Fetch the server's public IP
  useEffect(() => {
    async function fetchServerPublicIp() {
      try {
        const response = await fetch('/api/getServerPublicIp');
        if (response.ok) {
          const { ip } = await response.json();
          setServerPublicIp(ip);
        } else {
          console.error('Failed to fetch server public IP:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching server public IP:', error);
      }
    }

    fetchServerPublicIp();
  }, []);

  // Fetch client IP and determine if it's internal
  useEffect(() => {
    if (serverPublicIp === null) return; // Wait until serverPublicIp is set

    async function fetchClientIp() {
      try {
        const response = await fetch('/api/getClientIp');
        if (response.ok) {
          const { ip } = await response.json();

          // Check if the IP is in the range of internal IPs, localhost, or server's public IP
          const internalIpRanges = [
            /^192\.168\./,
            /^10\./,
            /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
            /^127\.0\.0\.1/  // localhost
          ];

          if (serverPublicIp) {
            internalIpRanges.push(new RegExp(`^${serverPublicIp.replace(/\./g, '\\.')}$`));
          }

          const isInternalIp = internalIpRanges.some(range => range.test(ip));
          setIsInternal(isInternalIp);

          // If not internal, switch to 'public' tab
          if (!isInternalIp) {
            setSelectedTab('public');
          }
        } else {
          console.error('Failed to fetch client IP:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching client IP:', error);
      }
    }

    fetchClientIp();
  }, [serverPublicIp]);

  // Fetch the apps data
  useEffect(() => {
    async function fetchApps() {
      const response = await fetch('/api/apps');
      const data = await response.json();
      setApps(data);
    }

    fetchApps();
  }, []);

  const filteredApps = apps.filter(app => app.category === selectedTab);

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
                <Image 
                  src={app.image} 
                  alt={app.name} 
                  width={512}
                  height={512}
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