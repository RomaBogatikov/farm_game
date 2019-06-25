
// gameSpan is needed to determine if the user won after 10 years
const gameSpan = 10;

// needed to pass when creating a new farmer
let queryURL;
let loanAmount;
let loanPaymentYearly;

// farmer object
let farmer;

// needed to get farmer object from localStorage (and then still create a new farmer to add methods)
let farmerFromLocalStorage;

// to start the game a new barn is purchased
const barnPrice = 45000;

// flag to alert the user that plants can be grown only once (for enableField() function)
// let flagEnabled = false;

// factories to produce animals and plants
let chickenFactory;
let cowFactory;
let goatFactory;
let sheepFactory;

let potatoFactory;
let cornFactory;
let lettuceFactory;
let broccoliFactory;


// class Farmer
class Farmer {
  constructor (loanAmount, loanPaymentYearly, weatherCoef, farmCity, queryURL, farmerAccount, earnedThisYear, yearsInBusiness, fieldEnabled) {
    this.barn = [];
    this.field = [];
    this.fieldEnabled = fieldEnabled || false;
    this.yearsInBusiness = yearsInBusiness || 0;
    this.loanAmount = loanAmount;
    this.loanPaymentYearly = loanPaymentYearly;
    this.farmerAccount = farmerAccount || 0;
    this.earnedThisYear = earnedThisYear || 0;
    this.farmCity = farmCity;
    this.tempFahrenheit = tempFahrenheit;
    this.weatherCoef = weatherCoef;
    this.queryURL = queryURL;
  }
  // function to buy animals from the store (when the animal is clicked) ui object is needed for drag-drop functionality
  buyAsset = (event, ui) => {
    // console.log('this=', this);
    // console.log('farmer=', farmer);
    // console.log('ui=', $(ui));
    // console.log('event.type=', event.type);
    // console.log('buyasset event =', $(event).eq(0).attr('class'));
    // console.log('buyasset ui=', $(ui.draggable));
    // console.log('buyasset ui class=', $(ui.draggable).eq(0).attr('class').match(/[a-z]+/)[0])

    // console.log('buyAsset event type=', $(event)[0].type);
    // get class of clicked element
    let clickedClass;
    let typeOfEvent = event.type;
    if (typeOfEvent === 'click') {
      clickedClass = $(event.currentTarget).attr('class').match(/[a-z]+/)[0];
      // otherwise, typeOfEvent === 'drop'
    } else {
      clickedClass = $(ui.draggable).eq(0).attr('class').match(/[a-z]+/)[0];
      // console.log('dragged class=', clickedClass);
      // event now needs to reference ui for appendPicture() function
      event = ui;
    }
    // console.log('costtobuy=', chickenFactory.costToBuy);
    // console.log('clicked', clickedClass);
    // check the class of clicked picture and generate a corresponding animal or plant + append corresponding picture to the barn or to the field
    if (clickedClass === 'chicken') {
      if (chickenFactory.costToBuy <= this.farmerAccount) {
        chickenFactory.generateAnimal(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
        // this.farmerAccount -= chickenFactory.costToBuy;
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'cow') {
      if (cowFactory.costToBuy <= this.farmerAccount) {
        cowFactory.generateAnimal(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'goat') {
      if (goatFactory.costToBuy <= this.farmerAccount) {
        goatFactory.generateAnimal(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'sheep') {
      if (sheepFactory.costToBuy <= this.farmerAccount) {
        sheepFactory.generateAnimal(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'potato') {
      if (potatoFactory.costToBuy <= this.farmerAccount) {
        potatoFactory.generatePlant(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'corn') {
      if (cornFactory.costToBuy <= this.farmerAccount) {
        cornFactory.generatePlant(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'lettuce') {
      if (lettuceFactory.costToBuy <= this.farmerAccount) {
        lettuceFactory.generatePlant(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    } else if (clickedClass === 'broccoli') {
      if (broccoliFactory.costToBuy <= this.farmerAccount) {
        broccoliFactory.generatePlant(farmer);
        appendPicture(event, clickedClass, typeOfEvent);
      } else {
        alert('You do not have enough money in your account for the purchase');
      }
    }

    // update the farmer account status after each purchase
    $('.farmerAccount').text(`${Math.floor(this.farmerAccount)}`);

    // console.log('event.currentTarget=', $(event.currentTarget).attr('class'));
    // const clickedImgSrc = $(event.currentTarget).attr('src');
    // const $newImg = $('<img>').attr('src', clickedImgSrc);
    // $('.barn > .barn_field_contents').append($newImg);
    // console.log('farmer=', this);
    // chickenFactory.generateAnimal(farmer)
    console.log('farmer=', this);
  }


  // function to buy a barn from the borrowed money
  buyBarn () {
    alert('You bought a barn for $45000, now you can buy chikens, cows, goats or sheep and earn income each year');
    this.farmerAccount = this.loanAmount - barnPrice;
  }

  // function to perform calculations when button 'Next year' is clicked
  nextYear = () => {
    // set earnedThisYear to 0 before the function runs
    this.earnedThisYear = 0;
    // calculate earnedThisYear from animals in the barn
    for (let animal of this.barn) {
      // console.log('this.barn=', this.barn);
      // console.log('animal.profitYearly=', animal);
      this.earnedThisYear += animal.profitYearly * this.weatherCoef;
    }
    // calculate earnedThisYear from plants in the field
    for (let plant of this.field) {
      this.earnedThisYear += plant.profitYearly * this.weatherCoef;
    }
    // subtract payment for the loan (loanPaymentYearly) from loanAmount
    this.loanAmount *= 1.04;
    this.loanAmount -= this.loanPaymentYearly;
    // add (earnedThisYear - loanPaymentYearly) to farmerAccount
    this.farmerAccount += this.earnedThisYear - this.loanPaymentYearly;
    console.log(this);

    // increase yearsInBusiness counter
    this.yearsInBusiness++;

    // update game statistics on the screen
    this.showStatistics();
    $('.barn_field_contents').empty();

    if (this.yearsInBusiness > 5) {
      enableField();
      determineBarnFieldHeight();
    }

    // remove all elements from barn and field arrays to start new year
    this.barn.splice(0, (this.barn).length);
    this.field.splice(0, (this.field).length);

    const endOfGame = this.didWin();

    // if it is end of game localStorage needs to be cleared, else save farmer object to localStorage as a string
    if (endOfGame) {
      localStorage.clear();
    } else {
      localStorage.setItem('farmer', JSON.stringify(farmer));
    }

  }

  // function to update game statistics on the screen
  showStatistics = () => {
    $('.loan').text(`${Math.floor(this.loanAmount)}`);
    $('.loanPaymentYearly').text(`${Math.floor(this.loanPaymentYearly)}`)
    $('.earnedThisYear').text(`${this.earnedThisYear}`);
    $('.weatherCoef').text(`${this.weatherCoef}`);
    $('.farmerAccount').text(`${Math.floor(this.farmerAccount)}`);
    $('.yearsInBusiness').text(`${this.yearsInBusiness}`);
  }

  // function to check if the user has won
  // clear localStorage after alerts
  // in case the game ended return true, otherwise false
  didWin = () => {
    if (this.yearsInBusiness === gameSpan) {
      if (this.farmerAccount >= 1000000) {
        alert('Great job! You won! You are a retired millionaire!');
        return true;
      } else {
        alert('You did not reach you goals for retirement. You have either picked the wrong place for farming or have not worked hard enough.');
        return true;
      }
    } else if (this.farmerAccount < 4000) {
      alert('You went bankrupt! You either picked the wrong place for farming or have not worked hard enough.');
      return true;
    }
    // if it is not end of game
    return false;
  }


}

// class FarmAsset to later construct all animals and plants the user can buy
class FarmAsset {
  constructor (costToBuy, profitYearly) {
    this.costToBuy = costToBuy;
    this.profitYearly = profitYearly;
  }
}

// specify that the user doesn't need to buy new farm animals each year, they just produce income (to be implemented)
class BarnFarmAsset extends FarmAsset {
  constructor(animal, costToBuy, profitYearly) {
    super(costToBuy, profitYearly);
    this.animal = animal
    this.needToBuyEachYear = false;
  }
}

// specify that the user needs to buy new seeds to grow plants yearly (to be implemented)
class FieldFarmAsset extends FarmAsset {
  constructor(plant, costToBuy, profitYearly) {
    super(costToBuy, profitYearly);
    this.plant = plant;
    this.needToBuyEachYear = true;
  }
}

// create a factory to generate new animals
class FactoryAnimal {
  constructor(animal, costToBuy, profitYearly, farmer) {
    this.animal = animal;
    this.costToBuy = costToBuy;
    this.profitYearly = profitYearly;
    this.animals = farmer.barn;
  }
  generateAnimal (farmer) {
    const newAnimal = new BarnFarmAsset(this.animal, this.costToBuy, this.profitYearly);
    this.animals.push(newAnimal);
    // when a new animal is generated, that means farmer bought it
    farmer.farmerAccount -= this.costToBuy;
  }
  // findAnimal (index) {
  //   return this.animals[index];
  // }
}

// function to generate plants
class FactoryPlant {
  constructor(plant, costToBuy, profitYearly, farmer) {
    this.plant = plant;
    this.costToBuy = costToBuy;
    this.profitYearly = profitYearly;
    this.plants = farmer.field;
  }
  generatePlant (farmer) {
    const newPlant = new FieldFarmAsset(this.plant, this.costToBuy, this.profitYearly);
    this.plants.push(newPlant);
    // when a new animal is generated, that means farmer bought it
    farmer.farmerAccount -= this.costToBuy;
  }
  // findPlant (index) {
  //   return this.plants[index];
  // }
}




// get user input: loan amount
const getLoanAmount = (event) => {
  event.preventDefault();
  // const loanAmount = prompt('To start a farming business you can borrow up to $100,000 at 4% for 10 years. How much do you want to borrow?');
  loanAmount = parseInt($("input[type='text']").val());
  // console.log('loanAmount=', loanAmount);
  calculateLoanPayment(loanAmount);
  // return parseInt(loanAmount);
  $(event.currentTarget).parent().remove();
}

// calculate yearly payment for your 30-year loan (4%) based on user input
const calculateLoanPayment = (loanAmount) => {
  loanPaymentYearly = loanAmount * 0.04 * Math.pow( (1 + 0.04), gameSpan ) / ( Math.pow((1 + 0.04), gameSpan) - 1 );
  // console.log('loanPaymentYearly=', Math.ceil(loanPaymentYearly));
  // return loanPaymentYearly;
  getDataFromWeather(queryURL);
}


// function to append picture to barn when it is clicked in store
const appendPicture = (event, clickedClass, typeOfEvent) => {
  console.log('appendPicture event', $(event));
  let clickedImgSrc;
  // typeOfEvent may be either 'click' or 'drop'
  if (typeOfEvent === 'click') {
    clickedImgSrc = $(event.currentTarget).attr('src');
  } else {
    clickedImgSrc = $(event.draggable).eq(0).attr('src');
  }
  const $newImg = $('<img>').attr('src', clickedImgSrc);
  if (clickedClass === 'chicken' || clickedClass === 'cow' || clickedClass === 'goat' || clickedClass === 'sheep') {
    $('.barn_field_contents').eq(0).append($newImg);
  } else {
    $('.barn_field_contents').eq(1).append($newImg);

  }
}

// console.log(calculateLoanPayment(100000));

// function to set weather_coef that affects the user's income
const setWeatherCoef = (tempFahrenheit) => {
  if (tempFahrenheit >= 60) {
    alert('The temperatures in the region your farm is located are too high. You will only be able to earn 80% of maximum income');
    return 0.8;
  } else if (tempFahrenheit <= 50) {
    alert('The temperatures in the region your farm is located are too low. You will only be able to earn 70% of maximum income');
    return 0.7;
  } else {
    alert('Your farm is located in a nice climate. You will earn maximum possible income.')
    return 1;
  }
}


//function to enable field after year 5 or to check if the field needs to be displayed when farmer is loaded from localStorage
const enableField = () => {
  if (!farmer.fieldEnabled) {
    alert('Congrats! You have enough experience to grow plants now!');
    farmer.fieldEnabled = true;
    $('.field').css('display', 'block');
    $('.pick_crops > div').css('display', 'block');
    // $('.barn_field_contents').css('height', 'calc(50vh - 1em * 1.2)');
  }
}


// build query to send API request
const buildQueryForWeather = (event) => {
  event.preventDefault();
  // console.log('I am building query for weather API')
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
  const apiKEY = "APPID=9cb8c52c107e169c583442deeb0a7c0d";
  // console.log($(event.currentTarget));
  const cityName = $("input[type='text']").val();
  // console.log('cityname=', cityName);
  queryURL = baseURL + 'q=' + cityName + '&' + apiKEY;
  // return queryURL;
  console.log('queryURL=', queryURL);
  // return getDataFromWeather(queryURL);
  // remove the modal to ask for user input (city)
  $(event.currentTarget).parent().remove();
  // display the modal to ask for user input (loan amount)
  $('div.form_container.loan').css('display', 'flex');
};



// get data from API (weather)
const getDataFromWeather = (queryURL) => {
  $.ajax({
      url: queryURL,
      type: "GET",
      data: {
      }
  }).then((data) => {
    // alert("Retrieved " + data.length + " records from the dataset!");
    // console.log(data);
    let weather = data;
    console.log('data from API =', weather);
    tempKelvin = parseInt(weather.main.temp);
    tempFahrenheit = (tempKelvin - 273.15) * 9/5 + 32;

    console.log('tempKelvin=', tempKelvin);
    console.log('tempFahrenheit=', tempFahrenheit);
    let weatherCoef = setWeatherCoef(tempFahrenheit);
    const farmCity = data.name;
    console.log('farmCity=', farmCity);
    // // get user input (loan amount)
    // let loanAmount = getLoanAmount();
    // let loanPaymentYearly = calculateLoanPayment(loanAmount);

    // if there is no farmerFromLocalStorage object (the new game was started)
    if (typeof farmerFromLocalStorage === 'undefined') {
      // create a farmer
      farmer = new Farmer(loanAmount, loanPaymentYearly, weatherCoef, farmCity, queryURL);
      // console.log('farmer=', farmer);

      // notify that the user has enough money to purchase a barn for $45000
      farmer.buyBarn();
      // if farmerFromLocalStorage exists load all the properties (except weatherCoef that was calculated in AJAX request)
    } else {
      farmer = new Farmer(farmerFromLocalStorage.loanAmount, farmerFromLocalStorage.loanPaymentYearly, weatherCoef, farmerFromLocalStorage.farmCity, farmerFromLocalStorage.queryURL, farmerFromLocalStorage.farmerAccount, farmerFromLocalStorage.earnedThisYear, farmerFromLocalStorage.yearsInBusiness, farmerFromLocalStorage.fieldEnabled);

      // enable field to buy plants if farmer is more than 5 years in business
      if (farmer.yearsInBusiness > 5 && farmer.fieldEnabled === true) {
        // the line is needed to run enableField() function properly
        farmer.fieldEnabled = false;
        enableField();
        determineBarnFieldHeight();
      }
    }

    // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
    chickenFactory = new FactoryAnimal('chicken',4000, 6000, farmer);
    cowFactory = new FactoryAnimal('cow', 7000, 10500, farmer);
    goatFactory = new FactoryAnimal('goat', 6000, 9000, farmer);
    sheepFactory = new FactoryAnimal('sheep', 5000, 7500, farmer);

    // create potato, corn, lettuce and broccoli factory
    potatoFactory = new FactoryPlant('potato', 8000, 12000, farmer);
    cornFactory = new FactoryPlant('corn', 9000, 13500, farmer);
    lettuceFactory = new FactoryPlant('lettuce', 10000, 15000, farmer);
    broccoliFactory = new FactoryPlant('broccoli', 11000, 16500, farmer);

    // console.log(chickenFactory);

      // event listeners on all animals and plants
    $(".img_container > img").on("click", farmer.buyAsset);
      // event listener on 'next year' button
    $('.btn_next_year').on('click', farmer.nextYear)
      // event listener to resize the 'game rules' window (to make it mobile friendly)
    $(window).on("resize", determineBarnFieldHeight);

    console.log('farmer=', farmer);
    // return farmer;

    // show game statistics
    farmer.showStatistics();

    // barnFieldHeight should be determined after farmer object is created to check if field is enabled (farmer.fieldEnabled)
    determineBarnFieldHeight();


  }); // end of .then AJAX reguest
} // end of getDataFromWeather function



const onLoadFunction = () => {
  // console.log('onload fired');
  // console.log('localStorage is empty:', localStorage.getItem('farmer') === null);
  const isLocalStorageEmpty = localStorage.getItem('farmer') === null;
  console.log('localStorage is empty:', isLocalStorageEmpty);
  if (isLocalStorageEmpty) {
    $("div.form_container.city").css("display", "flex");
  } else {
    $("div.form_container.localStorage").css("display", "flex");
  }

  // on load --vh needs to be set based on viewport height excluding URL bar
  // let windowInnerHeight = $(window).height();
  // console.log('window.innerHeight=', windowInnerHeight);
  // $(".barn_field_contents").css("--vh", `${windowInnerHeight}px`);
  // console.log($(".barn_field_contents").css("--vh"));
  // determineBarnFieldHeight();
}

// to determine .barn_field_contents fields height dinamically (on resizing the window)
const determineBarnFieldHeight = () => {
  let windowInnerHeight = $(window).height();
  let barnFieldHeaderHeight = $(".barn > p:first-child").height();
  console.log("barnHeaderHeight =", barnFieldHeaderHeight);
  console.log('window.innerHeight=', windowInnerHeight);
  let heightWhenTwoFields = windowInnerHeight / 2 - barnFieldHeaderHeight;
  console.log('heightWhenTwoFields=', heightWhenTwoFields);
  if (farmer.fieldEnabled === false) {
    $(".barn_field_contents").css("--vh", `${windowInnerHeight}px`);
  } else {
    $(".barn_field_contents").css("--vh", `${heightWhenTwoFields}px`)
  }
  // console.log($(".barn_field_contents").css("--vh"));
}

const manageModalsGameStart = (event) => {
  event.preventDefault();
  // console.log($(event.currentTarget).attr('id'));
  const clickedID = $(event.currentTarget).attr('id');
  // if start a new game was clicked, we remove the modal from the screen and start the game (with selecting a city etc.)
  if (clickedID === 'start_new') {
    $(event.currentTarget).parent().parent().remove();
    $(".city").css("display", "flex");
    // otherwise, 'continue previous game' was clicked
  } else {
    // load farmer object from localStorage, parse it
    // assign it to 'farmer' variable
    farmerFromLocalStorage = JSON.parse(localStorage.getItem('farmer'));
    $(event.currentTarget).parent().parent().remove();
    console.log(farmerFromLocalStorage);
    getDataFromWeather(farmerFromLocalStorage.queryURL);
  }
}

const toggleGame_info = () => {
  // height of container of the 'next year' button
  const btn_containerHeight = $(".btn_container").height();
  // height of 'game rules' window
  let game_infoHeight = $(window).height() - btn_containerHeight;
  // height of 'game rules' header
  let headerHeight = $(".game_info > h3").height();

  // console.log("calculteHeight=", game_infoHeight);
  // toggle 'game rules' window when clicked
  if ($(".game_info > div").height() === 0) {
    $(".right_container").css("position", "relative");
    $(".game_info").css("position", "absolute").css("bottom", btn_containerHeight).css("height", `${game_infoHeight}`).css("background", "rgb(248, 163, 4)");
    $(".game_info > div").css("height", `${game_infoHeight - headerHeight - btn_containerHeight}`).css("overflow", "scroll").css("cursor", "pointer");
  } else {
    $(".right_container").css("position", "static");
    $(".game_info").css("position", "static").css("bottom", "").css("height", "auto").css("background", "").css("cursor", "auto");
    $(".game_info > div").css("height", "0").css("overflow", "");
  }
}



// document onready function
$( () => {

  // event listeners on modals displayed in the beginning of the game
  $(".city > form").on("submit", buildQueryForWeather);
  $(".loan > form").on("submit", getLoanAmount);
  $(".localStorage > form > input[type='submit']").on("click", manageModalsGameStart);



  // event listener to check if the user wants to load the previous game from localStorage or start a new one
  $(document).ready(onLoadFunction);

  // event listener to toggle 'game rules'
  $(".game_info").on("click", toggleGame_info);

  // event listeners on 'next year' button and on all animals and plants are set after farmer object is created
  // $('.btn_next_year').on('click', farmer.nextYear)
  // $(".img_container > img").on("click", farmer.buyAsset);
  // event listener to resize the 'game rules' window (to make it mobile friendly)
  // $(window).on("resize", determineBarnFieldHeight);


  /////////////////////////////////////////
  ///////Drag and Drop Animals and Plants
  /////////////////////////////////////////
  // // drag-drop functionality (to drag and drop animals from the store to barn or field)
  // make all images in the game draggable (background image is not under <img> tag). myHelper() is needed to preserve the size of the image when dragging starts. revert:true returns the image after dropping
  $("img").draggable({ revert: true, helper: myHelper });

  function myHelper (event) {
    console.log('helper=', $(event.currentTarget).eq(0).css("width"));
    // return `<img src='${$(event.currentTarget).eq(0).attr('src')}' width='${$(event.currentTarget).eq(0).css("width")}'`
    // console.log(`<img src=${$(event.currentTarget).eq(0).attr("src")}> width="${$(event.currentTarget).eq(0).css("width")}" height="${$(event.currentTarget).eq(0).css("height")}"`);

    // return the div we want to see when the picture is dragged
    return `<img src=${$(event.currentTarget).eq(0).attr("src")} width=${$(event.currentTarget).eq(0).css("width")} height=${$(event.currentTarget).eq(0).css("height")}>`;
  }

  // make tow divs with class .barn_field_contents droppable
  $(".barn_field_contents").droppable({
    drop: handleDropEvent
  })

  // we want to invoke buyAsset() and pass it both arguments $(event.currentTarget) - droppable object, and $(ui.draggable) - draggable object
  function handleDropEvent (event, ui) {
    // console.log('handLeDrop event=', $(event));
    // console.log('ui.draggable=', $(ui.draggable).attr("class"));
    return farmer.buyAsset(event, ui);
  }


}) // end of document onready function









  // used in conjunction with accordion()
  // // event listener to close the game rules when clicking outside
  // $(document).on('click', function(e) {
  //   if (!$(e.target).is('.container')) {
  //       $('.ui-accordion-content').hide();
  //     }
  //     $(document).off('click');
  // });


  // $( function() {
  //   let icons = {
  //     header: "ui-icon-circle-arrow-e",
  //     activeHeader: "ui-icon-circle-arrow-s"
  //   };
  //   $(".game_info").accordion({
  //     icons: icons,
  //     collapsible: true
  //   });
  // });



// get user input (city name)
// const queryURL = buildQueryForWeather();
// get weather data from the API
// getDataFromWeather(queryURL);



///////////////////////////
// erase if it doesn't work
///////////////////////////




//////////////////////////////



    // // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
    // const chickenFactory = new Factory('chicken',4000, 14000, farmer);
    // const cowFactory = new Factory('cow', 7000, 17000, farmer);
    // const goatFactory = new Factory('goat', 6000, 16000, farmer);
    // const sheepFactory = new Factory('sheep', 5000, 15000, farmer);

    // console.log(chickenFactory);

// // get user input (loan amount)
// let loanAmount = getLoanAmount();
// let loanPaymentYearly = calculateLoanPayment(loanAmount);

// // create a farmer
// const farmer = new Farmer(loanAmount, loanPaymentYearly);
// // console.log('farmer=', farmer);

// // notify that the user has enough money to purchase a barn for $45000
// farmer.buyBarn();
// console.log('farmer=', farmer);

// // create chicken, cow, goat, and sheep factory (to be able to click on corresponding picture from the store and it will be added to the barn)
// const chickenFactory = new Factory('chicken',4000, 14000, farmer);
// const cowFactory = new Factory('cow', 7000, 17000, farmer);
// const goatFactory = new Factory('goat', 6000, 16000, farmer);
// const sheepFactory = new Factory('sheep', 5000, 15000, farmer);

// console.log(chickenFactory);


// console.log($('.barn').css('line-height'));

  // $('.img_container > .chicken').on('click', farmer.buyAsset);
  // $('.img_container > .cow').on('click', farmer.buyAsset);
  // $('.img_container > .goat').on('click', farmer.buyAsset);
  // $('.img_container > .sheep').on('click', farmer.buyAsset);

  // $('.btn_next_year').on('click', farmer.nextYear)




  // chickenFactory.generateAnimal();
  // chickenFactory.generateAnimal();
  // console.log('farmer=', farmer);
  // console.log(chickenFactory);


  // (event) => {
  //   // get clicked image src attribute
  //   const clickedImgSrc = $(event.currentTarget).attr('src');
  //   // console.log(clickedImgSrc);
  //   // create new img tag with clicked image source attribute
  //   const $newImg = $('<img>').attr('src', clickedImgSrc);
  //   // console.log($newImg);
  //   // append newImg to barn
  //   $('.barn > .barn_field_contents').append($newImg);
  //   // generate a new chicken belonging to the farmer
  //   chickenFactory.generateAnimal(farmer);
  //   console.log('farmer=', farmer);
  // }











// Example of API response:

// {"coord":
// {"lon":145.77,"lat":-16.92},
// "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],
// "base":"cmc stations",
// "main":{"temp":293.25,"pressure":1019,"humidity":83,"temp_min":289.82,"temp_max":295.37},
// "wind":{"speed":5.1,"deg":150},
// "clouds":{"all":75},
// "rain":{"3h":3},
// "dt":1435658272,
// "sys":{"type":1,"id":8166,"message":0.0166,"country":"AU","sunrise":1435610796,"sunset":1435650870},
// "id":2172797,
// "name":"Cairns",
// "cod":200}



// Pseudocode

