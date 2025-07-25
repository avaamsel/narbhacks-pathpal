'use client';
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function StatsPage() {
  const { user, isSignedIn } = useUser();
  const [city, setCity] = useState("Los Angeles");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  // Mock stats for demo
  const [totalMiles, setTotalMiles] = useState(64.2); // Replace with real data if available
  const [totalMinutes, setTotalMinutes] = useState(2100); // Replace with real data if available

  // Mock city visit data
  const cityVisits = [
    { name: "Los Angeles", lastVisit: "2024-06-08T14:30:00Z", count: 8 },
    { name: "Santa Monica", lastVisit: "2024-06-07T11:00:00Z", count: 3 },
    { name: "San Diego", lastVisit: "2024-06-01T09:15:00Z", count: 2 },
    { name: "Pasadena", lastVisit: "2024-05-30T16:45:00Z", count: 1 },
  ];
  const favoriteCity = cityVisits.reduce((fav, c) => (c.count > fav.count ? c : fav), cityVisits[0]);

  // Mock favorite businesses
  const favoriteBusinesses = [
    { name: "Sunset Coffee", city: "Los Angeles", visits: 5 },
    { name: "Book Nook", city: "Santa Monica", visits: 3 },
    { name: "Taco Haven", city: "Los Angeles", visits: 2 },
  ];

  // Mock leaderboard data
  const currentUserName = user?.fullName || user?.username || "You";
  const [leaderboard, setLeaderboard] = useState([
    { name: "Elise", image: "/images/profile.png" },
    { name: "Gabe", image: "/images/profile.png" },
    { name: "Ryder", image: "/images/profile.png" },
  ]);

  useEffect(() => {
    // Try to get user's current city from geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
          );
          const data = await res.json();
          const cityName = data.address.city || data.address.town || data.address.village || data.address.neighbourhood || data.address.suburb;
          setCity(cityName || "Los Angeles");
        } catch {
          setCity("Los Angeles");
        }
      });
    }
  }, []);

  // Fun facts array
  const funFacts = [
    `You've walked the height of Mount Everest ${(totalMiles / 5.5).toFixed(2)}x times!`,
    `You've walked the length of the Golden Gate Bridge ${(totalMiles / 1.7).toFixed(1)}x times!`,
    `You've walked from LA to San Diego ${(totalMiles / 120).toFixed(2)}x times!`,
    `You've walked the length of Central Park ${(totalMiles / 2.5).toFixed(1)}x times!`,
    `Estimated calories burned: ${Math.round(totalMiles * 100).toLocaleString()} kcal`,
  ];
  const [funFact, setFunFact] = useState(funFacts[0]);
  useEffect(() => {
    setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    // eslint-disable-next-line
  }, []);

  // Render the stats content (used for both logged-in and blurred background)
  const renderStatsContent = () => (
    <div className="flex flex-row w-full max-w-6xl mt-12 gap-8">
      {/* Left sidebar */}
      <aside className="w-80 bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-[#dbe4ea]">
        <img
          src={user?.imageUrl || "/images/pin.svg"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-4 border-[#4a90e2] object-cover"
        />
        <h1 className="text-3xl font-bold mb-2 text-[#4a90e2] text-center">
          {isSignedIn ? user.fullName || user.username || "Pathpal Explorer" : "Pathpal Explorer"}
        </h1>
        {user?.createdAt && (
          <div className="mb-2 text-[#3a4a5d] text-sm text-center">
            Date Joined: {new Date(user.createdAt).toLocaleDateString()}
          </div>
        )}
        <div className="mb-2 text-[#3a4a5d] text-lg text-center">{city}</div>
        <div className="w-full flex flex-col gap-4 mb-6">
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-[#3a4a5d]">Total miles travelled:</span>
            <span>{totalMiles.toFixed(2)} mi</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="font-semibold text-[#3a4a5d]">Total time exploring:</span>
            <span>{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
          </div>
        </div>
      </aside>
      {/* Right main content */}
      <section className="flex-1 flex flex-col gap-6">
        <div className="w-full bg-[#e6f2ff] rounded p-4 text-center mb-2">
          <div className="text-lg font-semibold text-[#4a90e2] mb-1">Fun Fact</div>
          <div className="text-[#3a4a5d]">{funFact}</div>
        </div>
        {/* Favorite Locations */}
        <div className="w-full bg-[#f5f7fa] rounded p-4">
          <div className="text-lg font-semibold text-[#4a90e2] mb-1">Favorite Locations</div>
          <ul>
            {favoriteBusinesses.map((b) => (
              <li key={b.name} className="flex justify-between text-[#3a4a5d]">
                <span>{b.name} <span className="text-xs text-[#4a90e2]">({b.city})</span></span>
                <span className="text-xs">{b.visits} visits</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Leaderboard */}
        <div className="w-full bg-[#e6f2ff] rounded p-4">
          <div className="text-lg font-semibold text-[#4a90e2] mb-1">Friends</div>
          <ul>
            {leaderboard.map((f, i) => (
              <li key={f.name} className="flex items-center gap-3 mb-2">
                <img src={f.image} alt={f.name} className="w-8 h-8 rounded-full border-2 border-[#4a90e2] object-cover" />
                <span className="flex-1">{f.name}</span>
                <button
                  className="ml-2 text-gray-400 hover:text-red-500 text-xl font-bold px-2"
                  aria-label={`Delete ${f.name}`}
                  onClick={() => setLeaderboard(prev => prev.filter(friend => friend.name !== f.name))}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          {(() => {
            const [adding, setAdding] = useState(false);
            const [friendName, setFriendName] = useState("");
            if (!adding) {
              return (
                <button
                  className="mt-3 px-4 py-2 bg-[#4a90e2] text-white rounded-lg font-semibold hover:bg-[#357ab8] transition"
                  onClick={() => setAdding(true)}
                >
                  + Add Friend
                </button>
              );
            }
            return (
              <div className="mt-3 flex gap-2 items-center">
                <input
                  type="text"
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
                  placeholder="Friend's name"
                  value={friendName}
                  onChange={e => setFriendName(e.target.value)}
                  autoFocus
                />
                <button
                  className="px-4 py-2 bg-[#4a90e2] text-white rounded-lg font-semibold hover:bg-[#357ab8] transition"
                  onClick={() => {
                    if (friendName.trim()) {
                      setLeaderboard(prev => [
                        ...prev,
                        { name: friendName.trim(), image: "/images/profile.png" }
                      ]);
                      setFriendName("");
                      setAdding(false);
                    }
                  }}
                >
                  Confirm
                </button>
                <button
                  className="px-2 py-2 text-gray-500 hover:text-red-500"
                  onClick={() => { setAdding(false); setFriendName(""); }}
                  aria-label="Cancel"
                >
                  ×
                </button>
              </div>
            );
          })()}
        </div>
        {/* Cities Explored */}
        <div className="w-full bg-[#f5f7fa] rounded p-4">
          <div className="text-lg font-semibold text-[#4a90e2] mb-1">Cities Explored</div>
          <ul className="mb-2">
            {cityVisits.map((c) => (
              <li key={c.name} className="flex justify-between text-[#3a4a5d]">
                <span>{c.name}</span>
                <span className="text-xs">Last visit: {new Date(c.lastVisit).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
          <div className="text-[#3a4a5d] mt-2">Favorite city: <span className="font-bold">{favoriteCity.name}</span> ({favoriteCity.count} visits)</div>
        </div>
      </section>
    </div>
  );

  // Show authentication popup if not signed in
  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#f5f7fa] flex flex-col items-center py-0 w-full pb-16">
        <div className="w-full mb-8"><Header /></div>
        {/* Blurred background content */}
        <div className="absolute inset-0 blur-sm opacity-30 pointer-events-none">
          {renderStatsContent()}
        </div>
        {/* Authentication popup */}
        <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center relative">
            {/* Back button always goes to map page and clears modal state */}
            <button
              type="button"
              onClick={() => { window.location.href = "/"; }}
              className="absolute top-4 left-4 text-[#3a4a5d] hover:text-[#4a90e2] transition-colors"
              aria-label="Back to maps"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img src="/images/pin.svg" alt="pathpal icon" width={40} height={40} className="mb-2" />
            <h1 className="text-2xl font-bold mb-4 text-[#4a90e2] text-center">View Your Stats!</h1>
            <div className="mb-6 text-[#3a4a5d] text-center text-base">
              Sign in to see your exploration stats, achievements, and progress on your pathpal journey!
            </div>
            <div className="flex gap-4">
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-[#4a90e2] text-white rounded font-semibold hover:bg-[#357ab8] transition">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-[#f5a623] text-white rounded font-semibold hover:bg-[#e94e77] transition">Sign Up</button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] flex flex-col items-center py-0 w-full pb-16">
      <div className="w-full mb-8"><Header /></div>
      {renderStatsContent()}
    </main>
  );
} 