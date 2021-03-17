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

        getWidth: function(){
            return window.innerWidth;
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
            document.querySelector(DOMStrings.progressBar).style.width = ['calc(1% - 3px)', 'calc(25% - 7px)', 'calc(50% - 14px)', 'calc(75% - 21px)', 'calc(100% - 30px)'][index];
            // 3px, 7px etc... correspond au pourcentage appliqué à la largeur de la glissière (30px);
        },

        responsiveElements: function(wid){
    
            //1st paragraph
            if(wid <= 600){
                document.querySelector('.signup').innerHTML = "Sign-up for our 30-day trial.<br> No credit card required.";
            }
            else {
                document.querySelector('.signup').innerHTML = "Sign-up for our 30-day trial. No credit card required.";
            }
            // move price under slider and change discount format
        
            if(wid <= 600){
                document.querySelector('#topPart').innerHTML = '<div id="aboveSlider"><span class="pageviews"><span id="pageviews">100K</span> PAGEVIEWS</span></div><div class="slidecontainer"><div class="progress"></div><input type="range" min="0" max="4" class="slider" id="myRange"></div><div id="underSlider"><span><span id="price">$<span id="price_number">16</span>.00</span> / month</span><div id="underSliderMobile">Monthly Billing<label class="switch"><input type="checkbox" id="toggle"><span class="slide round"></span></label>Yearly Billing <span class="discount">-25%</span></div></div>';
            }
            else {
                document.querySelector('#topPart').innerHTML = '<div id="aboveSlider"><span class="pageviews"><span id="pageviews">100K</span> PAGEVIEWS</span><span><span id="price">$<span id="price_number">16</span>.00</span> / month</span></div><div class="slidecontainer"><div class="progress"></div><input type="range" min="0" max="4" class="slider" id="myRange"></div><div id="underSlider">Monthly Billing<label class="switch"><input type="checkbox" id="toggle"><span class="slide round"></span></label>Yearly Billing <span class="discount">25% discount</span></div>';
            }
        
    }

    }
})()




// GLOBAL APP CONTROLLER

var controller = (function(dataCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();

        window.addEventListener('resize', function(){
            console.log('resize');
            ctrlModif();
        });
        document.querySelector(DOM.slider).addEventListener('input',function(){
            console.log('dom slider modif');
            ctrlModif();
        });
        document.querySelector(DOM.toggle).addEventListener('input', ctrlModif);
    }

    var ctrlModif = function(){
        console.log("dans controle modif");

        var input, price, pageViews, width;
        
       

        // 1. Get the input data
        input = UICtrl.getInput();
        console.log('input :',input);


        // 1bis. Update HTML
        //UICtrl.responsiveElements(UICtrl.getWidth()); 

        // 2. Calculate the price and pageViews
        [price, pageViews] =  [dataCtrl.priceCalc(input.index, input.toggle), dataCtrl.pageViewsCalc(input.index)];

        // 3. Update the UI
        UICtrl.updateUI(price, pageViews);
        

        // 4. Progress bar update
        UICtrl.progressBar(input.index);
        console.log(document.querySelector('.progress').style.width);

    }

    return{
        init: function(){
            setupEventListeners();
            ctrlModif();
        }
    }
})(dataController, UIController);

controller.init();
