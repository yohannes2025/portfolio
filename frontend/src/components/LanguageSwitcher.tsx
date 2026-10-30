// frontend/src/components/LanguageSwitcher.tsx
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const currentLanguage = (i18n.resolvedLanguage || i18n.language)
    .toLowerCase()
    .split("-")[0];

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "de" : "en";
    void i18n.changeLanguage(newLang);
    // Force a page reload to ensure all components update (temporary fix)
    // window.location.reload(); // Uncomment if still not working
  };


  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      title={
        currentLanguage === "en" ? t("language.german") : t("language.english")
      }
      aria-label={
        currentLanguage === "en" ? t("language.german") : t("language.english")
      }
    >
      <Globe size={18} />
      <span className="text-sm font-medium">
        {currentLanguage === "en" ? "DE" : "EN"}
      </span>
    </motion.button>
  );
}
