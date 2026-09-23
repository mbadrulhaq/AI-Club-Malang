---
name: "seedance-25-prompt"
description: "Write production-ready Seedance 2.5 video prompts for any topic. Shows a short plain-language preview first so you can approve the shot before spending credits, offers a one-image storyboard contact sheet to validate framing and likeness, then picks a structural spine, builds a timestamped beat sheet with camera, performance, physics and audio direction, binds reference assets, and outputs a copy-paste prompt plus an asset table file for the Higgsfield web UI. Use whenever the user wants a Seedance prompt, a Seedance 2.5 video, an AI video prompt from a topic or script, a reference-to-video / keyframe / storyboard prompt, a storyboard test image before generating video, or wants to edit or extend an existing Seedance video."
---

# Seedance 2.5 Prompt Director

Turn any topic into a production-ready Seedance 2.5 prompt. You are not formatting a request. You are directing a 30-second film: structure, staging, performance, physics, light and sound. The prompt is the direction.

Target platform: **Higgsfield web UI, pasted manually.** No API parameters, no MCP calls. The user uploads reference assets in the UI and sets duration and aspect ratio with the UI controls.

## Defaults (apply silently unless the user overrides)

- 30 seconds, 16:9 horizontal, cinematic quality declaration
- Prompt body written in English. Voiceover, dialogue and on-screen text in whatever language the topic demands
- Design around reference assets the user already has. Never assume they can produce new ones
- Brand or wordmark ending only when there is an actual brand or product. Narrative and educational pieces get a story ending
- One prompt per request, plus a fix-it section
- **Never show a prompt before showing the plain-language preview.** The prompt is written for the model. The preview is written for the user, and it is what they approve
- **Never use an em dash inside a prompt body.** Use hyphens, commas or periods. This applies to the prompt only, not to your conversation with the user

---

## Operating procedure

### Phase 0 - Route the mode

Read the request and classify. This determines which rules bind.

| Signal in request | Mode | Consequence |
|---|---|---|
| Topic only, no assets | Text to video | Free choice of duration and aspect |
| "Use this character / style / place", images attached | Reference to video | Free choice of duration and aspect. Bind every asset |
| "Follow these frames exactly", ordered images | Keyframe reference | Open with "Use Images 1 to N in order as keyframes." Visuals align closely |
| A multi-panel storyboard image | Storyboard reference | Loose plot guidance only. 15 panels or fewer, line art preferred. Fill in what the panels do not show |
| "add / remove / replace / change / delete" plus an existing video | **Editing (LOCKED)** | Aspect ratio locked to input video, duration approximately locked. Recommend `mov` output |
| "continue / extend / carry on from" plus a video | **Extension (LOCKED)** | Aspect ratio locked to input. Duration user-chosen. Recommend `mov` for input and output |
| One image as opening frame | First frame (LOCKED) | Aspect ratio locked to that image. State in text: "Image 1 is the first frame." |
| Grey or untextured 3D animatic supplied | 3D clay-model render | State exactly which elements to reference (camera, motion, lighting, rhythm) and which to ignore |
| Two videos, "join these" | Seamless transition | Describe the missing in-between segment and the transition mechanics |
| A pile of stills, "make something" | One-click creation | Describe style, music, and that originals should not be altered |

**Critical trap:** the words *add, insert, remove, delete, modify, replace, change to* silently trigger edit mode. Never use them casually in a creation prompt. Write "a bird enters frame", not "add a bird". When you *do* want an edit, use them deliberately.

### Phase 1 - Offer spine options

Never start writing until a spine is chosen. Propose **2 to 3 spines** from the library below, each in one or two sentences applied concretely to the user's topic, and ask which they want. If they say "you pick", take the first.

A spine is the single structural device that holds 30 seconds together. Without one you produce eight unrelated shots.

### Phase 2 - Plain-language preview, before anything technical

**Always show this first, and keep it short.** Before the beat grid and before the prompt, describe what the finished video will look like in plain English, as if telling someone who will never read a prompt.

Rules for the preview:

- One line per shot, in order, with its timestamp
- No craft vocabulary. No lens angles, no "protective lock", no "objective and obstacle", no spine names
- Say what is on screen, what moves, and what it sounds like
- Close with what the shot is *for*
- Under 150 words total

