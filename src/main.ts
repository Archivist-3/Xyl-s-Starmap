import { Plugin, parseYaml, Editor, MarkdownView, TFile } from 'obsidian';
interface StarMapData {
	name?: string;
	link?: string;
	height?: string;
	width?: string;
	sunColor?: string;
	binaryColor?: string;
	trinaryColor?: string;
	borderColor?: string;
	spaceColor?: string;
	planetColor?: string;
	moonColor?: string;
	lineColor?: string;
	moonLineColor?: string;
	ringColor?: string;
	orbitColor?: string;
	labelRot?: number;
	vertical?: boolean;
	belts?: BeltData[];
	planets?: PlanetData[];
}

interface PlanetViewData {
	position?: string;
	name?: string;
	planetSize?: string;
	planetX?: string;
	planetY?: string;
	height?: string;
	width?: string;
	stars?: StarData[];
	borderColor?: string;
	spaceColor?: string;
	planetColor?: string;
	orbitColor?: string;
	labelRot?: number;
	moonColor?: string;
	moonLineColor?: string;
	moons?: MoonData[];
	rings?: RingData[];
	points?: PointsData[];
	accretionColor?: string;
	labelPos?: string;
	labelColor?: string;
	importPlanet?: string;
	importPlanetSize?: string;
	importPlanetRot?: string;
}

interface StarData {
	sunSize?: string;
	name?: string;
	link?: string;
	sunGlowRadius?: string;
	sunGlowSpread?: string;
	sunX?: string;
	sunY?: string;
	sunRot?: string;
	sunColor?: string;
}

interface PointsData {
	name?: string;
	size?: string;
    color?: string;
    link?: string;
    X?: number; 
    Y?: number; 
}

interface BeltData {
	name: string;
	distance: number;
	link?: string;
	thickness?: number;
	color?: string;
	asteroids?: AsteroidData[];
}

interface AsteroidData {
	name: string;
	colorOverride?: string;
	link?: string;
	size?: number;
	angle?: number;
}

interface PlanetData {
	name: string;
	distance: number;
	size: number;
	colorOverride?: string;
	link?: string;
	rings?: RingData;
	moons?: MoonData[];
}

interface RingData {
	colorOverride?: string;
	size?: number;
	thickness?: number;
	xRot?: number;
	zRot?: number;
	//These values only apply for PlanetView
	link?: string;
	name?: string;
	color?: string;
}

interface MoonData {
	name: string;
	colorOverride?: string;
	size?: number;
	link?: string;
}

export default class StarMapPlugin extends Plugin {

	async onload() {
		this.addCommand({
					id: 'insert-starmap-template',
					name: 'Insert starmap template',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						const template = `\`\`\`starmap
#This is a fully customisable starmap, using YAML formatting.

#===========================================================#
#== PLANETVIEWS ARE LIVE, CHECK THEM ON THE COMMAND LIST! ==#
#===========================================================#

#============== Section 1: Global parametres ===============#
# === Colours and px should be inside "  "     === #
# === If any of these values is missing, there's a default!
# === Width will always match your page width. === #
# If you want proper documentation, head over to "https://github.com/Archivist-3/Xyl-s-Starmap/blob/main/DOCUMENTATION.md"
vertical: false     #Turn this to true, or 1
height: "400px" 
width:
borderColor: 
spaceColor: 
sunColor: 
lineColor: "#FFFFFF"
planetColor: 
				#Planet, rings and moons may have their individual colours overriden via
				#size: 23
				#colorOverride: "#FFFFFF"    <--------- Add this line at any point of their block
				#distnace: 11
ringColor: "#FFFFFF"
moonColor:
moonLineColor: "#FFFFFF"
labelRot: -45   #Angles should probably be negative!
orbitColor: "#FFF1"


#YAML is very capricious, the format must be exactly as shown. There is no other way. Maybe death.


#=================  Section 2: The Star(s) ==================#
name: Xyl's Star
link:      

binaryColor:     # <-- Leave these null to have single star systems
trinaryColor: 

#Be aware! If links are left empty, this will create an empty link.


#==============   Section 3: Asteroid belts   ===============#

belts:
  - name: "Asteroid\\n Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    
    asteroids:
    - name: "Notable\\n Asteroid"
      size: 10
      angle: -2       #This silly value should probably not exceed ±3.5
      
  - name: "Outer\\n Belt"
    distance: 94
    thickness: 20
    color: "#FFF6" 


#==============   Section 4: Planets & shi'  ===============#
planets:
  - name: Probably Mercury
    distance: 17
    size: 12
    
  - name: Planet with Moon
    distance: 28    #Distances are percentual.
				    #25 means at 25% from the origin to the end.
				    #CTRL/CMD + E to check on full width.
				    
    size: 25        #Size is in pixels.
    
    moons:          #Moons are just as easy.
      - name: Lua
        link: Author's Lua
        size: 5
        
  - name: John Planet
    distance: 44
    size: 18
    rings:
      xRot: -60
      zRot: 90
      size: 10
      thickness: 2

  - name: Rocky the Planet
    distance: 37
    size: 20
    moons:
      - name: Fear
        size: 4
      - name: Dread
        size:
        
  - name: Author Gas Giant
    distance: 64.5
    size: 100
    link: "Xyl Gas Giant"  #Link doesn't need to have the same name!
						   #Links can be "[[note#header]]", "note#header", "[[note]]"...
						   #And if you want to link to the same note, simply "#header" works!
						   #NOTE that link->header inside the same note will not have properties.
						   #(This is to avoid inheriting note-wide properties)

					       #Rings go before moons!!   
    rings:                 #Rings have 2 rotation values, play with them!
      xRot: -75
      zRot: -80
      size: 100      #Size determinates where the middle of the ring is drawn.
      thickness: 20  #Thickness determinates how much ring there is.
				     #Size + (2 * thickness) should be greater than planet size!!
				     
    moons:           #You can *just* add moons afterwards.
      - name: Calisto
        size: 16
      - name: Io
        size: 8
      - name: Legally Distinct Europa
        size: 10
        
        
  - name: Not™ Pluto™
    distance: 96
    size: 10
    
  - name: Zeus
    distance: 77
    size: 80

  - name: Roma
    distance: 88
    size: 65
    rings:
      xRot: 80
      zRot: 80
      size: 50
      thickness: 20
\`\`\``;
					editor.replaceSelection(template);
			}
		});

