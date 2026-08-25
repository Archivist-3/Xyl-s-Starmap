# Xyl's starmap documentation

A quick overview of how to operate this silly plugin.

---

| Modifier | Description |
| --- | --- |
| `Starmap` | [How to create a new starmap](DOCUMENTATION.md#Starmap) |
| `Global parameters` | [How to change map-wide parameters](DOCUMENTATION.md#Global-parameters) |
| `Linking` | [How to link any body to a note, header, etc](DOCUMENTATION.md#Linking) |
| `The Star` | [Define link & name for The Star](DOCUMENTATION.md#The-Star) |
| `Asteroid Belts` | [How to create asteroid belts](DOCUMENTATION.md#Asteroid-Belts) |
| `Planets` | [How to create planets](DOCUMENTATION.md#Planets) |
| `Planets: Moons` | [How to add moons to planets](DOCUMENTATION.md#Planets) |
| `Planets: Rings` | [How to add rings to planets](DOCUMENTATION.md#Planets) |

# Starmap
**Format Syntax:**

````
```starmap

# "Code" goes here

```
````

## **Pre-made examples**

Alternatively, there are two commands available for you inside this plugin which have all the useful parameters you may need. 
### "Insert starmap template"
This command will insert a fully fledged, and commented, starmap template into your note. It is useful to corroborate YAML format, since YAML is a #$&$*[ and likes to break whenever you use one too many spaces.

### Instare 'bare-minimum' starmap template (uncommented)
This command will insert a basic system, with only one planet and one belt, uncommented. Recommended for when you already know what you're doing but still want some pre-made format.

---

# Global parameters 

**NONE of these parameters are necessary. Not using them, or leaving them empty just defaults to a predefined value.**

**EXAMPLE**  `height: "400px"`  This will make it so, in horizontal mode, the height is forced to 400px. Note the `" "`, `#` and `px` or its lack-thereof. 

| Parameter | Use | Expected value example |
| --- | --- | --- |
| `vertical` | Flips the map 90° | `True`, `False` |
| `height` | Forces height in Horizontal, width in Vertical | `"400px"` |
| `width` | Does nothing in horizontal, as width is set to 100%, height in Vertical | `"400px"` |
| `borderColor` | Changes the colour of the map's outline | `#FFFFFF` |
| `spaceColor` | Changes the colour of space / the background | `#FFFFFF` |
| `sunColor` | Changes the colour of the Star | `#FFFFFF` |
| `lineColor` | Changes the colour of the line that goes through all the planets in the middle. | `#FFFFFF` |
| `planetColor` | Changes the colour of all the planets | `#FFFFFF` |
| `ringColor` | Changes the colour of all the planetary rings | `#FFFFFF` |
| `moonColor` | Changes the colour of all the Moons | `#FFFFFF` |
| `moonLineColor` | Changes the colour of the line that goes through all the moons of a planet | `#FFFFFF` |
| `labelRot` | Changes the rotation of Labels | `-45` (Recommend 0 for vertical) |
| `orbitColor` | Changes the colour of the planetary orbits | `#FFF1` |

---

# Linking
As you'll see in the next sections, linking applies to every celestial body.

Every body can include a `link:` property. If left undeclared, or empty, the body will default to a link identical to its name.

If you do not declare a link, hovering the body will result in `"Note not created yet."`

Links can be pointers to notes, or note links themselves. They can include codeblocks and headers.


Examples:

`link: "Example Note"`     Clicking this will take you to a note called "Example Note". If the note doesn't exist, clicking will create it.


`link: "[[Example Note]]"`    Clicking this will take you to a note called "Example Note". If the note doesn't exist, clicking will create it.


`link: "[[Example Note#Example Header]]"`    Clicking this will take you to the header "Example Header" inside the note "Example Note" If the header does not exist, it will still create the note, but not the header.


`link: "[[#Example Header]]"`    Clicking this will take you to the header "Example Header" inside the same note as the Starmap. If the header does not exist, clicking will do nothing.


Codeblocks follow the same logic, using [[Example Note#^Example Codeblock]]

## Properties

If you use the insert properties command from **Obsidian** and declare properties, these will be visible when you hover over the celestial body. Of course, this means **no properties can be shown if the link is a header or a codeblock.**

---
# The Star

**You can take these two as part of the global parameters, but since they concern Linking, they get their own section.**

Out in the open, with no indent:

| Parameter | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the star | `"Star name"` |
| `link` | Defines the link for the star. Letting it empty makes the link inherit the star's name. | `"[[Link to note]]"` (check linking section.) |

---
# Asteroid Belts
**Belts are proper bodies, this means they follow indent.**

**Example:**
```
belts:
  - name: "Example Belt"
    link:
    distance: 57
    thickness: 70
    color: "#FFF2"
```

**Please** note the indent. `Belts:` must have indent 0. Immediately afterwards, indent 2 followed by `- name: "Example Belt"`. This will *instance* a belt. You can have as many as you want.


| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the belt. | `"Belt name"` |
| `link` | Defines the link for the belt. Letting it empty makes the link inherit the belt's name. **Note:** Belts are only clickable on their label.| `"[[Link to note]]"` (check linking section.) |
| `distance` | Places the ***outer*** edge of the belt at `distance`% of the map's length. | `50` |
| `thickness` | Defines the thickness of the belt from the its start (`distance`) inwards. | `50` |
| `color` | Defines the colour and alpha of the belt. | `"#FFF1"` |

## Asteroids

Inside the belts, you may decide to create notable objects, such as asteroids.

```
belts:
  - name: "Example Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    
    asteroids:
    - name: "Notable\n Asteroid"
      link:
      size: 10
      angle: -2       #This silly value should probably not exceed ±3.5
      colorOverride: "#FFF22F"
```

In the same indent as the properties, declare `asteroids:` and following similar logic, `-name: "Notable\n Asteroid` will instance an asteroid.  You can have as many as you want. But don't be greedy!

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the belt. | `"Belt name"` |
| `link` | Defines the link for the asteroid. Letting it empty makes the link inherit the asteroid's name. | `"[[Link to note]]"` (check linking section.) |
| `size` | Defines the size of the asteroid. | `10` |
| `angle` | Defines the angle at which the asteroid is placed, dead middle in the belt. **Note:** This value should not exceed 3.5, or a bit more depending on your width. | `2` |
| `colorOverride` | Overrides the global colour for asteroids, changing it only in this instance. | `"#FFFFFF"` |

---

# Planets 

In the same indent as the global parameters, declare `planets:` and following similar logic, `-name: "Example Planet` will instance a planet.  You can have as many as you want. Be greedy!

```
planets:
  - name: "Example Planet"
    link:
    distance: 17
    size: 12
    colorOverride:
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the planet. | `"Planet name"` |
| `distance` | Places the ***centre*** of the planet at `distance`% of the map's length. | `50` |
| `link` | Defines the link for the planet. Letting it empty makes the link inherit the planet's name. | `"[[Link to note]]"` (check linking section.) |
| `size` | Defines the size of the planet. | `10` |
| `colorOverride` | Overrides the global colour for planets, changing it only in this instance. | `"#FFFFFF"` |

---

# Planets: Moons

In the same indent as the planet properties, declare `moons:` and following similar logic, `-name: "Example Lua` will instance a moon.  You can have as many as you want. But there's only one Lua!

```
planets:
  - name: "Planet\n with Moons"
    distance: 37
    size: 20
    moons:
      - name: Example Lua
        link:
        size: 4
      - name: Lua the Second
        size: 
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the moon. | `"moon name"` |
| `link` | Defines the link for the moon. Letting it empty makes the link inherit the moon's name. | `"[[Link to note]]"` (check linking section.) |
| `size` | Defines the size of the moon. | `5` |
| `colorOverride` | Overrides the global colour for moons, changing it only in this instance. | `"#FFFFFF"` |

---

# Planets: Rings

In the same indent as the planet properties, declare `rings:`. Rings have no names.  You can only have one. No space for greed!

```
planets:
  - name: John Planet
    distance: 44
    size: 18
    rings:
      xRot: -60
      zRot: 90
      size: 10
      thickness: 2
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `xRot` | Defines the X rotation of the rings. | `45`, `-45` |
| `zRot` | Defines the X rotation of the rings. | `45`, `-45` |
| `size` | Defines the distance of the rings **outer** edge. | `50` |
| `thickness` | Defines how thick the rings are inwards. | `20` |


Of course, you can have both rings and moons.

```
planets:
  - name: John Planet
    distance: 44
    size: 18
    rings:
      xRot: -60
      zRot: 90
      size: 10
      thickness: 2
    moons:
      - name: "testmoon"
        size: 3
```



