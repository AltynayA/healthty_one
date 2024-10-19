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

function toggleOtherInput() {
    const selectElement = document.getElementById("complaints");
    const otherInput = document.getElementById("otherInput");

    // Show the input box if "Other" is selected
    if (selectElement.value === "other") {
        otherInput.style.display = "block";
    } else {
        otherInput.style.display = "none";
        otherInput.value = ""; // Clear the input if not selected
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




