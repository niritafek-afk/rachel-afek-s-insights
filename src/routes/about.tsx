import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "אודות | רחל אפק" },
      {
        name: "description",
        content:
          "על רחל אפק – סופרת, בעלת טור, ועל המגזין האישי שלה: כתיבה איטית בעולם ממהר.",
      },
    ],
  }),
});

function About() {
  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] text-primary uppercase mb-4 text-center">
          אודות
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-center leading-tight">
          על הכותבת, ועל המקום הזה
        </h1>

        <div className="article-prose mt-12">
          <p>
            שמי רחל אפק. אני סופרת ובעלת טור, כותבת על פוליטיקה, חברה ותרבות
            מזה שני עשורים. גרה בירושלים, אם לשלושה, ובת לאמא שעדיין מתקשרת
            לתקן לי שגיאות כתיב.
          </p>
          <p>
            המגזין הזה נולד מתוך עייפות. עייפות מהקצב של השיח הציבורי, מהדרישה
            לקחת עמדה לפני שהבנתי את השאלה, ומהתחושה שבמרחב הרשתי אין יותר
            מקום לחשיבה איטית. החלטתי לבנות לעצמי – ואולי גם לך – פינה אחת
            שבה הקצב שונה.
          </p>

          <h2>מה תמצאו כאן</h2>
          <p>
            מאמרי דעה, רשמים אישיים, ולעיתים גם סיפורים קצרים. הנושאים נעים בין
            פוליטיקה ישראלית לחיי משפחה, בין ביקורת תרבות לתצפיות על השכונה. מה
            שמחבר ביניהם הוא נקודת המבט: אישה אחת, שמנסה להבין את המקום בו היא
            חיה, מתוך כבוד לקוראים שלה.
          </p>

          <h2>מה לא תמצאו כאן</h2>
          <p>
            לא תמצאו פרסומות, לא תוכן ממומן, ולא קליקבייט. אם פעם תקראו כאן
            כותרת מסקרנת – זה כי באמת חשבתי שזה מה שהמאמר אומר.
          </p>

          <blockquote>
            "אנחנו לא מחויבות לסיים את העבודה, אבל גם איננו רשאיות להיבטל ממנה."
          </blockquote>

          <p>
            תודה שאת קוראת. אם משהו שכתבתי הזיז משהו אצלך – בכיוון אחד או אחר –
            אשמח לשמוע.
          </p>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            צרי קשר
          </Link>
        </div>
      </article>
    </SiteLayout>
  );
}
