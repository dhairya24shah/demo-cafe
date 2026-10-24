import { cafe, menu } from "../data/menu";

const categories = [...new Set(menu.map((item) => item.category))];
const whatsappLink = `https://wa.me/${cafe.phone}?text=${encodeURIComponent(
  "Hi, I'd like to place an order"
)}`;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  cafe.address
)}&output=embed`;

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 text-stone-800">
      {/* Hero */}
      <section className="bg-stone-900 px-6 py-20 text-center text-amber-50">
        <h1 className="text-4xl font-bold sm:text-5xl">{cafe.name}</h1>
        <p className="mt-3 text-lg text-amber-200">{cafe.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappLink}
            className="rounded-full bg-green-600 px-6 py-3 font-medium text-white"
          >
            Order on WhatsApp
          </a>
          <a
            href={`tel:+${cafe.phone}`}
            className="rounded-full border border-amber-200 px-6 py-3 font-medium"
          >
            Call us
          </a>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="mx-auto max-w-2xl px-6 py-14">
        <h2 className="mb-8 text-center text-3xl font-semibold">Our Menu</h2>
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="mb-3 text-xl font-semibold text-amber-800">
              {category}
            </h3>
            <ul className="space-y-3">
              {menu
                .filter((item) => item.category === category)
                .map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      {item.name}
                    </span>
                    <span className="font-medium">₹{item.price}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="bg-white px-6 py-14 text-center">
        <h2 className="mb-4 text-3xl font-semibold">About us</h2>
        <p className="mx-auto max-w-xl text-stone-600">{cafe.about}</p>
      </section>

      {/* Gallery (swap these boxes for real photos later) */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="mb-6 text-center text-3xl font-semibold">Gallery</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {["☕", "🥐", "🍰", "🥪", "🍫", "🥤"].map((emoji, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-amber-100 text-5xl"
            >
              {emoji}
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-stone-900 px-6 py-14 text-amber-50">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-semibold">Visit us</h2>
          <p>{cafe.address}</p>
          <p className="mt-1">{cafe.timings}</p>
          <p className="mt-1">+{cafe.phone}</p>
          <iframe
            src={mapSrc}
            className="mt-6 h-64 w-full rounded-lg border-0"
            loading="lazy"
            title="Cafe location"
          />
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-stone-500">
        © © 2026 {cafe.name}. Sample website.
      </footer>
    </main>
  );
}