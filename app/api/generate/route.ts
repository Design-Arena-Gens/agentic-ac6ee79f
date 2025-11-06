import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sceneDescription, language } = await request.json();

    const breakdown = generateVFXBreakdown(sceneDescription, language);

    return NextResponse.json({ breakdown });
  } catch (error) {
    console.error("Error generating breakdown:", error);
    return NextResponse.json(
      { error: "Failed to generate breakdown" },
      { status: 500 }
    );
  }
}

function generateVFXBreakdown(
  sceneDescription: string,
  language: "marathi" | "english"
): string {
  const isMarathi = language === "marathi";

  // Parse scene elements
  const hasExplosion = /explosi|blast|boom/i.test(sceneDescription);
  const hasFire = /fire|flame|burn/i.test(sceneDescription);
  const hasSmoke = /smoke|fog|mist/i.test(sceneDescription);
  const hasRain = /rain|water|storm/i.test(sceneDescription);
  const hasLightning = /lightning|thunder|electric/i.test(sceneDescription);
  const hasMagic = /magic|portal|glow|energy|mystic/i.test(sceneDescription);
  const hasDragon = /dragon|creature|beast/i.test(sceneDescription);
  const isSunset = /sunset|dusk|golden hour/i.test(sceneDescription);
  const isNight = /night|dark|moon/i.test(sceneDescription);
  const isSlowMotion = /slow.?motion|slo.?mo/i.test(sceneDescription);
  const hasDebris = /debris|shatter|destroy|break/i.test(sceneDescription);

  let breakdown = isMarathi
    ? `# 🎬 VFX Pipeline Breakdown | व्हीएफएक्स पाइपलाइन विश्लेषण\n\n`
    : `# 🎬 VFX Pipeline Breakdown\n\n`;

  breakdown += isMarathi
    ? `**Scene विवरण:** ${sceneDescription}\n\n---\n\n`
    : `**Scene Description:** ${sceneDescription}\n\n---\n\n`;

  // Stage 1: Pre-Production & Scene Layout
  breakdown += isMarathi
    ? `## 1️⃣ Pre-Production & Scene Layout | प्री-प्रोडक्शन आणि Scene रचना\n\n`
    : `## 1️⃣ Pre-Production & Scene Layout\n\n`;

  breakdown += isMarathi
    ? `### Environment Setup | वातावरण सेटअप\n`
    : `### Environment Setup\n`;

  breakdown +=
    `- **Software Recommendation:** Blender 4.0+ / Houdini / Maya\n`;
  breakdown += `- **Scene Units:** Metric (meters)\n`;
  breakdown += `- **Frame Rate:** ${isSlowMotion ? "120 fps (for 5x slow motion playback at 24fps)" : "24 fps (cinematic standard)"}\n`;
  breakdown += `- **Resolution:** 3840x2160 (4K) or 1920x1080 (HD)\n`;
  breakdown += `- **Aspect Ratio:** 16:9 (widescreen cinematic)\n\n`;

  breakdown += isMarathi
    ? `### Asset Requirements | आवश्यक Assets\n`
    : `### Asset Requirements\n`;

  if (hasDragon) {
    breakdown += isMarathi
      ? `- Dragon 3D model (rigged with joints for flight animation)\n`
      : `- Dragon 3D model (rigged with joints for flight animation)\n`;
    breakdown += `- Scales texture (4K PBR: diffuse, normal, roughness)\n`;
  }
  breakdown += `- Environment ${isMarathi ? "मॉडेल्स" : "models"} (${hasDragon ? "castle, mountains" : "forest, ruins, city buildings"})\n`;
  breakdown += `- HDRI ${isMarathi ? "नकाशा" : "map"} (${isSunset ? "sunset/golden hour" : isNight ? "night sky" : "daylight"})\n\n`;

  breakdown += `---\n\n`;

  // Stage 2: Particle Simulation
  breakdown += isMarathi
    ? `## 2️⃣ Particle Simulation | कण सिम्युलेशन\n\n`
    : `## 2️⃣ Particle Simulation\n\n`;

  if (hasFire) {
    breakdown += isMarathi
      ? `### Fire Simulation | आग सिम्युलेशन\n`
      : `### Fire Simulation\n`;
    breakdown += `- **Emitter Type:** Volume (sphere/cone based on source)\n`;
    breakdown += `- **Particle Count:** 500,000 - 1,000,000\n`;
    breakdown += `- **Temperature:** 1200K - 2000K\n`;
    breakdown += `- **Fuel:** 0.8 - 1.0\n`;
    breakdown += `- **Velocity:** 3-8 m/s (upward)\n`;
    breakdown += `- **Turbulence:** 2.5 | Noise Scale: 1.2\n`;
    breakdown += `- **Color Ramp:** Black → Deep Orange → Yellow → White (blackbody gradient)\n`;
    breakdown += `- **Simulation Steps:** 3-5 substeps for smooth motion\n\n`;
  }

  if (hasSmoke) {
    breakdown += isMarathi
      ? `### Smoke/Fog Simulation | धूर/धुके सिम्युलेशन\n`
      : `### Smoke/Fog Simulation\n`;
    breakdown += `- **Emitter Type:** ${hasFire ? "Secondary emission from fire" : "Ground plane"}\n`;
    breakdown += `- **Density:** 0.5 - 2.0\n`;
    breakdown += `- **Vorticity:** 0.3 (for swirling motion)\n`;
    breakdown += `- **Dissipation:** 50-100 frames (smoke fade time)\n`;
    breakdown += `- **Wind Force:** ${hasLightning ? "8-12 m/s (storm)" : "1-3 m/s"}\n`;
    breakdown += `- **Advection Quality:** High (3-5 samples)\n\n`;
  }

  if (hasRain) {
    breakdown += isMarathi
      ? `### Rain System | पाऊस प्रणाली\n`
      : `### Rain System\n`;
    breakdown += `- **Particle System:** Hair/Point particles\n`;
    breakdown += `- **Count:** 100,000 - 500,000\n`;
    breakdown += `- **Velocity:** -15 to -25 m/s (downward)\n`;
    breakdown += `- **Size:** 0.01m length, 0.001m width\n`;
    breakdown += `- **Wind Turbulence:** 3-5 (for diagonal rain effect)\n`;
    breakdown += `- **Collision:** Ground plane with splash secondary particles\n`;
    breakdown += `- **Motion Blur:** Essential for realism\n\n`;
  }

  if (hasLightning) {
    breakdown += isMarathi
      ? `### Lightning Effects | वीज प्रभाव\n`
      : `### Lightning Effects\n`;
    breakdown += `- **Type:** Procedural bolt generation or pre-made lightning texture\n`;
    breakdown += `- **Emission Strength:** 50-100 (HDR lighting)\n`;
    breakdown += `- **Branch Count:** 3-7 secondary branches\n`;
    breakdown += `- **Flicker:** 2-3 frame duration\n`;
    breakdown += `- **Color:** Blue-white (6500K-9000K)\n\n`;
  }

  if (hasMagic) {
    breakdown += isMarathi
      ? `### Magic/Energy Particles | जादूचे/ऊर्जा कण\n`
      : `### Magic/Energy Particles\n`;
    breakdown += `- **Emitter:** Portal edge or character hands\n`;
    breakdown += `- **Particle Count:** 50,000 - 200,000\n`;
    breakdown += `- **Velocity:** Swirling/orbiting motion (force fields)\n`;
    breakdown += `- **Size:** 0.005m - 0.02m (varied)\n`;
    breakdown += `- **Color:** Blue-purple gradient with emission\n`;
    breakdown += `- **Emission Strength:** 5-10\n`;
    breakdown += `- **Lifespan:** 60-120 frames\n`;
    breakdown += `- **Turbulence:** 1.5 | Noise: Voronoi\n\n`;
  }

  if (hasExplosion || hasDebris) {
    breakdown += isMarathi
      ? `### Debris/Shatter Simulation | भग्नावशेष/तुकडे सिम्युलेशन\n`
      : `### Debris/Shatter Simulation\n`;
    breakdown += `- **Rigid Body Physics:** Enabled\n`;
    breakdown += `- **Fragment Count:** 500-2000 pieces\n`;
    breakdown += `- **Explosion Force:** 50-200 (radial outward)\n`;
    breakdown += `- **Gravity:** -9.8 m/s²\n`;
    breakdown += `- **Collision Margin:** 0.01m\n`;
    breakdown += `- **Damping:** 0.05 (for air resistance)\n`;
    breakdown += `- **Material:** Concrete/Glass/Metal with fracture textures\n\n`;
  }

  breakdown += `---\n\n`;

  // Stage 3: Lighting Setup
  breakdown += isMarathi
    ? `## 3️⃣ Lighting & Shadows | प्रकाश आणि सावल्या\n\n`
    : `## 3️⃣ Lighting & Shadows\n\n`;

  breakdown += isMarathi
    ? `### HDRI Environment | HDRI वातावरण\n`
    : `### HDRI Environment\n`;

  if (isSunset) {
    breakdown += `- **HDRI Map:** Sunset/Golden Hour (warm orange-pink tones)\n`;
    breakdown += `- **Rotation:** 45-90° for optimal sun position\n`;
    breakdown += `- **Strength:** 1.5 - 2.0\n\n`;
  } else if (isNight) {
    breakdown += `- **HDRI Map:** Night sky with stars/moon\n`;
    breakdown += `- **Strength:** 0.3 - 0.8 (dark ambient)\n\n`;
  } else {
    breakdown += `- **HDRI Map:** Overcast or clear daylight\n`;
    breakdown += `- **Strength:** 1.0 - 1.5\n\n`;
  }

  breakdown += isMarathi
    ? `### Three-Point Lighting | तीन-बिंदू प्रकाश\n`
    : `### Three-Point Lighting\n`;

  breakdown += `**1. Key Light (मुख्य प्रकाश)**\n`;
  breakdown += `- Type: Area light / Sun lamp\n`;
  breakdown += `- Position: ${isSunset ? "Low angle (15-20° above horizon)" : "45° angle from subject"}\n`;
  breakdown += `- Color: ${isSunset ? "Warm orange (2500K)" : isNight ? "Cool blue (8000K)" : "Neutral white (5500K)"}\n`;
  breakdown += `- Strength: ${hasExplosion || hasFire ? "50-100" : "10-30"}\n`;
  breakdown += `- Shadow: ${isNight ? "Soft (large area)" : "Hard (sun)"}\n\n`;

  breakdown += `**2. Fill Light (भरपूर प्रकाश)**\n`;
  breakdown += `- Type: Soft area light\n`;
  breakdown += `- Position: Opposite side of key, lower intensity\n`;
  breakdown += `- Color: ${isSunset ? "Purple-blue (6500K)" : "Sky blue (7000K)"}\n`;
  breakdown += `- Strength: 30% of key light\n`;
  breakdown += `- Shadow: Very soft / off\n\n`;

  breakdown += `**3. Rim/Back Light (रिम प्रकाश)**\n`;
  breakdown += `- Type: Spot light\n`;
  breakdown += `- Position: Behind subject, 45° up\n`;
  breakdown += `- Color: ${hasLightning ? "Blue-white (flash)" : isSunset ? "Golden yellow" : "White"}\n`;
  breakdown += `- Strength: 50-80% of key\n`;
  breakdown += `- Purpose: Edge highlight, depth separation\n\n`;

  if (hasFire || hasMagic || hasLightning) {
    breakdown += isMarathi
      ? `### Practical Lights | व्यावहारिक प्रकाश\n`
      : `### Practical Lights\n`;
    if (hasFire)
      breakdown += `- Fire emission: Orange glow, flickering animation (noise modifier)\n`;
    if (hasMagic)
      breakdown += `- Portal/magic glow: Blue-purple emission, pulsing animation\n`;
    if (hasLightning)
      breakdown += `- Lightning flash: High-intensity burst (2-3 frames), blue-white\n`;
    breakdown += `\n`;
  }

  breakdown += `---\n\n`;

  // Stage 4: Camera Setup
  breakdown += isMarathi
    ? `## 4️⃣ Camera Setup | कॅमेरा सेटअप\n\n`
    : `## 4️⃣ Camera Setup\n\n`;

  breakdown += `### Camera Settings\n`;
  breakdown += `- **Focal Length:** ${hasDragon || hasExplosion ? "24mm (wide-angle, epic scale)" : hasMagic ? "50mm (standard, intimate)" : "35mm (cinematic standard)"}\n`;
  breakdown += `- **Sensor Size:** Full Frame (36x24mm)\n`;
  breakdown += `- **F-Stop:** f/2.8 - f/4 (cinematic depth of field)\n`;
  breakdown += `- **Focus:** ${hasDragon ? "Dragon body (hero subject)" : hasMagic ? "Portal center" : "Main action point"}\n`;
  breakdown += `- **Depth of Field:** Enabled (background slight blur)\n\n`;

  breakdown += isMarathi
    ? `### Camera Movement | कॅमेरा हालचाल\n`
    : `### Camera Movement\n`;

  if (hasDragon) {
    breakdown += `- **Type:** Aerial tracking shot\n`;
    breakdown += `- **Motion:** Follow dragon flight path, sweeping arc\n`;
    breakdown += `- **Speed:** Medium (3-5 m/s), smooth ease in/out\n`;
    breakdown += `- **Shake:** Subtle (0.02m amplitude) for realism\n\n`;
  } else if (hasMagic) {
    breakdown += `- **Type:** Slow push-in (dolly forward)\n`;
    breakdown += `- **Motion:** Linear approach to portal, 2-3 m total\n`;
    breakdown += `- **Speed:** Slow (0.5 m/s)\n`;
    breakdown += `- **Stabilization:** Smooth, no shake\n\n`;
  } else if (hasExplosion) {
    breakdown += `- **Type:** Handheld shake + slight pull-back\n`;
    breakdown += `- **Motion:** React to explosion shockwave\n`;
    breakdown += `- **Shake:** High (0.1-0.2m amplitude) for 1-2 seconds\n`;
    breakdown += `- **Speed:** Variable, responsive to action\n\n`;
  } else {
    breakdown += `- **Type:** Static or subtle pan\n`;
    breakdown += `- **Motion:** Minimal movement, let action drive scene\n`;
    breakdown += `- **Stabilization:** Cinematic smooth\n\n`;
  }

  if (isSlowMotion) {
    breakdown += isMarathi
      ? `### Slow Motion टीप\n`
      : `### Slow Motion Note\n`;
    breakdown += `- Render at **120 fps** (or higher)\n`;
    breakdown += `- Playback at **24 fps** = 5x slow motion\n`;
    breakdown += `- Ensure particle simulations match high frame rate\n\n`;
  }

  breakdown += `---\n\n`;

  // Stage 5: Rendering
  breakdown += isMarathi
    ? `## 5️⃣ Rendering | रेंडरिंग\n\n`
    : `## 5️⃣ Rendering\n\n`;

  breakdown += `### Render Engine\n`;
  breakdown += `- **Engine:** Cycles (path tracing) / Eevee (real-time preview)\n`;
  breakdown += `- **Device:** GPU (CUDA/OptiX for NVIDIA, HIP for AMD)\n`;
  breakdown += `- **Samples:** ${hasComplexEffects(hasFire, hasSmoke, hasMagic, hasLightning) ? "512-1024 (high quality)" : "256-512 (balanced)"}\n`;
  breakdown += `- **Denoising:** Intel Open Image Denoise (OIDN) - enabled\n`;
  breakdown += `- **Max Bounces:** Light: 12, Diffuse: 4, Glossy: 4, Transmission: 12\n\n`;

  breakdown += `### Render Layers | ${isMarathi ? "रेंडर थर" : "Render Layers"}\n`;
  breakdown += `1. **Beauty Pass** - Final combined image\n`;
  breakdown += `2. **Diffuse Pass** - Base color without lighting\n`;
  breakdown += `3. **Emission Pass** - ${hasFire || hasMagic ? "Fire/magic glow" : "Self-illuminated elements"}\n`;
  breakdown += `4. **Shadow Pass** - Isolated shadows for control\n`;
  breakdown += `5. **Z-Depth Pass** - Depth map for DOF in compositing\n`;
  breakdown += `6. **Cryptomatte** - Object/material ID masks\n`;
  if (hasSmoke || hasFire) breakdown += `7. **Volume Pass** - Smoke/fire isolated\n`;
  breakdown += `\n`;

  breakdown += `### Output Settings\n`;
  breakdown += `- **Format:** OpenEXR (32-bit float, lossless)\n`;
  breakdown += `- **Color Space:** Linear / ACEScg\n`;
  breakdown += `- **Resolution:** 3840x2160 @ ${isSlowMotion ? "120fps" : "24fps"}\n`;
  breakdown += `- **Frame Range:** 1-240 (10 seconds @ 24fps)\n\n`;

  breakdown += `---\n\n`;

  // Stage 6: Compositing
  breakdown += isMarathi
    ? `## 6️⃣ Compositing & Color Grading | कम्पोझिटिंग आणि रंग ग्रेडिंग\n\n`
    : `## 6️⃣ Compositing & Color Grading\n\n`;

  breakdown += `### Software\n`;
  breakdown += `- Blender Compositor / Nuke / After Effects / DaVinci Resolve Fusion\n\n`;

  breakdown += isMarathi
    ? `### Compositing Layers | कम्पोझिटिंग थर\n`
    : `### Compositing Layers\n`;
  breakdown += `1. **Background** - Environment/sky\n`;
  breakdown += `2. **Middleground** - ${hasDragon ? "Dragon/main character" : "Main action/effects"}\n`;
  breakdown += `3. **Foreground** - ${hasRain ? "Rain particles" : "Debris/particles"}\n`;
  breakdown += `4. **FX Layers** - Fire/smoke/magic isolated\n`;
  breakdown += `5. **Atmospheric** - God rays, haze, fog\n`;
  breakdown += `6. **Vignette** - Edge darkening for focus\n\n`;

  breakdown += `### Blending Modes\n`;
  breakdown += `- Emission/glow elements: **Add** or **Screen**\n`;
  breakdown += `- Shadows: **Multiply** (0.6-0.8 opacity)\n`;
  breakdown += `- Atmospheric effects: **Overlay** or **Soft Light**\n`;
  breakdown += `- Particles: **Add** with bloom/glow\n\n`;

  breakdown += isMarathi
    ? `### Color Grading | रंग ग्रेडिंग\n`
    : `### Color Grading\n`;

  if (isSunset) {
    breakdown += `**Sunset/Golden Hour Look:**\n`;
    breakdown += `- Lift: +0.05 (shadows warmer, orange tint)\n`;
    breakdown += `- Gamma: +0.1 (midtones golden)\n`;
    breakdown += `- Gain: -0.05 (highlights orange-pink)\n`;
    breakdown += `- Saturation: +15% (rich colors)\n`;
    breakdown += `- Temperature: Warm (+200K in shadows, +500K in highlights)\n\n`;
  } else if (isNight) {
    breakdown += `**Night/Dark Look:**\n`;
    breakdown += `- Lift: -0.1 (crush blacks)\n`;
    breakdown += `- Gamma: -0.05 (darker midtones)\n`;
    breakdown += `- Gain: Blue tint in highlights\n`;
    breakdown += `- Saturation: -10% (desaturate slightly)\n`;
    breakdown += `- Temperature: Cool (-300K)\n\n`;
  } else if (hasExplosion) {
    breakdown += `**Action/Explosion Look:**\n`;
    breakdown += `- Lift: Slight blue in shadows\n`;
    breakdown += `- Gamma: +0.05 (brighten action)\n`;
    breakdown += `- Gain: Orange in highlights (fire glow)\n`;
    breakdown += `- Saturation: +20% (vibrant, energetic)\n`;
    breakdown += `- Contrast: +15% (punch)\n\n`;
  } else {
    breakdown += `**Standard Cinematic Grade:**\n`;
    breakdown += `- Lift: +0.02 (lift blacks slightly)\n`;
    breakdown += `- Gamma: Neutral\n`;
    breakdown += `- Gain: -0.02 (control highlights)\n`;
    breakdown += `- Saturation: +10%\n`;
    breakdown += `- Contrast: +10%\n\n`;
  }

  breakdown += `### Post Effects\n`;
  breakdown += `- **Bloom/Glow:** Threshold 0.8, intensity 0.3 (for ${hasFire || hasMagic ? "fire/magic" : "bright elements"})\n`;
  breakdown += `- **Chromatic Aberration:** 0.5-1.0 pixels (lens realism)\n`;
  breakdown += `- **Film Grain:** 0.02-0.05 intensity (cinematic texture)\n`;
  breakdown += `- **Vignette:** Radial gradient, 0.3-0.5 strength\n`;
  if (isSlowMotion || hasExplosion)
    breakdown += `- **Motion Blur:** 0.5 shutter (180° rule)\n`;
  breakdown += `\n`;

  breakdown += `---\n\n`;

  // Stage 7: Export & Delivery
  breakdown += isMarathi
    ? `## 7️⃣ Export & Delivery | निर्यात आणि वितरण\n\n`
    : `## 7️⃣ Export & Delivery\n\n`;

  breakdown += `### Final Output Formats\n`;
  breakdown += `**For Client Review:**\n`;
  breakdown += `- Format: **H.264/MP4** (ProRes 422 for high quality)\n`;
  breakdown += `- Codec: H.264, High Profile\n`;
  breakdown += `- Bitrate: 50-100 Mbps (4K), 20-40 Mbps (HD)\n`;
  breakdown += `- Container: .mp4 or .mov\n\n`;

  breakdown += `**For Final Delivery:**\n`;
  breakdown += `- Format: **ProRes 4444 XQ** (with alpha if needed)\n`;
  breakdown += `- Color Space: Rec.2020 (HDR) or Rec.709 (SDR)\n`;
  breakdown += `- Audio: 48kHz, 24-bit (if applicable)\n\n`;

  breakdown += `**For Archive:**\n`;
  breakdown += `- **OpenEXR sequence** (uncompressed, 32-bit)\n`;
  breakdown += `- **Project files** (.blend / .hip / .nk)\n`;
  breakdown += `- **Asset library** (models, textures, caches)\n\n`;

  breakdown += `---\n\n`;

  // Optimization Tips
  breakdown += isMarathi
    ? `## 🎯 Optimization Tips | ऑप्टिमायझेशन टिप्स\n\n`
    : `## 🎯 Optimization Tips\n\n`;

  breakdown += `### Performance\n`;
  breakdown += `- Use **adaptive sampling** to reduce render time on simple areas\n`;
  breakdown += `- Enable **persistent data** for faster GPU rendering\n`;
  breakdown += `- Bake simulations (smoke/fire) to cache files\n`;
  breakdown += `- Use **render region** for test renders\n`;
  breakdown += `- Optimize particle count: reduce where not visible\n\n`;

  breakdown += `### Quality\n`;
  breakdown += `- Use **subdivision surface** on hero models only\n`;
  breakdown += `- 4K textures for close-ups, 2K for background\n`;
  breakdown += `- Enable **motion blur** for realism (essential in slow-mo)\n`;
  breakdown += `- Use **light linking** to control which lights affect which objects\n`;
  breakdown += `- Add subtle **camera imperfections** (dust, lens distortion)\n\n`;

  breakdown += `---\n\n`;

  // Pipeline Summary
  breakdown += isMarathi
    ? `## 📋 Pipeline Summary | पाइपलाइन सारांश\n\n`
    : `## 📋 Pipeline Summary\n\n`;

  breakdown += `**Timeline Estimate:**\n`;
  breakdown += `1. Pre-production & asset gathering: 1-2 days\n`;
  breakdown += `2. Scene layout & blocking: 1 day\n`;
  breakdown += `3. Particle simulation & caching: 2-3 days\n`;
  breakdown += `4. Lighting setup & testing: 1-2 days\n`;
  breakdown += `5. Render (${isSlowMotion ? "240 frames @ 120fps" : "240 frames @ 24fps"}): ${hasComplexEffects(hasFire, hasSmoke, hasMagic, hasLightning) ? "2-4 days" : "1-2 days"} (GPU farm)\n`;
  breakdown += `6. Compositing & color grade: 1-2 days\n`;
  breakdown += `7. Final export & delivery: 0.5 day\n\n`;
  breakdown += `**Total:** ${hasComplexEffects(hasFire, hasSmoke, hasMagic, hasLightning) ? "8-14" : "6-10"} days (single artist)\n\n`;

  breakdown += isMarathi
    ? `**शुभेच्छा! तुमचा VFX शॉट यशस्वी व्हावा!** 🎬✨\n`
    : `**Good luck with your VFX shot!** 🎬✨\n`;

  return breakdown;
}

function hasComplexEffects(
  fire: boolean,
  smoke: boolean,
  magic: boolean,
  lightning: boolean
): boolean {
  return (
    [fire, smoke, magic, lightning].filter((effect) => effect).length >= 2
  );
}
