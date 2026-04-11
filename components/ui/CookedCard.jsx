import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Tag, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";

export default function CookedCard({ pkg }) {
  const visibleMenus = pkg.menu_items?.slice(0, 3) || [];
  const remainingCount = (pkg.menu_items?.length || 0) - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden rounded-xl border border-primary-100/50 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300">
        <div className="aspect-[4/3] relative overflow-hidden">
          {pkg.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={pkg.image_url}
              alt={`Paket Masak Tipe ${pkg.type}`}
              loading="lazy"
              width={400}
              height={300}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-secondary-50 flex items-center justify-center">
              <ChefHat size={64} className="text-secondary-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <Badge className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm text-text-primary border-0">
            Tipe {pkg.type}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-xl font-bold text-text-primary">
            Paket Masak Tipe {pkg.type}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-text-secondary">
            <Scale size={16} />
            <span>{pkg.weight_range}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 mb-3">
            <Tag size={16} className="text-secondary" />
            <span className="text-2xl font-bold text-secondary">
              Rp {pkg.price?.toLocaleString("id-ID")}
            </span>
          </div>

          {visibleMenus.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {visibleMenus.map((item, i) => (
                <span
                  key={i}
                  className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full"
                >
                  {item}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="bg-primary-50 text-primary-500 text-xs px-2 py-1 rounded-full">
                  +{remainingCount} lainnya
                </span>
              )}
            </div>
          )}

          {pkg.description && (
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {pkg.description}
            </p>
          )}

          <WhatsAppButton
            message={`Halo, saya tertarik Paket Masak Tipe ${pkg.type} (${pkg.weight_range}) dengan menu ${(pkg.menu_items || []).join(", ")} harga Rp ${pkg.price?.toLocaleString("id-ID")}. Apakah masih tersedia?`}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
