# cyb technical

### Results

I used Render to host the server and Vercel to host the frontend of this Quiz app. By doing this it is now live on the internet for you to test out. Good luck!
You can reach the app at the following link;

<a href="https://cyb4.vercel.app/" target="_blank">Play the game!</a>

Below is a screen grab of the final product and a quick video showing the game being played.
![Screenshot 2023-11-15 at 15 46 53](https://github.com/Saraesabbagh/cyb4/assets/91126259/0b7fd3d4-1adc-4da8-af0f-13cf8f2bdd87)

https://github.com/Saraesabbagh/cyb4/assets/91126259/131873ea-d0c3-4add-9ba8-d28fcfc71379

### Comments about technical

So far out of the techinicals that I have had to do this turned about to be the most fun. However there were some areas where given more time I would like to improve on.

- TESTING - I'm not happy with my test coverage. I came into some difficulty installing jest testing from scratch into my react app so wasn't able to complete the stretch goal that I would have hoped for.
- REFACTORING- I built everything first so that it would work, with a goal to refactor out the components into their own atomic elements that are then called into the app. I ran out of time to do so. The result whilst is a working app, it's not as clean as I would liked to show.
- LEARNINGS- This task tested me to not just build a basic front end but to insist that api calls were dealt with on a backend. I have built front end apps before so this was a way to use the knowledge I already had but to build on it further to allow for a full full stack application to be built.

### Overview of task instructions

Build a small game where the player needs to correctly guess the film or tv-show of a
Disney character.
![example-quiz](https://github.com/Saraesabbagh/cyb4/assets/91126259/ca918e8e-493e-42c8-a00c-95eace530aa0)

- Use an API to get images and characters information, for example
  https://disneyapi.dev/. You do not need to use this exact API.
- You can make the game look however you want not necessarily like the image above
- Once the game has been completed it should be uploaded to a cloud hosting service
  of your choice and share the link. Share the GitHub repository, or zip of the code.
- You may also issue us with a docker image (or images + docker compose file)
  if you do not access to a cloud hosting service

#### Game Rules

- each game has 10 rounds
- ach round should display a picture of the character and 4 answers, one of them
  being the correct one
- the player only has one guess per round
- characters for each round should appear randomly
- at the end of the 10 rounds, the total score should be displayed

#### Critieria

If time is a limiting factor, not all game rules need to be implemented. However please fill
these criteria so we can understand your front and backend skills.

- There must be a front, and backend component to this game. (i.e. cannot be written
  all in the front end as a Single Page Application)
- Frontend
  - Serves the user interface
  - Submits the users answers to the backend
- Backend
  - Makes the external call to your API of choice
  - Receives the submission request from your frontend - Redirects the user to the next round
  - You may use in-memory session storage (i.e. you do not need to use a
    persistence service like Redis)

### Installation

- clone the repo
- cd into server install packages using:
  ```
  npm install
  ```
- Then run the server by using:

  ```
  node server.js
  ```

- cd into client install packages using:
  ```
  npm install
  ```
- Then run the server by using:

  ```
  npm start
  ```
