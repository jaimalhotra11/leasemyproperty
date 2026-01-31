'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
}

export default function PropertyMap({ latitude, longitude, address, city, state }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !latitude || !longitude) return;

    let map: any = null;
    let link: HTMLLinkElement | null = null;

    // Using OpenStreetMap with Leaflet (free alternative to Google Maps)
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // @ts-ignore
      const L = window.L;
      if (L && mapRef.current) {
        map = L.map(mapRef.current).setView([latitude, longitude], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(`<strong>${address}</strong><br>${city}, ${state}`)
          .openPopup();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (map) {
        map.remove();
      }
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [latitude, longitude, address, city, state]);

  if (!latitude || !longitude) {
    return (
      <div className="bg-gray-100 rounded-xl p-8 text-center border-2 border-gray-200">
        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Location map not available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-black flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Property Location
        </h3>
        <p className="text-sm text-gray-600 mt-1">{address}, {city}, {state}</p>
      </div>
      <div ref={mapRef} className="w-full h-96" />
    </div>
  );
}
