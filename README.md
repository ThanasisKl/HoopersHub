# HoopersHub
**HoopersHub** is a mobile app created using the **Javascript React Native framework**. It consists of 28 screens and deals with **basketball**. The app can work on android as well as ios devices. The **main** screen of the application is the following:
![Main Screen](/HoopersHubApp/README_assets/main.jpg)

Τhe **functions** of the application are the following:  

## Login/Register
First of all a user can create an account or log in to it. All user's data are stored to a firebase cloud database (firestore).
![Login Screen](/HoopersHubApp/README_assets/login.jpg)  
![Register Screen](/HoopersHubApp/README_assets/register.jpg)

## Training
We display various points on the basketball court where the user **shoots and notes** how many shots he made from each point. When he has taken all the required shots he completes his training and sees how he did. The workouts are stored in the database so the user can see his history. Based on this history the app tells the user what his worst and best point is.

### Training Main Screen
![Training Screen](/HoopersHubApp/README_assets/training.jpg)
### Result after a training
![Training Result Screen](/HoopersHubApp/README_assets/result.jpg)
### Training History
![History Screen](/HoopersHubApp/README_assets/history.jpg)
## Groups
In this mode we add our friends from the app, divide them into teams and create a Group in order for the 2 teams to keep a **history** of their matches. In addition to the history in the groups we also provide what is the **total score** of all the matches of the 2 teams and the **percentage of wins** of each team. The leader of the group, who is originally the creator of the group, is the one who can add a new score as well as do other actions such as change a team to a member, update the latest score, add a new person and make another leader.
### Divide Friend Into Teams
![Divide Friend Into Teams image](/HoopersHubApp/README_assets/create_teams.jpg)
### Groups Main Screen
![Groups Main Screen image](/HoopersHubApp/README_assets/groups_main.jpg)
### Leader's Settings
![Leader's Settings image](/HoopersHubApp/README_assets/settings.jpg)
### Adding New Score
![Adding New Score image](/HoopersHubApp/README_assets/add_score.jpg)
### Group Members
![Group Members image](/HoopersHubApp/README_assets/members.jpg)
### Groups Statistics
![Groups Statistics image](/HoopersHubApp/README_assets/statistics.jpg)

## Search Team Nearby
In this mode the user has the possibility to **search for a game near his/her area** and participate in it. A user can join an available game or create his own game for other users near his location to join. To create a game the user chooses exactly the place on the map the time and date where the game will take place in order to let other users know where and when to come.
### Game Creation
![Game Creation image](/HoopersHubApp/README_assets/game_creation.jpg)
### Games at a Nearby Location
![Games at a Nearby Location image](/HoopersHubApp/README_assets/games_nearby.jpg)
### Game Lobby
![Game Lobby image](/HoopersHubApp/README_assets/lobby.jpg)

## Create Tournament
In this mode we add our friends, divide them into groups or as we wish or let the application do it (**matchmaking**) using the statistics from the friend ratings  and other metrics we have given from the register (weight, height and level which is amateur or professional). This function guides all teams up to the grand final. It shows for each team its members, eliminated teams and the history of the matches.
### Options When Creating a Tournament
![Options When Creating a Tournament image](/HoopersHubApp/README_assets/options.jpg)
### Tournament Main Screen
![Tournament Main Screen image](/HoopersHubApp/README_assets/tour_main.jpg)
### Tournament History
![Tournament History image](/HoopersHubApp/README_assets/tour_history.jpg)
### Tournament Members
![Tournament Members image](/HoopersHubApp/README_assets/tour_members.jpg)
### Tournament Winner
![Tournament Winner image](/HoopersHubApp/README_assets/winner.jpg)

## Rate Friend
In this feature we have the opportunity to **rate the friends** we have from the app from 0 to 5 stars in the following categories:
- Blocks
- Defense
- 3 Points
- 2 Points 
- Rebounds
- Atheleticism
- Team Player
- Overall Score  

![Rating Screen](/HoopersHubApp/README_assets/rating.jpg)

## More info about the app
A user can send a **friend request** to another user that uses the app. To test that our **matchmaking algorithm** works as expected we used **NBA players data** from **NBA2K20** and we sort these players into teams. 

## Technologies used in this project
- React Native
- Javascript
- React
- Firebase Firestore
- Node.js
- Expo