# Xyl's starmap documentation

A quick overview of how to operate this silly plugin.

---

| Modifier | Description |
| --- | --- |
| `Starmap` | [How to create a new starmap](#Starmap) |
| `PlanetView` | [How to create a PlanetView](#PlanetView) |
| `Global parameters` | [How to change map-wide parameters](#Global-parameters) |
| `Linking` | [How to link any body to a note, header, etc.](#Linking) |
| `The Star` | [Define the name and link for the Starmap's star](#The-Star) |
| `Asteroid Belts` | [How to create asteroid belts](#Asteroid-Belts) |
| `Planets` | [How to create planets](#Planets) |
| `Planets: Moons` | [How to add moons to Starmap planets](#Planets-Moons) |
| `Planets: Rings` | [How to add rings to Starmap planets](#Planets-Rings) |
| `PlanetView: Stars` | [How to add one or more stars to a PlanetView](#PlanetView-Stars) |
| `PlanetView: Imported planets` | [How to use a PNG from your vault](#PlanetView-Imported-planets) |
| `PlanetView: Points` | [How to add clickable interest points](#PlanetView-Points) |
| `PlanetView: Moons` | [How to add moons around a PlanetView planet](#PlanetView-Moons) |
| `PlanetView: Rings` | [How to add rings around a PlanetView planet](#PlanetView-Rings) |
| `PlanetView: Interactivity` | [Tooltips, links, and hover animations](#PlanetView-Interactivity) |

---

# Starmap

**Format syntax:**

````
```starmap
# "Code" goes here
```
````

## **Pre-made examples**

There are two commands available inside the plugin which have most of the useful parameters already laid out.

### "Insert starmap template"

This command inserts a fully fledged, commented Starmap template into your note. It is useful for corroborating YAML formatting, since YAML is a #$&$* and likes to break whenever you use one too many spaces.

### "Insert 'bare-minimum' starmap template (uncommented)"

This command inserts a basic system with one planet and one belt, without the explanations. Recommended when you already know what you're doing but still want a pre-made format.

---

# Global parameters

**None of these parameters are necessary.** Leaving a supported parameter out, or leaving it empty, generally selects its predefined default.

**Example:** `height: "400px"` forces the height to 400 px in horizontal mode. Note the quotes, `#`, and `px` (or lack thereof). YAML is picky about these things. Colour values are safest inside quotes.

These parameters apply to the `starmap` block. PlanetView has its own parameter list further below.

| Parameter | Use | Expected value example |
| --- | --- | --- |
| `vertical` | Rotates the Starmap 90°. | `true`, `false` |
| `height` | Sets the height in horizontal mode; it becomes the wrapper's width in vertical mode. | `"400px"` |
| `width` | Not used to set the horizontal-mode width, which fills the available line. In vertical mode, it sets the wrapper's height. | `"400px"` |
| `borderColor` | Changes the colour of the map outline. | `"#FFFFFF"` |
| `spaceColor` | Changes the colour of space / the background. | `"#000000"` |
| `sunColor` | Changes the colour of the main star. | `"#FFFFFF"` |
| `lineColor` | Changes the colour of the line running through the middle of the map. | `"#FFFFFF"` |
| `planetColor` | Changes the default colour of all planets. | `"#FFFFFF"` |
| `ringColor` | Changes the default colour of planetary rings. | `"#FFFFFF"` |
| `moonColor` | Changes the default colour of moons. | `"#FFFFFF"` |
| `moonLineColor` | Changes the colour of the line running through each planet's moon list. | `"#FFFFFF"` |
| `labelColor` | Changes the colour of star labels. Planet, moon, and asteroid labels use their own rules described below; planetary labels do not all inherit this in the current implementation. | `"#FFFFFF"` |
| `labelRot` | Rotates planet labels. | `-45` |
| `orbitColor` | Changes the default colour of planetary orbits. | `"#FFF1"` |

Individual bodies can override several global colours using `colorOverride`. Belts have their own `color` property.

**Note:** `moonLabelRot` and `labelOffset` appeared in older documentation/examples, but the current Starmap processor does not read them as parameters. Moon-list label rotation is currently selected by the `vertical` setting.

---

# Linking

As you'll see in the next sections, linking applies to every celestial body that has interactivity attached to it.

Every body can include a `link:` property. If it is omitted or left null (for example, `link:` with nothing after the colon), the body generally defaults to a link identical to its name. An explicitly empty string, `link: ""`, is not identical to an omitted/null value in every part of the plugin, so prefer omitting the property or leaving it blank in YAML.

If the resulting target note does not exist, hovering the body can show `"Note not created yet."`. Clicking the body opens the link target, creating the note if Obsidian supports that for the link.

Links can point to notes or to sections inside notes. They can include headers and block references.

Examples:

`link: "Example Note"` — Opens a note called `Example Note`.

`link: "[[Example Note]]"` — Also opens a note called `Example Note`.

`link: "[[Example Note#Example Header]]"` — Opens `Example Header` inside `Example Note`. If the header does not exist, the note can still open, but the header will not be created automatically.

`link: "[[#Example Header]]"` — Opens `Example Header` inside the same note as the map. If the header does not exist, the link may have nowhere to go.

Block references follow the same logic, for example `"[[Example Note#^ExampleCodeblock]]"`.

PlanetView removes the outer `[[...]]` wrapper before navigating and uses the target before `|` for aliases. For example, `"[[Example Note|Friendly label]]"` opens `Example Note`, not a note literally named `Friendly label`. The `starmap` processor has its own separate link-handling implementation.

## Properties

If you use Obsidian's Properties feature to add frontmatter to a linked note, those properties can appear in the hover tooltip. Properties are not shown for a header or block reference to the current note, and they cannot be shown for a note that does not yet exist.

---

# The Star

These parameters are at the top level of a `starmap` block, without indentation. They define the main star.

| Parameter | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the star's name. | `"Star name"` |
| `link` | Defines the star's link. If omitted or null, the name is used as the link target. | `"[[Link to note]]"` |

The main Starmap star's size is currently fixed in the processor. The top-level `sunColor` changes its colour; the individual `sunSize`, `sunGlowRadius`, and `sunGlowSpread` settings belong to stars in **PlanetView**, not to this Starmap star.

---

# Asteroid Belts

**Belts are proper bodies; this means they follow indent.**

**Example:**

```yaml
belts:
  - name: "Example Belt"
    link:
    distance: 57
    thickness: 70
    color: "#FFF2"
```

Please note the indent. `belts:` must have indent 0. Immediately afterwards, indent 2 followed by `- name: "Example Belt"`. This instances a belt. You can have as many as you want.

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the name for the belt. | `"Belt name"` |
| `link` | Defines the link for the belt. If omitted or null, the belt name is used. Belts are clickable on their label, not along the entire ring. | `"[[Link to note]]"` |
| `distance` | Sets the belt's distance from the star as a percentage of the map's length. | `50` |
| `thickness` | Defines the thickness of the belt, extending inward from its outer edge. | `50` |
| `color` | Defines the belt's colour, including alpha when supplied in an 8-digit hex value. | `"#FFFFFF22"` |

## Asteroids

Inside belts, you may create notable objects such as asteroids.

```yaml
belts:
  - name: "Example Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    asteroids:
      - name: "Notable Asteroid"
        link:
        size: 10
        angle: -2
        colorOverride: "#FFF22F"
```

Under the belt's properties, declare `asteroids:` and add one `- name:` entry per asteroid. You can have as many as you want. But don't be greedy!

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the asteroid's name. | `"Asteroid name"` |
| `link` | Defines the asteroid's link. If omitted or null, the asteroid's name is used. | `"[[Link to note]]"` |
| `size` | Defines the asteroid's diameter in pixels. | `10` |
| `angle` | Places the asteroid around the belt's circumference, in degrees. The example values are intended to be small offsets; stay roughly within ±3.5 for the current layout. | `2` |
| `colorOverride` | Overrides the default asteroid colour for this instance. | `"#FFFFFF"` |

---

# Planets

At the same indentation as the global parameters, declare `planets:`. Each `- name:` entry instances a planet. You can have as many as you want. Be greedy!

```yaml
planets:
  - name: "Example Planet"
    link:
    distance: 17
    size: 12
    colorOverride: "#FFFFFF"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the planet's name. | `"Planet name"` |
| `distance` | Places the centre of the planet at this percentage of the map width from the left edge. | `50` |
| `link` | Defines the link for the planet. If omitted or null, the planet's name is used. | `"[[Link to note]]"` |
| `size` | Defines the planet's diameter in pixels. | `20` |
| `colorOverride` | Overrides the global planet colour for this instance. | `"#FFFFFF"` |
| `rings` | Adds one ring configuration to this planet. It is an object, not a list, and belongs at the same indentation level as `size` and `moons`. | See [Planets: Rings](#Planets-Rings) |
| `moons` | Adds one or more moons to this planet. | See [Planets: Moons](#Planets-Moons) |

`labelOffset` is not currently read by the Starmap processor, despite appearing in older documentation. Use the available label and ring placement settings instead.

---

# Planets: Moons

At the same indentation as the planet's other properties, declare `moons:`. Each `- name:` entry instances a moon. You can have as many as you want. But there's only one Lua!

```yaml
planets:
  - name: "Planet with Moons"
    distance: 37
    size: 20
    moons:
      - name: "Example Lua"
        link:
        size: 4
      - name: "Lua the Second"
        size: 6
        colorOverride: "#FFFFFF"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the moon's name. | `"Moon name"` |
| `link` | Defines the moon's link. If omitted or null, the moon's name is used. | `"[[Link to note]]"` |
| `size` | Defines the moon's diameter in pixels. | `5` |
| `colorOverride` | Overrides the global moon colour for this instance. | `"#FFFFFF"` |

---

# Planets: Rings

At the same indentation as the planet's other properties, declare `rings:`. Starmap planets support one ring configuration each. No space for greed!

```yaml
planets:
  - name: "John Planet"
    distance: 44
    size: 18
    rings:
      xRot: -60
      zRot: 90
      size: 10
      thickness: 2
      colorOverride: "#FFFFFF"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `xRot` | Defines the X rotation of the ring. | `45`, `-45` |
| `zRot` | Defines the Z rotation of the ring. | `45`, `-45` |
| `size` | Adds to the planet's diameter to determine the ring element's diameter before its border is added. | `50` |
| `thickness` | Defines the thickness of the ring, extending outward from its path in the current CSS box model. | `20` |
| `colorOverride` | Overrides the global ring colour for this instance. | `"#FFFFFF"` |

Of course, you can have both rings and moons.

```yaml
planets:
  - name: "John Planet"
    distance: 44
    size: 18
    rings:
      xRot: -60
      zRot: 90
      size: 10
      thickness: 2
    moons:
      - name: "Test Moon"
        size: 3
```

---

# PlanetView

PlanetView is a separate processor for a close-up planet diagram. Unlike `starmap`, it supports several individually configured stars, a main planet, PNG images from the vault, interest points, multiple moons, and multiple rings.

**Format syntax:**

````
```planetview
# "Code" goes here
```
````

The plugin provides **"Insert planetview template"** and **"Insert 'bare-minimum' planetview starmap template"** commands. The first includes comments and examples; the second provides a smaller starting point.

## PlanetView global parameters

These properties belong at the top level of the `planetview` block, without indentation.

| Parameter | Use | Expected value example |
| --- | --- | --- |
| `position` | Floats the map to the left or right of the note so surrounding text wraps around it. Any value other than `"left"` defaults to the right. | `"left"`, `"right"` |
| `height` | Sets the map's height. | `"500px"` |
| `width` | Sets the map's width. The processor rotates the map container 90°, so the wrapper swaps width and height to fit the rotated result. | `"500px"` |
| `borderColor` | Changes the map outline and tooltip border. | `"#FFFFFF"` |
| `spaceColor` | Changes the space/background colour. | `"#000000"` |
| `orbitColor` | Sets the default colour of moon orbits. | `"#FFF1"` |
| `labelColor` | Sets the colour of the main planet label, star labels, and moon labels. | `"#FFFFFF"` |
| `labelRot` | Sets the default rotation for star labels and moon labels. The processor accounts for the map's 90° rotation. | `-45` |
| `planetColor` | Sets the main planet's fill colour. Use `"transparent"` for an invisible fill. | `"#3478A8"`, `"transparent"` |
| `planetSize` | Sets the main planet's diameter in pixels. | `"300"` |
| `planetX` | Numeric adjustment to the main planet's centering transform. In the current implementation, it modifies the CSS percentage translation relative to the planet element's own width, not the map width. Leave at `0` for a centred planet. | `0` |
| `planetY` | Numeric adjustment to the main planet's centering transform. In the current implementation, it modifies the CSS percentage translation relative to the planet element's own height, not the map height. Leave at `0` for a centred planet. | `0` |
| `labelPos` | Selects the main planet label's corner-style placement. Accepted values are `"TOP LEFT"`, `"TOP RIGHT"`, `"BOTTOM LEFT"`, and `"BOTTOM RIGHT"`. | `"BOTTOM RIGHT"` |
| `stars` | Adds individually configured stars. | See [PlanetView: Stars](#PlanetView-Stars) |
| `importPlanet` | Loads an image from the vault to display over the main planet. | `"[[Images/Planet.png]]"` |
| `importPlanetSize` | Sets the imported image's width and height in pixels. Defaults to `planetSize`, then `100` if neither is provided. The result is clamped to at least `1` pixel and is not capped to the planet's diameter. | `"300"` |
| `importPlanetRot` | Rotates the imported image in degrees. Defaults to `0` if omitted or invalid. | `"5"` |
| `points` | Adds interest points on the map. | See [PlanetView: Points](#PlanetView-Points) |
| `moons` | Adds moons and their orbital rings around the main planet. | See [PlanetView: Moons](#PlanetView-Moons) |
| `rings` | Adds one or more rings around the main planet. | See [PlanetView: Rings](#PlanetView-Rings) |

Colours should generally be quoted, especially hex values. CSS colour names such as `transparent` are also accepted where the corresponding property is used as a CSS colour.

## PlanetView: Stars

Unlike Starmap, PlanetView uses a `stars:` list. Each star's properties belong underneath its own `- name:` entry. You can add as many stars as you want.

```yaml
stars:
  - name: "Star Example"
    link: "[[Star_Example]]"
    sunSize: "7"
    sunGlowRadius: "3"
    sunGlowSpread: "1.5"
    sunColor: "#FFE3A3"
    accretionColor: "#FFFFFF"
    sunRot: "45"
    sunX: "8%"
    sunY: "91%"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the star's label and, if no link is supplied, its link target. | `"Star Example"` |
| `link` | Defines the link target. If omitted or empty, the star's name is used. | `"[[Star_Example]]"` |
| `sunSize` | Defines the star's diameter in pixels. | `"7"` |
| `sunGlowRadius` | Scales the star's glow radius by the star's size. | `"3"` |
| `sunGlowSpread` | Scales the star's glow spread by the star's size. | `"1.5"` |
| `sunColor` | Defines the star's fill and normal glow colour. | `"#FFE3A3"` |
| `accretionColor` | Defines the glow/accretion-disc colour used when `sunColor` is exactly `"#000000"`. | `"#FFFFFF"` |
| `sunRot` | Defines the accretion disc's Z rotation for a black star. It does not rotate an ordinary star. | `"45"` |
| `sunX` | Sets the star's horizontal position as a percentage of the map container. | `"8%"` |
| `sunY` | Sets the star's vertical position as a percentage of the map container. | `"91%"` |

When `sunColor` is exactly `"#000000"`, the processor draws an accretion-disc effect using `accretionColor`. If you want the special black-star rendering, use that exact hex value rather than a different spelling or a theme variable.

Star labels use the global `labelColor` and `labelRot` settings.

## PlanetView: Imported planets

You can use a PNG stored in your vault as the main planet's artwork. Other browser-supported image formats can also work, since the processor does not validate the file extension. The image is drawn over the main planet element, allowing you to make the planet's normal fill transparent or keep the fill visible underneath the image.

```yaml
name: "Saturn"
planetColor: "transparent"
planetSize: "300"
importPlanet: "[[Images/Saturn.png]]"
importPlanetSize: "300"
importPlanetRot: "0"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `importPlanet` | Wikilink to a vault image. The processor resolves the target relative to the note containing the code block. | `"[[Images/Saturn.png]]"` |
| `importPlanetSize` | Sets both the rendered width and height of the image, in pixels. Defaults to `planetSize`, then `100` if neither is provided; invalid values fall back to `100`, and the final size is at least `1` pixel. | `"300"` |
| `importPlanetRot` | Rotates the image in degrees. Defaults to `0` if omitted or invalid. | `"0"` |

The image preserves transparent regions in the PNG. It does not intercept mouse events, so pointer events can pass through it to the elements underneath. The image size is independent of `planetSize`: it can be larger or smaller than the planet's fill. The current processor does not attach click navigation directly to the main planet element itself; add interactivity to that element separately if you want the planet's fill or image to open a link.

If the image cannot be resolved, check that the wikilink points to an existing image in the vault. A note refresh may sometimes be needed after adding or changing an image.

## PlanetView: Points

`points:` creates separate interest-point markers on the map. Each point can have its own colour, size, and link. Points use the `leader` tooltip animation by default in the current processor.

```yaml
points:
  - name: "City of Note"
    size: 11
    color: "#BB0000"
    link: "[[City of Note]]"
    X: -200
    Y: -800
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the point's tooltip title and default link target. | `"City of Note"` |
| `size` | Defines the marker's diameter in pixels. Defaults to `11` and is clamped to at least `1` pixel. | `11` |
| `color` | Defines the marker and its accent colour. Defaults to white. | `"#BB0000"` |
| `link` | Defines the link target. If omitted or empty, the point's name is used. | `"[[City of Note]]"` |
| `X` | Modifies the point's CSS horizontal translation. In the current implementation, this value is inserted into `translate()` as a percentage of the point's own width, not as a pixel coordinate or percentage of the map. | `-200` |
| `Y` | Modifies the point's CSS vertical translation. In the current implementation, this value is inserted into `translate()` as a percentage of the point's own height, not as a pixel coordinate or percentage of the map. | `-800` |

**Positioning caveat:** the current `X` and `Y` implementation does not use map-relative coordinates. Large values such as `-800` therefore do not mean 800 pixels or 800% of the map. If you want points to use map-relative coordinates, the processor's positioning calculation needs to be changed as well as documented.

## PlanetView: Moons

`moons:` creates moon dots and their tilted orbital rings around the main planet. Each moon can have its own orbit size, angle, inclination, colour, and label rotation.

```yaml
moons:
  - name: "Moon Example"
    link: "[[Moon Example]]"
    size: 14
    angle: 100
    distance: 800
    zRot: 45
    xRot: -60
    colorOverride: "#FFFFFF"
    orbitColor: "#FFF2"
    thickness: 10
    labelRot: -45
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Defines the moon's label and default link target. | `"Moon Example"` |
| `link` | Defines the link target. If omitted, the moon's name is used. | `"[[Moon Example]]"` |
| `size` | Defines the moon dot's diameter in pixels. Defaults to `6`. | `14` |
| `angle` | Places the moon around its orbit, in degrees. If omitted, moons are spaced evenly by their order in the list. | `100` |
| `distance` | Sets the orbital element's diameter in pixels, not its radius. If omitted, it increases with each moon's index. | `800` |
| `zRot` | Rotates the orbital plane around Z. | `45` |
| `xRot` | Tilts the orbital plane around X. | `-60` |
| `color` | Per-moon dot colour. | `"#FFFFFF"` |
| `orbitColor` | Overrides the global `orbitColor` for this moon's orbital ring. | `"#FFF2"` |
| `thickness` | Sets the orbital ring border thickness in pixels. Defaults to `10`. | `10` |
| `labelRot` | Overrides global `labelRot` for this moon's label. | `-45` |

Moon dots are counter-rotated to remain visually upright and offset slightly along Z to help render them above the orbital ring. Moon labels are rendered outside the 3D-transformed orbit hierarchy to keep the text crisp. The dot and label use the same projected position so they remain aligned.

The moon is placed on the centreline of the visible orbital stroke.

## PlanetView: Rings

PlanetView supports multiple rings around the main planet. Rings are drawn as SVG circles so that hit detection can target the visible stroke rather than the entire circular area.

```yaml
rings:
  - name: "Inner Ring"
    link: "[[Inner Ring]]"
    size: 600
    thickness: 17
    zRot: 45
    xRot: -60
    color: "#CCCF"

  - name: "Outer Ring"
    size: 760
    thickness: 8
    zRot: -20
    xRot: -70
    color: "#DDDDDD"
```

| Property | Use | Expected value example |
| --- | --- | --- |
| `name` | Gives the ring a tooltip title and, if no explicit link is supplied, a link target. Optional for decorative rings. | `"Inner Ring"` |
| `link` | Defines the link target. If omitted, the ring name is used. If both are omitted, the ring has no interactivity. | `"[[Inner Ring]]"` |
| `size` | Defines the ring's outer diameter in pixels. Defaults to `1000`. | `600` |
| `thickness` | Defines the SVG stroke thickness in pixels. Defaults to `20`. The stroke extends inward from the outer-diameter boundary. | `17` |
| `zRot` | Rotates the ring around the Z axis. Defaults to `45`. | `45` |
| `xRot` | Tilts the ring around the X axis. Defaults to `-65`. | `-60` |
| `color` | Defines the ring stroke and glow colour. Defaults to white. | `"#CCCF"` |

The SVG sets its pointer-event target to the visible stroke, so the transparent interior is not intended to be clickable. Rings support click navigation and hover tooltips directly through SVG event listeners, but do not receive the expanding ring animation. The stroke also has a glow filter; depending on the renderer, that filter may produce a faint seam in Reading Mode.

## PlanetView: Interactivity

Clickable bodies open their configured link when clicked. PlanetView removes the outer wikilink brackets before navigation, supports `[[Note|Alias]]` by navigating to `Note`, and preserves header or block-reference suffixes. Hovering displays a tooltip headed with the body's configured `name`, plus available frontmatter properties from the linked note. If the target note does not exist yet, the tooltip says so. The tooltip omits the target note's `position` property.

The processor currently uses these hover behaviours:

- **Stars and moons:** the expanding ring animation is enabled.
- **Interest points:** the leader-line animation is enabled. It draws a diagonal line down from the pointer, then a horizontal segment; the tooltip appears below it. The arrangement follows the pointer while it remains over the point and mirrors its horizontal direction depending on which side of the map contains the point.
- **Planet rings:** only the SVG stroke is intended to receive pointer events, with no expanding ring animation.

The helper supports animation modes named `none`, `ring`, and `leader`, but the current calls select them internally. They are not frontmatter properties. PlanetView removes its own stale tooltips when a block re-renders; this cleanup does not target the `starmap` tooltip class.

---