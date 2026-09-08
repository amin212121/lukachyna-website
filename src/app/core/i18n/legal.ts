/**
 * Content of the two legal documents LiqPay requires before approving a merchant:
 * a public offer covering payment, delivery and refunds (R04), and a privacy
 * notice covering personal data and browser storage (R07).
 *
 * Seller-specific details are not repeated here — they are rendered from
 * MERCHANT in core/config/merchant.config.ts so there is one place to edit.
 */

import { Localized } from '../config/merchant.config'

export interface LegalBlock {
  heading: Localized
  body: Localized<string[]>
  bullets?: Localized<string[]>
}

// ─── Public offer ─────────────────────────────────────────────────────────────

export const TERMS_DOC: LegalBlock[] = [
  {
    heading: { en: 'General provisions', ua: 'Загальні положення' },
    body: {
      en: [
        'This document is a public offer — an official proposal by the Seller, addressed to any individual, to enter into a contract for the supply of services on the terms set out below.',
        'Paying for any service listed on this website constitutes full and unconditional acceptance of this offer. From that moment the contract between you and the Seller is considered concluded on these terms.',
        'Please read this document before paying. If you do not agree with any part of it, do not place an order.',
      ],
      ua: [
        'Цей документ є публічною офертою — офіційною пропозицією Продавця, адресованою будь-якій фізичній особі, укласти договір про надання послуг на умовах, викладених нижче.',
        'Оплата будь-якої послуги, представленої на цьому сайті, є повним і беззастережним прийняттям (акцептом) цієї оферти. З цього моменту договір між вами та Продавцем вважається укладеним на цих умовах.',
        'Будь ласка, ознайомтеся з цим документом до здійснення оплати. Якщо ви не погоджуєтеся з будь-якою його частиною — не оформлюйте замовлення.',
      ],
    },
  },
  {
    heading: { en: 'Subject of the contract', ua: 'Предмет договору' },
    body: {
      en: [
        'The Seller provides web development services — building and maintaining web applications — together with related services available on request: code and architecture review, and mentoring.',
        'The full list of services, with a description and the current price of each, is published on the Services page of this website. That page is an integral part of this offer.',
        'No physical goods are sold. All services are provided remotely.',
      ],
      ua: [
        'Продавець надає послуги з веброзробки — створення та підтримка вебзастосунків, — а також супутні послуги за запитом: аудит коду та архітектури і менторство.',
        'Повний перелік послуг з описом та актуальною ціною кожної опубліковано на сторінці «Послуги» цього сайту. Ця сторінка є невід’ємною частиною цієї оферти.',
        'Фізичні товари не реалізуються. Усі послуги надаються дистанційно.',
      ],
    },
  },
  {
    heading: { en: 'Price and payment', ua: 'Вартість та порядок оплати' },
    body: {
      en: [
        'All prices are shown in Ukrainian hryvnia (UAH) on the Services page and include all applicable taxes. Development work is charged at the hourly rate shown there; the remaining services are charged at the fixed price shown against each of them.',
        'The scope of work and the total amount are agreed in writing before work begins. The Seller then issues an invoice for the agreed amount — the website itself does not take payment.',
        'The invoice is paid by Visa or Mastercard through LiqPay, the payment service of JSC CB PrivatBank.',
        'Card details are entered on LiqPay’s own secure payment page. The Seller does not receive, process or store your card number, expiry date or CVV at any point.',
        'Fixed-price services are supplied on the basis of full prepayment. Development work is invoiced by the hour, or in the stages agreed in writing. The contract is concluded at the moment funds are credited to the Seller’s account.',
        'Your bank may apply its own fees or exchange rates. Those are a matter between you and your bank.',
      ],
      ua: [
        'Усі ціни зазначені у гривні (UAH) на сторінці «Послуги» та включають усі застосовні податки. Роботи з розробки оплачуються за погодинною ставкою, зазначеною там; решта послуг — за фіксованою ціною, вказаною біля кожної з них.',
        'Обсяг робіт і загальна сума погоджуються письмово до початку робіт. Після цього Продавець виставляє рахунок на погоджену суму — сам сайт оплату не приймає.',
        'Рахунок сплачується карткою Visa або Mastercard через сервіс LiqPay АТ КБ «ПриватБанк».',
        'Дані картки вводяться на захищеній платіжній сторінці LiqPay. Продавець у жодний момент не отримує, не обробляє та не зберігає номер вашої картки, строк її дії чи CVV.',
        'Послуги з фіксованою ціною надаються на умовах повної попередньої оплати. Роботи з розробки оплачуються погодинно або погодженими письмово етапами. Договір вважається укладеним у момент зарахування коштів на рахунок Продавця.',
        'Ваш банк може застосовувати власні комісії або курси. Це питання регулюється між вами та вашим банком.',
      ],
    },
  },
  {
    heading: { en: 'How services are delivered', ua: 'Порядок надання послуг' },
    body: {
      en: [
        'All services are delivered remotely, by email and by video call. Nothing is shipped, so no delivery address or delivery charge applies.',
        'The delivery window for each service is stated against that service on the Services page and starts from the moment payment is received.',
        'To receive a service you need to provide a working email address and, where the service requires it, access to the code or materials to be reviewed. If those are not provided, the delivery window starts from the day they are.',
        'A service is considered delivered when the report has been sent, or the agreed session has taken place, as described for that service.',
      ],
      ua: [
        'Усі послуги надаються дистанційно — електронною поштою та у форматі відеозустрічі. Фізична доставка не здійснюється, тому адреса доставки та її вартість не застосовуються.',
        'Строк надання кожної послуги вказано поруч із нею на сторінці «Послуги» і відлік починається з моменту отримання оплати.',
        'Для отримання послуги вам потрібно надати робочу електронну адресу та, якщо цього вимагає послуга, доступ до коду чи матеріалів для аналізу. Якщо їх не надано, строк починає відлік з дня їх надання.',
        'Послуга вважається наданою після надсилання звіту або проведення погодженої зустрічі — відповідно до опису конкретної послуги.',
      ],
    },
  },
  {
    heading: { en: 'Refunds', ua: 'Повернення коштів' },
    body: {
      en: [
        'You may cancel an order and request a refund by writing to the email address in the Seller details below. Please include the date of payment and the name of the service.',
        'The amount refunded depends on how far the work has progressed:',
      ],
      ua: [
        'Ви можете скасувати замовлення та вимагати повернення коштів, написавши на електронну адресу, вказану в реквізитах Продавця нижче. Будь ласка, зазначте дату оплати та назву послуги.',
        'Сума повернення залежить від того, наскільки просунулася робота:',
      ],
    },
    bullets: {
      en: [
        'Before work has started — the full amount is refunded.',
        'After work has started but before the service is delivered — the amount is refunded less the part already performed, calculated proportionally.',
        'After the service has been delivered in full — the payment is not refundable, as the service has been performed.',
        'If the Seller is unable to deliver the service for any reason — the full amount is refunded regardless of timing.',
      ],
      ua: [
        'До початку робіт — повертається повна сума.',
        'Після початку робіт, але до надання послуги — повертається сума за вирахуванням уже виконаної частини, розрахованої пропорційно.',
        'Після надання послуги в повному обсязі — кошти не повертаються, оскільки послугу вже виконано.',
        'Якщо Продавець з будь-якої причини не може надати послугу — повертається повна сума незалежно від строків.',
      ],
    },
  },
  {
    heading: { en: 'How a refund is processed', ua: 'Як обробляється повернення' },
    body: {
      en: [
        'A refund request is reviewed within 5 working days of receipt, and you will receive a written answer by email.',
        'Approved refunds are returned to the same bank card that was used for payment. The Seller cannot return funds to a different card or by another method.',
        'Funds are transferred within 10 banking days of the decision. How quickly they appear on your statement after that depends on your bank.',
      ],
      ua: [
        'Заява про повернення розглядається протягом 5 робочих днів з моменту отримання, і ви отримуєте письмову відповідь на електронну пошту.',
        'Погоджені повернення здійснюються на ту саму банківську картку, з якої була проведена оплата. Продавець не може повернути кошти на іншу картку або в інший спосіб.',
        'Кошти перераховуються протягом 10 банківських днів з дати рішення. Строк їх фактичного зарахування після цього залежить від вашого банку.',
      ],
    },
  },
  {
    heading: { en: 'Rights and obligations', ua: 'Права та обов’язки сторін' },
    body: {
      en: [
        'The Seller undertakes to provide the service in the scope and within the time stated for it, and to keep any materials you share confidential.',
        'The Buyer undertakes to provide accurate contact details and the access or materials the service requires, and to pay the price shown.',
        'The Seller may refuse an order and refund the payment in full where the work falls outside the scope described, or where the materials required are not provided.',
      ],
      ua: [
        'Продавець зобов’язується надати послугу в обсязі та в строк, зазначені для неї, а також зберігати конфіденційність наданих вами матеріалів.',
        'Покупець зобов’язується надати достовірні контактні дані та доступи чи матеріали, необхідні для послуги, а також оплатити зазначену вартість.',
        'Продавець має право відмовити в замовленні та повернути оплату в повному обсязі, якщо робота виходить за межі описаного обсягу або якщо необхідні матеріали не надано.',
      ],
    },
  },
  {
    heading: { en: 'Liability', ua: 'Відповідальність' },
    body: {
      en: [
        'The services are advisory. Decisions taken on the basis of a review or consultation, and their consequences, remain with the Buyer.',
        'The Seller’s liability under this contract is limited to the amount actually paid for the service concerned.',
        'Neither party is liable for a failure to perform caused by circumstances beyond its reasonable control.',
      ],
      ua: [
        'Послуги мають рекомендаційний характер. Рішення, ухвалені на підставі аудиту чи консультації, та їхні наслідки залишаються за Покупцем.',
        'Відповідальність Продавця за цим договором обмежується сумою, фактично сплаченою за відповідну послугу.',
        'Жодна зі сторін не несе відповідальності за невиконання, спричинене обставинами поза її розумним контролем.',
      ],
    },
  },
  {
    heading: { en: 'Disputes and governing law', ua: 'Вирішення спорів та застосовне право' },
    body: {
      en: [
        'This contract is governed by the law of Ukraine.',
        'Any dispute is first addressed through direct negotiation. Write to the email in the Seller details below and you will receive an answer within 10 working days.',
        'Disputes that cannot be settled that way are resolved by the courts of Ukraine in accordance with Ukrainian law.',
      ],
      ua: [
        'Цей договір регулюється законодавством України.',
        'Будь-який спір спершу вирішується шляхом прямих переговорів. Напишіть на електронну адресу, вказану в реквізитах Продавця нижче, і ви отримаєте відповідь протягом 10 робочих днів.',
        'Спори, які не вдалося врегулювати таким чином, вирішуються судами України відповідно до законодавства України.',
      ],
    },
  },
  {
    heading: { en: 'Validity of this offer', ua: 'Строк дії оферти' },
    body: {
      en: [
        'This offer is valid from the date of publication until it is withdrawn or replaced by the Seller.',
        'The Seller may amend this document. The current version is always the one published on this page, and the date it last changed is shown at the top. Changes do not affect orders already paid for.',
      ],
      ua: [
        'Ця оферта діє з дати публікації до моменту її відкликання або заміни Продавцем.',
        'Продавець може вносити зміни до цього документа. Чинною завжди є версія, опублікована на цій сторінці, а дата останньої зміни вказана вгорі. Зміни не поширюються на вже оплачені замовлення.',
      ],
    },
  },
]