Format:

```
10 seconds. [One sentence covering the whole thing.]

0-3s   - [what you see, plainly]
3-6s   - [what you see, plainly]
6-10s  - [what you see, plainly]

Look:    [wardrobe, lighting, palette in one line]
Sound:   [one line]
Purpose: [why this shot exists in the film]
```

The user stops here if it is wrong, and that is the entire point. A rejected preview costs nothing. A rejected generation costs credits.

### Phase 3 - Offer the storyboard test sheet

After the preview, before the technical breakdown, offer this:

> "Want a storyboard image first? I can write one image prompt that renders all [N] shots as a single contact sheet. One image generation, and you see every framing, the wardrobe and the likeness before we spend anything on video."

Offer it unprompted whenever any of these is true, and say which one applies:

- The piece has 4 or more distinct shots
- A character reference is bound and identity consistency matters
- The user has mentioned credits, cost, or a previous bad generation
- The piece is one block of a multi-block film that has to cut together

Write it using the storyboard test sheet rules below. It is a **validation artefact, not a production asset.**

### Phase 4 - Show the full breakdown

Now the technical version. Show the user, compactly:

1. **Spine** - chosen structure, one line
2. **Constant / Variable** - what never changes, what transforms. This is the emotional engine
3. **Beat grid** - a table: timestamp, what happens, camera and framing, audio
4. **Camera vocabulary** - the 2 to 4 moves that constitute the entire film, plus the locked lens character
5. **Audio plan** - SFX per beat, music arc, VO lines, any deliberate silence
6. **Asset roles** - numbered table: asset, what it is, what it is referenced FOR, which beat it binds to

Let them course-correct here. It is far cheaper than rewriting 800 words of prompt.

### Phase 5 - Write the prompt

Use the skeleton, apply every craft rule below, then run Phase 6 before showing it.

### Phase 6 - Silent self-QA

Confirm all of the following before delivering. If any answer is no, fix it before output.

**Process**
- The plain-language preview was shown before any technical output
- The storyboard test sheet was offered if any of the four triggers applied
- Every reference trap in the credit-protection section has been checked against this prompt

**Structure**
- Timeline contiguous, integer seconds, no gaps (`0-3s, 3-7s, 7-12s`, never `0-3s ... 5-6s`)
- 3 to 5 seconds per beat, 6 to 9 beats for 30 seconds, nothing under 2 seconds carrying plot
- No beat is thin. A short beat is a lazy beat. Every beat carries an action, a reaction and a staging statement
- No accidental edit-trigger verbs in a creation prompt

**Subject and performance**
- Every subject block is active, none are stale or unused
- Where an image reference exists, appearance is not re-described. The budget went to behaviour instead
- Every character in frame has an objective and an obstacle, not a labelled emotion
- Every beat change is visible in the body, not merely named
- Eye life is present wherever a face is readable

**Staging**
- Screen position stated for every important subject in every beat
- Body facing direction and gaze direction both stated wherever a relationship matters
- No weak distance words survive: near, around, beside, somewhere, nearby, in the area
- The first frame of the film contains everyone it needs to contain

**Craft**
- Lens character locked and has not drifted between beats
- Lighting written as a constraint, not decoration, and is protected from going flat
- Physics stated: weight, inertia, follow-through, cloth and hair lag
- Camera assigned per beat, drawn only from the declared vocabulary, and the framings actually differ from one another
- Audio authored per beat, not left to the model
- Style declared once at top. Later beats note deviations only

**Seedance specifics**
- Every asset bound inline at the beat where it is used, not only in the header list
- Each asset's role stated: subject, style, environment, prop, logo, voice
- Negative constraints only in the reliable registers, which are subtitles and audio. Everything else phrased positively
- Asset counts within limits: 30 images, 10 videos, 10 audio, 50 total. 1 to 8 image subjects safe. Video refs 5 to 10 seconds each
- Locked and unlocked rules honoured for the routed mode
- No em dashes anywhere in the prompt body

### Phase 7 - Deliver

Show the finished prompt in chat as a clean copy-paste block. Then save a file to the outputs folder containing: the prompt, an upload order table, UI settings, the beat grid, and fix-it notes. If a storyboard test sheet was written, put it in the same file, above the video prompt, with a line saying to run it first. Present the file with `present_files`. Keep the closing message to a sentence or two.

