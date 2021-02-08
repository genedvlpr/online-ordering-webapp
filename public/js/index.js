var numberOfDiseases;
var arrayDiseases;
typeof window;
var arrayMedForIllness;
var func;
var doc_id;

var firebaseConfig = {
  apiKey: "AIzaSyA5IhybJTE_9MElLVewBuQeE_0jqLdEM2E",
  authDomain: "wood-scrap.firebaseapp.com",
  databaseURL: "https://wood-scrap.firebaseio.com",
  projectId: "wood-scrap",
  storageBucket: "wood-scrap.appspot.com",
  messagingSenderId: "894710452295",
  appId: "1:894710452295:web:ec27fbc7dcbd1b40896162",
  measurementId: "G-NZLE6C4SRB"
};
// Initialize Firebase  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); 
//db.settings({timestampsInSnapshots: true});
var provider = new firebase.auth.GoogleAuthProvider();

angular.module('NewApp', ['ngMaterial', 'ngMessages'])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue');
   
}).controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };


  var displayName;
  var email;
  var emailVerified;
  var photoURL;
  var isAnonymous;
  var uid;
  var providerData; 

  
 
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) { 
                displayName = user.displayName;
                email = user.email;
                emailVerified = user.emailVerified;
                photoURL = user.photoURL;
                isAnonymous = user.isAnonymous;
                uid = user.uid;
                providerData = user.providerData;  

                //Retrieve all items in Store  
              let itemStoreName = [];
              let itemStorePrice = [];
              let itemStoreDesc = [];
              let itemStoreImg = [];
              let itemStoreID = [];
                  
              db.collection("store").doc("items").collection("woods") 
                .get()
                .then((querySnapshot) => { 
                    querySnapshot.forEach((doc) => { 
                      const store = doc.data();   

                      const item_name = store.itemStoreName; 
                      itemStoreName.push(item_name); 

                      const item_price = store.itemStorePrice; 
                      itemStorePrice.push(item_price);

                      const item_desc = store.itemStoreDesc; 
                      itemStoreDesc.push(item_desc);  

                      const item_img = store.itemStoreImg; 
                      itemStoreImg.push(item_img);  

                      const item_id = store.itemStoreID; 
                      itemStoreID.push(item_id);  

                      

                      $scope.storeItems = [
                        { itemStoreName: itemStoreName[0],
                          itemStorePrice: itemStorePrice[0],
                          itemStoreDesc: itemStoreDesc[0], 
                          itemStoreImg: itemStoreImg[0], 
                          itemStoreID: itemStoreID[0], 
                        },
                        { itemStoreName: itemStoreName[1],
                          itemStorePrice: itemStorePrice[1],
                          itemStoreDesc: itemStoreDesc[1], 
                          itemStoreImg: itemStoreImg[1], 
                          itemStoreID: itemStoreID[1], 
                        },
                        { itemStoreName: itemStoreName[2],
                          itemStorePrice: itemStorePrice[2],
                          itemStoreDesc: itemStoreDesc[2], 
                          itemStoreImg: itemStoreImg[2], 
                          itemStoreID: itemStoreID[2], 
                        },
                        { itemStoreName: itemStoreName[3],
                          itemStorePrice: itemStorePrice[3],
                          itemStoreDesc: itemStoreDesc[3], 
                          itemStoreImg: itemStoreImg[3], 
                          itemStoreID: itemStoreID[3], 
                        },
                        { itemStoreName: itemStoreName[4],
                          itemStorePrice: itemStorePrice[4],
                          itemStoreDesc: itemStoreDesc[4], 
                          itemStoreImg: itemStoreImg[4], 
                          itemStoreID: itemStoreID[4], 
                        },
                        { itemStoreName: itemStoreName[5],
                          itemStorePrice: itemStorePrice[5],
                          itemStoreDesc: itemStoreDesc[5], 
                          itemStoreImg: itemStoreImg[5], 
                          itemStoreID: itemStoreID[5], 
                        },
                        { itemStoreName: itemStoreName[6],
                          itemStorePrice: itemStorePrice[6],
                          itemStoreDesc: itemStoreDesc[6], 
                          itemStoreImg: itemStoreImg[6], 
                          itemStoreID: itemStoreID[6], 
                        },
                        { itemStoreName: itemStoreName[7],
                          itemStorePrice: itemStorePrice[7],
                          itemStoreDesc: itemStoreDesc[7], 
                          itemStoreImg: itemStoreImg[7], 
                          itemStoreID: itemStoreID[7], 
                        },
                        { itemStoreName: itemStoreName[8],
                          itemStorePrice: itemStorePrice[8],
                          itemStoreDesc: itemStoreDesc[8], 
                          itemStoreImg: itemStoreImg[8], 
                          itemStoreID: itemStoreID[8], 
                        },
                        { itemStoreName: itemStoreName[9],
                          itemStorePrice: itemStorePrice[9],
                          itemStoreDesc: itemStoreDesc[9], 
                          itemStoreImg: itemStoreImg[9], 
                          itemStoreID: itemStoreID[9], 
                        },

                      ]; 

                      

                      //add to cart
                      $scope.addToCart = function (data) { 
                          var db = firebase.firestore();

                          alert("Adding Item...");                        
                          var currentDate = new Date().toLocaleString();
                          var currentDateFinal = new Date();
                          var finalDocDateTime = currentDate.replace(/\//g, "-");

                          var deliveryDate = new Date(currentDateFinal);
                          deliveryDate.setDate(deliveryDate.getDate() + 2);

                          var dd = deliveryDate.getDate();
                          var mm = deliveryDate.getMonth() + 1;
                          var y = deliveryDate.getFullYear();

                          var deliveryFormattedDate = mm + '/' + dd + '/' + y;
            
                          const docRef1 = db.doc("users/"+uid+"/cart/"+data.itemStoreID); 
                          //const docRef3 = db.doc("users/"+uid+"/recent_tasks/"+finalDocDateTime);
                          //var poser_username = data.username;
                          docRef1.set({
                                  itemName: data.itemStoreName,
                                  itemPrice: data.itemStorePrice,
                                  itemDesc: data.itemStoreDesc,
                                  itemCount: 1+"",
                                  itemImg: data.itemStoreImg,
                                  dateAdded: currentDate+"",
                                  dateDelivery: deliveryFormattedDate,
                                  itemID: data.itemStoreID,
                          }).then(function() {
                            alert("Item "+data.itemStoreName+" added in your Cart.")
                            window.location.href = "https://wood-scrap.firebaseapp.com/store.html";
                          });  
                      };

                      $scope.deleteFromStore = function(data){
                        var delete_from_store = db.collection("store").doc("items").collection("woods").where('itemStoreID','==',data.itemStoreID);
  
                        delete_from_store.get().then(function(querySnapshot) {
                          querySnapshot.forEach(function(doc) {
                            doc.ref.delete().then(() => {
                              alert("Item successfully removed in store.");
                              window.location.href = "https://wood-scrap.firebaseapp.com/store-admin.html";
                            }).catch(function(error) {
                              console.error("Error removing "+data.itemOrderName, error);
                            });
                          });
                        });
                      };
                    });

                    
                    //console.log(tasks);
                }); 
            }    else {
              //Retrieve all items in Store  
              let itemStoreName = [];
              let itemStorePrice = [];
              let itemStoreDesc = [];
              let itemStoreImg = [];
              let itemStoreID = [];
                  
              db.collection("store").doc("items").collection("woods") 
                .get()
                .then((querySnapshot) => { 
                    querySnapshot.forEach((doc) => { 
                      const store = doc.data();   

                      const item_name = store.itemStoreName; 
                      itemStoreName.push(item_name); 

                      const item_price = store.itemStorePrice; 
                      itemStorePrice.push(item_price);

                      const item_desc = store.itemStoreDesc; 
                      itemStoreDesc.push(item_desc);  

                      const item_img = store.itemStoreImg; 
                      itemStoreImg.push(item_img);  

                      const item_id = store.itemStoreID; 
                      itemStoreID.push(item_id);  

                      

                      $scope.storeItems = [
                        { itemStoreName: itemStoreName[0],
                          itemStorePrice: itemStorePrice[0],
                          itemStoreDesc: itemStoreDesc[0], 
                          itemStoreImg: itemStoreImg[0], 
                          itemStoreID: itemStoreID[0], 
                        },
                        { itemStoreName: itemStoreName[1],
                          itemStorePrice: itemStorePrice[1],
                          itemStoreDesc: itemStoreDesc[1], 
                          itemStoreImg: itemStoreImg[1], 
                          itemStoreID: itemStoreID[1], 
                        },
                        { itemStoreName: itemStoreName[2],
                          itemStorePrice: itemStorePrice[2],
                          itemStoreDesc: itemStoreDesc[2], 
                          itemStoreImg: itemStoreImg[2], 
                          itemStoreID: itemStoreID[2], 
                        },
                        { itemStoreName: itemStoreName[3],
                          itemStorePrice: itemStorePrice[3],
                          itemStoreDesc: itemStoreDesc[3], 
                          itemStoreImg: itemStoreImg[3], 
                          itemStoreID: itemStoreID[3], 
                        },
                        { itemStoreName: itemStoreName[4],
                          itemStorePrice: itemStorePrice[4],
                          itemStoreDesc: itemStoreDesc[4], 
                          itemStoreImg: itemStoreImg[4], 
                          itemStoreID: itemStoreID[4], 
                        },
                        { itemStoreName: itemStoreName[5],
                          itemStorePrice: itemStorePrice[5],
                          itemStoreDesc: itemStoreDesc[5], 
                          itemStoreImg: itemStoreImg[5], 
                          itemStoreID: itemStoreID[5], 
                        },
                        { itemStoreName: itemStoreName[6],
                          itemStorePrice: itemStorePrice[6],
                          itemStoreDesc: itemStoreDesc[6], 
                          itemStoreImg: itemStoreImg[6], 
                          itemStoreID: itemStoreID[6], 
                        },
                        { itemStoreName: itemStoreName[7],
                          itemStorePrice: itemStorePrice[7],
                          itemStoreDesc: itemStoreDesc[7], 
                          itemStoreImg: itemStoreImg[7], 
                          itemStoreID: itemStoreID[7], 
                        },
                        { itemStoreName: itemStoreName[8],
                          itemStorePrice: itemStorePrice[8],
                          itemStoreDesc: itemStoreDesc[8], 
                          itemStoreImg: itemStoreImg[8], 
                          itemStoreID: itemStoreID[8], 
                        },
                        { itemStoreName: itemStoreName[9],
                          itemStorePrice: itemStorePrice[9],
                          itemStoreDesc: itemStoreDesc[9], 
                          itemStoreImg: itemStoreImg[9], 
                          itemStoreID: itemStoreID[9], 
                        },

                      ]; 

                      

                      //add to cart
                      $scope.addToCart = function (data) { 
                        window.location.href = "https://wood-scrap.firebaseapp.com/login.html";
                      };

                       
                    });

                    
                    //console.log(tasks);
                }); 
            }

            console.log(uid) 

            
            


            //Retrieved all User Cart Items 
            let itemName = [];
            let itemPrice = [];
            let itemDesc = [];
            let dateAdded = [];
            let dateDelivery = [];
            let itemCount = [];
            let itemImg = [];
            let itemID = [];
                 
            db.collection("users").doc(uid).collection("cart")
              .orderBy("dateAdded", "asc")
              .get()
              .then((querySnapshot) => { 
                  querySnapshot.forEach((doc) => { 
                    const myCart = doc.data();   

                    const item_name = myCart.itemName; 
                    itemName.push(item_name); 

                    const item_price = myCart.itemPrice; 
                    itemPrice.push(item_price);

                    const item_desc = myCart.itemDesc; 
                    itemDesc.push(item_desc);  

                    const date_added = myCart.dateAdded; 
                    dateAdded.push(date_added); 

                    const date_delivery = myCart.dateDelivery; 
                    dateDelivery.push(date_delivery); 

                    const item_count = myCart.itemCount; 
                    itemCount.push(item_count); 

                    const item_img = myCart.itemImg; 
                    itemImg.push(item_img); 

                    const item_id = myCart.itemID; 
                    itemID.push(item_id); 

                    try{
                      if(itemName.length === 0){
                        var notif_div = document.getElementById('cart-empty');
                        notif_div.style.display = "block";
                      } else {
                        var notif_div = document.getElementById('cart-empty');
                        notif_div.style.display = "none";
                      }
                    } catch(err){
                      console.log("Element: status, not found")
                    } 

                    $scope.cartItems = [
                      { itemName: itemName[0],
                        itemPrice: itemPrice[0],
                        itemDesc: itemDesc[0],
                        itemCount: itemCount[0],
                        itemImg: itemImg[0],
                        itemID: itemID[0],
                        dateAdded: dateAdded[0],
                        dateDelivery: dateDelivery[0],
                      },
                      { itemName: itemName[1],
                        itemPrice: itemPrice[1],
                        itemDesc: itemDesc[1],
                        itemCount: itemCount[1],
                        itemImg: itemImg[1],
                        itemID: itemID[1],
                        dateAdded: dateAdded[1],
                        dateDelivery: dateDelivery[1],
                      },
                      { itemName: itemName[2],
                        itemPrice: itemPrice[2],
                        itemDesc: itemDesc[2],
                        itemCount: itemCount[2],
                        itemImg: itemImg[2],
                        itemID: itemID[2],
                        dateAdded: dateAdded[2],
                        dateDelivery: dateDelivery[2],
                      },
                      { itemName: itemName[3],
                        itemPrice: itemPrice[3],
                        itemDesc: itemDesc[3],
                        itemCount: itemCount[3],
                        itemImg: itemImg[3],
                        itemID: itemID[3],
                        dateAdded: dateAdded[3],
                        dateDelivery: dateDelivery[3],
                      },
                      { itemName: itemName[4],
                        itemPrice: itemPrice[4],
                        itemDesc: itemDesc[4],
                        itemCount: itemCount[4],
                        itemImg: itemImg[4],
                        itemID: itemID[4],
                        dateAdded: dateAdded[4],
                        dateDelivery: dateDelivery[4],
                      },
                      { itemName: itemName[5],
                        itemPrice: itemPrice[5],
                        itemDesc: itemDesc[5],
                        itemCount: itemCount[5],
                        itemImg: itemImg[5],
                        itemID: itemID[5],
                        dateAdded: dateAdded[5],
                        dateDelivery: dateDelivery[5],
                      },
                      { itemName: itemName[6],
                        itemPrice: itemPrice[6],
                        itemDesc: itemDesc[6],
                        itemCount: itemCount[6],
                        itemImg: itemImg[6],
                        itemID: itemID[6],
                        dateAdded: dateAdded[6],
                        dateDelivery: dateDelivery[6],
                      },
                      { itemName: itemName[7],
                        itemPrice: itemPrice[7],
                        itemDesc: itemDesc[7],
                        itemCount: itemCount[7],
                        itemImg: itemImg[7],
                        itemID: itemID[7],
                        dateAdded: dateAdded[7],
                        dateDelivery: dateDelivery[7],
                      },
                      { itemName: itemName[8],
                        itemPrice: itemPrice[8],
                        itemDesc: itemDesc[8],
                        itemCount: itemCount[8],
                        itemImg: itemImg[8],
                        itemID: itemID[8],
                        dateAdded: dateAdded[8],
                        dateDelivery: dateDelivery[8],
                      },
                      { itemName: itemName[9],
                        itemPrice: itemPrice[9],
                        itemDesc: itemDesc[9],
                        itemCount: itemCount[9],
                        itemImg: itemImg[9],
                        itemID: itemID[9],
                        dateAdded: dateAdded[9],
                        dateDelivery: dateDelivery[9],
                      },

                    ]; 

                    $scope.count_cart = [
                      itemName,
                    ]
                    try{
                        var cart_item_count = document.getElementById("cart_item_count");
                        cart_item_count.innerText = itemName.length;
                        $("#acc_btn").trigger('mouseover');
                    } catch(err){
                      console.log("Element: status, not found")
                    } 

                    

                    
                    
                    //console.log(itemName+"");
                    console.log("Cart array size: "+itemName.length);
                    $scope.removeFromCart = function(data){
                      var db = firebase.firestore();
                      var cart_items = db.collection('users').doc(uid).collection('cart').where('itemID','==',data.itemID);
                      cart_items.get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                          doc.ref.delete().then(() => {
                            //alert("Item successfully deleted in your Cart.");
                            window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                          }).catch(function(error) {
                            console.error("Error removing "+data.itemName, error);
                          });
                        });
                      });
                    }
                  });

                  $scope.addQuantity = function(index){
                    var quantity_index = document.getElementById('quantity_' + index);
                    var price_index = document.getElementById('price_' + index);
                    var origPrice_index = document.getElementById('origPrice_' + index);
                    quantity_index.value = parseInt(quantity_index.value) + 1;
                    //var count_mul_price = parseInt(document.getElementById("itemCount").value);
                    price_index.innerText = parseInt(price_index.innerText) + parseInt(origPrice_index.innerText);
                    if (quantity_index >= parseInt(10)) {
                      quantity_index.value = 10;
                    }
                  } 
                  $scope.subQuantity = function(index){
                    var quantity_index = document.getElementById('quantity_' + index);
                    var price_index = document.getElementById('price_' + index);
                    var origPrice_index = document.getElementById('origPrice_' + index);
                    quantity_index.value = parseInt(quantity_index.value) - 1;
                    //var count_minus_price = parseInt(document.getElementById("itemCount").value);
                    price_index.innerText = parseInt(price_index.innerText) - parseInt(origPrice_index.innerText);
                    if (quantity_index.value <= parseInt(1)) {
                        quantity_index.value = 1;
                        price_index.innerText = parseInt(origPrice_index.innerText);
                    }
                  }

                  $scope.addToOrders = function(index,data){
                    var db = firebase.firestore();

                    var itemCount = document.getElementById('quantity_' + index);
                    var price = document.getElementById('price_' + index);
                    var full_name = document.getElementById("first_name");
                    const randomName = Math.floor(Math.random() * 10000);
                    const order_doc_id = "order_"+randomName;

                    const final_price = parseInt(price.innerText);

                    const docRef1 = db.doc("users/"+uid+"/orders/"+order_doc_id); 
                    const docRef2 = db.doc("orders/"+order_doc_id); 
                          //const docRef3 = db.doc("users/"+uid+"/recent_tasks/"+finalDocDateTime);
                          //var poser_username = data.username;
                    var phone = document.getElementById('phone');
                    var delivery_address = document.getElementById('delivery-address');     
                          if(full_name != " " && phone.value != "09" && delivery_address.value != " "){
                            docRef1.set({
                                  itemOrderName: data.itemName,
                                  itemOrderPrice: final_price,
                                  itemOrderDesc: data.itemDesc,
                                  itemOrderCount: itemCount.value,
                                  itemOrderImg: data.itemImg,
                                  dateOrderAdded: data.dateAdded,
                                  dateOrderDelivery: data.dateDelivery,
                                  itemOrderID: data.itemID,
                                  orderOrderID: order_doc_id,
                          }).then(function() {
                            docRef2.set({
                                  itemAdminOrderName: data.itemName,
                                  itemAdminOrderPrice: final_price,
                                  itemAdminOrderDesc: data.itemDesc,
                                  itemAdminOrderCount: itemCount.value,
                                  itemAdminOrderImg: data.itemImg,
                                  dateAdminOrderAdded: data.dateAdded,
                                  dateAdminOrderDelivery: data.dateDelivery,
                                  itemAdminOrderID: data.itemID,
                                  orderAdminOrderID: order_doc_id,
                                  userPhoneNo: phone.value+"",
                                  userID: uid+"",  
                                  userFullName: full_name.value+"", 
                                  userAddress:  delivery_address.value+"" ,
                            }).then(function() {
                              alert("Item "+data.itemName+" added in your Orders.")

                              var cart_items = db.collection('users').doc(uid).collection('cart').where('itemID','==',data.itemID);
                              cart_items.get().then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                                  doc.ref.delete().then(() => {
                                    //alert("Item successfully deleted in your Cart.");
                                    window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                  }).catch(function(error) {
                                    console.error("Error removing "+data.itemName, error);
                                  });
                                });
                              });
                            }); 
                          });   
                          } if(phone.value == " ") {
                            alert("Your Phone no. must be set first.\nGo to 'Account Info' then add your phone number.")
                          } if(delivery_address.value == " ") {
                            alert("Your delivery address must be set first.\nGo to 'Address Book' then set your local address.")
                          }  
                          
                  } 
                  //console.log(tasks);
              }); 

              

                //Retrieve all items in User Orders  
                let itemOrderName = [];
                let itemOrderPrice = [];
                let itemOrderDesc = [];
                let itemOrderCount = [];
                let itemOrderImg = [];
                let dateOrderAdded = [];
                let dateOrderDelivery = [];
                let itemOrderID = [];
                let orderOrderID = [];
                    
                db.collection("users").doc(uid).collection("orders")
                  .orderBy("dateOrderAdded", "asc")
                  .get()
                  .then((querySnapshot) => { 
                      querySnapshot.forEach((doc) => { 
                        const myCart = doc.data();   

                        const item_name = myCart.itemOrderName; 
                        itemOrderName.push(item_name); 

                        const item_price = myCart.itemOrderPrice; 
                        itemOrderPrice.push(item_price);

                        const item_desc = myCart.itemOrderDesc; 
                        itemOrderDesc.push(item_desc);  

                        const date_added = myCart.dateOrderAdded; 
                        dateOrderAdded.push(date_added); 

                        const date_delivery = myCart.dateOrderDelivery; 
                        dateOrderDelivery.push(date_delivery); 

                        const item_count = myCart.itemOrderCount; 
                        itemOrderCount.push(item_count); 

                        const item_img = myCart.itemOrderImg; 
                        itemOrderImg.push(item_img); 

                        const item_id = myCart.itemOrderID; 
                        itemOrderID.push(item_id); 

                        const order_id = myCart.orderOrderID; 
                        orderOrderID.push(order_id); 

                        try{
                          if(itemOrderName.length === 0){
                            var notif_div = document.getElementById('orders-empty');
                            notif_div.style.display = "block";
                          } else {
                            var notif_div = document.getElementById('orders-empty');
                            notif_div.style.display = "none";
                          }
                        } catch(err){
                          console.log("Element: status, not found")
                        } 

                        $scope.orderItems = [
                          { itemOrderName: itemOrderName[0],
                            itemOrderPrice: itemOrderPrice[0],
                            itemOrderDesc: itemOrderDesc[0],
                            itemOrderCount: itemOrderCount[0],
                            itemOrderImg: itemOrderImg[0],
                            itemOrderID: itemOrderID[0],
                            orderOrderID: orderOrderID[0],
                            dateOrderAdded: dateOrderAdded[0],
                            dateOrderDelivery: dateOrderDelivery[0],
                          },
                          { itemOrderName: itemOrderName[1],
                            itemOrderPrice: itemOrderPrice[1],
                            itemOrderDesc: itemOrderDesc[1],
                            itemOrderCount: itemOrderCount[1],
                            itemOrderImg: itemOrderImg[1],
                            itemOrderID: itemOrderID[1],
                            orderOrderID: orderOrderID[1],
                            dateOrderAdded: dateOrderAdded[1],
                            dateOrderDelivery: dateOrderDelivery[1],
                          },
                          { itemOrderName: itemOrderName[2],
                            itemOrderPrice: itemOrderPrice[2],
                            itemOrderDesc: itemOrderDesc[2],
                            itemOrderCount: itemOrderCount[2],
                            itemOrderImg: itemOrderImg[2],
                            itemOrderID: itemOrderID[2],
                            orderOrderID: orderOrderID[2],
                            dateOrderAdded: dateOrderAdded[2],
                            dateOrderDelivery: dateOrderDelivery[2],
                          },
                          { itemOrderName: itemOrderName[3],
                            itemOrderPrice: itemOrderPrice[3],
                            itemOrderDesc: itemOrderDesc[3],
                            itemOrderCount: itemOrderCount[3],
                            itemOrderImg: itemOrderImg[3],
                            itemOrderID: itemOrderID[3],
                            orderOrderID: orderOrderID[3],
                            dateOrderAdded: dateOrderAdded[3],
                            dateOrderDelivery: dateOrderDelivery[3],
                          },
                          { itemOrderName: itemOrderName[4],
                            itemOrderPrice: itemOrderPrice[4],
                            itemOrderDesc: itemOrderDesc[4],
                            itemOrderCount: itemOrderCount[4],
                            itemOrderImg: itemOrderImg[4],
                            itemOrderID: itemOrderID[4],
                            orderOrderID: orderOrderID[4],
                            dateOrderAdded: dateOrderAdded[4],
                            dateOrderDelivery: dateOrderDelivery[4],
                          },
                          { itemOrderName: itemOrderName[5],
                            itemOrderPrice: itemOrderPrice[5],
                            itemOrderDesc: itemOrderDesc[5],
                            itemOrderCount: itemOrderCount[5],
                            itemOrderImg: itemOrderImg[5],
                            itemOrderID: itemOrderID[5],
                            orderOrderID: orderOrderID[5],
                            dateOrderAdded: dateOrderAdded[5],
                            dateOrderDelivery: dateOrderDelivery[5],
                          },
                          { itemOrderName: itemOrderName[6],
                            itemOrderPrice: itemOrderPrice[6],
                            itemOrderDesc: itemOrderDesc[6],
                            itemOrderCount: itemOrderCount[6],
                            itemOrderImg: itemOrderImg[6],
                            itemOrderID: itemOrderID[6],
                            orderOrderID: orderOrderID[6],
                            dateOrderAdded: dateOrderAdded[6],
                            dateOrderDelivery: dateOrderDelivery[6],
                          },
                          { itemOrderName: itemOrderName[7],
                            itemOrderPrice: itemOrderPrice[7],
                            itemOrderDesc: itemOrderDesc[7],
                            itemOrderCount: itemOrderCount[7],
                            itemOrderImg: itemOrderImg[7],
                            itemOrderID: itemOrderID[7],
                            orderOrderID: orderOrderID[7],
                            dateOrderAdded: dateOrderAdded[7],
                            dateOrderDelivery: dateOrderDelivery[7],
                          },
                          { itemOrderName: itemOrderName[8],
                            itemOrderPrice: itemOrderPrice[8],
                            itemOrderDesc: itemOrderDesc[8],
                            itemOrderCount: itemOrderCount[8],
                            itemOrderImg: itemOrderImg[8],
                            itemOrderID: itemOrderID[8],
                            orderOrderID: orderOrderID[8],
                            dateOrderAdded: dateOrderAdded[8],
                            dateOrderDelivery: dateOrderDelivery[8],
                          },
                          { itemOrderName: itemOrderName[9],
                            itemOrderPrice: itemOrderPrice[9],
                            itemOrderDesc: itemOrderDesc[9],
                            itemOrderCount: itemOrderCount[9],
                            itemOrderImg: itemOrderImg[9],
                            itemOrderID: itemOrderID[9],
                            orderOrderID: orderOrderID[9],
                            dateOrderAdded: dateOrderAdded[9],
                            dateOrderDelivery: dateOrderDelivery[9],
                          },

                        ]; 

                        
                        

                        $scope.removeFromOrders = function(data){
                          var db = firebase.firestore();
                          var order_items = db.collection('users').doc(uid).collection('orders').where('orderOrderID','==',data.orderOrderID);

                          var order_admin_items = db.collection('orders').where('orderAdminOrderID','==',data.orderOrderID);

                          order_items.get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                              doc.ref.delete().then(() => {
                                //alert("Order successfully deleted.");
                                //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                              }).catch(function(error) {
                                console.error("Error removing "+data.itemOrderName, error);
                              });
                            });
                          });

                          order_admin_items.get().then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                              doc.ref.delete().then(() => {
                                alert("Order successfully deleted.");
                                window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                              }).catch(function(error) {
                                console.error("Error removing "+data.itemOrderName, error);
                              });
                            });
                          });
                        }

                         
                      });
                     /// console.log(tasks);
                  }); 

                  //Retrieve all items in User Delivered Orders  
                  let itemDeliveredOrderName = [];
                  let itemDeliveredOrderPrice = [];
                  let itemDeliveredOrderDesc = [];
                  let itemDeliveredOrderCount = [];
                  let itemDeliveredOrderImg = [];
                  let dateDeliveredOrderAdded = [];
                  let dateDeliveredOrderDelivery = [];
                  let itemDeliveredOrderID = [];
                      
                  db.collection("users").doc(uid).collection("delivered")
                    .orderBy("dateOrderAdded", "desc")
                    .get()
                    .then((querySnapshot) => { 
                        querySnapshot.forEach((doc) => { 
                          const myCart = doc.data();   

                          console.log(myCart.itemOrderName+"");

                          const item_name = myCart.itemOrderName; 
                          itemDeliveredOrderName.push(item_name); 

                          const item_price = myCart.itemOrderPrice; 
                          itemDeliveredOrderPrice.push(item_price);

                          const item_desc = myCart.itemOrderDesc; 
                          itemDeliveredOrderDesc.push(item_desc);  

                          const date_added = myCart.dateOrderAdded; 
                          dateDeliveredOrderAdded.push(date_added); 

                          const date_delivery = myCart.dateOrderDelivery; 
                          dateDeliveredOrderDelivery.push(date_delivery); 

                          const item_count = myCart.itemOrderCount; 
                          itemDeliveredOrderCount.push(item_count); 

                          const item_img = myCart.itemOrderImg; 
                          itemDeliveredOrderImg.push(item_img); 

                          const item_id = myCart.itemOrderID; 
                          itemDeliveredOrderID.push(item_id); 

                          try{
                            if(itemDeliveredOrderName.length === 0){
                              var notif_div = document.getElementById('delivered-empty');
                              notif_div.style.display = "block";
                            } else {
                              var notif_div = document.getElementById('delivered-empty');
                              notif_div.style.display = "none";
                            }
                          } catch(err){
                            console.log("Element: status, not found")
                          } 

                          $scope.deliveredUserItems = [
                            { itemOrderName: itemDeliveredOrderName[0],
                              itemOrderPrice: itemDeliveredOrderPrice[0],
                              itemOrderDesc: itemDeliveredOrderDesc[0],
                              itemOrderCount: itemDeliveredOrderCount[0],
                              itemOrderImg: itemDeliveredOrderImg[0],
                              itemOrderID: itemDeliveredOrderID[0],
                              dateOrderAdded: dateDeliveredOrderAdded[0],
                              dateOrderDelivery: dateDeliveredOrderDelivery[0],
                            },
                            { itemOrderName: itemDeliveredOrderName[1],
                              itemOrderPrice: itemDeliveredOrderPrice[1],
                              itemOrderDesc: itemDeliveredOrderDesc[1],
                              itemOrderCount: itemDeliveredOrderCount[1],
                              itemOrderImg: itemDeliveredOrderImg[1],
                              itemOrderID: itemDeliveredOrderID[1],
                              dateOrderAdded: dateDeliveredOrderAdded[1],
                              dateOrderDelivery: dateDeliveredOrderDelivery[1],
                            },
                            { itemOrderName: itemDeliveredOrderName[2],
                              itemOrderPrice: itemDeliveredOrderPrice[2],
                              itemOrderDesc: itemDeliveredOrderDesc[2],
                              itemOrderCount: itemDeliveredOrderCount[2],
                              itemOrderImg: itemDeliveredOrderImg[2],
                              itemOrderID: itemDeliveredOrderID[2],
                              dateOrderAdded: dateDeliveredOrderAdded[2],
                              dateOrderDelivery: dateDeliveredOrderDelivery[2],
                            },
                            { itemOrderName: itemDeliveredOrderName[3],
                              itemOrderPrice: itemDeliveredOrderPrice[3],
                              itemOrderDesc: itemDeliveredOrderDesc[3],
                              itemOrderCount: itemDeliveredOrderCount[3],
                              itemOrderImg: itemDeliveredOrderImg[3],
                              itemOrderID: itemDeliveredOrderID[3],
                              dateOrderAdded: dateDeliveredOrderAdded[3],
                              dateOrderDelivery: dateDeliveredOrderDelivery[3],
                            },
                            { itemOrderName: itemDeliveredOrderName[4],
                              itemOrderPrice: itemDeliveredOrderPrice[4],
                              itemOrderDesc: itemDeliveredOrderDesc[4],
                              itemOrderCount: itemDeliveredOrderCount[4],
                              itemOrderImg: itemDeliveredOrderImg[4],
                              itemOrderID: itemDeliveredOrderID[4],
                              dateOrderAdded: dateDeliveredOrderAdded[4],
                              dateOrderDelivery: dateDeliveredOrderDelivery[4],
                            },
                            { itemOrderName: itemDeliveredOrderName[5],
                              itemOrderPrice: itemDeliveredOrderPrice[5],
                              itemOrderDesc: itemDeliveredOrderDesc[5],
                              itemOrderCount: itemDeliveredOrderCount[5],
                              itemOrderImg: itemDeliveredOrderImg[5],
                              itemOrderID: itemDeliveredOrderID[5],
                              dateOrderAdded: dateDeliveredOrderAdded[5],
                              dateOrderDelivery: dateDeliveredOrderDelivery[5],
                            },
                            { itemOrderName: itemDeliveredOrderName[6],
                              itemOrderPrice: itemDeliveredOrderPrice[6],
                              itemOrderDesc: itemDeliveredOrderDesc[6],
                              itemOrderCount: itemDeliveredOrderCount[6],
                              itemOrderImg: itemDeliveredOrderImg[6],
                              itemOrderID: itemDeliveredOrderID[6],
                              dateOrderAdded: dateDeliveredOrderAdded[6],
                              dateOrderDelivery: dateDeliveredOrderDelivery[6],
                            },
                            { itemOrderName: itemDeliveredOrderName[7],
                              itemOrderPrice: itemDeliveredOrderPrice[7],
                              itemOrderDesc: itemDeliveredOrderDesc[7],
                              itemOrderCount: itemDeliveredOrderCount[7],
                              itemOrderImg: itemDeliveredOrderImg[7],
                              itemOrderID: itemDeliveredOrderID[7],
                              dateOrderAdded: dateDeliveredOrderAdded[7],
                              dateOrderDelivery: dateDeliveredOrderDelivery[7],
                            },
                            { itemOrderName: itemDeliveredOrderName[8],
                              itemOrderPrice: itemDeliveredOrderPrice[8],
                              itemOrderDesc: itemDeliveredOrderDesc[8],
                              itemOrderCount: itemDeliveredOrderCount[8],
                              itemOrderImg: itemDeliveredOrderImg[8],
                              itemOrderID: itemDeliveredOrderID[8],
                              dateOrderAdded: dateDeliveredOrderAdded[8],
                              dateOrderDelivery: dateDeliveredOrderDelivery[8],
                            },
                            { itemOrderName: itemDeliveredOrderName[9],
                              itemOrderPrice: itemDeliveredOrderPrice[9],
                              itemOrderDesc: itemDeliveredOrderDesc[9],
                              itemOrderCount: itemDeliveredOrderCount[9],
                              itemOrderImg: itemDeliveredOrderImg[9],
                              itemOrderID: itemDeliveredOrderID[9],
                              dateOrderAdded: dateDeliveredOrderAdded[9],
                              dateOrderDelivery: dateDeliveredOrderDelivery[9],
                            },

                          ]; 
                          

                          
                        });
                      /// console.log(tasks);
                    }); 

                  //Retrieve all items in Admin Orders  
                  let itemAdminOrderName = [];
                  let itemAdminOrderPrice = [];
                  let itemAdminOrderDesc = []; 
                  let itemAdminOrderCount = [];
                  let itemAdminOrderImg = [];
                  let itemAdminOrderID = [];
                  let orderAdminOrderID = [];
                  let dateAdminOrderAdded = [];
                  let dateAdminOrderDelivery = [];
                  let userFullNameOrders = [];
                  let userIDOrders = [];
                  let userPhoneNoOrders = [];
                  let userAddressOrders = []; 
                      
                  db.collection("orders")
                    .orderBy("dateAdminOrderAdded", "asc")
                    .get()
                    .then((querySnapshot) => { 
                        querySnapshot.forEach((doc) => { 
                          const myCart = doc.data();   

                          const item_name = myCart.itemAdminOrderName; 
                          itemAdminOrderName.push(item_name); 

                          const item_price = myCart.itemAdminOrderPrice; 
                          itemAdminOrderPrice.push(item_price);

                          const item_desc = myCart.itemAdminOrderDesc; 
                          itemAdminOrderDesc.push(item_desc);  

                          const date_added = myCart.dateAdminOrderAdded; 
                          dateAdminOrderAdded.push(date_added); 

                          const date_delivery = myCart.dateAdminOrderDelivery; 
                          dateAdminOrderDelivery.push(date_delivery); 

                          const user_fullname = myCart.userFullName; 
                          userFullNameOrders.push(user_fullname); 

                          const user_phone = myCart.userPhoneNo; 
                          userPhoneNoOrders.push(user_phone); 

                          const user_address = myCart.userAddress; 
                          userAddressOrders.push(user_address); 

                          const item_count = myCart.itemAdminOrderCount; 
                          itemAdminOrderCount.push(item_count); 
                        
                          const item_img = myCart.itemAdminOrderImg; 
                          itemAdminOrderImg.push(item_img); 
                          
                          const item_id = myCart.itemAdminOrderID; 
                          itemAdminOrderID.push(item_id); 

                          const userID = myCart.userID; 
                          userIDOrders.push(userID); 
                          
                          const order_id = myCart.orderAdminOrderID; 
                          orderAdminOrderID.push(order_id); 

                          $scope.orderAdminItems = [
                            { itemOrderName: itemAdminOrderName[0],
                              itemOrderPrice: itemAdminOrderPrice[0],
                              itemOrderDesc: itemAdminOrderDesc[0],
                              itemOrderCount: itemAdminOrderCount[0],
                              itemOrderImg: itemAdminOrderImg[0],
                              itemOrderID: itemAdminOrderID[0],
                              orderOrderID: orderAdminOrderID[0],
                              dateOrderAdded: dateAdminOrderAdded[0],
                              dateOrderDelivery: dateAdminOrderDelivery[0],
                              userFullName: userFullNameOrders[0],
                              userPhoneNo: userPhoneNoOrders[0],
                              userAddress: userAddressOrders[0],
                              userID: userIDOrders[0],
                            },
                            { itemOrderName: itemAdminOrderName[1],
                              itemOrderPrice: itemAdminOrderPrice[1],
                              itemOrderDesc: itemAdminOrderDesc[1],
                              itemOrderCount: itemAdminOrderCount[1],
                              itemOrderImg: itemAdminOrderImg[1],
                              itemOrderID: itemAdminOrderID[1],
                              orderOrderID: orderAdminOrderID[1],
                              dateOrderAdded: dateAdminOrderAdded[1],
                              dateOrderDelivery: dateAdminOrderDelivery[1],
                              userFullName: userFullNameOrders[1],
                              userPhoneNo: userPhoneNoOrders[1],
                              userAddress: userAddressOrders[1],
                              userID: userIDOrders[1],
                            },
                            { itemOrderName: itemAdminOrderName[2],
                              itemOrderPrice: itemAdminOrderPrice[2],
                              itemOrderDesc: itemAdminOrderDesc[2],
                              itemOrderCount: itemAdminOrderCount[2],
                              itemOrderImg: itemAdminOrderImg[2],
                              itemOrderID: itemAdminOrderID[2],
                              orderOrderID: orderAdminOrderID[2],
                              dateOrderAdded: dateAdminOrderAdded[2],
                              dateOrderDelivery: dateAdminOrderDelivery[2],
                              userFullName: userFullNameOrders[2],
                              userPhoneNo: userPhoneNoOrders[2],
                              userAddress: userAddressOrders[2],
                              userID: userIDOrders[2],
                            },
                            { itemOrderName: itemAdminOrderName[3],
                              itemOrderPrice: itemAdminOrderPrice[3],
                              itemOrderDesc: itemAdminOrderDesc[3],
                              itemOrderCount: itemAdminOrderCount[3],
                              itemOrderImg: itemAdminOrderImg[3],
                              itemOrderID: itemAdminOrderID[3],
                              orderOrderID: orderAdminOrderID[3],
                              dateOrderAdded: dateAdminOrderAdded[3],
                              dateOrderDelivery: dateAdminOrderDelivery[3],
                              userFullName: userFullNameOrders[3],
                              userPhoneNo: userPhoneNoOrders[3],
                              userAddress: userAddressOrders[3],
                              userID: userIDOrders[3],
                            },
                            { itemOrderName: itemAdminOrderName[4],
                              itemOrderPrice: itemAdminOrderPrice[4],
                              itemOrderDesc: itemAdminOrderDesc[4],
                              itemOrderCount: itemAdminOrderCount[4],
                              itemOrderImg: itemAdminOrderImg[4],
                              itemOrderID: itemAdminOrderID[4],
                              orderOrderID: orderAdminOrderID[4],
                              dateOrderAdded: dateAdminOrderAdded[4],
                              dateOrderDelivery: dateAdminOrderDelivery[4],
                              userFullName: userFullNameOrders[4],
                              userPhoneNo: userPhoneNoOrders[4],
                              userAddress: userAddressOrders[4],
                              userID: userIDOrders[4],
                            },
                            { itemOrderName: itemAdminOrderName[5],
                              itemOrderPrice: itemAdminOrderPrice[5],
                              itemOrderDesc: itemAdminOrderDesc[5],
                              itemOrderCount: itemAdminOrderCount[5],
                              itemOrderImg: itemAdminOrderImg[5],
                              itemOrderID: itemAdminOrderID[5],
                              orderOrderID: orderAdminOrderID[5],
                              dateOrderAdded: dateAdminOrderAdded[5],
                              dateOrderDelivery: dateAdminOrderDelivery[5],
                              userFullName: userFullNameOrders[5],
                              userPhoneNo: userPhoneNoOrders[5],
                              userAddress: userAddressOrders[5],
                              userID: userIDOrders[5],
                            },
                            { itemOrderName: itemAdminOrderName[6],
                              itemOrderPrice: itemAdminOrderPrice[6],
                              itemOrderDesc: itemAdminOrderDesc[6],
                              itemOrderCount: itemAdminOrderCount[6],
                              itemOrderImg: itemAdminOrderImg[6],
                              itemOrderID: itemAdminOrderID[6],
                              orderOrderID: orderAdminOrderID[6],
                              dateOrderAdded: dateAdminOrderAdded[6],
                              dateOrderDelivery: dateAdminOrderDelivery[6],
                              userFullName: userFullNameOrders[6],
                              userPhoneNo: userPhoneNoOrders[6],
                              userAddress: userAddressOrders[6],
                              userID: userIDOrders[6],
                            },
                            { itemOrderName: itemAdminOrderName[7],
                              itemOrderPrice: itemAdminOrderPrice[7],
                              itemOrderDesc: itemAdminOrderDesc[7],
                              itemOrderCount: itemAdminOrderCount[7],
                              itemOrderImg: itemAdminOrderImg[7],
                              itemOrderID: itemAdminOrderID[7],
                              orderOrderID: orderAdminOrderID[7],
                              dateOrderAdded: dateAdminOrderAdded[7],
                              dateOrderDelivery: dateAdminOrderDelivery[7],
                              userFullName: userFullNameOrders[7],
                              userPhoneNo: userPhoneNoOrders[7],
                              userAddress: userAddressOrders[7],
                              userID: userIDOrders[7],
                            },
                            { itemOrderName: itemAdminOrderName[8],
                              itemOrderPrice: itemAdminOrderPrice[8],
                              itemOrderDesc: itemAdminOrderDesc[8],
                              itemOrderCount: itemAdminOrderCount[8],
                              itemOrderImg: itemAdminOrderImg[8],
                              itemOrderID: itemAdminOrderID[8],
                              orderOrderID: orderAdminOrderID[8],
                              dateOrderAdded: dateAdminOrderAdded[8],
                              dateOrderDelivery: dateAdminOrderDelivery[8],
                              userFullName: userFullNameOrders[8],
                              userPhoneNo: userPhoneNoOrders[8],
                              userAddress: userAddressOrders[8],
                              userID: userIDOrders[8],
                            },
                            { itemOrderName: itemAdminOrderName[9],
                              itemOrderPrice: itemAdminOrderPrice[9],
                              itemOrderDesc: itemAdminOrderDesc[9],
                              itemOrderCount: itemAdminOrderCount[9],
                              itemOrderImg: itemAdminOrderImg[9],
                              itemOrderID: itemAdminOrderID[9],
                              orderOrderID: orderAdminOrderID[9],
                              dateOrderAdded: dateAdminOrderAdded[9],
                              dateOrderDelivery: dateAdminOrderDelivery[9],
                              userFullName: userFullNameOrders[9],
                              userPhoneNo: userPhoneNoOrders[9],
                              userAddress: userAddressOrders[9],
                              userID: userIDOrders[9],
                            },

                          ]; 

                          $scope.processNow = function(data) {
                            var item_name = data.itemOrderName;
                            var item_count = data.itemOrderCount;
                            var item_desc = data.itemOrderDesc;
                            var item_id = data.itemOrderID;
                            var item_order_id = data.orderOrderID;
                            var item_img = data.itemOrderImg;
                            var item_price = data.itemOrderPrice;
                            var date_added = data.dateOrderAdded;
                            var date_delivery = data.dateOrderDelivery;
                            var full_name = data.userFullName;
                            var phone = data.userPhoneNo;
                            var address = data.userAddress;
                            var u_id = data.userID;

                            var db = firebase.firestore();

                            const docRefUser = db.doc("users/"+u_id+"/processing/"+item_order_id);

                            const docRefAdmin = db.doc("/processing/"+item_order_id);

                            docRefAdmin.set({
                              itemProcessName: item_name+"", 
                              itemProcessCount: item_count+"", 
                              itemProcessDesc: item_desc+"",
                              itemProcessID: item_id+"",
                              orderProcessID: item_order_id+"",
                              itemProcessImg: item_img+"",
                              itemProcessPrice: item_price+"",
                              dateProcessAdded: date_added+"",
                              dateProcessDelivery: date_delivery+"",
                              userFullName: full_name+"",
                              userPhoneNo: phone+"",
                              userAddress: address+"",
                              userID: u_id,
                            });
                            docRefUser.set({
                              itemProcessName: item_name+"", 
                              itemProcessCount: item_count+"", 
                              itemProcessDesc: item_desc+"",
                              itemProcessID: item_id+"",
                              orderProcessID: item_order_id+"",
                              itemProcessImg: item_img+"",
                              itemProcessPrice: item_price+"",
                              dateProcessAdded: date_added+"",
                              dateProcessDelivery: date_delivery+"",
                              userFullName: full_name+"",
                              userPhoneNo: phone+"",
                              userAddress: address+"",
                              userID: u_id,
                            })
                            .then(function() { 
                              alert("Processing the order...");
                              //document.getElementById("cloudSaveStatus").innerText = "Successful";
                            });

                            var order_items1 = db.collection('users').doc(u_id).collection('orders').where('orderOrderID','==',data.orderOrderID);

                            var order_admin_items1 = db.collection('orders').where('orderAdminOrderID','==',data.orderOrderID);
  
                            order_items1.get().then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                                doc.ref.delete().then(() => {
                                  //alert("Order successfully deleted.");
                                  //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                }).catch(function(error) {
                                  console.error("Error removing "+data.itemOrderName, error);
                                });
                              });
                            });
  
                            order_admin_items1.get().then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                                doc.ref.delete().then(() => {
                                  //alert("Order successfully deleted.");
                                  window.location.href = "https://wood-scrap.firebaseapp.com/admin.html";
                                }).catch(function(error) {
                                  console.error("Error removing "+data.itemOrderName, error);
                                });
                              });
                            }); 
                          }
                        });
                        //console.log(tasks);
                    }); 

                    //Retrieve all items in Admin Processing  
                    let itemAdminProcessingName = [];
                    let itemAdminProcessingPrice = [];
                    let itemAdminProcessingDesc = []; 
                    let itemAdminProcessingCount = [];
                    let itemAdminProcessingImg = [];
                    let itemAdminProcessingID = [];
                    let orderAdminProcessingID = [];
                    let dateAdminProcessingAdded = [];
                    let dateAdminProcessingDelivery = [];
                    let userFullNameProcessing = [];
                    let userPhoneNoProcessing = [];
                    let userAddressProcessing = []; 
                    let userIDProcessing = []; 
                        
                    db.collection("processing")
                      .orderBy("dateProcessAdded", "asc")
                      .get()
                      .then((querySnapshot) => { 
                          querySnapshot.forEach((doc) => { 
                            const myCart = doc.data();   

                            const item_name = myCart.itemProcessName; 
                            itemAdminProcessingName.push(item_name); 

                            const item_price = myCart.itemProcessPrice; 
                            itemAdminProcessingPrice.push(item_price);

                            const item_desc = myCart.itemProcessDesc; 
                            itemAdminProcessingDesc.push(item_desc);  

                            const date_added = myCart.dateProcessAdded; 
                            dateAdminProcessingAdded.push(date_added); 

                            const date_delivery = myCart.dateProcessDelivery; 
                            dateAdminProcessingDelivery.push(date_delivery); 

                            const user_fullname = myCart.userFullName; 
                            userFullNameProcessing.push(user_fullname); 

                            const user_phone = myCart.userPhoneNo; 
                            userPhoneNoProcessing.push(user_phone); 

                            const user_address = myCart.userAddress; 
                            userAddressProcessing.push(user_address); 

                            const item_count = myCart.itemProcessCount; 
                            itemAdminProcessingCount.push(item_count); 
                          
                            const item_img = myCart.itemProcessImg; 
                            itemAdminProcessingImg.push(item_img); 
                            
                            const item_id = myCart.itemProcessID; 
                            itemAdminProcessingID.push(item_id); 

                            
                            const order_id = myCart.orderProcessID; 
                            orderAdminProcessingID.push(order_id); 

                            const user_id = myCart.userID; 
                            userIDProcessing.push(user_id); 

                            $scope.processingAdminItems = [
                              { itemOrderName: itemAdminProcessingName[0],
                                itemOrderPrice: itemAdminProcessingPrice[0],
                                itemOrderDesc: itemAdminProcessingDesc[0],
                                itemOrderCount: itemAdminProcessingCount[0],
                                itemOrderImg: itemAdminProcessingImg[0],
                                itemOrderID: itemAdminProcessingID[0],
                                orderOrderID: orderAdminProcessingID[0],
                                dateOrderAdded: dateAdminProcessingAdded[0],
                                dateOrderDelivery: dateAdminProcessingDelivery[0],
                                userFullName: userFullNameProcessing[0],
                                userPhoneNo: userPhoneNoProcessing[0],
                                userAddress: userAddressProcessing[0],
                                userID: userIDProcessing[0],
                              }, 
                              { itemOrderName: itemAdminProcessingName[1],
                                itemOrderPrice: itemAdminProcessingPrice[1],
                                itemOrderDesc: itemAdminProcessingDesc[1],
                                itemOrderCount: itemAdminProcessingCount[1],
                                itemOrderImg: itemAdminProcessingImg[1],
                                itemOrderID: itemAdminProcessingID[1],
                                orderOrderID: orderAdminProcessingID[1],
                                dateOrderAdded: dateAdminProcessingAdded[1],
                                dateOrderDelivery: dateAdminProcessingDelivery[1],
                                userFullName: userFullNameProcessing[1],
                                userPhoneNo: userPhoneNoProcessing[1],
                                userAddress: userAddressProcessing[1],
                                userID: userIDProcessing[1],
                              }, 
                              { itemOrderName: itemAdminProcessingName[2],
                                itemOrderPrice: itemAdminProcessingPrice[2],
                                itemOrderDesc: itemAdminProcessingDesc[2],
                                itemOrderCount: itemAdminProcessingCount[2],
                                itemOrderImg: itemAdminProcessingImg[2],
                                itemOrderID: itemAdminProcessingID[2],
                                orderOrderID: orderAdminProcessingID[2],
                                dateOrderAdded: dateAdminProcessingAdded[2],
                                dateOrderDelivery: dateAdminProcessingDelivery[2],
                                userFullName: userFullNameProcessing[2],
                                userPhoneNo: userPhoneNoProcessing[2],
                                userAddress: userAddressProcessing[2],
                                userID: userIDProcessing[2],
                              }, 
                              { itemOrderName: itemAdminProcessingName[3],
                                itemOrderPrice: itemAdminProcessingPrice[3],
                                itemOrderDesc: itemAdminProcessingDesc[3],
                                itemOrderCount: itemAdminProcessingCount[3],
                                itemOrderImg: itemAdminProcessingImg[3],
                                itemOrderID: itemAdminProcessingID[3],
                                orderOrderID: orderAdminProcessingID[3],
                                dateOrderAdded: dateAdminProcessingAdded[3],
                                dateOrderDelivery: dateAdminProcessingDelivery[3],
                                userFullName: userFullNameProcessing[3],
                                userPhoneNo: userPhoneNoProcessing[3],
                                userAddress: userAddressProcessing[3],
                                userID: userIDProcessing[3],
                              }, 
                              { itemOrderName: itemAdminProcessingName[4],
                                itemOrderPrice: itemAdminProcessingPrice[4],
                                itemOrderDesc: itemAdminProcessingDesc[4],
                                itemOrderCount: itemAdminProcessingCount[4],
                                itemOrderImg: itemAdminProcessingImg[4],
                                itemOrderID: itemAdminProcessingID[4],
                                orderOrderID: orderAdminProcessingID[4],
                                dateOrderAdded: dateAdminProcessingAdded[4],
                                dateOrderDelivery: dateAdminProcessingDelivery[4],
                                userFullName: userFullNameProcessing[4],
                                userPhoneNo: userPhoneNoProcessing[4],
                                userAddress: userAddressProcessing[4],
                                userID: userIDProcessing[4],
                              }, 
                              { itemOrderName: itemAdminProcessingName[5],
                                itemOrderPrice: itemAdminProcessingPrice[5],
                                itemOrderDesc: itemAdminProcessingDesc[5],
                                itemOrderCount: itemAdminProcessingCount[5],
                                itemOrderImg: itemAdminProcessingImg[5],
                                itemOrderID: itemAdminProcessingID[5],
                                orderOrderID: orderAdminProcessingID[5],
                                dateOrderAdded: dateAdminProcessingAdded[5],
                                dateOrderDelivery: dateAdminProcessingDelivery[5],
                                userFullName: userFullNameProcessing[5],
                                userPhoneNo: userPhoneNoProcessing[5],
                                userAddress: userAddressProcessing[5],
                                userID: userIDProcessing[5],
                              }, 
                              { itemOrderName: itemAdminProcessingName[6],
                                itemOrderPrice: itemAdminProcessingPrice[6],
                                itemOrderDesc: itemAdminProcessingDesc[6],
                                itemOrderCount: itemAdminProcessingCount[6],
                                itemOrderImg: itemAdminProcessingImg[6],
                                itemOrderID: itemAdminProcessingID[6],
                                orderOrderID: orderAdminProcessingID[6],
                                dateOrderAdded: dateAdminProcessingAdded[6],
                                dateOrderDelivery: dateAdminProcessingDelivery[6],
                                userFullName: userFullNameProcessing[6],
                                userPhoneNo: userPhoneNoProcessing[6],
                                userAddress: userAddressProcessing[6],
                                userID: userIDProcessing[6],
                              }, 
                              { itemOrderName: itemAdminProcessingName[7],
                                itemOrderPrice: itemAdminProcessingPrice[7],
                                itemOrderDesc: itemAdminProcessingDesc[7],
                                itemOrderCount: itemAdminProcessingCount[7],
                                itemOrderImg: itemAdminProcessingImg[7],
                                itemOrderID: itemAdminProcessingID[7],
                                orderOrderID: orderAdminProcessingID[7],
                                dateOrderAdded: dateAdminProcessingAdded[7],
                                dateOrderDelivery: dateAdminProcessingDelivery[7],
                                userFullName: userFullNameProcessing[7],
                                userPhoneNo: userPhoneNoProcessing[7],
                                userAddress: userAddressProcessing[7],
                                userID: userIDProcessing[7],
                              }, 

                            ]; 

                            $scope.deliverNow = function(data) {
                              var item_name = data.itemOrderName;
                              var item_count = data.itemOrderCount;
                              var item_desc = data.itemOrderDesc;
                              var item_id = data.itemOrderID;
                              var item_order_id = data.orderOrderID;
                              var item_img = data.itemOrderImg;
                              var item_price = data.itemOrderPrice;
                              var date_added = data.dateOrderAdded;
                              var date_delivery = data.dateOrderDelivery;
                              var full_name = data.userFullName;
                              var phone = data.userPhoneNo;
                              var address = data.userAddress;
                              var pUID = data.userID;

                              var db = firebase.firestore();

                              //const docRefUser = db.doc("users/"+uid+"/deli/"+item_order_id);

                              const docRefuser = db.doc("users/"+pUID+"/on_delivery/"+item_order_id);
                              const docRefCrew = db.doc("on_delivery/"+item_order_id);

                              docRefuser.set({
                                itemOrderName: item_name+"", 
                                itemOrderCount: item_count+"", 
                                itemOrderDesc: item_desc+"",
                                itemOrderID: item_id+"",
                                orderOrderID: item_order_id+"",
                                itemOrderImg: item_img+"",
                                itemOrderPrice: item_price+"",
                                dateOrderAdded: date_added+"",
                                dateOrderDelivery: date_delivery+"",
                                userFullName: full_name+"",
                                userPhoneNo: phone+"",
                                userAddress: address+"",
                              });
                                //alert("Delivering the order...");
                                //window.location.href = "https://wood-scrap.firebaseapp.com/admin.html";
                                //document.getElementById("cloudSaveStatus").innerText = "Successful";

                              docRefCrew.set({
                                itemOrderName: item_name+"", 
                                itemOrderCount: item_count+"", 
                                itemOrderDesc: item_desc+"",
                                itemOrderID: item_id+"",
                                orderOrderID: item_order_id+"",
                                itemOrderImg: item_img+"",
                                itemOrderPrice: item_price+"",
                                dateOrderAdded: date_added+"",
                                dateOrderDelivery: date_delivery+"",
                                userFullName: full_name+"",
                                userPhoneNo: phone+"",
                                userAddress: address+"",
                                userID: pUID+"",
                              })
                              .then(function() {
                                var doc = new jsPDF();
                                doc.text('V.C. SAPUTIL', 10, 10)
                                doc.text('Lumber and Pallets', 10, 20)
                                doc.text('Km.1 41 Aguinaldo highway Biga I, Silang Cavite, Philippines 4118', 10, 30)
                                doc.text('Tel. no.: (046) 414-1841', 10, 40)
                                doc.text('----------------------------------------------------------------------------------------------------', 10, 60);
                                doc.text('CUSTOMER INFO', 10, 70);
                                doc.text('Customer Name: '+full_name, 10, 80);
                                doc.text('Phone no: '+phone, 10, 90);
                                
                                doc.text('Address: '+address, 10, 100);
                                doc.text('----------------------------------------------------------------------------------------------------', 10, 110);
                                doc.text('ORDER DETAILS', 10, 120);
                                doc.text('Delivered date: '+date_delivery, 10, 130);
                                doc.text('Item Name: '+item_name+'      Quantity: '+data.itemOrderCount, 10, 140);
                                doc.text('Price: Php '+item_price+'.00', 10, 150);
                                
                                doc.text('----------------------------------------End of Receipt----------------------------------------', 10, 160);
                                
                                doc.save(item_order_id+'.pdf');

                                var process_admin_remove = db.collection('processing').where('orderProcessID','==',item_order_id);
                                var process_user_remove = db.collection('users').doc(pUID).collection('processing').where('orderProcessID','==',item_order_id);
  
                                process_admin_remove.get().then(function(querySnapshot) {
                                  querySnapshot.forEach(function(doc) {
                                    doc.ref.delete().then(() => {
                                      //alert("Order successfully deleted.");
                                      //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                    }).catch(function(error) {
                                      console.error("Error removing "+data.itemOrderName, error);
                                    });
                                  });
                                });

                                process_user_remove.get().then(function(querySnapshot) {
                                  querySnapshot.forEach(function(doc) {
                                    doc.ref.delete().then(() => {
                                      //alert("Order successfully deleted.");
                                      //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                      alert("Delivering the order...");
                                      window.location.href = "https://wood-scrap.firebaseapp.com/admin.html";
                                    }).catch(function(error) {
                                      console.error("Error removing "+data.itemOrderName, error);
                                    });
                                  });
                                });
                                
                                //document.getElementById("cloudSaveStatus").innerText = "Successful";
                              }); 

                              
                            }
                          });
                          //console.log(tasks);
                      }); 


                    //Retrieve all items in User Processing  
                    let itemProcessingName = [];
                    let itemProcessingPrice = [];
                    let itemProcessingDesc = []; 
                    let itemProcessingCount = [];
                    let itemProcessingImg = [];
                    let itemProcessingID = [];
                    let orderProcessingID = [];
                    let dateProcessingAdded = [];
                    let dateProcessingDelivery = []; 
                        
                    db.collection("processing")
                      .orderBy("dateAdminOrderAdded", "asc")
                      .get()
                      .then((querySnapshot) => { 
                          querySnapshot.forEach((doc) => { 
                            const myCart = doc.data();   

                            const item_name = myCart.itemProcessName; 
                            itemProcessingName.push(item_name); 

                            const item_price = myCart.itemProcessPrice; 
                            itemProcessingPrice.push(item_price);

                            const item_desc = myCart.itemProcessDesc; 
                            itemProcessingDesc.push(item_desc);  

                            const date_added = myCart.dateProcessAdded; 
                            dateProcessingAdded.push(date_added); 

                            const date_delivery = myCart.dateProcessDelivery; 
                            dateProcessingDelivery.push(date_delivery); 

                            const user_fullname = myCart.userFullName; 
                            userFullNameOrders.push(user_fullname); 

                            const user_phone = myCart.userPhoneNo; 
                            userPhoneNoOrders.push(user_phone); 

                            const user_address = myCart.userAddress; 
                            userAddressOrders.push(user_address); 

                            const item_count = myCart.itemProcessCount; 
                            itemProcessingCount.push(item_count); 
                          
                            const item_img = myCart.itemProcessImg; 
                            itemProcessingImg.push(item_img); 
                            
                            const item_id = myCart.itemProcessID; 
                            itemProcessingID.push(item_id); 

                            
                            const order_id = myCart.orderProcessID; 
                            orderProcessingID.push(order_id); 

                            try{
                              if(orderProcessingID.length == 0){
                                var notif_div = document.getElementById('processing-empty1');
                                notif_div.style.display = "block";
                              }  if(orderProcessingID.length >= 1) {
                                var notif_div = document.getElementById('processing-empty1');
                                notif_div.style.display = "none";
                              }
                            } catch(err){
                              console.log("Element: status, not found")
                            } 
                            $scope.processingItems = [
                              { itemOrderName: itemProcessingName[0],
                                itemOrderPrice: itemProcessingPrice[0],
                                itemOrderDesc: itemProcessingDesc[0],
                                itemOrderCount: itemProcessingCount[0],
                                itemOrderImg: itemProcessingImg[0],
                                itemOrderID: itemProcessingID[0],
                                orderOrderID: orderProcessingID[0],
                                dateOrderAdded: dateProcessingAdded[0],
                                dateOrderDelivery: dateProcessingDelivery[0], 
                              }, 
                              { itemOrderName: itemProcessingName[1],
                                itemOrderPrice: itemProcessingPrice[1],
                                itemOrderDesc: itemProcessingDesc[1],
                                itemOrderCount: itemProcessingCount[1],
                                itemOrderImg: itemProcessingImg[1],
                                itemOrderID: itemProcessingID[1],
                                orderOrderID: orderProcessingID[1],
                                dateOrderAdded: dateProcessingAdded[0],
                                dateOrderDelivery: dateProcessingDelivery[1], 
                              }, 
                              { itemOrderName: itemProcessingName[2],
                                itemOrderPrice: itemProcessingPrice[2],
                                itemOrderDesc: itemProcessingDesc[2],
                                itemOrderCount: itemProcessingCount[2],
                                itemOrderImg: itemProcessingImg[2],
                                itemOrderID: itemProcessingID[2],
                                orderOrderID: orderProcessingID[2],
                                dateOrderAdded: dateProcessingAdded[2],
                                dateOrderDelivery: dateProcessingDelivery[2], 
                              }, 
                              { itemOrderName: itemProcessingName[3],
                                itemOrderPrice: itemProcessingPrice[3],
                                itemOrderDesc: itemProcessingDesc[3],
                                itemOrderCount: itemProcessingCount[3],
                                itemOrderImg: itemProcessingImg[3],
                                itemOrderID: itemProcessingID[3],
                                orderOrderID: orderProcessingID[3],
                                dateOrderAdded: dateProcessingAdded[3],
                                dateOrderDelivery: dateProcessingDelivery[3], 
                              }, 
                              { itemOrderName: itemProcessingName[4],
                                itemOrderPrice: itemProcessingPrice[4],
                                itemOrderDesc: itemProcessingDesc[4],
                                itemOrderCount: itemProcessingCount[4],
                                itemOrderImg: itemProcessingImg[4],
                                itemOrderID: itemProcessingID[4],
                                orderOrderID: orderProcessingID[4],
                                dateOrderAdded: dateProcessingAdded[4],
                                dateOrderDelivery: dateProcessingDelivery[4], 
                              }, 
                              { itemOrderName: itemProcessingName[5],
                                itemOrderPrice: itemProcessingPrice[5],
                                itemOrderDesc: itemProcessingDesc[5],
                                itemOrderCount: itemProcessingCount[5],
                                itemOrderImg: itemProcessingImg[5],
                                itemOrderID: itemProcessingID[5],
                                orderOrderID: orderProcessingID[5],
                                dateOrderAdded: dateProcessingAdded[5],
                                dateOrderDelivery: dateProcessingDelivery[5], 
                              }, 
                              { itemOrderName: itemProcessingName[6],
                                itemOrderPrice: itemProcessingPrice[6],
                                itemOrderDesc: itemProcessingDesc[6],
                                itemOrderCount: itemProcessingCount[6],
                                itemOrderImg: itemProcessingImg[6],
                                itemOrderID: itemProcessingID[6],
                                orderOrderID: orderProcessingID[6],
                                dateOrderAdded: dateProcessingAdded[6],
                                dateOrderDelivery: dateProcessingDelivery[6], 
                              }, 
                              { itemOrderName: itemProcessingName[7],
                                itemOrderPrice: itemProcessingPrice[7],
                                itemOrderDesc: itemProcessingDesc[7],
                                itemOrderCount: itemProcessingCount[7],
                                itemOrderImg: itemProcessingImg[7],
                                itemOrderID: itemProcessingID[7],
                                orderOrderID: orderProcessingID[7],
                                dateOrderAdded: dateProcessingAdded[7],
                                dateOrderDelivery: dateProcessingDelivery[7], 
                              }, 
                              { itemOrderName: itemProcessingName[8],
                                itemOrderPrice: itemProcessingPrice[8],
                                itemOrderDesc: itemProcessingDesc[8],
                                itemOrderCount: itemProcessingCount[8],
                                itemOrderImg: itemProcessingImg[8],
                                itemOrderID: itemProcessingID[8],
                                orderOrderID: orderProcessingID[8],
                                dateOrderAdded: dateProcessingAdded[8],
                                dateOrderDelivery: dateProcessingDelivery[8], 
                              },  
                            ];  
                            
                            
                          });
                          //console.log(tasks);
                      });   

                    //Retrieve all items in Worker Delivery
                    let itemDeliveryName = [];
                    let itemDeliveryPrice = [];
                    let itemDeliveryDesc = []; 
                    let itemDeliveryCount = [];  
                    let orderDeliveryID = []; 
                    let userFullNameDelivery = []; 
                    let userAddressDelivery = []; 
                    let userPhoneNoDelivery = []; 
                    let userIDDelivery = []; 
                        
                    db.collection("on_delivery") 
                      .get()
                      .then((querySnapshot) => { 
                          querySnapshot.forEach((doc) => { 
                            const myCart = doc.data();   

                            const item_name = myCart.itemOrderName; 
                            itemDeliveryName.push(item_name); 

                            const item_price = myCart.itemOrderPrice; 
                            itemDeliveryPrice.push(item_price);

                            const item_desc = myCart.itemOrderDesc; 
                            itemDeliveryDesc.push(item_desc);   
                            
                            const user_fullname = myCart.userFullName; 
                            userFullNameDelivery.push(user_fullname); 

                            const user_phone = myCart.userPhoneNo; 
                            userPhoneNoDelivery.push(user_phone); 

                            const user_address = myCart.userAddress; 
                            userAddressDelivery.push(user_address); 

                            const item_count = myCart.itemOrderCount; 
                            itemDeliveryCount.push(item_count);  

                            const user_id = myCart.userID; 
                            userIDDelivery.push(user_id); 

                            const order_id = myCart.orderOrderID; 
                            orderDeliveryID.push(order_id); 

                            $scope.delivering = [
                              { itemOrderName: itemDeliveryName[0],
                                itemOrderPrice: itemDeliveryPrice[0],
                                itemOrderDesc: itemDeliveryDesc[0],
                                itemOrderCount: itemDeliveryCount[0],  
                                orderOrderID: orderDeliveryID[0],
                                userFullName: userFullNameDelivery[0],
                                userAddress: userAddressDelivery[0], 
                                userPhoneNo: userPhoneNoDelivery[0], 
                                userID: userIDDelivery[0],
                              },  
                              { itemOrderName: itemDeliveryName[1],
                                itemOrderPrice: itemDeliveryPrice[1],
                                itemOrderDesc: itemDeliveryDesc[1],
                                itemOrderCount: itemDeliveryCount[1],  
                                orderOrderID: orderDeliveryID[1],
                                userFullName: userFullNameDelivery[1],
                                userAddress: userAddressDelivery[1], 
                                userPhoneNo: userPhoneNoDelivery[1], 
                                userID: userIDDelivery[1],
                              }, 
                              { itemOrderName: itemDeliveryName[2],
                                itemOrderPrice: itemDeliveryPrice[2],
                                itemOrderDesc: itemDeliveryDesc[2],
                                itemOrderCount: itemDeliveryCount[2],  
                                orderOrderID: orderDeliveryID[2],
                                userFullName: userFullNameDelivery[2],
                                userAddress: userAddressDelivery[2], 
                                userPhoneNo: userPhoneNoDelivery[2], 
                                userID: userIDDelivery[2],
                              }, 
                              { itemOrderName: itemDeliveryName[3],
                                itemOrderPrice: itemDeliveryPrice[3],
                                itemOrderDesc: itemDeliveryDesc[3],
                                itemOrderCount: itemDeliveryCount[3],  
                                orderOrderID: orderDeliveryID[3],
                                userFullName: userFullNameDelivery[3],
                                userAddress: userAddressDelivery[3], 
                                userPhoneNo: userPhoneNoDelivery[3], 
                                userID: userIDDelivery[3],
                              }, 
                              { itemOrderName: itemDeliveryName[4],
                                itemOrderPrice: itemDeliveryPrice[4],
                                itemOrderDesc: itemDeliveryDesc[4],
                                itemOrderCount: itemDeliveryCount[4],  
                                orderOrderID: orderDeliveryID[4],
                                userFullName: userFullNameDelivery[4],
                                userAddress: userAddressDelivery[4], 
                                userPhoneNo: userPhoneNoDelivery[4], 
                                userID: userIDDelivery[4],
                              }, 
                              { itemOrderName: itemDeliveryName[5],
                                itemOrderPrice: itemDeliveryPrice[5],
                                itemOrderDesc: itemDeliveryDesc[5],
                                itemOrderCount: itemDeliveryCount[5],  
                                orderOrderID: orderDeliveryID[5],
                                userFullName: userFullNameDelivery[5],
                                userAddress: userAddressDelivery[5], 
                                userPhoneNo: userPhoneNoDelivery[5], 
                                userID: userIDDelivery[5],
                              }, 
                              { itemOrderName: itemDeliveryName[6],
                                itemOrderPrice: itemDeliveryPrice[6],
                                itemOrderDesc: itemDeliveryDesc[6],
                                itemOrderCount: itemDeliveryCount[6],  
                                orderOrderID: orderDeliveryID[6],
                                userFullName: userFullNameDelivery[6],
                                userAddress: userAddressDelivery[6], 
                                userPhoneNo: userPhoneNoDelivery[6], 
                                userID: userIDDelivery[6],
                              }, 
                              { itemOrderName: itemDeliveryName[7],
                                itemOrderPrice: itemDeliveryPrice[7],
                                itemOrderDesc: itemDeliveryDesc[7],
                                itemOrderCount: itemDeliveryCount[7],  
                                orderOrderID: orderDeliveryID[7],
                                userFullName: userFullNameDelivery[7],
                                userAddress: userAddressDelivery[7], 
                                userPhoneNo: userPhoneNoDelivery[7], 
                                userID: userIDDelivery[7],
                              }, 
                              { itemOrderName: itemDeliveryName[8],
                                itemOrderPrice: itemDeliveryPrice[8],
                                itemOrderDesc: itemDeliveryDesc[8],
                                itemOrderCount: itemDeliveryCount[8],  
                                orderOrderID: orderDeliveryID[8],
                                userFullName: userFullNameDelivery[8],
                                userAddress: userAddressDelivery[8], 
                                userPhoneNo: userPhoneNoDelivery[8], 
                                userID: userIDDelivery[8],
                              }, 
                              { itemOrderName: itemDeliveryName[9],
                                itemOrderPrice: itemDeliveryPrice[9],
                                itemOrderDesc: itemDeliveryDesc[9],
                                itemOrderCount: itemDeliveryCount[9],  
                                orderOrderID: orderDeliveryID[9],
                                userFullName: userFullNameDelivery[9],
                                userAddress: userAddressDelivery[9], 
                                userPhoneNo: userPhoneNoDelivery[9], 
                                userID: userIDDelivery[9],
                              }, 
                              
                            ];  

                            console.log(itemDeliveryName+"");

                            $scope.delivered = function(data) {
                              var item_name = data.itemOrderName;
                              var item_count = data.itemOrderCount;
                              var item_desc = data.itemOrderDesc; 
                              var item_order_id = data.orderOrderID; 
                              var item_price = data.itemOrderPrice;  
                              var full_name = data.userFullName;
                              var phone = data.userPhoneNo;
                              var address = data.userAddress;
                              var pUID = data.userID;

                              var db = firebase.firestore();

                              var currentDateDelivered = new Date();

                              //const docRefUser = db.doc("users/"+uid+"/deli/"+item_order_id);

                              const docRefuser = db.doc("users/"+pUID+"/delivered/"+item_order_id);
                              const docRefCrew = db.doc("delivered/"+item_order_id);

                              docRefuser.set({
                                itemOrderName: item_name+"", 
                                itemOrderCount: item_count+"", 
                                itemOrderDesc: item_desc+"", 
                                orderOrderID: item_order_id+"", 
                                itemOrderPrice: item_price+"", 
                                userFullName: full_name+"",
                                userPhoneNo: phone+"",
                                userAddress: address+"",
                                dateOrderAdded: currentDateDelivered+"",
                              });
                                //alert("Delivering the order...");
                                //window.location.href = "https://wood-scrap.firebaseapp.com/admin.html";
                                //document.getElementById("cloudSaveStatus").innerText = "Successful";

                              docRefCrew.set({
                                itemOrderName: item_name+"", 
                                itemOrderCount: item_count+"", 
                                itemOrderDesc: item_desc+"", 
                                orderOrderID: item_order_id+"", 
                                itemOrderPrice: item_price+"", 
                                userFullName: full_name+"",
                                userPhoneNo: phone+"",
                                userAddress: address+"",
                                userID: pUID+"",
                                dateOrderAdded: currentDateDelivered+"",
                              })
                              .then(function() {
                                var on_delivery_admin_remove = db.collection('on_delivery').where('orderOrderID','==',item_order_id);
                                var on_delivery_user_remove = db.collection('users').doc(pUID).collection('on_delivery').where('orderOrderID','==',item_order_id);
  
                                on_delivery_admin_remove.get().then(function(querySnapshot) {
                                  querySnapshot.forEach(function(doc) {
                                    doc.ref.delete().then(() => {
                                      //alert("Order successfully deleted.");
                                      //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                    }).catch(function(error) {
                                      console.error("Error removing "+data.itemOrderName, error);
                                    });
                                  });
                                });

                                on_delivery_user_remove.get().then(function(querySnapshot) {
                                  querySnapshot.forEach(function(doc) {
                                    doc.ref.delete().then(() => {
                                      //alert("Order successfully deleted.");
                                      //window.location.href = "https://wood-scrap.firebaseapp.com/account.html";
                                      alert("Order Delivered...");
                                      window.location.href = "https://wood-scrap.firebaseapp.com/on_delivery.html";
                                    }).catch(function(error) {
                                      console.error("Error removing "+data.itemOrderName, error);
                                    });
                                  });
                                });
                                
                                //document.getElementById("cloudSaveStatus").innerText = "Successful";
                              }); 

                              
                            }
                          });
                          //console.log(tasks);
                      });     

                    //Retrieve all items in Admin Delivered Orders  
                    let itemAdminDeliveredOrderName = [];
                    let itemAdminDeliveredOrderPrice = [];
                    let itemAdminDeliveredOrderDesc = []; 
                    let itemAdminDeliveredOrderCount = [];
                    let itemAdminDeliveredOrderImg = [];
                    let itemAdminDeliveredOrderID = [];
                    let dateAdminDeliveredOrderAdded = [];
                    let dateAdminDeliveredOrderDelivery = [];
                    let userFullNameDelivered = [];
                    let userPhoneNoDelivered = [];
                    let userAddressDelivered = [];
                        
                    db.collection("delivered")
                      .orderBy("dateOrderAdded", "desc")
                      .get()
                      .then((querySnapshot) => { 
                          querySnapshot.forEach((doc) => { 
                            const myCart = doc.data();   

                            const item_name = myCart.itemOrderName; 
                            itemAdminDeliveredOrderName.push(item_name); 

                            const item_price = myCart.itemOrderPrice; 
                            itemAdminDeliveredOrderPrice.push(item_price);

                            const item_desc = myCart.itemOrderDesc; 
                            itemAdminDeliveredOrderDesc.push(item_desc);  

                            const date_added = myCart.dateOrderAdded; 
                            dateAdminDeliveredOrderAdded.push(date_added); 

                            const date_delivery = myCart.dateOrderDelivery; 
                            dateAdminDeliveredOrderDelivery.push(date_delivery); 

                            const user_fullname = myCart.userFullName; 
                            userFullNameDelivered.push(user_fullname); 

                            const user_phone = myCart.userPhoneNo; 
                            userPhoneNoDelivered.push(user_phone); 

                            const user_address = myCart.userAddress; 
                            userAddressDelivered.push(user_address); 

                            const item_count = myCart.itemOrderCount; 
                            itemAdminDeliveredOrderCount.push(item_count); 

                            const item_img = myCart.itemOrderImg; 
                            itemAdminDeliveredOrderImg.push(item_img); 

                            const item_id = myCart.itemOrderID; 
                            itemAdminDeliveredOrderID.push(item_id); 


                            $scope.deliveredItems = [
                              { itemOrderName: itemAdminDeliveredOrderName[0],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[0],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[0],
                                itemOrderCount: itemAdminDeliveredOrderCount[0],
                                itemOrderImg: itemAdminDeliveredOrderImg[0],
                                itemOrderID: itemAdminDeliveredOrderID[0],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[0],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[0],
                                userFullName: userFullNameDelivered[0],
                                userPhoneNo: userPhoneNoDelivered[0],
                                userAddress: userAddressDelivered[0],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[1],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[1],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[1],
                                itemOrderCount: itemAdminDeliveredOrderCount[1],
                                itemOrderImg: itemAdminDeliveredOrderImg[1],
                                itemOrderID: itemAdminDeliveredOrderID[1],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[1],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[1],
                                userFullName: userFullNameDelivered[1],
                                userPhoneNo: userPhoneNoDelivered[1],
                                userAddress: userAddressDelivered[1],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[2],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[2],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[2],
                                itemOrderCount: itemAdminDeliveredOrderCount[2],
                                itemOrderImg: itemAdminDeliveredOrderImg[2],
                                itemOrderID: itemAdminDeliveredOrderID[2],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[2],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[2],
                                userFullName: userFullNameDelivered[2],
                                userPhoneNo: userPhoneNoDelivered[2],
                                userAddress: userAddressDelivered[2],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[3],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[3],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[3],
                                itemOrderCount: itemAdminDeliveredOrderCount[3],
                                itemOrderImg: itemAdminDeliveredOrderImg[3],
                                itemOrderID: itemAdminDeliveredOrderID[3],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[3],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[3],
                                userFullName: userFullNameDelivered[3],
                                userPhoneNo: userPhoneNoDelivered[3],
                                userAddress: userAddressDelivered[3],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[4],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[4],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[4],
                                itemOrderCount: itemAdminDeliveredOrderCount[4],
                                itemOrderImg: itemAdminDeliveredOrderImg[4],
                                itemOrderID: itemAdminDeliveredOrderID[4],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[4],
                                dateOrderDelivery: dateAdminOrderDelivery[4],
                                userFullName: userFullNameDelivered[4],
                                userPhoneNo: userPhoneNoDelivered[4],
                                userAddress: userAddressDelivered[4],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[5],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[5],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[5],
                                itemOrderCount: itemAdminDeliveredOrderCount[5],
                                itemOrderImg: itemAdminDeliveredOrderImg[5],
                                itemOrderID: itemAdminDeliveredOrderID[5],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[5],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[5],
                                userFullName: userFullNameDelivered[5],
                                userPhoneNo: userPhoneNoDelivered[5],
                                userAddress: userAddressDelivered[5],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[6],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[6],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[6],
                                itemOrderCount: itemAdminDeliveredOrderCount[6],
                                itemOrderImg: itemAdminDeliveredOrderImg[6],
                                itemOrderID: itemAdminDeliveredOrderID[6],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[6],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[6],
                                userFullName: userFullNameDelivered[6],
                                userPhoneNo: userPhoneNoDelivered[6],
                                userAddress: userAddressDelivered[6],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[7],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[7],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[7],
                                itemOrderCount: itemAdminDeliveredOrderCount[7],
                                itemOrderImg: itemAdminDeliveredOrderImg[7],
                                itemOrderID: itemAdminDeliveredOrderID[7],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[7],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[7],
                                userFullName: userFullNameDelivered[7],
                                userPhoneNo: userPhoneNoDelivered[7],
                                userAddress: userAddressDelivered[7],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[8],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[8],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[8],
                                itemOrderCount: itemAdminDeliveredOrderCount[8],
                                itemOrderImg: itemAdminDeliveredOrderImg[8],
                                itemOrderID: itemAdminDeliveredOrderID[8],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[8],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[8],
                                userFullName: userFullNameDelivered[8],
                                userPhoneNo: userPhoneNoDelivered[8],
                                userAddress: userAddressDelivered[8],
                              },
                              { itemOrderName: itemAdminDeliveredOrderName[9],
                                itemOrderPrice: itemAdminDeliveredOrderPrice[9],
                                itemOrderDesc: itemAdminDeliveredOrderDesc[9],
                                itemOrderCount: itemAdminDeliveredOrderCount[9],
                                itemOrderImg: itemAdminDeliveredOrderImg[9],
                                itemOrderID: itemAdminDeliveredOrderID[9],
                                dateOrderAdded: dateAdminDeliveredOrderAdded[9],
                                dateOrderDelivery: dateAdminDeliveredOrderDelivery[9],
                                userFullName: userFullNameDelivered[8],
                                userPhoneNo: userPhoneNoDelivered[8],
                                userAddress: userAddressDelivered[8],
                              },

                            ]; 
                          });
                          //console.log(tasks);
                      }); 

    
            }); 

            
                  

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */

   

  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }
})
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });

  };
})
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
}).controller('ListCtrl', function($scope) {
  var imagePath1 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/shopping-outline.png?alt=media&token=3509b21d-30f2-4d40-9d4e-3405ae7e826f";
  var imagePath2 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/about.png?alt=media&token=799892e1-b6bd-49c0-9d6e-b8fc043cacfa";
  var imagePath3 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/terms-conditions.png?alt=media&token=ed2d6f31-ef2e-4c47-9973-57978b3beb91";
  var imagePath4 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/privacy-policy.png?alt=media&token=7198e026-9cbc-4718-9507-41638ccb1f8f";
  var imagePath5 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/contact-us.png?alt=media&token=40d46baa-0822-4d5d-9a1c-f583529909ec";
  var imagePath6 = "https://firebasestorage.googleapis.com/v0/b/wood-scrap.appspot.com/o/home.png?alt=media&token=a3a7c655-8334-45d0-b03b-9fdc80125ada";
  $scope.todos = [
    {
      face : imagePath6,
      title: 'Home',
      description: 'View our features',
      href: 'index.html'
    }, 
    {
      face : imagePath1,
      title: 'Shop',
      description: 'View our store and buy your needed materials',
      href: 'login.html'
    }, 
    {
      face : imagePath5,
      title: 'Office Location',
      description: 'View ourofficelocation.',
      href: 'locations.html'
    }, 
    {
      face : imagePath2,
      title: 'About',
      description: 'View our about page',
      href: 'about.html'
    }, 
    {
      face : imagePath3,
      title: 'Terms & Conditions',
      description: 'Read our terms and conditions',
      href: 'terms-conditions.html'
    }, 
    {
      face : imagePath4,
      title: 'Privacy Policy',
      description: 'View our privacy policy',
      href: 'privacy-policy.html'
    }, 
  ];

   
});

   
function loginGoogle(){
  firebase.auth()
   
   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
		
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
		
      console.log(error.code)
      console.log(error.message)
   });
}
function loginAccount(){
  
  firebase.auth()

  .signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;

    console.log(user)

    document.getElementById("btn_logout").disabled = false;

  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(error.code)
    console.log(error.message)
  });
}

