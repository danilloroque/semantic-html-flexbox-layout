// Declaracoes dos elementos usando DOM (Document Object Model)
const videoElemento = document.getElementById("cameraPreview");
const canvas = document.getElementById("canvasCamera");
const botaoTirarFoto = document.getElementById("tirarFoto");
const resultadoCamera = document.getElementById("resultadoCamera");

let cameraStream = null;

// Funcao que habilita a camera no navegador.
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
    resultadoCamera.innerText = "Foto capturada no canvas.";
}

botaoTirarFoto.addEventListener("click", tirarFoto);

configurarCamera();
