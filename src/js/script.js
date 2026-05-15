// Declaracoes dos elementos usando DOM (Document Object Model)
const videoElemento = document.getElementById("cameraPreview");
const canvas = document.getElementById("canvasCamera");
const botaoTirarFoto = document.getElementById("tirarFoto");
const resultadoCamera = document.getElementById("resultadoCamera");


let cameraStream = null;


function login(){

    let user_email = prompt("Insira seu email:")
    let user_nome = prompt("Insira seu nome:")
    alert(`Seja Bem vindo ${user_nome}!`)
}
/////////////////////////////////////////////////////////////////
/////////// Função que habilita a camera no navegador.//////////
////////////////////////////////////////////////////////////////
async function configurarCamera(){
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        resultadoCamera.innerText = "Seu navegador nao suporta acesso a camera.";
        return;
    }

    try{
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode: { ideal: "environment" }
            },
            audio: false
        });

        videoElemento.srcObject = cameraStream;
        await videoElemento.play();
        resultadoCamera.innerText = "";
    }catch(erro){
        console.error(erro);
        resultadoCamera.innerText = "Erro ao acessar a camera. Verifique a permissao do navegador.";
    }
}

function tirarFoto(){
    if(!videoElemento.videoWidth || !videoElemento.videoHeight){
        resultadoCamera.innerText = "A camera ainda esta carregando.";
        return;
    }

    const context = canvas.getContext("2d");

    canvas.width = videoElemento.videoWidth;
    canvas.height = videoElemento.videoHeight;

    context.drawImage(videoElemento, 0, 0, canvas.width, canvas.height);
    resultadoCamera.innerText = "Foto tirada com sucesso!";
}

botaoTirarFoto.addEventListener("click", tirarFoto);


configurarCamera();
login();

/////////////////////////////////////////////////////////////////
/////////// Botão de pesquisa.//////////
////////////////////////////////////////////////////////////////

const botaoPesquisa = document.getElementById("pesquisa");

botaoPesquisa.addEventListener("click", () => {
    let popupPesquisa = document.getElementById("popupPesquisa");

    if(!popupPesquisa){
        document.body.insertAdjacentHTML(
            "beforeend",
            `
            <div id="popupPesquisa" class="popup-pesquisa">
                <input id="inputPesquisa" type="search" placeholder="Digite sua pesquisa...">
                <p id="resultadoPesquisa" class="resultado-pesquisa oculto"></p>
            </div>
            `
        );

        popupPesquisa = document.getElementById("popupPesquisa");

        const inputPesquisa = document.getElementById("inputPesquisa");
        const resultadoPesquisa = document.getElementById("resultadoPesquisa");

        inputPesquisa.addEventListener("input", () => {
            const textoPesquisa = inputPesquisa.value.trim();

            if(textoPesquisa){
                resultadoPesquisa.innerText = `Resultados para: ${textoPesquisa}`;
                resultadoPesquisa.classList.remove("oculto");
            }else{
                resultadoPesquisa.innerText = "";
                resultadoPesquisa.classList.add("oculto");
            }
        });
    }else{
        popupPesquisa.classList.toggle("oculto");
    }

    const inputPesquisa = document.getElementById("inputPesquisa");

    if(!popupPesquisa.classList.contains("oculto")){
        inputPesquisa.focus();
    }
});