function initApp(){
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;


        //document.getElementById("googleLogin").disabled = true;
        
            //document.getElementById("btn_logout").disabled = false;

        if(email != ""){
          try{
            document.getElementById("status").textContent = "Successfully logged in";
            setTimeout(function(){
              window.location.href = "forum.html";
           },3000);

            document.getElementById("googleLogin").disabled = true;
        
            document.getElementById("btn_logout").disabled = false;
          }catch(err){
            console.log("Element: status, not found")
          }
          
          
         
        }

        // ...
      } else {
        // User is signed out.
        // ...
        document.getElementById("status").textContent = "Signed out";
        document.getElementById("btn_logout").disabled = true;
      }
    });
}

window.onload = function() { 
try{
  initApp();
  
  document.getElementById("btn_logout").disabled = true;
}catch(err){
  console.log("error initialize.");
}
  
}; 
function logoutAccount(){
  firebase.auth().signOut().then(function() {
    //document.getElementById("status").textContent = "Signed out";
    //document.getElementById("btn_logout").disabled = true;
    //document.getElementById("googleLogin").disabled = false;
    window.location.href = "login.html";
     
  }).catch(function(error) {
    // An error happened.
  });
}


function logoutAccountInHome(){
  firebase.auth().signOut().then(function() {
    //document.getElementById("status").textContent = "Signed out";
    //document.getElementById("btn_logout").disabled = true;
    setTimeout(function(){
      window.location.href = "https://droplets-web.firebaseapp.com/index.html";
   },3000);
    //document.getElementById("btn_login").disabled = false;
  }).catch(function(error) {
    // An error happened.
  });
}

