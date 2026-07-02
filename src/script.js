document.addEventListener('DOMContentLoaded', function() {
    let goals = [];


    function addGoal() {
        const goal = document.getElementById('goalFormTitleInput').value;
        const target = document.getElementById('goalFormTargetInput').value;
        const date = document.getElementById('goalFormDateInput').value;
        const category = document.getElementById('goalFormCategoryInput').value;
        const id = generateID();

        const objectGoal = generateGoalObject(id, goal, target, date, category);
        goals.push(objectGoal);
        
    }

    function generateID(){
        return + new Date();
    }

    function generateGoalObject(id, goal, target, date, category) {
        return {
            id,
            goal, 
            target,
            date,
            category
        }
    }
})