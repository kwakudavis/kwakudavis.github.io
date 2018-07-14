var $ = require('jquery');


//Display all categories from foursquare on the left tab of homepage

$(function (){
  
    
   
    
   var $categories = $('.categories');
    
   var $veneusList = $('#venuesList');
    
   var $venuesDisplay = $('#venuesDisplay');

  
   //General Ajax request for categories list from foursqaure 
  $.ajax({
  
  type: 'GET',
  url  : 'https://api.foursquare.com/v2/venues/categories?client_id=JOCKYVCUJ2KEPD3YKEODZQNMSMWD4T0OEWRFAATPABI2EMA4&client_secret=3JKD3LM4ZPPJXSU3PTXEFIMRTRF5S01U1XWGPPNSAPTPG130&v=20180709',
  success : function(categories){
      
    
    
      
// function to get foursquare response objects for categories list      
    
 $.each(categories, function(i, category){
           
          if ( category.code === 200){
          //skips the first response meta data object.
    
         
          }else{
             
          
            //Get all category parameters to be displayed on right side bar
              for(var l=0 ; l<10 ;l++){
                  
            //Get the name of the category
    
              var  categoriesNameStringResult = category.categories[l].name;
              var  categoriesPluralNameStringResult = category.categories[l].pluralName;
                  
            //Get the Id of the category   
              var categoryId =category.categories[l].id;
           
                  
            //Get icon prefix of category
              var categoryPrefix =category.categories[l].icon.prefix;    
                  
            //Get tcon suffix of category
               var categorySuffix =category.categories[l].icon.suffix;   
                  
          
        
             //Displaying categories at left right tab with ids
           
           $categories.append('<li>' + '<a href="#" class="categoryList nav-item" id="'+ categoryId +'"  name=' + categoriesPluralNameStringResult + '><img src="'+ categoryPrefix + 'bg_44'+ categorySuffix +'" width="35" height="35" >'+ '<span>'+ categoriesNameStringResult +'</span>' +'</a>' + '</li>');
            
               
            }
     
                     
          }
           
        });  //end of category request query function  
    
     
 //Event listerner that gets venues when a category is selected     
      
      $(document).ready(function(){
                 $(".categoryList").click(function(){
               
                  
                     theVenueResult(this.id,this.name);
                  
                     console.log(this.id);
             
                 }); 
             });     
      
      
      
      
//Function to make venues in valletta api call from foursquare. 
      
  function theVenueResult(categoryId,categoryName){
      
          $.ajax({
            type: 'GET',
             url  : 'https://api.foursquare.com/v2/venues/search?client_id=JOCKYVCUJ2KEPD3YKEODZQNMSMWD4T0OEWRFAATPABI2EMA4&client_secret=3JKD3LM4ZPPJXSU3PTXEFIMRTRF5S01U1XWGPPNSAPTPG130&v=20180709&near=valletta&categoryId='+categoryId,
            success : function(venuesResult){
             
                 var k=  venuesResult.response.venues.length;  
                 console.log(venuesResult.response.venues[0]);
                console.log(venuesResult.response.venues[1]);
                console.log(k);
                
                 $venuesDisplay.html("<h1 class=\"categoryNameVenuPage\">" +categoryName+ "</h1>");
                
                
               for(var f=0 ; f < k; f++){
                   //Loop through response to get and display all venues
                   
                 if(venuesResult.response.venues[f].location.address === undefined){
                    
                    var venueAddress = " - ";
                     
                    }else{
                       var venueAddress =  venuesResult.response.venues[f].location.address;
                        
                    } 
                      
                 if(venuesResult.response.venues[f].location.crossStreet === undefined){
                    
                    var venueStreet = " - ";
                    }else{
                        
                       var venueStreet = venuesResult.response.venues[f].location.crossStreet;
                    }
                   
                   if(venuesResult.response.venues[f].location.distance === undefined){
                    
                    var venueDistance = " - ";
                    }else{
                        
                       var venueDistance = venuesResult.response.venues[f].location.distance+".m ";
                    }
                    
             
                   
                   $venuesDisplay.append(" <tr> <td>" + venuesResult.response.venues[f].name + "</td>  <td>"+ venueAddress +"</td>   <td>" + venueStreet + "</td>  <td>" +venueDistance+"</td></tr>");
                
              }
            }
          });
                
  }
      
   
  }
   
          

  });
  
                
                                     
  
  });




