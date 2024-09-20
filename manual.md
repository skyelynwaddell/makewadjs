## 7. The WAD2 files
The WAD2 format is only used for the graphic .WAD, that stores general information like the palette and the status bar items.

It is believed that this format was the original distribution file intended for Quake, but since then id Software probably realised they needed a file format that allowed a more direct mapping of their development directories, so they chose the PACK format instead.

## 7.1 The format of WAD2 files
The structure of the WAD2 files is almost exactly the same as that of DOOM's PWAD and IWAD files. Only the size of the directory entries is a bit different.

## 7.1.1 The WAD2 file header
```c
typedef struct
{ u_char magic[4];             // "WAD2", Name of the new WAD format
  long numentries;             // Number of entries
  long diroffset;              // Position of WAD directory in file
} wadhead_t;
```

## 7.1.2 The WAD directory
The entries in the WAD2 directory are a bit bigger than in PWAD and IWAD:
```c
typedef struct
{ long offset;                 // Position of the entry in WAD
  long dsize;                  // Size of the entry in WAD file
  long size;                   // Size of the entry in memory
  char type;                   // type of entry
  char cmprs;                  // Compression. 0 if none.
  short dummy;                 // Not used
  char name[16];               // 1 to 16 characters, '\0'-padded
} wadentry_t;
```

At offset diroffset in file, you will find the WAD directory itself:
```c
wadentry_t dir[numentries];        // like in DOOM
```
This directory then contains pointers to all the entries in the WAD2 file, and like with PACK file there can be large amounts of unused data, if one is not careful enough when building WAD2 files.

## 7.1.3 Determining the type of directory entries
The field type in the directory identifies the entry. It's a single byte, which give 256 possibilities. Only 3 are currently used.
```c
0x40=	'@'=	Color Palette
0x42=	'B'=	Pictures for status bar
0x44=	'D'=	Used to be Mip Texture
0x45=	'E'=	Console picture (flat)
```

## 7.2 Format of status bar pictures
The pictures will probably used for everything concerning the status bar (animations, numbers, ...). They are not used for sprites, countrary to DOOM.

These files are just like DOOM flats, but with a header to indicate width and height.
```c
typedef struct
{ long width;                  // Picture width
  long height;                 // Picture height
  u_char Pixels[height][width]
} pichead_t;
```

## 7.3 Format of console lumps
The console lumps are just flat pictures, similar to DOOM flats, without any formatting, and using one byte per pixel. The color palette is that of the PALETTE lump.

The console background:
```c
char  Screen [200][320];       //This means it's a 320x200 array
The console characters:
char  CChars [128][128];       //This means it's a 128x128 array
```

## 7.4 Format of Palettes
All the pictures, textures, sprites and Alias model skins use color indexes in a 256-color table, and it can be expected that only a limited set of color palettes will be used. Maybe just one. At least, it's pretty sure that there is only one color palette for all the textures.

This format is Exactly the same as in DOOM:
```c
struct RGB {char R; char G; char B;} Palette[256];
```
Internally, the color palette is translated into a much bigger structure, that takes into account the light level, just like in DOOM. This structure depends on the number of colors available on the display, so it might be calculated by the engine at startup.

https://www.gamers.org/dEngine/quake/spec/quake-spec34/qkspec_7.htm