const buttons = document.getElementsByClassName("button");
const inputField = document.getElementById("input-number");
const infoParagraph=document.getElementById("info");

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", (event) => {
        infoParagraph.style.display="none";
        let inputText = "";
        switch (event.target.innerHTML) {
            case "C":
                break;
            case "←":
                inputText = inputField.value.slice(0, inputField.value.length - 1);
                break;

            case "=":
                try {
                    inputText = eval(inputField.value);
                    break;
                }
                catch (e) {
                    inputText = "";
                    infoParagraph.style.display="block";
                    infoParagraph.innerHTML ="Invalid Operation";
                    break;
                }
            default:
                inputText = `${inputField.value}${event.target.innerHTML}`;
                break;
        }
        inputField.value = inputText;

    })
}
