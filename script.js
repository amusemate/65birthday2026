"use strict";

// ===== 編集しやすいデータ置き場 =====
// 盤面、ヒント、回答、解説はここを書き換えると変更できます。
// 「■」は黒マスとして扱います。
const puzzle = {
  grid: [
    "■に■■ゆは■ぱめだす",
    "■じ■■たんごきちっき",
    "■ゅ■■かぎびけゃきぴ",
    "ざうるすんょさふくゅお",
    "■じ■■ちどばぁそうど",
    "■か■たゅんくろねえく",
    "おんなやましすさ■■た",
    "いいー■■みもういやー",
    "でなふ■■か■る■■す",
    "ぃいしゃいんますかっと",
    "およろ■■こくほう■ー",
    "すかじのろこもーしょん"
  ],
  password: "たんじょうびおめでとう",
  // PASSWORD用の丸数字を表示するマスです。row/colは0から数えます。
  passwordCells: [
    { row: 1, col: 4 }, // た
    { row: 1, col: 5 }, // ん
    { row: 1, col: 1 }, // じ
    { row: 3, col: 5 }, // ょ
    { row: 3, col: 1 }, // う
    { row: 2, col: 6 }, // び
    { row: 6, col: 0 }, // お
    { row: 0, col: 8 }, // め
    { row: 8, col: 0 }, // で
    { row: 9, col: 10 }, // と
    { row: 10, col: 8 } // う
  ],
  clues: {
    down: [
      { number: 1, answer: "にじゅうじかん", row: 0, col: 1, direction: "down", text: "鏑木「鏑木だけがさ1日○○○○○○○Twitter見てるみたいな感じみたいな感じになっちゃってるんじゃんか！」" },
      { number: 2, answer: "ゆたかんちゅ", row: 0, col: 4, direction: "down", text: "貧乏人の対義語" },
      { number: 3, answer: "はんぎょどん", row: 0, col: 5, direction: "down", text: "鏑木の好きなサンリオキャラ" },
      { number: 4, answer: "ぱきけふぁろさうるす", row: 0, col: 7, direction: "down", text: "鏑木の好きな恐竜" },
      { number: 5, answer: "めちゃくそ", row: 0, col: 8, direction: "down", text: "鏑木の初めての歌ってみた動画『ぼくの夢、○○○○○無限湧き』" },
      { number: 6, answer: "だっきゅう", row: 0, col: 9, direction: "down", text: "鏑木じゃんけん、グーチョキパー以外は肩がどうなる？" },
      { number: 7, answer: "すきぴお", row: 0, col: 10, direction: "down", text: "鏑木の好きな歴史上の人物" },
      { number: 8, answer: "ごびさばく", row: 1, col: 6, direction: "down", text: "サハラ砂漠のように直訳すると砂漠砂漠という意味になる場所の名前" },
      { number: 10, answer: "どくたーすとーん", row: 4, col: 10, direction: "down", text: "鏑木が事あるごとに語っている大好きな漫画" },
      { number: 11, answer: "たや", row: 5, col: 3, direction: "down", text: "ろこたやの愛称" },
      { number: 14, answer: "なーふしろ", row: 6, col: 2, direction: "down", text: "かに座優遇に屈しないリスナーの書き込み「かに座○○○○○」" },
      { number: 15, answer: "いでぃおす", row: 7, col: 0, direction: "down", text: "最強激かわ集団" },
      { number: 16, answer: "いないよ", row: 7, col: 1, direction: "down", text: "何かから隠れたい時に言う言葉" },
      { number: 17, answer: "みかんこ", row: 7, col: 5, direction: "down", text: "にじさんじ遊戯王祭2度目の出場で使用したデッキの名前" }
    ],
    across: [
      { number: 9, answer: "ざうるす", row: 3, col: 0, direction: "across", text: "レッドブラッディダークザウルスの略称" },
      { number: 12, answer: "くろねえ", row: 5, col: 6, direction: "across", text: "クーロクロクロ！お前らにこのクロスワードが解けるか見もの○○○○！" },
      { number: 13, answer: "おんな", row: 6, col: 0, direction: "across", text: "やぴたうん「○○○　すき　おすすめ」" },
      { number: 14, answer: "なやましす", row: 6, col: 2, direction: "across", text: "悩ましい時の鏑木の口癖" },
      { number: 18, answer: "もういや", row: 7, col: 6, direction: "across", text: "Idios 1st LIVE披露楽曲の歌詞改変「もう嫌い！」→「○○○○！」" },
      { number: 19, answer: "しゃいんますかっと", row: 9, col: 2, direction: "across", text: "おいしいぶどう" },
      { number: 20, answer: "こくほう", row: 10, col: 5, direction: "across", text: "○○○○ミーム「あなた、クロスワードが憎いんでしょう。でもそれでもいいの、それでもやるの」" },
      { number: 21, answer: "かじのろこもーしょん", row: 11, col: 1, direction: "across", text: "ディーラー鏑木が働いているカジノの正式名" }
    ]
  }
};

