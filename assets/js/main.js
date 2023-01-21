
function displayProgress(selector, text) {
    const target = selector;
    target.innerHTML = text;
}
  
function authenticateUser(userObj, endpoint) {
    const url = `http://localhost:4000/${endpoint}`;
    const element = document.querySelector('button[type="submit"]');
    const defaultText = element.textContent;

    displayProgress(element, 'Loading...');
    
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObj),
    })
    .then(response => response.json())
    .then((responseObj) => {
    if (responseObj.status === true) {
        const { data } = responseObj;
        sessionStorage.setItem('fullname', `${data.firstname} ${data.lastname}`);
        sessionStorage.setItem('email', data.email);
    
        displayProgress(element, 'Request Success');
    } else {
        displayProgress(element, 'Request Failed!');
    }
    })
    .catch((error) => {
        displayProgress(element, defaultText);
        alert(error);
    });
}  

document.getElementById('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
  
    let endpoint = 'login';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let userDetails = {
      email, password,
    };
  
    if (window.location.href.includes('register')) {
      endpoint = 'register';
      const firstname = document.getElementById('firstName').value;
      const lastname = document.getElementById('lastName').value;
  
      userDetails = {...userDetails, firstname, lastname};
    }
    authenticateUser(userDetails, endpoint);
});