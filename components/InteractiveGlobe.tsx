import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Fallback Spanish-speaking countries
const FALLBACK_COUNTRIES: Country[] = [
  { id: "mx", name: "Mexico", latitude: 23.6345, longitude: -102.5528, locations_count: 0 },
  { id: "es", name: "Spain", latitude: 40.4637, longitude: -3.7492, locations_count: 0 },
  { id: "ar", name: "Argentina", latitude: -38.4161, longitude: -63.6167, locations_count: 0 },
  { id: "co", name: "Colombia", latitude: 4.5709, longitude: -74.2973, locations_count: 0 },
  { id: "pe", name: "Peru", latitude: -9.1900, longitude: -75.0152, locations_count: 0 },
  { id: "cl", name: "Chile", latitude: -35.6751, longitude: -71.5430, locations_count: 0 },
  { id: "ec", name: "Ecuador", latitude: -1.8312, longitude: -78.1834, locations_count: 0 },
  { id: "cu", name: "Cuba", latitude: 21.5218, longitude: -77.7812, locations_count: 0 },
  { id: "do", name: "Dominican Republic", latitude: 18.7357, longitude: -70.1627, locations_count: 0 },
  { id: "gt", name: "Guatemala", latitude: 15.7835, longitude: -90.2308, locations_count: 0 },
  { id: "cr", name: "Costa Rica", latitude: 9.7489, longitude: -83.7534, locations_count: 0 },
  { id: "pa", name: "Panama", latitude: 8.5380, longitude: -80.7821, locations_count: 0 },
];

interface Country {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  image_url?: string;
  locations_count?: number;
}

// Convert lat/lon to 3D sphere coordinates
function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

interface CountryMarkerProps {
  country: Country;
  isSelected: boolean;
  onClick: (country: Country) => void;
  onHover: (country: Country | null) => void;
}

function CountryMarker({ country, isSelected, onClick, onHover }: CountryMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = latLonToVector3(country.latitude, country.longitude, 102);

  useFrame(() => {
    if (meshRef.current) {
      const scale = hovered ? 1.5 : isSelected ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick(country);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(country);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <sphereGeometry args={[2, 16, 16]} />
      <meshStandardMaterial
        color={isSelected ? "#10b981" : hovered ? "#3b82f6" : "#ef4444"}
        emissive={isSelected ? "#10b981" : hovered ? "#3b82f6" : "#ef4444"}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

interface GlobeProps {
  countries: Country[];
  onCountrySelect?: (country: Country | null) => void;
  selectedCountry?: Country | null;
  onCountryHover: (country: Country | null) => void;
}

function Globe({ countries, onCountrySelect, selectedCountry, onCountryHover }: GlobeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const earthTexture = useTexture('/textures/earth_day.jpg');

  // Auto-rotate the entire group (globe + markers)
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Globe sphere with Earth texture */}
      <Sphere args={[100, 64, 64]}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.1}
          metalness={0.05}
        />
      </Sphere>

      {/* Country markers */}
      {countries.map((country) => (
        <CountryMarker
          key={country.id}
          country={country}
          isSelected={selectedCountry?.id === country.id}
          onClick={(c) => {
            if (onCountrySelect) {
              onCountrySelect(selectedCountry?.id === c.id ? null : c);
            }
          }}
          onHover={onCountryHover}
        />
      ))}
    </group>
  );
}

interface InteractiveGlobeProps {
  onCountrySelect?: (country: Country | null) => void;
  selectedCountry?: Country | null;
}

export const InteractiveGlobe = ({ onCountrySelect, selectedCountry }: InteractiveGlobeProps) => {
  const navigate = useNavigate();
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCountryClick = (country: Country) => {
    if (country.name === "Costa Rica") {
      navigate("/costa-rica");
    } else {
      navigate(`/country/${country.id}`);
    }
  };

  useEffect(() => {
    const loadCountries = async () => {
      const { data, error } = await supabase
        .from('countries')
        .select(`
          *,
          locations:locations(count)
        `);
      
      if (error) {
        console.error('Error loading countries:', error);
        setCountries(FALLBACK_COUNTRIES);
      } else if (data && data.length > 0) {
        // Parse lat/lon as numbers and extract location count
        const parsedData = data.map(c => ({
          ...c,
          latitude: parseFloat(String(c.latitude)),
          longitude: parseFloat(String(c.longitude)),
          locations_count: Array.isArray(c.locations) ? c.locations.length : (c.locations as any)?.[0]?.count || 0
        }));
        console.log('Loaded countries:', parsedData);
        setCountries(parsedData);
      } else {
        // Use fallback if no data
        setCountries(FALLBACK_COUNTRIES);
      }
      setLoading(false);
    };

    loadCountries();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full h-[600px] bg-background rounded-lg overflow-hidden border border-border flex items-center justify-center">
        <p className="text-muted-foreground">Loading globe...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-slate-950 to-slate-900 rounded-lg overflow-hidden border border-border">
      <Canvas 
        camera={{ position: [0, 0, 250], fov: 45 }}
        gl={{ 
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <ambientLight intensity={2.8} />
        <directionalLight position={[10, 10, 5]} intensity={4} />
        <pointLight position={[-10, -10, -5]} intensity={1.5} />
        <Globe
          countries={countries}
          onCountrySelect={handleCountryClick}
          onCountryHover={setHoveredCountry}
          selectedCountry={selectedCountry}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={150}
          maxDistance={400}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
      
      {/* Hovered Country Info */}
      {hoveredCountry && (
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-xs z-10">
          <h3 className="font-bold text-lg mb-2">{hoveredCountry.name}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="text-primary">📍</span>
              {hoveredCountry.locations_count || 0} locations to explore
            </p>
            {hoveredCountry.description && (
              <p className="mt-2 text-xs">{hoveredCountry.description}</p>
            )}
          </div>
        </div>
      )}

      {/* Selected Country Info */}
      {selectedCountry && (
        <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-border z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl mb-3">{selectedCountry.name}</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm">
                  <span className="text-primary text-lg">📍</span>
                  <span className="font-medium">{selectedCountry.locations_count || 0} amazing locations</span>
                </p>
                {selectedCountry.description && (
                  <p className="text-sm text-muted-foreground mt-2">{selectedCountry.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => onCountrySelect && onCountrySelect(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground z-10">
        Click markers • Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};
