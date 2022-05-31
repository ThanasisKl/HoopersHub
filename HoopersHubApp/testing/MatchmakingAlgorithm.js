//30 professional players from NBA 2K20
const groupList = [
    {
        name:"Anthony Davis",
        beginner:false,
        heigth:208,
        weigth:114,
        averageRatings:{
            averageOverall_score:4.5,
            averageTwopoints:4.35,
            averageThreepoints:3.8,
            averageTeam_player:3.05,
            averageAtheleticism:4.1,
            averageDefense:4.25,
            averageRebounds:4.2,
            averageBlocks:4.2, 
        }
    }, 
    {
        name:"Draymond Green",
        beginner:false,
        heigth:200,
        weigth:104,
        averageRatings:{
            averageOverall_score:4.2,
            averageTwopoints:3.3,
            averageThreepoints:3.45,
            averageTeam_player:3.65,
            averageAtheleticism:3.9,
            averageDefense:4.25,
            averageRebounds:3.15,
            averageBlocks:3.15, 
        }
    },
    {
        name:"Giannis Antetokounmpo",
        beginner:false,
        heigth:210,
        weigth:109,
        averageRatings:{
            averageOverall_score:4.5,
            averageTwopoints:3.75,
            averageThreepoints:3.35,
            averageTeam_player:3.75,
            averageAtheleticism:4.05,
            averageDefense:4.2,
            averageRebounds:3.9,
            averageBlocks:3.7,
        }
    },
    {
        name:"Rudy Gobert",
        beginner:false,
        heigth:215,
        weigth:111,
        averageRatings:{
            averageOverall_score:4.3,
            averageTwopoints:3.35,
            averageThreepoints:2.65,
            averageTeam_player:1.55,
            averageAtheleticism:3.2,
            averageDefense:4.2,
            averageRebounds:4.35,
            averageBlocks:4.2,
        }
    },
    {
        name:"Marcus Smart",
        beginner:false,
        heigth:193,
        weigth:99,
        averageRatings:{
            averageOverall_score:4,
            averageTwopoints:2.8,
            averageThreepoints:3.4,
            averageTeam_player:3.3,
            averageAtheleticism:3.65,
            averageDefense:4.2,
            averageRebounds:1.9,
            averageBlocks:2.25, 
        }
    },
    {
        name:"Chris Paul",
        beginner:false,
        heigth:182,
        weigth:79,
        averageRatings:{
            averageOverall_score:4.15,
            averageTwopoints:3.35,
            averageThreepoints:3.95,
            averageTeam_player:4,
            averageAtheleticism:3.65,
            averageDefense:4.15,
            averageRebounds:2.3,
            averageBlocks:3,
        }
    },
    {
        name:"Andre Roberson",
        beginner:false,
        heigth:200,
        weigth:95,
        averageRatings:{
            averageOverall_score:3.75,
            averageTwopoints:2.7,
            averageThreepoints:2.5,
            averageTeam_player:2.9,
            averageAtheleticism:3.4,
            averageDefense:4.15,
            averageRebounds:2.75,
            averageBlocks:3.45, 
        }
    },
    {
        name:"Kawhi Leonard",
        beginner:false,
        heigth:200,
        weigth:104,
        averageRatings:{
            averageOverall_score:4.5,
            averageTwopoints:3.7,
            averageThreepoints:3.85,
            averageTeam_player:3.35,
            averageAtheleticism:3.7,
            averageDefense:4.1,
            averageRebounds:2.75,
            averageBlocks:2.05, 
        }
    },
    {
        name:"Paul George",
        beginner:false,
        heigth:205,
        weigth:99,
        averageRatings:{
            averageOverall_score:4.5,
            averageTwopoints:3.3,
            averageThreepoints:3.8,
            averageTeam_player:3.75,
            averageAtheleticism:3.7,
            averageDefense:4.1,
            averageRebounds:2.9,
            averageBlocks:2.15, 
        }
    },
    {
        name:"Klay Thompson",
        beginner:false,
        heigth:200,
        weigth:97,
        averageRatings:{
            averageOverall_score:4.35,
            averageTwopoints:3.9,
            averageThreepoints:4.3,
            averageTeam_player:3.15,
            averageAtheleticism:3.55,
            averageDefense:4.1,
            averageRebounds:2.1,
            averageBlocks:2.6, 
        }
    },
    {
        name:"Victor Oladipo",
        beginner:false,
        heigth:193,
        weigth:95,
        averageRatings:{
            averageOverall_score:4.25,
            averageTwopoints:3.1,
            averageThreepoints:3.8,
            averageTeam_player:3.45,
            averageAtheleticism:3.75,
            averageDefense:4.1,
            averageRebounds:2.55,
            averageBlocks:2, 
        }
    },
    {
        name:"Al Horford",
        beginner:false,
        heigth:208,
        weigth:111,
        averageRatings:{
            averageOverall_score:4.15,
            averageTwopoints:4.1,
            averageThreepoints:4.2,
            averageTeam_player:3.05,
            averageAtheleticism:3.6,
            averageDefense:4.1,
            averageRebounds:3.2,
            averageBlocks:3.75, 
        }
    },
    {
        name:"Joel Embiid",
        beginner:false,
        heigth:213,
        weigth:113,
        averageRatings:{
            averageOverall_score:4.4,
            averageTwopoints:4.2,
            averageThreepoints:3.65,
            averageTeam_player:2.55,
            averageAtheleticism:3.9,
            averageDefense:4.05,
            averageRebounds:4.1,
            averageBlocks:3.95, 
        }
    },
    {
        name:"Eric Bledsoe",
        beginner:false,
        heigth:185,
        weigth:92,
        averageRatings:{
            averageOverall_score:4.15,
            averageTwopoints:3,
            averageThreepoints:3.5,
            averageTeam_player:3.9,
            averageAtheleticism:4,
            averageDefense:4.05,
            averageRebounds:2.25,
            averageBlocks:2.25, 
        }
    },
    {
        name:"Jimmy Butler",
        beginner:false,
        heigth:203,
        weigth:105,
        averageRatings:{
            averageOverall_score:4.3,
            averageTwopoints:3.3,
            averageThreepoints:3.55,
            averageTeam_player:3.4,
            averageAtheleticism:3.7,
            averageDefense:4,
            averageRebounds:2.3,
            averageBlocks:2.35,
        }
    },
    {
        name:"Jrue Holiday",
        beginner:false,
        heigth:193,
        weigth:92,
        averageRatings:{
            averageOverall_score:4.2,
            averageTwopoints:3.45,
            averageThreepoints:3.7,
            averageTeam_player:3.7,
            averageAtheleticism:3.75,
            averageDefense:4,
            averageRebounds:2.15,
            averageBlocks:2.55, 
        }
    },
    {
        name:"Kyle Lowry",
        beginner:false,
        heigth:185,
        weigth:88,
        averageRatings:{
            averageOverall_score:4.15,
            averageTwopoints:3.5,
            averageThreepoints:3.85,
            averageTeam_player:4.05,
            averageAtheleticism:4.15,
            averageDefense:4,
            averageRebounds:2.4,
            averageBlocks:2.45,
        }
    },
    {
        name:"Dejounte Murray",
        beginner:false,
        heigth:195,
        weigth:77,
        averageRatings:{
            averageOverall_score:3.8,
            averageTwopoints:3.2,
            averageThreepoints:3.35,
            averageTeam_player:3.6,
            averageAtheleticism:3.6,
            averageDefense:4,
            averageRebounds:3.4,
            averageBlocks:2.4,
        }
    },
    {
        name:"LeBron James",
        beginner:false,
        heigth:203,
        weigth:113,
        averageRatings:{
            averageOverall_score:4.5,
            averageTwopoints:3.95,
            averageThreepoints:3.75,
            averageTeam_player:4,
            averageAtheleticism:4.1,
            averageDefense:3.95,
            averageRebounds:2.95,
            averageBlocks:2.25,
        }
    },
    {
        name:"Russell Westbrook",
        beginner:false,
        heigth:190,
        weigth:90,
        averageRatings:{
            averageOverall_score:4.35,
            averageTwopoints:3.5,
            averageThreepoints:3.55,
            averageTeam_player:4.15,
            averageAtheleticism:4.35,
            averageDefense:3.95,
            averageRebounds:3.6,
            averageBlocks:2.3 
        }
    },
    {
        name:"Marc Gasol",
        beginner:false,
        heigth:215,
        weigth:115,
        averageRatings:{
            averageOverall_score:4,
            averageTwopoints:4.15,
            averageThreepoints:3.85,
            averageTeam_player:2.8,
            averageAtheleticism:3.1,
            averageDefense:3.95,
            averageRebounds:3.5,
            averageBlocks:3.45,
        }
    },
    {
        name:"Myles Turner",
        beginner:false,
        heigth:210,
        weigth:113,
        averageRatings:{
            averageOverall_score:4,
            averageTwopoints:3.85,
            averageThreepoints:4,
            averageTeam_player:1.65,
            averageAtheleticism:3.25,
            averageDefense:3.95,
            averageRebounds:3.5,
            averageBlocks:4.4,
        }
    },
    {
        name:"Steven Adams",
        beginner:false,
        heigth:213,
        weigth:120,
        averageRatings:{
            averageOverall_score:4,
            averageTwopoints:3.45,
            averageThreepoints:2.65,
            averageTeam_player:1.65,
            averageAtheleticism:3.25,
            averageDefense:3.95,
            averageRebounds:3.3,
            averageBlocks:2.19,
        }
    },
    {
        name:"Patrick Beverley",
        beginner:false,
        heigth:185,
        weigth:83,
        averageRatings:{
            averageOverall_score:3.9,
            averageTwopoints:2.95,
            averageThreepoints:3.05,
            averageTeam_player:3.5,
            averageAtheleticism:3.9,
            averageDefense:3.95,
            averageRebounds:2.7,
            averageBlocks:2.65,
        }
    },
    {
        name:"Mitchell Robinson",
        beginner:false,
        heigth:215,
        weigth:108,
        averageRatings:{
            averageOverall_score:3.9,
            averageTwopoints:2.9,
            averageThreepoints:2.85,
            averageTeam_player:1.75,
            averageAtheleticism:2.9,
            averageDefense:3.95,
            averageRebounds:3.85,
            averageBlocks:4.4,
        }
    },
    {
        name:"Matisse Thybulle",
        beginner:false,
        heigth:198,
        weigth:90,
        averageRatings:{
            averageOverall_score:3.55,
            averageTwopoints:2.8,
            averageThreepoints:3.3,
            averageTeam_player:2.85,
            averageAtheleticism:3.45,
            averageDefense:3.95,
            averageRebounds:1.95,
            averageBlocks:3.3, 
        }
    },
    {
        name:"Jaren Jackson Jr.",
        beginner:false,
        heigth:210,
        weigth:109,
        averageRatings:{
            averageOverall_score:4,
            averageTwopoints:3.5,
            averageThreepoints:3.8,
            averageTeam_player:1.6,
            averageAtheleticism:3.4,
            averageDefense:3.9,
            averageRebounds:2.75,
            averageBlocks:4.05,
        }
    },
    {
        name:"Robert Covington",
        beginner:false,
        heigth:205,
        weigth:102,
        averageRatings:{
            averageOverall_score:3.95,
            averageTwopoints:2.8,
            averageThreepoints:3.45,
            averageTeam_player:2.45,
            averageAtheleticism:3.1,
            averageDefense:3.9,
            averageRebounds:2.25,
            averageBlocks:3.2, 
        }
    },
    {
        name:"Jaylen Brown",
        beginner:false,
        heigth:200,
        weigth:99,
        averageRatings:{
            averageOverall_score:3.9,
            averageTwopoints:3.55,
            averageThreepoints:3.9,
            averageTeam_player:3.1,
            averageAtheleticism:3.8,
            averageDefense:3.9,
            averageRebounds:2.6,
            averageBlocks:2.6,
        }
    },
    {
        name:"Andre Iguodala",
        beginner:false,
        heigth:198,
        weigth:97,
        averageRatings:{
            averageOverall_score:3.85,
            averageTwopoints:2.8,
            averageThreepoints:2.9,
            averageTeam_player:3.4,
            averageAtheleticism:3.45,
            averageDefense:3.9,
            averageRebounds:2.3,
            averageBlocks:3,
        }
    },
]

