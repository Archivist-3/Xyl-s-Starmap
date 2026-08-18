import { Plugin, parseYaml, Editor, MarkdownView } from 'obsidian';

export default class StarMapPlugin extends Plugin {

	async onload() {	//<--- Obsidian loads the plugin on startup, and runs this.
		//This is the part where ModAuthor adds an example.
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
luaLineColor: "#FFFFFF"
ringColor: "#FFFFFF"
sunColor: 
borderColor: 
spaceColor: 
planetColor: 
luaColor:
labelRot: -45   #Angles should probably be negative!
orbitColor: "#FFF1"


#YAML is very capricious, the format must be exactly as shown. There is no other way. Maybe death.


#==================  Section 2: The Star  ===================#
name: Xyl's Star
link:      

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
        
  - name: Xyl Gas Giant
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
luaLineColor: "#FFFFFF"
ringColor: "#FFFFFF"
sunColor: 
borderColor: 
spaceColor: 
planetColor: 
luaColor:
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

		console.log('Starmap loading.');

		this.registerMarkdownCodeBlockProcessor("starmap", (source, el, ctx) => {
			//Now this part grabs the YAML and confirms whether it is valid
			let data;
			try {
				data = parseYaml(source);
			} catch (error) {
				// If the user types invalid YAML, show an error message
				el.createEl("div", { text: "Error parsing Star Map data. YAML formatting is very capricious, check it.", cls: "has-error" });
				return;
			}

			const height = data.height || "400px"
			const width = data.width || "850px"
			const sunColor = data.sunColor || "var(--interactive-accent)";
			const borderColor = data.borderColor || "var(--interactive-accent)";
			const spaceColor = data.spaceColor || "#000000";
			const planetColor = data.planetColor || "var(--interactive-accent)";
			const luaColor = data.luaColor || "var(--interactive-accent)";
			const lineColor = data.lineColor || "var(--text-normal)";
			const luaLineColor = data.luaLineColor || "var(--text-normal)";
			const ringColor = data.ringColor || "var(--text-normal)";
			let labelRot = data.labelRot ?? 0;
			const orbitColor = data.orbitColor || "#FFF1";
			const isVertical = data.vertical || false;

			const attachInteractivity = (element: HTMLElement, link: string, name: string, accentColor: string, size: number, ringSelect: boolean = false) => {
				// If no link is provided for this object, do nothing.
				if (!link) return;

				element.style.cursor = "pointer";
				size = size || 4;

				// Create a shared variable that all mouse events can see
				let activeTooltip: HTMLElement | null = null;

				// Click event
				element.addEventListener("click", () => {
					this.app.workspace.openLinkText(link, ctx.sourcePath, false);
					if (activeTooltip) {
						activeTooltip.remove();
						activeTooltip = null;
					}
				});
				
				if(ringSelect){
					// Animation
					let animatedRingEl: HTMLElement | null = null;
					
					element.addEventListener("mouseenter", (e) => {
						if (!link) return; 

						const ringThickness = ((5/50)*size+2) * ((-Math.exp(-Math.pow(size / 5, 2))) + 1);
						const finalOpacity = 0.5; // Final Alpha

						// Create the ring element
						animatedRingEl = element.createDiv();
						animatedRingEl.style.zIndex = "999999";
						animatedRingEl.style.position = "absolute";
						animatedRingEl.style.top = "50%";
						animatedRingEl.style.left = "50%";
						
						animatedRingEl.style.borderRadius = "50%";
						animatedRingEl.style.pointerEvents = "none";
						animatedRingEl.style.boxSizing = "border-box";
						
						animatedRingEl.style.outline = `${ringThickness}px solid ${accentColor}`;
						animatedRingEl.style.outlineOffset = '10%';

						// initial statet
						animatedRingEl.style.transform = `translate(-50%, -50%)`;

						let num = Math.exp(-Math.pow(size / 10, 2));

						const scaleValue = 250 * (5 * num + 1);

						const initialScale = `${scaleValue}%`;
						animatedRingEl.style.width = `${size}px`;
						animatedRingEl.style.height = `${size}px`;
						animatedRingEl.style.transform = `translate(-50%, -50%) scale(${initialScale})`;
						animatedRingEl.style.opacity = "0";

						// Transition
						animatedRingEl.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";

						//trigger
						setTimeout(() => {
							if (!animatedRingEl) return;
							
							// finals state
							animatedRingEl.style.opacity = `${finalOpacity}`;
							num = Math.exp(-Math.pow(size / 15, 2));
							const finalScale = 125 * (2* num + 1);
							animatedRingEl.style.transform = `translate(-50%, -50%) scale(${finalScale}%)`; 
						}, 10); 
					});

					element.addEventListener("mouseleave", () => {
						if (animatedRingEl) {
							animatedRingEl.remove();
							animatedRingEl = null;
						}
					});
				}
				
				// Hovering event
				element.addEventListener("mouseenter", (e) => {
					activeTooltip = document.createElement("div");
					
					// Add a class so we can wipe it out if Obsidian re-renders mid-hover
					activeTooltip.classList.add("starmap-tooltip-instance"); 
					
					activeTooltip.style.position = "fixed";
					activeTooltip.style.zIndex = "99999";
					activeTooltip.style.backgroundColor = "var(--background-secondary)";
					activeTooltip.style.border = `1px solid ${borderColor}`; 
					activeTooltip.style.padding = "10px";
					activeTooltip.style.borderRadius = "5px";
					activeTooltip.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5)";
					activeTooltip.style.pointerEvents = "none";
					activeTooltip.style.color = "var(--text-normal)";
					activeTooltip.style.fontSize = "12px";
					activeTooltip.style.minWidth = "200px";

					let htmlContent = `<h4 style="margin: 0 0 8px 0; color: ${accentColor}; border-bottom: 1px solid var(--background-modifier-border); padding-bottom: 4px;">${name}</h4>`;

					const file = this.app.metadataCache.getFirstLinkpathDest(link, ctx.sourcePath);
					if (file) {
						const cache = this.app.metadataCache.getFileCache(file);
						if (cache && cache.frontmatter) {
							for (const [key, value] of Object.entries(cache.frontmatter)) {
								if (key !== "position") {
									htmlContent += `<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
										<span style="color: var(--text-muted); text-transform: capitalize;">${key}:</span> 
										<span><strong>${value}</strong></span>
									</div>`;
								}
							}
						} else {
							htmlContent += `<div><em>No properties found.</em></div>`;
						}
					} else {
						htmlContent += `<div><em>Note not created yet.</em></div>`;
					}

					activeTooltip.innerHTML = htmlContent;
					document.body.appendChild(activeTooltip);
				});
				
				// In movement
				element.addEventListener("mousemove", (e) => {
					if (activeTooltip) {
						activeTooltip.style.left = `${e.clientX + 15}px`;
						activeTooltip.style.top = `${e.clientY + 15}px`;
					}
				});

				// destroyer method
				element.addEventListener("mouseleave", () => {
					if (activeTooltip) {
						activeTooltip.remove();
						activeTooltip = null;
					}
				});
			};

			
			document.body.querySelectorAll('.starmap-tooltip-instance').forEach(e => e.remove());

			// Clear out the container before we draw
			el.empty();
			el.style.position = "relative";
			el.style.zIndex = "10";

			// WRAPPER (Handles the Float and Page Layout)
			if (isVertical) {
				el.style.float = "right";
				el.style.width = height;  
				el.style.height = width; 
				el.style.margin = "0 0 20px 20px";
			} else {
				el.style.float = "none";
				el.style.width = "100%";
				el.style.height = height; 
				el.style.margin = "10px";
			}

			// MAP CANVAS (Handles the Drawing and Rotation)
			const mapContainer = el.createDiv(); 
			mapContainer.style.position = "relative";
			mapContainer.style.backgroundColor = spaceColor; 
			mapContainer.style.borderRadius = "0px";
			mapContainer.style.overflow = "hidden"; 
			
			if (isVertical) { 
				mapContainer.style.width = width; 
				mapContainer.style.height = height; 
				
				mapContainer.style.transformOrigin = "top left";
				mapContainer.style.transform = "rotateZ(90deg) translateY(-100%)";
				
				labelRot = labelRot - 90;
			}
			else {
				mapContainer.style.width = "100%";
				mapContainer.style.height = "100%";
			}
			
			//This part creates a cool border
			mapContainer.style.border = `5px solid ${borderColor}`;
			mapContainer.style.padding = "0px";
			mapContainer.style.borderRadius = "8px";
			
			//This draws the line in the middle.
			const orbitalLine = mapContainer.createDiv();
			orbitalLine.style.position = "absolute";
			orbitalLine.style.top = "50%";
			orbitalLine.style.left = "0";
			orbitalLine.style.width = "100%";
			orbitalLine.style.height = "2px";
			orbitalLine.style.backgroundColor = `${lineColor}`;

			// Taste the sun :music_note:
			const starSize = 5000;

			const sun = mapContainer.createDiv();
			sun.style.position = "absolute";
			sun.style.top = "50%";

			sun.style.width = `${starSize}px`;
			sun.style.height = `${starSize}px`;

			const shifting = starSize * 0.98;
			const offShifting = starSize - shifting;
			sun.style.left = `-${shifting}px`;

			const sunRadius = starSize / 2;
			const sunCenterX = -shifting + sunRadius;
			const absSunCenter = Math.abs(sunCenterX);

			sun.style.borderRadius = "50%";
			sun.style.backgroundColor = sunColor;
			sun.style.transform = "translateY(-50%)";
			if (sunColor == "#000000") {
				sun.style.boxShadow = "0 0 80px #FFFFFF";
			}
			else sun.style.boxShadow = `0 0 80px ${sunColor}`; 

			const starLabel = mapContainer.createDiv();
			starLabel.innerText = data.name;
			starLabel.style.position = "absolute";
			starLabel.style.transformOrigin = "left top";
			if(isVertical){
				starLabel.style.transform = "rotateZ(-90deg)";	
				starLabel.style.textAlign = "left";
				starLabel.style.top = `96%`;

				starLabel.style.left = `${offShifting}px`;

				starLabel.style.fontSize = "20px";
				starLabel.style.color = luaLineColor;
				starLabel.style.whiteSpace = "nowrap"; 
			}
			else{
				starLabel.style.left = `${offShifting}px`;
				starLabel.style.fontSize = "20px";
				starLabel.style.color = luaLineColor;
				starLabel.style.whiteSpace = "nowrap"; 
			}
			
			data.link = data.link || data.name;
			attachInteractivity(sun, data.link, data.name ?? "The Sun", sunColor, starSize, false);
		
			if (data && data.belts && Array.isArray(data.belts)) {
				data.belts.forEach((belt: any) => {
					// Belt
					const beltEl = mapContainer.createDiv();
					beltEl.style.position = "absolute";
					
					beltEl.style.left = `${sunCenterX}px`;
					beltEl.style.top = "50%";
					
					beltEl.style.width = `calc(${absSunCenter * 2}px + ${belt.distance * 2}%)`;
					beltEl.style.aspectRatio = "1 / 1"; 
					
					beltEl.style.transform = "translate(-50%, -50%)";
					beltEl.style.borderRadius = "50%";
					
					// Asteroid (in belt)
					const bThick = belt.thickness || 15;
					const bColor = belt.color || "var(--text-muted)";
					
					beltEl.style.border = `${bThick}px Solid ${bColor}`;
					beltEl.style.boxShadow = `inset 0 0 10px ${bColor}, 0 0 10px ${bColor}`;
					
					beltEl.style.pointerEvents = "none";


					const beltLabel = mapContainer.createDiv();
					beltLabel.innerText = belt.name;
					beltLabel.style.position = "absolute";
					
					beltLabel.style.left = `calc(${belt.distance}% - ${bThick / 2}px)`;
					beltLabel.style.top = "50%";
					beltLabel.style.fontSize = "12px";
					beltLabel.style.textAlign = "center";

					if(isVertical){
						beltLabel.style.transform = "translate(-50%, -150%) rotateZ(-90deg)";
					}
					else{
						beltLabel.style.transform = "translate(-50%, -100%) rotateZ(0deg)";
					}
					
					attachInteractivity(beltLabel, belt.link, belt.name, bColor, 0, false);

					if (belt.asteroids && Array.isArray(belt.asteroids)) {
                        belt.asteroids.forEach((asteroid: any) => {
                            const asteroidEl = beltEl.createDiv();
                            asteroidEl.style.position = "absolute";
                            
                            const angleDeg = asteroid.angle || 0; 
							const angleRad = angleDeg * (Math.PI / 180);
							
							const cosVal = Math.cos(angleRad);
							const sinVal = Math.sin(angleRad);

							asteroidEl.style.left = `calc(50% + (50% + ${bThick / 2}px) * ${cosVal})`;
							asteroidEl.style.top = `calc(50% + (50% + ${bThick / 2}px) * ${sinVal})`;
                            asteroidEl.style.transform = "translate(-50%, -50%)";

                            asteroidEl.style.width = `${asteroid.size}px`;
                            asteroidEl.style.height = `${asteroid.size}px`;
                            asteroidEl.style.backgroundColor = "var(--text-normal)";
                            asteroidEl.style.borderRadius = "50%";
							
							const asteroidLabel = asteroidEl.createDiv();
							asteroidLabel.innerText = asteroid.name;

							asteroidLabel.style.position = "absolute";
							asteroidLabel.style.left = "50%";
							
							if(isVertical){
								asteroidLabel.style.transform = "translate(-50%, -150%) rotateZ(-90deg)";
							}
							else{
								asteroidLabel.style.transform = "translate(-50%, -100%) rotateZ(0deg)";
							}

							asteroidLabel.style.textAlign = "center";
							asteroidLabel.style.fontSize = "9px";
							asteroidLabel.style.whiteSpace = "nowrap";

                            asteroidEl.style.pointerEvents = "auto";

							asteroid.link = asteroid.link || asteroid.name;
                            attachInteractivity(asteroidEl, asteroid.link, asteroid.name, "var(--text-normal)", asteroid.size, true);
                        });
                    }
				});
			}

			//If there's planet data, we do the planets.
			if (data && data.planets && Array.isArray(data.planets)) {
				
				data.planets.forEach((planet: any) => {
					//========================================================================================================
					//Orbit marker
					const orbit = mapContainer.createDiv();
					orbit.style.position = "absolute";
					
					orbit.style.left = `${sunCenterX}px`;
					orbit.style.top = "50%";
					
					orbit.style.width = `calc(${(absSunCenter * 2)+5}px + ${planet.distance * 2}%)`;
					orbit.style.aspectRatio = "1 / 1"; 
					
					orbit.style.transform = "translate(-50%, -50%)";
					orbit.style.borderRadius = "50%";	
					
					orbit.style.border = `4px Solid ${orbitColor}`;
					orbit.style.pointerEvents = "none";
					//========================================================================================================
					
					const planetEl = mapContainer.createDiv();

					planetEl.style.position = "absolute";
					planetEl.style.left = `${planet.distance}%`; 
					planetEl.style.top = "50%";
					planetEl.style.width = `${planet.size}px`;
					planetEl.style.height = `${planet.size}px`;
					planetEl.style.transform = "translate(-50%, -50%)";
					
					// We tell the "browser" to treat this container as a 3D coordinate space. Without this the rings don't actually work and I cry.
					planetEl.style.transformStyle = "preserve-3d";

					// Draw the Planet Sphere at Z=0
					const sphere = planetEl.createDiv();
					sphere.style.position = "absolute";
					sphere.style.top = "0";
					sphere.style.left = "0";
					sphere.style.width = "100%";
					sphere.style.height = "100%";
					sphere.style.backgroundColor = planetColor;
					sphere.style.borderRadius = "50%";

					planet.link = planet.link || planet.name;
					attachInteractivity(sphere, planet.link, planet.name, planetColor, planet.size, true);

					if (planet.rings) {
						const ringWidth = (planet.size) + (planet.rings.size ?? 20);
						const ringThickness = planet.rings.thickness ?? 6;
						
						const ring = planetEl.createDiv();
						ring.style.position = "absolute";
						ring.style.top = "50%";
						ring.style.left = "50%";
						
						ring.style.width = `${ringWidth}px`;
						ring.style.height = `${ringWidth}px`;
						ring.style.borderRadius = "50%";
						ring.style.border = `${ringThickness}px solid ${ringColor}`;
						
						ring.style.transform = `translate(-50%, -50%) rotateZ(${planet.rings.zRot ?? -20}deg) rotateX(${planet.rings.xRot ?? 75}deg)`;
						ring.style.pointerEvents = "none";
					}

					const labelEl = planetEl.createDiv();
					labelEl.innerText = planet.name;

					labelEl.style.position = "absolute";
					labelEl.style.left = "50%"; 
					
					if(labelRot != 0){
						labelEl.style.transformOrigin = "left bottom";
						labelEl.style.rotate = `${labelRot}deg`;
					}else labelEl.style.transform = "translateX(-50%)";
					
					labelEl.style.fontSize = "12px";
					labelEl.style.whiteSpace = "nowrap";
					
					let ringWidth = 0;
					let xRot = 0;
					let zRot = 0;
					let visualRingHeight = 0;
					let topOffset = 0;
					let topDrop = 0;

					if (planet.rings) {
						ringWidth = (planet.size || 10) + (planet.rings.size ?? 20);
						xRot = Math.abs(planet.rings.xRot ?? 75)* (Math.PI / 180); 
						zRot = Math.abs(planet.rings.zRot ?? -20)* (Math.PI / 180);
						
						visualRingHeight = (ringWidth / 2.5) * Math.sqrt(Math.pow(Math.sin(zRot), 2) + Math.pow(Math.cos(xRot), 2) * Math.pow(Math.cos(zRot), 2));
						topOffset = visualRingHeight;
						
						labelEl.style.top = `-${Math.max(topOffset,25)}px`; 
					} else {
						labelEl.style.top = "-25px"; 
					}

					// Lua drawing
					if (planet.moons && Array.isArray(planet.moons)) {
						const moonListEl = planetEl.createDiv();
						moonListEl.style.position = "absolute";
						moonListEl.style.top = "100%"; 
						moonListEl.style.left = "50%";
						
						if (planet.rings) {
							topDrop = Math.max(topOffset-20,15); 
						}
						else {topDrop = 15;}  
						
						const rowHeight = 16;  
						const rowMargin = 8;   
						
						moonListEl.style.paddingTop = `${topDrop}px`;
						
						const lineEl = moonListEl.createDiv();
						lineEl.style.position = "absolute";
						lineEl.style.left = "0";
						lineEl.style.top = "0";
						lineEl.style.width = "1px";
						lineEl.style.backgroundColor = luaLineColor;
						lineEl.style.zIndex = "-1"; 
						
						const totalRowSpace = rowHeight + rowMargin;
						const exactHeight = topDrop + ((planet.moons.length - 1) * totalRowSpace) + (rowHeight / 2);
						lineEl.style.height = `${exactHeight}px`;

						// Lua drawing proper
						planet.moons.forEach((moon: any) => {
							const mSize = moon.size || 4;
							
							const moonRow = moonListEl.createDiv();
							moonRow.style.position = "relative";
							
							moonRow.style.height = `${rowHeight}px`;
							moonRow.style.marginBottom = `${rowMargin}px`;

							const moonDot = moonRow.createDiv();
							moonDot.style.position = "absolute";
							moonDot.style.width = `${mSize}px`;
							moonDot.style.height = `${mSize}px`;
							moonDot.style.backgroundColor = luaColor;
							moonDot.style.borderRadius = "50%";
							moonDot.style.left = "0"; 
							moonDot.style.top = "50%";
							moonDot.style.transform = "translate(-45%, -50%)";
							moon.link = moon.link || moon.name;

							attachInteractivity(moonDot, moon.link, moon.name, luaColor, moon.size, true);

							const moonLabel = moonRow.createDiv();
							moonLabel.innerText = moon.name;
							moonLabel.style.position = "absolute";
							moonLabel.style.left = `${(mSize / 2) + 8}px`; 
							moonLabel.style.top = "50%";
							moonLabel.style.transform = "translateY(-50%)";
							if(isVertical) {
								moonLabel.style.transformOrigin = "left top";
								moonLabel.style.transform = "translateX(-10%) translateY(-50%) rotateZ(-45deg)";
							}
							moonLabel.style.fontSize = "10px";
							moonLabel.style.color = luaLineColor;
							moonLabel.style.whiteSpace = "nowrap"; 
						});
					}
				});
			}
		});
	}

	onunload() {
		console.log('Star Map plugin unloading...');
	}
}