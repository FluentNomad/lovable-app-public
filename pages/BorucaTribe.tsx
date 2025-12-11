import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Volume2, ShoppingBag, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TerritoryMap } from "@/components/TerritoryMap";

export default function BorucaTribe() {
  const navigate = useNavigate();
  
  const tribe = {
    id: "boruca",
    name: "Boruca",
    language: "Brunca",
    region: "Southern Pacific, Buenos Aires",
    color: "bg-purple-600",
    description: "Celebrated mask carvers and keepers of the Diablitos resistance tradition."
  };

  const otherTribes = [
    { id: "ngobe", name: "Ngöbe", color: "bg-amber-600" },
    { id: "bribri", name: "Bribri", color: "bg-emerald-600" },
    { id: "cabecar", name: "Cabécar", color: "bg-blue-600" },
    { id: "terraba", name: "Térraba", color: "bg-rose-600" },
    { id: "maleku", name: "Maleku", color: "bg-orange-600" },
    { id: "chorotega", name: "Chorotega", color: "bg-yellow-600" },
    { id: "huetar", name: "Huetar", color: "bg-teal-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-600/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/indigenous")}
          className="mb-6 hover:bg-accent/50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Indigenous Territories
        </Button>

        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${tribe.color} flex items-center justify-center text-3xl text-white shadow-lg`}>
              🏺
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
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
            <Badge variant="secondary">Mask Carving</Badge>
            <Badge variant="secondary">Diablitos Festival</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <Card className="border-2 border-purple-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Boruca Territory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TerritoryMap highlightedTribeId="boruca" />
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👹 About the Boruca
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/90">
                  The Boruca people are renowned throughout Central America for their elaborate hand-carved wooden masks and the annual Juego de los Diablitos (Game of the Little Devils) festival. This three-day celebration reenacts their ancestors' resistance against Spanish colonization.
                </p>
                <p className="text-foreground/90">
                  Each mask is a unique work of art, hand-carved from balsa wood and painted with vibrant colors and intricate designs. The tradition of mask-making has become both a cultural practice and an economic lifeline, with Boruca artisans' work sought by collectors worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Essential Boruca Phrases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { boruca: "Kuerë́", english: "Hello", pronunciation: "kweh-REH" },
                  { boruca: "Jñók", english: "Thank you", pronunciation: "hnYOHK" },
                  { boruca: "Ditsë́", english: "Goodbye", pronunciation: "dee-TSEH" }
                ].map((phrase, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-purple-600/5 border border-purple-600/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg text-purple-700">{phrase.boruca}</p>
                        <p className="text-sm text-muted-foreground italic">{phrase.pronunciation}</p>
                      </div>
                      <p className="text-foreground/80">{phrase.english}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Cultural Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Mask Carving Tradition</h4>
                  <p className="text-sm text-muted-foreground">
                    The Boruca are master carvers creating unique masks from balsa wood, each representing supernatural beings, animals, or ancestral spirits. No two masks are ever identical.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Juego de los Diablitos</h4>
                  <p className="text-sm text-muted-foreground">
                    This annual festival (Dec 31-Jan 2) dramatizes the battle between indigenous "devils" and a Spanish bull, celebrating cultural survival and resistance through music, dance, and ceremony.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Traditional Weaving</h4>
                  <p className="text-sm text-muted-foreground">
                    Women maintain weaving traditions creating textiles with natural plant-based dyes, including the distinctive brown from jícaro fruit and red from achiote seeds.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-purple-600/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Population:</span>
                  <span className="font-semibold">~2,500</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Main Territory:</span>
                  <span className="font-semibold">Boruca</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language Family:</span>
                  <span className="font-semibold">Chibchan</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600/20 bg-purple-600/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Support Boruca Artisans
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Purchase authentic hand-carved masks directly from Boruca artisans.
                </p>
                <Button className="w-full" variant="outline">
                  Browse Masks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-600/20">
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
                  Diablitos Festival
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Mask Carving Guide
                </Button>
              </CardContent>
            </Card>

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