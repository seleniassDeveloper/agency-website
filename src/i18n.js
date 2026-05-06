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
        eyebrow: "Digital Consulting & Development",
        title1: "DIGITAL",
        title2: "PRODUCTS",
        desc: "<strong>We transform ideas into websites, apps, and systems ready to grow.</strong><br/>We develop web and mobile solutions for entrepreneurs and businesses that need to launch, organize, or scale their digital presence.",
        cta: "I want to create my project"
      },
      work: {
        label: "What we build",
        title: "Digital Solutions",
        p1: { name: "Landing Pages", desc: "Convert visitors into loyal customers with high-performance pages designed for maximum ROI and rapid growth.", tags: ["Conversion Focused", "Fast Launch", "Premium Design"], stats: ["+40%", "Conversion", "24h", "Delivery"] },
        p2: { name: "Websites", desc: "Elevate your brand with a stunning digital presence that builds trust and dominates your market niche.", tags: ["Corporate Identity", "SEO Optimized", "Ultra Fast"], stats: ["100/100", "Lighthouse", "10x", "More Speed"] },
        p3: { name: "Web Apps", desc: "Transform your logic into a scalable SaaS. Powerful platforms designed to engage users and streamline complex workflows.", tags: ["SaaS Scaling", "Cloud Native", "Top UX"], stats: ["99.9%", "Uptime", "∞", "Scalability"] },
        p4: { name: "Internal Systems", desc: "Automate your operations and save thousands of hours. Custom tools that turn your data into competitive advantages.", tags: ["Efficiency First", "Process Automation", "ROI Driven"], stats: ["-60%", "Op. Costs", "+200%", "Productivity"] }
      },
      about: {
        label: "Value",
        marquee: " DIGITAL TRANSFORMATION — STRATEGY — ENGINEERING —",
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
      },
      estimator: {
        label: "Project Builder",
        title: "DEFINE THE SCOPE OF YOUR VISION",
        steps: {
          type: {
            title: "What type of project is it?",
            options: {
              landing: "Landing Page",
              website: "Corporate Website",
              webapp: "Web Application / SaaS",
              custom: "Custom System"
            }
          },
          features: {
            title: "What features do you need?",
            options: {
              auth: "Users & Auth",
              payments: "Online Payments",
              cms: "Admin Panel / CMS",
              motion: "Advanced 3D / Motion",
              api: "API Integrations"
            }
          },
          timeline: {
            title: "What is your timeline?",
            options: {
              fast: "As soon as possible",
              standard: "Standard (1-2 months)",
              relaxed: "No rush (3+ months)"
            }
          },
          contact: {
            title: "Where should we send the estimate?",
            placeholderName: "Your Name",
            placeholderEmail: "Your Email",
            submit: "Get Estimate"
          },
          modality: {
            title: "How do you prefer to work?",
            options: {
              hourly: "By Hour",
              project: "Fixed Project"
            },
            hourlyFields: {
              label: "Approximate hours per week",
              placeholder: "e.g. 20"
            },
            projectFields: {
              label: "Estimated duration",
              placeholder: "e.g. 2 months"
            }
          }
        },
        result: {
          title: "Estimate & Consultation",
          complexity: "Complexity Level",
          time: "Estimated Time",
          modality: "Billing Modality",
          cta: "Send Project Details",
          disclaimer: "We'll review your estimate and contact you shortly to refine the details."
        }
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
        eyebrow: "Consultoría y Desarrollo Digital",
        title1: "PRODUCTOS",
        title2: "DIGITALES",
        desc: "<strong>Transformamos ideas en páginas, apps y sistemas listos para crecer.</strong><br/>Desarrollamos soluciones web y mobile para emprendedores y negocios que necesitan lanzar, ordenar o escalar su presencia digital.",
        cta: "Quiero crear mi proyecto"
      },
      work: {
        label: "Qué construimos",
        title: "Soluciones Digitales",
        p1: { name: "Landing Pages", desc: "Convierte visitantes en clientes leales con páginas de alto rendimiento diseñadas para el máximo ROI y crecimiento rápido.", tags: ["Foco en Conversión", "Lanzamiento Rápido", "Diseño Premium"], stats: ["+40%", "Conversión", "24h", "Entrega"] },
        p2: { name: "Sitios Web", desc: "Eleva tu marca con una presencia digital impactante que genera confianza y domina tu nicho de mercado.", tags: ["Identidad Corporativa", "Optimizado para SEO", "Ultra Rápido"], stats: ["100/100", "Lighthouse", "10x", "Más Velocidad"] },
        p3: { name: "Web Apps", desc: "Transforma tu lógica en un SaaS escalable. Plataformas potentes diseñadas para fidelizar usuarios y optimizar flujos complejos.", tags: ["Escalabilidad SaaS", "Cloud Native", "UX Superior"], stats: ["99.9%", "Uptime", "∞", "Escalabilidad"] },
        p4: { name: "Sistemas Internos", desc: "Automatiza tus operaciones y ahorra miles de horas. Herramientas a medida que convierten tus datos en ventajas competitivas.", tags: ["Eficiencia Primero", "Automatización", "Basado en ROI"], stats: ["-60%", "Costos Op.", "+200%", "Productividad"] }
      },
      about: {
        label: "Valor",
        marquee: " TRANSFORMACIÓN DIGITAL — ESTRATEGIA — INGENIERÍA —",
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
      },
      estimator: {
        label: "Planificador de Proyectos",
        title: "DEFINE EL ALCANCE DE TU VISIÓN",
        steps: {
          type: {
            title: "¿Qué tipo de proyecto es?",
            options: {
              landing: "Landing Page",
              website: "Sitio Institucional",
              webapp: "Aplicación Web / SaaS",
              custom: "Sistema a Medida"
            }
          },
          features: {
            title: "¿Qué funcionalidades necesitás?",
            options: {
              auth: "Usuarios y Login",
              payments: "Pagos Online",
              cms: "Panel de Admin / CMS",
              motion: "3D / Motion Avanzado",
              api: "Integraciones API"
            }
          },
          timeline: {
            title: "¿Cuál es tu prioridad de tiempo?",
            options: {
              fast: "Lo antes posible",
              standard: "Estándar (1-2 meses)",
              relaxed: "Sin prisa (3+ meses)"
            }
          },
          contact: {
            title: "¿A dónde enviamos el presupuesto?",
            placeholderName: "Tu Nombre",
            placeholderEmail: "Tu Email",
            submit: "Obtener Estimación"
          },
          modality: {
            title: "¿Cómo preferís trabajar?",
            options: {
              hourly: "Por Hora",
              project: "Proyecto Cerrado"
            },
            hourlyFields: {
              label: "Horas aproximadas por semana",
              placeholder: "ej. 20"
            },
            projectFields: {
              label: "Duración estimada",
              placeholder: "ej. 2 meses"
            }
          }
        },
        result: {
          title: "Estimación y Consulta",
          complexity: "Nivel de Complejidad",
          time: "Tiempo Estimado",
          modality: "Modalidad",
          cta: "Enviar detalles del proyecto",
          disclaimer: "Revisaremos tu estimación y nos pondremos en contacto pronto para definir los detalles."
        }
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
