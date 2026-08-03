# MuDream Collections — Meus Itens

Aplicação estática (HTML + JS puro) para acompanhar a coleção de sets de itens do MuDream, com status (selecionado / comprado / pronto), filtros por bônus e classificação de raridade/esforço de cada item.

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

## Classificação de Itens

Cada item mostra duas notas em estrelas (⭐), independentes entre si:

- **Obtenção** — raridade do item, baseada só na quantidade de opções excellent (excluindo "Luck", que não conta para essa nota): 1 opção = ⭐, 2 = ⭐⭐⭐, 3 ou mais = ⭐⭐⭐⭐⭐.
- **Preparação** — esforço para finalizar o item já obtido, baseado em Level (+0~+9 = 1pt, +10 = 2pt, +11 = 3pt) e Add Life (+0~+2 = 0pt, +3 = 2pt, +4 = 4pt, +5 = 6pt, +6 = 8pt, +7 = 10pt), convertido em estrelas: 1–3pt = ⭐, 4–6pt = ⭐⭐, 7–8pt = ⭐⭐⭐, 9–11pt = ⭐⭐⭐⭐, 12–13pt = ⭐⭐⭐⭐⭐.