		this.addCommand({
					id: 'insert-starmap-template-bare',
					name: 'Insert \'bare-minimum\' starmap template (uncomented)',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						const template = `\`\`\`starmap
#This is a fully customisable starmap, using YAML formatting.
vertical: false
height: "400px" 
width:
borderColor: 
spaceColor: 
sunColor: 
lineColor: "#FFFFFF"
planetColor:
ringColor: "#FFFFFF"
moonColor:
moonLineColor: "#FFFFFF"
labelRot: -45
orbitColor: "#FFF1"


#==================  Section 2: The Star  ===================#
name: Star
link:      


#==============   Section 3: Asteroid belts   ===============#

belts:
  - name: "Asteroid\\n Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    
    asteroids:
    - name: "Notable\\n Asteroid"
      size: 10
      angle: -2


#==============   Section 4: Planets & shi'  ===============#
planets:
  - name: Gas Giant
    distance: 64.5
    size: 100
    link:
 
    rings:
      xRot: -75
      zRot: -80
      size: 100
      thickness: 20
				     
    moons:
      - name: Moon
        size: 16
\`\`\``;
					editor.replaceSelection(template);
			}
		});

		this.registerMarkdownCodeBlockProcessor("starmap"   , (source, el, ctx) => {
			let data: StarMapData;
			try {
				data = parseYaml(source) as StarMapData;
			} catch (_) {
				el.createEl("div", { text: "Error parsing Star Map data. YAML formatting is very capricious, check it.", cls: "has-error" });
				return;
			}

			const height = data.height ?? "400px";
			const width = data.width ?? "850px";
			const sunColor = data.sunColor ?? "var(--interactive-accent)";
			const borderColor = data.borderColor ?? "var(--interactive-accent)";
			const spaceColor = data.spaceColor ?? "#000000";
			const planetColor = data.planetColor ?? "var(--interactive-accent)";
			const moonColor = data.moonColor ?? "var(--interactive-accent)";
			const lineColor = data.lineColor ?? "var(--text-normal)";
			const moonLineColor = data.moonLineColor ?? "var(--text-normal)";
			const ringColor = data.ringColor ?? "var(--text-normal)";
			let labelRot = data.labelRot ?? 0;
			const orbitColor = data.orbitColor ?? "#FFF1";
			const isVertical = data.vertical ?? false;

			const attachInteractivity = (element: HTMLElement, link: string, name: string, accentColor: string, size: number, ringSelect = false) => {
				if (!link) return;

				element.setCssStyles({ cursor: "pointer" });
				const safeSize = size || 4;

				let activeTooltip: HTMLElement | null = null;

				// Click Event
				element.addEventListener("click", () => {
					void this.app.workspace.openLinkText(link, ctx.sourcePath, false);
					if (activeTooltip) {
						activeTooltip.remove();
						activeTooltip = null;
					}
				});
				
				if(ringSelect){
					//The actual animation
					let animatedRingEl: HTMLElement | null = null;
					
					element.addEventListener("mouseenter", () => {
						const ringThickness = ((5/50)*safeSize+2) * ((-Math.exp(-Math.pow(safeSize / 5, 2))) + 1);
						const finalOpacity = 0.5;

						animatedRingEl = element.createDiv();
						
						animatedRingEl.setCssStyles({
							zIndex: "999999",
							position: "absolute",
							top: "50%",
							left: "50%",
							borderRadius: "50%",
							pointerEvents: "none",
							boxSizing: "border-box",
							outline: `${ringThickness}px solid ${accentColor}`,
							outlineOffset: '10%',
							transform: `translate(-50%, -50%)`,
							opacity: "0",
							transition: "transform 0.4s ease-out, opacity 0.4s ease-out"
						});

						let num = Math.exp(-Math.pow(safeSize / 10, 2));
						const scaleValue = 250 * (5 * num + 1);
						const initialScale = `${scaleValue}%`;
						
						animatedRingEl.setCssStyles({
							width: `${safeSize}px`,
							height: `${safeSize}px`,
							transform: `translate(-50%, -50%) scale(${initialScale})`
						});

						// timeout
						window.setTimeout(() => {
							if (!animatedRingEl) return;
							
							num = Math.exp(-Math.pow(safeSize / 15, 2));
							const finalScale = 125 * (2* num + 1);
							
							animatedRingEl.setCssStyles({
								opacity: String(finalOpacity),
								transform: `translate(-50%, -50%) scale(${finalScale}%)`
							});
						}, 10); 
					});

					element.addEventListener("mouseleave", () => {
						if (animatedRingEl) {
							animatedRingEl.remove();
							animatedRingEl = null;
						}
					});
				}
				
				// Hover event
				element.addEventListener("mouseenter", () => {
					activeTooltip = document.body.createDiv({ cls: "starmap-tooltip-instance" });
					
					activeTooltip.setCssStyles({
						position: "fixed",
						zIndex: "99999",
						backgroundColor: "var(--background-secondary)",
						border: `1px solid ${borderColor}`,
						padding: "10px",
						borderRadius: "5px",
						boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
						pointerEvents: "none",
						color: "var(--text-normal)",
						fontSize: "12px",
						minWidth: "200px"
					});

					// Safe HTML construction
					const header = activeTooltip.createEl("h4", { text: name });

					
					link = link.replace(/[\[\]"]/g, '');
					const basePath = link.split('#')[0];

					const targetPath = basePath === "" ? ctx.sourcePath : basePath;
					const file = this.app.metadataCache.getFirstLinkpathDest(targetPath, ctx.sourcePath);

					const isSameNote = file && file.path === ctx.sourcePath;

					
					if (!isSameNote) {
						if (file) {
							header.setCssStyles({ margin: "0 0 8px 0", color: accentColor, borderBottom: "1px solid var(--background-modifier-border)", paddingBottom: "4px" });
							const cache = this.app.metadataCache.getFileCache(file);
							
							if (cache?.frontmatter) {
								for (const [key, value] of Object.entries(cache.frontmatter)) {
									if (key !== "position") {
										const row = activeTooltip.createDiv();
										row.setCssStyles({ display: "flex", justifyContent: "space-between", marginBottom: "4px" });
										
										const labelEl = row.createSpan({ text: `${key}:` });
										labelEl.setCssStyles({ color: "var(--text-muted)", textTransform: "capitalize" });
										
										row.createEl("strong", { text: String(value) });
									}
								}
							} else {
								activeTooltip.createDiv().createEl("em", { text: "No properties found." });
							}
						} else {
							header.setCssStyles({ margin: "0 0 8px 0", color: accentColor, borderBottom: "1px solid var(--background-modifier-border)", paddingBottom: "4px" });
							activeTooltip.createDiv().createEl("em", { text: "Note not created yet." });
						}
					} else {
						//If it IS the same note, just show the title with no borders/properties
						header.setCssStyles({ margin: "0 0 0px 0", color: accentColor});
						activeTooltip.setCssStyles({
							minWidth: "0px"
						});
					}
					}); // End of hover event listener
				
				// Moving the tooltip with the user's mouse.
				element.addEventListener("mousemove", (e) => {
					if (activeTooltip) {
						activeTooltip.setCssStyles({
							left: `${e.clientX + 15}px`,
							top: `${e.clientY + 15}px`
						});
					}
				});

				// Destroyer method
				element.addEventListener("mouseleave", () => {
					if (activeTooltip) {
						activeTooltip.remove();
						activeTooltip = null;
					}
				});
			};

			// destroy any lingering tooltips from previous renders
			document.body.querySelectorAll('.starmap-tooltip-instance').forEach(e => e.remove());

			// Clear out the container before we draw
			el.empty();
			el.setCssStyles({ position: "relative", zIndex: "10" });

			// Obsidian Wrapper, accounting for verticality.
			if (isVertical) {
				el.setCssStyles({
					float: "right",
					width: height,
					height: width,
					margin: "0 0 20px 20px"
				});
			} else {
				el.setCssStyles({
					float: "none",
					width: "100%",
					height: height,
					margin: "10px"
				});
			}

			// Map container, this guy is the one we blame when ANYTHING breaks.
			const mapContainer = el.createDiv(); 
			mapContainer.setCssStyles({
				position: "relative",
				backgroundColor: spaceColor,
				borderRadius: "8px", 
				border: `5px solid ${borderColor}`,
				padding: "0px",
				overflow: "hidden"
			});
			
			if (isVertical) { 
				mapContainer.setCssStyles({
					width: width,
					height: height,
					transformOrigin: "top left",
					transform: "rotateZ(90deg) translateY(-100%)"
				});
				labelRot = labelRot - 90;
			} else {
				mapContainer.setCssStyles({ width: "100%", height: "100%" });
			}
			
			//This draws the line in the middle.
			const orbitalLine = mapContainer.createDiv();
			orbitalLine.setCssStyles({
				position: "absolute",
				top: "50%",
				left: "0",
				width: "100%",
				height: "2px",
				backgroundColor: lineColor
			});

			//Taste the sun (go watch History of the Entire World I guess)
			const starSize = 5000;	//Technically we could mess this value to have different stars, but so far I feel like this is the best size.

			const sun = mapContainer.createDiv();
			const shifting = starSize * 0.98;
			let offShifting = starSize - shifting;
			const sunRadius = starSize / 2;
			const sunCenterX = -shifting + sunRadius;
			const absSunCenter = Math.abs(sunCenterX);

			sun.setCssStyles({
				zIndex: "2",
				position: "absolute",
				top: "50%",
				width: `${starSize}px`,
				height: `${starSize}px`,
				left: `-${shifting}px`,
				borderRadius: "50%",
				backgroundColor: sunColor,
				transform: "translateY(-50%)",
				boxShadow: sunColor === "#000000" ? "0 0 80px #FFFFFF" : `0 0 80px ${sunColor}`
			});

			if(data.binaryColor != null){
				const binary = mapContainer.createDiv();
				binary.setCssStyles({
					zIndex: "1",
					position: "absolute",
					top: "",
					left: "",
					transform: "translate(-45%, 0%)",
					width: `${starSize*0.06}px`,
					height: `${starSize*0.06}px`,
					backgroundColor: data.binaryColor,
					boxShadow: data.binaryColor === "#000000" ? "0 0 80px #FFFFFF" : `0 0 80px ${data.binaryColor}`,
					borderRadius: "50%"
				});
				offShifting = starSize - (starSize * 0.972);
			}

			if(data.trinaryColor != null){
				const trinary = mapContainer.createDiv();
				trinary.setCssStyles({
					zIndex: "0",
					position: "absolute",
					top: "",
					left: "",
					transform: "translate(-45%, 60%)",
					width: `${starSize*0.05}px`,
					height: `${starSize*0.05}px`,
					backgroundColor: data.trinaryColor,
					boxShadow: data.trinaryColor === "#000000" ? "0 0 80px #FFFFFF" : `0 0 80px ${data.trinaryColor}`,
					borderRadius: "50%"
				});
			}
			const starLabel = mapContainer.createDiv();
			starLabel.innerText = data.name ?? "";
			
			starLabel.setCssStyles({
				position: "absolute",
				transformOrigin: "left top",
				left: `${offShifting}px`,
				fontSize: "20px",
				color: moonLineColor,
				whiteSpace: "nowrap"
			});
			
			if(isVertical){
				starLabel.setCssStyles({
					transform: "rotateZ(-90deg)",
					textAlign: "left",
					top: "96%"
				});
			}
			
			const starLink = data.link ?? data.name ?? "";
			attachInteractivity(sun, starLink, data.name ?? "The Sun", sunColor, starSize, false);
		
			if (data.belts && Array.isArray(data.belts)) {
				data.belts.forEach((belt: BeltData) => {
					// The Giant Orbital Ring
					const beltEl = mapContainer.createDiv();
					const bThick = belt.thickness ?? 15;
					const bColor = belt.color ?? "var(--text-muted)";
					
					beltEl.setCssStyles({
						position: "absolute",
						left: `${sunCenterX}px`,
						top: "50%",
						width: `calc(${absSunCenter * 2}px + ${belt.distance * 2}%)`,
						aspectRatio: "1 / 1",
						transform: "translate(-50%, -50%)",
						borderRadius: "50%",
						border: `${bThick}px solid ${bColor}`,
						boxShadow: `inset 0 0 10px ${bColor}, 0 0 10px ${bColor}`,
						pointerEvents: "none"
					});
					
					// The Interactive Anchor (The Label) (Not all of the ring can be interacted with, I thought it was better this way.)
					const beltLabel = mapContainer.createDiv();
					beltLabel.innerText = belt.name;
					
					beltLabel.setCssStyles({
						position: "absolute",
						left: `calc(${belt.distance}% - ${bThick / 2}px)`,
						top: "50%",
						fontSize: "12px",
						textAlign: "center",
						transform: isVertical ? "translate(-50%, -150%) rotateZ(-90deg)" : "translate(-50%, -100%) rotateZ(0deg)"
					});
					
					const beltLink = belt.link ?? belt.name;
					attachInteractivity(beltLabel, beltLink, belt.name, bColor, 0, false);

					if (belt.asteroids && Array.isArray(belt.asteroids)) {
                        belt.asteroids.forEach((asteroid: AsteroidData) => {
                            const asteroidEl = beltEl.createDiv();
                            const angleDeg = asteroid.angle ?? 0; 
							const angleRad = angleDeg * (Math.PI / 180);
							const cosVal = Math.cos(angleRad);
							const sinVal = Math.sin(angleRad);
							const astSize = asteroid.size ?? 8;

							asteroidEl.setCssStyles({
								position: "absolute",
								left: `calc(50% + (50% + ${bThick / 2}px) * ${cosVal})`,
								top: `calc(50% + (50% + ${bThick / 2}px) * ${sinVal})`,
								transform: "translate(-50%, -50%)",
								width: `${astSize}px`,
								height: `${astSize}px`,
								backgroundColor: asteroid.colorOverride ||"var(--text-normal)",
								borderRadius: "50%",
								pointerEvents: "auto"
							});
							
							const asteroidLabel = asteroidEl.createDiv();
							asteroidLabel.innerText = asteroid.name;

							asteroidLabel.setCssStyles({
								position: "absolute",
								left: "50%",
								textAlign: "center",
								fontSize: "9px",
								whiteSpace: "nowrap",
								transform: isVertical ? "translate(-50%, -150%) rotateZ(-90deg)" : "translate(-50%, -100%) rotateZ(0deg)"
							});

							const astLink = asteroid.link ?? asteroid.name;
                            attachInteractivity(asteroidEl, astLink, asteroid.name, "var(--text-normal)", astSize, true);
                        });
                    }
				});
			}

			if (data.planets && Array.isArray(data.planets)) {
				data.planets.forEach((planet: PlanetData) => {
					// The orbit for planetoids
					const orbit = mapContainer.createDiv();
					orbit.setCssStyles({
						position: "absolute",
						left: `${sunCenterX}px`,
						top: "50%",
						width: `calc(${(absSunCenter * 2)+5}px + ${planet.distance * 2}%)`,
						aspectRatio: "1 / 1",
						transform: "translate(-50%, -50%)",
						borderRadius: "50%",
						border: `4px solid ${orbitColor}`,
						pointerEvents: "none"
					});
					
					const planetEl = mapContainer.createDiv();
					planetEl.setCssStyles({
						position: "absolute",
						left: `${planet.distance}%`,
						top: "50%",
						width: `${planet.size}px`,
						height: `${planet.size}px`,
						transform: "translate(-50%, -50%)",
						transformStyle: "preserve-3d"
					});
					
					// Draws the Planet Sphere at Z=0.	This comes useful when you want to draw rings.
					const sphere = planetEl.createDiv();

					sphere.setCssStyles({
						position: "absolute",
						top: "0",
						left: "0",
						width: "100%",
						height: "100%",
						backgroundColor: planet.colorOverride || planetColor,
						borderRadius: "50%"
					});

					const planetLink = planet.link ?? planet.name;
					attachInteractivity(sphere, planetLink, planet.name, planetColor, planet.size, true);

					let topOffset = 0;

					if (planet.rings) {
						const ringWidth = planet.size + (planet.rings.size ?? 20);
						const ringThickness = planet.rings.thickness ?? 6;

						//Sacred geometry deliver us from the grasp of shitty calculations, be upon you the blessed trigonometry.
						const xRot = Math.abs(planet.rings.xRot ?? 75) * (Math.PI / 180); 
						const zRot = Math.abs(planet.rings.zRot ?? -20) * (Math.PI / 180);
						const visualRingHeight = ((ringWidth+ringThickness)/2) * Math.sqrt(Math.pow(Math.sin(zRot), 2) + Math.pow(Math.cos(xRot), 2) * Math.pow(Math.cos(zRot), 2));
						//I'm proud of this math ok.

						topOffset = visualRingHeight;
						
						const ring = planetEl.createDiv();
						ring.setCssStyles({	
							position: "absolute",
							top: "50%",
							left: "50%",
							width: `${ringWidth}px`,
							height: `${ringWidth}px`,
							borderRadius: "50%",
							border: `${ringThickness}px solid ${planet.rings.colorOverride || ringColor}`,
							transform: `translate(-50%, -50%) rotateZ(${planet.rings.zRot ?? -20}deg) rotateX(${planet.rings.xRot ?? 75}deg)`,
							pointerEvents: "none"
						});
					}

					const labelEl = planetEl.createDiv();
					labelEl.innerText = planet.name;

					labelEl.setCssStyles({
						position: "absolute",
						left: "50%",
						fontSize: "12px",
						whiteSpace: "nowrap",
						top: planet.rings ? `-${Math.max(topOffset, 25)}px` : "-25px",
						transformOrigin: labelRot !== 0 ? "left bottom" : undefined,
						rotate: labelRot !== 0 ? `${labelRot}deg` : undefined,
						transform: labelRot === 0 ? "translateX(-50%)" : undefined
					});
					
					// Lua drawing ---
					if (planet.moons && Array.isArray(planet.moons)) {
						const moonListEl = planetEl.createDiv();
						const topDrop = planet.rings ? Math.max(topOffset-20, 15) : 15;
						const rowHeight = 16;  
						const rowMargin = 8;   
						
						moonListEl.setCssStyles({
							position: "absolute",
							top: "100%",
							left: "50%",
							paddingTop: `${topDrop}px`
						});
						
						const lineEl = moonListEl.createDiv();
						const totalRowSpace = rowHeight + rowMargin;
						const exactHeight = topDrop + ((planet.moons.length - 1) * totalRowSpace) + (rowHeight / 2);
						
						lineEl.setCssStyles({
							position: "absolute",
							left: "0",
							top: "0",
							width: "1px",
							backgroundColor: moonLineColor,
							zIndex: "-1",
							height: `${exactHeight}px`
						});

						planet.moons.forEach((moon: MoonData) => {
							const mSize = moon.size ?? 4;
							
							const moonRow = moonListEl.createDiv();
							moonRow.setCssStyles({
								position: "relative",
								height: `${rowHeight}px`,
								marginBottom: `${rowMargin}px`
							});

							const moonDot = moonRow.createDiv();
							moonDot.setCssStyles({
								position: "absolute",
								width: `${mSize}px`,
								height: `${mSize}px`,
								backgroundColor: moon.colorOverride || moonColor,
								borderRadius: "50%",
								left: "0",
								top: "50%",
								transform: "translate(-45%, -50%)"
							});

							const mLink = moon.link ?? moon.name;
							attachInteractivity(moonDot, mLink, moon.name, moonColor, mSize, true);

							const moonLabel = moonRow.createDiv();
							moonLabel.innerText = moon.name;
							
							moonLabel.setCssStyles({
								position: "absolute",
								left: `${(mSize / 2) + 8}px`,
								top: "50%",
								fontSize: "10px",
								color: moonLineColor,
								whiteSpace: "nowrap",
								transform: isVertical ? "translateX(-10%) translateY(-50%) rotateZ(-45deg)" : "translateY(-50%)",
								transformOrigin: isVertical ? "left top" : undefined
							});
						});
					}
				});
			}
		});

//=======================================================================================================================================================================================// 

		this.addCommand({
					id: 'insert-planetview-template',
					name: 'Insert planetview starmap template',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						const template = `\`\`\`planetview
#============================ PART 0: GLOBAL ============================#
position: "right" # "left" and "right" 
height:   "500px" # I am of the humble opinion that 1:1 is the best ratio 
width:    "500px" # for these planetviews. You're free to be wrong.

borderColor:      # Most values have fallbacks, you don't need to fill them all!
spaceColor:       # But maybe your space is not black. Who am I to judge?
orbitColor:

labelColor: "#FFFFFF" # Note that hexs should be put inside " "
labelRot: -0      # Rotates all the labels
 
#=========================== PART 1: THE STARS ==========================#
# You can have as many stars as you want!
stars:
  - name: ""
    link: "[[Star_Example]]"   # Links will inherti the sunName if left emtpy!
    sunSize: "7"
    sunGlowRadius: "3"
    sunGlowSpread: "1.5"
    sunColor:       #  <-- Surely nothing will happen if this value is   "#000000"
    accretionColor: # <-- Surely unrelated to this value.
    sunRot: "45"
    sunX: "8%"      # Move the sun around. Zero ecological disasters guaranteed.
    sunY: "91%"  

  - name: "Star Example"
    link: "[[Star_Example]]" # TIP: You should only name the lower star!
    sunSize: "3"
    sunGlowRadius: "3"
    sunGlowSpread: "1"
    sunColor:
    accretionColor:
    sunX: "9%"
    sunY: "89%"


#========================== PART 2: THE PLANET ==========================#
#=== General properties ===#
name: "Example Planet in Example System"
labelPos: "BOTTOM RIGHT"
planetColor: 

planetSize:   # Size for the planet. 
planetX:      # Movement for the planet
planetY:  

#===    Custom Planet   ===#
importPlanet: "[[image.png]]"       # <-- Use PNGs inside your vault!!!! 
importPlanetSize: "300"            # Size will be limited by planet size.
importPlanetRot: "5"               # Rotates the PNG. Close Photoshop, use this.

# Sometimes you will have to refresh the note. 
# ctrl+P -> "Reload app without saving"
# for the PNG to re-render. This is obsidian's fault, not mine!

#===   Iterest Points   ===#
points:
  - name: "John Location (Polar cap)"
    size: "11"  # <-- On small sizes, I recommend odd values.
    color: "#BB0000"
    link: "[[link]]"   # <-- Links should be inside " "
    X: -900
    Y: 800
  - name: "City of Note"
    size: "11"
    color: "#BB0000"
    link: 
    X: -200
    Y: -800
  - name: "Thing (inconspicuous)"
    size: "11"
    color: "#BB0000"
    link: 
    X: 1550             # <-- You can escape the planet!
    Y: 800              #     For those space stations and ring objects :P

#========================== PART 3: THE MOONS  ==========================#
moons:
  - name: Moon example  # <- Similar to starmap!
    link: "[[Moon_Link]]"
    color: "#FFFFFF"
    size: 14
    angle: 100          # <- This is the angle *along* the orbit
    distance: 800       # <- This is the orbit radius
    zRot: 45            # <- This is the orbit zRot
    xRot: -60
    
  - name: Lua
    labelRot: -135      # <- In case you want to rotate the label?
    size: 20 
    angle: 75
    distance: 700
    zRot: 45
    xRot: -60
    
#========================== PART 4: THE RINGS  ==========================#
rings:
  - name: "Testrings"   # <- They don't actually need a name. 
			            #    Leave it empty if you want purely cosmetic rings!
    size: 600
    thickness: 17
    color: "#cccf" 
    zRot:  45
    xRot: -65
      
  - name: "Testrings"   # You can have up to 2,147,483,647 rings. 
						# Each ring adds more *style*
						# But maybe don't create 2,147,483,647 rings.
    size: 560
    thickness: 10
    color: "#DDDDDD"
  - name: "Testrings"
    size: 537
    thickness: 5
    color: "#DDDDDD"
  - name: "Testrings"
    size: 500
    thickness: 2
    color: "#DDDDDD"
  - name: "Testrings"
    size: 479
    thickness: 20
    color: "#DDDDDD"
  - name: "Testrings"
    size: 435
    thickness: 2
    color: "#DDDDDD"
  - name: "Testrings"
    size: 415
    thickness: 2
    color: "#DDDDDD"
\`\`\``;
					editor.replaceSelection(template);
			}
		})

		this.addCommand({
					id: 'insert-planetview-template-bare',
					name: 'Insert \'bare-minimum\' planetview starmap template (uncomented)',
					editorCallback: (editor: Editor, view: MarkdownView) => {
						const template = `\`\`\`planetview
#============================ PART 0: GLOBAL ============================#
position: "right"
height: "500px"
width:  "500px"

borderColor:
spaceColor:
orbitColor:

labelColor: "#FFFFFF"
labelRot: -0 
 
#=========================== PART 1: THE STAR ===========================#
stars:
  - name: "Star Example"
    link: "[[Star_Example]]"
    sunSize: "7"
    sunGlowRadius: "3"
    sunGlowSpread: "1.5"
    sunColor:
    accretionColor:
    sunRot: "45"
    sunX: "8%"
    sunY: "91%"  

#========================== PART 2: THE PLANET ==========================#
#=== General properties ===#
name: "Example Planet in Example System"
labelPos: "BOTTOM RIGHT"
planetColor: 

planetSize:
planetX:
planetY:  

#===    Custom Planet   ===#
importPlanet: "[[image.png]]" 
importPlanetSize: "300"
importPlanetRot: "5"

#===   Iterest Points   ===#
points:
  - name: "City of Note"
    size: "11"
    color: "#BB0000"
    link: 
    X: -200
    Y: -800

#========================== PART 3: THE MOONS  ==========================#
moons:
  - name: Moon example
    link: "[[]]"
    size: 14
    angle: 100
    distance: 800
    zRot: 45
    xRot: -60
#========================== PART 4: THE RINGS  ==========================#
rings:
  - name: "Testrings"
    size: 600
    thickness: 17
    zRot: 
    xRot: 
    color: "#cccf"
\`\`\``;
					editor.replaceSelection(template);
			}
		})

		this.registerMarkdownCodeBlockProcessor("planetview", (source, el, ctx) => {
			let data: PlanetViewData;

			try {
				data = parseYaml(source) as PlanetViewData;
			} catch (_) {
				el.createEl("div", {
					text: "Error parsing Planet View data. YAML formatting is very capricious, check it.",
					cls: "has-error"
				});
				return;
			}

			if (!data || typeof data !== "object") {
				el.createEl("div", {
					text: "Error parsing Planet View data: expected a YAML mapping.",
					cls: "has-error"
				});
				return;
			}

			// Global PlanetView settings. These remain local to this processor.
			const height = data.height ?? "500px";
			const width = data.width ?? "500px";
			const planetSize = data.planetSize ?? "300";
			const borderColor = data.borderColor ?? "var(--interactive-accent)";
			const spaceColor = data.spaceColor ?? "#000000";
			const planetColor = data.planetColor ?? "var(--interactive-accent)";
			const labelColor = data.labelColor ?? "#FFFFFF";
			let labelRot = data.labelRot ?? 0;
			const orbitColor = data.orbitColor ?? "#FFF1";
			const moonColor = data.moonColor ?? "var(--interactive-accent)";
			const planetX = data.planetX ?? "0";
			const planetY = data.planetY ?? "0";

			type InteractivityAnimation = "none" | "ring" | "leader";
			type InteractiveTarget = HTMLElement | SVGCircleElement;

			const finiteNumber = (value: unknown, fallback: number): number => {
				const parsed = Number(value);
				return Number.isFinite(parsed) ? parsed : fallback;
			};

			// Only PlanetView uses this normaliser. Starmap link handling is untouched.
			const normalizePlanetViewLink = (rawLink: string): string => {
				let result = rawLink.trim();

				if (result.startsWith("[[") && result.endsWith("]]")) {
					result = result.slice(2, -2);
				}

				// [[Note|Alias]] should navigate to Note, not to the alias text.
				const aliasSeparator = result.indexOf("|");
				if (aliasSeparator !== -1) {
					result = result.slice(0, aliasSeparator);
				}

				return result.trim();
			};

			const attachInteractivity = (
				element: InteractiveTarget,
				link: string,
				name: string,
				accentColor: string,
				size: number,
				ringSelect = false,
				animationType: InteractivityAnimation = ringSelect ? "ring" : "none",
				mapContainer?: HTMLElement
			): void => {
				const targetLink = normalizePlanetViewLink(link || "");
				if (!targetLink) return;

				// Use the standard style API so this also works for SVG circle elements.
				element.setCssStyles({
					cursor: "pointer"
				});

				const safeSize = Number.isFinite(size) && size > 0 ? size : 4;
				let activeTooltip: HTMLElement | null = null;
				let leaderSvg: SVGSVGElement | null = null;
				let leaderPath: SVGPathElement | null = null;

				const clearLeader = (): void => {
					leaderSvg?.remove();
					leaderSvg = null;
					leaderPath = null;
				};

				const removeTooltip = (): void => {
					activeTooltip?.remove();
					activeTooltip = null;
					clearLeader();
				};

				const getMapContainer = (): HTMLElement => {
					if (mapContainer) return mapContainer;
					if (element instanceof HTMLElement && element.offsetParent instanceof HTMLElement) {
						return element.offsetParent;
					}
					const parent = element.parentElement;
					return parent instanceof HTMLElement ? parent : document.body;
				};

				const isOnLeftSide = (): boolean => {
					const mapRect = getMapContainer().getBoundingClientRect();
					const objectRect = element.getBoundingClientRect();
					const objectCenter = objectRect.left + objectRect.width / 2;
					const mapCenter = mapRect.left + mapRect.width / 2;
					return objectCenter < mapCenter;
				};

				const createLeader = (): void => {
					const svgNS = "http://www.w3.org/2000/svg";
					clearLeader();

					const viewportWidth = window.innerWidth;
					const viewportHeight = window.innerHeight;

					leaderSvg = document.createElementNS(svgNS, "svg");
					leaderSvg.setAttribute("viewBox", `0 0 ${viewportWidth} ${viewportHeight}`);
					leaderSvg.setAttribute("width", `${viewportWidth}`);
					leaderSvg.setAttribute("height", `${viewportHeight}`);
					leaderSvg.setAttribute("aria-hidden", "true");

					Object.assign(leaderSvg.style, {
						position: "fixed",
						top: "0",
						left: "0",
						width: `${viewportWidth}px`,
						height: `${viewportHeight}px`,
						overflow: "visible",
						pointerEvents: "none",
						zIndex: "99998"
					});

					leaderPath = document.createElementNS(svgNS, "path");
					leaderPath.setAttribute("fill", "none");
					leaderPath.setAttribute("stroke", accentColor);
					leaderPath.setAttribute("stroke-width", "5");
					leaderPath.setAttribute("stroke-linecap", "round");
					leaderPath.setAttribute("stroke-linejoin", "round");
					leaderPath.setCssStyles({
						filter: `drop-shadow(0 0 4px ${spaceColor})`
					});

					leaderSvg.appendChild(leaderPath);
					document.body.appendChild(leaderSvg);
				};

				const updateLeader = (event: MouseEvent): void => {
					if (!activeTooltip || !leaderPath) return;

					const diagonalLength = 45;
					const gap = 6;
					const direction = isOnLeftSide() ? 1 : -1;
					const startX = event.clientX;
					const startY = event.clientY;
					const elbowX = startX + direction * diagonalLength;
					const elbowY = startY + diagonalLength;
					const tooltipWidth = Math.max(activeTooltip.getBoundingClientRect().width, 1);

					const tooltipLeft = direction === 1 ? elbowX : elbowX - tooltipWidth;
					const tooltipTop = elbowY + gap;

					Object.assign(activeTooltip.style, {
						left: `${tooltipLeft}px`,
						top: `${tooltipTop}px`
					});

					const endX = elbowX + direction * tooltipWidth;
					leaderPath.setAttribute(
						"d",
						`M ${startX} ${startY} L ${elbowX} ${elbowY} L ${endX} ${elbowY}`
					);
				};

				// Click: navigate using the normalised target, not the literal [[...]] string.
				element.addEventListener("click", () => {
					void this.app.workspace.openLinkText(targetLink, ctx.sourcePath, false);
					removeTooltip();
				});

				// The expanding-ring animation applies to HTML targets, not SVG ring strokes.
				if (animationType === "ring" && element instanceof HTMLElement) {
					let animatedRingEl: HTMLElement | null = null;

					element.addEventListener("mouseenter", () => {
						animatedRingEl?.remove();

						const ringThickness =
							((5 / 50) * safeSize + 2) *
							(-Math.exp(-Math.pow(safeSize / 5, 2)) + 1);
						const currentRing = element.createDiv();
						animatedRingEl = currentRing;

						Object.assign(currentRing.style, {
							zIndex: "999999",
							position: "absolute",
							top: "50%",
							left: "50%",
							width: `${safeSize}px`,
							height: `${safeSize}px`,
							borderRadius: "50%",
							pointerEvents: "none",
							boxSizing: "border-box",
							outline: `${ringThickness}px solid ${accentColor}`,
							outlineOffset: "10%",
							transform: "translate(-50%, -50%)",
							opacity: "0",
							transition: "transform 0.4s ease-out, opacity 0.4s ease-out"
						});

						const initialNum = Math.exp(-Math.pow(safeSize / 10, 2));
						const initialScale = 250 * (5 * initialNum + 1);
						currentRing.style.transform =
							`translate(-50%, -50%) scale(${initialScale}%)`;

						window.setTimeout(() => {
							// Ignore a timeout belonging to a ring that has already been removed.
							if (animatedRingEl !== currentRing || !currentRing.isConnected) return;

							const finalNum = Math.exp(-Math.pow(safeSize / 15, 2));
							const finalScale = 125 * (2 * finalNum + 1);
							currentRing.style.opacity = "0.5";
							currentRing.style.transform =
								`translate(-50%, -50%) scale(${finalScale}%)`;
						}, 10);
					});

					element.addEventListener("mouseleave", () => {
						animatedRingEl?.remove();
						animatedRingEl = null;
					});
				}

				// Tooltip creation. Its content and layout remain the same as the existing version.
				element.addEventListener("mouseenter", (event: Event) => {
					const mouseEvent = event as MouseEvent;
					activeTooltip?.remove();
					const tooltip = document.body.createDiv({ cls: "planetview-tooltip-instance" });
					activeTooltip = tooltip;

					Object.assign(tooltip.style, {
						position: "fixed",
						zIndex: "99999",
						backgroundColor: "var(--background-secondary)",
						border: `1px solid ${borderColor}`,
						padding: "10px",
						borderRadius: "5px",
						boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
						pointerEvents: "none",
						color: "var(--text-normal)",
						fontSize: "12px",
						minWidth: "200px",
						left: `${mouseEvent.clientX + 15}px`,
						top: `${mouseEvent.clientY + 15}px`
					});

					const header = tooltip.createEl("h4", { text: name });
					const basePath = targetLink.split("#")[0];
					const targetPath = basePath === "" ? ctx.sourcePath : basePath;
					const file = this.app.metadataCache.getFirstLinkpathDest(targetPath, ctx.sourcePath);
					const isSameNote = !!file && file.path === ctx.sourcePath;

					if (!isSameNote) {
						if (file) {
							Object.assign(header.style, {
								margin: "0 0 8px 0",
								color: accentColor,
								borderBottom: "1px solid var(--background-modifier-border)",
								paddingBottom: "4px"
							});

							const cache = this.app.metadataCache.getFileCache(file);
							if (cache?.frontmatter) {
								for (const [key, value] of Object.entries(cache.frontmatter)) {
									if (key === "position") continue;

									const row = tooltip.createDiv();
									Object.assign(row.style, {
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "4px"
									});

									const labelEl = row.createSpan({ text: `${key}:` });
									Object.assign(labelEl.style, {
										color: "var(--text-muted)",
										textTransform: "capitalize"
									});

									row.createEl("strong", { text: String(value) });
								}
							} else {
								tooltip.createDiv().createEl("em", { text: "No properties found." });
							}
						} else {
							Object.assign(header.style, {
								margin: "0 0 8px 0",
								color: accentColor,
								borderBottom: "1px solid var(--background-modifier-border)",
								paddingBottom: "4px"
							});
							tooltip.createDiv().createEl("em", { text: "Note not created yet." });
						}
					} else {
						Object.assign(header.style, { margin: "0", color: accentColor });
						tooltip.setCssStyles({
							minWidth: "0px"
						});
					}

					if (animationType === "leader") {
						createLeader();
						updateLeader(mouseEvent);
					}
				});

				element.addEventListener("mousemove", (event: Event) => {
					const mouseEvent = event as MouseEvent;
					if (!activeTooltip) return;

					if (animationType === "leader") {
						updateLeader(mouseEvent);
					} else {
						Object.assign(activeTooltip.style, {
							left: `${mouseEvent.clientX + 15}px`,
							top: `${mouseEvent.clientY + 15}px`
						});
					}
				});

				element.addEventListener("mouseleave", () => {
					activeTooltip?.remove();
					activeTooltip = null;
					clearLeader();
				});
			};

			// Remove any tooltip left by a previous PlanetView render only.
			document.body.querySelectorAll(".planetview-tooltip-instance").forEach((tooltip) => tooltip.remove());

			// Clear the previous contents and configure the wrapper so note text can wrap around it.
			el.empty();
			el.setCssStyles({ position: "relative", zIndex: "10" });

			const mapSide = data.position === "left" ? "left" : "right";
			el.setCssStyles({
				float: mapSide,
				width: height,
				height: width,
				margin: mapSide === "left" ? "0 20px 20px 0" : "0 0 20px 20px"
			});

			const mapContainer = el.createDiv();
			mapContainer.setCssStyles({
				position: "relative",
				backgroundColor: spaceColor,
				borderRadius: "8px",
				border: `5px solid ${borderColor}`,
				padding: "0px",
				overflow: "hidden",
				width,
				height,
				transformOrigin: "top left",
				transform: "rotateZ(90deg) translateY(-100%)"
			});
			labelRot -= 90;

			// Render independently configured stars.
			if (Array.isArray(data.stars)) {
				data.stars.forEach((star: any) => {
					const starSize = Math.max(1, finiteNumber(star.sunSize, 5));
					const starX = star.sunX ?? "50%";
					const starY = star.sunY ?? "50%";
					const starColor = star.sunColor ?? "var(--interactive-accent)";
					const starAccretionColor = star.accretionColor ?? "#FFFFFF";
					const starRot = finiteNumber(star.sunRot, 45);
					const starGlowRadius =
						finiteNumber(star.sunGlowRadius, 3) * starSize || 3 * starSize;
					const starGlowSpread =
						finiteNumber(star.sunGlowSpread, 1.5) * starSize || 1.5 * starSize;

					if (starColor === "#000000") {
						const outerDiameter = 4 * starSize;
						const glowSize = (3 / 5) * starSize;
						const accretionDisc = mapContainer.createDiv();

						accretionDisc.setCssStyles({
							position: "absolute",
							top: starY,
							left: starX,
							width: `${outerDiameter}px`,
							height: `${outerDiameter}px`,
							borderRadius: "50%",
							backgroundColor: starAccretionColor,
							transform: `translate(-50%, -50%) rotateZ(${starRot}deg) rotateX(-80deg)`,
							pointerEvents: "none",
							willChange: "transform",
							backfaceVisibility: "hidden",
							boxShadow: `0 0 ${glowSize}px ${glowSize}px ${starAccretionColor}`,
							zIndex: "1"
						});
					}

					const sun = mapContainer.createDiv();
					sun.setCssStyles({
						position: "absolute",
						top: starY,
						left: starX,
						transform: "translate(-50%, -50%)",
						width: `${starSize}px`,
						height: `${starSize}px`,
						borderRadius: "50%",
						backgroundColor: starColor,
						boxShadow: starColor === "#000000"
							? `0 0 3px 7px ${starAccretionColor}, 0 0 ${starGlowRadius}px ${starGlowSpread}px ${starAccretionColor}`
							: `0 0 ${starGlowRadius}px ${starGlowSpread}px ${starColor}`,
						zIndex: "2"
					});

					const starLink = star.link || star.name || "";
					const starName = star.name ?? "YOU DIDN'T NAME THE STAR";
					const interactiveColor = starColor === "#000000" ? starAccretionColor : starColor;
					const interactiveSize = starColor === "#000000" ? starSize * 1.5 : starSize;
					attachInteractivity(sun, starLink, starName, interactiveColor, interactiveSize, true);

					const starLabel = sun.createDiv();
					starLabel.innerText = starName;
					const radius = starSize / 2;
					const labelOffset = radius + radius / 2;

					starLabel.setCssStyles({
						position: "absolute",
						left: "50%",
						top: "50%",
						fontSize: "10px",
						color: labelColor,
						whiteSpace: "nowrap",
						pointerEvents: "none",
						textAlign: "center",
						transformOrigin: "0 0",
						transform: `rotate(${labelRot}deg) translateY(${labelOffset}px) translateX(-50%)`
					});
				});
			}

			// The main planet remains the reference point for the moons and rings.
			const planet = mapContainer.createDiv();
			planet.setCssStyles({
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: `translate(${-50 + Number(planetX)}%, ${-50 + Number(planetY)}%)`,
				width: `${planetSize}px`,
				height: `${planetSize}px`,
				borderRadius: "50%",
				backgroundColor: planetColor,
				transformStyle: "preserve-3d",
				boxShadow: `0 0 6px ${planetColor}`
			});

			// Imported PNG layer. It remains non-interactive so events reach the planet beneath it.
			if (typeof data.importPlanet === "string" && data.importPlanet.trim() !== "") {
				const imageLink = data.importPlanet.trim()
					.replace(/^\[\[/, "")
					.replace(/\]\]$/, "")
					.split("|")[0]
					.split("#")[0]
					.trim();

				const imageFile = this.app.metadataCache.getFirstLinkpathDest(imageLink, ctx.sourcePath);
				if (imageFile instanceof TFile) {
					const imageSize = Math.max(1, finiteNumber(data.importPlanetSize ?? data.planetSize, 100));
					const imageRotation = finiteNumber(data.importPlanetRot, 0);
					const importedPlanet = planet.createEl("img", {
						attr: {
							src: this.app.vault.getResourcePath(imageFile),
							alt: data.name ?? "Imported planet",
							draggable: "false"
						}
					});

					importedPlanet.setCssStyles({
						position: "absolute",
						top: "50%",
						left: "50%",
						width: `${imageSize}px`,
						height: `${imageSize}px`,
						objectFit: "contain",
						transform: `translate(-50%, -50%) rotateZ(${imageRotation}deg)`,
						zIndex: "2",
						pointerEvents: "none"
					});
				} else {
					console.warn(`[PlanetView] Could not resolve imported planet image: ${imageLink}`);
				}
			}

			// Main planet label. Preserve the existing corner transforms.
			const planetLabel = mapContainer.createDiv();
			planetLabel.innerText = data.name ?? "YOU DIDN'T NAME THE PLANET";
			const labelPos = data.labelPos || "TOP";
			const parsedWidth = Number.parseInt(width, 10) || 500;
			const parsedHeight = Number.parseInt(height, 10) || 500;

			planetLabel.setCssStyles({
				position: "absolute",
				transformOrigin: "left top",
				fontWeight: "bold",
				fontSize: "20px",
				color: labelColor,
				whiteSpace: "nowrap",
				transform: labelPos === "TOP RIGHT" ? "rotateZ(-90deg) translateX(-102%)"
					: labelPos === "TOP LEFT" ? `rotateZ(-90deg) translateX(-${parsedWidth * 0.97}px)`
					: labelPos === "BOTTOM RIGHT" ? `rotateZ(-90deg) translateX(-102%) translateY(${parsedHeight * 0.92}px)`
					: labelPos === "BOTTOM LEFT" ? `rotateZ(-90deg) translateX(-${parsedWidth * 0.97}px) translateY(${parsedHeight * 0.92}px)`
					: `rotateZ(-90deg) translateX(-${parsedWidth * 0.97}px)`
			});

			// Render PlanetView rings. The click/hover helper supports SVG circles directly.
			if (Array.isArray(data.rings)) {
				data.rings.forEach((ring: any, index: number) => {
					const ringWidth = Math.max(1, finiteNumber(ring.size, 1000));
					const ringThickness = Math.max(0, finiteNumber(ring.thickness, 20));
					const ringColor = ring.color ?? "#FFFFFF";
					const svgNS = "http://www.w3.org/2000/svg";
					const outerSize = ringWidth + 2 * ringThickness;

					const ringSvg = document.createElementNS(svgNS, "svg");
					ringSvg.setAttribute("width", `${outerSize}`);
					ringSvg.setAttribute("height", `${outerSize}`);
					ringSvg.setAttribute("viewBox", `0 0 ${outerSize} ${outerSize}`);
					Object.assign(ringSvg.style, {
						position: "absolute",
						top: "50%",
						left: "50%",
						overflow: "visible",
						transform: `translate(-50%, -50%) rotateZ(${finiteNumber(ring.zRot, 45)}deg) rotateX(${finiteNumber(ring.xRot, -65)}deg)`,
						pointerEvents: "none"
					});

					const ringShape = document.createElementNS(svgNS, "circle");
					ringShape.setAttribute("cx", `${outerSize / 2}`);
					ringShape.setAttribute("cy", `${outerSize / 2}`);
					ringShape.setAttribute("r", `${Math.max(0, (ringWidth - ringThickness) / 2)}`);
					ringShape.setAttribute("fill", "none");
					ringShape.setAttribute("stroke", ringColor);
					ringShape.setAttribute("stroke-width", `${ringThickness}`);
					ringShape.setAttribute("pointer-events", "stroke");
					ringShape.style.filter = `drop-shadow(0 0 16px ${ringColor})`;
					ringSvg.appendChild(ringShape);
					planet.appendChild(ringSvg);

					// No HTMLElement cast: SVG circle events and styles are supported directly.
					attachInteractivity(
						ringShape,
						ring.link ?? ring.name ?? "",
						ring.name ?? "",
						ringColor,
						ringWidth,
						false,
						"none"
					);
				});
			}

			// Render moons, including their independently tilted orbital rings and readable labels.
			if (Array.isArray(data.moons)) {
				const totalMoons = data.moons.length;

				data.moons.forEach((moon: any, index: number) => {
					const mSize = Math.max(1, finiteNumber(moon.size, 6));
					const moonRingWidth = Math.max(1, finiteNumber(moon.distance, 400 + index * 150));
					const moonRingThickness = Math.max(0, finiteNumber(moon.thickness, 10));
					const angleDeg = finiteNumber(moon.angle, totalMoons ? index * (360 / totalMoons) : 0);
					const angleRad = angleDeg * (Math.PI / 180);
					const cosVal = Math.cos(angleRad);
					const sinVal = Math.sin(angleRad);
					const orbitRadius = (moonRingWidth - moonRingThickness) / 2;
					const zRot = finiteNumber(moon.zRot, 45);
					const xRot = finiteNumber(moon.xRot, -65);
					const zRad = zRot * (Math.PI / 180);
					const xRad = xRot * (Math.PI / 180);
					const projectedX = orbitRadius * (
						cosVal * Math.cos(zRad) - sinVal * Math.cos(xRad) * Math.sin(zRad)
					);
					const projectedY = orbitRadius * (
						cosVal * Math.sin(zRad) + sinVal * Math.cos(xRad) * Math.cos(zRad)
					);
					const thisMoonColor = moon.color ?? moonColor;

					const moonOrbit = planet.createDiv();
					moonOrbit.setCssStyles({
						position: "absolute",
						top: "50%",
						left: "50%",
						width: `${moonRingWidth}px`,
						height: `${moonRingWidth}px`,
						borderRadius: "50%",
						border: `${moonRingThickness}px solid ${moon.orbitColor || orbitColor}`,
						transform: `translate(-50%, -50%) rotateZ(${zRot}deg) rotateX(${xRot}deg)`,
						transformStyle: "preserve-3d",
						pointerEvents: "none",
						zIndex: "1"
					});

					const moonDot = moonOrbit.createDiv();
					moonDot.setCssStyles({
						position: "absolute",
						left: `calc(50% + ${orbitRadius}px * ${cosVal})`,
						top: `calc(50% + ${orbitRadius}px * ${sinVal})`,
						width: `${mSize}px`,
						height: `${mSize}px`,
						backgroundColor: thisMoonColor,
						borderRadius: "50%",
						boxShadow: `0 0 6px ${thisMoonColor}`,
						transform: `translate(-50%, -50%) rotateX(${-xRot}deg) rotateZ(${-zRot}deg) translateZ(${Math.max(10, moonRingThickness + 5)}px)`,
						transformStyle: "preserve-3d",
						pointerEvents: "auto",
						zIndex: "2"
					});

					attachInteractivity(
						moonDot,
						moon.link ?? moon.name ?? "",
						moon.name ?? "Unnamed moon",
						thisMoonColor,
						mSize,
						true
					);

					// The label is outside the tilted orbit hierarchy to keep text crisp.
					// For some reason, 3D preserve likes to fuck up
					const moonLabel = planet.createDiv();
					moonLabel.innerText = moon.name ?? "Unnamed moon";
					const radius = mSize / 2;
					const labelOffset = radius + radius / 4;

					moonLabel.setCssStyles({
						position: "absolute",
						left: `calc(50% + ${projectedX}px)`,
						top: `calc(50% + ${projectedY}px)`,
						fontSize: "10px",
						color: labelColor,
						whiteSpace: "nowrap",
						pointerEvents: "none",
						textAlign: "center",
						zIndex: "10",
						transformOrigin: "0 0",
						transform: `rotate(${finiteNumber(moon.labelRot, labelRot)}deg) translateY(${labelOffset}px) translateX(-50%)`
					});
				});
			}

			// Render interactive interest points.
			if (Array.isArray(data.points)) {
				data.points.forEach((point: any) => {
					const pointSize = Math.max(1, finiteNumber(point.size, 11));
					const pointColor = point.color || "#FFFFFF";
					const pointX = finiteNumber(point.X, 0);
					const pointY = finiteNumber(point.Y, 0);

					const interestPoint = mapContainer.createDiv();
					interestPoint.setCssStyles({
						position: "absolute",
						width: `${pointSize}px`,
						height: `${pointSize}px`,
						top: "50%",
						left: "50%",
						backgroundColor: pointColor,
						borderRadius: "50%",
						transform: `translate(${-50 + pointX}%, ${-50 + pointY}%)`,
						transformStyle: "preserve-3d",
						boxShadow: `0px 0px 4px ${pointColor}`
					});

					const accent = interestPoint.createDiv();
					accent.setCssStyles({
						position: "absolute",
						zIndex: "99999",
						width: `${pointSize * 2}px`,
						height: `${pointSize * 2}px`,
						top: "50%",
						left: "50%",
						borderRadius: "50%",
						border: `${pointSize * (2 / 11)}px solid ${pointColor}`,
						transform: "translate(-50%, -50%)",
						transformStyle: "preserve-3d",
						pointerEvents: "none",
						boxShadow: `0px 0px 4px ${pointColor}`
					});

					attachInteractivity(
						interestPoint,
						point.link || point.name || "",
						point.name || "Missing name",
						pointColor,
						pointSize,
						false,
						"leader",
						mapContainer
					);
				});
			}
		});	
	}
}