//args: membersPerTeam,numberOfTeams
const membersPerTeam = 5;
const numberOfTeams = 6;
findTeams();
function findTeams(){
    let averagePlayersScores = [];
        let playersLevel = [];
        let playersHeigth = [];
        let playersWeigth = [];
        let playersScores = [];
        for(let i=0;i<groupList.length;i++){  // for every player get his average ratings,weight,heigth and level

                let user_data = groupList[i];
                averagePlayersScores.push(user_data.averageRatings);
                playersLevel.push(user_data.beginner);
                playersHeigth.push(user_data.heigth);
                playersWeigth.push(user_data.weight);

                if(i === groupList.length-1){
                    for(let j=0;j<groupList.length;j++){ // calculating score for each player
                        let averageObj = averagePlayersScores[j];
                        let height = playersHeigth[j];
                        let weigth = playersWeigth[j];
                        let level = playersLevel[j];
                        let attack = 0;
                        let defense = 0;
                       
                        if(averageObj === undefined || Object.keys(averageObj).length === 0){
                            attack += fromStars2NewRange(35,fromHeigth2Stars(height)) + fromStars2NewRange(18,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(47,fromLevel2Stars(level)) ;
                            defense += attack;
                        }else{
                            attack += fromStars2NewRange(15,fromHeigth2Stars(height)) + fromStars2NewRange(7,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(20,fromLevel2Stars(level));
                            defense += attack;
                            attack += fromStars2NewRange(14,averageObj.averageThreepoints) + fromStars2NewRange(14,averageObj.averageTwopoints) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageTeam_player) + fromStars2NewRange(10,averageObj.averageOverall_score);
                            defense += fromStars2NewRange(11,averageObj.averageBlocks) + fromStars2NewRange(13,averageObj.averageRebounds) + fromStars2NewRange(10,averageObj.averageAtheleticism) + fromStars2NewRange(10,averageObj.averageOverall_score) + fromStars2NewRange(14,averageObj.averageDefense);
                        }
                    
                        console.log("Attack:",attack," Defense:",defense,"->",groupList[j].name);
                        let scoreObject = {
                            "name": groupList[j].name,
                            "attack": attack,
                            "defense": defense
                        };
                        playersScores.push(scoreObject);
                      
                    }

                    let scoresBasedOnAttack = [...playersScores];
                    scoresBasedOnAttack.sort((a, b) => {
                        return b.attack - a.attack;
                    }).reverse();

                    let scoresBasedOnDefense = [...playersScores];
                    scoresBasedOnDefense.sort((a, b) => {
                        return b.defense - a.defense;
                    }).reverse();

                    let team_list = [];
                    let num_team_list = [];
                    let team_number;
                    let switch_tactic = true;
                    let player_removed;
                    for(let h=0; h<membersPerTeam;h++){
                        switch_tactic = !switch_tactic;

                        if(!switch_tactic){
                            team_number = 1;
                        }else{
                            team_number = numberOfTeams;
                        }

                        for(let k=0; k<numberOfTeams;k++){
                            if(switch_tactic){
                                player_removed = scoresBasedOnDefense.pop();
                                scoresBasedOnAttack = scoresBasedOnAttack.filter(scoreObj => scoreObj.name !== player_removed.name);
                            }else{
                                player_removed = scoresBasedOnAttack.pop();
                                scoresBasedOnDefense = scoresBasedOnDefense.filter(scoreObj => scoreObj.name !== player_removed.name);
                            }
                            team_list.push(player_removed);
                            num_team_list.push(team_number);
                            if(!switch_tactic){
                                team_number++;
                            }else{
                                team_number--;
                            }
                        }
                    }

                    let actual_team_list = [];
                    for(let h=1; h<=numberOfTeams;h++){
                        for(let k=0; k<team_list.length;k++){
                            if(h === num_team_list[k]){
                                actual_team_list.push(team_list[k])
                            }
                        }
                    }
                    console.log("-- Teams --");
                    // console.log(team_list)
                    let teamInfo;
                    for(let team_number=1;team_number<=numberOfTeams;team_number++){
                        teamInfo = findTeam(team_number,actual_team_list);
                        console.log("------------------------------");
                        console.log(`Team${team_number}`);
                        console.log(teamInfo[0]);
                        console.log(`Attack: ${teamInfo[1]}`);
                        console.log(`Defense: ${teamInfo[2]}`);
                    }
                    // console.log(actual_team_list);
                }
        }
}
function fromStars2NewRange(maxRange,value){
    let new_value = 0;
    if (value > maxRange){
        new_value = maxRange;
    }else if(value >= 0){
        let oldRange =  5;
        let newRange = maxRange;
        new_value = (((value) * newRange)/oldRange);
    }

    return new_value;
}

function fromHeigth2Stars(height){
    const heigthRange = [165,200];
    const starsRange = [0,5];
    let stars = 0;
    if (height > heigthRange[1]){
        stars = 5
    }else if(height >= heigthRange[0]){
        let oldRange =  heigthRange[1] - heigthRange[0];
        let newRange = starsRange[1] - starsRange[0];
        stars = (((height - heigthRange[0]) * newRange)/oldRange) + starsRange[0];
    }
    
    return stars;
}

function fromWeigth2Stars(heigth,weigth){
    let heigth_m = heigth/100;
    const bmi = weigth / (heigth_m^2);
    let stars = 0;

    if(bmi < 16 ){         //severe thinness
        stars = 0;
    }else if(bmi < 17){    //moderate thinness
        stars = 1;
    }else if(bmi <= 18.5){ //mild thinness
        stars = 2.5;
    }else if(bmi <= 25){   //normal
        stars = 5;
    }else if(bmi <= 30){   //overweight
        stars = 3.75;
    }else if(bmi <= 35){   //obese class 1
        stars = 2;
    }else if(bmi <= 40){   //obese class 2
        stars = 1;
    }else{                 //obese class 3
        stars = 0;
    }
    
    return stars;
}

function fromLevel2Stars(level){
    return level ? 2 : 5;
}

function findTeam(teamNumber,teams){
    let teamMember = [];
    let team = 1
    let attack = 0;
    let defense = 0;
    for(let i=1;i<=teams.length;i++){
        if (team === teamNumber){
            teamMember.push(teams[i-1].name);
            attack += teams[i-1].attack;
            defense += teams[i-1].defense;
        }
        if (teamMember.length === membersPerTeam)break;
        if(i % membersPerTeam === 0)team++;
    }
    return [teamMember,attack,defense];
}