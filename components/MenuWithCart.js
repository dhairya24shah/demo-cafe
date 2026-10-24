"use client";

import { useState } from "react";

export default function MenuWithCart({ menu, phone }) {
  const [cart, setCart] = useState({}); // { itemId: quantity }
  const [name, setName] = useState("");

  const categories = [...new Set(menu.map((item) => item.category))];

  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const remove = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (next[id] > 1) next[id] -= 1;
      else delete next[id];
      return next;
    });

  const cartItems = menu
    .filter((item) => cart[item.id])
    .map((item) => ({ ...item, qty: cart[item.id] }));
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const orderLink = () => {
    const lines = cartItems.map(
      (i) => `${i.qty} x ${i.name} = ₹${i.price * i.qty}`
    );
    const text = `Hi, I'm ${name}. I'd like to order:\n${lines.join(
      "\n"
    )}\nTotal: ₹${total}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
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
                    <span>
                      {item.name}
                      <span className="block text-sm text-stone-500">
                        ₹{item.price}
                      </span>
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    {cart[item.id] ? (
                      <>
                        <button
                          onClick={() => remove(item.id)}
                          className="h-8 w-8 rounded-full border border-stone-300"
                        >
                          −
                        </button>
                        <span className="w-4 text-center">{cart[item.id]}</span>
                      </>
                    ) : null}
                    <button
                      onClick={() => add(item.id)}
                      className="h-8 w-8 rounded-full bg-amber-700 text-white"
                    >
                      +
                    </button>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Cart summary */}
      <div className="rounded-lg bg-white p-5 shadow">
        <h3 className="mb-3 text-xl font-semibold">Your order</h3>
        {cartItems.length === 0 ? (
          <p className="text-stone-500">Your cart is empty. Add items above.</p>
        ) : (
          <>
            <ul className="space-y-1">
              {cartItems.map((i) => (
                <li key={i.id} className="flex justify-between">
                  <span>
                    {i.qty} × {i.name}
                  </span>
                  <span>₹{i.price * i.qty}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex justify-between border-t pt-3 text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </p>
          </>
        )}

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 w-full rounded-lg border border-stone-300 p-3"
        />
        <button
          disabled={!cartItems.length || !name.trim()}
          onClick={() => window.open(orderLink(), "_blank")}
          className="mt-4 w-full rounded-full bg-green-600 px-6 py-3 font-medium text-white disabled:opacity-40"
        >
          Place order on WhatsApp
        </button>
      </div>
    </section>
  );
}