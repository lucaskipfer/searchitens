// ==UserScript==
// @name         MuDream Collections - Verificador de Mercado
// @namespace    https://github.com/lucaskipfer/searchitens
// @version      1.0.0
// @description  Permite que a página MuDream Collections consulte o mercado da MuDream contornando o bloqueio de CORS/anti-bot, usando a sessão logada do seu navegador.
// @author       lucaskipfer
// @match        https://lucaskipfer.github.io/searchitens/*
// @match        http://localhost:*/*
// @match        http://127.0.0.1:*/*
// @grant        GM_xmlhttpRequest
// @connect      mudream.online
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const MARKET_ENDPOINT = "https://mudream.online/api/graphql";
  const MARKET_QUERY = `
    query GET_ALL_LOTS(
      $offset: NonNegativeInt,
      $limit: NonNegativeInt,
      $sort: LotsSortInput,
      $filter: LotsFilterInput
    ) {
      lots(
        limit: $limit,
        offset: $offset,
        sort: $sort,
        filter: $filter
      ) {
        Lots {
          id
        }
        Pagination {
          total
        }
      }
    }
  `;

  unsafeWindow.__gmMarketCheck = function (setName, parte) {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({
        operationName: "GET_ALL_LOTS",
        query: MARKET_QUERY,
        variables: {
          filter: {
            name: setName.toLowerCase(),
            type: [parte.toLowerCase()]
          },
          limit: 1,
          offset: 0
        }
      });

      GM_xmlhttpRequest({
        method: "POST",
        url: MARKET_ENDPOINT,
        headers: { "Content-Type": "application/json" },
        data: body,
        onload: function (response) {
          if (response.status < 200 || response.status >= 300) {
            reject(new Error(
              "HTTP " + response.status + " (" + (response.statusText || "sem status text") + ") — " +
              String(response.responseText || "").slice(0, 200)
            ));
            return;
          }
          try {
            const data = JSON.parse(response.responseText);
            const total = data && data.data && data.data.lots && data.data.lots.Pagination
              ? data.data.lots.Pagination.total
              : (data && data.data && data.data.lots && data.data.lots.Lots ? data.data.lots.Lots.length : 0);
            resolve((total || 0) > 0);
          } catch (e) {
            reject(new Error(
              "Resposta não é JSON válido (provável bloqueio Cloudflare): " +
              String(response.responseText || "").slice(0, 200)
            ));
          }
        },
        onerror: function (response) {
          reject(new Error(
            "GM_xmlhttpRequest falhou: " +
            (response && response.error ? response.error : "erro de rede/CORS na extensão") +
            (response && response.status ? (" (HTTP " + response.status + ")") : "")
          ));
        },
        ontimeout: function () {
          reject(new Error("GM_xmlhttpRequest: tempo esgotado"));
        }
      });
    });
  };
})();
