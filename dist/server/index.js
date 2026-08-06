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
  <meta name="description" content="Free mobile guide for foreign visitors learning how to eat Korean food, remix local sauces, share their own Korean-style bite, and ask restaurant staff in Korean.">
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
    .campaign-card, .sponsor-card {
      display: grid;
      gap: 12px;
      border: 1px solid rgba(244,208,111,.24);
      border-radius: 20px;
      background:
        linear-gradient(135deg, rgba(244,208,111,.12), rgba(25,77,71,.18)),
        rgba(36,26,19,.82);
      padding: 14px;
    }
    .campaign-card {
      margin-top: 2px;
    }
    .campaign-kicker, .sponsor-kicker {
      color: var(--primary);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .campaign-title {
      font-size: 19px;
      line-height: 1.18;
      font-weight: 850;
    }
    .campaign-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .campaign-step {
      min-height: 74px;
      border: 1px solid rgba(255,255,255,.1);
      border-radius: 15px;
      background: rgba(255,255,255,.045);
      padding: 9px;
      color: var(--muted);
      font-size: 12px;
      line-height: 1.35;
    }
    .campaign-step strong {
      display: block;
      margin-bottom: 3px;
      color: var(--text);
      font-size: 13px;
    }
    .campaign-note, .sponsor-copy {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
    }
    .sponsor-card {
      border-color: rgba(159,189,168,.34);
      background:
        linear-gradient(135deg, rgba(159,189,168,.14), rgba(185,74,54,.12)),
        rgba(16,22,29,.9);
    }
    .sponsor-banner {
      gap: 8px;
      border-radius: 14px;
      padding: 11px 12px;
      background: rgba(28,32,29,.78);
    }
    .sponsor-banner .sponsor-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items: center;
    }
    .sponsor-banner .sponsor-name {
      font-size: 13px;
    }
    .sponsor-banner .sponsor-copy,
    .sponsor-banner .campaign-note {
      font-size: 12px;
      line-height: 1.35;
    }
    .sponsor-banner .sponsor-tags {
      gap: 5px;
    }
    .sponsor-banner .sponsor-tag {
      padding: 4px 7px;
      font-size: 11px;
    }
    .sponsor-banner .partner-cta {
      width: auto;
      min-height: 34px;
      padding: 8px 10px;
      white-space: nowrap;
    }
    .sponsor-name {
      font-weight: 850;
      line-height: 1.2;
    }
    .sponsor-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
    .sponsor-tag {
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px;
      padding: 6px 8px;
      color: var(--text);
      background: rgba(255,255,255,.05);
      font-size: 12px;
    }
    .partner-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-decoration: none;
    }
    .search-empty {
      min-height: 156px;
      margin-top: clamp(56px, 16vh, 118px);
      align-content: center;
    }
    .search-empty.active-search {
      min-height: 104px;
      margin-top: 8px;
      padding: 11px 12px;
      gap: 8px;
    }
    .search-empty.active-search .campaign-title {
      font-size: 16px;
    }
    .search-empty.active-search .sponsor-copy,
    .search-empty.active-search .sponsor-tags {
      display: none;
    }
    .search-empty.hidden {
      display: none;
    }
    .challenge-grid, .submit-form, .vote-list {
      display: grid;
      gap: 10px;
    }
    #challenge {
      gap: 10px;
    }
    .challenge-hero {
      gap: 9px;
      padding: 12px;
    }
    .challenge-hero .campaign-title {
      font-size: 18px;
    }
    .challenge-hero .campaign-note {
      font-size: 12px;
    }
    .challenge-hero .campaign-steps {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .challenge-hero .campaign-step {
      min-height: 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 6px;
      padding: 7px 8px;
    }
    .challenge-hero .campaign-step strong {
      margin: 0;
      white-space: nowrap;
    }
    .challenge-submit {
      padding: 12px;
    }
    .challenge-submit .submit-form {
      gap: 8px;
    }
    .challenge-submit .field textarea {
      min-height: 66px;
    }
    .challenge-meta {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }
    .challenge-meta .theme-card,
    .challenge-meta .sponsor-card {
      padding: 11px;
    }
    .challenge-partner {
      gap: 8px;
    }
    .challenge-partner h3 {
      font-size: 16px;
    }
    .theme-card {
      border: 1px solid rgba(244,208,111,.28);
      border-radius: 18px;
      background: rgba(244,208,111,.09);
      padding: 13px;
    }
    .field {
      display: grid;
      gap: 6px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
    }
    .field input, .field textarea, .field select {
      width: 100%;
      max-width: none;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #10161d;
      color: var(--text);
      padding: 11px 12px;
    }
    .field textarea {
      min-height: 86px;
      resize: vertical;
      line-height: 1.45;
    }
    .criteria-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }
    .criteria-pill {
      min-height: 0;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 12px;
      background: rgba(255,255,255,.045);
      padding: 7px;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.25;
    }
    .criteria-pill strong {
      display: block;
      color: var(--text);
      font-size: 12px;
    }
    .vote-card {
      display: grid;
      gap: 8px;
      border: 1px solid var(--line);
      border-radius: 17px;
      background: rgba(255,255,255,.04);
      padding: 12px;
    }
    .vote-head {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 10px;
    }
    .vote-score {
      min-width: 48px;
      border-radius: 999px;
      background: var(--primary);
      color: var(--primary-text);
      padding: 6px 9px;
      text-align: center;
      font-weight: 850;
      font-size: 13px;
    }
    .vote-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
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
    .ad-slot {
      display: none;
      place-items: center;
      min-height: 78px;
      border: 1px dashed rgba(244,208,111,.28);
      border-radius: 18px;
      background: rgba(255,255,255,.035);
      color: rgba(216,195,165,.72);
      font-size: 12px;
      text-align: center;
    }
    .phrase-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .phrase-chip {
      border: 1px solid var(--line);
      color: var(--text);
      background: rgba(255,255,255,.055);
      border-radius: 999px;
      padding: 8px 10px;
      font-size: 13px;
    }
    .phrase-chip {
      border-radius: 14px;
      text-align: left;
      line-height: 1.3;
    }
    .result-count, .demo-note {
      color: var(--muted);
      font-size: 12px;
      line-height: 1.4;
      margin: 0;
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
    .result-count, .demo-note {
      color: var(--muted);
      font-size: 13px;
      line-height: 1.45;
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
      min-height: 48px;
      display: block;
      align-items: center;
      text-align: left;
      border: 1px solid var(--line);
      background: var(--panel);
      color: var(--text);
      border-radius: 14px;
      padding: 12px 13px;
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
      gap: 8px;
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
    .translation-card {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 8px;
      align-items: center;
      background: #10161d;
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 10px;
    }
    .translation-card .korean {
      border: 0;
      background: transparent;
      padding: 0;
    }
    .translation-card .meaning {
      margin-top: 3px;
      font-size: 13px;
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
    button:disabled {
      opacity: .48;
    }
    .footer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      padding: 10px 0 4px;
      color: var(--muted);
      font-size: 12px;
    }
    .footer a {
      color: var(--muted);
      text-decoration: none;
      border-bottom: 1px solid rgba(216,195,165,.35);
    }
    @media (max-width: 360px) {
      h1 { font-size: 35px; }
      .app { padding-left: 12px; padding-right: 12px; }
      .askline, .scan-actions { grid-template-columns: 1fr; }
      .sponsor-banner .sponsor-row { grid-template-columns: 1fr; }
      .sponsor-banner .partner-cta { width: 100%; }
      .campaign-steps { grid-template-columns: 1fr; }
      .criteria-grid, .vote-actions { grid-template-columns: 1fr; }
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
          <option value="ko">한국어</option>
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
      <div class="ad-slot" data-ad-slot>
        <span data-i="adLabel">Ad space reserved</span>
      </div>
    </section>

    <section class="screen" id="challenge">
      <div class="navline">
        <button class="back" data-home>← <span data-i="home"></span></button>
        <span class="chip" data-i="challengeChip">Bite challenge</span>
      </div>
      <section class="campaign-card challenge-hero">
        <span class="campaign-kicker" data-i="challengeKicker">This month's theme</span>
        <h2 class="campaign-title" data-i="challengeTheme">Best samgyeopsal one-bite wrap</h2>
        <p class="campaign-note" data-i="challengeIntro">Learn the Korean method first, then submit your own sauce, wrap, crunch, or pairing idea. The winner is chosen by useful votes, not only popularity.</p>
        <div class="campaign-steps">
          <span class="campaign-step"><strong data-i="challengeRule1Title">1. Start Korean</strong><span data-i="challengeRule1">Use the guide's classic eating method as the base.</span></span>
          <span class="campaign-step"><strong data-i="challengeRule2Title">2. Remix one thing</strong><span data-i="challengeRule2">Change the sauce, wrap, side, texture, or final bite.</span></span>
          <span class="campaign-step"><strong data-i="challengeRule3Title">3. Win by votes</strong><span data-i="challengeRule3">Users vote for taste, ease, Korean fit, and creativity.</span></span>
        </div>
      </section>
      <section class="sponsor-card challenge-submit">
        <span class="sponsor-kicker" data-i="submitKicker">Create your bite</span>
        <div class="submit-form">
          <label class="field"><span data-i="submitDish">Dish or product</span><input id="challengeDish" type="text" autocomplete="off" placeholder="Samgyeopsal, bibimbap, tteokbokki..."></label>
          <label class="field"><span data-i="submitName">Bite name</span><input id="challengeName" type="text" autocomplete="off" placeholder="Kimchi crunch ssam"></label>
          <label class="field"><span data-i="submitMethod">Your method</span><textarea id="challengeMethod" placeholder="Use ssamjang, grilled kimchi, garlic, and one small crisp side. Eat in one bite."></textarea></label>
          <button class="primary-btn" id="submitChallenge" type="button" data-i="submitButton">Submit to the vote board</button>
        </div>
      </section>
      <div class="challenge-meta">
        <section class="theme-card">
          <h3 data-i="voteCriteriaTitle">Voting criteria</h3>
          <div class="criteria-grid">
            <span class="criteria-pill"><strong data-i="criteriaTaste">Taste</strong><span data-i="criteriaTasteCopy">Would people want another bite?</span></span>
            <span class="criteria-pill"><strong data-i="criteriaEasy">Easy to try</strong><span data-i="criteriaEasyCopy">Can a traveler copy it at the table?</span></span>
            <span class="criteria-pill"><strong data-i="criteriaKorean">Korean fit</strong><span data-i="criteriaKoreanCopy">Does it respect the original way?</span></span>
            <span class="criteria-pill"><strong data-i="criteriaCreative">Creative</strong><span data-i="criteriaCreativeCopy">Does it add a memorable twist?</span></span>
          </div>
        </section>
        <section class="sponsor-card challenge-partner">
          <span class="sponsor-kicker" data-i="brandKicker">For partners</span>
          <h3 data-i="brandTitle">Sponsor a theme, not just a banner.</h3>
          <p class="sponsor-copy" data-i="brandCopy">A restaurant can own a house-sauce challenge. A food company can sponsor a gochujang, kimchi, noodle, snack, or frozen-food pairing and reward the winning bite.</p>
          <div class="sponsor-tags">
            <span class="sponsor-tag" data-i="brandTag1">Monthly theme</span>
            <span class="sponsor-tag" data-i="brandTag2">Winning bite</span>
            <span class="sponsor-tag" data-i="brandTag3">Reward coupon</span>
          </div>
        </section>
      </div>
      <section class="sponsor-card">
        <span class="sponsor-kicker" data-i="leaderKicker">Vote board</span>
        <div class="theme-card" id="currentWinner"></div>
        <div class="vote-list" id="challengeEntries"></div>
      </section>
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
      <p class="result-count" id="resultCount"></p>
      <div class="list" id="results"></div>
      <section class="search-empty sponsor-card" id="searchEmpty" aria-label="Restaurant and food brand advertising">
        <span class="sponsor-kicker" data-i="searchAdKicker">Sponsor space</span>
        <h2 class="campaign-title" data-i="searchAdTitle">Own the first empty moment before guests choose a dish.</h2>
        <p class="sponsor-copy" data-i="searchAdCopy">Restaurants can feature a house sauce or signature bite here. Food brands can sponsor a pairing challenge before visitors search.</p>
        <div class="sponsor-tags">
          <span class="sponsor-tag" data-i="searchAdTag1">House sauce</span>
          <span class="sponsor-tag" data-i="searchAdTag2">Limited reward</span>
          <span class="sponsor-tag" data-i="searchAdTag3">Brand pairing</span>
        </div>
        <a class="primary-btn partner-cta" href="/partners" data-i="partnerCta">Partner with K-Bite</a>
      </section>
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
      <p class="demo-note" data-i="demoNote"></p>
      <p class="muted" id="scanStatus"></p>
      <article class="detail" id="scanDetail"></article>
    </section>
    <footer class="footer">
      <a href="/about">About</a>
      <a href="/privacy">Privacy</a>
      <a href="/partners">Partners</a>
      <a href="/contact">Contact</a>
    </footer>
  </main>

  <script>
    const ui = {
      en: { homeCopy: "Find the Korean dish in front of you, then learn exactly how to eat it.", homeTitle: "Eat Korean food with confidence", homeSupport: "Search by name or scan the food to see the right steps, sauces, and Korean staff phrases.", searchFood: "Search food", searchSub: "Search by dish, sauce, ingredient, or eating action", scanMenu: "Scan food", scanSub: "Use the camera to identify food and open its guide", home: "Home", foodSearch: "Food search", foodScan: "Food scan", scanCopy: "Point the camera at the food. After detection, the dish name and how-to guide appear below.", cameraHint: "Camera preview appears here", startCamera: "Start camera", detectFood: "Detect food", cameraBlocked: "Camera permission is blocked here. On iPhone, open the HTTPS link in Safari and allow camera access.", analyzing: "Analyzing the camera frame...", detected: "Detected", how: "How to eat", ask: "Ask staff in Korean", askPlaceholder: "Type a question, e.g. Is this fully cooked?", translate: "Translate", play: "Play Korean", suggestion: "Suggested phrase", searchPlaceholder: "Try pork belly, egg, raw fish, tofu...", installTitle: "Install on your phone", installIOS: "iPhone: open in Safari, tap Share, then Add to Home Screen.", installAndroid: "Android: open in Chrome, tap Install app or Add to Home screen.", installOther: "Use this as a mobile web app on iPhone Safari or Android Chrome.", installButton: "Install app", adLabel: "Ad space reserved" },
      ja: { homeCopy: "目の前の韓国料理を見つけて、正しい食べ方を確認できます。", homeTitle: "韓国料理を安心して楽しむ", homeSupport: "料理名で検索、または料理をスキャンして、食べ方・ソース・韓国語フレーズを確認できます。", searchFood: "料理を検索", searchSub: "料理名、ソース、食材、食べ方で検索", scanMenu: "料理をスキャン", scanSub: "カメラで料理を認識してガイドを表示", home: "ホーム", foodSearch: "料理検索", foodScan: "料理スキャン", scanCopy: "料理にカメラを向けます。認識後、料理名と食べ方が下に表示されます。", cameraHint: "ここにカメラ画面が表示されます", startCamera: "カメラ開始", detectFood: "料理を認識", cameraBlocked: "この環境ではカメラ許可がブロックされています。iPhoneではHTTPSリンクをSafariで開いて許可してください。", analyzing: "カメラ画像を解析中...", detected: "認識結果", how: "食べ方", ask: "韓国語で店員に質問", askPlaceholder: "質問を入力。例：これは火が通っていますか？", translate: "翻訳", play: "韓国語を再生", suggestion: "おすすめ文", searchPlaceholder: "豚バラ、卵、刺身、豆腐など", installTitle: "スマートフォンにインストール", installIOS: "iPhone: Safariで開き、共有からホーム画面に追加します。", installAndroid: "Android: Chromeで開き、アプリをインストールまたはホーム画面に追加します。", installOther: "iPhone SafariまたはAndroid Chromeでモバイルアプリとして使えます。", installButton: "アプリをインストール" },
      zhCN: { homeCopy: "找到眼前的韩国料理，并学习正确吃法。", homeTitle: "放心享受韩国料理", homeSupport: "按名称搜索或扫描食物，查看正确步骤、酱料和韩语店员用语。", searchFood: "搜索菜品", searchSub: "按菜名、酱料、食材或吃法搜索", scanMenu: "扫描食物", scanSub: "用相机识别食物并打开指南", home: "首页", foodSearch: "菜品搜索", foodScan: "食物扫描", scanCopy: "把镜头对准食物。识别后，菜名和吃法会显示在下方。", cameraHint: "相机画面会显示在这里", startCamera: "开启相机", detectFood: "识别食物", cameraBlocked: "此环境可能阻止相机权限。在 iPhone 上请用 Safari 打开 HTTPS 链接并允许相机。", analyzing: "正在分析相机画面...", detected: "识别结果", how: "怎么吃", ask: "用韩语问店员", askPlaceholder: "输入问题，例如：这个熟了吗？", translate: "翻译", play: "播放韩语", suggestion: "推荐句", searchPlaceholder: "试试五花肉、鸡蛋、生鱼片、豆腐", installTitle: "安装到手机", installIOS: "iPhone：用 Safari 打开，点分享，然后添加到主屏幕。", installAndroid: "Android：用 Chrome 打开，点安装应用或添加到主屏幕。", installOther: "可在 iPhone Safari 或 Android Chrome 上作为手机网页应用使用。", installButton: "安装应用" },
      zhTW: { homeCopy: "找到眼前的韓國料理，並學習正確吃法。", homeTitle: "放心享受韓國料理", homeSupport: "按名稱搜尋或掃描食物，查看正確步驟、醬料和韓語店員用語。", searchFood: "搜尋菜色", searchSub: "按菜名、醬料、食材或吃法搜尋", scanMenu: "掃描食物", scanSub: "用相機辨識食物並開啟指南", home: "首頁", foodSearch: "菜色搜尋", foodScan: "食物掃描", scanCopy: "把鏡頭對準食物。辨識後，菜名和吃法會顯示在下方。", cameraHint: "相機畫面會顯示在這裡", startCamera: "開啟相機", detectFood: "辨識食物", cameraBlocked: "此環境可能阻止相機權限。在 iPhone 上請用 Safari 開啟 HTTPS 連結並允許相機。", analyzing: "正在分析相機畫面...", detected: "辨識結果", how: "怎麼吃", ask: "用韓語問店員", askPlaceholder: "輸入問題，例如：這個熟了嗎？", translate: "翻譯", play: "播放韓語", suggestion: "推薦句", searchPlaceholder: "試試五花肉、雞蛋、生魚片、豆腐", installTitle: "安裝到手機", installIOS: "iPhone：用 Safari 開啟，點分享，然後加入主畫面。", installAndroid: "Android：用 Chrome 開啟，點安裝應用程式或加入主畫面。", installOther: "可在 iPhone Safari 或 Android Chrome 上作為手機網頁應用使用。", installButton: "安裝應用程式" },
      fil: { homeCopy: "Hanapin ang Korean food sa harap mo at alamin kung paano ito kainin nang tama.", homeTitle: "Kumain ng Korean food nang may kumpiyansa", homeSupport: "Mag-search o mag-scan ng pagkain para makita ang tamang hakbang, sawsawan, at Korean phrases.", searchFood: "Search food", searchSub: "Maghanap ayon sa dish, sawsawan, sangkap, o paraan ng pagkain", scanMenu: "Scan food", scanSub: "Gamitin ang camera para makilala ang pagkain at buksan ang guide", home: "Home", foodSearch: "Food search", foodScan: "Food scan", scanCopy: "Itutok ang camera sa pagkain. Kapag nakita, lalabas ang pangalan at gabay kung paano kainin.", cameraHint: "Dito lalabas ang camera preview", startCamera: "Start camera", detectFood: "Detect food", cameraBlocked: "Naka-block ang camera permission dito. Sa iPhone, buksan ang HTTPS link sa Safari at payagan ang camera.", analyzing: "Sinusuri ang camera frame...", detected: "Nakita", how: "Paano kainin", ask: "Magtanong sa staff sa Korean", askPlaceholder: "Mag-type ng tanong, hal. Luto na ba ito?", translate: "Translate", play: "I-play ang Korean", suggestion: "Suggested phrase", searchPlaceholder: "Subukan: pork belly, egg, raw fish, tofu...", installTitle: "I-install sa phone", installIOS: "iPhone: buksan sa Safari, tap Share, tapos Add to Home Screen.", installAndroid: "Android: buksan sa Chrome, tap Install app o Add to Home screen.", installOther: "Gamitin ito bilang mobile web app sa iPhone Safari o Android Chrome.", installButton: "Install app" },
      th: { homeCopy: "ค้นหาอาหารเกาหลีตรงหน้าคุณ แล้วเรียนรู้วิธีกินที่ถูกต้อง", homeTitle: "กินอาหารเกาหลีอย่างมั่นใจ", homeSupport: "ค้นหาชื่ออาหารหรือสแกนอาหารเพื่อดูขั้นตอน ซอส และประโยคภาษาเกาหลีสำหรับถามพนักงาน", searchFood: "ค้นหาอาหาร", searchSub: "ค้นหาด้วยชื่ออาหาร ซอส วัตถุดิบ หรือวิธีกิน", scanMenu: "สแกนอาหาร", scanSub: "ใช้กล้องระบุอาหารและเปิดคู่มือ", home: "หน้าแรก", foodSearch: "ค้นหาอาหาร", foodScan: "สแกนอาหาร", scanCopy: "หันกล้องไปที่อาหาร หลังจากตรวจจับแล้ว ชื่ออาหารและวิธีกินจะแสดงด้านล่าง", cameraHint: "ตัวอย่างภาพจากกล้องจะแสดงที่นี่", startCamera: "เปิดกล้อง", detectFood: "ตรวจจับอาหาร", cameraBlocked: "สิทธิ์กล้องถูกบล็อก ใน iPhone ให้เปิดลิงก์ HTTPS ด้วย Safari แล้วอนุญาตกล้อง", analyzing: "กำลังวิเคราะห์ภาพจากกล้อง...", detected: "ตรวจพบ", how: "วิธีกิน", ask: "ถามพนักงานเป็นภาษาเกาหลี", askPlaceholder: "พิมพ์คำถาม เช่น สุกแล้วหรือยัง?", translate: "แปล", play: "เล่นเสียงเกาหลี", suggestion: "ประโยคแนะนำ", searchPlaceholder: "ลองค้นหา หมูสามชั้น ไข่ ปลาดิบ เต้าหู้...", installTitle: "ติดตั้งบนโทรศัพท์", installIOS: "iPhone: เปิดใน Safari แตะแชร์ แล้วเลือกเพิ่มไปยังหน้าจอโฮม", installAndroid: "Android: เปิดใน Chrome แล้วแตะติดตั้งแอปหรือเพิ่มไปยังหน้าจอโฮม", installOther: "ใช้เป็นเว็บแอปบนมือถือได้ใน iPhone Safari หรือ Android Chrome", installButton: "ติดตั้งแอป" },
      vi: { homeCopy: "Tìm món Hàn trước mặt bạn, rồi xem chính xác cách ăn.", homeTitle: "Tự tin ăn món Hàn", homeSupport: "Tìm theo tên món hoặc quét món ăn để xem các bước, nước chấm và câu hỏi tiếng Hàn.", searchFood: "Tìm món ăn", searchSub: "Tìm theo món, sốt, nguyên liệu hoặc cách ăn", scanMenu: "Quét món ăn", scanSub: "Dùng camera để nhận diện món và mở hướng dẫn", home: "Trang chủ", foodSearch: "Tìm món", foodScan: "Quét món", scanCopy: "Hướng camera vào món ăn. Sau khi nhận diện, tên món và cách ăn sẽ hiện bên dưới.", cameraHint: "Khung xem camera sẽ hiện ở đây", startCamera: "Mở camera", detectFood: "Nhận diện món", cameraBlocked: "Quyền camera đang bị chặn. Trên iPhone, mở liên kết HTTPS bằng Safari và cho phép camera.", analyzing: "Đang phân tích hình ảnh camera...", detected: "Đã nhận diện", how: "Cách ăn", ask: "Hỏi nhân viên bằng tiếng Hàn", askPlaceholder: "Nhập câu hỏi, ví dụ: Món này chín chưa?", translate: "Dịch", play: "Phát tiếng Hàn", suggestion: "Câu gợi ý", searchPlaceholder: "Thử tìm thịt ba chỉ, trứng, cá sống, đậu phụ...", installTitle: "Cài vào điện thoại", installIOS: "iPhone: mở bằng Safari, chạm Chia sẻ, rồi Thêm vào Màn hình chính.", installAndroid: "Android: mở bằng Chrome, chạm Cài đặt ứng dụng hoặc Thêm vào màn hình chính.", installOther: "Dùng như ứng dụng web di động trên iPhone Safari hoặc Android Chrome.", installButton: "Cài ứng dụng" }
    };

    ui.ko = {
      homeCopy: "앞에 있는 한국 음식을 찾고, 한국식으로 먹는 정확한 방법을 배워보세요.",
      homeTitle: "한국 음식을 자신 있게 먹기",
      homeSupport: "음식 이름을 검색하거나 촬영해서 먹는 순서, 소스, 직원에게 물어볼 한국어 표현을 확인하세요.",
      searchFood: "음식 검색",
      searchSub: "음식, 소스, 재료, 먹는 행동으로 검색",
      scanMenu: "음식 스캔",
      scanSub: "카메라로 음식을 인식하고 가이드를 엽니다",
      home: "홈",
      foodSearch: "음식 검색",
      foodScan: "음식 스캔",
      scanCopy: "카메라를 음식에 맞추세요. 인식 후 음식 이름과 먹는 법이 아래에 표시됩니다.",
      cameraHint: "카메라 미리보기가 여기에 표시됩니다",
      startCamera: "카메라 시작",
      detectFood: "음식 인식",
      cameraBlocked: "카메라 권한이 차단되었습니다. iPhone에서는 HTTPS 링크를 Safari로 열고 카메라 접근을 허용하세요.",
      analyzing: "카메라 화면을 분석하는 중...",
      detected: "인식됨",
      how: "한국식으로 먹는 방법",
      ask: "직원에게 한국어로 묻기",
      askPlaceholder: "질문을 입력하세요. 예: 이거 다 익었나요?",
      translate: "번역",
      play: "한국어 재생",
      suggestion: "추천 표현",
      searchPlaceholder: "삼겹살, 계란, 회, 두부처럼 입력해보세요...",
      installTitle: "휴대폰에 설치",
      installIOS: "iPhone: Safari에서 열고 공유 버튼을 누른 뒤 홈 화면에 추가하세요.",
      installAndroid: "Android: Chrome에서 열고 앱 설치 또는 홈 화면에 추가를 누르세요.",
      installOther: "iPhone Safari 또는 Android Chrome에서 모바일 웹앱처럼 사용할 수 있습니다.",
      installButton: "앱 설치",
      adLabel: "광고 공간",
      chooseLanguage: "언어 선택",
      quickSearch: "빠른 검색",
      resultsFound: "개 음식",
      quickQuestions: "빠른 질문",
      scanNeedsCamera: "먼저 카메라를 시작한 뒤 음식을 인식하세요.",
      demoResult: "데모 결과",
      demoNote: "이 미리보기의 카메라 인식은 데모입니다. 실제 AI 음식 인식은 운영 버전에서 연결할 수 있습니다.",
      eventKicker: "월간 챌린지",
      eventTitle: "한국식으로 먹고, 나만의 조합을 만들고, 공유해서 우승하세요.",
      eventCopy: "먼저 한국식 기본 방법을 배운 뒤, 소스·쌈·식감·사이드 조합을 바꿔 나만의 한입을 올려보세요.",
      eventStep1Title: "맛보기",
      eventStep1: "식당 추천 소스나 기본 조합부터 시작하세요.",
      eventStep2Title: "만들기",
      eventStep2: "쌈, 찍먹, 비빔, 바삭함, 페어링 중 하나를 바꿔보세요.",
      eventStep3Title: "공유",
      eventStep3: "방법을 올리고 반응을 받아 우승 조합에 도전하세요.",
      eventButton: "나만의 조합 만들기",
      sponsorKicker: "광고/파트너 공간",
      sponsorTitle: "이 음식의 추천 로컬 방식",
      sponsorCopy: "식당과 식품 브랜드는 이 위치에 실제 하우스 소스, 대표 조합, 한정 보상을 노출할 수 있습니다.",
      sponsorAsk: "질문: 이 식당만의 가장 맛있는 소스나 특별한 먹는 법은 무엇인가요?",
      searchIdle: "검색어를 입력하면 음식 목록이 자동으로 나타납니다.",
      searchAdKicker: "광고 공간",
      searchAdTitle: "손님이 음식을 고르기 전 첫 화면을 선점하세요.",
      searchAdCopy: "식당은 하우스 소스나 대표 한입을, 식품 브랜드는 검색 전 페어링 챌린지를 노출할 수 있습니다.",
      searchAdTag1: "하우스 소스",
      searchAdTag2: "한정 보상",
      searchAdTag3: "브랜드 조합",
      challengeChip: "한입 챌린지",
      challengeKicker: "이달의 주제",
      challengeTheme: "최고의 삼겹살 한입 쌈",
      challengeIntro: "한국식 기본 방법을 먼저 배운 뒤 나만의 소스, 쌈, 식감, 페어링 아이디어를 올리세요. 우승은 단순 인기보다 유용한 반응으로 결정됩니다.",
      challengeRule1Title: "1. 한국식 먼저",
      challengeRule1: "가이드의 기본 먹는 법을 출발점으로 사용합니다.",
      challengeRule2Title: "2. 한 가지만 변형",
      challengeRule2: "소스, 쌈, 사이드, 식감, 마지막 한입 중 하나를 바꿉니다.",
      challengeRule3Title: "3. 반응으로 우승",
      challengeRule3: "맛, 따라하기 쉬움, 한국식 적합성, 창의성 기준으로 반응을 받습니다.",
      submitKicker: "내 조합 올리기",
      submitDish: "음식 또는 제품",
      submitName: "조합 이름",
      submitMethod: "먹는 방법",
      submitButton: "투표 보드에 올리기",
      voteCriteriaTitle: "투표 기준",
      criteriaTaste: "맛",
      criteriaTasteCopy: "한입 더 먹고 싶게 만드는가?",
      criteriaEasy: "따라하기 쉬움",
      criteriaEasyCopy: "여행자가 식탁에서 바로 따라할 수 있는가?",
      criteriaKorean: "한국식 적합성",
      criteriaKoreanCopy: "원래 먹는 법을 존중하는가?",
      criteriaCreative: "창의성",
      criteriaCreativeCopy: "기억에 남는 변형이 있는가?",
      leaderKicker: "투표 보드",
      winnerKicker: "현재 우승 후보",
      winnerCopy: "리뷰 반응과 투표가 가장 높은 조합입니다.",
      brandKicker: "파트너 제안",
      brandTitle: "배너가 아니라 주제를 후원하세요.",
      brandCopy: "식당은 하우스 소스 챌린지를, 식품업체는 고추장·김치·면·스낵·냉동식품 조합 챌린지를 후원하고 우승자에게 보상을 제공할 수 있습니다.",
      brandTag1: "월간 주제",
      brandTag2: "우승 한입",
      brandTag3: "보상 쿠폰",
      voteUseful: "유용해요",
      voteCreative: "창의적이에요",
      noEntries: "아직 조합이 없습니다. 첫 조합을 올려보세요."
    };

    Object.assign(ui.en, {
      chooseLanguage: "Choose your language",
      quickSearch: "Quick search",
      resultsFound: "dishes found",
      quickQuestions: "Quick questions",
      scanNeedsCamera: "Start the camera first, then detect the food.",
      demoResult: "Demo result",
      demoNote: "Camera recognition is a guided demo in this preview. Real AI food recognition can be connected for production.",
      eventKicker: "Monthly challenge",
      eventTitle: "Eat it Korean style. Create your own way. Share it to win.",
      eventCopy: "Try the house sauce, make your own best bite, and share it with K-Bite. The most useful and delicious idea becomes a featured winning bite.",
      eventStep1Title: "Taste",
      eventStep1: "Start with the restaurant's recommended sauce or product pairing.",
      eventStep2Title: "Create",
      eventStep2: "Build your own bite: wrap, dip, mix, crunch, or pair.",
      eventStep3Title: "Share",
      eventStep3: "Post your method. Best bite wins a feature and local rewards.",
      eventButton: "Find a bite to remix",
      sponsorKicker: "Ad-free K-Bite",
      sponsorTitle: "Remove ads while you eat",
      sponsorCopy: "Pay a small traveler fee to keep food guides cleaner during meals. Restaurant and brand offers stay out of your way.",
      sponsorAsk: "Ask: What is this restaurant's best sauce or special way to eat it?",
      sponsorBiteName: "Cleaner guide for {dish}",
      sponsorTagHouse: "Low cost",
      sponsorTagLocal: "Cleaner screen",
      sponsorTagRemix: "Travel mode",
      searchIdle: "Start typing to search dishes automatically.",
      searchAdKicker: "Sponsor space",
      searchAdTitle: "Own the first empty moment before guests choose a dish.",
      searchAdCopy: "Restaurants can feature a house sauce or signature bite here. Food brands can sponsor a pairing challenge before visitors search.",
      searchAdTag1: "House sauce",
      searchAdTag2: "Limited reward",
      searchAdTag3: "Brand pairing",
      partnerCta: "Partner with K-Bite",
      sponsorCta: "Remove ads",
      challengeSponsorCta: "Sponsor a challenge theme",
      challengeChip: "Bite challenge",
      challengeKicker: "This month's theme",
      challengeTheme: "Best samgyeopsal one-bite wrap",
      challengeIntro: "Learn the Korean method first, then submit your own sauce, wrap, crunch, or pairing idea. The winner is chosen by useful votes, not only popularity.",
      challengeRule1Title: "1. Start Korean",
      challengeRule1: "Use the guide's classic eating method as the base.",
      challengeRule2Title: "2. Remix one thing",
      challengeRule2: "Change the sauce, wrap, side, texture, or final bite.",
      challengeRule3Title: "3. Win by votes",
      challengeRule3: "Users vote for taste, ease, Korean fit, and creativity.",
      submitKicker: "Create your bite",
      submitDish: "Dish or product",
      submitName: "Bite name",
      submitMethod: "Your method",
      submitButton: "Submit to the vote board",
      voteCriteriaTitle: "Voting criteria",
      criteriaTaste: "Taste",
      criteriaTasteCopy: "Would people want another bite?",
      criteriaEasy: "Easy to try",
      criteriaEasyCopy: "Can a traveler copy it at the table?",
      criteriaKorean: "Korean fit",
      criteriaKoreanCopy: "Does it respect the original way?",
      criteriaCreative: "Creative",
      criteriaCreativeCopy: "Does it add a memorable twist?",
      leaderKicker: "Vote board",
      winnerKicker: "Current winner",
      winnerCopy: "This bite has the strongest review reaction and vote response so far.",
      brandKicker: "For partners",
      brandTitle: "Sponsor a theme, not just a banner.",
      brandCopy: "A restaurant can own a house-sauce challenge. A food company can sponsor a gochujang, kimchi, noodle, snack, or frozen-food pairing and reward the winning bite.",
      brandTag1: "Monthly theme",
      brandTag2: "Winning bite",
      brandTag3: "Reward coupon",
      voteUseful: "Useful",
      voteCreative: "Creative",
      noEntries: "No bites yet. Submit the first remix."
    });

    Object.assign(ui.ko, {
      eventKicker: "월간 챌린지",
      eventTitle: "한국식으로 먹고, 나만의 방식으로 만들고, 공유해서 우승하세요.",
      eventCopy: "먼저 한국식 기본 방법을 배운 뒤 소스, 쌈, 식감, 사이드 조합을 바꿔 나만의 한입을 올려보세요.",
      eventButton: "나만의 조합 만들기",
      sponsorKicker: "광고 제거",
      sponsorTitle: "식사 중 광고 없이 보기",
      sponsorCopy: "여행자가 식탁에서 음식 설명에 집중할 수 있도록 저렴한 비용으로 광고를 제거합니다.",
      sponsorBiteName: "{dish} 가이드를 더 깔끔하게 보기",
      sponsorTagHouse: "저가 결제",
      sponsorTagLocal: "깔끔한 화면",
      sponsorTagRemix: "여행 모드",
      sponsorCta: "광고 제거",
      challengeSponsorCta: "챌린지 스폰서 구매",
      challengeChip: "한입 챌린지",
      challengeKicker: "이달의 주제",
      challengeTheme: "최고의 삼겹살 한입 쌈",
      challengeIntro: "한국식 기본 방법을 먼저 배운 뒤 나만의 소스, 쌈, 식감, 페어링 아이디어를 올리세요. 우승은 유용한 반응과 투표로 결정됩니다.",
      submitKicker: "내 조합 올리기",
      submitDish: "음식 또는 제품",
      submitName: "조합 이름",
      submitMethod: "먹는 방법",
      submitButton: "투표 보드에 올리기",
      voteCriteriaTitle: "투표 기준",
      leaderKicker: "투표 보드",
      winnerKicker: "현재 우승 후보",
      winnerCopy: "현재 가장 강한 리뷰 반응과 투표를 받은 조합입니다.",
      brandKicker: "파트너 제안",
      brandTitle: "배너가 아니라 주제를 후원하세요.",
      brandCopy: "식당은 하우스 소스 챌린지를, 식품 업체는 고추장, 김치, 면, 스낵, 간편식 조합 챌린지를 후원하고 우승자에게 보상을 제공할 수 있습니다.",
      voteUseful: "유용해요",
      voteCreative: "창의적이에요",
      noEntries: "아직 조합이 없습니다. 첫 리믹스를 올려보세요."
    });
    Object.assign(ui.ja, { eventKicker: "月間チャレンジ", eventTitle: "韓国式で食べて、自分流に作り、共有して勝ちましょう。", eventCopy: "まず韓国式の基本を学び、ソース、包み方、食感、サイドの組み合わせを変えて自分だけの一口を投稿しましょう。", eventButton: "自分の組み合わせを作る", sponsorKicker: "広告を非表示", sponsorTitle: "食事中は広告なしで見る", sponsorCopy: "少額の旅行者料金で広告を外し、食卓で料理ガイドに集中できます。", sponsorBiteName: "{dish} ガイドをすっきり表示", sponsorTagHouse: "低価格", sponsorTagLocal: "すっきり画面", sponsorTagRemix: "旅行モード", sponsorCta: "広告を削除", challengeSponsorCta: "テーマをスポンサー", challengeChip: "一口チャレンジ", challengeKicker: "今月のテーマ", challengeTheme: "最高のサムギョプサル一口包み", challengeIntro: "韓国式の基本を学んでから、自分のソース、包み方、食感、ペアリングを投稿しましょう。", submitKicker: "自分の一口を投稿", submitDish: "料理または商品", submitName: "一口の名前", submitMethod: "食べ方", submitButton: "投票ボードへ投稿", voteCriteriaTitle: "投票基準", leaderKicker: "投票ボード", winnerKicker: "現在の優勝候補", winnerCopy: "今もっとも反応と投票が強い一口です。", brandKicker: "パートナー向け", brandTitle: "バナーではなくテーマをスポンサーしましょう。", brandCopy: "飲食店はハウスソースチャレンジを、食品会社は韓国食品の組み合わせチャレンジをスポンサーできます。", voteUseful: "役に立つ", voteCreative: "創造的", noEntries: "まだ投稿がありません。最初のリミックスを投稿しましょう。" });
    Object.assign(ui.zhCN, { eventKicker: "每月挑战", eventTitle: "先按韩国方式吃，再创造自己的吃法，分享赢奖。", eventCopy: "先学习韩国基本吃法，再改变酱料、包法、口感或配菜，提交你的最佳一口。", eventButton: "创建我的组合", sponsorKicker: "去除广告", sponsorTitle: "用餐时无广告查看", sponsorCopy: "支付少量旅行者费用，保持餐桌上的食物指南更清爽。", sponsorBiteName: "{dish} 清爽指南", sponsorTagHouse: "低价", sponsorTagLocal: "清爽界面", sponsorTagRemix: "旅行模式", sponsorCta: "去除广告", challengeSponsorCta: "赞助挑战主题", challengeChip: "一口挑战", challengeKicker: "本月主题", challengeTheme: "最佳五花肉一口包", challengeIntro: "先学习韩国基本吃法，再提交自己的酱料、包法、口感或搭配。", submitKicker: "提交我的组合", submitDish: "菜品或产品", submitName: "组合名称", submitMethod: "吃法", submitButton: "提交到投票板", voteCriteriaTitle: "投票标准", leaderKicker: "投票板", winnerKicker: "当前优胜候选", winnerCopy: "这是目前评论反应和投票最强的组合。", brandKicker: "合作伙伴", brandTitle: "赞助一个主题，而不只是横幅。", brandCopy: "餐厅可以赞助招牌酱挑战，食品公司可以赞助韩食搭配挑战并奖励获胜者。", voteUseful: "有用", voteCreative: "有创意", noEntries: "还没有组合。提交第一个改编吧。" });
    Object.assign(ui.zhTW, { eventKicker: "每月挑戰", eventTitle: "先按韓國方式吃，再創造自己的吃法，分享贏獎。", eventCopy: "先學習韓國基本吃法，再改變醬料、包法、口感或配菜，提交你的最佳一口。", eventButton: "建立我的組合", sponsorKicker: "移除廣告", sponsorTitle: "用餐時無廣告查看", sponsorCopy: "支付少量旅人費用，讓餐桌上的食物指南更清爽。", sponsorBiteName: "{dish} 清爽指南", sponsorTagHouse: "低價", sponsorTagLocal: "清爽畫面", sponsorTagRemix: "旅行模式", sponsorCta: "移除廣告", challengeSponsorCta: "贊助挑戰主題", challengeChip: "一口挑戰", challengeKicker: "本月主題", challengeTheme: "最佳五花肉一口包", challengeIntro: "先學習韓國基本吃法，再提交自己的醬料、包法、口感或搭配。", submitKicker: "提交我的組合", submitDish: "菜色或產品", submitName: "組合名稱", submitMethod: "吃法", submitButton: "提交到投票板", voteCriteriaTitle: "投票標準", leaderKicker: "投票板", winnerKicker: "目前優勝候選", winnerCopy: "這是目前評論反應和投票最強的組合。", brandKicker: "合作夥伴", brandTitle: "贊助一個主題，而不只是橫幅。", brandCopy: "餐廳可以贊助招牌醬挑戰，食品公司可以贊助韓食搭配挑戰並獎勵獲勝者。", voteUseful: "有用", voteCreative: "有創意", noEntries: "還沒有組合。提交第一個改編吧。" });
    Object.assign(ui.fil, { eventKicker: "Monthly challenge", eventTitle: "Kainin muna sa Korean style. Gumawa ng sariling paraan. I-share para manalo.", eventCopy: "Alamin muna ang classic Korean method, pagkatapos baguhin ang sauce, wrap, texture, o pairing para sa sarili mong best bite.", eventButton: "Gumawa ng sariling combo", sponsorKicker: "Ad-free K-Bite", sponsorTitle: "Alisin ang ads habang kumakain", sponsorCopy: "Magbayad ng maliit na traveler fee para mas malinis ang food guide habang nasa table.", sponsorBiteName: "Mas malinis na guide para sa {dish}", sponsorTagHouse: "Mura", sponsorTagLocal: "Malinis na screen", sponsorTagRemix: "Travel mode", sponsorCta: "Alisin ang ads", challengeSponsorCta: "I-sponsor ang theme", challengeChip: "Bite challenge", challengeKicker: "Theme ngayong buwan", challengeTheme: "Best samgyeopsal one-bite wrap", challengeIntro: "Matuto muna ng Korean method, pagkatapos i-submit ang sarili mong sauce, wrap, crunch, o pairing idea.", submitKicker: "Gumawa ng bite", submitDish: "Dish o product", submitName: "Pangalan ng bite", submitMethod: "Paraan mo", submitButton: "I-submit sa vote board", voteCriteriaTitle: "Pamantayan ng boto", leaderKicker: "Vote board", winnerKicker: "Kasalukuyang winner", winnerCopy: "Ito ang bite na may pinakamalakas na review reaction at boto.", brandKicker: "Para sa partners", brandTitle: "Mag-sponsor ng theme, hindi lang banner.", brandCopy: "Puwedeng angkinin ng restaurant ang house-sauce challenge. Puwede ring mag-sponsor ang food company ng K-food pairing challenge.", voteUseful: "Useful", voteCreative: "Creative", noEntries: "Wala pang bite. I-submit ang unang remix." });
    Object.assign(ui.th, { eventKicker: "ชาเลนจ์รายเดือน", eventTitle: "กินแบบเกาหลีก่อน แล้วสร้างวิธีของคุณ แชร์เพื่อชนะ", eventCopy: "เรียนรู้วิธีกินแบบเกาหลีพื้นฐานก่อน แล้วปรับซอส การห่อ เนื้อสัมผัส หรือเครื่องเคียงให้เป็นคำที่ดีที่สุดของคุณ", eventButton: "สร้างคอมโบของฉัน", sponsorKicker: "ลบโฆษณา", sponsorTitle: "ดูแบบไม่มีโฆษณาระหว่างกิน", sponsorCopy: "จ่ายค่าธรรมเนียมเล็กน้อยเพื่อให้คู่มืออาหารสะอาดและไม่รบกวนบนโต๊ะอาหาร", sponsorBiteName: "คู่มือที่สะอาดขึ้นสำหรับ {dish}", sponsorTagHouse: "ราคาต่ำ", sponsorTagLocal: "หน้าจอสะอาด", sponsorTagRemix: "โหมดท่องเที่ยว", sponsorCta: "ลบโฆษณา", challengeSponsorCta: "สนับสนุนธีมชาเลนจ์", challengeChip: "Bite challenge", challengeKicker: "ธีมเดือนนี้", challengeTheme: "ห่อหมูสามชั้นคำเดียวที่ดีที่สุด", challengeIntro: "เรียนรู้วิธีเกาหลีพื้นฐานก่อน แล้วส่งไอเดียซอส การห่อ ความกรอบ หรือการจับคู่ของคุณ", submitKicker: "ส่งคำของคุณ", submitDish: "อาหารหรือสินค้า", submitName: "ชื่อคำ", submitMethod: "วิธีกิน", submitButton: "ส่งไปยังกระดานโหวต", voteCriteriaTitle: "เกณฑ์โหวต", leaderKicker: "กระดานโหวต", winnerKicker: "ผู้ชนะปัจจุบัน", winnerCopy: "คำนี้มีรีวิวและคะแนนโหวตแข็งแรงที่สุดตอนนี้", brandKicker: "สำหรับพาร์ทเนอร์", brandTitle: "สนับสนุนธีม ไม่ใช่แค่แบนเนอร์", brandCopy: "ร้านอาหารสนับสนุนชาเลนจ์ซอสประจำร้านได้ และแบรนด์อาหารสนับสนุนชาเลนจ์การจับคู่ K-food ได้", voteUseful: "มีประโยชน์", voteCreative: "สร้างสรรค์", noEntries: "ยังไม่มีคำ ส่งรีมิกซ์แรกได้เลย" });
    Object.assign(ui.vi, { eventKicker: "Thử thách hàng tháng", eventTitle: "Ăn kiểu Hàn trước, tạo cách của bạn, chia sẻ để thắng.", eventCopy: "Học cách ăn kiểu Hàn cơ bản trước, rồi đổi sốt, cuốn, độ giòn hoặc món ăn kèm để tạo miếng ngon nhất của bạn.", eventButton: "Tạo combo của tôi", sponsorKicker: "Xóa quảng cáo", sponsorTitle: "Xem không quảng cáo khi ăn", sponsorCopy: "Trả một khoản nhỏ cho khách du lịch để giữ hướng dẫn món ăn sạch hơn khi dùng bữa.", sponsorBiteName: "Hướng dẫn gọn hơn cho {dish}", sponsorTagHouse: "Giá thấp", sponsorTagLocal: "Màn hình sạch", sponsorTagRemix: "Chế độ du lịch", sponsorCta: "Xóa quảng cáo", challengeSponsorCta: "Tài trợ chủ đề", challengeChip: "Bite challenge", challengeKicker: "Chủ đề tháng này", challengeTheme: "Cuốn samgyeopsal một miếng ngon nhất", challengeIntro: "Học cách Hàn trước, rồi gửi ý tưởng sốt, cuốn, độ giòn hoặc kết hợp của bạn.", submitKicker: "Tạo miếng của bạn", submitDish: "Món hoặc sản phẩm", submitName: "Tên miếng ăn", submitMethod: "Cách ăn", submitButton: "Gửi lên bảng bình chọn", voteCriteriaTitle: "Tiêu chí bình chọn", leaderKicker: "Bảng bình chọn", winnerKicker: "Ứng viên thắng hiện tại", winnerCopy: "Miếng này đang có phản ứng đánh giá và lượt bình chọn mạnh nhất.", brandKicker: "Cho đối tác", brandTitle: "Tài trợ một chủ đề, không chỉ một banner.", brandCopy: "Nhà hàng có thể sở hữu thử thách sốt riêng. Công ty thực phẩm có thể tài trợ thử thách kết hợp K-food và thưởng cho người thắng.", voteUseful: "Hữu ích", voteCreative: "Sáng tạo", noEntries: "Chưa có miếng nào. Hãy gửi remix đầu tiên." });

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

    function simpleDish(id, emoji, ko, enName, desc, tags, steps, search, phrase, meaning) {
      return {
        id, emoji, ko,
        search: [id, ko, enName, tags.join(" "), search].join(" "),
        phrase,
        meaning: { en: meaning, ja: meaning, zhCN: meaning, zhTW: meaning, fil: meaning, th: meaning, vi: meaning },
        text: { en: [enName, desc, tags, steps] }
      };
    }
    dishes.push(
      simpleDish("naengmyeon", "🍜", "냉면", "Naengmyeon", "Cold buckwheat noodles, usually served with icy broth or spicy sauce.", ["Cold noodles", "Cut first"], ["Use scissors to cut the long noodles.", "Add vinegar and mustard little by little.", "Mix gently before eating.", "Sip the cold broth between bites."], "cold noodles buckwheat vinegar mustard mul naengmyeon bibim naengmyeon", "면을 잘라서 먹으면 될까요?", "Should I cut the noodles before eating?"),
      simpleDish("mulhoe", "🐟", "물회", "Mulhoe", "Cold spicy raw fish soup with vegetables and icy broth.", ["Raw seafood", "Cold spicy"], ["Mix the sauce and icy broth well.", "Eat fish and vegetables together.", "Add noodles or rice if served.", "Go slowly if it is very cold or spicy."], "cold raw fish soup seafood spicy ice", "밥이나 면을 넣어 먹나요?", "Do I add rice or noodles to this?"),
      simpleDish("bokjiri", "🍲", "복지리탕", "Bokjiri-tang", "Clear pufferfish soup with a clean broth and dipping sauce.", ["Hot soup", "Bones"], ["Taste the clear broth first.", "Dip fish pieces in soy-vinegar sauce.", "Watch carefully for bones.", "Eat with rice and side dishes."], "pufferfish clear soup bok jiri tang fish bones", "가시가 있나요?", "Are there bones I should watch for?"),
      simpleDish("dakgalbi", "🍗", "닭갈비", "Dakgalbi", "Spicy stir-fried chicken cooked at the table with cabbage and rice cakes.", ["Chicken", "Table cooking"], ["Let the staff cook and stir it first.", "Wait until chicken is fully cooked.", "Eat with perilla leaves or lettuce.", "Order fried rice at the end if you want."], "spicy chicken stir fry cabbage rice cake fried rice", "지금 먹어도 되나요?", "Can I eat this now?"),
      simpleDish("dakhanmari", "🍗", "닭한마리 칼국수", "Dakhanmari kalguksu", "Whole chicken soup finished with noodles and dipping sauce.", ["Chicken soup", "Noodles later"], ["Make a dipping sauce with soy, mustard, vinegar, and chili.", "Dip chicken pieces in the sauce.", "Add potatoes or rice cakes if served.", "Add kalguksu noodles after most chicken is eaten."], "whole chicken soup kalguksu noodle mustard vinegar", "칼국수는 언제 넣나요?", "When should I add the noodles?"),
      simpleDish("samhab", "🥓", "삼합", "Samhab", "A three-part bite, often pork, kimchi, and skate or seafood.", ["Three-bite combo", "Strong flavor"], ["Take a small piece of each part.", "Stack pork, kimchi, and skate or seafood.", "Add sauce only lightly.", "Eat together in one bite if comfortable."], "samhab pork kimchi skate hongeo seafood three combination", "어떤 순서로 같이 먹나요?", "What should I combine in one bite?"),
      simpleDish("ssambap", "🥬", "쌈밥", "Ssambap", "Rice and side dishes wrapped in leafy greens with ssamjang.", ["Wrap", "Vegetables"], ["Put a small spoon of rice on a leaf.", "Add meat or side dishes.", "Add a little ssamjang.", "Fold and eat in one bite."], "wrap rice lettuce ssam ssamjang vegetable", "쌈은 어떻게 싸면 되나요?", "How should I make the wrap?"),
      simpleDish("bossam", "🥩", "보쌈", "Bossam", "Boiled pork eaten with kimchi, garlic, and wraps.", ["Pork", "Wrap"], ["Place pork on cabbage or lettuce.", "Add bossam kimchi and garlic if you like.", "Use saeujeot or ssamjang lightly.", "Wrap and eat together."], "boiled pork wrap kimchi cabbage saeujeot", "새우젓에 찍어 먹나요?", "Should I dip this in salted shrimp sauce?"),
      simpleDish("jokbal", "🥩", "족발", "Jokbal", "Braised pork trotter sliced and eaten with garlic, chili, and dipping sauces.", ["Pork", "Dip"], ["Dip a slice in saeujeot or ssamjang.", "Add garlic or chili if you like.", "Wrap with lettuce for a lighter bite.", "Eat the chewy skin and meat together."], "pork trotter braised jokbal saeujeot garlic", "어떤 소스에 찍어 먹나요?", "Which sauce should I use?"),
      simpleDish("sogalbi", "🥩", "소갈비", "Sogalbi", "Beef short ribs grilled at the table and eaten with salt, sauce, or wraps.", ["Beef BBQ", "Grill"], ["Grill until browned on both sides.", "Cut between the bones if needed.", "Dip lightly in salt or house sauce.", "Wrap with lettuce and garlic if desired."], "beef rib galbi grill bbq sauce salt lettuce", "고기는 얼마나 익혀야 하나요?", "How cooked should the beef be?"),
      simpleDish("hanwoo", "🥩", "한우구이", "Hanwoo gui", "Premium Korean beef, usually grilled briefly and dipped simply.", ["Beef BBQ", "Quick grill"], ["Grill each side briefly.", "Do not overcook thin pieces.", "Try salt first to taste the beef.", "Use wasabi or sauce after the first bite."], "korean beef hanwoo grill bbq salt wasabi", "소금에 먼저 찍어 먹나요?", "Should I try it with salt first?"),
      simpleDish("gopchang", "🔥", "곱창", "Gopchang", "Grilled beef or pork intestines, often finished with fried rice.", ["Grilled intestine", "Cook fully"], ["Let it grill until crisp outside.", "Ask staff before eating because timing matters.", "Dip in sauce with onion or chili.", "Order fried rice at the end if offered."], "intestine grill gopchang makchang daechang fried rice", "지금 먹어도 안전한가요?", "Is it ready and safe to eat now?"),
      simpleDish("bulgogi", "🥩", "불고기", "Bulgogi", "Sweet soy-marinated beef cooked with onions and mushrooms.", ["Beef", "Sweet soy"], ["Let the beef cook in the pan.", "Eat with rice when fully cooked.", "Spoon some sauce over rice.", "Wrap with lettuce if served."], "marinated beef sweet soy bulgogi mushroom onion", "밥에 국물을 올려 먹어도 되나요?", "Can I spoon the sauce over rice?"),
      simpleDish("kimchijjigae", "🍲", "김치찌개", "Kimchi jjigae", "Spicy kimchi stew with pork, tofu, or tuna.", ["Hot stew", "Spicy"], ["Let it cool slightly before eating.", "Scoop kimchi, tofu, and broth onto rice.", "Ask if it contains pork or tuna if needed.", "Share from the pot with a ladle."], "kimchi stew pork tofu tuna spicy soup", "돼지고기가 들어가나요?", "Does this contain pork?"),
      simpleDish("doenjangjjigae", "🍲", "된장찌개", "Doenjang jjigae", "Soybean paste stew with tofu, vegetables, and sometimes seafood or beef.", ["Soybean stew", "Rice"], ["Taste the savory broth first.", "Eat tofu and vegetables with rice.", "It is often shared from the middle pot.", "Ask about seafood or beef if allergic."], "soybean paste stew tofu seafood beef", "해산물이 들어가나요?", "Does this contain seafood?"),
      simpleDish("budaejjigae", "🍲", "부대찌개", "Budae jjigae", "Spicy army stew with sausage, ham, noodles, beans, and kimchi.", ["Spicy stew", "Processed meat"], ["Wait until it boils strongly.", "Let noodles soften before eating.", "Eat sausage, kimchi, and broth with rice.", "Ask before adding extra ramen or cheese."], "army stew sausage ham ramen cheese beans kimchi", "라면은 지금 먹어도 되나요?", "Are the noodles ready to eat now?"),
      simpleDish("gamjatang", "🍖", "감자탕", "Gamjatang", "Pork bone soup with potatoes and greens.", ["Pork bone", "Hot soup"], ["Use tongs or chopsticks to pull meat from the bone.", "Dip meat in mustard soy sauce.", "Eat greens and potatoes with broth.", "Fried rice may be added at the end."], "pork bone soup potato greens mustard sauce", "뼈는 어디에 두면 되나요?", "Where should I put the bones?"),
      simpleDish("samgyetang", "🍗", "삼계탕", "Samgyetang", "Whole young chicken soup with ginseng, rice, garlic, and jujube.", ["Chicken soup", "Rice inside"], ["Open the chicken gently with a spoon or chopsticks.", "Eat the rice stuffed inside.", "Season your own bowl with salt.", "Sip the broth as you eat."], "ginseng chicken soup rice garlic jujube", "소금을 넣어서 먹나요?", "Should I season this with salt?"),
      simpleDish("seolleongtang", "🍲", "설렁탕", "Seolleongtang", "Milky beef bone soup served plain so you season it yourself.", ["Beef soup", "Season yourself"], ["Add salt and pepper to your bowl.", "Add chopped green onion if served.", "Eat beef and noodles with rice.", "Kimchi pairs strongly with the mild broth."], "beef bone soup milky salt pepper green onion", "소금은 얼마나 넣나요?", "How much salt should I add?"),
      simpleDish("galbitang", "🍖", "갈비탕", "Galbitang", "Clear beef short rib soup with glass noodles and radish.", ["Beef rib soup", "Bones"], ["Taste broth before seasoning.", "Pull beef from the rib bones.", "Eat noodles before they get too soft.", "Use a side plate for bones."], "beef rib soup clear glass noodles radish", "뼈 접시는 있나요?", "Is there a plate for the bones?"),
      simpleDish("tteokbokki", "🌶️", "떡볶이", "Tteokbokki", "Chewy rice cakes in spicy-sweet gochujang sauce.", ["Street food", "Spicy"], ["Check the heat before biting because rice cakes stay hot.", "Eat rice cakes with fish cake or egg.", "Dip fried snacks in the sauce.", "Add cheese or noodles only if you want a heavier meal."], "spicy rice cake street food fish cake egg", "많이 매운가요?", "Is it very spicy?"),
      simpleDish("gimbap", "김", "김밥", "Gimbap", "Seaweed rice rolls filled with vegetables, egg, and meat or tuna.", ["Rice roll", "Easy"], ["Pick up one slice with chopsticks.", "Eat in one bite so it does not fall apart.", "Dip only if a sauce is provided.", "Check filling if you avoid meat or seafood."], "seaweed rice roll vegetable egg tuna ham", "고기가 들어가나요?", "Does this contain meat?"),
      simpleDish("japchae", "🍜", "잡채", "Japchae", "Stir-fried glass noodles with vegetables and soy-sesame flavor.", ["Glass noodles", "Shared side"], ["Mix lightly if noodles are clumped.", "Eat as a side dish or with rice.", "Look for beef if you avoid meat.", "It can be eaten warm or room temperature."], "glass noodles sweet potato noodle sesame soy vegetables", "고기가 들어가나요?", "Does this contain meat?"),
      simpleDish("pajeon", "🥞", "파전", "Pajeon", "Savory green onion pancake, often dipped in soy-vinegar sauce.", ["Pancake", "Dip"], ["Tear or cut a piece.", "Dip the edge in soy-vinegar sauce.", "Eat while crisp and hot.", "Share from the center plate."], "green onion pancake soy vinegar jeon", "이 소스에 찍어 먹나요?", "Should I dip it in this sauce?"),
      simpleDish("haemulpajeon", "🥞", "해물파전", "Haemul pajeon", "Seafood and green onion pancake.", ["Seafood", "Pancake"], ["Cut a piece with chopsticks or scissors.", "Dip lightly in soy-vinegar sauce.", "Eat while the edges are crisp.", "Ask about shellfish if allergic."], "seafood pancake green onion shellfish shrimp squid", "조개류가 들어가나요?", "Does this contain shellfish?"),
      simpleDish("mandu", "🥟", "만두", "Mandu", "Korean dumplings, steamed, boiled, pan-fried, or in soup.", ["Dumpling", "Filling"], ["Bite carefully because the inside can be hot.", "Dip in soy-vinegar sauce if served.", "Check if filling is pork, kimchi, or vegetables.", "For soup, eat dumplings with broth."], "dumpling pork kimchi vegetable soy vinegar", "만두 속에 돼지고기가 들어가나요?", "Does the dumpling filling contain pork?"),
      simpleDish("kalguksu", "🍜", "칼국수", "Kalguksu", "Knife-cut noodle soup, often with chicken, clams, or anchovy broth.", ["Noodles", "Hot soup"], ["Stir noodles apart before eating.", "Eat noodles while they are chewy.", "Taste broth before adding kimchi.", "Ask about clam broth if allergic."], "knife cut noodle soup chicken clam anchovy", "조개 육수인가요?", "Is this made with clam broth?"),
      simpleDish("makguksu", "🍜", "막국수", "Makguksu", "Buckwheat noodles, usually spicy and cool.", ["Buckwheat noodles", "Mix"], ["Cut noodles if they are long.", "Mix sauce from the bottom well.", "Add vinegar or mustard gradually.", "Eat with grilled meat if served together."], "buckwheat noodles spicy cold vinegar mustard", "식초를 넣어 먹나요?", "Should I add vinegar?"),
      simpleDish("kongguksu", "🍜", "콩국수", "Kongguksu", "Cold noodles in creamy soybean broth.", ["Cold noodles", "Mild"], ["Taste the soybean broth first.", "Add salt or sugar only to your own bowl.", "Mix noodles before eating.", "Eat kimchi alongside for contrast."], "cold soybean noodle soup salt sugar summer", "소금이나 설탕을 넣나요?", "Should I add salt or sugar?"),
      simpleDish("jajangmyeon", "🍜", "짜장면", "Jajangmyeon", "Noodles topped with black bean sauce.", ["Noodles", "Mix"], ["Mix the black bean sauce into the noodles fully.", "Use scissors only if noodles are too long.", "Eat pickled radish between bites.", "Be careful: the sauce can stain clothes."], "black bean noodles chinese korean pickled radish", "다 비벼서 먹나요?", "Do I mix all of it before eating?"),
      simpleDish("jjamppong", "🍜", "짬뽕", "Jjamppong", "Spicy seafood noodle soup.", ["Seafood", "Spicy soup"], ["Taste broth carefully because it is hot and spicy.", "Eat noodles first before they soften.", "Use shell bowl for shells if provided.", "Ask about seafood if allergic."], "spicy seafood noodle soup shellfish squid mussel", "많이 매운가요?", "Is it very spicy?"),
      simpleDish("ganjanggejang", "🦀", "간장게장", "Ganjang gejang", "Raw crab marinated in soy sauce, famous for mixing rice in the shell.", ["Raw crab", "Soy marinade"], ["Pull crab meat from the shell with chopsticks.", "Mix rice into the crab shell if you want.", "Use gloves if provided.", "Eat slowly because shells are sharp."], "raw crab soy sauce marinated rice shell", "게딱지에 밥을 비벼 먹나요?", "Should I mix rice in the crab shell?"),
      simpleDish("yangnyeomgejang", "🦀", "양념게장", "Yangnyeom gejang", "Raw crab marinated in spicy red sauce.", ["Raw crab", "Spicy"], ["Wear gloves if provided.", "Suck or pull meat carefully from shell pieces.", "Eat with rice because it is salty and spicy.", "Watch for sharp shell edges."], "spicy raw crab marinated sauce rice", "장갑을 끼고 먹나요?", "Should I use gloves to eat this?"),
      simpleDish("jangeogui", "🐟", "장어구이", "Jangeo gui", "Grilled eel with sweet soy sauce or salt.", ["Grilled eel", "Sauce"], ["Eat a small piece first with salt or sauce.", "Add ginger if served.", "Wrap with perilla leaf if you like.", "It is usually fully cooked before serving."], "grilled eel sweet soy sauce ginger perilla", "생강을 올려 먹나요?", "Should I eat it with ginger?"),
      simpleDish("jogaegui", "🦪", "조개구이", "Jogae gui", "Grilled shellfish cooked at the table.", ["Shellfish", "Cook fully"], ["Wait until shells open and flesh is cooked.", "Use tongs; shells are very hot.", "Dip in chili sauce or butter sauce if served.", "Discard empty shells in the shell bucket."], "grilled shellfish clam oyster scallop butter", "이 조개는 다 익었나요?", "Is this shellfish fully cooked?"),
      simpleDish("maeuntang", "🍲", "매운탕", "Maeuntang", "Spicy fish stew often served after sashimi.", ["Fish stew", "Bones"], ["Let it boil before eating.", "Eat fish carefully because there are bones.", "Scoop broth and vegetables over rice.", "Add noodles only if ordered."], "spicy fish stew bones sashimi after soup", "가시가 많나요?", "Does it have many bones?"),
      simpleDish("agujjim", "🐟", "아구찜", "Agujjim", "Spicy braised monkfish with bean sprouts.", ["Spicy seafood", "Bones"], ["Mix fish and bean sprouts with sauce.", "Eat fish carefully around bones.", "Use rice to balance the spicy sauce.", "Fried rice may be made with leftover sauce."], "spicy braised monkfish bean sprouts seafood", "밥을 같이 먹으면 되나요?", "Should I eat this with rice?"),
      simpleDish("nakjibokkeum", "🐙", "낙지볶음", "Nakji bokkeum", "Spicy stir-fried octopus.", ["Octopus", "Spicy"], ["Mix octopus with vegetables and sauce.", "Eat with rice to reduce the heat.", "Use scissors if pieces are large.", "Ask spice level before ordering if sensitive."], "spicy stir fried octopus rice", "얼마나 매운가요?", "How spicy is this?"),
      simpleDish("yukhoe", "🥩", "육회", "Yukhoe", "Seasoned raw beef, often served with pear and egg yolk.", ["Raw beef", "Egg yolk"], ["Mix lightly with egg yolk if served.", "Eat beef with pear slices.", "Add pine nuts or sauce if provided.", "Eat soon while cold and fresh."], "raw beef tartare pear egg yolk sesame", "노른자를 섞어 먹나요?", "Should I mix in the egg yolk?"),
      simpleDish("sundaeguk", "🍲", "순대국", "Sundaeguk", "Korean blood sausage soup with pork broth.", ["Pork soup", "Season yourself"], ["Add salt, pepper, or salted shrimp to your bowl.", "Add perilla powder if you like a nutty flavor.", "Eat sundae pieces with rice.", "Ask if you want less offal."], "blood sausage soup pork offal perilla powder", "새우젓을 넣어 먹나요?", "Should I add salted shrimp?"),
      simpleDish("haejangguk", "🍲", "해장국", "Haejangguk", "Hearty hangover soup, often spicy with beef, cabbage, or bones.", ["Hot soup", "Hearty"], ["Taste broth first because recipes vary.", "Add seasoning paste gradually.", "Eat meat and cabbage with rice.", "Use side plate for bones if present."], "hangover soup beef cabbage bones spicy", "양념장을 넣어 먹나요?", "Should I add the seasoning paste?"),
      simpleDish("sujebi", "🍜", "수제비", "Sujebi", "Hand-pulled dough flakes in hot broth.", ["Hot soup", "Dough"], ["Stir gently so dough pieces separate.", "Eat dough flakes with spoon or chopsticks.", "Add kimchi for stronger flavor.", "Let it cool before big bites."], "hand pulled dough soup potato anchovy broth", "김치와 같이 먹나요?", "Should I eat this with kimchi?"),
      simpleDish("hotteok", "🥞", "호떡", "Hotteok", "Sweet filled pancake with hot sugar syrup inside.", ["Street snack", "Very hot"], ["Wait a moment before biting.", "Hold with the paper cup or napkin.", "Bite carefully because syrup is hot.", "Eat while warm and crisp."], "sweet pancake street food sugar syrup cinnamon", "안이 뜨거운가요?", "Is the inside very hot?"),
      simpleDish("odeng", "🍢", "어묵", "Eomuk", "Fish cake skewers served with warm broth.", ["Street food", "Fish cake"], ["Pick a skewer from the broth.", "Dip in soy sauce if available.", "Drink the warm broth from a cup.", "Count skewers for payment."], "fish cake skewer eomuk odeng broth soy", "국물도 마셔도 되나요?", "Can I drink the broth too?"),
      simpleDish("bingsu", "🍧", "빙수", "Bingsu", "Shaved ice dessert with toppings such as red bean, fruit, or milk.", ["Dessert", "Share"], ["Mix only part of it first if you want texture.", "Spoon toppings with shaved ice.", "Share from the bowl with clean spoons.", "Eat before it melts too much."], "shaved ice dessert red bean milk fruit", "섞어서 먹나요?", "Should I mix it before eating?"),
      simpleDish("kimchibokkeumbap", "🍚", "김치볶음밥", "Kimchi bokkeumbap", "Fried rice with kimchi, often topped with egg or seaweed.", ["Fried rice", "Kimchi"], ["Break the egg if served on top.", "Mix kimchi, rice, and seaweed evenly.", "Eat with pickles or soup between bites.", "Add extra gochujang only if you want more heat."], "kimchi fried rice egg seaweed bokkeumbap", "계란을 섞어서 먹나요?", "Should I mix the egg in?"),
      simpleDish("kimbapcheongukramyeon", "🍜", "분식 라면", "Bunsik ramyeon", "Korean instant-style ramen often served with egg, scallion, and gimbap.", ["Noodles", "Bunsik"], ["Eat noodles while springy.", "Sip broth carefully because it is hot.", "Pair with gimbap if ordered together.", "Add kimchi between bites for contrast."], "ramyeon ramen bunsik egg scallion gimbap", "김밥이랑 같이 먹나요?", "Should I eat this with gimbap?"),
      simpleDish("tteokguk", "🍲", "떡국", "Tteokguk", "Mild rice cake soup with egg, scallion, and sometimes beef.", ["Rice cake soup", "Mild"], ["Let rice cakes cool slightly before eating.", "Scoop broth and rice cakes together.", "Add pepper if you want stronger aroma.", "Eat with kimchi for balance."], "rice cake soup tteokguk egg beef new year", "떡이 뜨거운가요?", "Are the rice cakes hot?"),
      simpleDish("miyeokguk", "🍲", "미역국", "Miyeokguk", "Seaweed soup, often with beef or seafood broth.", ["Seaweed soup", "Mild"], ["Taste broth before adding anything.", "Eat seaweed and rice together.", "Ask whether it contains beef or seafood if needed.", "Pair with kimchi or salty side dishes."], "seaweed soup beef seafood birthday", "소고기가 들어가나요?", "Does this contain beef?"),
      simpleDish("kongnamulgukbap", "🍲", "콩나물국밥", "Kongnamul gukbap", "Bean sprout soup with rice, often served hot with egg.", ["Soup rice", "Bean sprout"], ["Break the egg gently if served.", "Taste broth before adding seasoning.", "Eat sprouts, rice, and broth together.", "Add kimchi or chili gradually."], "bean sprout soup rice gukbap egg", "계란을 넣어 먹나요?", "Do I add the egg?"),
      simpleDish("dwaejigukbap", "🍲", "돼지국밥", "Dwaeji gukbap", "Pork soup with rice, often seasoned at the table.", ["Pork soup", "Busan"], ["Add salted shrimp or seasoning little by little.", "Mix rice into soup or eat separately.", "Add chives if served.", "Taste before adding more salt."], "pork soup rice gukbap busan salted shrimp", "새우젓은 얼마나 넣나요?", "How much salted shrimp should I add?"),
      simpleDish("jjimdak", "🍗", "찜닭", "Jjimdak", "Soy-braised chicken with glass noodles, potato, and vegetables.", ["Braised chicken", "Soy"], ["Mix noodles with sauce before they stick.", "Eat chicken and potato with rice.", "Watch for bones if bone-in.", "Share from the center plate."], "braised chicken soy glass noodles potato jjimdak", "당면부터 먹나요?", "Should I eat the glass noodles first?"),
      simpleDish("galbijjim", "🍖", "갈비찜", "Galbijjim", "Braised beef short ribs in a sweet-savory sauce.", ["Braised beef", "Ribs"], ["Pull meat gently from the bone.", "Eat sauce with rice if you like.", "Try radish or potato with the meat.", "Use a side plate for bones."], "braised beef short ribs galbi jjim soy sauce", "소스를 밥에 비벼 먹나요?", "Can I mix the sauce with rice?"),
      simpleDish("saengseongui", "🐟", "생선구이", "Saengseon gui", "Grilled fish served whole or filleted with rice and side dishes.", ["Grilled fish", "Bones"], ["Separate flesh from bones carefully.", "Eat with rice and a little soy sauce if provided.", "Use a side plate for bones.", "Try the crispy skin if you like."], "grilled fish korean rice bones", "가시는 어디에 두나요?", "Where should I put the bones?"),
      simpleDish("gyeranjjim", "🥚", "계란찜", "Gyeran jjim", "Steamed egg custard served hot and fluffy.", ["Egg", "Hot"], ["Wait a moment because the bowl is very hot.", "Scoop gently with a spoon.", "Eat as a soft side dish with rice.", "Share using a clean spoon if served in the center."], "steamed egg custard hot side dish", "뜨거우니 기다려야 하나요?", "Should I wait because it is hot?"),
      simpleDish("dubukimchi", "🥘", "두부김치", "Dubu kimchi", "Warm tofu served with stir-fried kimchi, often with pork.", ["Tofu", "Kimchi"], ["Place kimchi on a tofu slice.", "Eat together in one bite.", "Ask if pork is included if needed.", "Use less kimchi if it is very spicy."], "tofu kimchi pork dubu stir fried", "돼지고기가 들어가나요?", "Does this contain pork?"),
      simpleDish("tteokgalbi", "🥩", "떡갈비", "Tteokgalbi", "Grilled minced short rib patties with sweet soy flavor.", ["Beef patty", "Sweet soy"], ["Cut a small piece first.", "Eat with rice or lettuce if served.", "Dip only lightly because it is already seasoned.", "Pair with kimchi to balance sweetness."], "short rib patty grilled beef tteokgalbi", "이미 양념이 되어 있나요?", "Is it already seasoned?"),
      simpleDish("kkanpunggi", "🍗", "깐풍기", "Kkanpunggi", "Crispy fried chicken tossed in a spicy garlic sauce.", ["Fried chicken", "Spicy"], ["Eat while crisp before sauce softens it.", "Try one piece first to check spice.", "Share from the center plate.", "Eat with pickled radish between bites."], "korean chinese fried chicken spicy garlic", "많이 매운가요?", "Is it very spicy?"),
      simpleDish("yubuchobap", "🍚", "유부초밥", "Yubu chobap", "Sweet tofu pockets filled with seasoned rice.", ["Tofu pocket", "Rice"], ["Pick up one piece carefully.", "Eat in one bite if possible.", "Dip only if sauce is served.", "Check toppings if you avoid seafood."], "tofu pocket rice yubu chobap inari korean", "한입에 먹나요?", "Should I eat it in one bite?"),
      simpleDish("patjuk", "🥣", "팥죽", "Patjuk", "Red bean porridge, sometimes served with small rice balls.", ["Porridge", "Red bean"], ["Stir before eating because it is thick.", "Let rice balls cool slightly.", "Add sugar or salt only to your own bowl.", "Eat slowly; it stays hot."], "red bean porridge rice balls patjuk", "설탕을 넣어 먹나요?", "Should I add sugar?")
    );

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

    const defaultChallengeEntries = [
      { id: "classic-ssam", dish: "Samgyeopsal", name: "Classic ssam first bite", method: "Lettuce, pork, ssamjang, garlic, and grilled kimchi. This is the baseline Korean-style bite.", votes: 18 },
      { id: "kimchi-crunch", dish: "Samgyeopsal", name: "Kimchi crunch ssam", method: "Use less sauce, add grilled kimchi, and finish with one crisp side for texture.", votes: 13 },
      { id: "chojang-flight", dish: "Korean raw fish", name: "Chojang flight", method: "Taste one slice with soy-wasabi, one with chojang, then vote for the sauce that fits the fish best.", votes: 9 }
    ];
    const challengeEntryText = {
      "classic-ssam": {
        ko: ["삼겹살", "클래식 쌈 첫 한입", "상추, 돼지고기, 쌈장, 마늘, 구운 김치. 한국식 한입의 기본 조합입니다."],
        ja: ["サムギョプサル", "クラシック包みの最初の一口", "レタス、豚肉、サムジャン、にんにく、焼きキムチ。韓国式一口の基本です。"],
        zhCN: ["五花肉", "经典包菜第一口", "生菜、猪肉、包饭酱、蒜和烤泡菜。这是韩国式一口的基础组合。"],
        zhTW: ["五花肉", "經典包菜第一口", "生菜、豬肉、包飯醬、蒜和烤泡菜。這是韓國式一口的基礎組合。"],
        fil: ["Samgyeopsal", "Classic ssam first bite", "Lettuce, pork, ssamjang, garlic, at grilled kimchi. Ito ang baseline Korean-style bite."],
        th: ["ซัมกยอบซัล", "คำแรกแบบซัมคลาสสิก", "ผักกาด หมู ซัมจัง กระเทียม และกิมจิย่าง นี่คือคำพื้นฐานแบบเกาหลี"],
        vi: ["Samgyeopsal", "Miếng ssam cổ điển đầu tiên", "Rau xà lách, thịt heo, ssamjang, tỏi và kimchi nướng. Đây là miếng cơ bản kiểu Hàn."]
      },
      "kimchi-crunch": {
        ko: ["삼겹살", "김치 크런치 쌈", "소스는 줄이고 구운 김치를 더한 뒤, 바삭한 사이드 하나로 식감을 마무리합니다."],
        ja: ["サムギョプサル", "キムチクランチ包み", "ソースを少なめにして焼きキムチを加え、カリッとしたサイドで食感を仕上げます。"],
        zhCN: ["五花肉", "泡菜脆感包", "少放酱料，加入烤泡菜，再用一个酥脆配菜完成口感。"],
        zhTW: ["五花肉", "泡菜脆感包", "少放醬料，加入烤泡菜，再用一個酥脆配菜完成口感。"],
        fil: ["Samgyeopsal", "Kimchi crunch ssam", "Bawasan ang sauce, magdagdag ng grilled kimchi, at tapusin sa isang crisp side."],
        th: ["ซัมกยอบซัล", "ซัมกิมจิกรอบ", "ใช้ซอสน้อยลง เพิ่มกิมจิย่าง แล้วปิดท้ายด้วยเครื่องเคียงกรอบ"],
        vi: ["Samgyeopsal", "Ssam kimchi giòn", "Dùng ít sốt hơn, thêm kimchi nướng và kết thúc bằng một món giòn."]
      },
      "chojang-flight": {
        ko: ["한국식 회", "초장 테이스팅", "한 점은 간장 와사비로, 한 점은 초장으로 맛본 뒤 생선에 더 맞는 소스에 투표합니다."],
        ja: ["韓国式刺身", "チョジャン食べ比べ", "一切れは醤油わさびで、もう一切れはチョジャンで試し、魚に合うソースに投票します。"],
        zhCN: ["韩国生鱼片", "초장试味", "一片蘸酱油芥末，一片蘸초장，然后投票选出最适合鱼的酱料。"],
        zhTW: ["韓國生魚片", "초장試味", "一片蘸醬油芥末，一片蘸초장，然後投票選出最適合魚的醬料。"],
        fil: ["Korean raw fish", "Chojang tasting", "Tikman ang isang slice sa soy-wasabi at isa sa chojang, pagkatapos bumoto sa mas bagay na sauce."],
        th: ["ปลาดิบเกาหลี", "ชิมซอสโชจัง", "ชิมหนึ่งชิ้นกับซอยวาซาบิ อีกชิ้นกับโชจัง แล้วโหวตซอสที่เข้ากับปลาที่สุด"],
        vi: ["Gỏi cá kiểu Hàn", "Thử vị chogochujang", "Nếm một lát với xì dầu-wasabi, một lát với chogochujang, rồi bình chọn loại sốt hợp cá nhất."]
      }
    };
    function loadChallengeEntries() {
      try {
        const saved = JSON.parse(localStorage.getItem("kbiteChallengeEntries") || "null");
        return Array.isArray(saved) && saved.length ? saved : defaultChallengeEntries.slice();
      } catch {
        return defaultChallengeEntries.slice();
      }
    }
    const state = { lang: "en", query: "", selected: null, scanned: null, cameraReady: false, challengeEntries: loadChallengeEntries() };
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const langLabels = { en: "English", ko: "한국어", ja: "Japanese", zhCN: "简体中文", zhTW: "繁體中文", fil: "Filipino", th: "Thai", vi: "Vietnamese" };
    const t = (key) => (ui[state.lang] && ui[state.lang][key]) || ui.en[key] || "";
    const local = (dish) => dish.text[state.lang] || dish.text.en;
    const meaningFor = (dish) => (dish.meaning && (dish.meaning[state.lang] || dish.meaning.en)) || "";
    const ruleMeaning = (rule) => (rule.meaning && (rule.meaning[state.lang] || rule.meaning.en)) || "";
    const esc = (value = "") => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

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
      if (found) return { ko: found.ko, meaning: ruleMeaning(found) };
      return { ko: "이걸 어떻게 먹으면 돼요?", meaning: input };
    }
    function partnerBiteFor(dish) {
      const title = local(dish)[0];
      const name = t("sponsorBiteName").replace("{dish}", title);
      return [name, [t("sponsorTagHouse"), t("sponsorTagLocal"), t("sponsorTagRemix")], t("sponsorCopy")];
    }
    function renderDetail(target, dish) {
      const text = local(dish);
      const partner = partnerBiteFor(dish);
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
          '<div class="translation-card"><div><p class="korean" data-korean>' + dish.phrase + '</p><p class="meaning" data-meaning>' + meaningFor(dish) + '</p></div><button class="small-btn" type="button" data-speak>' + t("play") + '</button></div>' +
          '<div class="phrase-grid">' + rules.slice(0, 4).map((rule, i) => '<button class="phrase-chip" type="button" data-rule="' + i + '">' + ruleMeaning(rule) + '</button>').join("") + '</div>' +
        '</section>' +
        '<section class="sponsor-card sponsor-banner" aria-label="Ad-free K-Bite purchase">' +
          '<div class="sponsor-row"><div>' +
            '<span class="sponsor-kicker">' + t("sponsorKicker") + '</span>' +
            '<p class="sponsor-name">' + t("sponsorTitle") + ': ' + partner[0] + '</p>' +
          '</div><a class="primary-btn partner-cta" href="/buy?plan=adfree">' + t("sponsorCta") + '</a></div>' +
          '<p class="sponsor-copy">' + partner[2] + '</p>' +
          '<div class="sponsor-tags">' + partner[1].slice(0, 3).map(tag => '<span class="sponsor-tag">' + tag + '</span>').join("") + '</div>' +
        '</section>' +
        '<section class="campaign-card">' +
          '<span class="campaign-kicker">' + t("eventKicker") + '</span>' +
          '<h3>' + t("eventTitle") + '</h3>' +
          '<p class="campaign-note">' + t("eventCopy") + '</p>' +
          '<button class="primary-btn" type="button" data-open-challenge="' + dish.id + '">' + t("eventButton") + '</button>' +
          '<a class="partner-cta campaign-note" href="/partners">' + t("challengeSponsorCta") + '</a>' +
        '</section>';
      const korean = target.querySelector("[data-korean]");
      const meaning = target.querySelector("[data-meaning]");
      const input = target.querySelector("[data-question]");
      target.querySelector("[data-translate]").onclick = () => {
        const translated = translateQuestion(input.value, dish.phrase, meaningFor(dish));
        korean.textContent = translated.ko;
        meaning.textContent = translated.meaning;
      };
      target.querySelectorAll("[data-rule]").forEach(btn => {
        btn.onclick = () => {
          const rule = rules[Number(btn.dataset.rule)];
          input.value = ruleMeaning(rule);
          korean.textContent = rule.ko;
          meaning.textContent = ruleMeaning(rule);
        };
      });
      target.querySelector("[data-speak]").onclick = () => speak(korean.textContent);
      target.querySelector("[data-open-challenge]").onclick = () => openChallengeForDish(dish);
      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          const translated = translateQuestion(input.value, dish.phrase, meaningFor(dish));
          korean.textContent = translated.ko;
          meaning.textContent = translated.meaning;
          speak(korean.textContent);
        }
      };
    }
    function renderResults() {
      const q = state.query.trim().toLowerCase();
      if (!q) {
        $("#resultCount").textContent = "";
        $("#results").innerHTML = "";
        $("#searchEmpty").classList.remove("hidden");
        $("#searchEmpty").classList.remove("active-search");
        $("#searchDetail").classList.remove("active");
        $("#searchDetail").innerHTML = "";
        return;
      }
      if (state.selected) {
        $("#resultCount").textContent = "";
        $("#results").innerHTML = "";
        $("#searchEmpty").classList.add("hidden");
        $("#searchEmpty").classList.remove("active-search");
        return;
      }
      $("#resultCount").textContent = "";
      $("#searchEmpty").classList.remove("hidden");
      $("#searchEmpty").classList.add("active-search");
      const rows = dishes.filter(d => (d.search + " " + local(d)[0] + " " + d.ko).toLowerCase().includes(q));
      $("#results").innerHTML = rows.map(d => {
        const text = local(d);
        return '<button class="dish-row" data-dish="' + d.id + '"><strong>' + text[0] + '</strong><span class="sub">' + d.ko + '</span></button>';
      }).join("");
      $$("#results [data-dish]").forEach(btn => btn.onclick = () => {
        const dish = dishes.find(d => d.id === btn.dataset.dish);
        state.selected = dish.id;
        renderResults();
        renderDetail($("#searchDetail"), dish);
      });
    }
    function saveChallengeEntries() {
      try { localStorage.setItem("kbiteChallengeEntries", JSON.stringify(state.challengeEntries)); } catch {}
    }
    function renderChallenge() {
      const board = $("#challengeEntries");
      if (!board) return;
      const entries = state.challengeEntries.slice().sort((a, b) => b.votes - a.votes);
      const winner = entries[0];
      const viewEntry = (entry) => {
        const translated = challengeEntryText[entry.id] && challengeEntryText[entry.id][state.lang];
        return translated ? { ...entry, dish: translated[0], name: translated[1], method: translated[2] } : entry;
      };
      const winnerView = winner ? viewEntry(winner) : null;
      $("#currentWinner").innerHTML = winner
        ? '<span class="campaign-kicker">' + t("winnerKicker") + '</span><h3>' + esc(winnerView.name) + '</h3><p class="sponsor-copy">' + esc(winnerView.method) + '</p><p class="campaign-note">' + t("winnerCopy") + ' ' + Number(winner.votes || 0) + ' reactions.</p>'
        : '<span class="campaign-kicker">' + t("winnerKicker") + '</span><p class="campaign-note">' + t("noEntries") + '</p>';
      board.innerHTML = entries.length ? entries.map(entry => {
        const item = viewEntry(entry);
        return (
        '<article class="vote-card">' +
          '<div class="vote-head"><div><h3>' + esc(item.name) + '</h3><p class="muted">' + esc(item.dish) + '</p></div><span class="vote-score">' + Number(entry.votes || 0) + '</span></div>' +
          '<p class="sponsor-copy">' + esc(item.method) + '</p>' +
          '<div class="vote-actions">' +
            '<button class="small-btn" type="button" data-vote="' + esc(entry.id) + '">' + t("voteUseful") + '</button>' +
            '<button class="small-btn" type="button" data-vote="' + esc(entry.id) + '">' + t("voteCreative") + '</button>' +
          '</div>' +
        '</article>'
        );
      }).join("") : '<p class="muted">' + t("noEntries") + '</p>';
      $$("[data-vote]").forEach(btn => btn.onclick = () => {
        const entry = state.challengeEntries.find(item => item.id === btn.dataset.vote);
        if (!entry) return;
        entry.votes = Number(entry.votes || 0) + 1;
        saveChallengeEntries();
        renderChallenge();
      });
    }
    function submitChallengeEntry() {
      const dish = $("#challengeDish").value.trim() || "Korean food";
      const name = $("#challengeName").value.trim() || "My K-Bite remix";
      const method = $("#challengeMethod").value.trim();
      if (!method) {
        $("#challengeMethod").focus();
        return;
      }
      state.challengeEntries.unshift({
        id: "entry-" + Date.now(),
        dish,
        name,
        method,
        votes: 1
      });
      $("#challengeDish").value = "";
      $("#challengeName").value = "";
      $("#challengeMethod").value = "";
      saveChallengeEntries();
      renderChallenge();
    }
    function openChallengeForDish(dish) {
      const name = local(dish)[0];
      $("#challengeDish").value = name + " / " + dish.ko;
      $("#challengeName").value = "";
      $("#challengeMethod").value = "";
      setScreen("challenge");
      renderChallenge();
      setTimeout(() => $("#challengeName").focus(), 80);
    }
    function renderText() {
      $$("[data-i]").forEach(el => el.textContent = t(el.dataset.i));
      $("#query").placeholder = t("searchPlaceholder");
      renderResults();
      renderChallenge();
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
        state.cameraReady = true;
        $("#detectBtn").disabled = false;
        $("#scanStatus").textContent = t("scanCopy");
      } catch {
        state.cameraReady = false;
        $("#detectBtn").disabled = true;
        $("#scanStatus").textContent = t("cameraBlocked");
      }
    }
    function detectFood() {
      if (!state.cameraReady) {
        $("#scanStatus").textContent = t("scanNeedsCamera");
        return;
      }
      $("#scanStatus").textContent = t("analyzing");
      setTimeout(() => {
        const dish = dishes[Math.floor(Date.now() / 1000) % dishes.length];
        state.scanned = dish.id;
        $("#scanStatus").textContent = t("demoResult") + ": " + local(dish)[0] + " / " + dish.ko;
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
    $("#detectBtn").disabled = true;
    bindTap("#toSearch", () => {
      setScreen("search");
      setTimeout(() => $("#query").focus(), 80);
    });
    bindTap("#toChallenge", () => {
      setScreen("challenge");
      renderChallenge();
    });
    bindTap("#toScan", () => { setScreen("scan"); startCamera(); });
    $$("[data-home]").forEach(btn => bindTap(btn, () => setScreen("home")));
    $("#query").oninput = (e) => {
      state.query = e.target.value;
      state.selected = null;
      renderResults();
    };
    $("#clear").onclick = () => {
      state.query = "";
      state.selected = null;
      $("#query").value = "";
      renderResults();
    };
    bindTap("#cameraBtn", startCamera);
    bindTap("#detectBtn", detectFood);
    bindTap("#submitChallenge", submitChallengeEntry);
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
  description: "Mobile guide for eating Korean food with search, camera scan flow, Korean staff phrases, and monthly Korean-style bite challenges.",
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

const serviceWorker = String.raw`const CACHE = "k-bite-guide-v22";
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

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function legalPage(title, body) {
  return String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#101419">
  <title>${title} - K-Bite Guide</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #17120d; color: #fff7ea; }
    main { width: min(100%, 430px); min-height: 100dvh; margin: 0 auto; padding: max(18px, env(safe-area-inset-top)) 18px max(24px, env(safe-area-inset-bottom)); }
    a { color: #f4d06f; }
    .card { display: grid; gap: 16px; border: 1px solid rgba(255,255,255,.12); border-radius: 22px; background: #241a13; padding: 18px; }
    h1 { margin: 0; font-size: 30px; line-height: 1.08; }
    h2 { margin: 10px 0 0; font-size: 18px; }
    p, li { color: #d8c3a5; line-height: 1.55; }
    ul { margin: 0; padding-left: 20px; display: grid; gap: 8px; }
    .price { color: #f4d06f; font-weight: 800; }
    .cta { display: inline-flex; justify-content: center; border-radius: 14px; background: #f4d06f; color: #20150a; padding: 12px 14px; text-decoration: none; font-weight: 800; }
    .plans { display: grid; gap: 12px; }
    .plan { display: grid; gap: 10px; border: 1px solid rgba(255,255,255,.12); border-radius: 16px; background: rgba(255,255,255,.04); padding: 14px; }
    .plan h2 { margin: 0; }
    .plan .cta { width: 100%; box-sizing: border-box; }
    .note { font-size: 13px; color: #bda98d; }
    .back { display: inline-block; margin-bottom: 14px; text-decoration: none; }
  </style>
</head>
<body>
  <main>
    <a class="back" href="/">← Back to K-Bite Guide</a>
    <article class="card">
      <h1>${title}</h1>
      ${body}
    </article>
  </main>
</body>
</html>`;
}

const pages = {
  "/about": legalPage("About", String.raw`
    <p>K-Bite Guide is a free mobile guide for foreign visitors in Korea. It helps travelers search Korean dishes, scan food, learn table customs, and ask restaurant staff simple questions in Korean.</p>
    <p>The guide focuses on practical eating steps: how to grill meat, wrap ssam, mix bibimbap, add an egg to sundubu jjigae, and choose sauces for raw fish or barbecue.</p>
    <p>The monthly bite challenge invites users to eat a dish Korean style first, create their own best bite, and share it. Restaurants and food brands can sponsor a featured local method by highlighting a real house sauce, product pairing, or limited reward.</p>
    <p>K-Bite Guide is designed for iPhone Safari and Android Chrome as an installable mobile web app.</p>
  `),
  "/privacy": legalPage("Privacy Policy", String.raw`
    <p>Last updated: August 2, 2026</p>
    <h2>Information we collect</h2>
    <p>K-Bite Guide does not require an account and does not ask users to submit personal information. Search text and selected language are processed in the browser for app functionality.</p>
    <h2>Camera</h2>
    <p>The scan feature may request camera permission on the user's device. Camera access is used only to show a local preview and identify food inside the app flow. K-Bite Guide does not store camera images on this site.</p>
    <h2>Advertising and analytics</h2>
    <p>This site may display advertising in the future to keep the guide free. Advertising partners may use cookies or similar technologies according to their own policies. Users can review how Google uses information from partner sites at <a href="https://policies.google.com/technologies/partner-sites">Google's partner sites policy</a>.</p>
    <h2>Contact</h2>
    <p>For privacy questions, contact the site owner through the contact page.</p>
  `),
  "/contact": legalPage("Contact", String.raw`
    <p>For feedback, food corrections, language suggestions, restaurant partnerships, challenge sponsorships, or advertising inquiries, contact the K-Bite Guide owner.</p>
    <p>Email: <a href="mailto:uk.dscheon@gmail.com">uk.dscheon@gmail.com</a></p>
  `),
  "/partners": legalPage("K-Bite 파트너 안내", String.raw`
    <p>K-Bite Guide는 외국인 방문자가 한국 음식을 검색하고, 한국식으로 먹는 법을 익힌 뒤, 관련 소스, 식당, 제품, 챌린지로 자연스럽게 이동하게 만드는 참여형 K-food 가이드입니다.</p>
    <div class="plans">
      <section class="plan">
        <h2>1. 음식 상세 스폰서</h2>
        <p><span class="price">파일럿: 음식 1개당 월 150,000원</span></p>
        <p>특정 음식 상세 화면에 식당의 하우스 소스, 대표 한입 조합, 제품 페어링을 노출합니다.</p>
        <a class="cta" href="/buy?plan=dish">음식 상세 스폰서 구매</a>
      </section>
      <section class="plan">
        <h2>2. 검색 화면 스폰서</h2>
        <p><span class="price">파일럿: 카테고리 1개당 월 500,000원</span></p>
        <p>사용자가 음식을 확정하기 전 검색 화면의 광고 영역을 선점합니다.</p>
        <a class="cta" href="/buy?plan=search">검색 화면 스폰서 구매</a>
      </section>
      <section class="plan">
        <h2>3. 월간 챌린지 스폰서</h2>
        <p><span class="price">파일럿: 월 1,500,000원</span></p>
        <p>월간 주제를 후원하고, 우승 조합에 쿠폰, 시식 세트, 식사권, 브랜드 상품을 보상으로 제공할 수 있습니다.</p>
        <a class="cta" href="/buy?plan=challenge">월간 챌린지 스폰서 구매</a>
      </section>
    </div>
    <p class="note">결제는 Stripe Payment Links 또는 Polar Checkout Links 중 하나를 연결해 즉시 구매 방식으로 운영할 수 있습니다. 결제 링크가 연결되면 위 버튼이 바로 결제창으로 이동합니다.</p>
  `),
};

const paymentPlans = {
  adfree: {
    title: "앱 사용자 광고 제거",
    price: "월 2,900원",
    envKey: "PAYMENT_ADFREE_URL"
  },
  dish: {
    title: "음식 상세 스폰서",
    price: "월 150,000원",
    envKey: "PAYMENT_DISH_SPONSOR_URL"
  },
  search: {
    title: "검색 화면 스폰서",
    price: "월 500,000원",
    envKey: "PAYMENT_SEARCH_SPONSOR_URL"
  },
  challenge: {
    title: "월간 챌린지 스폰서",
    price: "월 1,500,000원",
    envKey: "PAYMENT_CHALLENGE_SPONSOR_URL"
  }
};

function paymentPage(plan) {
  return legalPage("결제 링크 준비 중", String.raw`
    <p><strong>${plan.title}</strong> 상품은 <span class="price">${plan.price}</span> 파일럿으로 판매됩니다.</p>
    <p>직접 구매를 사용하려면 Stripe Payment Links 또는 Polar Checkout Links에서 상품별 결제 링크를 만든 뒤 Sites 환경변수에 연결하세요.</p>
    <ul>
      <li>${plan.envKey}: 이 상품의 결제 링크</li>
      <li>결제 링크가 연결되면 구매 버튼이 바로 결제창으로 이동합니다.</li>
      <li>문의 없이 바로 구매하는 구조를 유지하기 위해 메일 링크는 제거했습니다.</li>
    </ul>
    <a class="cta" href="/partners">파트너 상품으로 돌아가기</a>
  `);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/buy") {
      const plan = paymentPlans[url.searchParams.get("plan") || ""];
      if (!plan) return Response.redirect(new URL("/partners", url).toString(), 302);
      const link = env?.[plan.envKey] || "";
      if (/^https:\/\/(buy\.stripe\.com|checkout\.polar\.sh)\//.test(link)) {
        return Response.redirect(link, 302);
      }
      return new Response(paymentPage(plan), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
    if (pages[url.pathname]) {
      return new Response(pages[url.pathname], {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
    if (url.pathname === "/manifest.webmanifest") {
      return new Response(JSON.stringify(manifest), {
        headers: { "content-type": "application/manifest+json; charset=utf-8" },
      });
    }
    if (url.pathname === "/ads.txt") {
      const publisherId = env?.ADSENSE_PUBLISHER_ID || "";
      const body = publisherId ? `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n` : "# Add ADSENSE_PUBLISHER_ID to publish ads.txt\n";
      return new Response(body, {
        headers: { "content-type": "text/plain; charset=utf-8" },
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
    const adsenseClient = env?.ADSENSE_CLIENT ? escapeHtml(env.ADSENSE_CLIENT) : "";
    const monetizedHtml = adsenseClient
      ? html.replace("</head>", `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}" crossorigin="anonymous"></script></head>`)
      : html;
    return new Response(monetizedHtml, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "permissions-policy": "camera=*",
      },
    });
  },
};
