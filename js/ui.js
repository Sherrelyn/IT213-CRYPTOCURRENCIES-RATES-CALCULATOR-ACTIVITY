class UI {
    constructor() {
        this.init();
    }

    init() {
        this.printCryptoCurrencies();
    }

    // prints the <option> for the form
    printCryptoCurrencies() {
        cryptoAPI.getCryptoCurrenciesList().then(data => {
            // console.log(data.cryptoCurrencies.data);

            const cryptoCurrencies = data.cryptoCurrencies.data;
            // BUild the <select from the REST API
            const select = document.getElementById('cryptocurrency');

            cryptoCurrencies.forEach(currency => {
                // Add the <option>
                const option = document.createElement('option');

                option.value = currency.id;
                option.appendChild(document.createTextNode(currency.name));

                select.appendChild(option);
            });
        });
    }

    // print a message
    printMessage(msg, className) {
        const div = document.createElement('div');

        // add the classes
        div.className = className;

        // add the message
        div.appendChild(document.createTextNode(msg));

        const messagesDiv = document.querySelector('.messages');

        messagesDiv.appendChild(div);

        // Remove the message
        setTimeout(() => {
            document.querySelector('.messages div').remove();
        }, 3000);

    }

    // Display the results
    displayResult(data, cur) {
        
        let HTMLTemplate = `
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span class="card-title">
                        Result
                    </span>
                    <p>The Price of 1 ${data.name} in ${cur} is ${data.quote[cur].price}.</p>
                    <p>Last Hour: ${data.percent_change_1h} </p>
                    <p>Last Day: ${data.percent_change_24h} </p>
                    <p>Last 7 Days: ${data.percent_change_7d} </p>
                </div>
            </div>
        `;

        //Prints the spinner
        this.showSpinner();

        //after 3 secs print the result and remove the spinner
        setTimeout(() => {
            //print the result
            const divResult = document.querySelector('#result');
            divResult.innerHTML = HTMLTemplate;

            //Hide the spinner
            document.querySelector('.spinner img').remove();
        }, 3000);
      
    }

    //Prints the spinner
    showSpinner() {
        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    } 

}