const explanations = [
  { group: "縦のカギ", number: 1, answer: "にじゅうじかん", text: "マイクラ配信にてミームの解説を求められた鏑木の言葉。「鏑木だけがさ1日20時間Twitter見てるみたいな感じみたいな感じになっちゃってるんじゃんか！」", url: "https://www.youtube.com/live/jBc_7YA639Q" },
  { group: "縦のカギ", number: 2, answer: "ゆたかんちゅ", text: "豊人と書いてゆたかんちゅと読む。スノッブ鏑木が貧乏人を豊人にするべく含蓄あるアドバイスを施してくださる非常にありがたい配信もある。", url: "https://www.youtube.com/live/68WxGW_hd6E" },
  { group: "縦のカギ", number: 3, answer: "はんぎょどん", text: "Xのリプ返にて複数回言及が確認されている。（一般の方へのリプライのため引用は割愛）" },
  { group: "縦のカギ", number: 4, answer: "ぱきけふぁろさうるす", text: "2026年65の日配信にて、自作ゲームをプレイしてくれた後輩ライバーから好きな恐竜を聞かれた際の返答。", url: "https://www.youtube.com/live/h5qutQOMhx4" },
  { group: "縦のカギ", number: 5, answer: "めちゃくそ", text: "鏑木の初めての歌ってみた動画『ぼくの夢、メチャクソ無限湧き』。鏑木が自作した手描き+実写の動画も必見。", url: "https://youtu.be/2tEyGR-QReY" },
  { group: "縦のカギ", number: 6, answer: "だっきゅう", text: "朝配信「おはろこ！」内で行われている鏑木じゃんけんのルール。「ここがグー、ここがチョキ、ここがパーで戦いましょう。買ったら良いこと2倍、負けたらやなこと2倍、あいこは特に変化なし。グーチョキパー以外とフライングは肩脱臼」", url: "https://youtube.com/playlist?list=PLFa9jhofs5Iujz7yoMiS6Rh_vG-1obvk1&si=_zHzNy1_CcFvVRZ-" },
  { group: "縦のカギ", number: 7, answer: "すきぴお", text: "デビュー直後に投稿された動画での発言。", url: "https://youtu.be/mK5QuondtKA" },
  { group: "縦のカギ", number: 8, answer: "ごびさばく", text: "雑学でモテようとした鏑木が最初に披露したネタ。", url: "https://www.youtube.com/live/juK6wWaQWoU" },
  { group: "縦のカギ", number: 10, answer: "どくたーすとーん", text: "鏑木が事あるごとに語っている大好きな漫画。配信の端々で挟まれるオタク語り、公式番組での熱量溢れるプレゼン、メン限での同時視聴などからドクスト愛を垣間見ることができる。", url: "https://youtu.be/rhImp6Rfyt0" },
  { group: "縦のカギ", number: 11, answer: "たや", text: "ろこたやの愛称。ネガらきなどの他人格たちからこう呼ばれることがあるが、ろこたや本人はあまり気に入っていない様子。", url: "https://www.youtube.com/live/QIPg0B-KHNw" },
  { group: "縦のカギ", number: 14, answer: "なーふしろ", text: "かに座優遇を許すな", url: "https://youtube.com/playlist?list=PLFa9jhofs5Iujz7yoMiS6Rh_vG-1obvk1&si=_zHzNy1_CcFvVRZ-" },
  { group: "縦のカギ", number: 15, answer: "いでぃおす", text: "最強激かわ集団といえばいでぃおす。いでぃおすといえば最強激かわ集団。", url: "https://youtu.be/ksIONO5Cf6w" },
  { group: "縦のカギ", number: 16, answer: "いないよ", text: "ゲーム配信中等に何かから姿かを隠したい時鏑木がよく言う言葉。コメントでは「ｲﾅｲﾖ」と表記されることが多い。切り抜きも作られているので気になった方はぜひ検索してほしい。" },
  { group: "縦のカギ", number: 17, answer: "みかんこ", text: "にじさんじ遊戯王祭2度目の出場で使用した御巫（みかんこ）デッキ。M∀LICEデッキは使わなかったマリスよ。", url: "https://youtube.com/playlist?list=PLFa9jhofs5IuQ7dmhXPMH12x-9lLan7KO&si=clwXn5iT6bdO5vDh" },
  { group: "横のカギ", number: 9, answer: "ざうるす", text: "にじさんじベイブレード部にて鏑木が使用しているベイであるレッドブラッディダークザウルスの略称。強い。なお、レッドブラッディダークザウルスというのは鏑木が考案した名前で、正式な商品名は「ティラノビート」。", url: "https://www.youtube.com/live/AHsPSEu16gk" },
  { group: "横のカギ", number: 12, answer: "くろねえ", text: "鏑木が語尾を使う際によく使用される構文。ゴ〜ビゴビゴビ！語尾使う頻度高すぎて語尾切り抜きまで出てるから調べてみるゴビよ〜！" },
  { group: "横のカギ", number: 13, answer: "おんな", text: "2026年エイプリルフール配信にてやぴたうんが発した言葉。やぴたうん かわいい おすすめ。", url: "https://www.youtube.com/live/n0BFqsDHgUI" },
  { group: "横のカギ", number: 14, answer: "なやましす", text: "悩ましい状況で発される鏑木の口癖。Idiosの楽曲『Iキャラライン』の歌詞『それってイディオシス？』が元ネタ。", url: "https://www.youtube.com/live/fzLDBT9Ujl0" },
  { group: "横のカギ", number: 18, answer: "もういや", text: "Idios 1st LIVEにて鏑木が披露した楽曲『Booo!』。『今日が何の日かお忘れですか？ でも誕生日なんて言うのもちょっと癪ね（もう嫌い！）』というのが本来の歌詞だが、鏑木は嫌いではない相手に『もう嫌い』という言い方をするのは鏑木ろこらしくないと思い『もう嫌！』に改変したという。", url: "https://www.youtube.com/live/5EoSGDNXyaw" },
  { group: "横のカギ", number: 19, answer: "しゃいんますかっと", text: "何か行動を起こす際「○○しますかっと」という宣言に続けて発される「おいしいぶどうシャインマスカット」という鏑木の口癖。鏑木本人は最近あまり言わなくなったが、一部のリスナーはいまだに擦っているとかいないとか。" },
  { group: "横のカギ", number: 20, answer: "こくほう", text: "「あなた、○○が憎いんでしょ。でもそれでもいいの。それでもやるの」映画『国宝』のワンシーンに出てくるセリフを改変した、鏑木と某同期だけが擦っているミーム。", url: "https://youtube.com/shorts/IAg_LFZj36M" },
  { group: "横のカギ", number: 21, answer: "かじのろこもーしょん", text: "ディーラー鏑木が働いているカジノ。カジノの経営難によりスーパーロコモーションへ出張する回もある。", url: "https://youtube.com/playlist?list=PLFa9jhofs5Is_9aXHSI5ydhyhUdnGLi1b&si=UUZY4prDoIoyJO6R" }
];

