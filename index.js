let mediaRecorder;
let audiochunks = [] 

const startRecording = async () => {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true})
        console.log("Hello")
        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = event =>{
            audiochunks.push(event.data)
        }
        
        // Create a blob once recording done 
        mediaRecorder.onstop = () => {
            // combine all chunks into 1 blob
            const blob = new Blob(audiochunks, {type : "audio/mp4"})

            // create downloadable URL from the Blob 
            const audioURL = URL.createObjectURL(blob)
            const downloadLink = document.createElement("a")
            downloadLink.href = audioURL
            downloadLink.download = "audio.mp4"
            downloadLink.textContent = "Downloading"
            document.body.appendChild(downloadLink)

            // Reset chunks for next session 
            audiochunks = []
        }

        // start recording 
        mediaRecorder.start()
        console.log("recording started")

    } 
    catch(err){
        // Error Handling 
        console.log("Microphone access denied or error :", err)
    }
}

const stopRecording = () => {
    // stop only when recoring in transition 
    if (mediaRecorder && mediaRecorder.state !== "inactve"){
        mediaRecorder.stop()
        console.log("Recording stopped")
    }

}


document.getElementById('start-Btn').addEventListener('click',startRecording)
document.getElementById('stop-Btn').addEventListener('click',stopRecording)