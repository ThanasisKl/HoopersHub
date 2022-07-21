# HoopersHub
**HoopersHub** is a mobile app created using the **Javascript React Native framework**. It consists of 28 screens and deals with **basketball**. The app can work on android as well as ios devices. The **main** screen of the application is the following:  
<div style="text-align:center">
    <img src="HoopersHubApp/README_assets/main.jpg" alt="Main Screen" width="200"/> 
</div> 

Τhe **functions** of the application are the following:  

## Login/Register
First of all a user can create an account or log in to it. All user's data are stored to a firebase cloud database (firestore).
<div style="text-align:center">
    <img src="HoopersHubApp/README_assets/login.jpg" alt="Login Screen" width="200"/>
    <img src="HoopersHubApp/README_assets/register.jpg" alt="Register Screen" width="200"/> 
</div>

## Training
We display various points on the basketball court where the user **shoots and notes** how many shots he made from each point. When he has taken all the required shots he completes his training and sees how he did. The workouts are stored in the database so the user can see his history. Based on this history the app tells the user what his worst and best point is.

### Training Main Screen
<div>
    <img src="HoopersHubApp/README_assets/training.jpg" alt="Training Screen" width="200"/>
</div>
  
### Result after a training
<div>
    <img src="HoopersHubApp/README_assets/result.jpg" alt="Training Result Screen" width="200"/>
</div>  

### Training History
<div>
    <img src="HoopersHubApp/README_assets/history.jpg" alt="History Screen" width="200"/>
</div> 

## Groups
In this mode we add our friends from the app, divide them into teams and create a Group in order for the 2 teams to keep a **history** of their matches. In addition to the history in the groups we also provide what is the **total score** of all the matches of the 2 teams and the **percentage of wins** of each team. The leader of the group, who is originally the creator of the group, is the one who can add a new score as well as do other actions such as change a team to a member, update the latest score, add a new person and make another leader.
### Divide Friend Into Teams
<div>
    <img src="HoopersHubApp/README_assets/create_teams.jpg" alt="Divide Friend Into Teams image" width="200"/>
</div> 

### Groups Main Screen
<div>
    <img src="HoopersHubApp/README_assets/groups_main.jpg" alt="Groups Main Screen image" width="200"/>
</div> 

### Leader's Settings
<div>
    <img src="HoopersHubApp/README_assets/settings.jpg" alt="Leader's Settings image" width="200"/>
</div> 

### Adding New Score
<div>
    <img src="HoopersHubApp/README_assets/add_score.jpg" alt="Adding New Score image" width="200"/>
</div> 

### Group Members
<div>
    <img src="HoopersHubApp/README_assets/members.jpg" alt="Group Members image" width="200"/>
</div> 

### Groups Statistics
<div>
    <img src="HoopersHubApp/README_assets/statistics.jpg" alt="Groups Statistics image" width="200"/>
</div> 

## Search Team Nearby
In this mode the user has the possibility to **search for a game near his/her area** and participate in it. A user can join an available game or create his own game for other users near his location to join. To create a game the user chooses exactly the place on the map the time and date where the game will take place in order to let other users know where and when to come.
### Game Creation
<div>
    <img src="HoopersHubApp/README_assets/game_creation.jpg" alt="Game Creation image" width="200"/>
</div> 

### Games at a Nearby Location
<div>
    <img src="HoopersHubApp/README_assets/games_nearby.jpg" alt="Games at a Nearby Location image" width="200"/>
</div> 

### Game Lobby
<div>
    <img src="HoopersHubApp/README_assets/lobby.jpg" alt="Game Lobby image" width="200"/>
</div> 

## Create Tournament
In this mode we add our friends, divide them into groups or as we wish or let the application do it (**matchmaking**) using the statistics from the friend ratings  and other metrics we have given from the register (weight, height and level which is amateur or professional). This function guides all teams up to the grand final. It shows for each team its members, eliminated teams and the history of the matches.
### Options When Creating a Tournament
<div>
    <img src="HoopersHubApp/README_assets/options.jpg" alt="Options When Creating a Tournament image" width="200"/>
</div> 

### Tournament Main Screen
<div>
    <img src="HoopersHubApp/README_assets/tour_main.jpg" alt="Tournament Main Screen image" width="200"/>
</div> 

### Tournament History
<div>
    <img src="HoopersHubApp/README_assets/tour_history.jpg" alt="Tournament History image" width="200"/>
</div> 

### Tournament Members
<div>
    <img src="HoopersHubApp/README_assets/tour_members.jpg" alt="Tournament Members image" width="200"/>
</div>

### Tournament Winner
<div>
    <img src="HoopersHubApp/README_assets/winner.jpg" alt="Tournament Winner image" width="200"/>
</div>

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

<div>
    <img src="HoopersHubApp/README_assets/rating.jpg" alt="Rating Screen" width="200"/>
</div>

## More info about the app
A user can send a **friend request** to another user that uses the app. To test that our **matchmaking algorithm** works as expected we used **NBA players data** from **NBA2K20** and we sort these players into teams. 

## Technologies used in this project
- React Native
- Javascript
- React
- Firebase Firestore
- Node.js
- Expo