const quizzes = [
    {
        id: "1",
        question: "2日前から急に右側の耳の後ろが痛み出し、今朝起きたら口の右側から水がこぼれてうまくうがいができません。また、右目が完全に閉じられなくなっています。",
        options: ["1. 耳鼻咽喉科", "2. 眼科", "3. 脳神経外科", "4. 歯科"],
        correct: "1",
        explanation: "顔面神経麻痺（ベル麻痺など）が疑われます。顔面神経は耳の奥を通るため、耳鼻咽喉科が適切です。",
        source: "https://fuelcells.org/topics/85584/"
    },
    {
        id: "2",
        question: "左側の胸からみぞおちにかけて締め付けられる痛み。階段を上ると悪化し、休むと消える。今日になって頻度が増えてきた。",
        options: ["1. 消化器内科", "2. 循環器内科", "3. 呼吸器内科", "4. 整形外科"],
        correct: "2",
        explanation: "運動で悪化し休むと改善する胸痛は狭心症の典型。循環器内科を大至急受診する必要があります。",
        source: "https://fuelcells.org/topics/85584/"
    },
    {
        id: "3",
        question: "23歳男性。食後にみぞおちの痛みを繰り返す。空腹時にも痛みがあり、黒っぽい便が出ることがある。",
        options: ["1. 消化器内科", "2. 循環器内科", "3. 呼吸器内科", "4. 泌尿器科"],
        correct: "1",
        explanation: "胃・十二指腸潰瘍ではみぞおちの痛みや黒色便がみられる。消化器内科が適切。",
        source: "https://www.ashikari-naika.com/gastric_ulcer/"
    },
    {
        id: "4",
        question: "22歳男性。朝起きたときに手の指がこわばり30分以上続く。両手の指の関節が腫れて痛む。",
        options: ["1. 整形外科", "2. リウマチ科", "3. 皮膚科", "4. 神経内科"],
        correct: "2",
        explanation: "関節リウマチの典型症状。自己免疫疾患を専門とするリウマチ科が適切。",
        source: "https://www.rheuma-net.or.jp/rheuma/rheuma/symptoms/symptoms1/"
    },
    {
        id: "5",
        question: "めまい、吐き気、ふらつき。耳鳴りと片耳の聞こえにくさもある。",
        options: ["A. 脳神経内科", "B. 耳鼻咽喉科", "C. 整形外科", "D. 眼科"],
        correct: "2",
        explanation: "「めまい」だけなら脳神経内科も候補ですが、耳鳴りや難聴を伴うため耳鼻咽喉科が適しています。",
        source: "https://www.jibika.or.jp/owned/contents2.html"
    },
    {
        id: "6",
        question: "肩の痛み、腕のしびれ、手に力が入りにくい。首を動かすと症状が変化する。",
        options: ["A. 循環器内科", "B. 整形外科", "C. 脳神経内科", "D. 皮膚科"],
        correct: "2",
        explanation: "腕のしびれは神経の病気にも見えますが、首の動きで症状が変化する場合は頸椎の問題が考えられます。",
        source: "https://www.joa.or.jp/public/sick/condition/paralysis_of_arm.html"
    },
    {
        id: "7",
        question: "胸の痛み、冷や汗。痛みが背中や顎にも広がる。数分間続く。",
        options: ["A. 消化器内科", "B. 整形外科", "C. 循環器内科", "D. 呼吸器内科"],
        correct: "3",
        explanation: "心臓由来の胸痛を疑う症状。ただしこの症状は緊急性が高く、119番通報が必要なケースです。",
        source: "https://www.cvi.or.jp/9d/181/ https://www.jrs.or.jp/citizen/faq/q08.html"
    }
];

const layerChoice = document.getElementById("layer-choice");
const questionText = document.getElementById("question-text");
const optionsGroup = document.getElementById("options-group");
const resultArea = document.getElementById("result-area");
const resultStatus = document.getElementById("result-status");
const explanationText = document.getElementById("explanation-text");
const sourceLink = document.getElementById("source-link");
const nextBtn = document.getElementById("next-btn");

let filtered = quizzes;
let currentIndex = 0;

layerChoice.addEventListener("change", () => {
    const id = layerChoice.value;

    filtered = (id === "all")
        ? quizzes
        : quizzes.filter(q => q.id === id);

    currentIndex = 0;
    renderQuiz(currentIndex);
});

function renderQuiz(index) {
    const quiz = filtered[index];

    questionText.textContent = quiz.question;

    optionsGroup.innerHTML = "";
    quiz.options.forEach((opt, i) => {
        const label = document.createElement("label");
        label.className = "option-item";
        label.innerHTML = `
            <input type="radio" name="choice" value="${i + 1}">
            ${opt}
        `;
        optionsGroup.appendChild(label);
    });

    resultArea.classList.add("hidden");
    nextBtn.classList.add("hidden");
    resultStatus.innerHTML = "";
    explanationText.textContent = "";
    sourceLink.textContent = "";
    sourceLink.href = "#";
}

renderQuiz(currentIndex);

document.getElementById("submit-btn").addEventListener("click", function() {
    const selected = document.querySelector('input[name="choice"]:checked');

    if (!selected) {
        alert("選択肢をどれか1つ選んでください！");
        return;
    }

    const quiz = filtered[currentIndex];

    if (selected.value === quiz.correct) {
        resultStatus.innerHTML = "<span class='correct'>⭕ 正解です！</span>";
    } else {
        resultStatus.innerHTML = "<span class='incorrect'>❌ 不正解です...</span>";
    }

    explanationText.textContent = quiz.explanation;
    sourceLink.textContent = quiz.source;
    sourceLink.href = quiz.source;

    resultArea.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < filtered.length - 1) {
        currentIndex++;
        renderQuiz(currentIndex);
    } else {
        alert("これで全問終了です！");
    }
});
