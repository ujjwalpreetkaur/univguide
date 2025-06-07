// const MAP_SDK_KEY = "0aaef9581e790ab18edf9378d9168aca";
// const REST_API_KEY = "YOUR_REST_API_KEY";

// const places={
//     "Entry": [77.5975, 30.5298],
//     "Eternal University": [77.5965, 30.5288],
//     "Akal College Of Engineering": [77.5959, 30.5280],
//     "Incinerator Plant": [77.5972, 30.5305],
//     "Akal College Of Nursing ACN": [77.5961, 30.5276],
//     "Akal Charitable Hospital ACH": [77.5951, 30.5283],
//     "ACET Workshop": [77.5962, 30.5289],
// };

// let userCoords=[77.5970, 30.5280];//default coordinates
// let map,userMaker,destMarker,routeLayer;

// map = new Mappls.Map("map",{
//     center: userCoords,
//     zoom: 17
// });

// //will help to get users live location
// if(navigator.geolocation){
//     navigator.geolocation.getCurrentPosition ( position =>{
//         userCoords = [position.coords.longitude, position.coords.latitude];
//         userMaker = new Mappls.Marker({
//             position: userCoords,
//             map: map,
//             title: "You Are Here"
//         });
//         map.setView(userCoords, 18);
//     });
// }

// function searchLocation(){
//     const searchInput = document.getElementById("search").ariaValueMax.trim();
//     const destCoords = places[searchInput];

//     if (!destCoords){
//         alert("Place Not Found. Please Select A Valid Option.");
//         return;
//     }

//     //this will remove previous or default markers and routes
//     if(destMarker) destMarker.remove();
//     if(routeLayer) routeLayer.remove();

//     //this will add a destination marker
//     destMarker = new Mappls.Marker({
//         position: destCoords,
//         map: map,
//         title: searchInput
//     });
//     map.setView(destCoords,18);

//     //this will draw route to the destination
    
// }