/**
 * Everything LiqPay needs to know about the seller, in one file.
 *
 * LiqPay reviews a site before approving a merchant account. The requirements that
 * depend on seller-specific data all read from here:
 *
 *   R02  every service needs a short description and a price that is not zero
 *   R04  payment, delivery and refund rules must be published
 *   R10  legal name, tax id and a Ukrainian address must appear on the site
 *
 * The site presents the offer but does not take payment itself. Clients agree a
 * scope and are then invoiced through LiqPay, so nothing is signed in the browser
 * and no private key is ever deployed.
 *
 * @see https://www.liqpay.ua/uk/information/requirements
 */

export interface Localized<T = string> {
  en: T
  ua: T
}

// ─── Seller ───────────────────────────────────────────────────────────────────

export interface MerchantLegal {
  /** 'fop' = ФОП (sole trader), 'tov' = ТОВ (LLC). Decides which tax id label is shown. */
  entityType: 'fop' | 'tov'
  /** Registered name, spelled exactly as in the state register. */
  legalName: Localized
  /** РНОКПП (ФОП) or ЄДРПОУ (ТОВ). */
  taxId: string
  /** Registered address. LiqPay requires it to be on Ukraine-controlled territory. */
  address: Localized
  /** Support email. */
  email: string
  /** Support phone in international format. */
  phone: string
  /** Optional: state registration record, shown in the offer when present. */
  registration?: Localized
}

export const MERCHANT: MerchantLegal = {
  entityType: 'fop',
  legalName: {
    en: 'Individual entrepreneur Lukachyna Stepan',
    ua: 'ФОП Лукачина Степан Степанович',
  },
  taxId: '3523612979',
  address: {
    en: 'Ukraine, 88000, Zakarpattia Oblast, Uzhhorod, vul. Haharina, 101',
    ua: 'Україна, 88000, Закарпатська область, м. Ужгород, вул. Гагаріна, буд. 101',
  },
  email: 'lukachina.stepan@gmail.com',
  phone: '+38 (067) 210-60-88',
}

/** True once every placeholder above has been replaced with real data. */
export function isMerchantConfigured(): boolean {
  const values = [
    MERCHANT.legalName.en,
    MERCHANT.legalName.ua,
    MERCHANT.taxId,
    MERCHANT.address.en,
    MERCHANT.address.ua,
    MERCHANT.phone,
  ]
  return values.every(value => !value.includes('['))
}

/** Label for the tax id, which differs between a sole trader and a company. */
export const TAX_ID_LABEL: Record<MerchantLegal['entityType'], Localized> = {
  fop: { en: 'Taxpayer number (РНОКПП)', ua: 'РНОКПП' },
  tov: { en: 'Company registry code (ЄДРПОУ)', ua: 'ЄДРПОУ' },
}

// ─── Offer ────────────────────────────────────────────────────────────────────

export interface ServiceOffer {
  id: string
  /** The main service. Rendered first and given more room than the rest. */
  featured?: boolean
  name: Localized
  /** Short description. LiqPay requires one against every position in the list. */
  summary: Localized
  /** What the buyer actually receives. Doubles as the "delivery" terms in the offer. */
  includes: Localized<string[]>
  /** Delivery window. Required by R04. */
  turnaround: Localized
  /** Price in hryvnia. Must be greater than zero — LiqPay rejects a zero price. */
  price: number
  /** Unit the price is charged in, where it is not a single fixed fee. */
  priceNote?: Localized
  currency: 'UAH'
}

/**
 * What is offered has to stay inside the ФОП's registered КВЕД codes, because
 * LiqPay requires the МСС it assigns to match what is actually for sale (R05).
 *
 *   Веб-розробка                 → 62.01  Комп'ютерне програмування
 *   Аудит фронтенд-архітектури   → 62.02  Консультування з питань інформатизації
 *   Сесія code review            → 62.02 / 62.09
 *   Технічні консультації        → 62.02  Консультування з питань інформатизації
 *
 * Registered: 63.11 (primary), 62.01, 62.02, 62.03, 62.09, 63.12. The matching
 * МСС is 7372, which spans data processing, programming and IT consulting.
 *
 * Selling structured courses or training would fall under КВЕД 85.59 (Інші види
 * освіти), which is not registered — adding such a service here without
 * registering that code first is the mismatch R05 catches.
 */
