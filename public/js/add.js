const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');


async function addStore(e){
    e.preventDefault();

    if(storeId.value === '' || storeAddress.value === ''){
        alert('Add id and address field');
        return;
    }

    const sendBody = {
        storeId : storeId.value,
        address : storeAddress.value
    }

    try{
        const res = await fetch('/api/v1/stores' , {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(sendBody)
        })
        const ans = await res.json();
        console.log(ans);
        if(ans.success == false){
            throw(ans.error);
        }
        alert('Store Added');
        window.location.href = '/index.html';

    }catch(e){
        alert(e);
    }


}


storeForm.addEventListener('submit' , addStore);