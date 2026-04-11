import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GoatCard from "@/components/ui/GoatCard";
import CookedCard from "@/components/ui/CookedCard";
import FeaturesSection from "@/components/ui/FeaturesSection";
import { Beef, ChefHat, ArrowDown, ShoppingBag } from "lucide-react";

const TYPES = ["Semua", "A", "B", "C"];

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&h=800&fit=crop",
    title: "Kambing Kurban Premium",
    subtitle: "Pilihan terbaik untuk ibadah kurban Anda",
  },
  {
    image: "https://images.unsplash.com/photo-1524024973431-2ad916746264?w=1200&h=800&fit=crop",
    title: "Kualitas Terjamin",
    subtitle: "Kambing sehat, gemuk, dan terawat dengan baik",
  },
  {
    image: "https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f?w=1200&h=800&fit=crop",
    title: "Gratis Pengiriman",
    subtitle: "Pesan sekarang, kami antar langsung ke rumah Anda",
  },
];

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [liveGoats, setLiveGoats] = useState([]);
  const [cookedPackages, setCookedPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liveFilter, setLiveFilter] = useState("Semua");
  const [cookedFilter, setCookedFilter] = useState("Semua");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [goatsRes, packagesRes] = await Promise.all([
        supabase.from("live_goats").select("*").eq("is_active", true).order("type"),
        supabase.from("cooked_packages").select("*").eq("is_active", true).order("type"),
      ]);
      if (goatsRes.error) throw goatsRes.error;
      if (packagesRes.error) throw packagesRes.error;
      setLiveGoats(goatsRes.data || []);
      setCookedPackages(packagesRes.data || []);
    } catch (err) {
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filteredLiveGoats =
    liveFilter === "Semua" ? liveGoats : liveGoats.filter((g) => g.type === liveFilter);
  const filteredCookedPackages =
    cookedFilter === "Semua" ? cookedPackages : cookedPackages.filter((p) => p.type === cookedFilter);

  const SkeletonCard = () => (
    <div className="rounded-xl border border-primary-100/50 overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );

  const TypeFilter = ({ value, onChange }) => (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            value === type
              ? "bg-primary text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary"
          }`}
        >
          {type === "Semua" ? "Semua Tipe" : `Tipe ${type}`}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Hero Section with Auto-Sliding Images */}
      <section className="relative h-[85vh] sm:h-[90vh] overflow-hidden">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg">
                  {heroSlides[currentSlide].title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow">
                  {heroSlides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <a href="#katalog">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary-500 text-text-primary font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-secondary/30 hover:shadow-xl transition-all active:scale-95"
              >
                Lihat Katalog
                <ArrowDown size={20} className="ml-2" />
              </Button>
            </a>

            <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { label: "500+ Terjual", icon: ShoppingBag },
                { label: "100% Halal", icon: Beef },
                { label: "Gratis Ongkir", icon: ChefHat },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm"
                >
                  <stat.icon size={16} />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Wave divider */}
      <svg className="w-full -mt-1 text-background" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none">
        <path d="M0,0 Q360,60 720,30 Q1080,0 1440,40 L1440,60 L0,60 Z" />
      </svg>

      {/* Catalog Section */}
      <section id="katalog" className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-text-primary mb-4">
              Pilih Kambing Kurban Anda
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Tersedia berbagai pilihan kambing hidup dan paket masak siap saji.
            </p>
          </motion.div>

          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-primary-50 p-1 h-auto">
              <TabsTrigger
                value="live"
                className="flex items-center gap-2 py-3 text-primary font-semibold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-md"
              >
                <Beef size={16} />
                Qurban Hidup
              </TabsTrigger>
              <TabsTrigger
                value="cooked"
                className="flex items-center gap-2 py-3 text-primary font-semibold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md rounded-md"
              >
                <ChefHat size={16} />
                Qurban Masak
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live">
              <TypeFilter value={liveFilter} onChange={setLiveFilter} />
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button onClick={fetchAll} variant="outline">Coba Lagi</Button>
                </div>
              ) : filteredLiveGoats.length === 0 ? (
                <div className="text-center py-16">
                  <Beef size={48} className="mx-auto text-primary-200 mb-4" />
                  <p className="text-text-secondary text-lg">
                    {liveFilter !== "Semua" ? `Tidak ada kambing Tipe ${liveFilter}` : "Belum ada kambing tersedia"}
                  </p>
                  {liveFilter !== "Semua" && (
                    <button onClick={() => setLiveFilter("Semua")} className="mt-3 text-primary hover:underline text-sm">Tampilkan semua</button>
                  )}
                </div>
              ) : (
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLiveGoats.map((goat) => <GoatCard key={goat.id} goat={goat} />)}
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="cooked">
              <TypeFilter value={cookedFilter} onChange={setCookedFilter} />
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button onClick={fetchAll} variant="outline">Coba Lagi</Button>
                </div>
              ) : filteredCookedPackages.length === 0 ? (
                <div className="text-center py-16">
                  <ChefHat size={48} className="mx-auto text-secondary-200 mb-4" />
                  <p className="text-text-secondary text-lg">
                    {cookedFilter !== "Semua" ? `Tidak ada paket Tipe ${cookedFilter}` : "Belum ada paket tersedia"}
                  </p>
                  {cookedFilter !== "Semua" && (
                    <button onClick={() => setCookedFilter("Semua")} className="mt-3 text-primary hover:underline text-sm">Tampilkan semua</button>
                  )}
                </div>
              ) : (
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCookedPackages.map((pkg) => <CookedCard key={pkg.id} pkg={pkg} />)}
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Wave divider */}
      <svg className="w-full -mb-1 text-surface" viewBox="0 0 1440 60" fill="currentColor" preserveAspectRatio="none">
        <path d="M0,40 Q360,0 720,30 Q1080,60 1440,20 L1440,60 L0,60 Z" />
      </svg>

      <FeaturesSection />
    </>
  );
}
