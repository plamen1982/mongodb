var MongoClient = require('mongodb').MongoClient;  // Create MongoClient

var dbUrl = 'mongodb://localhost:27017/photosharing';   // string with the URL of our database

function removeOrphanedImages() {					
    console.log("removeOrphanedImages");  //I DON'T KNOW
var collNameImg = "images",				//STRING FOR CURSOR COLL(WHICH I DON'T KNOW WHAT IT MEANS)
    rmvd = [],	
    imageIds = [],
    collImg,
    cursorImg,
    pauseTime,
    iid,
    collNameAlbums,
    allImgById,
    collAlbums;
    		//I DON'T KNOW
    MongoClient.connect(dbUrl, function(err, db) { // CONNECT TO OUR DATA BASE
        if (err) throw err;           				// IF ERR THROW ERR
         collImg = db.collection(collNameImg);			// STRING FOR THE COLLECTION IMAGES
         cursorImg = collImg.find({});					// CURSORImg FOR THE IMAGES COLcollImgLECTION
							                             //I DON'T KNOW
        // http://mongodb.github.io/node-mongodb-native/api-generated/db.html#id1
        db.on("close",function() {      //I DON'T KNOW
           console.log("db.on close HERE"); // MESSAGE TO THE CONSOLE
        });
        cursorImg.each(function(err, doc) {  // CALLING THE COLLECTION IMAGES
            if (err) throw err;  			
                
            if (doc === null) {    
                var pauseTime = 5000;  // OBVIOUSLY 20S TIME FOR PAUSING
             console.log("Pausing time " + pauseTime + "ms");
                setTimeout(function() {   
                    console.log("Just about to close database...");
                    //db.close();
                    console.log("Database closed!");
                }, pauseTime);
                db.close();
            } else {
                 iid = doc._id;
                 collNameAlbums = "albums";
                 imgById = {
                    "images" : iid
                };
              collAlbums = db.collection(collNameAlbums);

                collAlbums.find(imgById).toArray(function(err, items) { // items = all documents with the current id
                    if (items) {
                        if (items.length === 0) {
                             console.log("Remove im`age with id="+iid);
                            rmvd.push(iid);
                             console.log("Remove image with id="+iid);
                            collImg.remove({
                                _id : iid
                            }, {
                                w : 1
                            }, function(err, cnt) {
                                if (err) throw err;
                                console.log(cnt);
                            });
                        }
                    }

                });
                
            }

        });
    });

}






removeOrphanedImages();
/* db.images.findOne()
{
        "_id" : 55,
        "height" : 480,
        "width" : 640,
        "tags" : [
                "dogs",
                "sunrises",
                "kittens",
                "vacation"
        ]
}

> db.albums.findOne()
{
        "_id" : 0,
        "images" : [
                2433,
                2753,
                2983,
                6510,
                11375,
                12974,
                15344,
                16952,

        ]
}
*/