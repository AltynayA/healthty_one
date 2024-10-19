function submitForm(stepData, endpoint) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stepData)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Step submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting the step');
    });
}
function loading() {
    let buttonload = document.getElementById('submitForm');
    buttonload.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i> Saving...`;
    buttonload.disabled = true;
    console.log("its loading");

    setTimeout(() => {
        buttonload.innerHTML = "Submit";
        buttonload.disabled = false;
    }, 3000);
  } 


  function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = (chatbox.style.display === 'block') ? 'none' : 'block';
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chat-messages');
    
    if (messageInput.value.trim() !== "") {

        const userMessage = document.createElement('div');
        userMessage.textContent = "You: " + messageInput.value;
        userMessage.classList.add('user-message');
        chatMessages.appendChild(userMessage);


        fetch('https://gemini-api-url.com/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY' 
            },
            body: JSON.stringify({
                message: messageInput.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = document.createElement('div');
            botMessage.textContent = "Бот: " + data.response; 
            botMessage.classList.add('bot-message');
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });

        messageInput.value = ''; 
    }
}

document.getElementById('messageInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

/*document.getElementById('submitForm').addEventListener('click', function() {
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const complaints = document.getElementById('complaints').value;

    const formData = {
        fname: fname,
        lname: lname,
        age: age,
        weight: weight,
        height: height,
        complaints: complaints,
    };

    fetch('/submitForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Form submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting the form');
    });
});
*/




