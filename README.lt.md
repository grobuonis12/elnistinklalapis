# Elnis Svetainė

Moderni, prisitaikanti svetainė, sukurta su Next.js, PayloadCMS ir TailwindCSS.

## 🚀 Funkcijos

- Sukurta su Next.js 15 ir React 19
- PayloadCMS turinio valdymui
- TailwindCSS stiliavimui
- TypeScript tipų saugumui
- SQLite duomenų bazė
- Formų kūrimo įskiepis
- SEO optimizavimas
- Tiesioginio peržiūros galimybės
- Prisitaikantis dizainas
- Docker palaikymas

## 📋 Reikalavimai

- Node.js (^18.20.2 arba >=20.9.0)
- pnpm (v10.3.0)
- Docker (neprivaloma, konteinerizuotam diegimui)

## 🛠️ Diegimas

1. Klonuokite saugyklą:
```bash
git clone [jūsų-saugyklos-url]
cd elnis
```

2. Įdiekite priklausomybes:
```bash
pnpm install
```

3. Sukonfigūruokite aplinkos kintamuosius:
```bash
cp .env.example .env
```
Redaguokite `.env` failą pagal savo konfigūraciją.

## 🚀 Kūrimas

Paleiskite kūrimo serverį:
```bash
pnpm dev
```

Programa bus pasiekiama adresu `http://localhost:3000`

## 🏗️ Gamybos Versijos Kūrimas

Sukurkite gamybos versiją:
```bash
pnpm build
```

Paleiskite gamybos serverį:
```bash
pnpm start
```

## 🐳 Docker Diegimas

Sukurkite ir paleiskite su Docker:
```bash
docker-compose up --build
```

## 📦 Galimi Skriptai

- `pnpm dev` - Paleisti kūrimo serverį
- `pnpm build` - Sukurti gamybos versiją
- `pnpm start` - Paleisti gamybos serverį
- `pnpm lint` - Paleisti ESLint
- `pnpm lint:fix` - Ištaisyti ESLint klaidas
- `pnpm reinstall` - Išvalyti ir iš naujo įdiegti priklausomybes

## 🛡️ Aplinkos Kintamieji

Sukurkite `.env` failą su šiais kintamaisiais (žr. `.env.example` pavyzdį):

```env
PAYLOAD_SECRET=jūsų-slaptas-raktas
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## 📚 Technologijų Krūva

- **Framework**: Next.js 15
- **CMS**: PayloadCMS
- **Stiliavimui**: TailwindCSS
- **Programavimo kalba**: TypeScript
- **Duomenų bazė**: SQLite
- **Paketų valdymas**: pnpm
- **UI Komponentai**: Radix UI
- **Formų valdymas**: React Hook Form
- **Animacijos**: Framer Motion
- **El. paštas**: SendGrid

## 📄 Licencija

Šis projektas licencijuotas pagal MIT Licenciją - detales žr. LICENSE faile.

## 🤝 Prisidėjimas

1. Išsišakėlykite saugyklą
2. Sukurkite savo funkcijos šakutę (`git checkout -b feature/nauja-funkcija`)
3. Įregistruokite pakeitimus (`git commit -m 'Pridėta nauja funkcija'`)
4. Išsiųskite į šakutę (`git push origin feature/nauja-funkcija`)
5. Atidarykite Pull Request

## 📞 Pagalba

Dėl pagalbos, prašome atidaryti issue saugykloje arba susisiekti su projekto prižiūrėtojais. 