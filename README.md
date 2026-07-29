# MuDream Collections — Meus Itens

Aplicação estática (HTML + JS puro) para acompanhar a coleção de sets de itens do MuDream, com status (selecionado / comprado / pronto), filtros por bônus e verificação de disponibilidade no mercado.

## Rodando localmente

Qualquer servidor estático simples funciona (é necessário servir os arquivos via HTTP, não abrir `index.html` direto do disco, pois ele usa `fetch` para carregar `items.json` e `sets.json`).

**Windows / PowerShell:**

```powershell
./server.ps1
```

Depois acesse http://localhost:5173

**Alternativa (qualquer SO, com Python):**

```bash
python3 -m http.server 5173
```

## Deploy (GitHub Pages)

Este repositório está publicado via GitHub Pages, servindo os arquivos estáticos da raiz do branch padrão.

## Checar mercado (requer userscript)

O botão **"Checar mercado"** consulta a API da MuDream (`mudream.online`) para ver quais itens têm lote anunciado. Como esse site bloqueia chamadas vindas de outras páginas (CORS + proteção anti-bot do Cloudflare), a consulta só funciona com um userscript instalado no navegador — ele usa sua sessão logada e ignora esse bloqueio.

**Como instalar:**

1. Instale a extensão [Tampermonkey](https://www.tampermonkey.net/) no seu navegador (Chrome, Firefox, Edge, etc.).
2. Abra o arquivo [`market-checker.user.js`](./market-checker.user.js) deste repositório (aba "Raw" no GitHub).
3. O Tampermonkey deve detectar automaticamente e abrir a tela de instalação do script — confirme.
4. Recarregue a página do app (https://lucaskipfer.github.io/searchitens/). Ao lado do botão "Checar mercado" deve aparecer **"Userscript ativo"**.

Sem o userscript instalado, o botão avisa que a consulta não vai funcionar em vez de tentar e falhar silenciosamente.