export const SERVICES: ServiceOffer[] = [
  {
    id: 'development',
    featured: true,
    name: {
      en: 'Web development',
      ua: 'Веб-розробка',
    },
    summary: {
      en: 'Building and maintaining web applications — interfaces in React, Angular and TypeScript, from a single feature to a finished product. Scope, price and schedule are agreed in writing before any work starts.',
      ua: 'Створення та підтримка вебзастосунків — інтерфейси на React, Angular і TypeScript, від окремої функції до готового продукту. Обсяг, вартість і строки погоджуються письмово до початку робіт.',
    },
    includes: {
      en: [
        'Front-end development in React, Angular and TypeScript',
        'A written estimate and schedule agreed before work begins',
        'Regular progress updates during the work',
        'Handover of all source code on completion',
      ],
      ua: [
        'Фронтенд-розробка на React, Angular і TypeScript',
        'Письмова оцінка та графік, погоджені до початку робіт',
        'Регулярні звіти про прогрес під час роботи',
        'Передача всього вихідного коду після завершення',
      ],
    },
    turnaround: {
      en: 'Timeline depends on the agreed scope and is fixed in writing before work starts. Work is invoiced by the hour or in agreed stages.',
      ua: 'Строк залежить від погодженого обсягу і фіксується письмово до початку робіт. Робота оплачується погодинно або погодженими етапами.',
    },
    price: 1800,
    priceNote: {
      en: 'per hour',
      ua: 'за годину',
    },
    currency: 'UAH',
  },
  {
    id: 'architecture-review',
    name: {
      en: 'Front-end architecture review',
      ua: 'Аудит фронтенд-архітектури',
    },
    summary: {
      en: 'A written review of an existing front-end codebase: structure, state management, build setup and the decisions that will be expensive to reverse later.',
      ua: 'Письмовий аудит наявної фронтенд-кодової бази: структура, управління станом, збірка та рішення, які згодом буде дорого змінювати.',
    },
    includes: {
      en: [
        'Review of the repository and its build pipeline',
        'A written report with prioritised findings',
        'A one-hour call to walk through the report',
      ],
      ua: [
        'Аналіз репозиторію та процесу збірки',
        'Письмовий звіт із пріоритезованими висновками',
        'Годинна зустріч для розбору звіту',
      ],
    },
    turnaround: {
      en: 'Report delivered by email within 7 working days of payment.',
      ua: 'Звіт надсилається на email протягом 7 робочих днів з моменту оплати.',
    },
    price: 12000,
    currency: 'UAH',
  },
  {
    id: 'code-review',
    name: {
      en: 'Code review session',
      ua: 'Сесія code review',
    },
    summary: {
      en: 'A working session over your pull requests or a module of your choice, covering readability, testing and the patterns worth standardising across the team.',
      ua: 'Робоча сесія над вашими pull request або обраним модулем: читабельність, тестування та патерни, які варто стандартизувати в команді.',
    },
    includes: {
      en: [
        'Ninety minutes of live review over a call',
        'Written notes and follow-up recommendations',
      ],
      ua: [
        "Дев'яносто хвилин live review у форматі дзвінка",
        'Письмові нотатки та рекомендації після сесії',
      ],
    },
    turnaround: {
      en: 'Scheduled within 5 working days of payment, at a time agreed by email.',
      ua: 'Призначається протягом 5 робочих днів з моменту оплати, у погоджений електронною поштою час.',
    },
    price: 4500,
    currency: 'UAH',
  },
  {
    // Deliberately framed as advisory work on the client's own project, which
    // falls under the registered КВЕД 62.02. Structured teaching would be 85.59,
    // which is not registered — see the note above SERVICES before changing it.
    id: 'consultation',
    name: {
      en: 'Technical consultation — monthly',
      ua: 'Технічні консультації — місяць',
    },
    summary: {
      en: 'Four one-hour advisory sessions across one month on the architecture, code quality and technical decisions in your own project.',
      ua: 'Чотири годинні консультації протягом місяця щодо архітектури, якості коду та технічних рішень у вашому проєкті.',
    },
    includes: {
      en: [
        'Four one-hour advisory sessions within one calendar month',
        'Written recommendations after each session',
        'Answers to follow-up questions by email between sessions',
      ],
      ua: [
        'Чотири годинні консультації протягом одного календарного місяця',
        'Письмові рекомендації після кожної консультації',
        'Відповіді на додаткові питання електронною поштою між консультаціями',
      ],
    },
    turnaround: {
      en: 'First session scheduled within 7 working days of payment.',
      ua: 'Перша консультація призначається протягом 7 робочих днів з моменту оплати.',
    },
    price: 9000,
    currency: 'UAH',
  },
]

export const FEATURED_SERVICE = SERVICES.find(service => service.featured)!
export const ADDITIONAL_SERVICES = SERVICES.filter(service => !service.featured)

/** Date the published legal documents last changed. Bump when you edit them. */
export const LEGAL_UPDATED = '2026-09-08'
