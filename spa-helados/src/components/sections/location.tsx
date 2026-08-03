import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getConfig } from "@/lib/strapi";
import { formatSchedule, formatAddress } from "@/lib/format";

export async function Location() {
  const config = await getConfig();

  const mapEmbedSrc = `https://www.google.com/maps?q=Helados+Alegria/${config.lat},${config.lng}&z=16&output=embed`;
  const schedule = formatSchedule(config);
  const address = formatAddress(config);

  return (
    <section id="ubicacion" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Ubicación
        </h2>
        <p className="mt-2 text-muted-foreground">
          Visítanos, estamos ubicados en zona los globos y comprueba el mejor sabor en ensenada con nuestros Helados de fruta natural 
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Info del negocio */}
        <div className="flex flex-col justify-between gap-6 rounded-(--radius) border border-border bg-card p-6 shadow-[--shadow-elegant] md:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold text-card-foreground">
                {config.bussinesName}
              </h3>
              {config.rating != null && config.rating > 0 && (
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    ★ {config.rating}
                  </span>
                  {config.ratingCount != null && (
                    <span>({config.ratingCount} reseñas en Google)</span>
                  )}
                </div>
              )}
            </div>

            {address && (
              <div>
                <h4 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Dirección
                </h4>
                <p className="text-card-foreground">{address}</p>
              </div>
            )}

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Horario
              </h4>
              <ul className="flex flex-col gap-1">
                {schedule.map((item) => (
                  <li
                    key={item.day}
                    className="flex justify-between border-b border-border py-1.5 text-sm last:border-0"
                  >
                    <span className="font-medium text-card-foreground">
                      {item.day}
                    </span>
                    <span
                      className={
                        item.hours === "Cerrado"
                          ? "font-semibold text-destructive"
                          : "text-muted-foreground"
                      }
                    >
                      {item.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {(config.facebook || config.instagram) && (
              <div>
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Síguenos
                </h4>
                <div className="flex gap-3">
                  {config.facebook && (
                    <Link
                      href={config.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-blue-500 sm:bg-secondary text-accent-foreground px-4 py-2 text-sm font-semibold sm:text-secondary-foreground transition-colors hover:bg-blue-500 hover:text-accent-foreground"
                    >
                      Facebook
                    </Link>
                  )}
                  {config.instagram && (
                    <Link
                      href={config.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] sm:bg-none sm:bg-secondary text-accent-foreground sm:text-secondary-foreground px-4 py-2 text-sm font-semibold transition-colors hover:bg-linear-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:text-accent-foreground "
                    >
                      Instagram
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href={config.mapsUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-full">
              Cómo llegar
            </Button>
          </Link>
        </div>

        {/* Mapa */}
        <div className="min-h-80 overflow-hidden rounded-(--radius) border border-border shadow-[--shadow-elegant] md:min-h-full">
          <iframe
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación de ${config.bussinesName}`}
          />
        </div>
      </div>
    </section>
  );
}