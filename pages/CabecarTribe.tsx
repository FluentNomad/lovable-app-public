import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Volume2, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TerritoryMap } from "@/components/TerritoryMap";

export default function CabecarTribe() {
  const navigate = useNavigate();
  
  const tribe = {
    id: "cabecar",
    name: "Cabécar",
    language: "Cabécar",
    region: "Talamanca Mountains",
    color: "bg-blue-600",
    description: "Mountain dwellers with deep knowledge of medicinal plants."
  };

  const otherTribes = [
    { id: "ngobe", name: "Ngöbe", color: "bg-amber-600" },
    { id: "bribri", name: "Bribri", color: "bg-emerald-600" },
    { id: "boruca", name: "Boruca", color: "bg-purple-600" },
    { id: "terraba", name: "Térraba", color: "bg-rose-600" },
    { id: "maleku", name: "Maleku", color: "bg-orange-600" },
    { id: "chorotega", name: "Chorotega", color: "bg-yellow-600" },
    { id: "huetar", name: "Huetar", color: "bg-teal-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-600/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Button
          variant="ghost"
          onClick={() => navigate("/indigenous")}
          className="mb-6 hover:bg-accent/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Indigenous Territories
        </Button>

        {/* Title Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${tribe.color} flex items-center justify-center text-3xl text-white shadow-lg`}>
              🏺
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {tribe.name} People
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {tribe.region}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Language: {tribe.language}</Badge>
            <Badge variant="secondary">Medicinal Knowledge</Badge>
            <Badge variant="secondary">Mountain Culture</Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Cabécar Territory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TerritoryMap highlightedTribeId="cabecar" />
              </CardContent>
            </Card>

            {/* Overview Card */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⛰️ About the Cabécar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  The Cabécar people are the largest indigenous group in Costa Rica, residing in the remote Talamanca mountains. They have maintained their traditional way of life, preserving extensive knowledge of medicinal plants and sustainable mountain agriculture.
                </p>
                <p className="text-foreground/90">
                  {tribe.description}
                </p>
              </CardContent>
            </Card>

            {/* Language Basics */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Essential Cabécar Phrases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { cabecar: "Kachá", english: "Hello", pronunciation: "kah-CHAH" },
                  { cabecar: "Kuán", english: "Thank you", pronunciation: "KWAN" },
                  { cabecar: "Jë́", english: "Yes", pronunciation: "HEH" }
                ].map((phrase, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-blue-600/5 border border-blue-600/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg text-blue-700">{phrase.cabecar}</p>
                        <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>
                      </div>
                      <p className="text-foreground/80">{phrase.english}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cultural Practices */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Cultural Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Traditional Medicine</h4>
                  <p className="text-sm text-muted-foreground">
                    The Cabécar possess unparalleled knowledge of medicinal plants from the mountain forests, with healing practices passed through generations of sukias (healers).
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Sustainable Agriculture</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional farming methods adapted to mountain terrain, cultivating crops like plantains, yuca, and peach palm in harmony with the forest.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Spiritual Cosmology</h4>
                  <p className="text-sm text-muted-foreground">
                    Rich spiritual traditions centered around Sibö (the creator) and respect for natural spirits that inhabit the mountains and rivers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-semibold">~17,000</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Main Territory:</span>
                  <span className="font-semibold">Talamanca</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language Family:</span>
                  <span className="font-semibold">Chibchan</span>
                </div>
              </CardContent>
            </Card>

            {/* Support Artisans */}
            <Card className="border-2 border-blue-600/20 bg-blue-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Support Cabécar Artisans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Purchase authentic handcrafted items directly from Cabécar artisans.
                </p>
                <Button className="w-full" variant="outline">
                  Browse Crafts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="border-2 border-blue-600/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Language Exercises
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Cultural Stories
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Virtual Territory Tour
                </Button>
              </CardContent>
            </Card>

            {/* Compare with Other Tribes */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Compare with Other Tribes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherTribes.map((t) => (
                  <Button
                    key={t.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate(`/indigenous/${t.id}`)}
                  >
                    <div className={`w-6 h-6 rounded-full ${t.color} mr-2`} />
                    {t.name}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/indigenous")}
                >
                  View All Tribes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
