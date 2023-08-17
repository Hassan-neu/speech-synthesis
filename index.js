const btn = document.querySelector(".btn");
const screen = document.querySelector(".main-screen");
const voiceSelect = document.querySelector("[name='voice']");
const ranges = document.querySelectorAll("[type='range']");
const speech = new SpeechSynthesisUtterance(screen.innerText);
function fetchVoices() {
    const voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices
        .map(
            (voice) =>
                `<option value='${voice.name}'> ${voice.voiceURI} (${voice.lang})</option>`
        )
        .join("");
}

function selectVoice() {
    speech.voice = speechSynthesis
        .getVoices()
        .find(({ name }) => name === this.value);
    speak();
}
function speak() {
    const mode = speechSynthesis.speaking ? "SPEAK 🔊" : "STOP 🚫⛔";
    console.log(mode);
    if (speechSynthesis.speaking) {
        btn.innerText = mode;
        return speechSynthesis.cancel();
    } else {
        btn.innerText = mode;
        speechSynthesis.speak(speech);
    }
}

ranges.forEach((range) =>
    range.addEventListener("change", function () {
        speech[this.name] = this.value;
        console.log(this.value);
        speak();
    })
);
voiceSelect.addEventListener("change", selectVoice);
speechSynthesis.addEventListener("voiceschanged", fetchVoices);
btn.addEventListener("click", speak);
