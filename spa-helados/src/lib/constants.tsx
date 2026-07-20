export const BUSINESS = {
    name: "Helados Alegria",
    whatsappNumber: "526461426384",
    address: "Revolución, Bustamante, 22840 Ensenada, B.C.",
    lat: 31.8662603,
    lng: -116.6012803,
    mapsUrl: "https://maps.app.goo.gl/1EZWzpapR3TM2t9s5",
    rating: null,
    ratingCount: null,
    email: "heladosalegria@gmail.com",
    facebook: "",
    instagram: "https://www.instagram.com/heladosalegria.ens?igsh=YjgxNmlhYnFxM2Y2",
    schedule: [
        { day: "Entre semana", hours: "Cerrado" },
        { day: "Sabado y Domingo", hours: "12:00 pm – 5:00 pm" },
    ],
    whatsappMessage: encodeURIComponent(
        "Hola, quiero ordenar un helado"
    ),
    siteUrl: "https://heladosalegria.com.mx",
} as const;