import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('en') ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className="lang-switcher"
      data-cursor
    >
      {i18n.language.startsWith('en') ? 'EN' : 'ES'}
    </button>
  );
}
