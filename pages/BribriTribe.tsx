import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Volume2, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TerritoryMap } from "@/components/TerritoryMap";

export default function BribriTribe() {
  const navigate = useNavigate();
  
  const tribe = {
    id: "bribri",
    name: "Bribri",
    language: "Bribri",
    region: "Talamanca",
    color: "bg-emerald-600",
    description: "Guardians of ancient cacao traditions and spiritual wisdom."
  };

  const otherTribes = [
    { id: "ngobe", name: "Ngöbe", color: "bg-amber-600" },
    { id: "cabecar", name: "Cabécar", color: "bg-blue-600" },
    { id: "boruca", name: "Boruca", color: "bg-purple-600" },
    { id: "terraba", name: "Térraba", color: "bg-rose-600" },
    { id: "maleku", name: "Maleku", color: "bg-orange-600" },
    { id: "chorotega", name: "Chorotega", color: "bg-yellow-600" },
    { id: "huetar", name: "Huetar", color: "bg-teal-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-emerald-600/5">
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
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
            <Badge variant="secondary">Cacao Traditions</Badge>
            <Badge variant="secondary">Spiritual Wisdom</Badge>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Bribri Territory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TerritoryMap highlightedTribeId="bribri" />
              </CardContent>
            </Card>

            {/* Overview Card */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌿 About the Bribri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  The Bribri people are one of Costa Rica's most prominent indigenous groups, residing primarily in the Talamanca mountains. They are the guardians of ancient cacao cultivation traditions and possess deep spiritual wisdom passed down through generations.
                </p>
                <p className="text-foreground/90">
                  {tribe.description}
                </p>
              </CardContent>
            </Card>

            {/* Matrilineal Inheritance */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle>Matrilineal Inheritance and Social Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90">
                  In Bribri culture, land and spiritual roles are passed down through the maternal line. Women are considered the custodians of the land and play key roles in rituals and decision-making, which sets the Bribri apart from many other Indigenous groups.
                </p>
              </CardContent>
            </Card>

            {/* Language Basics */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Essential Bribri Phrases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { bribri: "Buä", english: "Hello", pronunciation: "boo-AH" },
                  { bribri: "Naköm", english: "Thank you", pronunciation: "nah-KOHM" },
                  { bribri: "Yërs", english: "Goodbye", pronunciation: "YERSS" }
                ].map((phrase, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-emerald-600/5 border border-emerald-600/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg text-emerald-700">{phrase.bribri}</p>
                        <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>
                      </div>
                      <p className="text-foreground/80">{phrase.english}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cultural Practices */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Cultural Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Cacao Ceremonies</h4>
                  <p className="text-sm text-muted-foreground">
                    The Bribri have maintained traditional cacao cultivation and preparation methods for millennia, using it in sacred ceremonies and as a form of currency.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Traditional Medicine</h4>
                  <p className="text-sm text-muted-foreground">
                    Deep knowledge of medicinal plants passed down through generations, with shamans (awápa) serving as spiritual and medical leaders.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Handwoven Crafts</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional bag weaving (kri) using natural fibers and plant-based dyes, each pattern telling stories of their cosmology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <Card className="border-2 border-emerald-600/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-semibold">~12,000</span>
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
            <Card className="border-2 border-emerald-600/20 bg-emerald-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Support Bribri Artisans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Purchase authentic handcrafted items directly from Bribri artisans.
                </p>
                <Button className="w-full" variant="outline">
                  Browse Crafts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="border-2 border-emerald-600/20">
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
