import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-6xl text-primary">404</h1>
        <h2 className="mt-4 font-serif text-2xl">העמוד לא נמצא</h2>
        <p className="mt-2 text-muted-foreground">
          ייתכן שהקישור שגוי או שהמאמר הוסר.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          חזרה לעמוד הבית
        </Link>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-2xl">משהו השתבש</h1>
        <p className="mt-2 text-muted-foreground">נסי לרענן את העמוד.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          נסי שוב
        </button>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "רחל אפק | מגזין אישי – דעות, חברה, תרבות ואקטואליה" },
      {
        name: "description",
        content:
          "הבלוג האישי של רחל אפק – מאמרי דעה, מחשבות וסיפורים על פוליטיקה, חברה, תרבות ואקטואליה בישראל.",
      },
      { name: "author", content: "רחל אפק" },
      { property: "og:title", content: "רחל אפק | מגזין אישי" },
      {
        property: "og:description",
        content: "כתיבה אישית על פוליטיקה, חברה, תרבות ואקטואליה.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "he_IL" },
      { name: "twitter:card", content: "summary" },
      { rel: "canonical", href: "/" } as never,
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700;900&family=Heebo:wght@300;400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
