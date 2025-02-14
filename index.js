function taskInfo() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((usersInfo) => { return usersInfo.json(); })
        .then((usersAsObj) => {
            usersAsObj.forEach(user => {
                const mainUserDiv = document.createElement('div');
                mainUserDiv.classList.add('userProfile');
                const userName = document.createElement('h4');
                userName.textContent = user.name;
                userName.classList.add('user');
                const userEmail = document.createElement('h4');
                userEmail.textContent = user.email;
                userEmail.classList.add('user');
                // Creating arrow for tasks -> includes text & pic
                const taskInfo = document.createElement('h5');
                taskInfo.classList.add('user');
                taskInfo.textContent = 'Click to show user tasks';
                const taskArrow = document.createElement('img');
                taskArrow.setAttribute('src', "https://icons.veryicon.com/png/o/miscellaneous/official-icon-of-flying-pig/drop-down-arrow-small.png");
                taskArrow.classList.add('arrow');
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('arrow');
                taskDiv.appendChild(taskInfo);
                taskDiv.appendChild(taskArrow).nextSibling;
                // (**********************************************************************)
                // Creating taks info -> includes text & pic
                fetch("https://jsonplaceholder.typicode.com/todos")
                    .then((usersTasks) => { return usersTasks.json(); })
                    .then((userTaskAsObj) => {
                        for (let currIndex = 1; currIndex < userTaskAsObj.length; currIndex++) {
                            const usersActiveTasks = document.createElement('li');
                            if (userTaskAsObj[currIndex].userId === user.id) {
                                usersActiveTasks.textContent = userTaskAsObj[currIndex].title;
                                usersActiveTasks.classList.add('hidden');
                                mainUserDiv.appendChild(usersActiveTasks).nextSibling;
                                if (userTaskAsObj[currIndex].completed) {
                                    usersActiveTasks.classList.add('taskCompleted');
                                }
                            }
                            taskArrow.addEventListener('click', () => {
                                taskArrow.classList.toggle('rotate');
                                usersActiveTasks.classList.toggle('hidden');

                            })
                        }
                    })
                // (**********************************************************************)

                mainUserDiv.appendChild(userName);
                mainUserDiv.appendChild(userEmail).nextSibling;
                mainUserDiv.appendChild(taskDiv).nextSibling;
                document.querySelector(".mainDiv").appendChild(mainUserDiv);


            });
        })
}