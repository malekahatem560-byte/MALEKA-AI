import React, { useState, useEffect } from 'react';

export const Dashboard: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [accountId] = useState<string>("test-acc-001");

  const refreshBalance = async () => {
    try {
      const res = await fetch(`/balance/${accountId}`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (e) { console.error("Error fetching balance"); }
  };

  const handleAction = async (endpoint: string, amount: number) => {
    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, amount })
    });
    refreshBalance();
  };

  useEffect(() => { refreshBalance(); }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-black mb-8 tracking-tighter">MALEKA CORE</h1>
      <div className="text-6xl font-mono mb-8 text-green-400">{balance} $</div>
      <div className="flex gap-4">
        <button onClick={() => handleAction('/deposit', 100)} className="bg-green-600 px-8 py-3 rounded-2xl font-bold">إيداع 100</button>
        <button onClick={() => handleAction('/withdraw', 50)} className="bg-red-600 px-8 py-3 rounded-2xl font-bold">سحب 50</button>
      </div>
    </div>
  );
};
