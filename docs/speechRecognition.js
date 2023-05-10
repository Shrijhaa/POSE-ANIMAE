if ("webkitSpeechRecognition" in window) {
    let speechRecognition = new webkitSpeechRecognition();
    let final_transcript = "";
    let signword="";
    const signElement =  document.getElementById("sign");
  
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = document.querySelector("#select_dialect").value;
    

    
  
    speechRecognition.onstart = () => {
      document.querySelector("#status").style.display = "block";
      document.querySelector("#final").innerHTML = "";
      signElement.innerHTML="Tell me the word !!! ";

    };
    speechRecognition.onerror = () => {
      document.querySelector("#status").style.display = "none";
      console.log("Speech Recognition Error");
    };
    speechRecognition.onend = () => {
      document.querySelector("#status").style.display = "none";
      const sentenceElement = document.getElementById('final');
      const sentence =sentenceElement.innerHTML;
      const inputsentence= sentence.toLowerCase();
    
      


        if(sentence){
           
            const wordSet = new Set(['hi', 'bye', 'hello']);
            // const sentence = inputsentence;
                for (let word of wordSet) {
                  if (inputsentence.includes(word)) {
                    signword = word;
                    console.log("Match Found : ",signword);
                    break;
                  }
                }
                if(!signword){
                    console.log("!!! No match found - TRY with simple words !!!");
                    signword="TRY AGAIN";
                    signElement.value="";
                    vElement.src="../asset/pastor.mp4";
                }
                
               
              }
              if(signword){
                signElement.innerHTML="SIGN WORD : "+signword;
                signElement.value=signword;
                const vElement = document.getElementById('input_video');          
                vElement.src="../asset/"+signword+".mp4";

              }
              console.log("Speech Recognition Ended");

        };

      

  
    speechRecognition.onresult = (event) => {
      let interim_transcript = "";
      let final_transcript = "";
  
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      document.querySelector("#final").innerHTML = final_transcript;
      document.querySelector("#interim").innerHTML = interim_transcript;
    };
  
    document.querySelector("#start").onclick = () => {
      
      speechRecognition.start();
      
    };
    document.querySelector("#stop").onclick = () => {
      document.querySelector("#final").value=true;
      speechRecognition.stop();
      console.log(final_transcript);
   
    };

} 
   else {
    console.log("Speech Recognition Not Available");
  }