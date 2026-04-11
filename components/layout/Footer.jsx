import { Phone, Clock, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative">
      <div className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />

      <svg
        className="w-full text-primary-900"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z" />
      </svg>

      <div className="bg-primary-900 text-white pb-8 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">GoatShop</h3>
              <p className="text-primary-200 text-sm leading-relaxed">
                Penyedia kambing kurban premium dengan kualitas terbaik. Melayani
                pemesanan untuk Idul Adha dan aqiqah.
              </p>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Kontak</h3>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-200 hover:text-secondary transition-colors"
                >
                  <Phone size={16} />
                  <span>WhatsApp 1</span>
                </a>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER_2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-200 hover:text-secondary transition-colors"
                >
                  <Phone size={16} />
                  <span>WhatsApp 2</span>
                </a>
                <div className="flex items-center gap-2 text-primary-200">
                  <MapPin size={16} />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Jam Operasional</h3>
              <div className="space-y-2 text-primary-200">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Senin - Sabtu: 08.00 - 17.00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Minggu: 09.00 - 15.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-700 mt-8 pt-6 text-center text-primary-300 text-sm">
            &copy; {new Date().getFullYear()} GoatShop. Semua hak dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}
