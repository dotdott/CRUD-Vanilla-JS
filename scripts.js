const formData = document.querySelector('form');
const userName = document.querySelector('#user-name');
const userPhone = document.querySelector('#user-phone');
const submitBtn = document.querySelector('#submitBtn');

const userSubmitedData = document.querySelector('.users-datas');


formData.addEventListener('submit', e => {
    e.preventDefault();

    createUserData(userName.value, userPhone.value);
});

function createUserData(name, phone) {
    const list = document.createElement('li');
    const para = document.createElement('p');
    const phoneNumber = document.createElement('small');
    const editBtn = document.createElement('a');
    const deleteBtn = document.createElement('a');

    para.innerHTML = name;
    phoneNumber.innerHTML = phone;
    editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    userSubmitedData.appendChild(list);
    list.appendChild(para);
    list.appendChild(phoneNumber);
    list.appendChild(editBtn);
    list.appendChild(deleteBtn);    

    editBtn.onclick = () => {
        toggleOverlay();

        saveEdit.onclick = () => {
            editButton(para, phoneNumber);
        };
    };

    deleteBtn.onclick = () => {
        deleteUserData(list);
    };

    userName.value = '';
    userPhone.value = '';
    userName.focus();
};

// delete data 
function deleteUserData(list) {
    userSubmitedData.removeChild(list);
};

// filter dropdown 
const searchBar = document.querySelector('#search-name');
function filter() {
    searchBar.addEventListener('keyup', e => {
        const typedSearch = e.target.value.toUpperCase();
        const list = document.getElementsByTagName('li');

        for (let i = 0; i < list.length; i++){
            let txtValue = list[i].textContent || list[i].innerText;

            if(txtValue.toUpperCase().includes(typedSearch)){
                list[i].style.display = '';
            } else {
                list[i].style.display = 'none';
            }
        }
    })
}
filter();

// MODAL
const editName = document.querySelector('#new-name');
const editPhone = document.querySelector('#new-phone');

const saveEdit = document.querySelector('#save-edit');
const cancelEdit = document.querySelector('#cancel-edit');

function editButton(newName, newPhone) {
    newName.innerHTML = editName.value;
    newPhone.innerHTML = editPhone.value;

    editName.value = '';
    editPhone.value = '';

    toggleOverlay();
};

// open Modal overlay
function toggleOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.classList.toggle('active');
    overlayKeypress(overlay);
};
cancelEdit.addEventListener('click', toggleOverlay);

// usability for keyboards event
function overlayKeypress(overlay){
    if (overlay.classList.contains('active')){
        document.body.addEventListener('keydown', e => {
            if(e.key === 'Escape'){
                overlay.classList.remove('active');
            };
        });
    };
};