const html = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#101419">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="K-Bite">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/icon.svg">
  <title>K-Bite Guide</title>
  <style>
    :root {
      color-scheme: dark;
      --bg: #17120d;
      --panel: #241a13;
      --panel-2: #34261b;
      --text: #fff7ea;
      --muted: #d8c3a5;
      --line: rgba(255,255,255,.12);
      --primary: #f4d06f;
      --primary-text: #20150a;
      --accent: #194d47;
      --jade: #9fbda8;
      --dancheong-red: #b94a36;
      --ink: #111416;
      --radius: 22px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 18% 6%, rgba(244, 208, 111, .18), transparent 28%),
        radial-gradient(circle at 92% 4%, rgba(159, 189, 168, .22), transparent 30%),
        linear-gradient(180deg, #0e0d0b, var(--bg));
      color: var(--text);
    }
    button, input, select {
      font: inherit;
    }
    .app {
      width: min(100%, 430px);
      min-height: 100dvh;
      margin: 0 auto;
      padding: max(14px, env(safe-area-inset-top)) 16px max(18px, env(safe-area-inset-bottom));
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 750;
      letter-spacing: .01em;
    }
    .mark, .food-img, .action-icon {
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      background: linear-gradient(145deg, #273441, #17202a);
    }
    .mark {
      width: 38px;
      height: 38px;
      border-radius: 12px;
    }
    select {
      max-width: 132px;
      color: var(--text);
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 9px 10px;
    }
    .screen {
      flex: 1;
      display: none;
      flex-direction: column;
      gap: 16px;
      animation: in .18s ease-out;
    }
    .screen.active { display: flex; }
    @keyframes in { from { opacity: .35; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    .home {
      justify-content: start;
      padding-top: 12px;
      padding-bottom: 20px;
    }
    h1, h2, h3, p { margin: 0; }
    h1 {
      font-size: 42px;
      line-height: 1.02;
      letter-spacing: 0;
    }
    h2 {
      font-size: 23px;
      line-height: 1.18;
      letter-spacing: 0;
    }
    h3 {
      font-size: 18px;
      line-height: 1.22;
      letter-spacing: 0;
    }
    .muted {
      color: var(--muted);
      line-height: 1.5;
    }
    .home-copy {
      margin-top: 10px;
      max-width: 320px;
    }
    .hero-card {
      position: relative;
      min-height: 255px;
      border-radius: 30px;
      border: 1px solid rgba(255,255,255,.16);
      overflow: hidden;
      background:
        linear-gradient(135deg, rgba(185,74,54,.92), rgba(27,82,75,.96)),
        var(--panel);
      padding: 18px;
      display: grid;
      align-content: end;
      box-shadow: 0 18px 48px rgba(0,0,0,.3);
    }
    .hero-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 18% 22%, rgba(244,208,111,.45) 0 7px, transparent 8px),
        radial-gradient(circle at 82% 18%, rgba(255,247,234,.32) 0 5px, transparent 6px),
        repeating-linear-gradient(135deg, rgba(255,247,234,.12) 0 2px, transparent 2px 18px);
      opacity: .9;
    }
    .moon-jar {
      position: absolute;
      right: -14px;
      top: 26px;
      width: 126px;
      height: 126px;
      border-radius: 46% 52% 50% 48%;
      background: radial-gradient(circle at 35% 28%, #fffdf7, #d8d8cd 58%, #9fbda8 100%);
      box-shadow: inset -15px -18px 25px rgba(60,54,40,.2);
      opacity: .95;
    }
    .tiger-badge {
      position: absolute;
      left: 18px;
      top: 22px;
      width: 76px;
      height: 76px;
      display: grid;
      place-items: center;
      border-radius: 22px;
      background: rgba(17,20,22,.5);
      border: 1px solid rgba(255,255,255,.18);
      font-size: 38px;
      transform: rotate(-5deg);
    }
    .food-strip {
      position: absolute;
      right: 18px;
      bottom: 18px;
      display: flex;
      gap: 8px;
    }
    .food-tile {
      width: 54px;
      height: 54px;
      display: grid;
      place-items: center;
      border-radius: 18px;
      background: rgba(255,247,234,.92);
      border: 1px solid rgba(32,21,10,.12);
      color: #20150a;
      font-size: 28px;
      box-shadow: 0 8px 20px rgba(0,0,0,.18);
    }
    .hero-text {
      position: relative;
      z-index: 1;
      max-width: 230px;
    }
    .eyebrow {
      display: inline-flex;
      width: fit-content;
      margin-bottom: 8px;
      border: 1px solid rgba(255,247,234,.34);
      border-radius: 999px;
      padding: 6px 9px;
      color: #fff7ea;
      background: rgba(17,20,22,.22);
      font-size: 12px;
      font-weight: 700;
    }
    .actions {
      display: grid;
      gap: 12px;
      margin-top: 20px;
    }
    .install-card {
      display: grid;
      gap: 8px;
      margin-top: 2px;
      border: 1px solid rgba(244,208,111,.28);
      border-radius: 18px;
      background: rgba(36,26,19,.72);
      padding: 13px;
    }
    .install-card strong {
      font-size: 14px;
    }
    .platform {
      display: none;
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
    }
    .platform.active {
      display: block;
    }
    .install-btn {
      display: none;
      width: 100%;
      margin-top: 2px;
    }
    .install-btn.active {
      display: block;
    }
    .action {
      min-height: 90px;
      width: 100%;
      display: grid;
      grid-template-columns: 54px 1fr;
      align-items: center;
      gap: 14px;
      padding: 14px;
      border-radius: 20px;
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--text);
      text-align: left;
    }
    .action.primary {
      background: var(--primary);
      color: var(--primary-text);
      border-color: transparent;
    }
    .action-icon {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      font-size: 23px;
      flex: none;
    }
    .action.primary .action-icon {
      background: #fff7ea;
      color: var(--primary-text);
      border-color: rgba(32,21,10,.14);
    }
    .action strong {
      color: currentColor;
      font-weight: 800;
    }
    .sub {
      display: block;
      margin-top: 3px;
      font-size: 13px;
      color: currentColor;
      opacity: .68;
      line-height: 1.35;
    }
    .navline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 42px;
    }
    .back, .small-btn, .ghost {
      border: 1px solid var(--line);
      color: var(--text);
      background: var(--panel);
      border-radius: 999px;
      padding: 9px 12px;
    }
    .chip {
      border: 1px solid var(--line);
      background: var(--panel-2);
      color: var(--muted);
      border-radius: 999px;
      padding: 8px 11px;
      font-size: 13px;
    }
    .searchbox {
      display: grid;
      grid-template-columns: 22px 1fr auto;
      gap: 9px;
      align-items: center;
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 11px 12px;
    }
    .searchbox input {
      min-width: 0;
      border: 0;
      outline: 0;
      color: var(--text);
      background: transparent;
    }
    .list {
      display: grid;
      gap: 10px;
    }
    .dish-row {
      width: 100%;
      min-height: 64px;
      display: grid;
      grid-template-columns: 50px 1fr;
      gap: 12px;
      align-items: center;
      text-align: left;
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--text);
      border-radius: 18px;
      padding: 10px;
    }
    .dish-row.active {
      background: var(--primary);
      color: var(--primary-text);
      border-color: transparent;
    }
    .food-img {
      width: 48px;
      height: 48px;
      border-radius: 15px;
      font-size: 24px;
    }
    .detail {
      display: none;
      gap: 14px;
      border: 1px solid var(--line);
      background: rgba(23,29,35,.9);
      border-radius: var(--radius);
      padding: 14px;
    }
    .detail.active { display: grid; }
    .dish-head {
      display: grid;
      grid-template-columns: 64px 1fr;
      gap: 12px;
      align-items: center;
    }
    .dish-head .food-img {
      width: 64px;
      height: 64px;
      border-radius: 18px;
      font-size: 30px;
    }
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .badge {
      font-size: 12px;
      color: var(--muted);
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 6px 8px;
      background: rgba(255,255,255,.04);
    }
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 10px;
    }
    li.step {
      display: grid;
      grid-template-columns: 28px 1fr;
      gap: 10px;
      line-height: 1.45;
    }
    .num {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: var(--accent);
      color: var(--text);
      font-weight: 700;
      font-size: 13px;
    }
    .ask {
      display: grid;
      gap: 9px;
      border-top: 1px solid var(--line);
      padding-top: 12px;
    }
    .askline {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
    }
    .askline input {
      min-width: 0;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 11px 12px;
      background: #10161d;
      color: var(--text);
    }
    .primary-btn {
      border: 0;
      color: var(--primary-text);
      background: var(--primary);
      border-radius: 14px;
      padding: 11px 13px;
      font-weight: 700;
    }
    .korean {
      background: #10161d;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 11px 12px;
      line-height: 1.45;
    }
    .meaning {
      margin-top: -4px;
      color: var(--muted);
      line-height: 1.45;
    }
    .camera {
      display: grid;
      place-items: center;
      min-height: 330px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: linear-gradient(145deg, #151b21, #222b34);
      overflow: hidden;
      text-align: center;
      padding: 14px;
    }
    video {
      width: 100%;
      min-height: 330px;
      object-fit: cover;
      border-radius: 18px;
      display: none;
    }
    video.active { display: block; }
    .camera-placeholder {
      display: grid;
      gap: 8px;
      justify-items: center;
      color: var(--muted);
    }
    .scan-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    @media (max-width: 360px) {
      h1 { font-size: 35px; }
      .app { padding-left: 12px; padding-right: 12px; }
      .askline, .scan-actions { grid-template-columns: 1fr; }
    }
    @media (min-width: 700px) {
      body {
        display: grid;
        place-items: start center;
      }
      .app {
        margin-top: 20px;
        min-height: calc(100dvh - 40px);
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 32px;
        box-shadow: 0 24px 70px rgba(0,0,0,.38);
      }
    }
  </style>
</head>
<body>
  <main class="app">
    <header class="topbar">
        <div class="brand"><span class="mark">🍽️</span><span>K-Bite</span></div>
        <select id="lang" aria-label="Language">
          <option value="en">English</option>
          <option value="ja">日本語</option>
          <option value="zhCN">简体中文</option>
          <option value="zhTW">繁體中文</option>
          <option value="fil">Filipino</option>
          <option value="th">ไทย</option>
          <option value="vi">Tiếng Việt</option>
        </select>
    </header>

    <section class="screen home active" id="home">
      <div class="hero-card" aria-label="Korean food and heritage visual">
        <div class="moon-jar" aria-hidden="true"></div>
        <div class="tiger-badge" aria-hidden="true">虎</div>
        <div class="hero-text">
          <span class="eyebrow">Korean table guide</span>
          <h1>K-Bite Guide</h1>
          <p class="muted home-copy" data-i="homeCopy">Find the Korean dish in front of you, then learn exactly how to eat it.</p>
        </div>
        <div class="food-strip" aria-hidden="true">
          <span class="food-tile">🥓</span>
          <span class="food-tile">🍚</span>
          <span class="food-tile">🥚</span>
        </div>
      </div>
      <div>
        <h2 data-i="homeTitle">Eat Korean food with confidence</h2>
        <p class="muted home-copy" data-i="homeSupport">Search by name or scan the food to see the right steps, sauces, and Korean staff phrases.</p>
      </div>
      <div class="actions">
        <button class="action primary" id="toSearch" type="button">
          <span class="action-icon">🔎</span>
          <span><strong data-i="searchFood">Search food</strong><span class="sub" data-i="searchSub">Search by dish, sauce, ingredient, or eating action</span></span>
        </button>
        <button class="action" id="toScan" type="button">
          <span class="action-icon">📷</span>
          <span><strong data-i="scanMenu">Scan food</strong><span class="sub" data-i="scanSub">Use the camera to identify food and open its guide</span></span>
        </button>
      </div>
      <div class="install-card">
        <strong data-i="installTitle">Install on your phone</strong>
        <p class="platform" data-platform="ios" data-i="installIOS">iPhone: open in Safari, tap Share, then Add to Home Screen.</p>
        <p class="platform" data-platform="android" data-i="installAndroid">Android: open in Chrome, tap Install app or Add to Home screen.</p>
        <p class="platform active" data-platform="other" data-i="installOther">Use this as a mobile web app on iPhone Safari or Android Chrome.</p>
        <button class="primary-btn install-btn" id="installBtn" type="button" data-i="installButton">Install app</button>
      </div>
    </section>

    <section class="screen" id="search">
      <div class="navline">
        <button class="back" data-home>← <span data-i="home"></span></button>
        <span class="chip" data-i="foodSearch"></span>
      </div>
      <div class="searchbox">
        <span>🔎</span>
        <input id="query" type="search" autocomplete="off">
        <button class="ghost" id="clear" aria-label="Clear">×</button>
      </div>
      <div class="list" id="results"></div>
      <article class="detail" id="searchDetail"></article>
    </section>

    <section class="screen" id="scan">
      <div class="navline">
        <button class="back" data-home>← <span data-i="home"></span></button>
        <span class="chip" data-i="foodScan"></span>
      </div>
      <p class="muted" data-i="scanCopy"></p>
      <div class="camera">
        <video id="video" playsinline muted></video>
        <div class="camera-placeholder" id="cameraPlaceholder">
          <div style="font-size:42px">📷</div>
          <p data-i="cameraHint"></p>
        </div>
      </div>
      <div class="scan-actions">
        <button class="primary-btn" id="cameraBtn" data-i="startCamera"></button>
        <button class="small-btn" id="detectBtn" data-i="detectFood"></button>
      </div>
      <p class="muted" id="scanStatus"></p>
      <article class="detail" id="scanDetail"></article>
    </section>
  </main>

  <script>
    const ui = {
      en: { homeCopy: "Find the Korean dish in front of you, then learn exactly how to eat it.", homeTitle: "Eat Korean food with confidence", homeSupport: "Search by name or scan the food to see the right steps, sauces, and Korean staff phrases.", searchFood: "Search food", searchSub: "Search by dish, sauce, ingredient, or eating action", scanMenu: "Scan food", scanSub: "Use the camera to identify food and open its guide", home: "Home", foodSearch: "Food search", foodScan: "Food scan", scanCopy: "Point the camera at the food. After detection, the dish name and how-to guide appear below.", cameraHint: "Camera preview appears here", startCamera: "Start camera", detectFood: "Detect food", cameraBlocked: "Camera permission is blocked here. On iPhone, open the HTTPS link in Safari and allow camera access.", analyzing: "Analyzing the camera frame...", detected: "Detected", how: "How to eat", ask: "Ask staff in Korean", askPlaceholder: "Type a question, e.g. Is this fully cooked?", translate: "Translate", play: "Play Korean", suggestion: "Suggested phrase", searchPlaceholder: "Try pork belly, egg, raw fish, tofu...", installTitle: "Install on your phone", installIOS: "iPhone: open in Safari, tap Share, then Add to Home Screen.", installAndroid: "Android: open in Chrome, tap Install app or Add to Home screen.", installOther: "Use this as a mobile web app on iPhone Safari or Android Chrome.", installButton: "Install app" },
      ja: { homeCopy: "目の前の韓国料理を見つけて、正しい食べ方を確認できます。", homeTitle: "韓国料理を安心して楽しむ", homeSupport: "料理名で検索、または料理をスキャンして、食べ方・ソース・韓国語フレーズを確認できます。", searchFood: "料理を検索", searchSub: "料理名、ソース、食材、食べ方で検索", scanMenu: "料理をスキャン", scanSub: "カメラで料理を認識してガイドを表示", home: "ホーム", foodSearch: "料理検索", foodScan: "料理スキャン", scanCopy: "料理にカメラを向けます。認識後、料理名と食べ方が下に表示されます。", cameraHint: "ここにカメラ画面が表示されます", startCamera: "カメラ開始", detectFood: "料理を認識", cameraBlocked: "この環境ではカメラ許可がブロックされています。iPhoneではHTTPSリンクをSafariで開いて許可してください。", analyzing: "カメラ画像を解析中...", detected: "認識結果", how: "食べ方", ask: "韓国語で店員に質問", askPlaceholder: "質問を入力。例：これは火が通っていますか？", translate: "翻訳", play: "韓国語を再生", suggestion: "おすすめ文", searchPlaceholder: "豚バラ、卵、刺身、豆腐など", installTitle: "スマートフォンにインストール", installIOS: "iPhone: Safariで開き、共有からホーム画面に追加します。", installAndroid: "Android: Chromeで開き、アプリをインストールまたはホーム画面に追加します。", installOther: "iPhone SafariまたはAndroid Chromeでモバイルアプリとして使えます。", installButton: "アプリをインストール" },
      zhCN: { homeCopy: "找到眼前的韩国料理，并学习正确吃法。", homeTitle: "放心享受韩国料理", homeSupport: "按名称搜索或扫描食物，查看正确步骤、酱料和韩语店员用语。", searchFood: "搜索菜品", searchSub: "按菜名、酱料、食材或吃法搜索", scanMenu: "扫描食物", scanSub: "用相机识别食物并打开指南", home: "首页", foodSearch: "菜品搜索", foodScan: "食物扫描", scanCopy: "把镜头对准食物。识别后，菜名和吃法会显示在下方。", cameraHint: "相机画面会显示在这里", startCamera: "开启相机", detectFood: "识别食物", cameraBlocked: "此环境可能阻止相机权限。在 iPhone 上请用 Safari 打开 HTTPS 链接并允许相机。", analyzing: "正在分析相机画面...", detected: "识别结果", how: "怎么吃", ask: "用韩语问店员", askPlaceholder: "输入问题，例如：这个熟了吗？", translate: "翻译", play: "播放韩语", suggestion: "推荐句", searchPlaceholder: "试试五花肉、鸡蛋、生鱼片、豆腐", installTitle: "安装到手机", installIOS: "iPhone：用 Safari 打开，点分享，然后添加到主屏幕。", installAndroid: "Android：用 Chrome 打开，点安装应用或添加到主屏幕。", installOther: "可在 iPhone Safari 或 Android Chrome 上作为手机网页应用使用。", installButton: "安装应用" },
      zhTW: { homeCopy: "找到眼前的韓國料理，並學習正確吃法。", homeTitle: "放心享受韓國料理", homeSupport: "按名稱搜尋或掃描食物，查看正確步驟、醬料和韓語店員用語。", searchFood: "搜尋菜色", searchSub: "按菜名、醬料、食材或吃法搜尋", scanMenu: "掃描食物", scanSub: "用相機辨識食物並開啟指南", home: "首頁", foodSearch: "菜色搜尋", foodScan: "食物掃描", scanCopy: "把鏡頭對準食物。辨識後，菜名和吃法會顯示在下方。", cameraHint: "相機畫面會顯示在這裡", startCamera: "開啟相機", detectFood: "辨識食物", cameraBlocked: "此環境可能阻止相機權限。在 iPhone 上請用 Safari 開啟 HTTPS 連結並允許相機。", analyzing: "正在分析相機畫面...", detected: "辨識結果", how: "怎麼吃", ask: "用韓語問店員", askPlaceholder: "輸入問題，例如：這個熟了嗎？", translate: "翻譯", play: "播放韓語", suggestion: "推薦句", searchPlaceholder: "試試五花肉、雞蛋、生魚片、豆腐", installTitle: "安裝到手機", installIOS: "iPhone：用 Safari 開啟，點分享，然後加入主畫面。", installAndroid: "Android：用 Chrome 開啟，點安裝應用程式或加入主畫面。", installOther: "可在 iPhone Safari 或 Android Chrome 上作為手機網頁應用使用。", installButton: "安裝應用程式" },
      fil: { homeCopy: "Hanapin ang Korean food sa harap mo at alamin kung paano ito kainin nang tama.", homeTitle: "Kumain ng Korean food nang may kumpiyansa", homeSupport: "Mag-search o mag-scan ng pagkain para makita ang tamang hakbang, sawsawan, at Korean phrases.", searchFood: "Search food", searchSub: "Maghanap ayon sa dish, sawsawan, sangkap, o paraan ng pagkain", scanMenu: "Scan food", scanSub: "Gamitin ang camera para makilala ang pagkain at buksan ang guide", home: "Home", foodSearch: "Food search", foodScan: "Food scan", scanCopy: "Itutok ang camera sa pagkain. Kapag nakita, lalabas ang pangalan at gabay kung paano kainin.", cameraHint: "Dito lalabas ang camera preview", startCamera: "Start camera", detectFood: "Detect food", cameraBlocked: "Naka-block ang camera permission dito. Sa iPhone, buksan ang HTTPS link sa Safari at payagan ang camera.", analyzing: "Sinusuri ang camera frame...", detected: "Nakita", how: "Paano kainin", ask: "Magtanong sa staff sa Korean", askPlaceholder: "Mag-type ng tanong, hal. Luto na ba ito?", translate: "Translate", play: "I-play ang Korean", suggestion: "Suggested phrase", searchPlaceholder: "Subukan: pork belly, egg, raw fish, tofu...", installTitle: "I-install sa phone", installIOS: "iPhone: buksan sa Safari, tap Share, tapos Add to Home Screen.", installAndroid: "Android: buksan sa Chrome, tap Install app o Add to Home screen.", installOther: "Gamitin ito bilang mobile web app sa iPhone Safari o Android Chrome.", installButton: "Install app" },
      th: { homeCopy: "ค้นหาอาหารเกาหลีตรงหน้าคุณ แล้วเรียนรู้วิธีกินที่ถูกต้อง", homeTitle: "กินอาหารเกาหลีอย่างมั่นใจ", homeSupport: "ค้นหาชื่ออาหารหรือสแกนอาหารเพื่อดูขั้นตอน ซอส และประโยคภาษาเกาหลีสำหรับถามพนักงาน", searchFood: "ค้นหาอาหาร", searchSub: "ค้นหาด้วยชื่ออาหาร ซอส วัตถุดิบ หรือวิธีกิน", scanMenu: "สแกนอาหาร", scanSub: "ใช้กล้องระบุอาหารและเปิดคู่มือ", home: "หน้าแรก", foodSearch: "ค้นหาอาหาร", foodScan: "สแกนอาหาร", scanCopy: "หันกล้องไปที่อาหาร หลังจากตรวจจับแล้ว ชื่ออาหารและวิธีกินจะแสดงด้านล่าง", cameraHint: "ตัวอย่างภาพจากกล้องจะแสดงที่นี่", startCamera: "เปิดกล้อง", detectFood: "ตรวจจับอาหาร", cameraBlocked: "สิทธิ์กล้องถูกบล็อก ใน iPhone ให้เปิดลิงก์ HTTPS ด้วย Safari แล้วอนุญาตกล้อง", analyzing: "กำลังวิเคราะห์ภาพจากกล้อง...", detected: "ตรวจพบ", how: "วิธีกิน", ask: "ถามพนักงานเป็นภาษาเกาหลี", askPlaceholder: "พิมพ์คำถาม เช่น สุกแล้วหรือยัง?", translate: "แปล", play: "เล่นเสียงเกาหลี", suggestion: "ประโยคแนะนำ", searchPlaceholder: "ลองค้นหา หมูสามชั้น ไข่ ปลาดิบ เต้าหู้...", installTitle: "ติดตั้งบนโทรศัพท์", installIOS: "iPhone: เปิดใน Safari แตะแชร์ แล้วเลือกเพิ่มไปยังหน้าจอโฮม", installAndroid: "Android: เปิดใน Chrome แล้วแตะติดตั้งแอปหรือเพิ่มไปยังหน้าจอโฮม", installOther: "ใช้เป็นเว็บแอปบนมือถือได้ใน iPhone Safari หรือ Android Chrome", installButton: "ติดตั้งแอป" },
      vi: { homeCopy: "Tìm món Hàn trước mặt bạn, rồi xem chính xác cách ăn.", homeTitle: "Tự tin ăn món Hàn", homeSupport: "Tìm theo tên món hoặc quét món ăn để xem các bước, nước chấm và câu hỏi tiếng Hàn.", searchFood: "Tìm món ăn", searchSub: "Tìm theo món, sốt, nguyên liệu hoặc cách ăn", scanMenu: "Quét món ăn", scanSub: "Dùng camera để nhận diện món và mở hướng dẫn", home: "Trang chủ", foodSearch: "Tìm món", foodScan: "Quét món", scanCopy: "Hướng camera vào món ăn. Sau khi nhận diện, tên món và cách ăn sẽ hiện bên dưới.", cameraHint: "Khung xem camera sẽ hiện ở đây", startCamera: "Mở camera", detectFood: "Nhận diện món", cameraBlocked: "Quyền camera đang bị chặn. Trên iPhone, mở liên kết HTTPS bằng Safari và cho phép camera.", analyzing: "Đang phân tích hình ảnh camera...", detected: "Đã nhận diện", how: "Cách ăn", ask: "Hỏi nhân viên bằng tiếng Hàn", askPlaceholder: "Nhập câu hỏi, ví dụ: Món này chín chưa?", translate: "Dịch", play: "Phát tiếng Hàn", suggestion: "Câu gợi ý", searchPlaceholder: "Thử tìm thịt ba chỉ, trứng, cá sống, đậu phụ...", installTitle: "Cài vào điện thoại", installIOS: "iPhone: mở bằng Safari, chạm Chia sẻ, rồi Thêm vào Màn hình chính.", installAndroid: "Android: mở bằng Chrome, chạm Cài đặt ứng dụng hoặc Thêm vào màn hình chính.", installOther: "Dùng như ứng dụng web di động trên iPhone Safari hoặc Android Chrome.", installButton: "Cài ứng dụng" }
    };

    const dishes = [
      { id: "samgyeopsal", emoji: "🥓", ko: "삼겹살", search: "pork belly samgyeopsal bbq ssam lettuce 삼겹살 五花肉 豚バラ liempo หมูสามชั้น thịt ba chỉ", phrase: "이거 다 익었나요?", meaning: { en: "Is this fully cooked?", ja: "これは火が通っていますか？", zhCN: "这个熟了吗？", zhTW: "這個熟了嗎？", fil: "Luto na ba ito nang husto?", th: "สุกทั่วแล้วหรือยัง?", vi: "Món này đã chín kỹ chưa?" }, text: {
        en: ["Samgyeopsal", "Grilled pork belly eaten with ssamjang, garlic, kimchi, and lettuce.", ["Pork", "Cook fully"], ["Grill until both sides are golden.", "Cut into bite-sized pieces with scissors.", "Dip lightly in sesame oil salt or ssamjang.", "Wrap with lettuce, garlic, and kimchi if you like."]],
        ja: ["サムギョプサル", "豚バラを焼き、サムジャン、ニンニク、キムチ、レタスと食べます。", ["豚肉", "しっかり焼く"], ["両面がこんがりするまで焼きます。", "ハサミで一口大に切ります。", "ごま油塩やサムジャンに軽くつけます。", "レタス、ニンニク、キムチで包んで食べます。"]],
        zhCN: ["韩式烤五花肉", "烤猪五花，配包饭酱、蒜片、泡菜和生菜。", ["猪肉", "全熟"], ["烤到两面金黄。", "用剪刀剪成一口大小。", "轻蘸芝麻油盐或包饭酱。", "可以用生菜、蒜片、泡菜包着吃。"]],
        zhTW: ["韓式烤五花肉", "烤豬五花，配包飯醬、蒜片、泡菜和生菜。", ["豬肉", "全熟"], ["烤到兩面金黃。", "用剪刀剪成一口大小。", "輕蘸芝麻油鹽或包飯醬。", "可以用生菜、蒜片、泡菜包著吃。"]],
        fil: ["Samgyeopsal", "Inihaw na pork belly na kinakain kasama ng ssamjang, bawang, kimchi, at lettuce.", ["Baboy", "Lutuin nang husto"], ["Ihawin hanggang maging golden ang magkabilang side.", "Gupitin sa bite-sized pieces gamit ang gunting.", "Isawsaw nang kaunti sa sesame oil salt o ssamjang.", "Balutin sa lettuce kasama ang bawang at kimchi kung gusto mo."]],
        th: ["ซัมกยอบซัล", "หมูสามชั้นย่าง กินกับซัมจัง กระเทียม กิมจิ และผักกาดหอม", ["หมู", "ต้องสุกทั่ว"], ["ย่างให้ทั้งสองด้านเหลืองหอม", "ใช้กรรไกรตัดเป็นชิ้นพอดีคำ", "จิ้มเกลือน้ำมันงาหรือซัมจังเล็กน้อย", "ห่อด้วยผักกาดหอม กระเทียม และกิมจิตามชอบ"]],
        vi: ["Samgyeopsal", "Thịt ba chỉ nướng ăn với ssamjang, tỏi, kimchi và rau xà lách.", ["Thịt heo", "Nướng chín kỹ"], ["Nướng đến khi hai mặt vàng thơm.", "Dùng kéo cắt thành miếng vừa ăn.", "Chấm nhẹ vào muối dầu mè hoặc ssamjang.", "Có thể cuốn với rau xà lách, tỏi và kimchi."]]
      }},
      { id: "sundubu", emoji: "🥚", ko: "순두부찌개", search: "soft tofu stew egg sundubu 순두부찌개 tofu egg 豆腐 鸡蛋 卵 tokwa itlog เต้าหู้ ไข่ đậu phụ trứng", phrase: "계란은 지금 넣으면 되나요?", meaning: { en: "Should I put the egg in now?", ja: "卵は今入れればいいですか？", zhCN: "鸡蛋现在放进去可以吗？", zhTW: "雞蛋現在放進去可以嗎？", fil: "Ilalagay ko na ba ang itlog ngayon?", th: "ใส่ไข่ตอนนี้ได้ไหม?", vi: "Bây giờ tôi cho trứng vào được không?" }, text: {
        en: ["Sundubu jjigae", "Soft tofu stew served boiling hot, often with a raw egg.", ["Hot stew", "Egg timing"], ["Crack the egg in while the stew is bubbling.", "Press it gently under the broth.", "Wait about one minute.", "Scoop tofu, broth, and egg over rice."]],
        ja: ["スンドゥブチゲ", "熱々で出てくる柔らかい豆腐の鍋。生卵を入れることがあります。", ["熱い鍋", "卵のタイミング"], ["鍋が沸いているうちに卵を入れます。", "卵をスープの中へ軽く押します。", "約1分待ちます。", "豆腐、スープ、卵をご飯にのせます。"]],
        zhCN: ["嫩豆腐锅", "滚烫的嫩豆腐汤，常附生鸡蛋。", ["热汤", "鸡蛋时机"], ["汤还沸腾时放入鸡蛋。", "用勺子轻轻压进汤里。", "等约一分钟。", "把豆腐、汤和鸡蛋舀到饭上。"]],
        zhTW: ["嫩豆腐鍋", "滾燙的嫩豆腐湯，常附生雞蛋。", ["熱湯", "雞蛋時機"], ["湯還沸騰時放入雞蛋。", "用湯匙輕輕壓進湯裡。", "等約一分鐘。", "把豆腐、湯和雞蛋舀到飯上。"]],
        fil: ["Sundubu jjigae", "Mainit na soft tofu stew, kadalasang may kasamang hilaw na itlog.", ["Mainit na stew", "Timing ng itlog"], ["Ilagay ang itlog habang kumukulo pa ang stew.", "Dahan-dahang itulak ang itlog sa sabaw.", "Maghintay ng mga isang minuto.", "Isandok ang tofu, sabaw, at itlog sa ibabaw ng kanin."]],
        th: ["ซุนดูบูจิเก", "ซุปเต้าหู้อ่อนร้อนจัด มักเสิร์ฟพร้อมไข่ดิบ", ["ซุปร้อน", "จังหวะใส่ไข่"], ["ตอกไข่ใส่ตอนซุปกำลังเดือด", "กดไข่ลงในน้ำซุปเบาๆ", "รอประมาณหนึ่งนาที", "ตักเต้าหู้ น้ำซุป และไข่ราดบนข้าว"]],
        vi: ["Sundubu jjigae", "Canh đậu phụ non nóng sôi, thường có trứng sống ăn kèm.", ["Canh nóng", "Thời điểm cho trứng"], ["Đập trứng vào khi canh còn sôi.", "Nhẹ nhàng nhấn trứng xuống nước canh.", "Chờ khoảng một phút.", "Múc đậu phụ, nước canh và trứng lên cơm."]]
      }},
      { id: "hoe", emoji: "🐟", ko: "회", search: "raw fish hoe sashimi chojang soy sauce 회 生鱼片 生魚片 刺身 hilaw na isda ปลาดิบ cá sống", phrase: "이건 간장에 먹어요, 초장에 먹어요?", meaning: { en: "Should I eat this with soy sauce or chojang?", ja: "これは醤油ですか、チョジャンですか？", zhCN: "这个蘸酱油还是辣醋酱？", zhTW: "這個蘸醬油還是辣醋醬？", fil: "Kakainin ba ito sa soy sauce o chojang?", th: "กินกับซีอิ๊วหรือโชจัง?", vi: "Món này ăn với xì dầu hay chogochujang?" }, text: {
        en: ["Korean raw fish", "Sliced raw fish eaten with soy-wasabi, chojang, or wrapped in lettuce.", ["Raw fish", "Sauce choice"], ["Taste one slice with soy sauce and wasabi.", "Try another with chojang.", "For Korean style, wrap fish with garlic and ssamjang.", "Eat the wrap in one bite if possible."]],
        ja: ["韓国式刺身", "醤油わさび、チョジャン、またはレタス包みで食べる刺身です。", ["生魚", "ソース選択"], ["まず醤油とわさびで味わいます。", "次にチョジャンでも試します。", "韓国式ではニンニクとサムジャンで包みます。", "できれば一口で食べます。"]],
        zhCN: ["韩式生鱼片", "可蘸酱油芥末、辣醋酱，或用生菜包着吃。", ["生鱼", "酱料选择"], ["先用酱油和芥末尝一片。", "再试试辣醋酱。", "韩式吃法可加蒜和包饭酱包菜。", "可以的话一口吃下。"]],
        zhTW: ["韓式生魚片", "可蘸醬油芥末、辣醋醬，或用生菜包著吃。", ["生魚", "醬料選擇"], ["先用醬油和芥末嚐一片。", "再試試辣醋醬。", "韓式吃法可加蒜和包飯醬包菜。", "可以的話一口吃下。"]],
        fil: ["Korean raw fish", "Hiniwang hilaw na isda na kinakain sa soy-wasabi, chojang, o nakabalot sa lettuce.", ["Hilaw na isda", "Pili ng sawsawan"], ["Tikman muna ang isang hiwa gamit ang soy sauce at wasabi.", "Subukan din ang isa pa gamit ang chojang.", "Sa Korean style, balutin ang isda kasama ng bawang at ssamjang.", "Kung kaya, kainin ang wrap sa isang kagat."]],
        th: ["ปลาดิบเกาหลี", "ปลาดิบหั่นชิ้น กินกับซีอิ๊ววาซาบิ โชจัง หรือห่อผัก", ["ปลาดิบ", "เลือกซอส"], ["ลองชิมหนึ่งชิ้นกับซีอิ๊วและวาซาบิ", "ลองอีกชิ้นกับโชจัง", "แบบเกาหลีให้ห่อปลากับกระเทียมและซัมจัง", "ถ้าได้ ให้กินคำห่อในคำเดียว"]],
        vi: ["Gỏi cá sống kiểu Hàn", "Cá sống thái lát ăn với xì dầu mù tạt, chogochujang hoặc cuốn rau.", ["Cá sống", "Chọn nước chấm"], ["Thử một miếng với xì dầu và wasabi.", "Thử một miếng khác với chogochujang.", "Kiểu Hàn là cuốn cá với tỏi và ssamjang.", "Nếu có thể, ăn cuốn trong một miếng."]]
      }},
      { id: "bibimbap", emoji: "🍚", ko: "비빔밥", search: "bibimbap mixed rice gochujang egg 비빔밥 拌饭 拌飯 ビビンバ kanin ข้าวยำเกาหลี cơm trộn", phrase: "고추장은 얼마나 넣으면 돼요?", meaning: { en: "How much gochujang should I add?", ja: "コチュジャンはどれくらい入れますか？", zhCN: "辣椒酱应该放多少？", zhTW: "辣椒醬應該放多少？", fil: "Gaano karaming gochujang ang ilalagay ko?", th: "ควรใส่โคชูจังเท่าไหร่?", vi: "Tôi nên cho bao nhiêu gochujang?" }, text: {
        en: ["Bibimbap", "Rice with vegetables, egg, meat, and gochujang, meant to be mixed before eating.", ["Mix fully", "Sauce gradually"], ["Add gochujang little by little.", "Break the egg if included.", "Mix rice and toppings evenly.", "Taste and add more sauce only if needed."]],
        ja: ["ビビンバ", "ご飯に野菜、卵、肉、コチュジャンをのせ、混ぜて食べる料理です。", ["よく混ぜる", "ソースは少しずつ"], ["コチュジャンを少しずつ入れます。", "卵があれば崩します。", "ご飯と具材を均一に混ぜます。", "味見して必要なら足します。"]],
        zhCN: ["拌饭", "米饭上放蔬菜、鸡蛋、肉和辣椒酱，吃前需要拌匀。", ["充分拌匀", "酱料少量加"], ["先加少量辣椒酱。", "如果有鸡蛋，先把它拌开。", "把米饭和配菜充分拌匀。", "尝味道后再决定要不要加酱。"]],
        zhTW: ["拌飯", "米飯上放蔬菜、雞蛋、肉和辣椒醬，吃前需要拌勻。", ["充分拌勻", "醬料少量加"], ["先加少量辣椒醬。", "如果有雞蛋，先把它拌開。", "把米飯和配菜充分拌勻。", "嚐味道後再決定要不要加醬。"]],
        fil: ["Bibimbap", "Kanin na may gulay, itlog, karne, at gochujang. Hinahalo ito bago kainin.", ["Haluing mabuti", "Unti-unting sauce"], ["Maglagay ng kaunting gochujang muna.", "Basagin ang itlog kung kasama ito.", "Haluing pantay ang kanin at toppings.", "Tikman muna bago magdagdag pa ng sauce."]],
        th: ["บิบิมบับ", "ข้าวกับผัก ไข่ เนื้อ และโคชูจัง ต้องคลุกก่อนกิน", ["คลุกให้ทั่ว", "ใส่ซอสทีละน้อย"], ["ใส่โคชูจังทีละน้อย", "ถ้ามีไข่ ให้เจาะไข่ก่อน", "คลุกข้าวและเครื่องให้เข้ากัน", "ชิมก่อน แล้วค่อยเติมซอสถ้าจำเป็น"]],
        vi: ["Bibimbap", "Cơm với rau, trứng, thịt và gochujang, cần trộn đều trước khi ăn.", ["Trộn đều", "Thêm sốt từ từ"], ["Cho gochujang từng chút một.", "Nếu có trứng, hãy làm vỡ lòng đỏ.", "Trộn đều cơm và topping.", "Nếm trước rồi chỉ thêm sốt nếu cần."]]
      }}
    ];

    const rules = [
      { keys: ["fully cooked", "cooked", "ready", "luto", "suk", "สุก", "chín", "火が通", "熟了", "熟嗎"], ko: "이거 다 익었나요?", meaning: { en: "Is this fully cooked?", ja: "これは火が通っていますか？", zhCN: "这个熟了吗？", zhTW: "這個熟了嗎？", fil: "Luto na ba ito nang husto?", th: "สุกทั่วแล้วหรือยัง?", vi: "Món này đã chín kỹ chưa?" } },
      { keys: ["egg", "itlog", "ไข่", "trứng", "卵", "鸡蛋", "雞蛋"], ko: "계란은 지금 넣으면 되나요?", meaning: { en: "Should I put the egg in now?", ja: "卵は今入れればいいですか？", zhCN: "鸡蛋现在放进去可以吗？", zhTW: "雞蛋現在放進去可以嗎？", fil: "Ilalagay ko na ba ang itlog ngayon?", th: "ใส่ไข่ตอนนี้ได้ไหม?", vi: "Bây giờ tôi cho trứng vào được không?" } },
      { keys: ["sauce", "dip", "soy", "chojang", "sawsawan", "sawsaw", "ซอส", "จิ้ม", "nước chấm", "chấm", "ソース", "醤油", "酱", "醬"], ko: "어떤 소스에 찍어 먹으면 돼요?", meaning: { en: "Which sauce should I dip this in?", ja: "どのソースにつければいいですか？", zhCN: "应该蘸哪种酱？", zhTW: "應該蘸哪種醬？", fil: "Saang sawsawan ko ito isasawsaw?", th: "ควรจิ้มซอสอะไร?", vi: "Tôi nên chấm món này với loại sốt nào?" } },
      { keys: ["spicy", "hot", "maanghang", "เผ็ด", "cay", "辛", "辣"], ko: "많이 매워요?", meaning: { en: "Is it very spicy?", ja: "かなり辛いですか？", zhCN: "这个很辣吗？", zhTW: "這個很辣嗎？", fil: "Maanghang ba ito?", th: "เผ็ดมากไหม?", vi: "Món này có cay lắm không?" } },
      { keys: ["mix", "stir", "halo", "คลุก", "trộn", "混", "拌"], ko: "이거 다 섞어서 먹는 건가요?", meaning: { en: "Do I mix everything together?", ja: "全部混ぜて食べますか？", zhCN: "这个要全部拌在一起吃吗？", zhTW: "這個要全部拌在一起吃嗎？", fil: "Hahaluin ko ba lahat bago kainin?", th: "ต้องคลุกทุกอย่างรวมกันไหม?", vi: "Tôi có cần trộn tất cả lại không?" } },
      { keys: ["wrap", "ssam", "lettuce", "balot", "ห่อ", "cuốn", "包", "レタス"], ko: "쌈은 어떻게 싸 먹으면 돼요?", meaning: { en: "How should I make the wrap?", ja: "どう包んで食べればいいですか？", zhCN: "这个应该怎么包着吃？", zhTW: "這個應該怎麼包著吃？", fil: "Paano ko ito ibabalot para kainin?", th: "ควรห่อกินอย่างไร?", vi: "Tôi nên cuốn món này như thế nào?" } },
      { keys: ["pork", "baboy", "หมู", "heo", "豚", "猪", "豬"], ko: "돼지고기가 들어가나요?", meaning: { en: "Does it contain pork?", ja: "豚肉は入っていますか？", zhCN: "里面有猪肉吗？", zhTW: "裡面有豬肉嗎？", fil: "May pork ba ito?", th: "มีหมูไหม?", vi: "Món này có thịt heo không?" } },
      { keys: ["allergy", "sesame", "nut", "allergy", "mani", "งา", "ถั่ว", "dị ứng", "mè", "đậu phộng", "アレルギー", "过敏", "過敏"], ko: "알레르기가 있는데 이 음식에 들어가나요?", meaning: { en: "I have an allergy. Is it in this food?", ja: "アレルギーがあります。この料理に入っていますか？", zhCN: "我有过敏。这个菜里有吗？", zhTW: "我有過敏。這個菜裡有嗎？", fil: "May allergy ako. Kasama ba ito sa pagkain?", th: "ฉันแพ้อาหาร สิ่งนี้อยู่ในจานนี้ไหม?", vi: "Tôi bị dị ứng. Món này có thành phần đó không?" } }
    ];

    const state = { lang: "en", query: "", selected: null, scanned: null };
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const t = (key) => ui[state.lang][key];
    const local = (dish) => dish.text[state.lang];

    function setScreen(id) {
      $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
    }
    function speak(text) {
      if (!("speechSynthesis" in window) || !text) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ko-KR";
      speechSynthesis.speak(u);
    }
    function translateQuestion(value, fallbackKo, fallbackMeaning) {
      const input = (value || "").trim().toLowerCase();
      if (!input) return { ko: fallbackKo, meaning: fallbackMeaning };
      const found = rules.find(rule => rule.keys.some(k => input.includes(k.toLowerCase())));
      if (found) return { ko: found.ko, meaning: found.meaning[state.lang] };
      return { ko: "이걸 어떻게 먹으면 돼요?", meaning: input };
    }
    function renderDetail(target, dish) {
      const text = local(dish);
      target.classList.add("active");
      target.innerHTML =
        '<div class="dish-head">' +
          '<div class="food-img">' + dish.emoji + '</div>' +
          '<div><h3>' + text[0] + ' / ' + dish.ko + '</h3><p class="muted">' + text[1] + '</p></div>' +
        '</div>' +
        '<div class="badges">' + text[2].map(b => '<span class="badge">' + b + '</span>').join("") + '</div>' +
        '<section><h3>' + t("how") + '</h3><ol>' +
          text[3].map((s,i) => '<li class="step"><span class="num">' + (i + 1) + '</span><span>' + s + '</span></li>').join("") +
        '</ol></section>' +
        '<section class="ask">' +
          '<h3>' + t("ask") + '</h3>' +
          '<div class="askline"><input data-question placeholder="' + t("askPlaceholder") + '"><button class="primary-btn" data-translate>' + t("translate") + '</button></div>' +
          '<p class="muted">' + t("suggestion") + '</p>' +
          '<p class="korean" data-korean>' + dish.phrase + '</p>' +
          '<p class="meaning" data-meaning>' + dish.meaning[state.lang] + '</p>' +
          '<button class="primary-btn" data-speak>' + t("play") + '</button>' +
        '</section>';
      const korean = target.querySelector("[data-korean]");
      const meaning = target.querySelector("[data-meaning]");
      const input = target.querySelector("[data-question]");
      target.querySelector("[data-translate]").onclick = () => {
        const translated = translateQuestion(input.value, dish.phrase, dish.meaning[state.lang]);
        korean.textContent = translated.ko;
        meaning.textContent = translated.meaning;
      };
      target.querySelector("[data-speak]").onclick = () => speak(korean.textContent);
      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          const translated = translateQuestion(input.value, dish.phrase, dish.meaning[state.lang]);
          korean.textContent = translated.ko;
          meaning.textContent = translated.meaning;
          speak(korean.textContent);
        }
      };
    }
    function renderResults() {
      const q = state.query.toLowerCase();
      const rows = dishes.filter(d => !q || (d.search + " " + local(d)[0] + " " + d.ko).toLowerCase().includes(q));
      $("#results").innerHTML = rows.map(d => {
        const text = local(d);
        return '<button class="dish-row ' + (state.selected === d.id ? "active" : "") + '" data-dish="' + d.id + '"><span class="food-img">' + d.emoji + '</span><span><strong>' + text[0] + '</strong><span class="sub">' + d.ko + '</span></span></button>';
      }).join("");
      $$("#results [data-dish]").forEach(btn => btn.onclick = () => {
        const dish = dishes.find(d => d.id === btn.dataset.dish);
        state.selected = dish.id;
        renderResults();
        renderDetail($("#searchDetail"), dish);
      });
    }
    function renderText() {
      $$("[data-i]").forEach(el => el.textContent = t(el.dataset.i));
      $("#query").placeholder = t("searchPlaceholder");
      renderResults();
      if (state.selected) renderDetail($("#searchDetail"), dishes.find(d => d.id === state.selected));
      if (state.scanned) renderDetail($("#scanDetail"), dishes.find(d => d.id === state.scanned));
    }
    function renderPlatformInstall() {
      const ua = navigator.userAgent || "";
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);
      $$("[data-platform]").forEach(el => {
        const name = el.dataset.platform;
        el.classList.toggle("active", (isIOS && name === "ios") || (isAndroid && name === "android") || (!isIOS && !isAndroid && name === "other"));
      });
    }
    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("camera unavailable");
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
        $("#video").srcObject = stream;
        $("#video").classList.add("active");
        $("#cameraPlaceholder").style.display = "none";
        await $("#video").play();
        $("#scanStatus").textContent = t("scanCopy");
      } catch {
        $("#scanStatus").textContent = t("cameraBlocked");
      }
    }
    function detectFood() {
      $("#scanStatus").textContent = t("analyzing");
      setTimeout(() => {
        const dish = dishes[Math.floor(Date.now() / 1000) % dishes.length];
        state.scanned = dish.id;
        $("#scanStatus").textContent = t("detected") + ": " + local(dish)[0] + " / " + dish.ko;
        renderDetail($("#scanDetail"), dish);
      }, 450);
    }

    let deferredInstallPrompt = null;
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      deferredInstallPrompt = event;
      $("#installBtn").classList.add("active");
    });
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
    }
    $("#lang").onchange = (e) => { state.lang = e.target.value; renderText(); };
    function bindTap(selector, handler) {
      const el = typeof selector === "string" ? $(selector) : selector;
      if (!el) return;
      el.addEventListener("click", handler, { passive: true });
      el.addEventListener("touchend", (event) => {
        event.preventDefault();
        handler(event);
      }, { passive: false });
    }
    bindTap("#toSearch", () => setScreen("search"));
    bindTap("#toScan", () => { setScreen("scan"); startCamera(); });
    $$("[data-home]").forEach(btn => bindTap(btn, () => setScreen("home")));
    $("#query").oninput = (e) => { state.query = e.target.value; renderResults(); };
    $("#clear").onclick = () => { state.query = ""; $("#query").value = ""; renderResults(); };
    bindTap("#cameraBtn", startCamera);
    bindTap("#detectBtn", detectFood);
    bindTap("#installBtn", async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice.catch(() => null);
      deferredInstallPrompt = null;
      $("#installBtn").classList.remove("active");
    });
    renderPlatformInstall();
    renderText();
  </script>