---

## Spine library

Pick by asking: what is the one thing that persists across all 30 seconds?

**1. Character Arc** - one character undergoes an emotional transformation, start state to end state, with a clear turn.
Constant: the character. Variable: their state and the world's response.

**2. Object Through Time** - a single object travels, rolls, or is passed across eras, cultures or places, each stop in a different art style.
Constant: the object. Variable: era, style, civilisation.

**3. Motif Chain** - one visual idea recurs in many forms, each dissolving into the next, converging on a final reveal.
Constant: the shape or idea. Variable: every context it appears in.

**4. Constant Body, Changing World** - one continuous take follows a subject whose behaviour never varies while the world around them morphs.
Constant: the subject's pace and demeanour. Variable: everything else.
*Danger:* this spine fails if the subject has nothing to do. Give them at least one moment of physical contact with the world, or it plays as a mood piece.

**5. Fixed Frame, Swapping Worlds** - identical set geometry repeated N times, only style, palette, mood and window-view changing.
Constant: architecture and pace. Variable: art style and emotion per room.

**6. Procedure** - sequential steps, each a discrete shot with a stated camera, position, action and voiceover.
Constant: the object being operated on. Variable: the step.

**7. Place and Performance** - no protagonist arc. The camera is the protagonist, revealing a single locale through continuous movement.
Constant: the place. Variable: what the camera discovers.

**8. Two-Timeline Intercut** - a present-tense action line intercut with memory fragments in a distinct visual treatment.
Constant: forward motion of the present. Variable: memories that reframe it.

**9. Cause and Escalation** - one small action triggers a runaway consequence that overwhelms the frame, then resolves into a new equilibrium.
Constant: the trigger object. Variable: scale.

**10. Single Sustained Action** - the whole runtime is one continuous physical act: a breath-hold dive, a catch, a climb, a hold.
Constant: the act and the body performing it. Variable: strain, depth, light, sound.
This spine is the most reliable cure for "it felt ordinary", because effort and contact are what read as extraordinary.

---

## The prompt skeleton

Write in this order. Adapt section names to the piece, keep the order.

```
[1] ONE-LINE DECLARATION
Style, genre, subject, core directive, overall camera approach.

[2] ASSET BINDING  (omit if no refs)
Image 1: what it is, referenced for appearance / style / environment / logo.
Video 1: reference only its camera movement and motion, not its visuals.
Audio 1: referenced for timbre / music / SFX.
State mapping explicitly. Never rely on labels drawn inside the image.

[3] SUBJECT BLOCKS
One block per named character, creature or hero prop. See the formula below.

[4] GLOBAL CONSTANTS
What holds across every beat: set geometry, lighting law, palette, lens
character, physics, the subject's pace, recurring atmosphere, aspect ratio.

[5] BEAT SHEET - timestamped, contiguous
0-3s (camera move, framing, screen positions):
  Visual: ...
  Staging: who is left, who is right, relative scale, distance to landmark.
  Performance: objective, obstacle, what changes in the body.
  SFX: ...
  VO / Dialogue: "..."
3-7s (...):
  ...

[6] CLOSING BEAT
Story resolution, or brand beat if there is a product.

[7] OVERALL REQUIREMENTS
Consistency demands, physics, framing rules, and negative control:
"No subtitles." / "No BGM, environmental and action sounds only."
```

---

## The storyboard test sheet

One image generation that previews every shot in the piece, so framing, wardrobe, likeness and palette are all approved before a single video credit is spent. An image costs a fraction of a video. Use it.

**Sizing.** Grid follows the shot count: 4 shots is 2x2, 6 is 3x2, 8 is 4x2, 9 is 3x3. Never more than 9 panels, because detail collapses beyond that. If the film has more shots, sheet only the ones you are unsure about.

**Rules:**

- One or two sentences per panel: shot size, where the subject sits in the panel, what is behind them, what they are doing
- Carry the same character binding, palette and light law as the video prompt, condensed to a few lines
- **No text, no numbers, no labels inside the image.** Models render type badly and it wastes panel space. State panel order as reading order, left to right, top to bottom
- Thin uniform gutters. No drop shadows, no film-strip sprockets, no torn edges, no corkboard or clipboard framing, no hand-drawn borders
- Photoreal and matching the film's grade, unless the film itself is animated. Not sketch, not line art, not comic panels
- Sheet aspect: 16:9 for 2x2, 3x2 and 4x2. Square for 3x3

