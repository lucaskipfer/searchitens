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
