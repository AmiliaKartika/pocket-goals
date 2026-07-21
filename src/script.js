document.addEventListener('DOMContentLoaded', function() {
    let goals = [];
    let isEditingID = null;
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

        const containerSetting = document.createElement('div');
        containerSetting.classList.add('relative');

        const buttonSetting = document.createElement('button');
        buttonSetting.classList.add('setting-btn', 'p-2');
        
        const iconSetting = document.createElement('i');
        iconSetting.classList.add('fa-solid', 'fa-ellipsis-vertical');

        buttonSetting.append(iconSetting);

        const containerMenuSettingCard = document.createElement('div');
        containerMenuSettingCard.classList.add('menu', 'hidden', 'absolute', 'right-0', 'mt-2', 'w-36', 'bg-white', 'rounded-lg', 'shadow-lg', 'border');

        const buttonEditCard = document.createElement('button');
        buttonEditCard.classList.add('editCard','w-full', 'text-left', 'px-4', 'py-2', 'hover:bg-gray-100');
        buttonEditCard.innerText = "✏️ Edit";

        const buttonDeleteCard = document.createElement('button');
        buttonDeleteCard.classList.add('deleteCard','w-full', 'text-left', 'px-4', 'py-2', 'text-red-500', 'hover:bg-gray-100');
        buttonDeleteCard.innerText = "🗑 Delete";
        
        containerMenuSettingCard.append(buttonDeleteCard, buttonEditCard);
        containerSetting.append(buttonSetting, containerMenuSettingCard);

        const containerLinkDetails = document.createElement('div');
        containerLinkDetails.classList.add('flex', 'items-center');
        containerLinkDetails.append(linkDetails, containerSetting);

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
        containerCard.classList.add('card','p-6', 'bg-white/80', 'backdrop-blur-md', 'shadow-md', 'border', 'rounded-2xl', 'flex', 'flex-col', 'gap-4')
        containerCard.append(containerElementCard);

        containerLinkDetails.addEventListener("click", function() {
            linkDetails.href = `details.html?id=${goalObject.id}`;
        });

        containerCard.dataset.id = goalObject.id;

        return containerCard;

    }

    document.addEventListener(RENDER_EVENT, function() {
        const goalsList = document.getElementById('goalsList');
        goalsList.innerHTML = '';

        // goals.sort((a,b) => {
        //     const categoryOrder = {
        //         Needs: 1,
        //         Wants: 2
        //     };

        //     return categoryOrder[a.category] - categoryOrder[b.category];
        // });

        for (const goalsItem of goals) {
            const cardElement = makeGoal(goalsItem);
            goalsList.append(cardElement);
        }
        
    })

    submitGoal.addEventListener('submit', async function(event) {
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

        if (isEditingID !== null) {
            const cardIndex = findCardIdx(isEditingID);
            
            const newGoal = document.getElementById('goalFormTitleInput').value;
            const newNominalTarget = document.getElementById('goalFormTargetInput').value;
            const newDateTarget = document.getElementById('goalFormDateInput').value;
            const newCategoryTarget = document.getElementById('goalFormCategoryInput').value;

            goals[cardIndex] = {
                id: isEditingID,
                goal: newGoal,
                target: newNominalTarget,
                date: newDateTarget,
                category: newCategoryTarget,
                transactions: goals[cardIndex].transactions
            };

            isEditingID = null;

            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();

            submitGoal.reset();

            const result = await Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Goal berhasil diperbarui.",
                timer: 1500,
                showConfirmButton: false
            });

            if (!result.isConfirmed) return;
        }else {
            addGoal();
        }

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

    function findCardIdx(goalID) {
        for (const index in goals) {
            if(goals[index].id === goalID) {
                return index;
            }
        }
    }


    const goalsList = document.getElementById("goalsList");

    goalsList.addEventListener("click", async function(e){

        const settingBtn = e.target.closest(".setting-btn");

        if(settingBtn){

            const menu = settingBtn.nextElementSibling;

            document.querySelectorAll(".menu").forEach(item=>{
                if(item !== menu){
                    item.classList.add("hidden");
                }
            });

            menu.classList.toggle("hidden");
        }

        const deleteBtn = e.target.closest(".deleteCard");
        if(deleteBtn) {
            const result = await Swal.fire({
                title: "Anda yakin ingin menghapus transaksi ini?",
                text: "Data yang telah dihapus tidak dapat dikembalikan.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Ya, Hapus",
                cancelButtonText: "Batal"
            });

            if(!result.isConfirmed) return;
            
            const card = deleteBtn.closest(".card");

            const goalID = Number(card.dataset.id);

            const idx = findCardIdx(goalID);

            goals.splice(idx, 1);
            saveData();
            document.dispatchEvent(new Event(RENDER_EVENT));
        }

        
        const editBtn = e.target.closest(".editCard");

        if(editBtn) {

            const menu = editBtn.closest(".menu");
            menu.classList.add("hidden");

            const card = editBtn.closest(".card");

            const goalID = Number(card.dataset.id);

            isEditingID = goalID;

            const goal = goals.find(item => item.id === goalID);

            document.getElementById('goalFormTitleInput').value = goal.goal;
            document.getElementById('goalFormTargetInput').value = goal.target;
            document.getElementById('goalFormDateInput').value = goal.date;
            document.getElementById('goalFormCategoryInput').value = goal.category;

            const updateButton = document.getElementById('button-form');
            updateButton.innerText = "Update";
        }
        
    });

    


    
    
})