**Template:**

```
A [N]-panel photoreal storyboard contact sheet, [G] grid, read left to right,
top to bottom. Thin even white gutters between panels. No text, no numbers, no
labels, no borders, no drop shadows anywhere in the image.

[Character binding, condensed. Same wording as the video prompt.]

All panels share one look: [palette]. [Light law in one sentence.] [Grade in
one sentence.] Photoreal live action, not illustration.

Panel 1: [shot size]. [Subject position in panel]. [Background]. [Action.]
Panel 2: ...
...

Every panel shows the same woman with the same face. No panel is a duplicate
of another. Each panel is a different shot size or angle from every other.
```

**Reading the result.** Four questions, in this order:

1. **Is it the same person in every panel?** If a face cannot survive six panels of one image, it will not survive six beats of video. Stop and fix the binding.
2. **Are the framings actually different?** If four panels are all a centred medium, the film will read as a loop. Fix it here, not after generating.
3. **Is the palette holding across panels?**
4. **Does any panel look boring as a still?** It will look worse moving.

**Do not then upload the contact sheet as a reference for the video.** Multi-panel references leak their layout and produce split-screen output. If one panel is exactly right, crop it out as a standalone image and bind that single crop instead.

---

## Reference traps that waste credits

Every one of these has produced a failed generation. Check all of them before writing.

**A location reference containing a person will overwrite your character.** If Image 2 is "a Paris balcony" but a woman is standing on it, the model averages her face into your subject and you get a different woman. Either crop the person out, or drop the reference entirely and describe the location in text. Models render famous places well without help.

**Multi-panel references leak their layout.** A character turnaround or a contact sheet can produce a split-screen output instead of a scene. Whenever a bound reference has panels, add: *"The output is one single continuous scene. It is never a split frame, never a panel layout, never a composite, and never shows the same person twice."*

**Reference backdrops leak as well.** A character sheet shot on grey seamless will drag grey seamless into your location. Add: *"Do not reference the backdrop, the studio lighting or the pose."*

**"The lower half of her face" is read as "no face".** Any framing instruction that subtracts part of a person tends to subtract all of them. Describe what is in frame, never what is cut off. Where it matters, add a global rule: *"The subject's head is never cropped out of frame in any beat."*

**Fast cutting cannot be prompted, only edited.** A 30-second generation holds 6 to 8 beats before it starts averaging them together. If the piece needs one-second cutting, write short blocks with 2-second beats and trim them in an editor. Never ask for twelve beats in thirty seconds.

**Shorter generations hold identity better.** Fewer beats means fewer chances for a face to drift. When consistency matters more than convenience, split a 30-second piece into three 10-second blocks and paste the same Global Constants into all three, word for word. Any rewording between blocks shows up as a grade jump.

**Typography should never be generated.** Titles, lower thirds, pull quotes and captions come out malformed and inconsistent. Generate clean plates and add all type in the edit.

**Audio needs relative levels, not adjectives.** "Applause swells" produces applause at the same level as everything else. Name which sound is the loudest in the piece, which is the quietest, and where silence sits.

---

## Subject blocks

Every named character, creature or hero prop gets one block, placed above the beat sheet. The block fuses identity with performance so the subject arrives consistent *and* alive.

**When there is no image reference:**

```
@NAME: [age] [role or body type] [current physical state and action-critical
anchors]. [The psychological engine in one clause, what drives the physicality].
Voice: [pitch, accent, pace, how it shifts under pressure]. [One signature
physical tic and its trigger]. Eye life: [saccade and blink behaviour tied to
state]. [Scope tag.]
```

**When an image reference already exists, do not re-describe appearance.** This is the single most wasteful mistake in reference-to-video prompting, and the official guide warns against it directly. Write instead:

```
@NAME: Appearance from Image 1, build from Image 2, wardrobe from Image 3.
[Psychological engine]. Voice: [descriptor]. [Signature tic and trigger].
Eye life: [behaviour tied to state]. Behaviour and staging only.
```

Then spend the recovered budget on action, staging and emotion.

