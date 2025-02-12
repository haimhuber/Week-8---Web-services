function getDataFromWebAPI() {
    fetch("https://randomuser.me/api/?results=50")
        .then((dataFromApi) => { return dataFromApi.json(); }) // Waiting for respone from web api
        .then((dataAsObj) => {   // Waiting to collect all data from dataFromApi
            const dataIn = dataAsObj;
            for (const curr of dataAsObj.results) {
                let currentCard = document.createElement('div');
                currentCard.classList.add('profileCard');
                let userName = document.createElement('h3');
                let userEmail = document.createElement('p');
                let userPicture = document.createElement('img');
                userPicture.setAttribute('src', `${curr.picture.large}`);
                userEmail.textContent = `${curr.email}`;
                userName.textContent = `${curr.name.first} ${curr.name.last}`;
                currentCard.appendChild(userPicture);
                currentCard.appendChild(userName).nextSibling;
                currentCard.appendChild(userEmail).nextSibling;
                document.querySelector("#myDiv").appendChild(currentCard);

            }
        })
}