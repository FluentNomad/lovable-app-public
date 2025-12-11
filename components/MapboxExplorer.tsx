import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

interface Location {
  lat: number;
  lng: number;
  name: string;
  town?: string;
  type?: string;
}

interface Lesson {
  id: string;
  title: string;
  color: string;
  locations: Location[];
}

interface MapboxExplorerProps {
  hoveredLesson: string | null;
  lessons: Lesson[];
}

const colorMap: Record<string, string> = {
  'bg-red-500': '#ef4444',
  'bg-green-600': '#16a34a',
  'bg-blue-500': '#3b82f6',
  'bg-yellow-600': '#ca8a04',
  'bg-amber-700': '#b45309',
  'bg-purple-600': '#9333ea',
};

export const MapboxExplorer = ({ hoveredLesson, lessons }: MapboxExplorerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker[]>>(new Map());
  const territoriesLayerRef = useRef<L.GeoJSON | null>(null);
  const navigate = useNavigate();

  // Initialize map once
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize Leaflet map with Esri World Imagery (free satellite tiles)
    map.current = L.map(mapContainer.current).setView([10.0, -84.0], 7);

    // Add Esri World Imagery satellite tiles (free, no token required)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18,
    }).addTo(map.current);

    // Add labels overlay for better readability
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      attribution: '',
      maxZoom: 18,
    }).addTo(map.current);

    // Add global navigation function for popup buttons
    (window as any).lessonNavigate = (lessonId: string) => {
      if (lessonId === 'volcanes') {
        navigate('/arenal-lesson');
      } else {
        navigate(`/location/550e8400-e29b-41d4-a716-446655440002`);
      }
    };

    // Add hover effect styles
    const style = document.createElement('style');
    style.textContent = `
      .lesson-marker:hover {
        transform: scale(1.1) translateY(-3px) !important;
      }
      .lesson-marker:hover div:first-child {
        font-size: 28px !important;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
    };
  }, [navigate]);

  // Icon mapping based on location type
  const getIconForType = (type?: string): string => {
    const icons: Record<string, string> = {
      volcano: '🌋',
      park: '🌳',
      beach: '🏖️',
      surf: '🏄',
      fishing: '🎣',
      snorkel: '🤿',
    };
    return icons[type || ''] || '📍';
  };

  // Create markers for all lessons (but don't add to map yet)
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(markers => {
      markers.forEach(marker => marker.remove());
    });
    markersRef.current.clear();

    // Create markers for each lesson
    lessons.forEach(lesson => {
      const lessonMarkers: L.Marker[] = [];
      const color = colorMap[lesson.color] || '#6b7280';

      lesson.locations.forEach(location => {
        const emoji = getIconForType(location.type);
        
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="lesson-marker" style="cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; gap: 2px;">
              <div style="font-size: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${emoji}</div>
              <div style="background: rgba(255, 255, 255, 0.92); backdrop-filter: blur(6px); padding: 2px 8px; border-radius: 8px; font-size: 9px; font-weight: 600; color: #1a1a1a; white-space: nowrap; box-shadow: 0 1px 4px rgba(0,0,0,0.12); border: 1px solid rgba(255,255,255,0.4); line-height: 1.3;">${location.name}</div>
            </div>
          `,
          iconSize: [80, 45],
          iconAnchor: [40, 22],
        });

        const marker = L.marker([location.lat, location.lng], { icon })
          .bindPopup(`
            <div style="padding: 12px; text-align: center; min-width: 150px;">
              <div style="font-size: 24px; margin-bottom: 8px;">${emoji}</div>
              <strong style="font-size: 14px; font-weight: 600; display: block; margin-bottom: 4px;">${location.name}</strong>
              ${location.town ? `<p style="font-size: 11px; color: #666; margin: 4px 0;">📍 ${location.town}</p>` : ''}
              <button onclick="window.lessonNavigate('${lesson.id}')" style="background-color: ${color}; color: white; padding: 6px 12px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; font-weight: 500; margin-top: 8px;">Explore</button>
            </div>
          `, {
            closeButton: false,
            offset: [0, -20]
          });

        // Show popup on hover
        marker.on('mouseover', function() {
          this.openPopup();
        });

        // Keep popup open while hovering over it, close when leaving marker area
        marker.on('mouseout', function() {
          setTimeout(() => {
            this.closePopup();
          }, 200);
        });

        // Direct click on marker also navigates
        marker.on('click', () => {
          if (lesson.id === 'volcanes') {
            navigate('/volcanoes');
          } else if (lesson.id === 'national-parks') {
            navigate('/national-parks');
          } else if (lesson.id === 'oceans') {
            navigate('/oceans');
          } else {
            navigate(`/location/550e8400-e29b-41d4-a716-446655440002`);
          }
        });

        lessonMarkers.push(marker);
      });

      markersRef.current.set(lesson.id, lessonMarkers);
    });
  }, [lessons, navigate]);

  // Indigenous territories GeoJSON data with organic shapes
  const indigenousTerritories = {
    type: "FeatureCollection",
    features: [
      { 
        type: "Feature", 
        properties: { name: "Ngöbe", color: "#d97706" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-83.3, 8.7], [-83.2, 8.75], [-83.0, 8.8], [-82.85, 8.9], 
            [-82.8, 9.0], [-82.85, 9.1], [-82.95, 9.15], [-83.1, 9.2], 
            [-83.25, 9.15], [-83.35, 9.05], [-83.4, 8.95], [-83.35, 8.8], [-83.3, 8.7]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Bribri", color: "#059669" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-82.95, 9.25], [-82.85, 9.3], [-82.75, 9.4], [-82.7, 9.5],
            [-82.72, 9.6], [-82.8, 9.68], [-82.95, 9.7], [-83.05, 9.65],
            [-83.1, 9.55], [-83.08, 9.45], [-83.0, 9.35], [-82.95, 9.25]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Cabécar", color: "#2563eb" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-83.55, 9.45], [-83.45, 9.5], [-83.3, 9.55], [-83.2, 9.65],
            [-83.15, 9.75], [-83.2, 9.85], [-83.35, 9.9], [-83.5, 9.88],
            [-83.6, 9.8], [-83.65, 9.7], [-83.6, 9.6], [-83.55, 9.45]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Boruca", color: "#9333ea" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-83.52, 8.75], [-83.4, 8.8], [-83.25, 8.85], [-83.15, 8.95],
            [-83.1, 9.05], [-83.15, 9.15], [-83.25, 9.2], [-83.4, 9.18],
            [-83.5, 9.1], [-83.55, 9.0], [-83.52, 8.85], [-83.52, 8.75]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Térraba", color: "#e11d48" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-83.45, 8.85], [-83.3, 8.9], [-83.15, 8.98], [-83.0, 9.1],
            [-83.02, 9.2], [-83.1, 9.28], [-83.25, 9.3], [-83.38, 9.25],
            [-83.45, 9.15], [-83.48, 9.05], [-83.45, 8.95], [-83.45, 8.85]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Maleku", color: "#ea580c" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-85.15, 10.45], [-85.0, 10.5], [-84.85, 10.58], [-84.7, 10.65],
            [-84.68, 10.75], [-84.75, 10.85], [-84.9, 10.9], [-85.05, 10.88],
            [-85.15, 10.8], [-85.2, 10.7], [-85.18, 10.6], [-85.15, 10.45]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Chorotega", color: "#ca8a04" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-85.65, 9.95], [-85.5, 10.0], [-85.3, 10.1], [-85.15, 10.2],
            [-85.1, 10.3], [-85.15, 10.4], [-85.3, 10.45], [-85.45, 10.42],
            [-85.6, 10.35], [-85.68, 10.25], [-85.7, 10.15], [-85.65, 9.95]
          ]]
        }
      },
      { 
        type: "Feature", 
        properties: { name: "Huetar", color: "#0d9488" }, 
        geometry: { 
          type: "Polygon", 
          coordinates: [[
            [-84.75, 9.65], [-84.6, 9.7], [-84.45, 9.78], [-84.3, 9.88],
            [-84.28, 9.98], [-84.35, 10.08], [-84.5, 10.12], [-84.65, 10.08],
            [-84.75, 10.0], [-84.8, 9.9], [-84.78, 9.78], [-84.75, 9.65]
          ]]
        }
      },
    ]
  };

  // Show/hide markers based on hovered lesson + show indigenous territories
  useEffect(() => {
    if (!map.current) return;

    // Remove all markers
    markersRef.current.forEach(markers => {
      markers.forEach(marker => marker.remove());
    });

    // Remove existing territories layer
    if (territoriesLayerRef.current) {
      territoriesLayerRef.current.remove();
      territoriesLayerRef.current = null;
    }

    // If hovering over indigenous territories, show ONLY territory polygons (no markers)
    if (hoveredLesson === 'indigenous-territories') {
      territoriesLayerRef.current = L.geoJSON(indigenousTerritories as any, {
        style: (feature) => ({
          fillColor: feature?.properties?.color || '#d97706',
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.6
        }),
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(`
              <div style="text-align: center; padding: 8px;">
                <strong style="font-size: 16px; color: ${feature.properties.color};">${feature.properties.name}</strong>
                <p style="margin: 4px 0; font-size: 14px;">Indigenous Territory</p>
              </div>
            `);
          }
        }
      }).addTo(map.current!);
      
      // Fit map to territories
      if (territoriesLayerRef.current) {
        map.current.fitBounds(territoriesLayerRef.current.getBounds(), { padding: [50, 50] });
      }
    } else if (hoveredLesson && markersRef.current.has(hoveredLesson)) {
      // Add markers for other hovered lessons only
      const markers = markersRef.current.get(hoveredLesson);
      markers?.forEach(marker => marker.addTo(map.current!));
    }
  }, [hoveredLesson]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border">
        <h3 className="font-bold text-xl">Costa Rica</h3>
        <p className="text-sm text-muted-foreground">¡Pura Vida!</p>
      </div>
    </div>
  );
};
