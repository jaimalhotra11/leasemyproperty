"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const stateImages = {
  Delhi: "/assets/state/state-delhi.png",
  Haryana: "/assets/state/state-harayana.png",
  Rajasthan: "/assets/state/state-rajasthan.png",
  UttarPradesh: "/assets/state/state-up.png",
  Punjab: "/assets/state/state-punjab.png"
};

const statesWithCities = {
  'Delhi': [
    "New Delhi",
    "Central Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
    "North East Delhi",
    "North West Delhi",
    "South East Delhi",
    "South West Delhi",
  ],
  'Rajasthan': [
    "Abhaneri", "Abu Road", "Achal Gadh", "Ajmer", "Aklera", "Alwar", "Amer", "Amet", "Anupgarh", "Asind",
    "Aspur", "Bagru", "Bali", "Balotra", "Banswara", "Baran", "Bari Sadri", "Barmer", "Baseri", "Bassi",
    "Baswa", "Bayana", "Beawar", "Behror", "Bharatpur", "Bhilwara", "Bhim", "Bhinmal", "Bhiwadi", "Bikaner",
    "Bilara", "Bundi", "Chaksu", "Chhata", "Chirawa", "Chittorgarh", "Chomu", "Churu", "Dausa", "Deeg",
    "Degana", "Devgarh", "Devli", "Dhaulpur", "Didwana", "Dungarpur", "Eklingji", "Falna", "Fatehpur", "Gangapur",
    "Gangdhar", "Gangangar", "Garhi", "Ghatol", "Hanumangarh", "Hindaun", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar",
    "Jhunjhunu", "Jodhpur", "Kishangarh", "Kota", "Kotputli", "Laxmangarh", "Merta", "Mount Abu", "Nagaur", "Nohar",
    "Pali", "Pratapgarh", "Pushkar", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sojat", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  'Haryana': [
    "Ambala", "Ambala Cantt", "Ambala Sadar", "Bahadurgarh", "Beri", "Bhiwani", "Bass", "Faridabad", "Gurugram", "Hisar",
    "Jind", "Kaithal", "Karnal", "Kurukshetra", "Narnaul", "Panchkula", "Panipat", "Pehowa", "Pataudi", "Pinjore",
    "Rewari", "Rohtak", "Sadaura", "Saha", "Sampla", "Shahbad", "Sirsa", "Sonipat", "Yamunanagar", "Thanesar", "Nuh"
  ],
  'UttarPradesh': [
    "Agra", "Aligarh", "Allahabad (Prayagraj)", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun",
    "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Bulandshahr",
    "Chandauli", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar (Noida)", "Ghaziabad", "Ghazipur",
    "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jaunpur", "Jhansi", "Kannauj", "Kanpur",
    "Kanpur Dehat", "Kasganj", "Kaushambi", "Kheri (Lakhimpur Kheri)", "Kushinagar", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri",
    "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Rae Bareli", "Rampur", "Saharanpur",
    "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  'Punjab': [
    "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Firozpur", "Moga", "Pathankot",
    "Sangrur", "Barnala", "Faridkot", "Gurdaspur", "Kapurthala", "Mansa", "Nawanshahr (Shaheed Bhagat Singh Nagar)", "Rupnagar (Ropar)", "Fatehgarh Sahib", "Tarn Taran",
    "Khanna", "Phagwara", "Malerkotla", "Abohar", "Zirakpur", "Rajpura", "Batala", "Dhuri", "Muktsar", "Jagraon", "Nangal"
  ]
};

export default function StateDropdownBar() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const router = useRouter();

  const handleCityClick = (city: string) => {
    router.push(`/search?q=${encodeURIComponent(city)}`);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Top Bar Strip - Shorter Height */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 py-2.5 overflow-x-auto">
          {Object.keys(statesWithCities).map((state) => (
            <div key={state} className="relative flex-shrink-0">
              {/* State Button - Compact */}
              <button
                onClick={() => setSelectedState(selectedState === state ? null : state)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  selectedState === state
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {/* State Image - Black Silhouette */}
                <div className={`w-6 h-6 flex items-center justify-center rounded ${
                  selectedState === state ? 'bg-white/20' : 'bg-white'
                }`}>
                  <Image
                    src={stateImages[state as keyof typeof stateImages]}
                    alt={state}
                    width={20}
                    height={20}
                    className={`object-contain transition-all ${
                      selectedState === state ? 'brightness-0 invert' : ''
                    }`}
                  />
                </div>

                {/* State Name - Smaller Font */}
                <span className="font-medium text-xs whitespace-nowrap">
                  {state === 'UttarPradesh' ? 'Uttar Pradesh' : state}
                </span>

                {/* Dropdown Icon - Smaller */}
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    selectedState === state ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dropdown Section - Below the strip */}
      {selectedState && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              {/* Header - Compact */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                <h3 className="text-base font-bold text-black">
                  Cities in {selectedState === 'UttarPradesh' ? 'Uttar Pradesh' : selectedState}
                </h3>
                <span className="px-2.5 py-1 bg-black text-white rounded-full text-xs font-medium">
                  {statesWithCities[selectedState as keyof typeof statesWithCities].length} Cities
                </span>
              </div>

              {/* Cities Grid - Compact */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto">
                {statesWithCities[selectedState as keyof typeof statesWithCities].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityClick(city)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-black hover:text-white transition-all duration-200 group border border-transparent hover:border-black text-left"
                  >
                    <span className="font-medium text-xs text-gray-900 group-hover:text-white truncate">
                      {city}
                    </span>
                    <svg
                      className="w-3 h-3 text-gray-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}