const boardElement = document.getElementById("crossword-board");
const checkButton = document.getElementById("check-button");
const checkMessage = document.getElementById("check-message");
const passwordPanel = document.getElementById("password-panel");
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");
const passwordMessage = document.getElementById("password-message");
const howToDialog = document.getElementById("how-to-dialog");

const cells = [];
let isComposing = false;

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("hidden", screen.id !== screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sanitizeAllowedInput(value) {
  return value.replace(/[^ぁ-んーA-Za-z]/g, "");
}

function getKanaOnly(value) {
  return value.replace(/[^ぁ-んー]/g, "");
}

function getCellKey(row, col) {
  return `${row}-${col}`;
}

function isVerticalLongMark(row, col) {
  const verticalLongCells = [
    { row: 7, col: 10 }, // 縦10「どくたーすとーん」の1つ目の「ー」
    { row: 10, col: 10 }, // 縦10「どくたーすとーん」の2つ目の「ー」
    { row: 7, col: 2 } // 縦14「なーふしろ」の「ー」
  ];

  return verticalLongCells.some((cell) => cell.row === row && cell.col === col);
}

function makeNumberMaps() {
  const clueNumbers = new Map();
  const passwordNumbers = new Map();

  [...puzzle.clues.down, ...puzzle.clues.across].forEach((clue) => {
    clueNumbers.set(getCellKey(clue.row, clue.col), clue.number);
  });

  puzzle.passwordCells.forEach((cell, index) => {
    passwordNumbers.set(getCellKey(cell.row, cell.col), `㉑`.codePointAt(0) ? toCircleNumber(index + 1) : String(index + 1));
  });

  return { clueNumbers, passwordNumbers };
}

function toCircleNumber(number) {
  const circleNumbers = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪"];
  return circleNumbers[number - 1] || String(number);
}

function buildBoard() {
  const { clueNumbers, passwordNumbers } = makeNumberMaps();
  const gridRows = puzzle.grid.map((row) => [...row]);

  gridRows.forEach((rowCells, rowIndex) => {
    cells[rowIndex] = [];

    rowCells.forEach((answerChar, colIndex) => {
      const cell = document.createElement("div");
      cell.className = "cell";
      const key = getCellKey(rowIndex, colIndex);

      if (answerChar === "■") {
        cell.classList.add("block");
        boardElement.appendChild(cell);
        cells[rowIndex][colIndex] = null;
        return;
      }

      if (passwordNumbers.has(key)) {
        cell.classList.add("password-cell");
      }

      if (isVerticalLongMark(rowIndex, colIndex)) {
        cell.classList.add("vertical-long");
      }

      if (clueNumbers.has(key)) {
        const clueNumber = document.createElement("span");
        clueNumber.className = "clue-number";
        clueNumber.textContent = clueNumbers.get(key);
        cell.appendChild(clueNumber);
      }

      if (passwordNumbers.has(key)) {
        const passwordNumber = document.createElement("span");
        passwordNumber.className = "password-number";
        passwordNumber.textContent = passwordNumbers.get(key);
        cell.appendChild(passwordNumber);
      }

      const input = document.createElement("input");
      input.type = "text";
      input.inputMode = "kana";
      input.autocomplete = "off";
      input.dataset.answer = answerChar;
      input.dataset.row = rowIndex;
      input.dataset.col = colIndex;
      input.setAttribute("aria-label", `${rowIndex + 1}行${colIndex + 1}列`);

      input.addEventListener("compositionstart", () => {
        isComposing = true;
      });

      input.addEventListener("compositionend", (event) => {
        isComposing = false;
        acceptInput(event.target);
      });

      input.addEventListener("input", (event) => {
        if (!isComposing) {
          acceptInput(event.target);
        }
      });

      input.addEventListener("keydown", (event) => {
        handleBackspace(event);
      });

      cell.appendChild(input);
      boardElement.appendChild(cell);
      cells[rowIndex][colIndex] = input;
    });
  });
}

function acceptInput(input) {
  const allowedText = sanitizeAllowedInput(input.value);
  const kana = getKanaOnly(allowedText);

  if (kana) {
    input.value = kana.slice(-1);
  } else {
    input.value = allowedText.slice(-1);
  }

  updateCheckButton();

  if (kana) {
    focusNextCell(Number(input.dataset.row), Number(input.dataset.col));
  }
}

function handleBackspace(event) {
  if (event.key !== "Backspace") {
    return;
  }

  const input = event.target;
  if (input.value) {
    input.value = "";
    updateCheckButton();
    return;
  }

  event.preventDefault();
  focusPreviousCell(Number(input.dataset.row), Number(input.dataset.col));
}

function getFlatInputs() {
  return cells.flat().filter(Boolean);
}

function focusNextCell(row, col) {
  const inputs = getFlatInputs();
  const currentIndex = inputs.indexOf(cells[row][col]);
  const nextInput = inputs[currentIndex + 1];

  if (nextInput) {
    nextInput.focus();
    nextInput.select();
  }
}

function focusPreviousCell(row, col) {
  const inputs = getFlatInputs();
  const currentIndex = inputs.indexOf(cells[row][col]);
  const previousInput = inputs[currentIndex - 1];

  if (previousInput) {
    previousInput.focus();
    previousInput.select();
  }
}

function updateCheckButton() {
  checkButton.disabled = getFlatInputs().some((input) => input.value === "");
}

function checkAnswers() {
  const allCorrect = getFlatInputs().every((input) => input.value === input.dataset.answer);

  if (!allCorrect) {
    showStatus(checkMessage, "TRY AGAIN!", "error");
    return;
  }

  showStatus(checkMessage, "CLEAR!", "success");
  unlockPassword();
}

function unlockPassword() {
  passwordPanel.classList.remove("locked");
  passwordInput.disabled = false;
  passwordButton.disabled = false;
  passwordInput.focus();
}

function checkPassword() {
  const typedPassword = getKanaOnly(passwordInput.value);

  if (typedPassword === puzzle.password) {
    showStatus(passwordMessage, "", "success");
    showScreen("celebration-screen");
    return;
  }

  showStatus(passwordMessage, "PASSWORD ERROR", "error");
}

function showStatus(element, text, type) {
  element.textContent = text;
  element.className = `status-message ${type}`;
}

function buildClues() {
  renderClueList("down-clues", puzzle.clues.down);
  renderClueList("across-clues", puzzle.clues.across);
}

function renderClueList(elementId, clues) {
  const list = document.getElementById(elementId);

  clues.forEach((clue) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${clue.number}</strong>${clue.text}`;
    list.appendChild(item);
  });
}

function buildExplanations() {
  const list = document.getElementById("explanation-list");

  explanations.forEach((item) => {
    const wrapper = document.createElement("article");
    wrapper.className = "accordion-item";

    const button = document.createElement("button");
    button.className = "accordion-button";
    button.type = "button";
    button.innerHTML = `<strong>${item.group} ${item.number}. ${item.answer}</strong><span>OPEN</span>`;

    const body = document.createElement("div");
    body.className = "accordion-body";
    body.innerHTML = `<p>${item.text}</p>`;

    if (item.url) {
      const videoButton = document.createElement("button");
      videoButton.className = "pixel-button small";
      videoButton.type = "button";
      videoButton.textContent = "動画を見る";

      const videoArea = document.createElement("div");
      videoArea.className = "video-area";

      videoButton.addEventListener("click", () => {
        showVideo(videoArea, item.url);
        videoButton.disabled = true;
      });

      body.appendChild(videoButton);
      body.appendChild(videoArea);
    }

    button.addEventListener("click", () => {
      const isOpen = wrapper.classList.toggle("open");
      button.querySelector("span").textContent = isOpen ? "CLOSE" : "OPEN";
    });

    wrapper.appendChild(button);
    wrapper.appendChild(body);
    list.appendChild(wrapper);
  });
}

function showVideo(target, url) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    target.innerHTML = `<a class="plain-link" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.title = "YouTube video player";
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  target.replaceChildren(iframe);
}

function getYouTubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace("www.", "");

    if (host === "youtu.be") {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}`;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.split("/")[2]}`;
      }

      if (parsedUrl.pathname.startsWith("/live/")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.split("/")[2]}`;
      }
    }
  } catch (error) {
    return "";
  }

  return "";
}

function resetGame() {
  getFlatInputs().forEach((input) => {
    input.value = "";
  });
  checkButton.disabled = true;
  checkMessage.textContent = "";
  passwordMessage.textContent = "";
  passwordInput.value = "";
  passwordInput.disabled = true;
  passwordButton.disabled = true;
  passwordPanel.classList.add("locked");
  showScreen("game-screen");
}

document.getElementById("start-button").addEventListener("click", () => showScreen("game-screen"));
document.getElementById("title-how-to-button").addEventListener("click", () => howToDialog.showModal());
document.getElementById("game-how-to-button").addEventListener("click", () => howToDialog.showModal());
document.getElementById("scroll-explanations-button").addEventListener("click", () => {
  document.getElementById("explanations").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("play-again-button").addEventListener("click", resetGame);
checkButton.addEventListener("click", checkAnswers);
passwordButton.addEventListener("click", checkPassword);
passwordInput.addEventListener("input", () => {
  passwordInput.value = sanitizeAllowedInput(passwordInput.value);
});
passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkPassword();
  }
});

buildBoard();
buildClues();
buildExplanations();
