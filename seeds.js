var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
                {
                    name: "Glacier Park",
                    price: "8.40",
                    image: "http://68.media.tumblr.com/97c845e3e7819bbcd4e8175bc295a9d4/tumblr_noos2q463v1tk1lrvo1_1280.jpg",
                    description: "KKGlobular star cluster, gathered by gravity, at the edge of forever. Shores of the cosmic ocean. Tendrils of gossamer clouds astonishment paroxysm of global death kindling the energy hidden in matter, tingling of the spine, concept of the number one? Tingling of the spine, two ghostly white figures in coveralls and helmets are soflty dancing cosmos at the edge of forever! Rig Veda a billion trillion permanence of the stars Tunguska event the carbon in our apple pies rogue science another world. A billion trillion courage of our questions rogue, cosmic fugue. Hypatia birth, from which we spring dream of the mind's eye are creatures of the cosmos explorations!."
                },
                {
                    name: "Crater Lake",
                    price: "9.00",
                    image: "http://68.media.tumblr.com/d29f88d552ba5b615f950b6fba2bb494/tumblr_nocmlaBUFC1tk1lrvo1_1280.jpg",
                    description: "Citizens of distant epochs, extraplanetary ship of the imagination! Cosmic ocean, at the edge of forever Rig Veda, light years the sky calls to us! Extraplanetary globular star cluster, cosmic ocean tingling of the spine Orion's sword bits of moving fluff hearts of the stars two ghostly white figures in coveralls and helmets are soflty dancing Jean-FranÃƒÂ§ois Champollion vanquish the impossible, corpus callosum dream of the mind's eye Cambrian explosion light years and billions upon billions upon billions upon billions upon billions upon billions upon billions."
                },
                {
                    name: "Joshua Tree",
                    price: "7.50",
                    image: "http://68.media.tumblr.com/2ccfa940fc8a0c0e1e9248730acf1aa4/tumblr_nkxbi865Nr1tk1lrvo1_1280.jpg",
                    description: "Bits of moving fluff brain is the seed of intelligence stirred by starlight permanence of the stars at the edge of forever Sea of Tranquility, as a patch of light? Shores of the cosmic ocean the only home we've ever known paroxysm of global death billions upon billions preserve and cherish that pale blue dot, dream of the mind's eye finite but unbounded, Orion's sword, radio telescope, the sky calls to us a still more glorious dawn awaits, courage of our questions across the centuries circumnavigated shores of the cosmic ocean, as a patch of light the ash of stellar alchemy are creatures of the cosmos and billions upon billions upon billions upon billions upon billions upon billions upon billions."
                },
                {
                    name: "Zion National Park",
                    price: "11.00",
                    image: "http://68.media.tumblr.com/427ac2230c72881d5ff07ff88bdc1020/tumblr_nka9pyllNg1tk1lrvo1_1280.jpg",
                    description: "Not a sunrise but a galaxyrise great turbulent clouds courage of our questions. Vangelis hydrogen atoms rings of Uranus hundreds of thousands realm of the galaxies encyclopaedia galactica Vangelis? Culture shores of the cosmic ocean. Worldlets bits of moving fluff dream of the mind's eye made in the interiors of collapsing stars, Vangelis! The ash of stellar alchemy venture hundreds of thousands. Inconspicuous motes of rock and gas a very small stage in a vast cosmic arena two ghostly white figures in coveralls and helmets are soflty dancing. Made in the interiors of collapsing stars brain is the seed of intelligence astonishment trillion citizens of distant epochs permanence of the stars vanquish the impossible and billions upon billions upon billions upon billions upon billions upon billions upon billions."
                },
                {
                    name: "Great Sand Dunes",
                    price: "12.00",
                    image: "http://68.media.tumblr.com/2d26deadd76f04302ad84d6ae7885e75/tumblr_niucuosE561tk1lrvo1_1280.jpg",
                    description: "Rich in heavy atoms a very small stage in a vast cosmic arena cosmic ocean radio telescope made in the interiors of collapsing stars billions upon billions dispassionate extraterrestrial observer? Consciousness? Venture tesseract vanquish the impossible! Billions upon billions Apollonius of Perga Orion's sword! A billion trillion? Another world from which we spring Jean-FranÃƒÂ§ois Champollion, Drake Equation. Culture shores of the cosmic ocean. Explorations Drake Equation how far away of brilliant syntheses realm of the galaxies encyclopaedia galactica, radio telescope hydrogen atoms cosmos as a patch of light!"
                },
                {
                    name: "Shenandoah National Park",
                    price: "9.00",
                    image: "http://68.media.tumblr.com/3acb06f3568c9139d6c0537693536752/tumblr_ndtbfuN2rY1tk1lrvo1_1280.jpg",
                    description: "Tunguska event the ash of stellar alchemy descended from astronomers Tunguska event, inconspicuous motes of rock and gas a billion trillion hearts of the stars, globular star cluster culture venture, the only home we've ever known. Cosmic fugue shores of the cosmic ocean tesseract extraordinary claims require extraordinary evidence! White dwarf? Light years, citizens of distant epochs! Extraordinary claims require extraordinary evidence. Galaxies intelligent beings quasar the carbon in our apple pies quasar Drake Equation?"
                }
                
            ]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){    //the empty {} means it will remove all
        if(err){
            console.log(err);
        }else{
            console.log("Removed Campgrounds and seeded");
            //add seed campgrounds after removing all campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added Campground");
                        //create a seed comment for each campground
                        Comment.create(
                            {
                                text: "Great place, no wifi, no toilets!",
                                author: "Corey Jenkins"
                            }, function(err, comment){
                                if(err){
                                  console.log(err);  
                                }else{
                                campground.comments.push(comment)
                                campground.save();
                                console.log("Created comment")
                                }
                            });
                    }
                });
            });
        }
    }); //End remove Campground

}
module.exports = seedDB;