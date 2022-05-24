//args: groupList,membersPerTeam,numberOfTeams
const data = [
    {
        name:"thanasis",
        beginner:true,
        heigth:178,
        weigth:78,
        averageRatings:{
            averageAtheleticism:5,
            averageBlocks:3,
            averageDefense:4,
            averageOverall_score:4,
            averageRebounds:4.5,
            averageThreepoints:2,
            averageTwopoints:4,
            averageTeam_player:3.66,
        }
    },
    {
        name:"thanasis2",
        beginner:true,
        heigth:190,
        weigth:78,
        averageRatings:{
            averageAtheleticism:3,
            averageBlocks:3,
            averageDefense:2,
            averageOverall_score:4,
            averageRebounds:3.5,
            averageThreepoints:2,
            averageTwopoints:4,
            averageTeam_player:5,
        }
    },
    {
        name:"thanasis3",
        beginner:true,
        heigth:168,
        weigth:71,
        averageRatings:{
            averageAtheleticism:3.5,
            averageBlocks:3,
            averageDefense:4,
            averageOverall_score:4,
            averageRebounds:4,
            averageThreepoints:1,
            averageTwopoints:4,
            averageTeam_player:2,
        }
    },
    {
        name:"thanasis4",
        beginner:false,
        heigth:183,
        weigth:78,
        averageRatings:{
            averageAtheleticism:4,
            averageBlocks:4,
            averageDefense:5,
            averageOverall_score:4.4,
            averageRebounds:4,
            averageThreepoints:5,
            averageTwopoints:4,
            averageTeam_player:4,
        }
    },
    {
        name:"thanasis5",
        beginner:false,
        heigth:163,
        weigth:70,
        averageRatings:{
            averageAtheleticism:3,
            averageBlocks:4,
            averageDefense:4,
            averageOverall_score:2.5,
            averageRebounds:4,
            averageThreepoints:1,
            averageTwopoints:2,
            averageTeam_player:3,
        }
    },
    {
        name:"thanasis6",
        beginner:false,
        heigth:187,
        weigth:78,
        averageRatings:{
            averageAtheleticism:4,
            averageBlocks:3,
            averageDefense:3,
            averageOverall_score:4,
            averageRebounds:3,
            averageThreepoints:5,
            averageTwopoints:4,
            averageTeam_player:4,
        },
    },
    {
        name:"thanasis7",
        beginner:false,
        heigth:175,
        weigth:88,
        averageRatings:{
            averageAtheleticism:2,
            averageBlocks:4,
            averageDefense:3,
            averageOverall_score:3,
            averageRebounds:4,
            averageThreepoints:1,
            averageTwopoints:2,
            averageTeam_player:3.55,
        },
    },
    {
        name:"thanasis8",
        beginner:false,
        heigth:188,
        weigth:88,
        averageRatings:{
            averageAtheleticism:4,
            averageBlocks:3.2,
            averageDefense:3.4,
            averageOverall_score:3.2,
            averageRebounds:4.2,
            averageThreepoints:4.1,
            averageTwopoints:3.4,
            averageTeam_player:3.55,
        },
    },
    
]
const membersPerTeam = 4;
const numberOfTeams = 2;
const groupList = data;
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
                            attack += fromStars2NewRange(35,fromHeigth2Stars(height)) + fromStars2NewRange(25,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(40,fromLevel2Stars(level)) ;
                            defense += attack;
                        }else{
                            attack += fromStars2NewRange(15,fromHeigth2Stars(height)) + fromStars2NewRange(10,fromWeigth2Stars(height,weigth)) + fromStars2NewRange(17,fromLevel2Stars(level));
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