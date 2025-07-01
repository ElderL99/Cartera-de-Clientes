'use client';

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-[#2a2a2a] rounded-2xl shadow-md p-5 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-white text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
}
