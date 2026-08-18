import { Plugin, parseYaml, Editor, MarkdownView } from 'obsidian';
interface StarMapData {
	name?: string;
	link?: string;
	height?: string;
	width?: string;
	sunColor?: string;
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
	link?: string;
	size?: number;
	angle?: number;
}

interface PlanetData {
	name: string;
	distance: number;
	size: number;
	link?: string;
	rings?: RingData;
	moons?: MoonData[];
}

interface RingData {
	size?: number;
	thickness?: number;
	xRot?: number;
	zRot?: number;
}

interface MoonData {
	name: string;
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

#============== Section 1: Global parametres ===============#
# === Colours and px should be inside "  "     === #
# === If any of these values is missing, there's a default!
# === Width will always match your page width. === #
height: "400px" 
lineColor: "#FFFFFF"
moonLineColor: "#FFFFFF"
ringColor: "#FFFFFF"
sunColor: 
borderColor: 
spaceColor: 
planetColor: 
moonColor:
labelRot: -45   #Angles should probably be negative!
orbitColor: "#FFF1"


#YAML is very capricious, the format must be exactly as shown. There is no other way. Maybe death.


#==================  Section 2: The Star  ===================#
name: Xyl's Star
link:      

#Be aware! If links are left empty, this will create an empty link.


#==============   Section 3: Asteroid belts   ===============#

belts:
  - name: "Asteroid\n Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    
    asteroids:
    - name: "Notable\n Asteroid"
      size: 10
      angle: -2       #This silly value should probably not exceed ±3.5
      
  - name: "Outer\n Belt"
    distance: 94
    thickness: 20
    color: "#FFF6" 


#==============   Section 3: Planets & shi'  ===============#
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

height: "400px" 
lineColor: "#FFFFFF"
moonLineColor: "#FFFFFF"
ringColor: "#FFFFFF"
sunColor: 
borderColor: 
spaceColor: 
planetColor: 
moonColor:
labelRot: -45
orbitColor: "#FFF1"


#==================  Section 2: The Star  ===================#
name: Star
link:      


#==============   Section 3: Asteroid belts   ===============#

belts:
  - name: "Asteroid\n Belt"
    distance: 57
    thickness: 70
    color: "#FFF2"
    
    asteroids:
    - name: "Notable\n Asteroid"
      size: 10
      angle: -2


#==============   Section 3: Planets & shi'  ===============#
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


		this.registerMarkdownCodeBlockProcessor("starmap", (source, el, ctx) => {
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
					header.setCssStyles({ margin: "0 0 8px 0", color: accentColor, borderBottom: "1px solid var(--background-modifier-border)", paddingBottom: "4px" });

					const file = this.app.metadataCache.getFirstLinkpathDest(link, ctx.sourcePath);
					if (file) {
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
						activeTooltip.createDiv().createEl("em", { text: "Note not created yet." });
					}
				});
				
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
			const offShifting = starSize - shifting;
			const sunRadius = starSize / 2;
			const sunCenterX = -shifting + sunRadius;
			const absSunCenter = Math.abs(sunCenterX);

			sun.setCssStyles({
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
								backgroundColor: "var(--text-normal)",
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
						backgroundColor: planetColor,
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
						const visualRingHeight = (ringWidth / 2.5) * Math.sqrt(Math.pow(Math.sin(zRot), 2) + Math.pow(Math.cos(xRot), 2) * Math.pow(Math.cos(zRot), 2));
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
							border: `${ringThickness}px solid ${ringColor}`,
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
								backgroundColor: moonColor,
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
	}
}