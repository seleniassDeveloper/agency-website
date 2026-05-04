import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        services: "Services",
        about: "About Us",
        process: "Process",
        contact: "Contact",
        cta: "Contact Us"
      },
      hero: {
        eyebrow: "We are not just another agency.",
        title1: "We Build",
        title2: "Real",
        title3: "Products",
        desc: "Premium design and scalable code to take your business to the next level.",
        cta: "View Projects"
      },
      work: {
        label: "What we build",
        title: "Digital Solutions",
        p1: { name: "Landing Pages", desc: "Pages designed to capture attention and convert visitors into customers quickly and effectively.", tags: ["Conversion", "Sales", "Design"], stats: ["Fast", "Development", "High", "Impact"] },
        p2: { name: "Websites", desc: "Your official internet presence. Professional, fast, and optimized sites to highlight your brand.", tags: ["Corporate", "SEO", "Presence"], stats: ["100%", "Custom", "Optimal", "Performance"] },
        p3: { name: "Web Apps", desc: "Complete applications with complex logic, databases, and a seamless experience.", tags: ["SaaS", "Platforms", "E-commerce"], stats: ["UX", "Prioritized", "Cloud", "Scalable"] },
        p4: { name: "Internal Systems", desc: "Custom tools to manage your business, automate processes, and visualize data in real-time.", tags: ["Management", "Data", "Automation"], stats: ["Total", "Control", "Improved", "Efficiency"] }
      },
      about: {
        label: "Value",
        title1: "100%",
        title2: "UX+",
        desc1: "REAL SOLUTIONS",
        desc2: "SOLID LOGIC",
        title3: "∞",
        title4: "0",
        desc3: "SCALABILITY",
        desc4: "REQUIRED CODE FROM YOU",
        cardTitle: "You don't need to know how to code, you just need an idea.",
        li1: "You have an idea but don't know where to start.",
        li2: "You need to digitize your business professionally.",
        li3: "You want to sell more and scale online.",
        highlight: "We take care of transforming that need into a system that works and generates results.",
        footer: "We don't just build pretty designs, we build real products. We focus on combining an excellent user experience (UX) with robust logic and scalable architecture so your idea becomes a platform ready to grow."
      },
      process: {
        label: "Methodology",
        title1: "Our",
        title2: "Process",
        s1: { title: "We understand your idea", desc: "We listen to your vision, goals, and the problems you want to solve to align 100%." },
        s2: { title: "We define structure", desc: "We map out what is needed and prioritize key features to guarantee success." },
        s3: { title: "We design experience", desc: "We create intuitive interfaces (UX/UI) exclusively designed for conversion." },
        s4: { title: "We develop", desc: "We write fast and scalable code. We transform the approved design into a 100% functional product." },
        s5: { title: "We launch and improve", desc: "We put the product online and optimize it based on data and real user feedback." }
      },
      contact: {
        eyebrow: "Your idea can become a real product.",
        title: "HOW CAN WE HELP YOU?",
        form: {
          types: ["Website", "Web App", "Internal System", "Existing Code"],
          budgetLabel: "BUDGET RANGE",
          needsLabel: "SPECIFIC NEEDS",
          budgets: {
            "Website": ["Under $1k", "$1k - $3k", "Over $3k"],
            "Sitio Web": ["Under $1k", "$1k - $3k", "Over $3k"],
            "Web App": ["$3k - $5k", "$5k - $10k", "Over $10k"],
            "Internal System": ["$2k - $5k", "$5k - $10k", "Over $10k"],
            "Sistema Interno": ["$2k - $5k", "$5k - $10k", "Over $10k"],
            "Existing Code": ["Hourly", "Under $1k", "$1k - $3k", "Over $3k"],
            "Código Existente": ["Hourly", "Under $1k", "$1k - $3k", "Over $3k"]
          },
          needs: {
            "Website": ["Landing Page", "Corporate Site", "E-commerce", "Redesign"],
            "Sitio Web": ["Landing Page", "Corporate Site", "E-commerce", "Redesign"],
            "Web App": ["MVP from scratch", "Full SaaS", "Mobile App", "Custom Platform"],
            "Internal System": ["Metrics Dashboard", "Internal Mgmt", "Automation", "API Integration"],
            "Sistema Interno": ["Metrics Dashboard", "Internal Mgmt", "Automation", "API Integration"],
            "Existing Code": ["Fix bugs", "Add features", "Optimize performance", "Migration"],
            "Código Existente": ["Fix bugs", "Add features", "Optimize performance", "Migration"]
          },
          name: "YOUR NAME",
          email: "YOUR EMAIL",
          details: "EXTRA DETAILS (OPTIONAL)...",
          submit: "SEND MESSAGE"
        }
      },
      footer: {
        copy: "© 2026 Studio. All rights reserved."
      }
    }
  },
  es: {
    translation: {
      nav: {
        services: "Servicios",
        about: "Nosotros",
        process: "Proceso",
        contact: "Contacto",
        cta: "Contactar"
      },
      hero: {
        eyebrow: "No somos una agencia más.",
        title1: "Construimos",
        title2: "Productos",
        title3: "Reales",
        desc: "Diseño premium y código escalable para llevar tu negocio al siguiente nivel.",
        cta: "Ver Proyectos"
      },
      work: {
        label: "Qué construimos",
        title: "Soluciones Digitales",
        p1: { name: "Landing Pages", desc: "Páginas diseñadas para captar atención y convertir visitantes en clientes de forma rápida y efectiva.", tags: ["Conversión", "Ventas", "Diseño"], stats: ["Rápido", "Desarrollo", "Alto", "Impacto"] },
        p2: { name: "Sitios Web", desc: "Tu presencia oficial en internet. Sitios institucionales profesionales, rápidos y optimizados para destacar tu marca.", tags: ["Institucional", "SEO", "Presencia"], stats: ["100%", "Personalizado", "Óptimo", "Rendimiento"] },
        p3: { name: "Web Apps", desc: "Aplicaciones completas y plataformas de venta con lógica compleja, bases de datos y experiencia fluida.", tags: ["SaaS", "Plataformas", "E-commerce"], stats: ["UX", "Priorizado", "Cloud", "Escalable"] },
        p4: { name: "Sistemas Internos", desc: "Herramientas a medida para gestionar tu negocio, automatizar procesos y visualizar datos en tiempo real.", tags: ["Gestión", "Datos", "Automatización"], stats: ["Control", "Total", "Eficiencia", "Mejorada"] }
      },
      about: {
        label: "Valor",
        title1: "100%",
        title2: "UX+",
        desc1: "SOLUCIONES REALES",
        desc2: "LÓGICA SÓLIDA",
        title3: "∞",
        title4: "0",
        desc3: "ESCALABILIDAD",
        desc4: "CÓDIGO REQUERIDO POR VOS",
        cardTitle: "No necesitás saber programar, solo necesitás una idea.",
        li1: "Tenés una idea pero no sabés por dónde empezar.",
        li2: "Necesitás digitalizar tu negocio de forma profesional.",
        li3: "Querés vender mejor y escalar online.",
        highlight: "Nos encargamos de transformar esa necesidad en un sistema que funcione y genere resultados.",
        footer: "No construimos solo diseños bonitos, construimos productos reales. Nos enfocamos en combinar una excelente experiencia de usuario (UX) con lógica robusta y arquitectura escalable para que tu idea se convierta en una plataforma lista para crecer."
      },
      process: {
        label: "Metodología",
        title1: "Nuestro",
        title2: "Proceso",
        s1: { title: "Entendemos tu idea", desc: "Escuchamos tu visión, objetivos y los problemas que buscás resolver para alinearnos al 100%." },
        s2: { title: "Definimos estructura", desc: "Mapeamos qué hace falta y priorizamos las funcionalidades clave para garantizar el éxito." },
        s3: { title: "Diseñamos experiencia", desc: "Creamos interfaces intuitivas (UX/UI) pensadas exclusivamente para la conversión." },
        s4: { title: "Desarrollamos", desc: "Escribimos código rápido y escalable. Transformamos el diseño aprobado en un producto 100% funcional." },
        s5: { title: "Lanzamos y mejoramos", desc: "Ponemos el producto online y lo optimizamos basándonos en datos y feedback de usuarios reales." }
      },
      contact: {
        eyebrow: "Tu idea puede convertirse en un producto real.",
        title: "¿CÓMO PODEMOS AYUDARTE?",
        form: {
          types: ["Sitio Web", "Web App", "Sistema Interno", "Código Existente"],
          budgetLabel: "RANGO DE PRESUPUESTO",
          needsLabel: "NECESIDADES ESPECÍFICAS",
          budgets: {
            "Website": ["Menos de $1k", "$1k - $3k", "Más de $3k"],
            "Sitio Web": ["Menos de $1k", "$1k - $3k", "Más de $3k"],
            "Web App": ["$3k - $5k", "$5k - $10k", "Más de $10k"],
            "Internal System": ["$2k - $5k", "$5k - $10k", "Más de $10k"],
            "Sistema Interno": ["$2k - $5k", "$5k - $10k", "Más de $10k"],
            "Existing Code": ["Por Hora", "Menos de $1k", "$1k - $3k", "Más de $3k"],
            "Código Existente": ["Por Hora", "Menos de $1k", "$1k - $3k", "Más de $3k"]
          },
          needs: {
            "Website": ["Landing Page", "Sitio Institucional", "E-commerce", "Rediseño"],
            "Sitio Web": ["Landing Page", "Sitio Institucional", "E-commerce", "Rediseño"],
            "Web App": ["MVP desde cero", "SaaS Completo", "App Móvil", "Plataforma a medida"],
            "Internal System": ["Dashboard de Métricas", "Gestión Interna", "Automatización", "Integración API"],
            "Sistema Interno": ["Dashboard de Métricas", "Gestión Interna", "Automatización", "Integración API"],
            "Existing Code": ["Arreglar bugs", "Agregar features", "Optimizar rendimiento", "Migración"],
            "Código Existente": ["Arreglar bugs", "Agregar features", "Optimizar rendimiento", "Migración"]
          },
          name: "TU NOMBRE",
          email: "TU EMAIL",
          details: "DETALLES EXTRA (OPCIONAL)...",
          submit: "ENVIAR MENSAJE"
        }
      },
      footer: {
        copy: "© 2026 Studio. Todos los derechos reservados."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    }
  });

export default i18n;
