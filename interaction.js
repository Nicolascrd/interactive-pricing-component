// DATA CONTROLLER

var dataController = (function(){


    const data = {
        priceList: [8, 12, 16, 24, 36],
        pageViewsList: ['10K', '50K', '100K', '500K', '1M'],
        discount: 0.75
    }

    return{
        priceCalc: function(index, toggle){
            if (toggle){
                return data.discount * data.priceList[index];
            } else {
                return data.priceList[index];
            }

            
        },

        pageViewsCalc: function(index){
            return data.pageViewsList[index];
        }
    }
})();


// UI CONTROLLER

var UIController = (function(){
    var DOMStrings = {
        price: '#price_number',
        pageviews: '#pageviews',
        range: '#index',
        toggle: '#toggle',
        slider: '.slider',
        progressBar:'.progress'
    }

    return {
        getDOMStrings: function(){
            return DOMStrings;
        },

        getInput: function(){
            return{
                index: document.querySelector(DOMStrings.slider).value, //entre 0 et 4 pour les 5 possibilités
                toggle: document.querySelector(DOMStrings.toggle).checked //0 ou 1 ?
            }
        },

        updateUI: function(price, pageViews){
            var priceDOM = document.querySelector(DOMStrings.price)
            console.log(priceDOM);
            priceDOM.textContent = price.toString()

            var pageViewsDOM = document.querySelector(DOMStrings.pageviews);
            console.log(pageViewsDOM);
            pageViewsDOM.textContent = pageViews;
        },
        progressBar: function(index){
            document.querySelector(DOMStrings.progressBar).style.width = ['1%', '24%', '47.5%', '71%', '94%'][index];
        }

    }
})()




// GLOBAL APP CONTROLLER

var controller = (function(dataCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        document.querySelector(DOM.slider).addEventListener('input',ctrlModif);
        document.querySelector(DOM.toggle).addEventListener('input', ctrlModif);
    }

    var ctrlModif = function(){

        var input, price, pageViews;

        // 1. Get the input data
        input = UICtrl.getInput();

        // 2. Calculate the price and pageViews
        [price, pageViews] =  [dataCtrl.priceCalc(input.index, input.toggle), dataCtrl.pageViewsCalc(input.index)];

        // 3. Update the UI
        UICtrl.updateUI(price, pageViews);

        // 4. Progress bar update
        UICtrl.progressBar(input.index);

    }

    return{
        init: function(){
            setupEventListeners();
            ctrlModif();
        }
    }
})(dataController, UIController);

controller.init();
