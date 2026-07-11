import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-[80vh] bg-background text-foreground">
      <section className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border bg-card shadow-sm">
          <UtensilsCrossed className="h-10 w-10 text-primary" />
        </div>

        <span className="mb-4 rounded-full border bg-muted px-4 py-1 text-sm text-muted-foreground">
          Owner: Deepak Varshney
        </span>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
          Discover Delicious Food,
          <span className="text-primary"> One Click Away.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Browse the restaurant menu, explore product variants, and build your
          cart with a fast and beautiful experience.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="gap-2">
            <Link to="/menu">
              Browse Menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button size="lg" variant="secondary">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}