// ─── Privacy notice ───────────────────────────────────────────────────────────

export const PRIVACY_DOC: LegalBlock[] = [
  {
    heading: { en: 'What this covers', ua: 'Що охоплює цей документ' },
    body: {
      en: [
        'This notice explains what personal data this website collects, why, who else can see it, and what you can ask for. It applies to lukachyna.com and to the services ordered through it.',
        'The controller of this data is the Seller identified at the end of this page.',
      ],
      ua: [
        'Цей документ пояснює, які персональні дані збирає цей сайт, з якою метою, хто ще має до них доступ і що ви можете вимагати. Він стосується сайту lukachyna.com та послуг, замовлених через нього.',
        'Володільцем цих даних є Продавець, зазначений у кінці цієї сторінки.',
      ],
    },
  },
  {
    heading: { en: 'What is collected', ua: 'Які дані збираються' },
    body: {
      en: ['Three separate things, and it is worth keeping them apart:'],
      ua: ['Три різні речі, які варто розрізняти:'],
    },
    bullets: {
      en: [
        'What you send us. Your email address and anything you choose to include when you write or place an order — a name, a company, materials for review.',
        'What your browser keeps. Two preferences are stored on your own device: the colour theme you picked and the interface language. They stay in your browser, are never transmitted to us, and can be cleared at any time through your browser settings.',
        'What your payment goes through. Card details are entered on LiqPay’s payment page, not on this site. This site never receives, sees or stores a card number, expiry date or CVV.',
      ],
      ua: [
        'Те, що ви надсилаєте нам. Ваша електронна адреса та все, що ви вирішите вказати під час звернення чи замовлення — ім’я, компанія, матеріали для аналізу.',
        'Те, що зберігає ваш браузер. Дві налаштування зберігаються на вашому пристрої: обрана колірна тема та мова інтерфейсу. Вони залишаються у вашому браузері, ніколи не передаються нам і можуть бути видалені будь-коли в налаштуваннях браузера.',
        'Те, через що проходить ваша оплата. Дані картки вводяться на платіжній сторінці LiqPay, а не на цьому сайті. Цей сайт ніколи не отримує, не бачить і не зберігає номер картки, строк дії чи CVV.',
      ],
    },
  },
  {
    heading: { en: 'No tracking', ua: 'Відсутність відстеження' },
    body: {
      en: [
        'This website runs no analytics, no advertising pixels and no third-party trackers. It sets no cookies for those purposes — the only data kept in your browser is the two preferences described above.',
        'If that changes, this page will be updated before the change goes live.',
      ],
      ua: [
        'Цей сайт не використовує аналітику, рекламні пікселі чи сторонні трекери. Він не встановлює cookies для таких цілей — єдині дані, що зберігаються у вашому браузері, це два налаштування, описані вище.',
        'Якщо це зміниться, цю сторінку буде оновлено до того, як зміна набуде чинності.',
      ],
    },
  },
  {
    heading: { en: 'Why it is processed', ua: 'Мета обробки' },
    body: {
      en: ['Personal data is used only for the purposes below, and for nothing else:'],
      ua: ['Персональні дані використовуються виключно з наведеною нижче метою і ні для чого іншого:'],
    },
    bullets: {
      en: [
        'To answer your enquiry and agree the scope of work.',
        'To perform the contract — to deliver the service you paid for.',
        'To process a payment or a refund through the payment provider.',
        'To meet accounting and tax obligations under Ukrainian law.',
      ],
      ua: [
        'Щоб відповісти на ваше звернення та погодити обсяг робіт.',
        'Щоб виконати договір — надати послугу, яку ви оплатили.',
        'Щоб провести оплату або повернення коштів через платіжного провайдера.',
        'Щоб виконати вимоги бухгалтерського та податкового законодавства України.',
      ],
    },
  },
  {
    heading: { en: 'Legal basis', ua: 'Правова підстава' },
    body: {
      en: [
        'Processing is based on your consent, given when you contact the Seller or place an order, and on the necessity of performing the contract you entered into, in accordance with the Law of Ukraine “On Personal Data Protection”.',
        'Where data is retained for accounting purposes, the basis is the Seller’s legal obligation.',
      ],
      ua: [
        'Обробка здійснюється на підставі вашої згоди, наданої при зверненні до Продавця чи оформленні замовлення, та на підставі необхідності виконання укладеного договору — відповідно до Закону України «Про захист персональних даних».',
        'Якщо дані зберігаються для цілей бухгалтерського обліку, підставою є юридичний обов’язок Продавця.',
      ],
    },
  },
  {
    heading: { en: 'Who else sees it', ua: 'Хто ще має доступ' },
    body: {
      en: ['Personal data is not sold, rented or traded. It is shared only with:'],
      ua: ['Персональні дані не продаються, не здаються в оренду і не передаються третім особам для їхніх цілей. Доступ надається лише:'],
    },
    bullets: {
      en: [
        'LiqPay (JSC CB PrivatBank) — the payment provider, which processes your payment under its own terms and privacy policy.',
        'The hosting provider that serves this website, which keeps standard server logs.',
        'State authorities, where disclosure is required by Ukrainian law.',
      ],
      ua: [
        'LiqPay (АТ КБ «ПриватБанк») — платіжному провайдеру, який обробляє вашу оплату на власних умовах та згідно з власною політикою конфіденційності.',
        'Хостинг-провайдеру, який обслуговує цей сайт і веде стандартні журнали сервера.',
        'Державним органам — у випадках, коли розкриття вимагається законодавством України.',
      ],
    },
  },
  {
    heading: { en: 'How long it is kept', ua: 'Строк зберігання' },
    body: {
      en: [
        'Correspondence and order records are kept for as long as needed to deliver the service and to handle any refund or dispute, and after that for the period required by accounting and tax law.',
        'Preferences stored in your browser stay there until you clear your browser data. They are not held by the Seller at all.',
      ],
      ua: [
        'Листування та записи про замовлення зберігаються стільки, скільки необхідно для надання послуги та розгляду можливого повернення чи спору, а після цього — протягом строку, встановленого бухгалтерським та податковим законодавством.',
        'Налаштування, збережені у вашому браузері, залишаються там до моменту очищення даних браузера. Продавець їх взагалі не зберігає.',
      ],
    },
  },
  {
    heading: { en: 'Your rights', ua: 'Ваші права' },
    body: {
      en: ['Under the Law of Ukraine “On Personal Data Protection” you may, at any time:'],
      ua: ['Відповідно до Закону України «Про захист персональних даних» ви будь-коли можете:'],
    },
    bullets: {
      en: [
        'Ask what data about you is held and receive a copy of it.',
        'Have inaccurate data corrected.',
        'Ask for your data to be deleted, where no legal obligation requires it to be kept.',
        'Withdraw your consent to processing.',
        'Complain to the Ukrainian Parliament Commissioner for Human Rights.',
      ],
      ua: [
        'Дізнатися, які дані про вас зберігаються, та отримати їх копію.',
        'Вимагати виправлення неточних даних.',
        'Вимагати видалення ваших даних, якщо жоден юридичний обов’язок не вимагає їх зберігання.',
        'Відкликати згоду на обробку.',
        'Звернутися зі скаргою до Уповноваженого Верховної Ради України з прав людини.',
      ],
    },
  },
  {
    heading: { en: 'Changes to this notice', ua: 'Зміни до цього документа' },
    body: {
      en: [
        'The current version of this notice is always the one published on this page, and the date it last changed is shown at the top.',
        'To exercise any of the rights above, or to ask a question about how your data is handled, write to the email address in the Seller details below.',
      ],
      ua: [
        'Чинною завжди є версія цього документа, опублікована на цій сторінці, а дата останньої зміни вказана вгорі.',
        'Щоб скористатися будь-яким із наведених прав або поставити запитання щодо обробки ваших даних, напишіть на електронну адресу, вказану в реквізитах Продавця нижче.',
      ],
    },
  },
]