**Scope tags**, required at the end of every block: `Appearance only.` / `Behaviour and staging only.` / `Costume only.` / `Prop only.` / `Environment only.` / `Voice only.`

**Voice lines are fixed.** Write one voice line per speaking character, once, and paste it verbatim wherever they speak. Never rewrite it per beat. Omit entirely if the character is silent.

---

## Performance

**Objective against obstacle, never a labelled emotion.** Do not write "she is angry", "he is afraid", "she is calm". Write what they are trying to get, what is stopping them, and what they physically do about it. Labels produce the stiff, over-acted look that reads instantly as AI.

**Beat changes must be visible.** A beat changes when an objective is won, a tactic fails, or the balance of power shifts. Every beat change shows in the body: a pause, a change of posture, a shift in tempo, a change of gaze. If you cannot say what changed physically, the beat did not change.

**Give hands a task.** Wherever the scene allows, the character is doing something with their hands. The moment they stop is the accent of the beat.

**Reactions start early.** A reaction begins before the other party finishes, not after.

**Eye life is mandatory** in any beat where a face is readable:

- micro-saccades, small involuntary eye movements
- a blink rate and quality tied to the character's state, slow and heavy when tired, suppressed under threat
- live catchlights from a named source in the scene
- the eyes reaching a target a beat before the head turns

**Beware the label trap in "unreactive" characters.** "She never reacts, never flinches" is a state, not a playable objective. Pair it with something she *is* doing: holding a fixed point, controlling her breathing, refusing to break a stride. Otherwise the performance is empty and the film goes flat.

---

## Spatial blocking lock

For every important subject in every beat, define:

- **screen position** - left third, centre, right third, upper, lower
- **world position** - where in the environment
- **distance** - to a landmark or to another subject
- **body facing direction**
- **gaze direction** - stated separately from body direction whenever a relationship matters
- **movement direction**
- **depth** - foreground, midground or background

**Banned weak words:** near, around, beside, somewhere, nearby, in the area, close to.

**Use measurable staging instead:** within one metre, touching, hand on the door handle, back against the wall, directly under the sign, at the kerb edge, waist-deep, arm's length.

**Restate staging in every beat.** Do not assume it carries. Who is left, who is right, relative scale, distance to the landmark, stated again each time.

**Watch for framing sameness.** Restricting the camera to a few *moves* is correct. Repeating the same *framing* is not. If every beat resolves to the subject centred with the environment receding behind them, the film will read as a loop no matter how good each shot is. Vary shot size, screen position, angle and depth deliberately across the beat sheet, and check the beat grid for it before writing.

---

## Physics lock

State it in Global Constants and enforce it in the beats. Every object and body carries gravity, mass, inertia and weight transfer.

- No floating bodies, no weightless props, no frictionless feet, no teleporting, no rubbery game-engine motion
- Motion has cause and effect. Impact produces displacement
- Liquids cling, drip, pool and follow gravity
- Cloth and hair lag behind the body and settle under their own weight between gusts
- Water and air resist. A body in water decelerates between strokes, never glides continuously
- Heavy things sag, crack what they land on, and shake what is nearby

Wherever a costume or prop is doing narrative work, describe what it does at each stage rather than what it looks like. Fabric reading the air is one of the cheapest and most convincing ways to show escalation.

---

## Light

Lighting is a priority constraint, not decoration. Declare the law once, in Global Constants, and let the beats inherit it.

State: the source, the direction, the quality, and what is *protected*.

Example of a protective lock: "The scene is backlit. The subject stays between camera and the brighter background, the camera stays on the shadow side, faces fall into shadow unless explicitly lit. No flat frontal key, no beauty fill."

Without a protective clause the model drifts to even frontal lighting, which is what makes output look like a render rather than a photograph.

---

## Camera and lens

**Declare a restricted vocabulary** of 2 to 4 named moves for the whole film and bind one per beat. Write basic terms plainly: wide, medium, close-up, push in, pull out, pan, track, follow, orbit, tilt, dive, handheld, locked off.

**Choose the lens by observable outcome, not by millimetres.** Models are unreliable with focal lengths and reliable with descriptions of what the lens does:

