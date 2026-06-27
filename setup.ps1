# setup.ps1 - Configuracion inicial del proyecto
# Ejecutar DESPUES de copiar el template

Write-Host "=== Instalando dependencias ===" -ForegroundColor Cyan
npm install

Write-Host "`n=== Skills de Diseno ===" -ForegroundColor Cyan
Write-Host "  + 55 skills preinstalados en .agents/skills/" -ForegroundColor Green
Write-Host "  + Instalando skills adicionales..." -ForegroundColor Yellow
Write-Host "  + Instalando skills de Vercel..." -ForegroundColor Yellow
npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices --agent opencode -y 2>$null
npx skills add vercel-labs/agent-skills --skill vercel-composition-patterns --agent opencode -y 2>$null
npx skills add vercel-labs/agent-skills --skill vercel-react-view-transitions --agent opencode -y 2>$null
npx skills add vercel-labs/agent-skills --skill vercel-optimize --agent opencode -y 2>$null
npx skills add vercel-labs/agent-skills --skill web-design-guidelines --agent opencode -y 2>$null

Write-Host "`n=== Setup Completado ===" -ForegroundColor Green
Write-Host ""
Write-Host "Comandos utiles:" -ForegroundColor Cyan
Write-Host "  npm run dev        - Iniciar servidor de desarrollo"
Write-Host "  npm run build      - Build para produccion"
Write-Host "  npm run test       - Ejecutar tests"
Write-Host "  npm run lint       - Lint del codigo"
Write-Host "  npm run format     - Formatear codigo"
Write-Host "  npm run typecheck  - Verificar tipos"
Write-Host "  npm run analyze    - Analizar bundle (vite-bundle-visualizer)"
Write-Host ""
Write-Host "Checklist manual:" -ForegroundColor Yellow
Write-Host "  1. Editar package.json -> name, version"
Write-Host "  2. Editar index.html -> title, meta tags, favicon"
Write-Host "  3. Configurar src/index.css -> @theme tokens"
Write-Host "  4. Copiar .env.example a .env y configurar keys"
Write-Host "  5. Si usas Playwright: npx playwright install (browsers)"
Write-Host ""
Write-Host "Toolchain unificada:" -ForegroundColor Cyan
Write-Host "  + Biome (Rust)          - Lint + Format, 35x mas rapido que ESLint+Prettier"
Write-Host "  + Playwright            - E2E testing visual (navegadores reales)"
Write-Host ""
Write-Host "Skills Vercel anadidos:" -ForegroundColor Cyan
Write-Host "  + vercel-react-best-practices      - 45 reglas de performance React"
Write-Host "  + vercel-composition-patterns      - Componentes compuestos y render props"
Write-Host "  + vercel-react-view-transitions    - View Transitions API nativas"
Write-Host "  + vercel-optimize                  - Optimizacion de bundles y CWV"
Write-Host "  + web-design-guidelines            - Estandares de diseno web"
Write-Host ""
Write-Host "Stack de animacion preinstalado:" -ForegroundColor Cyan
Write-Host "  + Lenis + SmoothScrollProvider  - Scroll suave + GSAP integration"
Write-Host "  + GSAP + ScrollTrigger + SplitText - Animaciones cinematicas"
Write-Host "  + Motion (Framer Motion)         - Animaciones React-native"
Write-Host "  + Three.js + R3F + Drei        - Elementos 3D"
Write-Host ""
Write-Host "Optimizacion de build:" -ForegroundColor Cyan
Write-Host "  + PWA (Service Worker + Manifest) - vite-plugin-pwa"
Write-Host "  + Imagenes optimizadas (WebP/AVIF) - vite-imagetools"
Write-Host "  + Compresion Brotli/Gzip          - vite-plugin-compression"
Write-Host "  + Bundle visualizer                - vite-bundle-visualizer"
Write-Host "  + Lighthouse audits                - npm run lighthouse"
Write-Host ""
Write-Host "A disenar!" -ForegroundColor Green
