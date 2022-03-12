const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');


async function addStore(e){
    e.preventDefault();
    
    if(storeId.value === ''){
        alert('Add id and address field');
        return;
    }

    const lng = localStorage.getItem('lng');
    const lat = localStorage.getItem('lat');
    localStorage.removeItem('lng');
    localStorage.removeItem('lat');

    const sendBody = {
        storeId : storeId.value,
        lang : lng,
        lati : lat
    }

    try{
        const res = await fetch('/api/v1/stores/langLat' , {
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