</body>
</html>`;

const manifest = {
  name: "K-Bite Guide",
  short_name: "K-Bite",
  description: "Mobile guide for eating Korean food with search, camera scan flow, and Korean staff phrases.",
  start_url: "/",
  scope: "/",
  display: "standalone",
  orientation: "portrait",
  background_color: "#17120d",
  theme_color: "#101419",
  categories: ["food", "travel", "education"],
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }
  ],
};

const icon = String.raw`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#17120d"/>
  <circle cx="360" cy="132" r="74" fill="#f4d06f"/>
  <path d="M96 344c72-148 200-182 320-120-44 128-166 190-320 120Z" fill="#9fbda8"/>
  <path d="M154 330c52-64 128-92 220-76" fill="none" stroke="#b94a36" stroke-width="28" stroke-linecap="round"/>
  <text x="256" y="316" text-anchor="middle" font-size="118" font-family="Arial, sans-serif" font-weight="800" fill="#fff7ea">K</text>
</svg>`;

const serviceWorker = String.raw`const CACHE = "k-bite-guide-v6";
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(["/", "/manifest.webmanifest", "/icon.svg"])));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request).then(response => response || caches.match("/"))));
});`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/manifest.webmanifest") {
      return new Response(JSON.stringify(manifest), {
        headers: { "content-type": "application/manifest+json; charset=utf-8" },
      });
    }
    if (url.pathname === "/icon.svg") {
      return new Response(icon, {
        headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400" },
      });
    }
    if (url.pathname === "/sw.js") {
      return new Response(serviceWorker, {
        headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-cache" },
      });
    }
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "permissions-policy": "camera=*",
      },
    });
  },
};
