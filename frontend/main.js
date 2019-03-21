document.addEventListener('DOMContentLoaded', function () {

    // declarations
    ///////////////
    const baseApiUrl = 'http://localhost:4000';
    const counterNode = document.querySelector('.counter');

    const updateCounterDOM = (value) => {
        counterNode.innerText = String(value)
    }

    // get initial value from backend
    fetch(baseApiUrl + '/data')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            updateCounterDOM(data.counterValue)
        })

    // Listeners
    ////////////

    // listener for increment
    document.querySelector('header .increment').addEventListener('click', () => {
        // increment counter


        fetch(baseApiUrl + '/increment')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })

    })
    //listener for decrement
    document.querySelector('header .decrement').addEventListener('click', () => {
        // decrement counter


        fetch(baseApiUrl + '/decrement')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })

    })

    //listener for reset
    document.querySelector('header .reset').addEventListener('click', () => {
        // decrement counter to 0


        fetch(baseApiUrl + '/reset')
            .then(res => res.json())
            .then(data => {
                updateCounterDOM(data.counterValue)
            })

    })

    //listener for color
    document.querySelector('header .picker').addEventListener('change', (ev) => {
        // console.log(ev.target.value)
        // change color
        let newColor = encodeURIComponent(ev.target.value);
        console.log(newColor);

        let endpoint = baseApiUrl + '/picker/' + newColor;
        console.log(endpoint);

        fetch(endpoint)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let contrast = getContrastRatio('#fff', data.color);
                console.log(contrast);
                let doc = document.querySelector('main');
                doc.style.backgroundColor = data.color;

                if (contrast > 2) {
                    doc.style.color = "#fff";

                } else {
                    doc.style.color = "#000";

                }


            })

    })


    // listener for increment by
    document.querySelector('header .incrementBy').addEventListener('keyup', (ev) => {

        if (ev.keyCode === 13) {
            let amount = ev.target.value;

            fetch(baseApiUrl + '/incrementBy/' + amount)
                .then(res => res.json())
                .then(data => {
                    updateCounterDOM(data.counterValue)
                    ev.target.value = '';
                })
                .catch(console.error)


        }
    })
})
