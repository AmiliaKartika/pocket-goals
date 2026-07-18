document.addEventListener('DOMContentLoaded', function() {
    let goals = [];
    
    const submitGoal = document.getElementById('goalForm');
    const RENDER_EVENT = 'render-goals';

    function addGoal() {
        const goal = document.getElementById('goalFormTitleInput').value;
        const target = document.getElementById('goalFormTargetInput').value;
        const date = document.getElementById('goalFormDateInput').value;
        const category = document.getElementById('goalFormCategoryInput').value;
        const id = generateID();

        const objectGoal = generateGoalObject(id, goal, target, date, category);
        goals.push(objectGoal);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
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
            category,
            transactions: []
        }
    }

    function makeGoal(goalObject) {
        const title = document.createElement('h3');
        title.classList.add('text-3xl', 'font-semibold', 'text-gray-800');
        title.innerText = goalObject.goal;

        function hitungSelisihHari(date) {
            const today = new Date();
            const targetDate = new Date(date);

            const  selisih = targetDate - today;

            const days = Math.ceil(
                selisih / (1000*60*60*24)
            );

            if (days > 0) {
                return `Due in ${days} days`;
            } else if (days === 0) {
                return `Due today`;
            } else {
                return `Overdue ${Math.abs(days)} days`;
            }
        }

        const dueDate = document.createElement('p');
        dueDate.classList.add('text-xs', 'font-semibold');
        dueDate.innerText = hitungSelisihHari(goalObject.date);

        const containerDueDate = document.createElement('div');
        containerDueDate.classList.add('inline-flex', 'items-center', 'py-1', 'px-3', 'bg-gray-200', 'rounded-full');
        containerDueDate.append(dueDate);

        const containerTitle = document.createElement('div');
        containerTitle.classList.add('flex', 'items-center', 'gap-3');
        containerTitle.append(title, containerDueDate);

        const linkDetails = document.createElement('a');
        linkDetails.innerText = "Lihat Details >";

        const containerLinkDetails = document.createElement('div');
        containerLinkDetails.classList.add('flex', 'items-center');
        containerLinkDetails.append(linkDetails);

        const containerUp = document.createElement('div');
        containerUp.classList.add('flex', 'justify-between');
        containerUp.append(containerTitle, containerLinkDetails);

        const nominalTarget = document.createElement('p');
        nominalTarget.innerText = goalObject.target;
        nominalTarget.classList.add('font-semibold', 'text-gray-700');

        const percentToTarget = document.createElement('p');
        percentToTarget.innerText = "0%";

        const containerTarget = document.createElement('div');
        containerTarget.classList.add('flex', 'items-center', 'justify-between', 'py-2');
        containerTarget.append(nominalTarget, percentToTarget);

        const progressBar = document.createElement('div');
        progressBar.classList.add('w-full', 'h-3', 'bg-gray-400', 'rounded-full', 'overflow-hidden');

        const containerBottom = document.createElement('div');
        containerBottom.append(containerTarget, progressBar);

        const containerElementCard = document.createElement('div');
        containerElementCard.append(containerUp, containerBottom);

        const containerCard = document.createElement('div');
        containerCard.classList.add('p-6', 'bg-white/80', 'backdrop-blur-md', 'shadow-md', 'border', 'rounded-2xl', 'flex', 'flex-col', 'gap-4')
        containerCard.append(containerElementCard);

        containerLinkDetails.addEventListener("click", function() {
            linkDetails.href = `details.html?id=${goalObject.id}`;
        });

        return containerCard;

    }

    document.addEventListener(RENDER_EVENT, function() {
        const goalsList = document.getElementById('goalsList');
        goalsList.innerHTML = '';

        for (const goalsItem of goals) {
            const cardElement = makeGoal(goalsItem);
            goalsList.append(cardElement);
        }
        
    })

    submitGoal.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('goalFormTitleInput').value;
        const nominal = document.getElementById('goalFormTargetInput').value;
        const targetDate = document.getElementById('goalFormDateInput').value;
        const today = new Date();

        if (title.trim() === '') {
            alert('Keterangan entri transaksi tidak boleh  kosong/blank!');
            return;
        }

        if (Number(nominal) < 1 || nominal.trim() === '') {
            alert('nilai isian target harus mutlak berupa hitungan  (min Rp1)');
            return;
        }

        if (new Date(targetDate) < today) {
            alert('Tanggal tidak boleh masa lalu!');
            return;
        }


        addGoal();

        saveData();

        submitGoal.reset();
    })


    const SAVED_EVENT = 'saved-goal';
    const STORAGE_KEY = 'GOAL_TRACKER';

    function isStorageExist() {
        if (typeof(Storage) === undefined) {
            alert('Browser kamu tidak mendukung local storage!');
            return false;
        }
        return true;
    }

    function saveData() {
        if(isStorageExist()) {
            const parsed = JSON.stringify(goals);
            localStorage.setItem(STORAGE_KEY, parsed);
            document.dispatchEvent(new Event(SAVED_EVENT));
        }
    }

    function loadDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);

        if(data !== null) {
            for(const goal of data) {
                goals.push(goal);
            }
        }

        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    if(isStorageExist()) {
        loadDataFromStorage();
    }


    


    
    
})