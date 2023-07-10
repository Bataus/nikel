const myModal = new bootstrap.Modal("#transactionmodal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("cllick", logout)

//ADICIONAR LANÇAMENTO
document.getElementById ("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-value").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    gettotal();

    alert("Lançamento adicionado com sucesso");

});


checkLogged();

function checkLogged () {
    if(session) {
        sessionStorage.setItem("logged, session");
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html";
        return;

    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    gettotal();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn () {
    const transactions = data.transactions

    const CashIn = transactions.filter((item) => item.type === "1");

    if.(cashIn.lenght) {
        let cashInHtml = ``;
        let limit=0;
        
        if.(cashIn.lenght >5) {
            limit = 5;
        } else {
            limit = cashIn.lenght;
        }for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
               <div class="col-12">
                     <h3 class="fs-2">R$ ${chashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                 <div class="col-12 col-md-8">
                                    <p>${cashIn[index].description}</p>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }   
}

function getCashOut () {
    const transactions = data.transactions

    const CashOut = transactions.filter((item) => item.type === "2");

    if.(cashOut.lenght) {
        let cashOutHtml = ``;
        let limit=0;
        
        if.(cashOut.lenght >5) {
            limit = 5;
        } else {
            limit = cashOut.lenght;
        }for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
               <div class="col-12">
                     <h3 class="fs-2">R$ ${chashOut[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                 <div class="col-12 col-md-8">
                                    <p>${cashOut[index].description}</p>
                                </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cash-Out-list").innerHTML = cashOutHtml;
    }   
}

function gettotal() {
    const transactions = data.transactions;
    let total = 0

    transactions.forEach((item) => {
        if(item.type === "1") {
            total +=item.value;
        } else {
            total +=item.value;
        }
    })

    document.getElementById("total").innerHTML = `R$ $(total.toFixed(2)}`;
}

function saveData(data) {
    localStorage.setItem(data.Login, JSON.stringify(data));
}