| Character | Use for |
|---|---|
| Very wide, 84 degrees | Close intimate face with the environment still visible |
| Ultra wide, 107 degrees | Large-scale environmental geography |
| Normal, 47 degrees | Natural documentary action |
| Short telephoto, 29 degrees | Medium portrait |
| Telephoto, 18 degrees | Tight emotional close-up |
| Super telephoto, 8 degrees | Distant, hidden observation |

Lock the chosen lens character across every beat unless the content class genuinely changes. Cut hard between lens characters, never drift smoothly between them.

**Niche terms need a plain-language gloss.** "Rack focus: the foreground branches blur while the figure behind sharpens."

**Transitions need both trigger and method.** "At the 12-second mark, a whip pan left combined with a natural dissolve." Named options: hard cut, smash cut, match cut, insert cut, reverse cut, whip cut, wipe. Avoid fades and dissolves unless asked.

**A locked-off camera must be stated as a rule and repeated.** Models add drift by default. If stillness matters, say "the camera does not move at all in this shot" inside the beat, not only in the header.

---

## Beat substance

Each beat ends when the moment is complete, not before and not after.

A complete beat contains: the visual, the staging restated, the performance with an objective, the physics of whatever moves, the camera and framing, and the audio. If a beat has only a visual, it is underwritten and the model will skip or average it.

Motion is described mechanically, never "he moves fast" but the specific mechanics of the movement.

**Reserve fine detail for the two or three beats you want remembered.** Describe everything else generally: "a flurry of close-quarters exchanges", "several vaults and a somersault". But the memorable beats must be given real space. Writing a hero moment as an aside guarantees it will not land.

---

## Trigger words

Some words drag the model toward an unwanted archetype regardless of what else you write. Identify them for your subject and substitute descriptive phrasing.

Worked example, face coverings. Never write mask, helmet, visor, stone face, carved face. Those produce knights and statues. Write instead: a smooth fitted metal face covering cast to the face contours, a fitted geometric lattice covering, a hammered metal surface worn over the face. Describe the human first, and let the covering be a single closing detail.

Apply the same test to any subject. If output keeps arriving as a genre cliche, find the word that is summoning it.

---

## Audio

Author it. Every beat gets an SFX line.

Describe music as an arc across the film, tied to timestamps, not as a genre label: "suppressed and sparse, rising from 14s, soaring by 23s, cutting to silence at 29s."

Write VO verbatim. Mark deliberate silence explicitly, and place it where it will be felt: half a second of true silence after an impact is louder than any sound effect.

Sound ducking is a usable structural device. Ambient dropping away for a moment and flooding back gives a film a heartbeat.

---

## References

When a ref is accurate, say to reference it and stop describing. Repeating the description fights the image.

When only part of a ref matters, say which part: "Refer to Video 1 only for camera movement and shot rhythm. Do not reference its visual content."

Never rely on a name written inside an image. Bind in text, one line per subject.

---

## Negative control

Reliable only for subtitles and audio: "No subtitles", "No BGM", "No audio", "No dialogue".

A short `Strictly exclude:` list is acceptable when the risk is high, for instance preventing a colour film from drifting to greyscale. Prefer positive statements everywhere else.

---

## Feedback shorthand

Translate the user's plain-language note into the specific repair.

| They say | It means | Do this |
|---|---|---|
| "It's ordinary", "nothing happens" | The subject had nothing to do, or no contact with the world | Add physical contact and effort. Consider switching to Spine 10 |
| "It feels like a loop" | Framing sameness across beats | Rewrite the beat grid with deliberately different shot sizes, angles and screen positions |
| "Looks fake", "robotic", "over-acted" | Emotion was labelled instead of played | Rewrite each beat around objective, obstacle and a visible beat change |
| "The eyes look dead" | Eye life was skipped | Apply saccades, blink behaviour, catchlights, eyes leading the head |
| "Too floaty", "weightless" | Physics lock was skipped | Add gravity, weight transfer, follow-through, cloth and hair lag |
| "You're being lazy", "too short" | Beats are underwritten | Lengthen them. Add staging, performance and physics to each |
| "Background's too busy" or "too plain" | Worldbuilding drifted | One specific, precise world detail behind the human moment. Not a paragraph, not a bare set |
| "It looks like a render" | Lighting went flat and frontal | Add a protective lighting lock |
| "Face keeps changing" | Reference bound only in the header | Re-bind inline at each beat and add a no-drift clause |
| "Wrong number of scenes" | Count not verified | Recount the original request and redeliver the full number |
| "You keep repeating yourself" | Variation instead of invention | Find a genuinely new scenario, not a version of the same shot |
| "It cuts too slowly", "it drags" | A 30s generation cannot hold more than 8 beats | Rewrite as short blocks with 2s beats, trimmed tighter in an editor |
| "This is too long to read" | The prompt was shown without a preview | Lead with the plain-language preview. The prompt is for the model, not the user |

