//makewad js
//skye lyn waddell 2024

var textures = []; // controls the file uploaded from the texture dir
var palette = [];
var outputwad = [];

//Load event listeners when the document is ready
$(document).ready(function () {

    //Get the files from the texture uploader
    document.getElementById("textures").addEventListener('change', function(event) {
        textures = event.target.files;
    })

    //Get the palette
    document.getElementById("palette").addEventListener('change', function(event) {
        palette = event.target.files;
    })

    //Get the outputwad
    document.getElementById("wad").addEventListener('change', function(event) {
        outputwad = event.target.files;
    })
});

//Onclick Make Wad Button
function MakeWAD(){

   for (i in textures){
    console.log(textures[i])
   }
   for (i in palette){
    console.log(palette[i])
   }
   for (i in outputwad){
    console.log(outputwad[i])
   }

}

//Wad Header
function WADHeader(){
    var header = "typedef struct \n" + 
                 "{ u_char magic[4]; \n" + // "WAD2", Name of the new WAD format
                 "  long numentries; \n" + // Number of entries
                 "  long diroffset; \n" +  // Position of WAD directory in file
                 "} wadhead_t; \n";
    return header; 
}

//Wad Directory
function WADDirectory(){
    var waddirectory =  "struct QKHEADER \n" +
                        "{ long offset; \n" +   // Position of the entry in WAD
                        "  long dsize; \n" +    // Size of the entry in WAD file
                        "  long size; \n" +     // Size of the entry in memory
                        "  char type; \n" +     // type of entry
                        "  char cmprs; \n" +    // Compression. 0 if none.
                        "  short dummy; \n" +   // Not used
                        "  char name[16]; \n" + // 1 to 16 characters, '\0'-padded
                        "} wadentry_t; \n";

    return waddirectory;
}