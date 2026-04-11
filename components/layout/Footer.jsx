import { Phone, Clock } from "lucide-react";

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="kontak" className="relative">
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
                  href="https://wa.me/6282220553417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-200 hover:text-secondary transition-colors"
                >
                  <Phone size={16} />
                  <span>+62 822-2055-3417</span>
                </a>
                <a
                  href="https://instagram.com/goatshop.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-200 hover:text-secondary transition-colors"
                >
                  <InstagramIcon size={16} />
                  <span>@goatshop.id</span>
                </a>

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
