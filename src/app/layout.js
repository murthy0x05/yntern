import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: "TalentScope AI — Intelligent Talent Scouting Agent",
  description:
    "AI-powered talent scouting and engagement agent. Parse job descriptions, discover matching candidates, simulate conversational outreach, and generate ranked shortlists.",
  keywords: ["AI", "talent scouting", "recruitment", "hiring", "Gemini"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