---

## Fix-it library

Include the entries relevant to the piece you wrote.

| Symptom | Cause | Fix in the prompt |
|---|---|---|
| Extra cuts appear in a one-shot film | Too much plot per beat, or too many beats | Merge two beats. Restate "one continuous take, no cuts" in Global Constants and again in Overall Requirements |
| Character's face drifts | Ref bound only in header | Re-bind inline at each beat. Add "appearance must strictly match Image 1 throughout, no face changes" |
| Two characters merge or duplicate | Mapping implied by labels inside the image | Move all mapping into text, one line per subject |
| Style bleeds where it should not | Style declared per beat instead of globally | Declare once at top. Per beat write only the deviation |
| Ignores late beats | Timeline gaps or an over-stuffed final window | Contiguous timestamps. Give the ending 4 to 5 seconds |
| Model invents its own plot | A window given too little to do | Add one concrete action and one reaction to that window |
| Progressive state resets between beats | Continuous change is the hardest thing to hold | State that the change only ever moves in one direction, and restate the state inside each beat |
| Camera drifts during a locked-off beat | Models add motion by default | "The camera does not move at all in this shot. Tripod-locked, zero movement" |
| A repeating device completes itself when it should break | The model finishes patterns it has learned | State the exception in Overall Requirements in absolute terms, with the count |
| Aspect ratio comes back wrong | Locked mode | Aspect is inherited from the input asset. Change the input, not the prompt |
| Subtitles appear uninvited | No negative control | Add "No subtitles." |
| Music fights the action | Genre label only | Replace with a music arc tied to timestamps |
| Storyboard not followed closely | Storyboard mode is loose by design | Switch to keyframe mode: ordered independent images plus "Use Images 1 to N in order as keyframes." |
| Extension has a visible seam | Format mismatch | `mov` for input and output. Describe continuity of light, motion and sound across the join |
| Clay-model render copies the grey visuals | Reference scope unstated | "Reference Video 1 only for camera movement, motion trajectory and shot rhythm. Do not reference its visual appearance." |
| Output is a split screen, grid or composite | A multi-panel reference leaked its layout | "Single unified camera frame. Not a collage, not a grid, not a split screen, not a contact sheet." |
| A reference photo's backdrop appears in a location shot | Backdrop scope unstated | "Do not reference the backdrop, studio lighting or pose. The background is [location] and nothing else." |
| A different woman appears in one beat | A bound location reference contained a person | Drop that reference and describe the location in text, or crop the person out of it |
| The subject's head is cropped out of frame | A framing instruction subtracted part of them | Never describe what is out of frame. Add "the subject's head is never cropped out of frame in any beat" |
| The climax sounds no louder than the opening | Audio written as adjectives, not levels | Name the loudest moment, the quietest moment, and where silence falls |
| Blocks of a multi-part film do not cut together | Global Constants reworded between blocks | Paste the palette, light law and lens paragraphs identically into every block |

---

## Worked micro-example

Topic: *the history of coffee.* Spine 2, Object Through Time.

One bean travels four centuries. Constant: the bean, always centred, always in motion. Variable: era, art style, sound world. Lens locked to short telephoto throughout so the bean stays the subject and every era compresses behind it. Camera vocabulary: macro push-in and lateral tracking, nothing else. Physics: the bean has real mass, it rolls and settles, it does not float. Beats: 0-4 Ethiopian highlands, 4-9 Ottoman coffeehouse, 9-14 Venetian port, 14-20 industrial roastery, 20-26 modern cafe mosaic, 26-30 a cup lands on a table and steam rises. Audio: one sustained drone gaining an instrument per era, dropping to ambient cafe hum at the end.

That level of decision-making, made before any prose, is what the prompt is for.

