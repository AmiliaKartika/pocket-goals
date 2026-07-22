document.addEventListener('DOMContentLoaded', function() {

    const params = new URLSearchParams(window.location.search);
    const goalID = Number(params.get("id"));
    const STORAGE_KEY = "GOAL_TRACKER";
    const goals = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const selectedGoal = goals.find(goal => goal.id === goalID);
    const RENDER_EVENT = 'render-detail-transaction';
    const submitTransaction = document.getElementById('transactionForm');
    let totalTerpenuhi = 0;
    let sisaTarget = 0;
    let isEditingID = null;

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
        const containerTransaction = document.createElement('tr');
        containerTransaction.classList.add('hover:bg-gray-50');

        const keterangan = document.createElement('td');
        keterangan.classList.add('px-6', 'py-4');
        keterangan.innerText = transactionObject.keterangan;

        const nominal = document.createElement('td');
        nominal.classList.add('px-6', 'py-4', 'text-center');
        nominal.innerText = `Rp ${Number(transactionObject.nominal).toLocaleString("id-ID")}`;

        const tanggal = document.createElement('td');
        tanggal.classList.add('px-6', 'py-4', 'text-center');
        tanggal.innerText = transactionObject.detailsDate;

        const aksi = document.createElement('td');
        aksi.classList.add('px-6', 'py-4', 'text-center');

        const edit = document.createElement('button');
        edit.innerText = "✏️";
        edit.classList.add('px-6', 'w-10', 'h-10');

        const hapus = document.createElement('button');
        hapus.innerText = "🗑️";
        hapus.classList.add('px-6', 'w-10', 'h-10');

        aksi.append(edit, hapus);
        containerTransaction.append(keterangan, nominal, tanggal, aksi);

        hapus.addEventListener('click', function() {
            removeTransaction(transactionObject.idTransaction);
            updateDashboard();
        })

        edit.addEventListener('click', function() {
            editTransaction(transactionObject);
        })

        return containerTransaction;

    }

    document.addEventListener(RENDER_EVENT, function() {
        const transactionsList = document.getElementById('transactionsList');
        transactionsList.innerHTML = '';

        selectedGoal.transactions.sort((a, b) => {
            return new Date(b.detailsDate) - new Date(a.detailsDate);
        });

        for (const transactionItem of selectedGoal.transactions) {
            const transactionElement= makeTransaction(transactionItem);
            transactionsList.append(transactionElement);
        }
    })

    document.dispatchEvent(new Event(RENDER_EVENT));

    submitTransaction.addEventListener('submit', async function(event) {
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

        if (isEditingID !== null) {
            const transactionIndex = findTransactionIdx(isEditingID);

            if(transactionIndex !== undefined && transactionIndex !== -1){
                const oldTransaction = selectedGoal.transactions[transactionIndex];

                totalTerpenuhi -= Number(oldTransaction.nominal);
                sisaTarget += Number(oldTransaction.nominal);
            }

            const newKeterangan = document.getElementById('detailsTitleInput').value;
            const newNominal = document.getElementById('detailsNominalInput').value;
            const newDetailsDate = document.getElementById('detailsDateInput').value;

            selectedGoal.transactions[transactionIndex] = {
                idTransaction: isEditingID,
                keterangan: newKeterangan,
                nominal: newNominal,
                detailsDate: newDetailsDate
            };

            totalTerpenuhi += Number(newNominal);
            sisaTarget -= Number(newNominal);

            isEditingID = null;

            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
            submitTransaction.reset();

            const result = await Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Goal berhasil diperbarui.",
                timer: 1500,
                showConfirmButton: false
            });

            if (!result.isConfirmed) return;

            
        } else {
            addTransaction();
        }

        updateDashboard();
        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
        submitTransaction.reset();

        const submitButton = document.getElementById('button-form');
        submitButton.innerText = 'Simpan';
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

        totalTerpenuhi = selectedGoal.transactions.reduce(
            (total, transaction) => total + Number(transaction.nominal),
            0
        );

        sisaTarget = totalTarget - totalTerpenuhi;

        target.textContent = `Rp ${totalTarget.toLocaleString('id-ID')}`;
        terpenuhi.textContent = `Rp ${totalTerpenuhi.toLocaleString('id-ID')}`;
        sisa.textContent = `Rp ${sisaTarget.toLocaleString('id-ID')}`;
        

    }

    function findTransactionIdx(transactionID) {
        for (const index in selectedGoal.transactions) {
            if (selectedGoal.transactions[index].idTransaction === transactionID) {
                return index;
            }
        }
    }

    async function removeTransaction(transactionID) {
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

        const transactionTarget = findTransactionIdx(transactionID);

        if (transactionTarget !== -1) {
            const deleteTransaction = selectedGoal.transactions[transactionTarget];

            totalTerpenuhi -= Number(deleteTransaction.nominal);
            sisaTarget += Number(deleteTransaction.nominal);

            selectedGoal.transactions.splice(transactionTarget, 1);
            document.dispatchEvent(new Event(RENDER_EVENT));
            updateDashboard();
            saveData();

            Swal.fire({
                title: "Berhasil!",
                text: "Transaksi berhasil dihapus.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
        }
    }

    function editTransaction(transactionObject) {
        
        document.getElementById('detailsTitleInput').value = transactionObject.keterangan;
        document.getElementById('detailsNominalInput').value =  transactionObject.nominal;
        document.getElementById('detailsDateInput').value = transactionObject.detailsDate;

        const editButton = document.getElementById('button-form');
        editButton.innerText = 'Update';

        isEditingID = transactionObject.idTransaction;
        
    }

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

    document.getElementById('dueDate').textContent = hitungSelisihHari(selectedGoal.date);

});