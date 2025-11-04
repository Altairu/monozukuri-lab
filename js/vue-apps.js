// Vue導入用スクリプト
// 目的: 既存サイトを壊さずに段階的にVue3コンポーネントを導入するための中央スクリプト。
// 方針:
// - CDN(unpkg)のVueを動的に読み込み
// - Composition APIを使って小さなコンポーネントを定義
// - 既存のグローバルなJSと共存するよう設計（破壊的変更は行わない）
// - 各アプリは特定のマウント要素にだけ影響する

// Use an IIFE to avoid polluting global scope
(function() {
  // 動的にVueを読み込む関数
  function loadVue() {
    return new Promise((resolve, reject) => {
      if (window.Vue) {
        // 既に存在する場合はそれを使う
        return resolve(window.Vue);
      }
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/vue@3/dist/vue.global.prod.js';
      script.defer = true;
      script.onload = () => {
        resolve(window.Vue);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // 小さなユーティリティ: 要素が存在したら実行
  function mountIfExists(selector, mountFn) {
    const el = document.querySelector(selector);
    if (!el) return null;
    try {
      return mountFn(el);
    } catch (e) {
      console.error('Vue mount error for', selector, e);
      return null;
    }
  }

  // メイン：Vueを読み込んでアプリを初期化
  loadVue().then((Vue) => {
    const { createApp, ref, computed, onMounted } = Vue;

    // 1) ヒーロー用の小さなコンポーネント（index.html用）
    mountIfExists('#hero-vue', (el) => {
      // 既存HTMLを壊さないために、必要箇所だけを制御
      const App = {
        setup() {
          const count = ref(0);
          function increment() { count.value += 1; }
          return { count, increment };
        },
        template: `\
          <div class="text-center">\
            <!-- 既存のテキストはそのまま。Vueは追加ボタンのみ制御 -->\
            <div class=\"mt-4\">\
              <button @click=\"increment()\" class=\"bg-yellow-300 text-black px-4 py-2 rounded-lg\">いいね ({{ count }})</button>\
            </div>\
          </div>\
        `
      };
      // mount returns app instance; we don't overwrite global variables
      createApp(App).mount(el);
    });

    // 2) 活動ページのイベントリスト用（activities.html）
    mountIfExists('#events-vue', (el) => {
      const App = {
        setup() {
          // 既存のDOMからデータを読み取り、Vueが支配しないよう最小限に留める
          const items = ref([]);
          onMounted(() => {
            // 既にDOMにあるイベントカードを走査して、タイトルと説明を取得（非破壊）
            const anchors = document.querySelectorAll('#events-vue .event-source');
            anchors.forEach(a => {
              const title = a.querySelector('h3') ? a.querySelector('h3').innerText.trim() : a.innerText.trim();
              const summary = a.querySelector('ul') ? a.querySelector('ul').innerText.replace(/\n\s*/g, ' ') : '';
              items.value.push({ title, summary, href: a.getAttribute('href') });
            });
          });
          return { items };
        },
        template: `\
          <div>\
            <h4 class=\"font-semibold mb-2\">イベント（Vueで補助表示）</h4>\
            <ul class=\"list-disc list-inside\">\
              <li v-for=\"(it, idx) in items\" :key=\"idx\">\
                <a :href=\"it.href\" class=\"text-blue-600 underline\">{{ it.title }}</a> — <span class=\"text-sm text-gray-700\">{{ it.summary }}</span>\
              </li>\
            </ul>\
          </div>\
        `
      };
      createApp(App).mount(el);
    });

    // 3) イベント詳細ページの審査結果（events/3dcontest2025.html）
    mountIfExists('#results-vue', (el) => {
      const App = {
        setup() {
          // 初期値はサーバや既存DOMからの取り込みが可能。ここでは静的な受賞者データを扱う。
          const winners = ref([{
            rank: '最優秀賞',
            name: '山城さん',
            department: '造形部門',
            work: '原神：ヨォーヨの神の目',
            note: '造形部門 優秀賞兼任'
          },{
            rank: '優秀賞',
            name: '斉藤さん',
            department: '動くおもちゃ部門',
            work: '脱進機キーホルダー'
          },{
            rank: '優秀賞',
            name: '山城さん',
            department: 'IoT部門',
            work: '部室をスマートロックに'
          }]);

          const filter = ref('');
          const filtered = computed(() => {
            if (!filter.value) return winners.value;
            return winners.value.filter(w => (w.name + w.department + w.work).indexOf(filter.value) !== -1);
          });
          return { winners, filter, filtered };
        },
        template: `\
          <div class=\"space-y-4\">\
            <div class=\"flex gap-2 items-center\">\
              <input v-model=\"filter\" placeholder=\"検索（名前・部門・作品）\" class=\"border px-2 py-1 rounded\" />\
              <small class=\"text-gray-500\">（既存の見出しを壊さず補助的に表示）</small>\
            </div>\
            <ul class=\"divide-y\">\
              <li v-for=\"(w, i) in filtered\" :key=\"i\" class=\"py-3\">\
                <div class=\"font-semibold\">{{ w.rank }} — {{ w.name }}</div>\
                <div class=\"text-sm text-gray-700\">{{ w.department }}：{{ w.work }}</div>\
                <div v-if=\"w.note\" class=\"text-xs text-gray-500\">{{ w.note }}</div>\
              </li>\
            </ul>\
          </div>\
        `
      };
      createApp(App).mount(el);
    });

    // ロード完了のログ（デバッグ用）。本番では削除してもOK
    console.log('Vue apps initialized (non-destructive integration)');
  }).catch(err => {
    console.warn('Vue could not be loaded:', err);
  });
})();
