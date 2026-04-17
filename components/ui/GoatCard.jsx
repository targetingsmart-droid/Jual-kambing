import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Tag } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";

export default function GoatCard({ goat }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden rounded-xl border border-primary-100/50 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300">
        <div className="aspect-[4/3] relative overflow-hidden">
          {goat.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={goat.image_url}
              alt={`Kambing Tipe ${goat.type}`}
              loading="lazy"
              width={400}
              height={300}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-primary-50 flex items-center justify-center">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                className="text-primary-200"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          <Badge className="absolute top-2 left-2 bg-primary/90 backdrop-blur-sm text-white border-0">
            Tipe {goat.type}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-xl font-bold text-text-primary">
            Kambing Tipe {goat.type} {goat.goat_number ? `(#${goat.goat_number})` : ""}
          </h3>
          <div className="flex items-center gap-2 mt-2 text-text-secondary">
            <Scale size={16} />
            <span>{goat.weight_range}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <Tag size={16} className="text-secondary" />
            <span className="text-2xl font-bold text-secondary">
              Rp {goat.price?.toLocaleString("id-ID")}
            </span>
          </div>
          {goat.description && (
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {goat.description}
            </p>
          )}
          <WhatsAppButton
            message={`Halo, saya tertarik Kambing Hidup Tipe ${goat.type}${goat.goat_number ? ` (No. ${goat.goat_number})` : ""} (${goat.weight_range}) harga Rp ${goat.price?.toLocaleString("id-ID")}. Apakah masih tersedia?`}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
