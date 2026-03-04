import Link from "next/link"

const BASE = "/portfolio/einzelhandel-launch"

export const metadata = {
  title: "Kollektion — Mila Mode",
  description: "Unsere aktuelle Frühjahr/Sommer 2025 Kollektion. Zeitlose Damenmode, nachhaltig produziert.",
}

const filters = ["Alle", "Oberteile", "Hosen", "Kleider", "Accessoires"]

const products = [
  {
    name: "Leinenbluse Ivory",
    material: "Leinen",
    price: "79",
    sizes: ["XS", "S", "M", "L", "XL"],
    gradient: "linear-gradient(145deg, #f0ebe8 0%, #d8ccc6 100%)",
  },
  {
    name: "Wide-Leg Hose Camel",
    material: "Baumwolle",
    price: "129",
    sizes: ["34", "36", "38", "40", "42"],
    gradient: "linear-gradient(145deg, #e8ddd5 0%, #c4a98e 100%)",
  },
  {
    name: "Sommerkleid Rose",
    material: "Viskose",
    price: "99",
    sizes: ["XS", "S", "M", "L"],
    gradient: "linear-gradient(145deg, #f0d9d3 0%, #d6a89a 100%)",
  },
  {
    name: "Strickjacke Creme",
    material: "Baumwolle",
    price: "89",
    sizes: ["XS", "S", "M", "L", "XL"],
    gradient: "linear-gradient(145deg, #f5f0eb 0%, #ddd0c4 100%)",
  },
  {
    name: "Jogger Pants Taupe",
    material: "Baumwolle",
    price: "75",
    sizes: ["XS", "S", "M", "L", "XL"],
    gradient: "linear-gradient(145deg, #e5e0db 0%, #b8b0a8 100%)",
  },
  {
    name: "Maxirock Beige",
    material: "Leinen",
    price: "109",
    sizes: ["34", "36", "38", "40", "42"],
    gradient: "linear-gradient(145deg, #ede8e0 0%, #c8bfb0 100%)",
  },
  {
    name: "Oversized Blazer Sand",
    material: "Viskose",
    price: "149",
    sizes: ["XS", "S", "M", "L"],
    gradient: "linear-gradient(145deg, #ede5d8 0%, #c4b49a 100%)",
  },
  {
    name: "Crop Top Weiß",
    material: "Baumwolle",
    price: "45",
    sizes: ["XS", "S", "M", "L", "XL"],
    gradient: "linear-gradient(145deg, #f8f6f4 0%, #e0dbd7 100%)",
  },
  {
    name: "Cargo Hose Khaki",
    material: "Baumwolle",
    price: "95",
    sizes: ["34", "36", "38", "40", "42"],
    gradient: "linear-gradient(145deg, #e0e0d8 0%, #b8baa8 100%)",
  },
]

export default function KollektionPage() {
  return (
    <>
      {/* Page Header */}
      <div
        style={{
          backgroundColor: "#f5f5f4",
          borderBottom: "1px solid #e7e5e4",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.25em",
            color: "#737373",
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Kollektion
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Frühjahr / Sommer 2025
        </h1>
        <p style={{ color: "#737373", fontSize: 14 }}>
          {products.length} Produkte
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        {/* Filter Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "1.5rem 0",
            borderBottom: "1px solid #e7e5e4",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.12em", color: "#737373", marginRight: 8 }}>
            FILTER
          </span>
          {filters.map((f, i) => (
            <Link
              key={f}
              href={`${BASE}/kollektion`}
              style={{
                fontSize: 12,
                letterSpacing: "0.06em",
                padding: "6px 16px",
                textDecoration: "none",
                backgroundColor: i === 0 ? "#1a1a1a" : "transparent",
                color: i === 0 ? "white" : "#737373",
                border: i === 0 ? "1px solid #1a1a1a" : "1px solid #e7e5e4",
                transition: "all 0.15s",
              }}
            >
              {f}
            </Link>
          ))}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#737373" }}>SORTIEREN</span>
            <select
              style={{
                fontSize: 12,
                border: "1px solid #e7e5e4",
                padding: "6px 12px",
                backgroundColor: "white",
                color: "#1a1a1a",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option>Empfohlen</option>
              <option>Preis aufsteigend</option>
              <option>Preis absteigend</option>
              <option>Neuheiten</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            padding: "2.5rem 0",
          }}
        >
          {products.map((product) => (
            <div
              key={product.name}
              style={{
                backgroundColor: "white",
                border: "1px solid #e7e5e4",
                overflow: "hidden",
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 280,
                  background: product.gradient,
                  position: "relative",
                }}
              >
                {/* Texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 7px)",
                  }}
                />
                {/* Wishlist icon */}
                <button
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "white",
                    border: "none",
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <h2 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>
                    {product.name}
                  </h2>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", whiteSpace: "nowrap", marginLeft: 8 }}>
                    {product.price} €
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "#737373", letterSpacing: "0.06em", marginBottom: 12 }}>
                  {product.material}
                </p>

                {/* Size Selector */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.1em", color: "#737373", marginBottom: 6 }}>
                    GRÖSSE
                  </p>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {product.sizes.map((size, i) => (
                      <button
                        key={size}
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.04em",
                          border: i === 1 ? "1px solid #1a1a1a" : "1px solid #e7e5e4",
                          backgroundColor: i === 1 ? "#1a1a1a" : "transparent",
                          color: i === 1 ? "white" : "#737373",
                          padding: "4px 8px",
                          cursor: "pointer",
                          minWidth: 32,
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  style={{
                    width: "100%",
                    backgroundColor: "#1a1a1a",
                    color: "white",
                    border: "none",
                    padding: "11px",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  IN DEN WARENKORB
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            padding: "2rem 0 4rem",
          }}
        >
          {[1, 2, 3].map((page) => (
            <Link
              key={page}
              href={`${BASE}/kollektion`}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                textDecoration: "none",
                backgroundColor: page === 1 ? "#1a1a1a" : "transparent",
                color: page === 1 ? "white" : "#737373",
                border: page === 1 ? "1px solid #1a1a1a" : "1px solid #e7e5e4",
              }}
            >
              {page}
            </Link>
          ))}
          <Link
            href={`${BASE}/kollektion`}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              textDecoration: "none",
              color: "#737373",
              border: "1px solid #e7e5e4",
            }}
          >
            →
          </Link>
        </div>
      </div>
    </>
  )
}
