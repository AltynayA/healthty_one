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


  document.getElementById('openChat').addEventListener('click', function() {
    document.querySelector('.chatbox').style.display = 'block';
    this.style.display = 'none';
});

document.getElementById('closeChat').addEventListener('click', function() {
    document.querySelector('.chatbox').style.display = 'none';
    document.getElementById('openChat').style.display = 'block';
});

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chat-messages');
    
    if (messageInput.value.trim() !== "") {
        // Отправляем сообщение пользователя
        const userMessage = document.createElement('div');
        userMessage.textContent = "Вы: " + messageInput.value;
        userMessage.classList.add('user-message');
        chatMessages.appendChild(userMessage);

        // Индикатор загрузки
        const loadingMessage = document.createElement('div');
        loadingMessage.textContent = "Бот: Загрузка...";
        loadingMessage.classList.add('bot-message');
        chatMessages.appendChild(loadingMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Прокручиваем чат вниз

        // Отправляем запрос к API
        fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAGkk6jWBgrN-LomV7Kx3THmhCuEfBQQ80', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: messageInput.value // Текст сообщения пользователя
                    }]
                }]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ответ от API:", data); // Выводим ответ в консоль
            chatMessages.removeChild(loadingMessage); // Удаляем индикатор загрузки

            if (data && data.contents && data.contents[0] && data.contents[0].parts[0].text) {
                const botMessage = document.createElement('div');
                botMessage.textContent = "Бот: " + data.contents[0].parts[0].text; 
                botMessage.classList.add('bot-message');
                chatMessages.appendChild(botMessage);
            } else {
                const errorMessage = document.createElement('div');
                errorMessage.textContent = "Ошибка: некорректный ответ от API.";
                errorMessage.classList.add('bot-message');
                chatMessages.appendChild(errorMessage);
            }
            chatMessages.scrollTop = chatMessages.scrollHeight; // Прокручиваем чат вниз
        })
        .catch(error => {
            console.error('Ошибка:', error);
            chatMessages.removeChild(loadingMessage); // Удаляем индикатор загрузки
            const errorMessage = document.createElement('div');
            errorMessage.textContent = "Ошибка: не удалось связаться с API.";
            errorMessage.classList.add('bot-message');
            chatMessages.appendChild(errorMessage);
        });

        messageInput.value = ''; // Очищаем поле ввода
    }
}



  
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




