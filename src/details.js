document.addEventListener('DOMContentLoaded', function() {

    const params = new URLSearchParams(window.location.search);
    const goalID = Number(params.get("id"));
    const STORAGE_KEY = "GOAL_TRACKER";
    const goals = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const selectedGoal = goals.find(goal => goal.id === goalID);
    const RENDER_EVENT = 'render-detail-transaction';
    const submitTransaction = document.getElementById('transactionForm');

    document.getElementById("goalTitle").textContent = selectedGoal.goal;
    updateDashboard();
    document.getElementById("targetAmount").textContent = `Rp ${Number(selectedGoal.target).toLocaleString("id-ID")}`;

    function addTransaction() {

        const keterangan = document.getElementById('detailsTitleInput').value;
        const nominal = document.getElementById('detailsNominalInput').value;
        const detailsDate = document.getElementById('detailsDateInput').value;
        const idTransaction = generateIDTransaction(); 

        const objectTransaction = generateDetailsObject(idTransaction, keterangan, nominal, detailsDate);
        selectedGoal.transactions.push(objectTransaction);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
        updateDashboard();
    }

    function generateIDTransaction() {
        return + new Date();
    }

    function generateDetailsObject(idTransaction, keterangan, nominal, detailsDate) {
        return {
            idTransaction,
            keterangan, 
            nominal,
            detailsDate
        }
    }

    function makeTransaction(transactionObject) {
        const ket = document.createElement('p');
    }

    submitTransaction.addEventListener('submit', function(event) {
        event.preventDefault();

        const keterangan = document.getElementById('detailsTitleInput').value;
        const nominal = document.getElementById('detailsNominalInput').value;
        const date = document.getElementById('detailsDateInput').value;

        if (keterangan.trim() === '') {
            alert('Keterangan entri transaksi tidak boleh kosong/blank!');
            return;
        }

        if (Number(nominal) < 1 || nominal.trim() === '') {
            alert('nilai isian target harus mutlak berupa hitungan (min Rp1)');
            return;
        }

        addTransaction();
        saveData();
        submitTransaction.reset();
    })


    const SAVED_EVENT = 'saved-goal';

    function isStorageExist() {
        if(typeof(Storage) === undefined) {
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

    function updateDashboard() {
        const target = document.getElementById('targetAmount');
        const terpenuhi = document.getElementById('targetTerpenuhi');
        const sisa = document.getElementById('sisaTarget');
        const totalTarget = Number(selectedGoal.target);

        const totalTerpenuhi = selectedGoal.transactions.reduce(
            (total, transaction) => total + Number(transaction.nominal),
            0
        );

        const sisaTarget = totalTarget - totalTerpenuhi;

        target.textContent = `Rp ${totalTarget.toLocaleString('id-ID')}`;
        terpenuhi.textContent = `Rp ${totalTerpenuhi.toLocaleString('id-ID')}`;
        sisa.textContent = `Rp ${sisaTarget.toLocaleString('id-ID')}`;
        

    }


});