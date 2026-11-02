import type { CSSProperties } from "react";
import { useTheme } from "@/lib/theme";

interface SiteMenuSheetProps {
  open: boolean;
  onClose: () => void;
  onOpenFeedback: () => void;
}

export function SiteMenuSheet({ open, onClose, onOpenFeedback }: SiteMenuSheetProps) {
  const { theme, setTheme } = useTheme();

  if (!open) return null;

  // Translation calculation for 3-button segmented pill
  const pillTranslate =
    theme === "system"
      ? "calc(0% + 0px)"
      : theme === "light"
      ? "calc(100% + 4px)"
      : "calc(200% + 8px)";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center sm:justify-end p-3 pt-3 sm:p-6 sm:pt-5 sm:pr-8 md:pr-10 bg-black/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-[390px] rounded-[36px] p-6 sm:p-7 overflow-y-auto overscroll-contain shadow-2xl transition-all duration-200 bg-white text-[#000c1f] dark:bg-[#0c0f17] dark:text-white border border-black/5 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        {/* Top bar with Theme Switcher and Close button */}
        <div className="flex shrink-0 items-center justify-between mb-8">
          <div>
            <div
              className="relative flex gap-1 rounded-full p-1 bg-[#f0f2f5] border border-black/5 dark:bg-[#161b26] dark:border-white/10"
              role="radiogroup"
              aria-label="Theme"
            >
              <span
                className="pointer-events-none absolute top-1 left-1 size-8 rounded-full bg-white dark:bg-[#242b3b] shadow-sm transition-transform duration-250 ease-out"
                style={{ transform: `translateX(${pillTranslate})` } as CSSProperties}
                aria-hidden="true"
              />

              {/* System */}
              <button
                type="button"
                className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors z-10 ${
                  theme === "system"
                    ? "text-[#000c1f] dark:text-white font-medium"
                    : "text-gray-500 hover:text-[#000c1f] dark:text-gray-400 dark:hover:text-white"
                }`}
                onClick={() => setTheme("system")}
                aria-label="System theme"
                title="System theme"
              >
                <svg className="size-4" fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 18H3v-2h14v2Z" fill="currentColor" />
                  <path d="M15 2c1.66 0 3 1.34 3 3v6c0 1.66-1.34 3-3 3H5c-1.66 0-3-1.34-3-3V5c0-1.66 1.34-3 3-3h10ZM5 4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              </button>

              {/* Light */}
              <button
                type="button"
                className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors z-10 ${
                  theme === "light"
                    ? "text-[#000c1f] dark:text-white font-medium"
                    : "text-gray-500 hover:text-[#000c1f] dark:text-gray-400 dark:hover:text-white"
                }`}
                onClick={() => setTheme("light")}
                aria-label="Light theme"
                title="Light theme"
              >
                <svg className="size-4" fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 16a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2ZM11 2a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V2ZM4 9H2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2ZM18 9h-2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2Z" fill="currentColor" />
                  <path d="M5.048 3.636a1 1 0 0 0-1.415 1.414l1.415 1.414a1 1 0 0 0 1.414-1.414L5.048 3.636ZM14.948 13.536a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM5.048 13.536l-1.414 1.414a1 1 0 0 0 1.414 1.415l1.414-1.415a1 1 0 0 0-1.414-1.414ZM14.948 3.635l-1.414 1.415a1 1 0 0 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.415Z" fill="currentColor" />
                  <path d="M10 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Zm0-2c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4Z" fill="currentColor" />
                </svg>
              </button>

              {/* Dark */}
              <button
                type="button"
                className={`relative flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors z-10 ${
                  theme === "dark"
                    ? "text-[#000c1f] dark:text-white font-medium"
                    : "text-gray-500 hover:text-[#000c1f] dark:text-gray-400 dark:hover:text-white"
                }`}
                onClick={() => setTheme("dark")}
                aria-label="Dark theme"
                title="Dark theme"
              >
                <svg className="size-4" fill="none" height="16" viewBox="0 0 20 20" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.433 5.428c-.11 2.518.75 4.927 2.48 6.666 1.6 1.599 3.811 2.478 6.232 2.478.15 0 .3 0 .46-.01-1.5 1.26-3.221 1.94-4.911 1.94-1.69 0-3.13-.64-4.331-1.85-2.51-2.518-2.44-6.206.08-9.224h-.01ZM7.493 1.51c-.1 0-.2.02-.29.06-.92.41-1.79 1-2.54 1.759-3.881 3.868-4.271 9.195-.72 12.743 1.63 1.629 3.66 2.428 5.75 2.428 2.42 0 4.921-1.07 6.992-3.138.76-.76 1.34-1.62 1.75-2.549.22-.49-.16-1.01-.64-1.01-.09 0-.19.02-.28.06-1.04.45-2.21.7-3.37.7-1.741 0-3.481-.56-4.811-1.889-2.25-2.249-2.31-5.597-1.19-8.185.21-.49-.18-.99-.65-.99v.01Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#f0f2f5] text-[#000c1f] hover:bg-[#e4e7eb] dark:bg-[#161b26] dark:text-white dark:hover:bg-[#202736] active:scale-95 transition-all"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg fill="none" height="18" viewBox="0 0 20 20" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 5.4L14.6 4L10 8.6L5.4 4L4 5.4L8.6 10L4 14.6L5.4 16L10 11.4L14.6 16L16 14.6L11.4 10L16 5.4Z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Navigation list matching image_b44d82ca.png and image_1186ed77.png */}
        <nav className="flex flex-col gap-3.5 text-center my-auto py-2">
          <a
            href="/"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            Home
          </a>
          <a
            href="/#about"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            How it works
          </a>
          <a
            href="/privacy-policy"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            Privacy
          </a>
          <a
            href="/#about"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            About
          </a>
          <a
            href="/#roadmap"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            Coming soon
          </a>
          <a
            href="/#roadmap"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            Releases
          </a>
          <a
            href="/faq"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            FAQ
          </a>
          <button
            type="button"
            className="text-2xl md:text-[28px] font-medium tracking-tight text-[#000c1f] dark:text-white hover:opacity-80 transition-opacity cursor-pointer"
            onClick={() => {
              onClose();
              onOpenFeedback();
            }}
          >
            Submit feedback
          </button>
        </nav>

        {/* Footer in Menu matching image_c0fd466f.png */}
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-[#f4f6f9] dark:bg-[#141824] p-4 mt-6 text-[#525f7f] dark:text-gray-400 border border-black/5 dark:border-white/10">
          <span className="flex shrink-0 items-center justify-center">
            <img src="/site-assets/us-flag.svg" alt="US Flag" width="28" height="18" className="rounded-xs shadow-2xs" />
          </span>
          <p className="text-xs text-center font-normal leading-relaxed text-[#3c4257] dark:text-gray-300">
            An official website of the United States government
          </p>
        </div>
      </div>
    </div>
  );
}
