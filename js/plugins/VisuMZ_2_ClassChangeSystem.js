//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.16;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.16] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 *    depending on the primary class and how they're set up. To avoid
 *    conflicting with subclass resources and requirements, the Skill Learn
 *    System only makes it available for the primary class to learn skills from
 *    at a time. To learn skills from a subclass through the Skill Learn System
 *    the player would have to change to the subclass' class as the primary and
 *    then learn from it.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Class Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Job Points Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * 
 *   Select Same Subclass?:
 *   - Allow selecting the same subclass that's already equipped in that slot?
 *   - Mostly an aesthetic thing to allow/prevent the same subclass from being
 *     selected if that's what you want to control.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *     Play for Unassign?:
 *     - Play animation for unassigning a subclass?
 *     - Mostly an aesthetic thing to play/not play animations when unassigning
 *       a subclass if that's what you want to control.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.16: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameters added by Irina:
 * *** Parameters > General Settings > Select Same Subclass?
 * **** Allow selecting the same subclass that's already equipped in that slot?
 * **** Mostly an aesthetic thing to allow/prevent the same subclass from being
 *      selected if that's what you want to control.
 * *** Parameters > Window Settings > Confirm Animation ID > Play for Unassign?
 * **** Play animation for unassigning a subclass?
 * **** Mostly an aesthetic thing to play/not play animations when unassigning
 *      a subclass if that's what you want to control.
 * 
 * Version 1.15: December 14, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with the \Class[x] textcode from the VisuStella
 *    MZ message core. Fix made by Irina.
 * 
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 *
 * @param AllowSameSubclassSelect:eval
 * @text Select Same Subclass?
 * @parent Basics
 * @type boolean
 * @on Allow Selection
 * @off Disallow Selection
 * @desc Allow selecting the same subclass that's already equipped in that slot?
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param AllowClearClassAni:eval
 * @text Play for Unassign?
 * @parent ConfirmAnimationID:num
 * @type boolean
 * @on Play Animation
 * @off Don't Play
 * @desc Play animation for unassigning a subclass?
 * @default true
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much CP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much JP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x2e2dc8=_0x17f9;(function(_0x34ab78,_0x453484){const _0x4be034=_0x17f9,_0x656ab7=_0x34ab78();while(!![]){try{const _0x4afbf3=parseInt(_0x4be034(0x304))/0x1*(parseInt(_0x4be034(0x33b))/0x2)+parseInt(_0x4be034(0x1bf))/0x3+parseInt(_0x4be034(0x1ae))/0x4+-parseInt(_0x4be034(0x27e))/0x5+parseInt(_0x4be034(0x298))/0x6+-parseInt(_0x4be034(0x312))/0x7+parseInt(_0x4be034(0x3be))/0x8;if(_0x4afbf3===_0x453484)break;else _0x656ab7['push'](_0x656ab7['shift']());}catch(_0x570e36){_0x656ab7['push'](_0x656ab7['shift']());}}}(_0x3ee1,0xaebcc));function _0x17f9(_0x35429d,_0x5b4923){const _0x3ee143=_0x3ee1();return _0x17f9=function(_0x17f972,_0x185e00){_0x17f972=_0x17f972-0x14b;let _0x42dabc=_0x3ee143[_0x17f972];return _0x42dabc;},_0x17f9(_0x35429d,_0x5b4923);}var label='ClassChangeSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2e2dc8(0x403)](function(_0x441c95){const _0x586768=_0x2e2dc8;return _0x441c95[_0x586768(0x2ad)]&&_0x441c95[_0x586768(0x265)][_0x586768(0x2b6)]('['+label+']');})[0x0];VisuMZ[label][_0x2e2dc8(0x260)]=VisuMZ[label][_0x2e2dc8(0x260)]||{},VisuMZ[_0x2e2dc8(0x287)]=function(_0x7b8cdd,_0x18cb0b){const _0x193e31=_0x2e2dc8;for(const _0xb5d655 in _0x18cb0b){if(_0xb5d655[_0x193e31(0x2fc)](/(.*):(.*)/i)){const _0x2b3c1b=String(RegExp['$1']),_0x510112=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5a05d1,_0x33e0a5,_0x5a0b32;switch(_0x510112){case'NUM':_0x5a05d1=_0x18cb0b[_0xb5d655]!==''?Number(_0x18cb0b[_0xb5d655]):0x0;break;case _0x193e31(0x3fd):_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON['parse'](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5[_0x193e31(0x268)](_0x393c4d=>Number(_0x393c4d));break;case _0x193e31(0x20d):_0x5a05d1=_0x18cb0b[_0xb5d655]!==''?eval(_0x18cb0b[_0xb5d655]):null;break;case _0x193e31(0x181):_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON['parse'](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5['map'](_0x197111=>eval(_0x197111));break;case _0x193e31(0x380):_0x5a05d1=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):'';break;case _0x193e31(0x3bb):_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5[_0x193e31(0x268)](_0x1a02bd=>JSON[_0x193e31(0x2bb)](_0x1a02bd));break;case'FUNC':_0x5a05d1=_0x18cb0b[_0xb5d655]!==''?new Function(JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655])):new Function('return\x200');break;case _0x193e31(0x329):_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5['map'](_0x3fac19=>new Function(JSON[_0x193e31(0x2bb)](_0x3fac19)));break;case _0x193e31(0x29e):_0x5a05d1=_0x18cb0b[_0xb5d655]!==''?String(_0x18cb0b[_0xb5d655]):'';break;case'ARRAYSTR':_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5['map'](_0x173dd3=>String(_0x173dd3));break;case _0x193e31(0x359):_0x5a0b32=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):{},_0x5a05d1=VisuMZ[_0x193e31(0x287)]({},_0x5a0b32);break;case _0x193e31(0x24a):_0x33e0a5=_0x18cb0b[_0xb5d655]!==''?JSON[_0x193e31(0x2bb)](_0x18cb0b[_0xb5d655]):[],_0x5a05d1=_0x33e0a5['map'](_0x21d287=>VisuMZ['ConvertParams']({},JSON[_0x193e31(0x2bb)](_0x21d287)));break;default:continue;}_0x7b8cdd[_0x2b3c1b]=_0x5a05d1;}}return _0x7b8cdd;},(_0x498a7f=>{const _0x2493a2=_0x2e2dc8,_0x4eb03c=_0x498a7f['name'];for(const _0xf3fd97 of dependencies){if(!Imported[_0xf3fd97]){alert(_0x2493a2(0x23f)[_0x2493a2(0x154)](_0x4eb03c,_0xf3fd97)),SceneManager[_0x2493a2(0x30a)]();break;}}const _0x5eede5=_0x498a7f[_0x2493a2(0x265)];if(_0x5eede5['match'](/\[Version[ ](.*?)\]/i)){const _0x469aa9=Number(RegExp['$1']);_0x469aa9!==VisuMZ[label][_0x2493a2(0x37e)]&&(alert(_0x2493a2(0x398)[_0x2493a2(0x154)](_0x4eb03c,_0x469aa9)),SceneManager[_0x2493a2(0x30a)]());}if(_0x5eede5[_0x2493a2(0x2fc)](/\[Tier[ ](\d+)\]/i)){const _0x36be68=Number(RegExp['$1']);_0x36be68<tier?(alert(_0x2493a2(0x369)[_0x2493a2(0x154)](_0x4eb03c,_0x36be68,tier)),SceneManager[_0x2493a2(0x30a)]()):tier=Math[_0x2493a2(0x3e5)](_0x36be68,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x2493a2(0x260)],_0x498a7f[_0x2493a2(0x39a)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x2e2dc8(0x413)],'ClassUnlockForActor',_0x2a17b5=>{const _0x23706d=_0x2e2dc8;VisuMZ[_0x23706d(0x287)](_0x2a17b5,_0x2a17b5);const _0x1f9a04=_0x2a17b5[_0x23706d(0x277)]['map'](_0x50a799=>$gameActors[_0x23706d(0x3e1)](_0x50a799)),_0x35e5d1=_0x2a17b5[_0x23706d(0x336)];for(const _0x153caf of _0x1f9a04){if(!_0x153caf)continue;for(const _0x394042 of _0x35e5d1){_0x153caf['unlockClass'](_0x394042);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'ClassUnlockForGlobal',_0x373723=>{const _0x483d45=_0x2e2dc8;VisuMZ[_0x483d45(0x287)](_0x373723,_0x373723);const _0x1fa829=_0x373723['Classes'];for(const _0x42f71e of _0x1fa829){$gameParty['unlockClass'](_0x42f71e);}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x334),_0x463002=>{const _0x510a05=_0x2e2dc8;VisuMZ[_0x510a05(0x287)](_0x463002,_0x463002);const _0xb5a68b=_0x463002[_0x510a05(0x277)][_0x510a05(0x268)](_0x49dbb7=>$gameActors[_0x510a05(0x3e1)](_0x49dbb7)),_0x2d9a8d=_0x463002[_0x510a05(0x336)];for(const _0x219bfc of _0xb5a68b){if(!_0x219bfc)continue;for(const _0x52d50a of _0x2d9a8d){_0x219bfc[_0x510a05(0x1e7)](_0x52d50a);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x19e),_0x4c7cb1=>{const _0x2ada62=_0x2e2dc8;VisuMZ[_0x2ada62(0x287)](_0x4c7cb1,_0x4c7cb1);const _0x14334b=_0x4c7cb1['Classes'];for(const _0x4b6617 of _0x14334b){$gameParty[_0x2ada62(0x1e7)](_0x4b6617);}}),PluginManager[_0x2e2dc8(0x184)](pluginData['name'],'ClassChangeAddRestrictTier',_0x5e170b=>{const _0x289298=_0x2e2dc8;VisuMZ[_0x289298(0x287)](_0x5e170b,_0x5e170b);const _0x487d51=_0x5e170b['Actors']['map'](_0x46199a=>$gameActors[_0x289298(0x3e1)](_0x46199a)),_0x406fd1=_0x5e170b[_0x289298(0x261)];for(const _0x10e7fe of _0x487d51){if(!_0x10e7fe)continue;for(const _0x397a5e of _0x406fd1){_0x10e7fe['addClassChangeTierRestriction'](_0x397a5e);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x39e),_0x208a18=>{const _0x245a64=_0x2e2dc8;VisuMZ['ConvertParams'](_0x208a18,_0x208a18);const _0x1bc0ab=_0x208a18[_0x245a64(0x277)][_0x245a64(0x268)](_0x7cffa=>$gameActors['actor'](_0x7cffa)),_0xc314d1=_0x208a18[_0x245a64(0x261)];for(const _0x52f403 of _0x1bc0ab){if(!_0x52f403)continue;for(const _0x5a0857 of _0xc314d1){_0x52f403[_0x245a64(0x228)](_0x5a0857);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'MulticlassChangeActorClass',_0x222b2e=>{const _0x2e42a6=_0x2e2dc8;VisuMZ[_0x2e42a6(0x287)](_0x222b2e,_0x222b2e);const _0x16ace5=_0x222b2e['Actors'][_0x2e42a6(0x268)](_0x3dbe88=>$gameActors['actor'](_0x3dbe88)),_0x194dc4=_0x222b2e[_0x2e42a6(0x36d)],_0x255cb2=_0x222b2e[_0x2e42a6(0x243)];for(const _0x148030 of _0x16ace5){if(!_0x148030)continue;_0x148030[_0x2e42a6(0x370)](_0x255cb2,_0x194dc4);}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x1aa),_0x57156c=>{const _0x5a2a19=_0x2e2dc8;VisuMZ['ConvertParams'](_0x57156c,_0x57156c);const _0x13ca61=_0x57156c[_0x5a2a19(0x277)][_0x5a2a19(0x268)](_0x81d2f2=>$gameActors['actor'](_0x81d2f2)),_0x488c28=_0x57156c['Limit'];for(const _0x52d58c of _0x13ca61){if(!_0x52d58c)continue;_0x52d58c[_0x5a2a19(0x15a)](_0x488c28);}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'MulticlassLowerLimit',_0x16d88b=>{const _0x50bd1d=_0x2e2dc8;VisuMZ[_0x50bd1d(0x287)](_0x16d88b,_0x16d88b);const _0x236823=_0x16d88b[_0x50bd1d(0x277)]['map'](_0x163cbf=>$gameActors['actor'](_0x163cbf)),_0x38a180=_0x16d88b[_0x50bd1d(0x35a)];for(const _0x398338 of _0x236823){if(!_0x398338)continue;_0x398338[_0x50bd1d(0x25c)](_0x38a180);}}),PluginManager['registerCommand'](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x2b0),_0x26ff43=>{const _0x36067e=_0x2e2dc8;VisuMZ['ConvertParams'](_0x26ff43,_0x26ff43);const _0xd23bc8=_0x26ff43[_0x36067e(0x277)][_0x36067e(0x268)](_0x25bc6d=>$gameActors[_0x36067e(0x3e1)](_0x25bc6d)),_0x14b1a1=_0x26ff43['Limit'];for(const _0xa97a85 of _0xd23bc8){if(!_0xa97a85)continue;_0xa97a85['setMulticlassTiers'](_0x14b1a1);}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'ClassPointsGain',_0x177a85=>{const _0x584891=_0x2e2dc8;VisuMZ['ConvertParams'](_0x177a85,_0x177a85);const _0x52e057=_0x177a85['Actors'][_0x584891(0x268)](_0x245937=>$gameActors[_0x584891(0x3e1)](_0x245937)),_0x114037=_0x177a85[_0x584891(0x336)],_0x250687=_0x177a85['Points'];for(const _0x5ce22f of _0x52e057){if(!_0x5ce22f)continue;for(const _0x3f085d of _0x114037){_0x5ce22f['gainClassPoints'](_0x250687,_0x3f085d);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x3a1),_0x30668a=>{const _0x318cc2=_0x2e2dc8;VisuMZ[_0x318cc2(0x287)](_0x30668a,_0x30668a);const _0x2bec19=_0x30668a[_0x318cc2(0x277)][_0x318cc2(0x268)](_0x227987=>$gameActors[_0x318cc2(0x3e1)](_0x227987)),_0x45b6df=_0x30668a['Classes'],_0x3e2c97=_0x30668a['Points'];for(const _0x5f36eb of _0x2bec19){if(!_0x5f36eb)continue;for(const _0x37de42 of _0x45b6df){_0x5f36eb['addClassPoints'](_0x3e2c97,_0x37de42);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData['name'],_0x2e2dc8(0x3d5),_0x1ce3c9=>{const _0x25db46=_0x2e2dc8;VisuMZ['ConvertParams'](_0x1ce3c9,_0x1ce3c9);const _0xa5d2ce=_0x1ce3c9[_0x25db46(0x277)]['map'](_0x521f6b=>$gameActors[_0x25db46(0x3e1)](_0x521f6b)),_0x2a5534=_0x1ce3c9[_0x25db46(0x336)],_0x20509c=_0x1ce3c9[_0x25db46(0x30b)];for(const _0x166e18 of _0xa5d2ce){if(!_0x166e18)continue;for(const _0x14d200 of _0x2a5534){_0x166e18[_0x25db46(0x195)](_0x20509c,_0x14d200);}}}),PluginManager['registerCommand'](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x1a5),_0x2c3b70=>{const _0x4464aa=_0x2e2dc8;VisuMZ[_0x4464aa(0x287)](_0x2c3b70,_0x2c3b70);const _0x33f8a1=_0x2c3b70[_0x4464aa(0x277)][_0x4464aa(0x268)](_0x2306cc=>$gameActors[_0x4464aa(0x3e1)](_0x2306cc)),_0x387665=_0x2c3b70[_0x4464aa(0x336)],_0x21d9d8=_0x2c3b70[_0x4464aa(0x30b)];for(const _0x336189 of _0x33f8a1){if(!_0x336189)continue;for(const _0x1878b1 of _0x387665){_0x336189[_0x4464aa(0x3fe)](_0x21d9d8,_0x1878b1);}}}),PluginManager['registerCommand'](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x1a2),_0x29403b=>{const _0x36a4e0=_0x2e2dc8;VisuMZ[_0x36a4e0(0x287)](_0x29403b,_0x29403b);const _0x30d863=_0x29403b[_0x36a4e0(0x277)][_0x36a4e0(0x268)](_0x32eeb0=>$gameActors[_0x36a4e0(0x3e1)](_0x32eeb0)),_0x29c6a4=_0x29403b[_0x36a4e0(0x336)],_0x5a9727=_0x29403b[_0x36a4e0(0x30b)];for(const _0x51bb84 of _0x30d863){if(!_0x51bb84)continue;for(const _0x5cab33 of _0x29c6a4){_0x51bb84[_0x36a4e0(0x239)](_0x5a9727,_0x5cab33);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData['name'],_0x2e2dc8(0x389),_0x1677b4=>{const _0x1c3fa3=_0x2e2dc8;VisuMZ[_0x1c3fa3(0x287)](_0x1677b4,_0x1677b4);const _0x4f254b=_0x1677b4[_0x1c3fa3(0x277)][_0x1c3fa3(0x268)](_0x5aa269=>$gameActors['actor'](_0x5aa269)),_0x41f67d=_0x1677b4[_0x1c3fa3(0x336)],_0x41f27d=_0x1677b4[_0x1c3fa3(0x30b)];for(const _0x29985f of _0x4f254b){if(!_0x29985f)continue;for(const _0x239cac of _0x41f67d){_0x29985f[_0x1c3fa3(0x187)](_0x41f27d,_0x239cac);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'JobPointsLose',_0x530f3c=>{const _0x7b4ba2=_0x2e2dc8;VisuMZ[_0x7b4ba2(0x287)](_0x530f3c,_0x530f3c);const _0x295de5=_0x530f3c[_0x7b4ba2(0x277)][_0x7b4ba2(0x268)](_0x504099=>$gameActors[_0x7b4ba2(0x3e1)](_0x504099)),_0x52dcce=_0x530f3c['Classes'],_0x864c33=_0x530f3c[_0x7b4ba2(0x30b)];for(const _0x3bcfeb of _0x295de5){if(!_0x3bcfeb)continue;for(const _0x50f3f2 of _0x52dcce){_0x3bcfeb['loseJobPoints'](_0x864c33,_0x50f3f2);}}}),PluginManager['registerCommand'](pluginData[_0x2e2dc8(0x413)],'JobPointsSet',_0xad5219=>{const _0x2fce52=_0x2e2dc8;VisuMZ['ConvertParams'](_0xad5219,_0xad5219);const _0x25ba49=_0xad5219[_0x2fce52(0x277)][_0x2fce52(0x268)](_0x422252=>$gameActors[_0x2fce52(0x3e1)](_0x422252)),_0x1aba66=_0xad5219[_0x2fce52(0x336)],_0x5355e5=_0xad5219[_0x2fce52(0x30b)];for(const _0x44d3a0 of _0x25ba49){if(!_0x44d3a0)continue;for(const _0x383c50 of _0x1aba66){_0x44d3a0[_0x2fce52(0x2ce)](_0x5355e5,_0x383c50);}}}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],_0x2e2dc8(0x157),_0x407f20=>{const _0x2d0797=_0x2e2dc8;VisuMZ[_0x2d0797(0x287)](_0x407f20,_0x407f20),$gameSystem[_0x2d0797(0x305)](_0x407f20[_0x2d0797(0x267)]);}),PluginManager[_0x2e2dc8(0x184)](pluginData[_0x2e2dc8(0x413)],'SystemShowClassChangeSystemMenu',_0x5f5278=>{const _0x4cb97c=_0x2e2dc8;VisuMZ['ConvertParams'](_0x5f5278,_0x5f5278),$gameSystem['setMainMenuClassChangeSystemVisible'](_0x5f5278[_0x4cb97c(0x270)]);}),VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x39d)]=function(){const _0x2563c9=_0x2e2dc8;try{}catch(_0x45e786){if($gameTemp[_0x2563c9(0x25a)]())console[_0x2563c9(0x3e8)](_0x45e786);}},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x209)]=Scene_Boot[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2cd)],Scene_Boot[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2cd)]=function(){const _0x57f74f=_0x2e2dc8;VisuMZ[_0x57f74f(0x1e6)]['Scene_Boot_onDatabaseLoaded'][_0x57f74f(0x3ee)](this),this[_0x57f74f(0x1e3)]();},Scene_Boot['prototype'][_0x2e2dc8(0x1e3)]=function(){this['process_VisuMZ_ClassChangeSystem_Notetags']();},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x1eb)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},Scene_Boot[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x26c)]=function(){const _0x512cad=_0x2e2dc8;if(VisuMZ[_0x512cad(0x271)])return;for(const _0x448433 of $dataActors){if(!_0x448433)continue;ImageManager[_0x512cad(0x2ae)](_0x448433);}for(const _0x5d02b2 of $dataClasses){if(!_0x5d02b2)continue;VisuMZ[_0x512cad(0x1e6)]['Parse_Notetags_Basic'](_0x5d02b2);}},VisuMZ[_0x2e2dc8(0x1e6)]['JS']={},VisuMZ[_0x2e2dc8(0x1e6)]['createJS']=function(_0x4cee18,_0x3a54d8,_0x18478b){const _0x87cdf1=_0x2e2dc8,_0x22e01f=_0x4cee18['note'];if(_0x22e01f['match'](_0x18478b)){const _0x333ac3=String(RegExp['$1']),_0x530eb8=_0x87cdf1(0x17f)[_0x87cdf1(0x154)](_0x333ac3),_0x1455c8=VisuMZ[_0x87cdf1(0x1e6)]['createKeyJS'](_0x4cee18,_0x3a54d8);VisuMZ['ClassChangeSystem']['JS'][_0x1455c8]=new Function(_0x530eb8);}},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3df)]=function(_0x243d14,_0x269b59){const _0x423640=_0x2e2dc8;let _0xb428aa='';if($dataActors['includes'](_0x243d14))_0xb428aa=_0x423640(0x3fa)['format'](_0x243d14['id'],_0x269b59);if($dataClasses['includes'](_0x243d14))_0xb428aa=_0x423640(0x381)['format'](_0x243d14['id'],_0x269b59);if($dataSkills[_0x423640(0x2b6)](_0x243d14))_0xb428aa='Skill-%1-%2'[_0x423640(0x154)](_0x243d14['id'],_0x269b59);if($dataItems[_0x423640(0x2b6)](_0x243d14))_0xb428aa=_0x423640(0x375)[_0x423640(0x154)](_0x243d14['id'],_0x269b59);if($dataWeapons[_0x423640(0x2b6)](_0x243d14))_0xb428aa=_0x423640(0x37f)[_0x423640(0x154)](_0x243d14['id'],_0x269b59);if($dataArmors[_0x423640(0x2b6)](_0x243d14))_0xb428aa=_0x423640(0x2cc)[_0x423640(0x154)](_0x243d14['id'],_0x269b59);if($dataEnemies[_0x423640(0x2b6)](_0x243d14))_0xb428aa='Enemy-%1-%2'['format'](_0x243d14['id'],_0x269b59);if($dataStates[_0x423640(0x2b6)](_0x243d14))_0xb428aa=_0x423640(0x171)[_0x423640(0x154)](_0x243d14['id'],_0x269b59);return _0xb428aa;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x337)]=VisuMZ[_0x2e2dc8(0x337)],VisuMZ[_0x2e2dc8(0x337)]=function(_0x26aa39){const _0x296ea8=_0x2e2dc8;VisuMZ[_0x296ea8(0x1e6)][_0x296ea8(0x337)][_0x296ea8(0x3ee)](this,_0x26aa39),ImageManager['registerActorClassImages'](_0x26aa39);},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x3fb)]=VisuMZ[_0x2e2dc8(0x3fb)],VisuMZ[_0x2e2dc8(0x3fb)]=function(_0x263767){const _0x1e70f4=_0x2e2dc8;VisuMZ[_0x1e70f4(0x1e6)]['ParseClassNotetags'][_0x1e70f4(0x3ee)](this,_0x263767),VisuMZ[_0x1e70f4(0x1e6)]['Parse_Notetags_Basic'](_0x263767),VisuMZ[_0x1e70f4(0x1e6)][_0x1e70f4(0x163)](_0x263767);},VisuMZ[_0x2e2dc8(0x1e6)]['Parse_Notetags_Basic']=function(_0x507757){const _0x54aef2=_0x2e2dc8;_0x507757['iconIndex']=ImageManager['classIcon']||0x0,_0x507757[_0x54aef2(0x265)]=TextManager[_0x54aef2(0x347)][_0x54aef2(0x154)](_0x507757[_0x54aef2(0x413)]||'');const _0xd32e93=VisuMZ['ClassChangeSystem']['RegExp'],_0x4c8a42=_0x507757['note'];_0x4c8a42['match'](_0xd32e93[_0x54aef2(0x3a5)])&&(_0x507757[_0x54aef2(0x3cf)]=Number(RegExp['$1'])),_0x4c8a42['match'](_0xd32e93[_0x54aef2(0x30d)])&&(_0x507757[_0x54aef2(0x265)]=String(RegExp['$1']));},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x163)]=function(_0x5cda83){const _0x53dbb7=_0x2e2dc8;_0x5cda83[_0x53dbb7(0x413)][_0x53dbb7(0x2fc)](/\\I\[(\d+)\]/i)&&(_0x5cda83[_0x53dbb7(0x3cf)]=Number(RegExp['$1']));if(Imported['VisuMZ_0_CoreEngine']){if(VisuMZ['CoreEngine']['Settings']['UI'][_0x53dbb7(0x1af)]){const _0x5ab677=_0x53dbb7(0x2e4);_0x5cda83[_0x53dbb7(0x413)]=_0x5ab677[_0x53dbb7(0x154)](_0x5cda83[_0x53dbb7(0x3cf)],_0x5cda83[_0x53dbb7(0x413)]);}else _0x5cda83[_0x53dbb7(0x413)]=_0x5cda83['name'][_0x53dbb7(0x238)](/\x1bI\[(\d+)\]/gi,''),_0x5cda83[_0x53dbb7(0x413)]=_0x5cda83['name']['replace'](/\\I\[(\d+)\]/gi,'');}},DataManager[_0x2e2dc8(0x216)]=function(_0x538029){const _0x1e46d9=_0x2e2dc8;if(!_0x538029)return[];let _0x36a7cb=[];return _0x36a7cb=_0x36a7cb['concat'](_0x538029[_0x1e46d9(0x192)]()[_0x1e46d9(0x268)](_0x54ecb0=>_0x54ecb0['id'])),_0x36a7cb=_0x36a7cb[_0x1e46d9(0x15d)](_0x538029[_0x1e46d9(0x2a7)]()),_0x36a7cb=_0x36a7cb[_0x1e46d9(0x15d)]($gameParty['getUnlockedClasses']()),_0x36a7cb=_0x36a7cb[_0x1e46d9(0x15d)](VisuMZ[_0x1e46d9(0x1e6)]['Settings']['General']['AlwaysUnlocked']),_0x36a7cb=_0x36a7cb['filter']((_0x33a714,_0x2b5fa3,_0x29cd5a)=>_0x29cd5a[_0x1e46d9(0x241)](_0x33a714)===_0x2b5fa3),_0x36a7cb[_0x1e46d9(0x24e)](function(_0x265b10,_0x40c3df){return _0x265b10-_0x40c3df;}),_0x36a7cb[_0x1e46d9(0x268)](_0x1d9527=>$dataClasses[_0x1d9527])[_0x1e46d9(0x226)](null);},DataManager[_0x2e2dc8(0x2bc)]=function(_0x34af43){const _0x2ce98b=_0x2e2dc8,_0x2b25db=[],_0x1a9117=DataManager[_0x2ce98b(0x216)](_0x34af43);for(const _0x741a18 of $dataClasses){if(!_0x741a18)continue;if(_0x1a9117[_0x2ce98b(0x2b6)](_0x741a18))continue;this[_0x2ce98b(0x185)](_0x34af43,_0x741a18)&&_0x2b25db[_0x2ce98b(0x1a3)](_0x741a18['id']);}return _0x2b25db;},DataManager[_0x2e2dc8(0x185)]=function(_0x3be04b,_0x74cf63){const _0x32f858=_0x2e2dc8;if(!_0x3be04b)return![];if(!_0x74cf63)return![];const _0x462477=VisuMZ[_0x32f858(0x1e6)][_0x32f858(0x1eb)],_0x222c3c=_0x74cf63[_0x32f858(0x1c6)];if(_0x222c3c[_0x32f858(0x2fc)](_0x462477[_0x32f858(0x332)])){const _0x45fa70=String(RegExp['$1'])[_0x32f858(0x354)](/[\r\n]+/);for(const _0x3c54fc of _0x45fa70){let _0x2dc9d9=0x0;if(_0x3c54fc['match'](/(.*):[ ](.*)/i)){const _0x4c36b7=String(RegExp['$1']),_0x5be141=String(RegExp['$2']);if(_0x4c36b7['match'](/CLASS[ ](\d+)/i))_0x2dc9d9=Number(RegExp['$1']);else{if(_0x4c36b7[_0x32f858(0x2fc)](/CLASS[ ](.*)/i))_0x2dc9d9=this[_0x32f858(0x169)](RegExp['$1']);else{if(_0x4c36b7[_0x32f858(0x2fc)](/\b(?:AP|CP|JP|SP)\b/i)){const _0x267f5d=_0x4c36b7[_0x32f858(0x1d8)]()[_0x32f858(0x2db)](),_0x4fdc13=Number(_0x5be141)||0x0;if(Imported['VisuMZ_2_SkillLearnSystem']){if(_0x267f5d==='AP'){const _0x28d70c=_0x3be04b[_0x32f858(0x248)]();if(_0x28d70c<_0x4fdc13)return![];}else{if(_0x267f5d==='SP'){const _0x39a72e=_0x3be04b['getSkillPoints']();if(_0x39a72e<_0x4fdc13)return![];}}}if(Imported[_0x32f858(0x258)]){if(_0x267f5d==='CP'){const _0x43b571=_0x3be04b[_0x32f858(0x22a)]();if(_0x43b571<_0x4fdc13)return![];}else{if(_0x267f5d==='JP'){const _0x3ad294=_0x3be04b[_0x32f858(0x34d)]();if(_0x3ad294<_0x4fdc13)return![];}}}}}}if(_0x5be141[_0x32f858(0x2fc)](/LEVEL[ ](\d+)/i)){const _0x10cb40=Number(RegExp['$1']);if(_0x3be04b[_0x32f858(0x220)](_0x2dc9d9)<_0x10cb40)return![];}else{if(_0x5be141[_0x32f858(0x2fc)](/(\d+)[ ]CP/i)){const _0x4dd70=Number(RegExp['$1']);if(_0x3be04b[_0x32f858(0x22a)](_0x2dc9d9)<_0x4dd70)return![];}else{if(_0x5be141[_0x32f858(0x2fc)](/(\d+)[ ]JP/i)){const _0x52df08=Number(RegExp['$1']);if(_0x3be04b[_0x32f858(0x34d)](_0x2dc9d9)<_0x52df08)return![];}else{if(_0x5be141['match'](/(\d+)[ ]AP/i)){if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;const _0x166a67=Number(RegExp['$1']);if(_0x3be04b[_0x32f858(0x248)](_0x2dc9d9)<_0x166a67)return![];}else{if(_0x5be141[_0x32f858(0x2fc)](/(\d+)[ ]SP/i)){const _0x492d67=Number(RegExp['$1']);if(_0x3be04b[_0x32f858(0x31f)](_0x2dc9d9)<_0x492d67)return![];}}}}}}}return!![];}return![];},DataManager[_0x2e2dc8(0x205)]=function(_0x4a3240){const _0x33f396=_0x2e2dc8;if(!_0x4a3240)return[];const _0x4d2148=VisuMZ[_0x33f396(0x1e6)][_0x33f396(0x1eb)],_0x1835f2=_0x4a3240[_0x33f396(0x1c6)];let _0x19f486=[];const _0x3b089d=_0x1835f2[_0x33f396(0x2fc)](_0x4d2148['TierOnlyClass']);if(_0x3b089d){for(const _0x6b1f97 of _0x3b089d){if(!_0x6b1f97)continue;_0x6b1f97[_0x33f396(0x2fc)](_0x4d2148[_0x33f396(0x3ba)]);const _0x1896a0=String(RegExp['$1'])['split'](',')['map'](_0x1c9671=>Number(_0x1c9671))['remove'](null)[_0x33f396(0x226)](undefined)[_0x33f396(0x226)](NaN);_0x19f486=_0x19f486['concat'](_0x1896a0);}return _0x19f486;}else{const _0x530f6b=VisuMZ[_0x33f396(0x1e6)][_0x33f396(0x260)][_0x33f396(0x3d3)][_0x33f396(0x2c9)];return Array[_0x33f396(0x20a)]({'length':_0x530f6b},(_0x1f614c,_0x1735b7)=>_0x1735b7+0x1);}},DataManager['getClassIdWithName']=function(_0x526cd5){const _0x404f33=_0x2e2dc8;_0x526cd5=_0x526cd5['toUpperCase']()[_0x404f33(0x2db)](),this['_classIDs']=this['_classIDs']||{};if(this[_0x404f33(0x196)][_0x526cd5])return this['_classIDs'][_0x526cd5];for(const _0x165e11 of $dataClasses){if(!_0x165e11)continue;let _0x5c4959=_0x165e11[_0x404f33(0x413)];_0x5c4959=_0x5c4959[_0x404f33(0x238)](/\x1I\[(\d+)\]/gi,''),_0x5c4959=_0x5c4959[_0x404f33(0x238)](/\\I\[(\d+)\]/gi,''),this['_classIDs'][_0x5c4959['toUpperCase']()['trim']()]=_0x165e11['id'];}return this[_0x404f33(0x196)][_0x526cd5]||0x0;},ImageManager[_0x2e2dc8(0x17a)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x189)][_0x2e2dc8(0x206)],ImageManager['jobPointsIcon']=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x1b8)][_0x2e2dc8(0x206)],ImageManager[_0x2e2dc8(0x385)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)][_0x2e2dc8(0x229)][_0x2e2dc8(0x206)],ImageManager[_0x2e2dc8(0x324)]={},ImageManager[_0x2e2dc8(0x391)]={},ImageManager[_0x2e2dc8(0x3f4)]={},ImageManager[_0x2e2dc8(0x246)]={},ImageManager['actorClassBattlerName']={},ImageManager[_0x2e2dc8(0x2c8)]={},ImageManager[_0x2e2dc8(0x1c5)]={},ImageManager['registerActorClassImages']=function(_0x3bca1b){const _0x5cfc74=_0x2e2dc8;if(!_0x3bca1b)return;const _0x47a8a5=VisuMZ[_0x5cfc74(0x1e6)][_0x5cfc74(0x1eb)],_0x5580cc=_0x3bca1b[_0x5cfc74(0x1c6)],_0x5e2140=_0x3bca1b['id'],_0x19c715=_0x5580cc[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x2af)]);if(_0x19c715)for(const _0x2c95ab of _0x19c715){if(!_0x2c95ab)continue;_0x2c95ab[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x2af)]);const _0x147cfd=String(RegExp['$1']),_0x3352d6=String(RegExp['$2'])['trim'](),_0x16b43b=Number(RegExp['$3']);let _0x2fd438=0x0;if(_0x147cfd[_0x5cfc74(0x2fc)](/CLASS[ ](\d+)/i))_0x2fd438=Number(RegExp['$1']);else _0x147cfd[_0x5cfc74(0x2fc)](/CLASS[ ](.*)/i)?_0x2fd438=DataManager[_0x5cfc74(0x169)](RegExp['$1']):_0x2fd438=DataManager[_0x5cfc74(0x169)](_0x147cfd);if(_0x2fd438>0x0){const _0x3dc554=_0x5cfc74(0x352)[_0x5cfc74(0x154)](_0x5e2140,_0x2fd438);ImageManager['actorClassFaceName'][_0x3dc554]=_0x3352d6,ImageManager[_0x5cfc74(0x391)][_0x3dc554]=_0x16b43b;}}const _0x5553db=_0x5580cc[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x27c)]);if(_0x5553db)for(const _0xaf4776 of _0x5553db){if(!_0xaf4776)continue;_0xaf4776[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x27c)]);const _0x26b9fe=String(RegExp['$1']),_0x53e3ce=String(RegExp['$2'])[_0x5cfc74(0x2db)](),_0x11fed9=Number(RegExp['$3']);let _0x59cfed=0x0;if(_0x26b9fe[_0x5cfc74(0x2fc)](/CLASS[ ](\d+)/i))_0x59cfed=Number(RegExp['$1']);else _0x26b9fe[_0x5cfc74(0x2fc)](/CLASS[ ](.*)/i)?_0x59cfed=DataManager['getClassIdWithName'](RegExp['$1']):_0x59cfed=DataManager[_0x5cfc74(0x169)](_0x26b9fe);if(_0x59cfed>0x0){const _0x578c03=_0x5cfc74(0x352)[_0x5cfc74(0x154)](_0x5e2140,_0x59cfed);ImageManager[_0x5cfc74(0x3f4)][_0x578c03]=_0x53e3ce,ImageManager[_0x5cfc74(0x246)][_0x578c03]=_0x11fed9;}}const _0x294cac=_0x5580cc[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x1dc)]);if(_0x294cac)for(const _0x7f2be7 of _0x294cac){if(!_0x7f2be7)continue;_0x7f2be7[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x1dc)]);const _0x33876a=String(RegExp['$1']),_0x1fa34a=String(RegExp['$2'])[_0x5cfc74(0x2db)]();let _0x48aaaf=0x0;if(_0x33876a[_0x5cfc74(0x2fc)](/CLASS[ ](\d+)/i))_0x48aaaf=Number(RegExp['$1']);else _0x33876a[_0x5cfc74(0x2fc)](/CLASS[ ](.*)/i)?_0x48aaaf=DataManager[_0x5cfc74(0x169)](RegExp['$1']):_0x48aaaf=DataManager[_0x5cfc74(0x169)](_0x33876a);if(_0x48aaaf>0x0){const _0x2bbe55=_0x5cfc74(0x352)[_0x5cfc74(0x154)](_0x5e2140,_0x48aaaf);ImageManager['actorClassBattlerName'][_0x2bbe55]=_0x1fa34a;}}const _0x2cee87=_0x5580cc[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x2de)]);if(_0x2cee87)for(const _0x2db3f9 of _0x2cee87){if(!_0x2db3f9)continue;_0x2db3f9[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x2de)]);const _0x261653=String(RegExp['$1']),_0x472115=String(RegExp['$2'])[_0x5cfc74(0x2db)]();let _0x35e985=0x0;if(_0x261653[_0x5cfc74(0x2fc)](/CLASS[ ](\d+)/i))_0x35e985=Number(RegExp['$1']);else _0x261653[_0x5cfc74(0x2fc)](/CLASS[ ](.*)/i)?_0x35e985=DataManager[_0x5cfc74(0x169)](RegExp['$1']):_0x35e985=DataManager[_0x5cfc74(0x169)](_0x261653);if(_0x35e985>0x0){const _0x32813d=_0x5cfc74(0x352)['format'](_0x5e2140,_0x35e985);ImageManager[_0x5cfc74(0x2c8)][_0x32813d]=_0x472115;}}const _0x4e7465=_0x5580cc[_0x5cfc74(0x2fc)](_0x47a8a5[_0x5cfc74(0x25f)]);if(_0x4e7465)for(const _0x2b9716 of _0x4e7465){if(!_0x2b9716)continue;_0x2b9716['match'](_0x47a8a5[_0x5cfc74(0x25f)]);const _0x3cf065=String(RegExp['$1']),_0x2831ef=String(RegExp['$2'])[_0x5cfc74(0x2db)]();let _0x4de4db=0x0;if(_0x3cf065[_0x5cfc74(0x2fc)](/CLASS[ ](\d+)/i))_0x4de4db=Number(RegExp['$1']);else _0x3cf065[_0x5cfc74(0x2fc)](/CLASS[ ](.*)/i)?_0x4de4db=DataManager[_0x5cfc74(0x169)](RegExp['$1']):_0x4de4db=DataManager['getClassIdWithName'](_0x3cf065);if(_0x4de4db>0x0){const _0x5eb312=_0x5cfc74(0x352)[_0x5cfc74(0x154)](_0x5e2140,_0x4de4db);ImageManager[_0x5cfc74(0x1c5)][_0x5eb312]=_0x2831ef;}}},ImageManager[_0x2e2dc8(0x1f8)]=function(_0x16b092){const _0x1348a5=_0x2e2dc8;if(!_0x16b092)return'';const _0x27d1fe=_0x1348a5(0x352)[_0x1348a5(0x154)](_0x16b092['actorId'](),_0x16b092['currentClass']()['id']);return ImageManager[_0x1348a5(0x324)][_0x27d1fe]??'';},ImageManager[_0x2e2dc8(0x342)]=function(_0x20816f){const _0x4f742e=_0x2e2dc8;if(!_0x20816f)return undefined;const _0x2a0ec3='Actor-%1-Class-%2'[_0x4f742e(0x154)](_0x20816f[_0x4f742e(0x21f)](),_0x20816f['currentClass']()['id']);return ImageManager[_0x4f742e(0x391)][_0x2a0ec3]??undefined;},ImageManager['getActorClassCharacterName']=function(_0x10bee4){const _0x5d0247=_0x2e2dc8;if(!_0x10bee4)return'';const _0x53b5ff=_0x5d0247(0x352)['format'](_0x10bee4[_0x5d0247(0x21f)](),_0x10bee4[_0x5d0247(0x2e2)]()['id']);return ImageManager['actorClassCharacterName'][_0x53b5ff]??'';},ImageManager[_0x2e2dc8(0x1ef)]=function(_0x5c7e09){const _0x303969=_0x2e2dc8;if(!_0x5c7e09)return undefined;const _0x4760bc=_0x303969(0x352)[_0x303969(0x154)](_0x5c7e09[_0x303969(0x21f)](),_0x5c7e09[_0x303969(0x2e2)]()['id']);return ImageManager[_0x303969(0x246)][_0x4760bc]??undefined;},ImageManager[_0x2e2dc8(0x36c)]=function(_0x4fdc2c){const _0x5ef508=_0x2e2dc8;if(!_0x4fdc2c)return'';const _0x2038ee='Actor-%1-Class-%2'['format'](_0x4fdc2c[_0x5ef508(0x21f)](),_0x4fdc2c[_0x5ef508(0x2e2)]()['id']);return ImageManager[_0x5ef508(0x24f)][_0x2038ee]??'';},ImageManager['getActorClassMenuPortrait']=function(_0x24ea47){const _0x16e3d5=_0x2e2dc8;if(!_0x24ea47)return'';const _0x4fcd83=_0x16e3d5(0x352)['format'](_0x24ea47['actorId'](),_0x24ea47['currentClass']()['id']);return ImageManager[_0x16e3d5(0x2c8)][_0x4fcd83]??'';},ImageManager[_0x2e2dc8(0x3e0)]=function(_0x5e5b2d){const _0x4e9dc3=_0x2e2dc8;if(!_0x5e5b2d)return'';const _0xce36b8=_0x4e9dc3(0x352)[_0x4e9dc3(0x154)](_0x5e5b2d['actorId'](),_0x5e5b2d[_0x4e9dc3(0x2e2)]()['id']);return ImageManager[_0x4e9dc3(0x1c5)][_0xce36b8]??'';},SoundManager[_0x2e2dc8(0x153)]=function(_0x37ceaa){const _0x1d3691=_0x2e2dc8;AudioManager[_0x1d3691(0x1d0)](VisuMZ['ClassChangeSystem'][_0x1d3691(0x260)][_0x1d3691(0x19f)]);},TextManager[_0x2e2dc8(0x1fb)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x35d)][_0x2e2dc8(0x366)],TextManager[_0x2e2dc8(0x34b)]=VisuMZ[_0x2e2dc8(0x1e6)]['Settings'][_0x2e2dc8(0x189)][_0x2e2dc8(0x30e)],TextManager[_0x2e2dc8(0x20b)]=VisuMZ[_0x2e2dc8(0x1e6)]['Settings'][_0x2e2dc8(0x189)][_0x2e2dc8(0x250)],TextManager[_0x2e2dc8(0x388)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)][_0x2e2dc8(0x189)][_0x2e2dc8(0x1ce)],TextManager[_0x2e2dc8(0x40b)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)][_0x2e2dc8(0x1b8)]['FullText'],TextManager['jobPointsAbbr']=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x1b8)][_0x2e2dc8(0x250)],TextManager[_0x2e2dc8(0x1cd)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x1b8)][_0x2e2dc8(0x1ce)],TextManager[_0x2e2dc8(0x347)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x229)][_0x2e2dc8(0x27a)],TextManager['classChange_multiclass_noClass']=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x361)]['VocabNoClassAssigned'],TextManager[_0x2e2dc8(0x3da)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x361)][_0x2e2dc8(0x323)],TextManager[_0x2e2dc8(0x390)]=VisuMZ['ClassChangeSystem']['Settings'][_0x2e2dc8(0x361)][_0x2e2dc8(0x21b)],TextManager[_0x2e2dc8(0x2eb)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)][_0x2e2dc8(0x361)][_0x2e2dc8(0x318)],ColorManager[_0x2e2dc8(0x21a)]=function(_0x26deff){const _0x33636e=_0x2e2dc8;return _0x26deff=String(_0x26deff),_0x26deff['match'](/#(.*)/i)?_0x33636e(0x3b3)[_0x33636e(0x154)](String(RegExp['$1'])):this[_0x33636e(0x1a8)](Number(_0x26deff));},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x23a)]=BattleManager[_0x2e2dc8(0x254)],BattleManager[_0x2e2dc8(0x254)]=function(){const _0x4ab4a0=_0x2e2dc8;VisuMZ[_0x4ab4a0(0x1e6)][_0x4ab4a0(0x23a)]['call'](this),this[_0x4ab4a0(0x2d5)](),this[_0x4ab4a0(0x3b7)](),this[_0x4ab4a0(0x2c7)](),this[_0x4ab4a0(0x1e2)]();},VisuMZ[_0x2e2dc8(0x1e6)]['BattleManager_displayRewards']=BattleManager[_0x2e2dc8(0x274)],BattleManager[_0x2e2dc8(0x274)]=function(){const _0x58b4dd=_0x2e2dc8;VisuMZ[_0x58b4dd(0x1e6)][_0x58b4dd(0x2e6)]['call'](this),this['displayRewardsClassPoints'](),this['displayRewardsJobPoints']();},VisuMZ['ClassChangeSystem']['BattleManager_gainExp']=BattleManager[_0x2e2dc8(0x3aa)],BattleManager[_0x2e2dc8(0x3aa)]=function(){const _0x246c71=_0x2e2dc8;VisuMZ[_0x246c71(0x1e6)][_0x246c71(0x24c)]['call'](this);const _0x2f23ed=this[_0x246c71(0x3ce)][_0x246c71(0x291)];for(const _0x3a62c3 of $gameParty[_0x246c71(0x306)]()){_0x3a62c3['gainMulticlassExp'](_0x2f23ed);}},VisuMZ[_0x2e2dc8(0x1e6)]['BattleManager_endBattle']=BattleManager[_0x2e2dc8(0x259)],BattleManager[_0x2e2dc8(0x259)]=function(_0x51e3a3){const _0x215925=_0x2e2dc8;VisuMZ[_0x215925(0x1e6)][_0x215925(0x2a9)]['call'](this,_0x51e3a3);for(const _0x2572e1 of $gameParty[_0x215925(0x306)]()){_0x2572e1[_0x215925(0x190)]();}},BattleManager['makeRewardsClassPoints']=function(){const _0x3bf599=_0x2e2dc8;this[_0x3bf599(0x3ce)][_0x3bf599(0x2fd)]=$gameTroop['classPointsTotal']();},BattleManager[_0x2e2dc8(0x2d6)]=function(){const _0x1bd430=_0x2e2dc8;if(!this[_0x1bd430(0x1ed)]())return;$gameMessage[_0x1bd430(0x150)]();const _0x465ad7=$gameParty['members'](),_0x3e000b=VisuMZ[_0x1bd430(0x1e6)][_0x1bd430(0x260)][_0x1bd430(0x189)],_0x1b133b=_0x3e000b[_0x1bd430(0x3f6)];for(const _0x340c37 of _0x465ad7){if(!_0x340c37)continue;const _0xb75ba3=_0x1b133b['format'](_0x340c37['name'](),_0x340c37[_0x1bd430(0x350)](),TextManager[_0x1bd430(0x20b)],TextManager[_0x1bd430(0x388)]);$gameMessage['add']('\x5c.'+_0xb75ba3);}},BattleManager[_0x2e2dc8(0x3b7)]=function(){const _0x156cda=_0x2e2dc8;this[_0x156cda(0x3ce)][_0x156cda(0x2fd)]=this[_0x156cda(0x3ce)][_0x156cda(0x2fd)]||0x0;let _0x1bbf19=$gameParty[_0x156cda(0x306)]();VisuMZ['ClassChangeSystem']['Settings'][_0x156cda(0x189)][_0x156cda(0x1bb)]&&(_0x1bbf19=_0x1bbf19[_0x156cda(0x403)](_0x2ed1b2=>_0x2ed1b2['isAlive']()));for(const _0x2ff310 of _0x1bbf19){if(!_0x2ff310)continue;if(!$dataSystem[_0x156cda(0x1ea)]&&!_0x2ff310['isBattleMember']())continue;_0x2ff310['gainClassPoints'](this[_0x156cda(0x3ce)]['classPoints']),_0x2ff310[_0x156cda(0x290)](this['_rewards']['classPoints']);}},BattleManager['classPointsVisible']=function(){const _0x1f90e8=_0x2e2dc8;return VisuMZ[_0x1f90e8(0x1e6)]['Settings'][_0x1f90e8(0x189)][_0x1f90e8(0x3b6)];},BattleManager[_0x2e2dc8(0x2c7)]=function(){const _0x108f16=_0x2e2dc8;this['_rewards'][_0x108f16(0x16b)]=$gameTroop[_0x108f16(0x289)]();},BattleManager['displayRewardsJobPoints']=function(){const _0x2503e4=_0x2e2dc8;if(!this[_0x2503e4(0x221)]())return;$gameMessage[_0x2503e4(0x150)]();const _0x157a01=$gameParty[_0x2503e4(0x3c3)](),_0x59e02c=VisuMZ[_0x2503e4(0x1e6)][_0x2503e4(0x260)][_0x2503e4(0x1b8)],_0xb18b4=_0x59e02c[_0x2503e4(0x3f6)];for(const _0x41559f of _0x157a01){if(!_0x41559f)continue;const _0x42e7ae=_0xb18b4[_0x2503e4(0x154)](_0x41559f[_0x2503e4(0x413)](),_0x41559f['earnedJobPoints'](),TextManager['jobPointsAbbr'],TextManager[_0x2503e4(0x1cd)]);$gameMessage[_0x2503e4(0x3d4)]('\x5c.'+_0x42e7ae);}},BattleManager[_0x2e2dc8(0x1e2)]=function(){const _0x13d07b=_0x2e2dc8;this[_0x13d07b(0x3ce)][_0x13d07b(0x16b)]=this[_0x13d07b(0x3ce)]['jobPoints']||0x0;let _0x548488=$gameParty[_0x13d07b(0x306)]();VisuMZ['ClassChangeSystem'][_0x13d07b(0x260)][_0x13d07b(0x1b8)][_0x13d07b(0x1bb)]&&(_0x548488=_0x548488[_0x13d07b(0x403)](_0x53d133=>_0x53d133[_0x13d07b(0x1c1)]()));for(const _0x12e7f1 of _0x548488){if(!_0x12e7f1)continue;if(!$dataSystem[_0x13d07b(0x1ea)]&&!_0x12e7f1[_0x13d07b(0x1c8)]())continue;_0x12e7f1['gainJobPoints'](this['_rewards'][_0x13d07b(0x16b)]),_0x12e7f1[_0x13d07b(0x31a)](this[_0x13d07b(0x3ce)][_0x13d07b(0x16b)]);}},BattleManager[_0x2e2dc8(0x221)]=function(){const _0x39b274=_0x2e2dc8;return VisuMZ[_0x39b274(0x1e6)][_0x39b274(0x260)][_0x39b274(0x1b8)][_0x39b274(0x3b6)];},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x182)]=Game_System[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)],Game_System[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)]=function(){const _0x3a856d=_0x2e2dc8;VisuMZ[_0x3a856d(0x1e6)][_0x3a856d(0x182)]['call'](this),this[_0x3a856d(0x247)]();},Game_System[_0x2e2dc8(0x1ab)]['initClassChangeSystemMainMenu']=function(){const _0x44173d=_0x2e2dc8;this[_0x44173d(0x349)]={'shown':VisuMZ['ClassChangeSystem'][_0x44173d(0x260)][_0x44173d(0x35d)][_0x44173d(0x37d)],'enabled':VisuMZ[_0x44173d(0x1e6)]['Settings'][_0x44173d(0x35d)][_0x44173d(0x1c2)]};},Game_System[_0x2e2dc8(0x1ab)]['isMainMenuClassChangeSystemVisible']=function(){const _0x44e0f3=_0x2e2dc8;if(this[_0x44e0f3(0x349)]===undefined)this[_0x44e0f3(0x2be)]();return this[_0x44e0f3(0x349)]['shown'];},Game_System[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x223)]=function(_0x534296){const _0x45ce1d=_0x2e2dc8;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x45ce1d(0x2be)]();this[_0x45ce1d(0x349)][_0x45ce1d(0x362)]=_0x534296;},Game_System['prototype']['isMainMenuClassChangeSystemEnabled']=function(){const _0x5b0fbb=_0x2e2dc8;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x5b0fbb(0x2be)]();return this[_0x5b0fbb(0x349)][_0x5b0fbb(0x2c0)];},Game_System[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x305)]=function(_0x2a8597){const _0x46e40d=_0x2e2dc8;if(this[_0x46e40d(0x349)]===undefined)this[_0x46e40d(0x2be)]();this['_ClassChangeSystem_MainMenu']['enabled']=_0x2a8597;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x383)]=Game_Action[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b9)],Game_Action[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b9)]=function(_0x5d23e4){const _0x283139=_0x2e2dc8;VisuMZ[_0x283139(0x1e6)][_0x283139(0x383)][_0x283139(0x3ee)](this,_0x5d23e4),this['applyClassChangeSystemUserEffect'](_0x5d23e4);},Game_Action[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x14b)]=function(_0x33182b){const _0x6df55f=_0x2e2dc8;if(this[_0x6df55f(0x1d1)]())this[_0x6df55f(0x256)](_0x33182b);},Game_Action['prototype'][_0x2e2dc8(0x256)]=function(_0x216a3c){const _0x57e4da=_0x2e2dc8,_0x5b9080=VisuMZ[_0x57e4da(0x1e6)]['RegExp'],_0x28e50b=this[_0x57e4da(0x1d1)]()[_0x57e4da(0x1c6)];if($gameParty[_0x57e4da(0x367)]()){if(this[_0x57e4da(0x20e)]()[_0x57e4da(0x27b)]()&&_0x28e50b[_0x57e4da(0x2fc)](_0x5b9080[_0x57e4da(0x363)])){const _0xb436d=eval(RegExp['$1']);this[_0x57e4da(0x20e)]()[_0x57e4da(0x2ca)](_0xb436d);}else this[_0x57e4da(0x3bc)]();if(_0x216a3c[_0x57e4da(0x27b)]()&&_0x28e50b[_0x57e4da(0x2fc)](_0x5b9080[_0x57e4da(0x16f)])){const _0xdf7f43=eval(RegExp['$1']);_0x216a3c[_0x57e4da(0x2ca)](_0xdf7f43);}}if($gameParty['inBattle']()){if(this[_0x57e4da(0x20e)]()[_0x57e4da(0x27b)]()&&_0x28e50b[_0x57e4da(0x2fc)](_0x5b9080[_0x57e4da(0x26f)])){const _0x3109cd=eval(RegExp['$1']);this[_0x57e4da(0x20e)]()[_0x57e4da(0x239)](_0x3109cd);}else this['applyJobPoints']();if(_0x216a3c['isActor']()&&_0x28e50b[_0x57e4da(0x2fc)](_0x5b9080[_0x57e4da(0x33c)])){const _0x314da2=eval(RegExp['$1']);_0x216a3c['gainJobPoints'](_0x314da2);}}if(_0x28e50b[_0x57e4da(0x2fc)](/<NOTETAG>/i)){}},Game_Action[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3bc)]=function(){const _0x25e8c2=_0x2e2dc8;if(!$gameParty['inBattle']())return;if(!this[_0x25e8c2(0x20e)]()[_0x25e8c2(0x27b)]())return;const _0x551bea=VisuMZ[_0x25e8c2(0x1e6)][_0x25e8c2(0x260)][_0x25e8c2(0x189)];let _0x7e88c1=0x0;try{_0x7e88c1=eval(_0x551bea['PerAction']);}catch(_0x1ca342){if($gameTemp[_0x25e8c2(0x25a)]())console['log'](_0x1ca342);}this['subject']()[_0x25e8c2(0x2ca)](_0x7e88c1);},Game_Action[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x412)]=function(){const _0x31198a=_0x2e2dc8;if(!$gameParty[_0x31198a(0x367)]())return;if(!this[_0x31198a(0x20e)]()[_0x31198a(0x27b)]())return;const _0xd69cd6=VisuMZ[_0x31198a(0x1e6)][_0x31198a(0x260)]['JobPoints'];let _0x38a3d4=0x0;try{_0x38a3d4=eval(_0xd69cd6[_0x31198a(0x36b)]);}catch(_0x1309ce){if($gameTemp[_0x31198a(0x25a)]())console[_0x31198a(0x3e8)](_0x1309ce);}this[_0x31198a(0x20e)]()['gainJobPoints'](_0x38a3d4);},VisuMZ['ClassChangeSystem']['Game_Battler_gainSilentTp']=Game_Battler[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x273)],Game_Battler['prototype'][_0x2e2dc8(0x273)]=function(_0x571180){const _0x1e3273=_0x2e2dc8;this[_0x1e3273(0x2f1)]&&this[_0x1e3273(0x27b)]()&&$gameParty[_0x1e3273(0x367)]()?this['_tp']=(this[_0x1e3273(0x2e3)]+_0x571180)[_0x1e3273(0x3bd)](0x0,this[_0x1e3273(0x21c)]()):VisuMZ['ClassChangeSystem'][_0x1e3273(0x3d6)][_0x1e3273(0x3ee)](this,_0x571180);},VisuMZ[_0x2e2dc8(0x1e6)]['Game_Actor_equips']=Game_Actor[_0x2e2dc8(0x1ab)]['equips'],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x18a)]=function(){const _0x3dddac=_0x2e2dc8;return VisuMZ[_0x3dddac(0x1e6)]['antiEquipsCacheClear_BattleCore_ClassChangeSystem'](this)?VisuMZ[_0x3dddac(0x293)]['Game_Actor_equips']['call'](this):VisuMZ['ClassChangeSystem'][_0x3dddac(0x30f)]['call'](this);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x303)]=function(_0x221bee){const _0x197dd5=_0x2e2dc8;return Imported[_0x197dd5(0x28e)]&&_0x221bee[_0x197dd5(0x27b)]()&&_0x221bee[_0x197dd5(0x292)]!==undefined&&_0x221bee===BattleManager[_0x197dd5(0x301)]&&$gameParty[_0x197dd5(0x367)]();},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x40e)]=Game_Battler[_0x2e2dc8(0x1ab)]['onBattleStart'],Game_Battler['prototype'][_0x2e2dc8(0x3a9)]=function(_0x941151){const _0x189375=_0x2e2dc8;VisuMZ[_0x189375(0x1e6)]['Game_Battler_onBattleStart'][_0x189375(0x3ee)](this,_0x941151),this['isActor']()&&(this[_0x189375(0x1bc)]=this[_0x189375(0x22a)](),this[_0x189375(0x2cb)]=this[_0x189375(0x34d)]());},Game_Actor[_0x2e2dc8(0x1f7)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)]['General'][_0x2e2dc8(0x28d)],VisuMZ[_0x2e2dc8(0x1e6)]['Game_Actor_setup']=Game_Actor[_0x2e2dc8(0x1ab)]['setup'],Game_Actor['prototype'][_0x2e2dc8(0x14e)]=function(_0x5b90f0){const _0x44b381=_0x2e2dc8;VisuMZ[_0x44b381(0x1e6)]['Game_Actor_setup']['call'](this,_0x5b90f0),this[_0x44b381(0x207)](),this[_0x44b381(0x19d)](),this[_0x44b381(0x3c4)](),this['gainStartingJobPoints'](),this[_0x44b381(0x284)]();},Game_Actor['prototype'][_0x2e2dc8(0x284)]=function(){const _0x448b23=_0x2e2dc8;this['initClassChangeUnlocks'](),this['initMulticlass'](),this[_0x448b23(0x28f)](),this['initClassChangeRestrictions'](),this[_0x448b23(0x3c2)](),this[_0x448b23(0x24d)](),this['clearParamPlus'](),this['recoverAll']();},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x32f)]=Game_Actor[_0x2e2dc8(0x1ab)]['changeClass'],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x278)]=function(_0x328cd2,_0x1f6a53){const _0x34b125=_0x2e2dc8;_0x1f6a53=this[_0x34b125(0x32a)]();_0x1f6a53&&(this['_exp']=this[_0x34b125(0x1d7)]||{},this[_0x34b125(0x1d7)][_0x328cd2]=this[_0x34b125(0x1d7)][this[_0x34b125(0x1b5)]]||0x0,_0x1f6a53=![]);this['_ClassChangeSystem_preventLevelUpGain']=!![];const _0x20325c=JsonEx['makeDeepCopy'](this);_0x20325c['_tempActor']=!![],VisuMZ[_0x34b125(0x1e6)][_0x34b125(0x32f)][_0x34b125(0x3ee)](this,_0x328cd2,_0x1f6a53),this['classAdjustHpMp'](_0x20325c),this[_0x34b125(0x3ff)](),this[_0x34b125(0x3d9)](_0x328cd2),this[_0x34b125(0x32e)]=undefined;if($gamePlayer)$gamePlayer[_0x34b125(0x24d)]();},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x358)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x397)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x397)]=function(_0xa77620,_0xde2ad5){const _0x5478b9=_0x2e2dc8;if(this[_0x5478b9(0x1ff)])return![];return VisuMZ[_0x5478b9(0x1e6)][_0x5478b9(0x358)]['call'](this,_0xa77620,_0xde2ad5);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x1ca)]=Game_Actor['prototype'][_0x2e2dc8(0x1be)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1be)]=function(_0x3a98e1){const _0x27cc91=_0x2e2dc8;if($gameParty[_0x27cc91(0x367)]())return;VisuMZ[_0x27cc91(0x1e6)][_0x27cc91(0x1ca)][_0x27cc91(0x3ee)](this,_0x3a98e1);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x1c4)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1fe)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1fe)]=function(){const _0x5e81e6=_0x2e2dc8;VisuMZ[_0x5e81e6(0x1e6)][_0x5e81e6(0x1c4)][_0x5e81e6(0x3ee)](this);const _0xbfd193=this[_0x5e81e6(0x2e2)]()['id'];this[_0x5e81e6(0x18e)](_0xbfd193),this[_0x5e81e6(0x355)](_0xbfd193),this['_classLevel']=this[_0x5e81e6(0x1c9)]||{},this[_0x5e81e6(0x1c9)][_0xbfd193]=this[_0x5e81e6(0x327)],this[_0x5e81e6(0x32a)]()&&this[_0x5e81e6(0x3c2)]();},Game_Actor['prototype'][_0x2e2dc8(0x165)]=function(_0x45534b){const _0x21090d=_0x2e2dc8;if(!Game_Actor['CLASS_CHANGE_ADJUST_HP_MP'])return;const _0xccfe5a=Math['round'](_0x45534b[_0x21090d(0x1cb)]()*this[_0x21090d(0x1cc)]),_0x4142e4=Math[_0x21090d(0x237)](_0x45534b[_0x21090d(0x23c)]()*this[_0x21090d(0x1f2)]);if(this['hp']>0x0)this['setHp'](_0xccfe5a);if(this['mp']>0x0)this['setMp'](_0x4142e4);},Game_Actor['prototype'][_0x2e2dc8(0x207)]=function(){const _0x48d6ff=_0x2e2dc8;this[_0x48d6ff(0x29f)]={};},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x19d)]=function(){const _0x3bb7ff=_0x2e2dc8,_0x13c7c1=VisuMZ['ClassChangeSystem'][_0x3bb7ff(0x1eb)],_0x32a628=this[_0x3bb7ff(0x3e1)]()[_0x3bb7ff(0x1c6)];if(_0x32a628[_0x3bb7ff(0x2fc)](_0x13c7c1[_0x3bb7ff(0x1a1)])){const _0x4db612=eval(RegExp['$1']);this[_0x3bb7ff(0x2ca)](_0x4db612);}const _0x480764=VisuMZ[_0x3bb7ff(0x1e6)][_0x3bb7ff(0x260)][_0x3bb7ff(0x189)];if(!_0x480764['SharedResource'])return;const _0x5463cc=_0x32a628['match'](_0x13c7c1[_0x3bb7ff(0x2f6)]);if(_0x5463cc)for(const _0x5f4eae of _0x5463cc){if(!_0x5f4eae)continue;_0x5f4eae[_0x3bb7ff(0x2fc)](_0x13c7c1[_0x3bb7ff(0x2f6)]);const _0x3a7d0d=String(RegExp['$1']),_0x2a6a10=eval(RegExp['$2']),_0x9b7149=/^\d+$/[_0x3bb7ff(0x40d)](_0x3a7d0d);let _0x18862c=0x0;_0x9b7149?_0x18862c=Number(_0x3a7d0d):_0x18862c=DataManager['getClassIdWithName'](_0x3a7d0d),this[_0x3bb7ff(0x2ca)](_0x2a6a10,_0x18862c);}},Game_Actor[_0x2e2dc8(0x1ab)]['getClassPoints']=function(_0x5f3fa0){const _0x5412e9=_0x2e2dc8;this['_classPoints']===undefined&&this['initClassPoints']();const _0x550d8b=VisuMZ[_0x5412e9(0x1e6)][_0x5412e9(0x260)][_0x5412e9(0x189)];return _0x550d8b['SharedResource']?_0x5f3fa0=0x0:_0x5f3fa0=_0x5f3fa0||this[_0x5412e9(0x2e2)]()['id'],this['_classPoints'][_0x5f3fa0]=this[_0x5412e9(0x29f)][_0x5f3fa0]||0x0,Math['round'](this[_0x5412e9(0x29f)][_0x5f3fa0]);},Game_Actor['prototype'][_0x2e2dc8(0x3fe)]=function(_0x8df34c,_0x228d3d){const _0x95c7b9=_0x2e2dc8;this[_0x95c7b9(0x29f)]===undefined&&this[_0x95c7b9(0x207)]();const _0x547639=VisuMZ[_0x95c7b9(0x1e6)]['Settings'][_0x95c7b9(0x189)];_0x547639[_0x95c7b9(0x33a)]?_0x228d3d=0x0:_0x228d3d=_0x228d3d||this[_0x95c7b9(0x2e2)]()['id'];this[_0x95c7b9(0x29f)][_0x228d3d]=this[_0x95c7b9(0x29f)][_0x228d3d]||0x0,this[_0x95c7b9(0x29f)][_0x228d3d]=Math['round'](_0x8df34c||0x0);const _0xf0905=_0x547639['MaxResource']||Number[_0x95c7b9(0x203)];this[_0x95c7b9(0x29f)][_0x228d3d]=this[_0x95c7b9(0x29f)][_0x228d3d][_0x95c7b9(0x3bd)](0x0,_0xf0905);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2ca)]=function(_0x4c449d,_0x5abb77){const _0x10819c=_0x2e2dc8;_0x4c449d>0x0&&(_0x4c449d*=this[_0x10819c(0x1fd)]()),this[_0x10819c(0x399)](_0x4c449d,_0x5abb77);},Game_Actor['prototype'][_0x2e2dc8(0x290)]=function(_0x5d0f8b){const _0x28f825=_0x2e2dc8;if(!Imported[_0x28f825(0x258)])return;_0x5d0f8b>0x0&&(_0x5d0f8b*=this[_0x28f825(0x1fd)]()),this[_0x28f825(0x310)](_0x5d0f8b,'Class');},Game_Actor[_0x2e2dc8(0x1ab)]['addClassPoints']=function(_0x12c437,_0x177e32){const _0x4f6038=_0x2e2dc8,_0x27f680=VisuMZ[_0x4f6038(0x1e6)][_0x4f6038(0x260)]['ClassPoints'];_0x27f680[_0x4f6038(0x33a)]?_0x177e32=0x0:_0x177e32=_0x177e32||this['currentClass']()['id'],_0x12c437+=this['getClassPoints'](_0x177e32),this[_0x4f6038(0x3fe)](_0x12c437,_0x177e32);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x195)]=function(_0x1e21af,_0x3eb623){const _0x48b132=_0x2e2dc8;this[_0x48b132(0x399)](-_0x1e21af,_0x3eb623);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1fd)]=function(){const _0x180616=_0x2e2dc8;return this[_0x180616(0x3e7)]()[_0x180616(0x1de)]((_0x25ecdf,_0x11a3ef)=>{const _0x2a2006=_0x180616;return _0x11a3ef&&_0x11a3ef[_0x2a2006(0x1c6)]['match'](VisuMZ[_0x2a2006(0x1e6)][_0x2a2006(0x1eb)][_0x2a2006(0x2d0)])?_0x25ecdf*(Number(RegExp['$1'])*0.01):_0x25ecdf;},0x1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x18e)]=function(_0x2ab090){const _0x5bb820=_0x2e2dc8;if(this['_ClassChangeSystem_preventLevelUpGain'])return;const _0x511eaa=VisuMZ[_0x5bb820(0x1e6)][_0x5bb820(0x260)][_0x5bb820(0x189)];let _0x522672=0x0;try{_0x522672=eval(_0x511eaa['PerLevelUp']);}catch(_0x4ca8a1){if($gameTemp[_0x5bb820(0x25a)]())console['log'](_0x4ca8a1);}this[_0x5bb820(0x2ca)](_0x522672,_0x2ab090);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x350)]=function(){const _0x3f4d0c=_0x2e2dc8;return this[_0x3f4d0c(0x1bc)]=this[_0x3f4d0c(0x1bc)]||0x0,this[_0x3f4d0c(0x22a)]()-this[_0x3f4d0c(0x1bc)];},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3c4)]=function(){this['_jobPoints']={};},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x408)]=function(){const _0x1decc0=_0x2e2dc8,_0x2589a2=VisuMZ['ClassChangeSystem'][_0x1decc0(0x1eb)],_0x284ea6=this[_0x1decc0(0x3e1)]()[_0x1decc0(0x1c6)];if(_0x284ea6[_0x1decc0(0x2fc)](_0x2589a2[_0x1decc0(0x272)])){const _0x7e9230=eval(RegExp['$1']);this[_0x1decc0(0x239)](_0x7e9230);}const _0xc0992e=VisuMZ[_0x1decc0(0x1e6)][_0x1decc0(0x260)][_0x1decc0(0x1b8)];if(!_0xc0992e[_0x1decc0(0x33a)])return;const _0x10363e=_0x284ea6[_0x1decc0(0x2fc)](_0x2589a2[_0x1decc0(0x356)]);if(_0x10363e)for(const _0x47c419 of _0x10363e){if(!_0x47c419)continue;_0x47c419[_0x1decc0(0x2fc)](_0x2589a2[_0x1decc0(0x356)]);const _0x5be2d7=String(RegExp['$1']),_0x23d0de=eval(RegExp['$2']),_0x33f3d4=/^\d+$/[_0x1decc0(0x40d)](_0x5be2d7);let _0x2d4ea7=0x0;_0x33f3d4?_0x2d4ea7=Number(_0x5be2d7):_0x2d4ea7=DataManager[_0x1decc0(0x169)](_0x5be2d7),this[_0x1decc0(0x239)](_0x23d0de,_0x2d4ea7);}},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x34d)]=function(_0x16015b){const _0x4c1ac9=_0x2e2dc8;this[_0x4c1ac9(0x2dc)]===undefined&&this[_0x4c1ac9(0x3c4)]();const _0x854b18=VisuMZ['ClassChangeSystem'][_0x4c1ac9(0x260)]['JobPoints'];return _0x854b18[_0x4c1ac9(0x33a)]?_0x16015b=0x0:_0x16015b=_0x16015b||this[_0x4c1ac9(0x2e2)]()['id'],this[_0x4c1ac9(0x2dc)][_0x16015b]=this[_0x4c1ac9(0x2dc)][_0x16015b]||0x0,Math[_0x4c1ac9(0x237)](this[_0x4c1ac9(0x2dc)][_0x16015b]);},Game_Actor[_0x2e2dc8(0x1ab)]['setJobPoints']=function(_0x9dbb68,_0x415ea5){const _0x19c04a=_0x2e2dc8;this[_0x19c04a(0x2dc)]===undefined&&this[_0x19c04a(0x3c4)]();const _0x1cb4a5=VisuMZ[_0x19c04a(0x1e6)][_0x19c04a(0x260)][_0x19c04a(0x1b8)];_0x1cb4a5['SharedResource']?_0x415ea5=0x0:_0x415ea5=_0x415ea5||this[_0x19c04a(0x2e2)]()['id'];this[_0x19c04a(0x2dc)][_0x415ea5]=this[_0x19c04a(0x2dc)][_0x415ea5]||0x0,this[_0x19c04a(0x2dc)][_0x415ea5]=Math[_0x19c04a(0x237)](_0x9dbb68||0x0);const _0x4998be=_0x1cb4a5['MaxResource']||Number[_0x19c04a(0x203)];this[_0x19c04a(0x2dc)][_0x415ea5]=this[_0x19c04a(0x2dc)][_0x415ea5][_0x19c04a(0x3bd)](0x0,_0x4998be);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x239)]=function(_0x4584fc,_0x4fb3b1){const _0x359e55=_0x2e2dc8;_0x4584fc>0x0&&(_0x4584fc*=this[_0x359e55(0x2d1)]()),this[_0x359e55(0x187)](_0x4584fc,_0x4fb3b1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x31a)]=function(_0x447c65){const _0x49c3cf=_0x2e2dc8;if(!Imported[_0x49c3cf(0x258)])return;_0x447c65>0x0&&(_0x447c65*=this[_0x49c3cf(0x2d1)]()),this['gainMulticlassRewardPoints'](_0x447c65,'Job');},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x187)]=function(_0x31c556,_0x43d3d8){const _0x3c1a24=_0x2e2dc8,_0x4aaa21=VisuMZ['ClassChangeSystem']['Settings'][_0x3c1a24(0x1b8)];_0x4aaa21[_0x3c1a24(0x33a)]?_0x43d3d8=0x0:_0x43d3d8=_0x43d3d8||this['currentClass']()['id'],_0x31c556+=this[_0x3c1a24(0x34d)](_0x43d3d8),this['setJobPoints'](_0x31c556,_0x43d3d8);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x22d)]=function(_0x3d0e98,_0x5f0e3c){const _0x1339b8=_0x2e2dc8;this[_0x1339b8(0x187)](-_0x3d0e98,_0x5f0e3c);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2d1)]=function(){const _0x4c9a52=_0x2e2dc8;return this[_0x4c9a52(0x3e7)]()[_0x4c9a52(0x1de)]((_0x6f6ff1,_0x5b27ce)=>{const _0x26035f=_0x4c9a52;return _0x5b27ce&&_0x5b27ce['note']['match'](VisuMZ[_0x26035f(0x1e6)]['RegExp'][_0x26035f(0x28b)])?_0x6f6ff1*(Number(RegExp['$1'])*0.01):_0x6f6ff1;},0x1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x355)]=function(_0x3b4290){const _0x156ed1=_0x2e2dc8;if(this[_0x156ed1(0x32e)])return;const _0x1d0d4e=VisuMZ[_0x156ed1(0x1e6)][_0x156ed1(0x260)]['JobPoints'];let _0x48c158=0x0;try{_0x48c158=eval(_0x1d0d4e[_0x156ed1(0x402)]);}catch(_0x2d18b9){if($gameTemp[_0x156ed1(0x25a)]())console[_0x156ed1(0x3e8)](_0x2d18b9);}this['gainJobPoints'](_0x48c158,_0x3b4290);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x214)]=function(){const _0x4e00f2=_0x2e2dc8;return this[_0x4e00f2(0x2cb)]=this[_0x4e00f2(0x2cb)]||0x0,this['getJobPoints']()-this[_0x4e00f2(0x2cb)];},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x152)]=Game_Actor[_0x2e2dc8(0x1ab)]['setFaceImage'],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x201)]=function(_0x3087c1,_0xec6be8){const _0x110ee3=_0x2e2dc8;_0x3087c1!==''?(this['_priorityFaceName']=_0x3087c1,this['_priorityFaceIndex']=_0xec6be8):(this[_0x110ee3(0x1ac)]=undefined,this[_0x110ee3(0x3a6)]=undefined);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x29b)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x38f)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x38f)]=function(){const _0x5f0d88=_0x2e2dc8;if(this[_0x5f0d88(0x1ac)]!==undefined)return this[_0x5f0d88(0x1ac)];return ImageManager['getActorClassFaceName'](this)||VisuMZ[_0x5f0d88(0x1e6)]['Game_Actor_faceName'][_0x5f0d88(0x3ee)](this);},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x2fe)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2cf)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2cf)]=function(){const _0x6b44ce=_0x2e2dc8;if(this[_0x6b44ce(0x3a6)]!==undefined)return this[_0x6b44ce(0x3a6)];const _0x2fc2c6=ImageManager[_0x6b44ce(0x342)](this);if(_0x2fc2c6!==undefined)return _0x2fc2c6;return VisuMZ[_0x6b44ce(0x1e6)][_0x6b44ce(0x2fe)][_0x6b44ce(0x3ee)](this);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x321)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x40a)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x40a)]=function(_0x5d2fbe,_0x142711){const _0x3cd94a=_0x2e2dc8;_0x5d2fbe!==''?(this[_0x3cd94a(0x2e5)]=_0x5d2fbe,this[_0x3cd94a(0x1e4)]=_0x142711):(this[_0x3cd94a(0x2e5)]=undefined,this[_0x3cd94a(0x1e4)]=undefined);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3c9)]=Game_Actor['prototype'][_0x2e2dc8(0x2e8)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2e8)]=function(){const _0x2eb02b=_0x2e2dc8;if(this[_0x2eb02b(0x2e5)]!==undefined)return this[_0x2eb02b(0x2e5)];return ImageManager[_0x2eb02b(0x2ba)](this)||VisuMZ['ClassChangeSystem'][_0x2eb02b(0x3c9)][_0x2eb02b(0x3ee)](this);},VisuMZ[_0x2e2dc8(0x1e6)]['Game_Actor_characterIndex']=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x23d)],Game_Actor['prototype'][_0x2e2dc8(0x23d)]=function(){const _0x40d970=_0x2e2dc8;if(this[_0x40d970(0x1e4)]!==undefined)return this[_0x40d970(0x1e4)];const _0x41ab89=ImageManager[_0x40d970(0x1ef)](this);if(_0x41ab89!==undefined)return _0x41ab89;return VisuMZ[_0x40d970(0x1e6)][_0x40d970(0x294)][_0x40d970(0x3ee)](this);},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x2ec)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x174)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x174)]=function(_0x575530){const _0x33dcc0=_0x2e2dc8;_0x575530!==''?this['_priorityBattlerName']=_0x575530:this[_0x33dcc0(0x14d)]=undefined;},VisuMZ[_0x2e2dc8(0x1e6)]['Game_Actor_battlerName']=Game_Actor[_0x2e2dc8(0x1ab)]['battlerName'],Game_Actor[_0x2e2dc8(0x1ab)]['battlerName']=function(){const _0x626806=_0x2e2dc8;if(this['_priorityBattlerName']!==undefined)return this[_0x626806(0x14d)];return ImageManager[_0x626806(0x36c)](this)||VisuMZ[_0x626806(0x1e6)][_0x626806(0x15f)][_0x626806(0x3ee)](this);;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x210)]=Game_Actor['prototype'][_0x2e2dc8(0x1b3)],Game_Actor['prototype'][_0x2e2dc8(0x1b3)]=function(_0x43d0ae){const _0x1bf473=_0x2e2dc8;_0x43d0ae!==''?this[_0x1bf473(0x225)]=_0x43d0ae:this['_priorityMenuImage']=undefined;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x3db)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b2)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b2)]=function(){const _0x540c32=_0x2e2dc8;if(this['_priorityMenuImage']!==undefined)return this[_0x540c32(0x225)];return ImageManager[_0x540c32(0x15e)](this)||VisuMZ[_0x540c32(0x1e6)][_0x540c32(0x3db)][_0x540c32(0x3ee)](this);;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x38a)]=Game_Actor['prototype'][_0x2e2dc8(0x1e9)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1e9)]=function(_0x3aad0d){const _0x58c07a=_0x2e2dc8;_0x3aad0d!==''?this[_0x58c07a(0x222)]=_0x3aad0d:this['_priorityBattlePortrait']=undefined;if(SceneManager[_0x58c07a(0x3b5)]()&&$gameParty[_0x58c07a(0x406)]()['includes'](this)){const _0x517d52=SceneManager[_0x58c07a(0x3a8)][_0x58c07a(0x2ef)];if(_0x517d52)_0x517d52['refreshActorPortrait'](this);}},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3b8)]=Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1fa)],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1fa)]=function(){const _0x5a9bc0=_0x2e2dc8;if(this[_0x5a9bc0(0x222)]!==undefined)return this[_0x5a9bc0(0x222)];return ImageManager[_0x5a9bc0(0x3e0)](this)||VisuMZ[_0x5a9bc0(0x1e6)]['Game_Actor_getBattlePortraitFilename'][_0x5a9bc0(0x3ee)](this);;},Game_Actor[_0x2e2dc8(0x1ab)]['initClassChangeUnlocks']=function(){const _0x4fc097=_0x2e2dc8;this['_unlockedClasses']=[this[_0x4fc097(0x2e2)]()['id']];const _0x53d3a0=VisuMZ[_0x4fc097(0x1e6)][_0x4fc097(0x1eb)],_0x22147e=this[_0x4fc097(0x3e1)]()[_0x4fc097(0x1c6)],_0x20f410=_0x22147e[_0x4fc097(0x2fc)](_0x53d3a0[_0x4fc097(0x283)]);if(_0x20f410)for(const _0x46c018 of _0x20f410){if(!_0x46c018)continue;_0x46c018[_0x4fc097(0x2fc)](_0x53d3a0[_0x4fc097(0x283)]);const _0x31a300=String(RegExp['$1'])['split'](',');for(let _0x19687a of _0x31a300){_0x19687a=(String(_0x19687a)||'')['trim']();const _0x32dc33=/^\d+$/[_0x4fc097(0x40d)](_0x19687a);_0x32dc33?this[_0x4fc097(0x297)][_0x4fc097(0x1a3)](Number(_0x19687a)):this[_0x4fc097(0x297)][_0x4fc097(0x1a3)](DataManager['getClassIdWithName'](_0x19687a));}}},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2a7)]=function(){const _0x3821f7=_0x2e2dc8;if(this[_0x3821f7(0x297)]===undefined)this[_0x3821f7(0x1a6)]();return this[_0x3821f7(0x297)];},Game_Actor['prototype'][_0x2e2dc8(0x1b4)]=function(_0x23b161){const _0x2c0b2a=_0x2e2dc8;if(this[_0x2c0b2a(0x297)]===undefined)this['initClassChangeUnlocks']();if(this[_0x2c0b2a(0x297)][_0x2c0b2a(0x2b6)](_0x23b161))return;this[_0x2c0b2a(0x297)][_0x2c0b2a(0x1a3)](_0x23b161),this[_0x2c0b2a(0x297)][_0x2c0b2a(0x226)](0x0),this[_0x2c0b2a(0x297)][_0x2c0b2a(0x24e)](function(_0x40b140,_0x431b1b){return _0x40b140-_0x431b1b;});},Game_Actor['prototype'][_0x2e2dc8(0x1e7)]=function(_0x19bb1f){const _0x13de34=_0x2e2dc8;if(this[_0x13de34(0x297)]===undefined)this[_0x13de34(0x1a6)]();if(!this[_0x13de34(0x297)][_0x13de34(0x2b6)](_0x19bb1f))return;this['_unlockedClasses'][_0x13de34(0x226)](_0x19bb1f)['remove'](null),this['_unlockedClasses']['sort'](function(_0xda04ea,_0x28dc2b){return _0xda04ea-_0x28dc2b;});},Game_Actor[_0x2e2dc8(0x1ab)]['naturalUnlockClass']=function(_0x46d749){const _0x412802=_0x2e2dc8;this[_0x412802(0x1b4)](_0x46d749);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x376)]=function(){const _0x38c7a4=_0x2e2dc8;this[_0x38c7a4(0x295)]=VisuMZ[_0x38c7a4(0x1e6)][_0x38c7a4(0x260)][_0x38c7a4(0x229)][_0x38c7a4(0x2fa)],this[_0x38c7a4(0x15b)]=[this['_classId']];const _0x2ef454=this[_0x38c7a4(0x3e1)]()[_0x38c7a4(0x1c6)],_0x23874e=VisuMZ['ClassChangeSystem'][_0x38c7a4(0x1eb)];_0x2ef454[_0x38c7a4(0x2fc)](_0x23874e[_0x38c7a4(0x2fa)])&&(this[_0x38c7a4(0x295)]=Number(RegExp['$1']));const _0x2e9e34=_0x2ef454['match'](_0x23874e[_0x38c7a4(0x360)]);if(_0x2e9e34)for(const _0x5989f0 of _0x2e9e34){if(!_0x5989f0)continue;_0x5989f0[_0x38c7a4(0x2fc)](_0x23874e['StartingClassTier']);const _0x4dc851=Number(RegExp['$1'])-0x1;if(_0x4dc851+0x1>this[_0x38c7a4(0x295)])continue;let _0x17ca54=(String(RegExp['$2'])||'')['trim']();const _0x285cf8=/^\d+$/[_0x38c7a4(0x40d)](_0x17ca54);_0x285cf8?this['_multiclasses'][_0x4dc851]=Number(_0x17ca54):this[_0x38c7a4(0x15b)][_0x4dc851]=DataManager['getClassIdWithName'](_0x17ca54);}this[_0x38c7a4(0x3ff)](),this['_multiclassTiers']=this['_multiclassTiers'][_0x38c7a4(0x3bd)](0x1,VisuMZ[_0x38c7a4(0x1e6)][_0x38c7a4(0x260)]['Multiclass'][_0x38c7a4(0x2c9)]||0x1);for(const _0x13c158 of this['_multiclasses']){this[_0x38c7a4(0x1b4)](_0x13c158);}},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x192)]=function(){const _0x16e26f=_0x2e2dc8;if(this[_0x16e26f(0x15b)]===undefined)this['initMulticlass']();return this[_0x16e26f(0x15b)][0x0]=this[_0x16e26f(0x1b5)],this['_multiclasses'][_0x16e26f(0x403)](_0x322ea6=>!!$dataClasses[_0x322ea6])[_0x16e26f(0x268)](_0x254180=>$dataClasses[_0x254180]);},Game_Actor[_0x2e2dc8(0x1ab)]['multiclasses']=function(){return this['getMulticlasses']();},Game_Actor['prototype'][_0x2e2dc8(0x1f4)]=function(_0x3ff6c4){const _0x136d79=_0x2e2dc8;if(this[_0x136d79(0x15b)]===undefined)this['initMulticlass']();return _0x3ff6c4-=0x1,$dataClasses[this[_0x136d79(0x15b)][_0x3ff6c4]]||null;},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x386)]=function(_0x30561b){const _0x550f5e=_0x2e2dc8;return this[_0x550f5e(0x1f4)](_0x30561b);},Game_Actor[_0x2e2dc8(0x1ab)]['multiclassId']=function(_0x18ba1f){const _0x1efcd6=_0x2e2dc8,_0x4851f2=this[_0x1efcd6(0x1f4)](_0x18ba1f);return _0x4851f2?_0x4851f2['id']:0x0;},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x341)]=function(){const _0x54f36b=_0x2e2dc8;if(this[_0x54f36b(0x295)]===undefined)this['initMulticlass']();return this['_multiclassTiers']=this['_multiclassTiers']['clamp'](0x1,VisuMZ[_0x54f36b(0x1e6)]['Settings'][_0x54f36b(0x3d3)][_0x54f36b(0x2c9)]||0x1),this['_multiclassTiers'];},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2e9)]=function(_0xc6c6cb){const _0x723d64=_0x2e2dc8;if(this[_0x723d64(0x295)]===undefined)this['initMulticlass']();this[_0x723d64(0x295)]=_0xc6c6cb['clamp'](0x1,VisuMZ['ClassChangeSystem']['Settings']['Multiclass'][_0x723d64(0x2c9)]||0x1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x15a)]=function(_0x585c9e){const _0x3d793d=_0x2e2dc8;_0x585c9e+=this['totalMulticlass'](),this[_0x3d793d(0x2e9)](_0x585c9e);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x25c)]=function(_0x2926db){const _0x5666c7=_0x2e2dc8;_0x2926db=this[_0x5666c7(0x341)]()-_0x2926db,this[_0x5666c7(0x2e9)](_0x2926db);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3ff)]=function(){const _0x463879=_0x2e2dc8;if(this[_0x463879(0x15b)]===undefined)this[_0x463879(0x376)]();let _0x76730e=![];const _0x2bc046=this[_0x463879(0x341)]();while(this['_multiclasses'][_0x463879(0x2c9)]>_0x2bc046){_0x76730e=!![],this[_0x463879(0x15b)][_0x463879(0x1da)]();}this[_0x463879(0x15b)][0x0]=this[_0x463879(0x2e2)]()['id'];const _0x350732=this[_0x463879(0x15b)]['length'];for(let _0x2e3394=0x1;_0x2e3394<_0x350732;_0x2e3394++){this['_multiclasses'][_0x2e3394]===this[_0x463879(0x2e2)]()['id']&&(this[_0x463879(0x15b)][_0x2e3394]=0x0,_0x76730e=!![]);}if(_0x76730e)this[_0x463879(0x24d)]();},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x2c4)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x22e)],Game_BattlerBase['prototype']['elementRate']=function(_0x4a40ec){const _0x2b1a27=_0x2e2dc8;if(this[_0x2b1a27(0x27b)]())this[_0x2b1a27(0x292)]='ElementRates';let _0x28c738=VisuMZ[_0x2b1a27(0x1e6)][_0x2b1a27(0x2c4)][_0x2b1a27(0x3ee)](this,_0x4a40ec);if(this[_0x2b1a27(0x27b)]())this[_0x2b1a27(0x292)]=undefined;return _0x28c738;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x1f6)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3a7)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3a7)]=function(_0x11c556){const _0x59f177=_0x2e2dc8;if(this['isActor']())this[_0x59f177(0x292)]=_0x59f177(0x1d9);let _0x3a41b1=VisuMZ[_0x59f177(0x1e6)][_0x59f177(0x1f6)][_0x59f177(0x3ee)](this,_0x11c556);if(this[_0x59f177(0x27b)]())this['_multiclassCheck']=undefined;return _0x3a41b1;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3a4)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x31c)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x31c)]=function(_0xc21f1f){const _0x12367b=_0x2e2dc8;if(this[_0x12367b(0x27b)]())this[_0x12367b(0x292)]=_0x12367b(0x240);let _0x41693c=VisuMZ['ClassChangeSystem'][_0x12367b(0x3a4)][_0x12367b(0x3ee)](this,_0xc21f1f);if(this[_0x12367b(0x27b)]())this['_multiclassCheck']=undefined;return _0x41693c;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3f9)]=Game_BattlerBase[_0x2e2dc8(0x1ab)]['stateResistSet'],Game_BattlerBase[_0x2e2dc8(0x1ab)]['stateResistSet']=function(){const _0x8c70aa=_0x2e2dc8;if(this[_0x8c70aa(0x27b)]())this[_0x8c70aa(0x292)]='StateResistance';let _0x55f82d=VisuMZ[_0x8c70aa(0x1e6)]['Game_BattlerBase_stateResistSet']['call'](this);if(this[_0x8c70aa(0x27b)]())this['_multiclassCheck']=undefined;return _0x55f82d;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_paramRate']=Game_BattlerBase[_0x2e2dc8(0x1ab)]['paramRate'],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3c0)]=function(_0x5743fc){const _0x5014e0=_0x2e2dc8;if(this[_0x5014e0(0x27b)]())this[_0x5014e0(0x292)]=_0x5014e0(0x319);let _0x3a3a84=VisuMZ['ClassChangeSystem'][_0x5014e0(0x410)][_0x5014e0(0x3ee)](this,_0x5743fc);if(this[_0x5014e0(0x27b)]())this[_0x5014e0(0x292)]=undefined;return _0x3a3a84;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x1f9)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x202)],Game_BattlerBase[_0x2e2dc8(0x1ab)]['xparam']=function(_0x53a1d1){const _0x4cf740=_0x2e2dc8;if(this[_0x4cf740(0x27b)]())this['_multiclassCheck']=_0x4cf740(0x2a8);let _0x549229=VisuMZ[_0x4cf740(0x1e6)]['Game_BattlerBase_xparam'][_0x4cf740(0x3ee)](this,_0x53a1d1);if(this[_0x4cf740(0x27b)]())this[_0x4cf740(0x292)]=undefined;return _0x549229;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x2ea)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x215)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x215)]=function(_0x2d9e4f){const _0x599dbb=_0x2e2dc8;if(this[_0x599dbb(0x27b)]())this[_0x599dbb(0x292)]=_0x599dbb(0x16e);let _0x5a35af=VisuMZ['ClassChangeSystem'][_0x599dbb(0x2ea)]['call'](this,_0x2d9e4f);if(this[_0x599dbb(0x27b)]())this[_0x599dbb(0x292)]=undefined;return _0x5a35af;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x407)]=Game_BattlerBase['prototype']['attackElements'],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x218)]=function(){const _0x5ad303=_0x2e2dc8;if(this['isActor']())this[_0x5ad303(0x292)]=_0x5ad303(0x156);let _0x45fd22=VisuMZ[_0x5ad303(0x1e6)][_0x5ad303(0x407)][_0x5ad303(0x3ee)](this);if(this['isActor']())this['_multiclassCheck']=undefined;return _0x45fd22;},VisuMZ[_0x2e2dc8(0x1e6)]['Game_BattlerBase_attackStates']=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1f1)],Game_BattlerBase['prototype'][_0x2e2dc8(0x1f1)]=function(){const _0x4bcde5=_0x2e2dc8;if(this[_0x4bcde5(0x27b)]())this[_0x4bcde5(0x292)]='AttackStates';let _0x3a039f=VisuMZ[_0x4bcde5(0x1e6)][_0x4bcde5(0x282)]['call'](this);if(this[_0x4bcde5(0x27b)]())this['_multiclassCheck']=undefined;return _0x3a039f;},VisuMZ[_0x2e2dc8(0x1e6)]['Game_BattlerBase_attackStatesRate']=Game_BattlerBase['prototype'][_0x2e2dc8(0x3ed)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3ed)]=function(_0x5fc609){const _0x11381e=_0x2e2dc8;if(this['isActor']())this[_0x11381e(0x292)]=_0x11381e(0x213);let _0x81b898=VisuMZ['ClassChangeSystem'][_0x11381e(0x2d3)][_0x11381e(0x3ee)](this,_0x5fc609);if(this[_0x11381e(0x27b)]())this['_multiclassCheck']=undefined;return _0x81b898;},VisuMZ[_0x2e2dc8(0x1e6)]['Game_BattlerBase_addedSkillTypes']=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x33e)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x33e)]=function(){const _0x171087=_0x2e2dc8;if(this[_0x171087(0x27b)]())this['_multiclassCheck']=_0x171087(0x168);let _0x17dcf1=VisuMZ[_0x171087(0x1e6)][_0x171087(0x242)][_0x171087(0x3ee)](this);if(this[_0x171087(0x27b)]())this[_0x171087(0x292)]=undefined;return _0x17dcf1;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x17d)]=Game_BattlerBase['prototype'][_0x2e2dc8(0x2a4)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2a4)]=function(){const _0x2b88bb=_0x2e2dc8;if(this['isActor']())this[_0x2b88bb(0x292)]='AddedSkills';let _0x1f0af5=VisuMZ[_0x2b88bb(0x1e6)][_0x2b88bb(0x17d)]['call'](this);if(this[_0x2b88bb(0x27b)]())this[_0x2b88bb(0x292)]=undefined;return _0x1f0af5;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x1e5)]=Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x255)],Game_BattlerBase[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x255)]=function(_0x2a07e0){const _0x5d132e=_0x2e2dc8;if(this[_0x5d132e(0x27b)]())this['_multiclassCheck']=_0x5d132e(0x208);let _0xfc8d81=VisuMZ['ClassChangeSystem']['Game_BattlerBase_isEquipWtypeOk']['call'](this,_0x2a07e0);if(this[_0x5d132e(0x27b)]())this[_0x5d132e(0x292)]=undefined;return _0xfc8d81;},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3d0)]=Game_BattlerBase[_0x2e2dc8(0x1ab)]['isEquipAtypeOk'],Game_BattlerBase[_0x2e2dc8(0x1ab)]['isEquipAtypeOk']=function(_0x3a8958){const _0x5ac5af=_0x2e2dc8;if(this[_0x5ac5af(0x27b)]())this['_multiclassCheck']=_0x5ac5af(0x338);let _0x8637f1=VisuMZ['ClassChangeSystem'][_0x5ac5af(0x3d0)][_0x5ac5af(0x3ee)](this,_0x3a8958);if(this['isActor']())this[_0x5ac5af(0x292)]=undefined;return _0x8637f1;},VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x325)]=Game_Actor[_0x2e2dc8(0x1ab)]['traitObjects'],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3e7)]=function(){const _0xa1480a=_0x2e2dc8;let _0x3abb5c=VisuMZ['ClassChangeSystem'][_0xa1480a(0x325)][_0xa1480a(0x3ee)](this);return this[_0xa1480a(0x292)]&&(_0x3abb5c=this[_0xa1480a(0x2ab)](_0x3abb5c)),_0x3abb5c;},Game_Actor['prototype'][_0x2e2dc8(0x2ab)]=function(_0x4e04d6){const _0x1c04cb=_0x2e2dc8;if(this['_multiclasses']===undefined)this[_0x1c04cb(0x376)]();const _0x2af3ad=this[_0x1c04cb(0x292)];let _0x4eecaf=_0x4e04d6[_0x1c04cb(0x241)](this['currentClass']());const _0x5883d3=VisuMZ[_0x1c04cb(0x1e6)][_0x1c04cb(0x260)][_0x1c04cb(0x3d3)],_0xdfb700=_0x5883d3[_0x1c04cb(0x2c9)];for(let _0x38244f=0x1;_0x38244f<_0xdfb700;_0x38244f++){let _0x19dec4=$dataClasses[this[_0x1c04cb(0x15b)][_0x38244f]||0x0];if(!_0x19dec4)continue;if(_0x19dec4===this['currentClass']())continue;const _0x16e861=_0x5883d3[_0x38244f];if(!_0x16e861)continue;_0x16e861[this[_0x1c04cb(0x292)]]&&_0x4e04d6[_0x1c04cb(0x345)](++_0x4eecaf,0x0,_0x19dec4);}return _0x4e04d6;},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x310)]=function(_0x597898,_0x57aad6){const _0x12f8fa=_0x2e2dc8;if(_0x597898<=0x0)return;if(!_0x57aad6)return;if(!$dataSystem[_0x12f8fa(0x1ea)]&&!this['isBattleMember']())return;this[_0x12f8fa(0x192)]();const _0x52ad9f=VisuMZ[_0x12f8fa(0x1e6)][_0x12f8fa(0x260)]['Multiclass'],_0x16b0d1=_0x52ad9f[_0x12f8fa(0x2c9)];for(let _0x223c3c=0x1;_0x223c3c<_0x16b0d1;_0x223c3c++){let _0x2adaaf=$dataClasses[this[_0x12f8fa(0x15b)][_0x223c3c]||0x0];if(!_0x2adaaf)continue;if(_0x2adaaf===this[_0x12f8fa(0x2e2)]())continue;const _0x3e14a5=_0x52ad9f[_0x223c3c];if(!_0x3e14a5)continue;if(this['gain%1Points'[_0x12f8fa(0x154)](_0x57aad6)]){const _0x5318e5=_0x3e14a5[_0x12f8fa(0x1e1)],_0x53eaae=_0x5318e5*_0x597898;this[_0x12f8fa(0x3c6)[_0x12f8fa(0x154)](_0x57aad6)](_0x53eaae,this[_0x12f8fa(0x15b)][_0x223c3c]);}}},Game_Actor[_0x2e2dc8(0x1ab)]['gainMulticlassExp']=function(_0x2dc54d){const _0x215301=_0x2e2dc8;if(!_0x2dc54d)return;if(this[_0x215301(0x32a)]())return;this['getMulticlasses']();const _0x1df3f2=VisuMZ[_0x215301(0x1e6)]['Settings'][_0x215301(0x3d3)],_0x3014a5=_0x1df3f2['length'];for(let _0xb2b8d7=0x1;_0xb2b8d7<_0x3014a5;_0xb2b8d7++){let _0x784f17=$dataClasses[this[_0x215301(0x15b)][_0xb2b8d7]||0x0];if(!_0x784f17)continue;if(_0x784f17===this[_0x215301(0x2e2)]())continue;const _0x5b79a2=_0x1df3f2[_0xb2b8d7];if(!_0x5b79a2)continue;const _0x4a7719=_0x5b79a2[_0x215301(0x1f0)],_0x2e77fa=Math[_0x215301(0x237)](_0x2dc54d*_0x4a7719*this[_0x215301(0x200)]()),_0x58baae=this[_0x215301(0x15b)][_0xb2b8d7];this['_exp'][_0x58baae]=this['_exp'][_0x58baae]||0x0;const _0x559979=this[_0x215301(0x1d7)][_0x58baae]+_0x2e77fa;this[_0x215301(0x160)](_0x559979,_0x58baae);}},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x370)]=function(_0x2696f4,_0x516ee3){const _0x4ac9e8=_0x2e2dc8;if(this[_0x4ac9e8(0x15b)]===undefined)this['initMulticlass']();_0x516ee3-=0x1;if(_0x2696f4<=0x0&&_0x516ee3<=0x0)return;this[_0x4ac9e8(0x1b4)](_0x2696f4);const _0x2e25b1=this[_0x4ac9e8(0x15b)][_0x4ac9e8(0x2c9)];for(let _0x26c785=0x0;_0x26c785<_0x2e25b1;_0x26c785++){this[_0x4ac9e8(0x15b)][_0x26c785]===_0x2696f4&&(this['_multiclasses'][_0x26c785]=0x0);}this[_0x4ac9e8(0x15b)][0x0]=this[_0x4ac9e8(0x2e2)]()['id'];if(_0x516ee3<=0x0){this[_0x4ac9e8(0x278)](_0x2696f4);return;}const _0x32b713=JsonEx[_0x4ac9e8(0x392)](this);_0x32b713[_0x4ac9e8(0x1ff)]=!![],this[_0x4ac9e8(0x15b)][_0x516ee3]=_0x2696f4,this[_0x4ac9e8(0x3ff)](),this['refresh'](),this[_0x4ac9e8(0x165)](_0x32b713),this[_0x4ac9e8(0x3ff)]();},Game_Actor['prototype'][_0x2e2dc8(0x3e3)]=function(_0x1ea9da){const _0x623508=_0x2e2dc8;if(this[_0x623508(0x15b)]===undefined)this[_0x623508(0x376)]();return this['_multiclasses'][0x0]=this[_0x623508(0x2e2)]()['id'],this[_0x623508(0x15b)][_0x623508(0x241)](_0x1ea9da)+0x1;},Game_Actor[_0x2e2dc8(0x1ab)]['initClassLevels']=function(){const _0x553244=_0x2e2dc8;this[_0x553244(0x1c9)]={},this['_classLevel'][this[_0x553244(0x2e2)]()['id']]=this[_0x553244(0x327)];},Game_Actor['prototype']['maintainLevels']=function(){const _0x291663=_0x2e2dc8;return VisuMZ['ClassChangeSystem']['Settings']['General'][_0x291663(0x2a1)];},Game_Actor['prototype'][_0x2e2dc8(0x220)]=function(_0x17c1d3){const _0x30733a=_0x2e2dc8;if(this[_0x30733a(0x32a)]())return this[_0x30733a(0x327)];return this[_0x30733a(0x230)](_0x17c1d3),this[_0x30733a(0x1c9)][_0x17c1d3];},Game_Actor[_0x2e2dc8(0x1ab)]['changeClassExp']=function(_0xa3c640,_0x45a949){const _0x407168=_0x2e2dc8;if(this[_0x407168(0x32a)]())return this[_0x407168(0x326)](_0xa3c640);this[_0x407168(0x1d7)][_0x45a949]=Math['max'](_0xa3c640,0x0),this[_0x407168(0x230)](_0x45a949);if(_0x45a949===this[_0x407168(0x2e2)]()['id'])this[_0x407168(0x24d)]();},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x230)]=function(_0x5f169a){const _0x538f00=_0x2e2dc8;if(this[_0x538f00(0x32a)]())return;this[_0x538f00(0x1d7)][_0x5f169a]=this[_0x538f00(0x1d7)][_0x5f169a]||0x0,this[_0x538f00(0x1c9)]=this[_0x538f00(0x1c9)]||{},this[_0x538f00(0x1c9)][_0x5f169a]=this[_0x538f00(0x1c9)][_0x5f169a]||0x1;while(!(this[_0x538f00(0x1c9)][_0x5f169a]>=this[_0x538f00(0x3f7)]())&&this[_0x538f00(0x1d7)][_0x5f169a]>=this[_0x538f00(0x21d)](_0x5f169a,this[_0x538f00(0x1c9)][_0x5f169a])){this[_0x538f00(0x1c9)][_0x5f169a]+=0x1,this[_0x538f00(0x175)](_0x5f169a);}while(this[_0x538f00(0x1d7)][_0x5f169a]<this[_0x538f00(0x372)](_0x5f169a,this[_0x538f00(0x1c9)][_0x5f169a])){this['_classLevel'][_0x5f169a]-=0x1;}this[_0x538f00(0x3c2)]();},Game_Actor[_0x2e2dc8(0x1ab)]['expForClassLevel']=function(_0x9ed280,_0x26c9e9){const _0x1b435e=_0x2e2dc8,_0x2c2d58=$dataClasses[_0x9ed280],_0xcfd5d9=_0x2c2d58[_0x1b435e(0x2d4)][0x0],_0x2549ba=_0x2c2d58[_0x1b435e(0x2d4)][0x1],_0x57d25f=_0x2c2d58['expParams'][0x2],_0x2c7bd8=_0x2c2d58['expParams'][0x3];return Math[_0x1b435e(0x237)](_0xcfd5d9*Math[_0x1b435e(0x365)](_0x26c9e9-0x1,0.9+_0x57d25f/0xfa)*_0x26c9e9*(_0x26c9e9+0x1)/(0x6+Math[_0x1b435e(0x365)](_0x26c9e9,0x2)/0x32/_0x2c7bd8)+(_0x26c9e9-0x1)*_0x2549ba);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x21d)]=function(_0xb6dd1,_0x44ebc0){const _0x58e609=_0x2e2dc8;return this[_0x58e609(0x340)](_0xb6dd1,_0x44ebc0+0x1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x372)]=function(_0x592446,_0x55d415){const _0x17a802=_0x2e2dc8;return this[_0x17a802(0x340)](_0x592446,_0x55d415);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x175)]=function(_0x4db515){const _0x4cbf65=_0x2e2dc8;this['levelUpGainClassPoints'](_0x4db515),this[_0x4cbf65(0x355)](_0x4db515),Imported['VisuMZ_2_SkillLearnSystem']&&(this[_0x4cbf65(0x3ca)](_0x4db515),this[_0x4cbf65(0x29a)](_0x4db515));},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3c2)]=function(){const _0x68d784=_0x2e2dc8;if(this['_updateClassLearnedSkills'])return;this['_updateClassLearnedSkills']=!![];const _0x4cb5bd=DataManager[_0x68d784(0x216)](this);for(const _0x37ad3d of _0x4cb5bd){if(!_0x37ad3d)continue;const _0x446850=_0x37ad3d[_0x68d784(0x179)];if(!_0x446850)continue;for(const _0x443bd8 of _0x446850){if(this['isLearnedSkill'](_0x443bd8['skillId']))continue;if(this[_0x68d784(0x220)](_0x37ad3d['id'])>=_0x443bd8['level']){const _0x1d537a=this[_0x68d784(0x2f1)]||{};this[_0x68d784(0x2b3)](_0x443bd8[_0x68d784(0x2d9)]),this[_0x68d784(0x2f1)]=_0x1d537a;}}}this[_0x68d784(0x34f)]=![];},VisuMZ[_0x2e2dc8(0x1e6)]['Game_Actor_paramBase']=Game_Actor['prototype']['paramBase'],Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3cb)]=function(_0x11b76c){const _0x2a8f5b=_0x2e2dc8;let _0x14b54a=VisuMZ['ClassChangeSystem'][_0x2a8f5b(0x22c)][_0x2a8f5b(0x3ee)](this,_0x11b76c);this[_0x2a8f5b(0x192)]();const _0x3b8291=VisuMZ['ClassChangeSystem'][_0x2a8f5b(0x260)][_0x2a8f5b(0x3d3)],_0x20e104=_0x2a8f5b(0x2c1)[_0x2a8f5b(0x154)](_0x11b76c),_0x57ab15=_0x3b8291['length'];for(let _0x599185=0x1;_0x599185<_0x57ab15;_0x599185++){let _0x4be919=$dataClasses[this[_0x2a8f5b(0x15b)][_0x599185]||0x0];if(!_0x4be919)continue;if(_0x4be919===this[_0x2a8f5b(0x2e2)]())continue;const _0x445e2f=_0x3b8291[_0x599185];if(!_0x445e2f)continue;const _0x24ebf3=_0x445e2f[_0x20e104];_0x14b54a+=_0x24ebf3*this[_0x2a8f5b(0x394)](this[_0x2a8f5b(0x15b)][_0x599185],_0x11b76c);}return _0x14b54a;},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x394)]=function(_0x2b50a5,_0x36798c){const _0x225e45=_0x2e2dc8,_0xbca218=$dataClasses[_0x2b50a5],_0x3564c4=this['classLevel'](_0x2b50a5);if(_0x3564c4>0x63){const _0x2e855d=_0xbca218[_0x225e45(0x315)][_0x36798c][0x63],_0x14b120=_0xbca218[_0x225e45(0x315)][_0x36798c][0x62];return _0x2e855d+(_0x2e855d-_0x14b120)*(_0x3564c4-0x63);}else return _0xbca218[_0x225e45(0x315)][_0x36798c][_0x3564c4];},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x155)]=function(_0xb16960){const _0x1df5fd=_0x2e2dc8;if(this['_classLevel'][_0xb16960]>=this[_0x1df5fd(0x3f7)]())return 0x1;const _0x20c105=this[_0x1df5fd(0x220)](_0xb16960),_0x4bc792=this['nextClassLevelExp'](_0xb16960,_0x20c105)-this['currentClassLevelExp'](_0xb16960,_0x20c105);this['_exp'][_0xb16960]=this['_exp'][_0xb16960]||0x0;const _0x374642=this[_0x1df5fd(0x1d7)][_0xb16960]-this['currentClassLevelExp'](_0xb16960,_0x20c105);return(_0x374642/_0x4bc792)['clamp'](0x0,0x1);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x190)]=function(){const _0x1651aa=_0x2e2dc8;for(;;){const _0x38c28b=DataManager[_0x1651aa(0x2bc)](this);if(_0x38c28b[_0x1651aa(0x2c9)]>0x0)for(const _0x1bb436 of _0x38c28b){this[_0x1651aa(0x1b4)](_0x1bb436);}else break;}},Game_Actor['prototype'][_0x2e2dc8(0x2ac)]=function(){const _0x16f34d=_0x2e2dc8;let _0xc06e1c=[];const _0x42db7a=VisuMZ[_0x16f34d(0x1e6)][_0x16f34d(0x1eb)],_0x5bf6bb=this[_0x16f34d(0x3e1)]()['note'],_0x262842=_0x5bf6bb['match'](_0x42db7a[_0x16f34d(0x333)]);if(_0x262842)for(const _0x40648c of _0x262842){if(!_0x40648c)continue;_0x40648c[_0x16f34d(0x2fc)](_0x42db7a[_0x16f34d(0x333)]);const _0x21d9c6=String(RegExp['$1'])[_0x16f34d(0x354)](',')[_0x16f34d(0x268)](_0x13dc78=>Number(_0x13dc78));_0xc06e1c=_0xc06e1c[_0x16f34d(0x15d)](_0x21d9c6);}_0xc06e1c=_0xc06e1c[_0x16f34d(0x403)]((_0x1c2352,_0x4abedc,_0x24fb9d)=>_0x24fb9d[_0x16f34d(0x241)](_0x1c2352)===_0x4abedc),_0xc06e1c[_0x16f34d(0x226)](null)[_0x16f34d(0x226)](undefined),_0xc06e1c[_0x16f34d(0x24e)]((_0x18595c,_0x1c3d86)=>_0x18595c-_0x1c3d86),this[_0x16f34d(0x262)]=_0xc06e1c;},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2dd)]=function(_0x5685a9){const _0x31d5e5=_0x2e2dc8;return this['_classChangeTierRestrictions']===undefined&&this['initClassChangeRestrictions'](),this[_0x31d5e5(0x262)][_0x31d5e5(0x2b6)](_0x5685a9);},Game_Actor[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x378)]=function(_0x547f54){const _0x38fd62=_0x2e2dc8;this[_0x38fd62(0x262)]===undefined&&this[_0x38fd62(0x2ac)]();if(this['_classChangeTierRestrictions'][_0x38fd62(0x2b6)](_0x547f54))return;this['_classChangeTierRestrictions'][_0x38fd62(0x1a3)](_0x547f54),this[_0x38fd62(0x262)][_0x38fd62(0x24e)]((_0x3e0142,_0x3f231c)=>_0x3e0142-_0x3f231c);},Game_Actor[_0x2e2dc8(0x1ab)]['removeClassChangeTierRestriction']=function(_0x3c5f1a){const _0x31ff29=_0x2e2dc8;this[_0x31ff29(0x262)]===undefined&&this[_0x31ff29(0x2ac)]();if(!this[_0x31ff29(0x262)][_0x31ff29(0x2b6)](_0x3c5f1a))return;this[_0x31ff29(0x262)]['remove'](_0x3c5f1a),this[_0x31ff29(0x262)][_0x31ff29(0x24e)]((_0x135501,_0x3d59ce)=>_0x135501-_0x3d59ce);},Game_Enemy[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2fd)]=function(){const _0x37300b=_0x2e2dc8,_0x5b708f=VisuMZ['ClassChangeSystem'][_0x37300b(0x260)][_0x37300b(0x189)],_0x3ec549=VisuMZ[_0x37300b(0x1e6)]['RegExp'],_0x4c9c4f=this['enemy']()[_0x37300b(0x1c6)];if(_0x4c9c4f[_0x37300b(0x2fc)](_0x3ec549[_0x37300b(0x2f3)]))try{return eval(RegExp['$1']);}catch(_0x2d800e){if($gameTemp['isPlaytest']())console[_0x37300b(0x3e8)](_0x2d800e);return 0x0;}try{return eval(_0x5b708f[_0x37300b(0x3a2)]);}catch(_0x3c5ffe){if($gameTemp['isPlaytest']())console[_0x37300b(0x3e8)](_0x3c5ffe);return 0x0;}},Game_Enemy[_0x2e2dc8(0x1ab)]['jobPoints']=function(){const _0x1bd841=_0x2e2dc8,_0x3b08f1=VisuMZ[_0x1bd841(0x1e6)]['Settings']['JobPoints'],_0x1ea63c=VisuMZ['ClassChangeSystem']['RegExp'],_0x3ab7b7=this[_0x1bd841(0x17c)]()['note'];if(_0x3ab7b7[_0x1bd841(0x2fc)](_0x1ea63c[_0x1bd841(0x320)]))try{return eval(RegExp['$1']);}catch(_0xfebdea){if($gameTemp[_0x1bd841(0x25a)]())console['log'](_0xfebdea);return 0x0;}try{return eval(_0x3b08f1[_0x1bd841(0x3a2)]);}catch(_0x5e6e2c){if($gameTemp['isPlaytest']())console[_0x1bd841(0x3e8)](_0x5e6e2c);return 0x0;}},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x300)]=Game_Party[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)],Game_Party[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)]=function(){const _0x442b92=_0x2e2dc8;VisuMZ[_0x442b92(0x1e6)][_0x442b92(0x300)][_0x442b92(0x3ee)](this),this[_0x442b92(0x1a6)]();},Game_Party['prototype'][_0x2e2dc8(0x1a6)]=function(){const _0xa14c9=_0x2e2dc8;this[_0xa14c9(0x297)]=[];},Game_Party['prototype']['getUnlockedClasses']=function(){const _0x5aaff4=_0x2e2dc8;if(this[_0x5aaff4(0x297)]===undefined)this[_0x5aaff4(0x1a6)]();return this[_0x5aaff4(0x297)];},Game_Party[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1b4)]=function(_0x22025c){const _0x421385=_0x2e2dc8;for(const _0x45bef2 of this[_0x421385(0x306)]()){if(!_0x45bef2)continue;_0x45bef2['unlockClass'](_0x22025c);}if(this[_0x421385(0x297)]===undefined)this['initClassChangeUnlocks']();if(this['_unlockedClasses'][_0x421385(0x2b6)](_0x22025c))return;this[_0x421385(0x297)][_0x421385(0x1a3)](_0x22025c),this[_0x421385(0x297)]['sort'](function(_0xb82eb0,_0x462775){return _0xb82eb0-_0x462775;});},Game_Party[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1e7)]=function(_0xb0d629){const _0x5d3058=_0x2e2dc8;for(const _0xe1f930 of this['allMembers']()){if(!_0xe1f930)continue;_0xe1f930[_0x5d3058(0x1e7)](_0xb0d629);}if(this['_unlockedClasses']===undefined)this[_0x5d3058(0x1a6)]();if(!this[_0x5d3058(0x297)]['includes'](_0xb0d629))return;this[_0x5d3058(0x297)][_0x5d3058(0x226)](_0xb0d629)[_0x5d3058(0x226)](null),this['_unlockedClasses'][_0x5d3058(0x24e)](function(_0x356911,_0x1a1d78){return _0x356911-_0x1a1d78;});},Game_Party[_0x2e2dc8(0x1ab)]['highestMulticlassTier']=function(){const _0x4014f6=_0x2e2dc8,_0x1d3e4e=this[_0x4014f6(0x306)]();return Math[_0x4014f6(0x3e5)](...this['members']()[_0x4014f6(0x268)](_0x5118e3=>_0x5118e3[_0x4014f6(0x341)]()));},Game_Troop['prototype'][_0x2e2dc8(0x3ea)]=function(){const _0x8fec41=_0x2e2dc8;return this[_0x8fec41(0x316)]()[_0x8fec41(0x1de)]((_0x3c4c75,_0x3af137)=>_0x3c4c75+_0x3af137['classPoints'](),0x0);},Game_Troop[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x289)]=function(){const _0x77464a=_0x2e2dc8;return this[_0x77464a(0x316)]()['reduce']((_0x214edc,_0x3dbe54)=>_0x214edc+_0x3dbe54[_0x77464a(0x16b)](),0x0);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x19c)]=Scene_Menu[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1a9)],Scene_Menu['prototype'][_0x2e2dc8(0x1a9)]=function(){const _0x32706a=_0x2e2dc8;VisuMZ[_0x32706a(0x1e6)]['Scene_Menu_createCommandWindow'][_0x32706a(0x3ee)](this);const _0x3402b6=this[_0x32706a(0x2b8)];_0x3402b6[_0x32706a(0x233)](_0x32706a(0x1e6),this[_0x32706a(0x3f1)][_0x32706a(0x257)](this));},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x2c5)]=Scene_Menu[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3c7)],Scene_Menu[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3c7)]=function(){const _0x1750cb=_0x2e2dc8;this[_0x1750cb(0x2b8)][_0x1750cb(0x344)]()===_0x1750cb(0x1e6)?SceneManager[_0x1750cb(0x1a3)](Scene_ClassChange):VisuMZ[_0x1750cb(0x1e6)]['Scene_Menu_onPersonalOk']['call'](this);};function Scene_ClassChange(){this['initialize'](...arguments);}Scene_ClassChange[_0x2e2dc8(0x1ab)]=Object[_0x2e2dc8(0x39f)](Scene_MenuBase[_0x2e2dc8(0x1ab)]),Scene_ClassChange[_0x2e2dc8(0x1ab)]['constructor']=Scene_ClassChange,Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)]=function(){const _0x24b1db=_0x2e2dc8;Scene_MenuBase[_0x24b1db(0x1ab)][_0x24b1db(0x3dd)][_0x24b1db(0x3ee)](this),this[_0x24b1db(0x2f0)]=this['_animations']||[];},Scene_ClassChange['prototype'][_0x2e2dc8(0x198)]=function(){return!![];},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1b7)]=function(){const _0x3106a1=_0x2e2dc8;return this['highestTier']()>0x1?this[_0x3106a1(0x25d)]&&this['_classTierWindow'][_0x3106a1(0x22f)]:this['_classListWindow']&&this[_0x3106a1(0x231)][_0x3106a1(0x22f)];},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3ac)]=function(){const _0xf11b3=_0x2e2dc8;Scene_MenuBase[_0xf11b3(0x1ab)][_0xf11b3(0x3ac)][_0xf11b3(0x3ee)](this),this['updateClassChangeAnimations']();},Scene_ClassChange['prototype']['isRecommendedLayout']=function(){return!![];},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x224)]=function(){const _0x5ad201=_0x2e2dc8;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5ad201(0x2a6)]!==undefined)return ConfigManager[_0x5ad201(0x2a6)];else{if(this[_0x5ad201(0x40c)]())return this[_0x5ad201(0x162)]()[_0x5ad201(0x2fc)](/LOWER/i);else Scene_MenuBase[_0x5ad201(0x1ab)][_0x5ad201(0x164)][_0x5ad201(0x3ee)](this);}},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x164)]=function(){const _0x5c207e=_0x2e2dc8;if(ConfigManager[_0x5c207e(0x31b)]&&ConfigManager[_0x5c207e(0x1a4)]!==undefined)return ConfigManager['uiInputPosition'];else{if(this[_0x5c207e(0x40c)]())return this[_0x5c207e(0x162)]()[_0x5c207e(0x2fc)](/RIGHT/i);else Scene_MenuBase[_0x5c207e(0x1ab)][_0x5c207e(0x164)][_0x5c207e(0x3ee)](this);}},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x162)]=function(){const _0x41f193=_0x2e2dc8;return VisuMZ[_0x41f193(0x1e6)][_0x41f193(0x260)]['Window'][_0x41f193(0x14c)];},Scene_ClassChange['prototype'][_0x2e2dc8(0x40c)]=function(){const _0x24265b=_0x2e2dc8;return VisuMZ[_0x24265b(0x1e6)][_0x24265b(0x260)][_0x24265b(0x361)][_0x24265b(0x19b)];},Scene_ClassChange[_0x2e2dc8(0x1ab)]['create']=function(){const _0x3e599c=_0x2e2dc8;Scene_MenuBase[_0x3e599c(0x1ab)]['create'][_0x3e599c(0x3ee)](this),this['createHelpWindow'](),this[_0x3e599c(0x2b5)](),this[_0x3e599c(0x348)](),this[_0x3e599c(0x1f3)](),this[_0x3e599c(0x2aa)](),this['refreshActor']();},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b5)]=function(){const _0x45f78c=_0x2e2dc8,_0x4ef622=this['statusWindowRect']();this['_statusWindow']=new Window_ClassStatus(_0x4ef622),this[_0x45f78c(0x158)](this['_statusWindow']),this[_0x45f78c(0x2ef)]['setBackgroundType'](VisuMZ[_0x45f78c(0x1e6)]['Settings'][_0x45f78c(0x361)][_0x45f78c(0x177)]);},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x176)]=function(){const _0x27270a=_0x2e2dc8,_0xe94d04=VisuMZ[_0x27270a(0x1e6)][_0x27270a(0x260)][_0x27270a(0x361)];if(_0xe94d04[_0x27270a(0x311)])return _0xe94d04[_0x27270a(0x311)][_0x27270a(0x3ee)](this);const _0xaea6a6=Math[_0x27270a(0x24b)](Graphics[_0x27270a(0x1b1)]/0x2),_0x37e3cb=this[_0x27270a(0x379)](),_0x434ffd=this[_0x27270a(0x164)]()?0x0:_0xaea6a6,_0x452461=this['mainAreaTop']();return new Rectangle(_0x434ffd,_0x452461,_0xaea6a6,_0x37e3cb);},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x348)]=function(){const _0x10225e=_0x2e2dc8,_0x50630c=this[_0x10225e(0x3ec)](),_0x2da7e9=new Window_ClassTier(_0x50630c);_0x2da7e9[_0x10225e(0x3dc)](this[_0x10225e(0x159)]),_0x2da7e9[_0x10225e(0x1b0)](VisuMZ[_0x10225e(0x1e6)][_0x10225e(0x260)][_0x10225e(0x361)]['Window_ClassTier_BgType']),this[_0x10225e(0x158)](_0x2da7e9),this['_classTierWindow']=_0x2da7e9,_0x2da7e9[_0x10225e(0x233)](_0x10225e(0x38b),this[_0x10225e(0x36e)][_0x10225e(0x257)](this)),this[_0x10225e(0x1b9)]()>0x1&&(_0x2da7e9[_0x10225e(0x233)](_0x10225e(0x2d7),this[_0x10225e(0x264)]['bind'](this)),_0x2da7e9[_0x10225e(0x233)](_0x10225e(0x34e),this[_0x10225e(0x322)][_0x10225e(0x257)](this))),_0x2da7e9[_0x10225e(0x233)](_0x10225e(0x3d7),this[_0x10225e(0x3cd)][_0x10225e(0x257)](this));},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3ec)]=function(){const _0x8973bd=_0x2e2dc8,_0x334ab0=VisuMZ[_0x8973bd(0x1e6)][_0x8973bd(0x260)][_0x8973bd(0x361)];if(_0x334ab0['Window_ClassTier_RectJS'])return _0x334ab0[_0x8973bd(0x1cf)][_0x8973bd(0x3ee)](this);const _0x280c68=Graphics['boxWidth']-this['_statusWindow'][_0x8973bd(0x288)],_0x548f36=this[_0x8973bd(0x379)](),_0x2fc31b=this[_0x8973bd(0x164)]()?_0x280c68:0x0,_0x32b3f1=this['mainAreaTop']();return new Rectangle(_0x2fc31b,_0x32b3f1,_0x280c68,_0x548f36);},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1f3)]=function(){const _0x12d5ff=_0x2e2dc8,_0x7f1b22=this['classListWindowRect'](),_0x247cc7=new Window_ClassList(_0x7f1b22);_0x247cc7['setHelpWindow'](this[_0x12d5ff(0x159)]),_0x247cc7[_0x12d5ff(0x252)](this['_statusWindow']),_0x247cc7['setBackgroundType'](VisuMZ[_0x12d5ff(0x1e6)][_0x12d5ff(0x260)]['Window'][_0x12d5ff(0x25e)]),this['addWindow'](_0x247cc7),this[_0x12d5ff(0x231)]=_0x247cc7,_0x247cc7[_0x12d5ff(0x233)]('cancel',this[_0x12d5ff(0x364)][_0x12d5ff(0x257)](this)),this[_0x12d5ff(0x1b9)]()<=0x1&&(_0x247cc7[_0x12d5ff(0x233)]('pagedown',this[_0x12d5ff(0x264)][_0x12d5ff(0x257)](this)),_0x247cc7[_0x12d5ff(0x233)]('pageup',this[_0x12d5ff(0x322)][_0x12d5ff(0x257)](this))),_0x247cc7['setHandler'](_0x12d5ff(0x18d),this[_0x12d5ff(0x374)][_0x12d5ff(0x257)](this));},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x234)]=function(){const _0x275550=_0x2e2dc8,_0x1a719f=VisuMZ[_0x275550(0x1e6)]['Settings'][_0x275550(0x361)];if(_0x1a719f[_0x275550(0x328)])return _0x1a719f[_0x275550(0x328)][_0x275550(0x3ee)](this);const _0x6a36d8=Graphics[_0x275550(0x1b1)]-this[_0x275550(0x2ef)][_0x275550(0x288)],_0x43be7e=this['mainAreaHeight'](),_0x189be7=this[_0x275550(0x164)]()?_0x6a36d8:0x0,_0x5af84f=this[_0x275550(0x339)]();return new Rectangle(_0x189be7,_0x5af84f,_0x6a36d8,_0x43be7e);},Scene_ClassChange['prototype']['highestTier']=function(){const _0x38ecf4=_0x2e2dc8;if(this[_0x38ecf4(0x1b6)]!==undefined)return this[_0x38ecf4(0x1b6)];return this[_0x38ecf4(0x1b6)]=$gameParty[_0x38ecf4(0x28c)](),this[_0x38ecf4(0x1b6)];},Scene_ClassChange['prototype']['determineActiveWindow']=function(){const _0x59d636=_0x2e2dc8;this['highestTier']()>0x1?(this[_0x59d636(0x25d)][_0x59d636(0x3f2)](0x0),this['_classTierWindow']['show'](),this[_0x59d636(0x25d)][_0x59d636(0x3de)](),this['_classListWindow'][_0x59d636(0x371)](),this[_0x59d636(0x231)][_0x59d636(0x1c0)]()):(this[_0x59d636(0x231)]['forceSelect'](0x0),this['_classListWindow']['setTier'](0x1),this['_classListWindow'][_0x59d636(0x29c)](),this[_0x59d636(0x231)][_0x59d636(0x3de)](),this[_0x59d636(0x25d)][_0x59d636(0x371)](),this[_0x59d636(0x25d)][_0x59d636(0x1c0)]());},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2b4)]=function(){const _0x49d996=_0x2e2dc8,_0x3ca5c4=this[_0x49d996(0x3e1)]();_0x3ca5c4[_0x49d996(0x190)](),this[_0x49d996(0x2ef)]['setActor'](_0x3ca5c4),this[_0x49d996(0x25d)][_0x49d996(0x244)](_0x3ca5c4),this[_0x49d996(0x231)][_0x49d996(0x244)](_0x3ca5c4);},Scene_ClassChange['prototype'][_0x2e2dc8(0x353)]=function(){const _0x33963e=_0x2e2dc8;Scene_MenuBase[_0x33963e(0x1ab)]['onActorChange'][_0x33963e(0x3ee)](this),this[_0x33963e(0x2b4)](),this[_0x33963e(0x2aa)]();},Scene_ClassChange['prototype'][_0x2e2dc8(0x3cd)]=function(){const _0x54cd65=_0x2e2dc8,_0x3e77ec=this['_classTierWindow']['currentExt']();this[_0x54cd65(0x231)][_0x54cd65(0x193)](_0x3e77ec),this[_0x54cd65(0x231)][_0x54cd65(0x29c)](),this[_0x54cd65(0x231)]['activate'](),this[_0x54cd65(0x231)][_0x54cd65(0x3f2)](0x0),this['_classTierWindow'][_0x54cd65(0x371)](),this[_0x54cd65(0x25d)]['deactivate'](),this[_0x54cd65(0x1dd)]();},Scene_ClassChange[_0x2e2dc8(0x1ab)]['onClassListCancel']=function(){const _0x55b617=_0x2e2dc8;this['highestTier']()>0x1?(this['_classTierWindow']['show'](),this['_classTierWindow'][_0x55b617(0x3de)](),this[_0x55b617(0x231)][_0x55b617(0x371)](),this['_classListWindow']['deactivate'](),this[_0x55b617(0x2ef)]['setTempActor'](null)):this[_0x55b617(0x36e)]();},Scene_ClassChange['prototype'][_0x2e2dc8(0x374)]=function(){const _0x19aeaa=_0x2e2dc8,_0x21b198=this['_classListWindow'][_0x19aeaa(0x15c)],_0x190343=this[_0x19aeaa(0x231)][_0x19aeaa(0x188)](),_0x5530a6=this['_classListWindow'][_0x19aeaa(0x395)](),_0x5733d7=_0x190343?_0x190343['id']:0x0;this['_actor'][_0x19aeaa(0x370)](_0x5733d7,_0x21b198),this[_0x19aeaa(0x25d)][_0x19aeaa(0x24d)](),this['_classListWindow'][_0x19aeaa(0x24d)](),this[_0x19aeaa(0x2ef)][_0x19aeaa(0x32c)](null),this['startClassChangeAnimation'](_0x5733d7,_0x21b198),this[_0x19aeaa(0x2aa)]();if(this['_classTierWindow'][_0x19aeaa(0x22f)])this[_0x19aeaa(0x25d)][_0x19aeaa(0x22b)](_0x21b198-0x1);else this[_0x19aeaa(0x231)]['active']&&this['_classListWindow'][_0x19aeaa(0x22b)](_0x5530a6);},Scene_ClassChange['prototype']['startClassChangeAnimation']=function(_0x2b0a6a,_0x2b099b){const _0xda65e8=_0x2e2dc8,_0x48d1c5=this[_0xda65e8(0x3b0)](_0x2b099b);this['createClassChangeAnimation'](_0x2b0a6a,_0x2b099b,_0x48d1c5);},Scene_ClassChange[_0x2e2dc8(0x1ab)]['createAnimationDummySprite']=function(_0x5f55af){const _0x14d950=_0x2e2dc8,_0x15561d=new Sprite(),_0x13fc61=VisuMZ[_0x14d950(0x1e6)][_0x14d950(0x260)][_0x14d950(0x361)];if(_0x5f55af<=0x1){const _0x2debf6=this[_0x14d950(0x2ef)];_0x15561d['x']=_0x2debf6['x']+Math[_0x14d950(0x237)](_0x2debf6[_0x14d950(0x288)]/0x2),_0x15561d['y']=_0x2debf6['y']+Math[_0x14d950(0x237)](_0x2debf6[_0x14d950(0x2b7)]/0x2),_0x15561d['x']+=_0x13fc61[_0x14d950(0x314)]||0x0,_0x15561d['y']+=_0x13fc61['ConfirmAniPrimaryOffsetY']||0x0;}else{const _0x44711a=this['_classTierWindow'],_0x411b9f=_0x44711a['itemRect'](_0x44711a[_0x14d950(0x395)]()),_0x40d1a9=_0x44711a[_0x14d950(0x37c)]||0x0;_0x15561d['x']=_0x44711a['x']+_0x411b9f['x']+Math[_0x14d950(0x237)](_0x411b9f[_0x14d950(0x288)]/0x2)+_0x40d1a9,_0x15561d['y']=_0x44711a['y']+_0x411b9f['y']+Math[_0x14d950(0x237)](_0x411b9f[_0x14d950(0x2b7)]/0x2)+_0x40d1a9,_0x15561d['x']+=_0x13fc61['ConfirmAniSubclassOffsetX']||0x0,_0x15561d['y']+=_0x13fc61[_0x14d950(0x14f)]||0x0;}return _0x15561d['x']+=this[_0x14d950(0x3eb)]['x'],_0x15561d['y']+=this[_0x14d950(0x3eb)]['y'],_0x15561d;},Scene_ClassChange['prototype'][_0x2e2dc8(0x3f0)]=function(_0x4d8712,_0x1c724b,_0x22a757){const _0x394c2c=_0x2e2dc8,_0x15cc03=this[_0x394c2c(0x3f3)](_0x4d8712),_0x272850=$dataAnimations[_0x15cc03];if(!_0x272850)return;const _0x509b30=this[_0x394c2c(0x199)](_0x272850),_0x25163b=new(_0x509b30?Sprite_AnimationMV:Sprite_Animation)(),_0x31333d=[_0x22a757],_0x13c5f5=0x0;_0x25163b[_0x394c2c(0x14e)](_0x31333d,_0x272850,![],_0x13c5f5,null),_0x25163b[_0x394c2c(0x31e)]=_0x1c724b,this[_0x394c2c(0x236)](_0x22a757),this[_0x394c2c(0x236)](_0x25163b),this['_animations'][_0x394c2c(0x1a3)](_0x25163b);},Scene_ClassChange[_0x2e2dc8(0x29d)]=VisuMZ['ClassChangeSystem'][_0x2e2dc8(0x260)][_0x2e2dc8(0x361)]['AllowClearClassAni']??!![],Scene_ClassChange[_0x2e2dc8(0x1ab)]['getClassChangeAnimationID']=function(_0x478205){const _0x1180d2=_0x2e2dc8,_0x312eca=$dataClasses[_0x478205];if(_0x312eca){const _0x31d94e=VisuMZ['ClassChangeSystem'][_0x1180d2(0x1eb)],_0xbc3f02=_0x312eca[_0x1180d2(0x1c6)];if(_0xbc3f02[_0x1180d2(0x2fc)](_0x31d94e[_0x1180d2(0x35f)]))return Number(RegExp['$1']);}else{if(!Scene_ClassChange[_0x1180d2(0x29d)])return 0x0;}return VisuMZ[_0x1180d2(0x1e6)]['Settings'][_0x1180d2(0x361)]['ConfirmAnimationID'];},Scene_ClassChange['prototype'][_0x2e2dc8(0x199)]=function(_0x28dfbb){const _0x57528a=_0x2e2dc8;return!!_0x28dfbb[_0x57528a(0x3b2)];},Scene_ClassChange['prototype']['updateClassChangeAnimations']=function(){const _0x4ee95e=_0x2e2dc8,_0x569828=[];for(const _0x1845c7 of this[_0x4ee95e(0x2f0)]){if(!_0x1845c7)continue;if(_0x1845c7['isPlaying']())continue;_0x569828[_0x4ee95e(0x1a3)](_0x1845c7);}for(const _0x453c9d of _0x569828){if(!_0x453c9d)continue;for(const _0xc992f of _0x453c9d[_0x4ee95e(0x1d5)]){this[_0x4ee95e(0x1bd)](_0xc992f);}this[_0x4ee95e(0x2f0)][_0x4ee95e(0x226)](_0x453c9d),this['removeChild'](_0x453c9d);};},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1dd)]=function(){const _0x59fdfc=_0x2e2dc8,_0xd24ac3=[];for(const _0x4452f6 of this[_0x59fdfc(0x2f0)]){if(!_0x4452f6)continue;if(_0x4452f6['_classChangeTier']<=0x1)continue;_0xd24ac3[_0x59fdfc(0x1a3)](_0x4452f6);}for(const _0x433b2c of _0xd24ac3){if(!_0x433b2c)continue;for(const _0x1fa19e of _0x433b2c[_0x59fdfc(0x1d5)]){this['removeChild'](_0x1fa19e);}this[_0x59fdfc(0x2f0)][_0x59fdfc(0x226)](_0x433b2c),this[_0x59fdfc(0x1bd)](_0x433b2c);};},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1b2)]=function(){const _0x5caec1=_0x2e2dc8;if(!this['_classTierWindow'])return![];if(!this[_0x5caec1(0x25d)][_0x5caec1(0x22f)])return![];return this[_0x5caec1(0x25d)][_0x5caec1(0x235)]();},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x232)]=function(){const _0x3fb9e8=_0x2e2dc8;if(this[_0x3fb9e8(0x1b2)]())return TextManager[_0x3fb9e8(0x212)]('shift');return Scene_MenuBase[_0x3fb9e8(0x1ab)][_0x3fb9e8(0x232)]['call'](this);},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x263)]=function(){const _0x75e984=_0x2e2dc8;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x75e984(0x3da)];return Scene_MenuBase[_0x75e984(0x1ab)]['buttonAssistText3'][_0x75e984(0x3ee)](this);},Scene_ClassChange['prototype'][_0x2e2dc8(0x34a)]=function(){const _0x31f75f=_0x2e2dc8;if(this[_0x31f75f(0x1b2)]())return this[_0x31f75f(0x35c)][_0x31f75f(0x288)]/0x5/-0x3;return Scene_MenuBase[_0x31f75f(0x1ab)][_0x31f75f(0x34a)][_0x31f75f(0x3ee)](this);},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3b9)]=function(){const _0x28c7c1=_0x2e2dc8;Scene_MenuBase[_0x28c7c1(0x1ab)][_0x28c7c1(0x3b9)]['call'](this),this['setBackgroundOpacity'](this[_0x28c7c1(0x393)]()),this[_0x28c7c1(0x3d2)]();},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x393)]=function(){const _0x21591f=_0x2e2dc8;return VisuMZ['ClassChangeSystem']['Settings'][_0x21591f(0x1fc)]['SnapshotOpacity'];},Scene_ClassChange['prototype'][_0x2e2dc8(0x3d2)]=function(){const _0x3b7ab5=_0x2e2dc8,_0xdf4bce=VisuMZ[_0x3b7ab5(0x1e6)][_0x3b7ab5(0x260)][_0x3b7ab5(0x1fc)];_0xdf4bce&&(_0xdf4bce[_0x3b7ab5(0x2f5)]!==''||_0xdf4bce['BgFilename2']!=='')&&(this[_0x3b7ab5(0x38e)]=new Sprite(ImageManager['loadTitle1'](_0xdf4bce[_0x3b7ab5(0x2f5)]||'')),this['_backSprite2']=new Sprite(ImageManager[_0x3b7ab5(0x373)](_0xdf4bce[_0x3b7ab5(0x269)]||'')),this['addChild'](this[_0x3b7ab5(0x38e)]),this[_0x3b7ab5(0x236)](this[_0x3b7ab5(0x2a0)]),this[_0x3b7ab5(0x38e)][_0x3b7ab5(0x384)][_0x3b7ab5(0x3f8)](this['adjustSprite'][_0x3b7ab5(0x257)](this,this['_backSprite1'])),this[_0x3b7ab5(0x2a0)][_0x3b7ab5(0x384)][_0x3b7ab5(0x3f8)](this[_0x3b7ab5(0x2d8)][_0x3b7ab5(0x257)](this,this[_0x3b7ab5(0x2a0)])));},Scene_ClassChange[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2d8)]=function(_0x33b089){const _0x57ce73=_0x2e2dc8;this[_0x57ce73(0x20f)](_0x33b089),this[_0x57ce73(0x219)](_0x33b089);},Window_Base[_0x2e2dc8(0x3ef)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x361)][_0x2e2dc8(0x245)]??!![],Window_Base[_0x2e2dc8(0x1ab)]['drawClassPoints']=function(_0x46203d,_0x253ec0,_0x2abb88,_0x4d0703,_0xd144e2){const _0x1929d9=_0x2e2dc8;_0xd144e2=_0xd144e2||_0x1929d9(0x18c);const _0x1c21c9='\x5cI[%1]'[_0x1929d9(0x154)](ImageManager[_0x1929d9(0x17a)]),_0x248cd4=TextManager['classPointsFmt'],_0x1855dd=_0x248cd4[_0x1929d9(0x154)](_0x46203d,TextManager[_0x1929d9(0x20b)],_0x1c21c9,TextManager[_0x1929d9(0x34b)]),_0x474d4f=this['textSizeEx'](_0x1855dd)['width'];if(_0xd144e2==='left')_0x253ec0+=0x0;else _0xd144e2===_0x1929d9(0x183)?_0x253ec0+=Math['round']((_0x4d0703-_0x474d4f)/0x2):_0x253ec0+=_0x4d0703-_0x474d4f;this[_0x1929d9(0x1d6)](_0x1855dd,_0x253ec0,_0x2abb88);},Window_Base[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2e0)]=function(_0x54ca55,_0x868ebf,_0x56909e,_0x104219,_0x352a74,_0x458adb){const _0x45c106=_0x2e2dc8,_0x537e97=_0x54ca55[_0x45c106(0x22a)](_0x868ebf);this[_0x45c106(0x32d)](_0x537e97,_0x56909e,_0x104219,_0x352a74,_0x458adb);},Window_Base[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x16a)]=function(_0x55f322,_0x3656ae,_0x29daab,_0x52a85e,_0x3c1533){const _0x23f6d9=_0x2e2dc8;_0x3c1533=_0x3c1533||_0x23f6d9(0x18c);const _0x404724=_0x23f6d9(0x16d)[_0x23f6d9(0x154)](ImageManager[_0x23f6d9(0x217)]),_0x44d617=TextManager[_0x23f6d9(0x1cd)],_0x507b2d=_0x44d617['format'](_0x55f322,TextManager[_0x23f6d9(0x302)],_0x404724,TextManager['jobPointsFull']),_0x4e60da=this[_0x23f6d9(0x3e4)](_0x507b2d)[_0x23f6d9(0x288)];if(_0x3c1533==='left')_0x3656ae+=0x0;else _0x3c1533===_0x23f6d9(0x183)?_0x3656ae+=Math[_0x23f6d9(0x237)]((_0x52a85e-_0x4e60da)/0x2):_0x3656ae+=_0x52a85e-_0x4e60da;this[_0x23f6d9(0x1d6)](_0x507b2d,_0x3656ae,_0x29daab);},Window_Base[_0x2e2dc8(0x1ab)]['drawActorJobPoints']=function(_0x41072a,_0x2e9ee8,_0x189a31,_0x4b99ec,_0x50bcea,_0x901a21){const _0x7c3b86=_0x2e2dc8,_0x256c86=_0x41072a['getJobPoints'](_0x2e9ee8);this[_0x7c3b86(0x16a)](_0x256c86,_0x189a31,_0x4b99ec,_0x50bcea,_0x901a21);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x3d1)]=Window_Base[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x411)],Window_Base[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x411)]=function(_0x432a1a,_0x3988fd,_0x1395b1){const _0x4a5a4e=_0x2e2dc8;if(_0x432a1a===$dataClasses){const _0x5cd9b2=_0x432a1a[_0x3988fd];let _0x8c60fc='';if(_0x5cd9b2&&_0x1395b1&&_0x5cd9b2['iconIndex']){const _0x44fc5e=_0x4a5a4e(0x3ab);let _0x4d3490=_0x5cd9b2[_0x4a5a4e(0x413)];_0x4d3490=_0x4d3490[_0x4a5a4e(0x238)](/\\I\[(\d+)\]/gi,''),_0x8c60fc=_0x44fc5e[_0x4a5a4e(0x154)](_0x5cd9b2[_0x4a5a4e(0x3cf)],_0x4d3490);}else{if(_0x5cd9b2){let _0x445bfd=_0x5cd9b2[_0x4a5a4e(0x413)];_0x445bfd=_0x445bfd[_0x4a5a4e(0x238)](/\\I\[(\d+)\]/gi,''),_0x8c60fc=_0x445bfd;}else _0x8c60fc='';}return this[_0x4a5a4e(0x2fb)]()&&(_0x8c60fc=this['applyDatabaseAutoColor'](_0x8c60fc,_0x432a1a)),_0x8c60fc;}return VisuMZ['ClassChangeSystem']['Window_Base_databaseObjectName'][_0x4a5a4e(0x3ee)](this,_0x432a1a,_0x3988fd,_0x1395b1);},Window_Base[_0x2e2dc8(0x1ab)]['drawClassLevel']=function(_0x3a0f76,_0x4fa961,_0xfbbacf,_0x4045d8){const _0x217c9a=_0x2e2dc8;if(!Window_Base['CLASS_CHANGE_SHOW_CLASS_LEVEL'])return;if(!$dataClasses[_0x4fa961])return;this['isClassExpGaugeDrawn']()&&this['drawClassExpGauge'](_0x3a0f76,_0x4fa961,_0xfbbacf,_0x4045d8),this[_0x217c9a(0x36f)](ColorManager['systemColor']()),this['drawText'](TextManager['levelA'],_0xfbbacf,_0x4045d8,0x30),this[_0x217c9a(0x266)](),this['drawText'](_0x3a0f76[_0x217c9a(0x220)](_0x4fa961),_0xfbbacf+0x54,_0x4045d8,0x24,_0x217c9a(0x3af));},Window_Base[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x211)]=function(){const _0x4fc2c5=_0x2e2dc8;return Imported[_0x4fc2c5(0x299)]&&VisuMZ[_0x4fc2c5(0x313)][_0x4fc2c5(0x260)]['UI'][_0x4fc2c5(0x405)];},Window_Base[_0x2e2dc8(0x1ab)]['drawClassExpGauge']=function(_0x3bcdd6,_0x1f6a2e,_0x267b18,_0x3ea39e){const _0x17c3c5=_0x2e2dc8;if(!_0x3bcdd6)return;if(!_0x3bcdd6[_0x17c3c5(0x27b)]())return;const _0x1ce400=0x80,_0x51cfb1=_0x3bcdd6['classExpRate'](_0x1f6a2e);let _0x37c229=ColorManager['expGaugeColor1'](),_0x248252=ColorManager[_0x17c3c5(0x2c3)]();_0x51cfb1>=0x1&&(_0x37c229=ColorManager[_0x17c3c5(0x3f5)](),_0x248252=ColorManager[_0x17c3c5(0x1ec)]()),this[_0x17c3c5(0x180)](_0x267b18,_0x3ea39e,_0x1ce400,_0x51cfb1,_0x37c229,_0x248252);},VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x285)]=Window_MenuCommand['prototype'][_0x2e2dc8(0x276)],Window_MenuCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x276)]=function(){const _0x2d118f=_0x2e2dc8;VisuMZ[_0x2d118f(0x1e6)][_0x2d118f(0x285)][_0x2d118f(0x3ee)](this),this[_0x2d118f(0x343)]();},Window_MenuCommand[_0x2e2dc8(0x1ab)]['addClassChangeSystemCommand']=function(){const _0x294d47=_0x2e2dc8;if(!this[_0x294d47(0x1ad)]())return;if(!this[_0x294d47(0x167)]())return;const _0x159608=TextManager[_0x294d47(0x1fb)],_0x173224=this[_0x294d47(0x404)]();this[_0x294d47(0x166)](_0x159608,_0x294d47(0x1e6),_0x173224);},Window_MenuCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1ad)]=function(){const _0x416ec5=_0x2e2dc8;return Imported[_0x416ec5(0x346)]?![]:!![];},Window_MenuCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x167)]=function(){const _0x876cc5=_0x2e2dc8;return $gameSystem[_0x876cc5(0x286)]();},Window_MenuCommand['prototype'][_0x2e2dc8(0x404)]=function(){return $gameSystem['isMainMenuClassChangeSystemEnabled']();};function Window_ClassStatus(){this['initialize'](...arguments);}Window_ClassStatus[_0x2e2dc8(0x1ab)]=Object[_0x2e2dc8(0x39f)](Window_StatusBase['prototype']),Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x34c)]=Window_ClassStatus,Window_ClassStatus[_0x2e2dc8(0x1ab)]['initialize']=function(_0x21346b){const _0x10bffd=_0x2e2dc8;Window_StatusBase['prototype'][_0x10bffd(0x3dd)]['call'](this,_0x21346b),this[_0x10bffd(0x1d3)]=null,this[_0x10bffd(0x1ff)]=null,this['refresh']();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x244)]=function(_0x720396){const _0x3e9ced=_0x2e2dc8;this[_0x3e9ced(0x1d3)]!==_0x720396&&(this[_0x3e9ced(0x1d3)]=_0x720396,this[_0x3e9ced(0x24d)]());},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2c6)]=function(){return 0x0;},Window_ClassStatus[_0x2e2dc8(0x1ab)]['setTempActor']=function(_0x3f0d07){const _0x41ca4a=_0x2e2dc8;this[_0x41ca4a(0x1ff)]!==_0x3f0d07&&(this[_0x41ca4a(0x1ff)]=_0x3f0d07,this[_0x41ca4a(0x24d)]());},Window_ClassStatus[_0x2e2dc8(0x1ab)]['refresh']=function(){const _0x27257a=_0x2e2dc8;this[_0x27257a(0x2a5)](),this[_0x27257a(0x25b)]();if(this[_0x27257a(0x1d3)])this['_actor'][_0x27257a(0x24d)]();this['prepareRefreshItemsEquipsCoreLayout']();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2f2)]=function(){const _0x730e2c=_0x2e2dc8;this[_0x730e2c(0x1e8)][_0x730e2c(0x2b1)]();if(!this[_0x730e2c(0x1d3)])return;if(this[_0x730e2c(0x279)]()){const _0x3d549=ImageManager[_0x730e2c(0x1f5)](this[_0x730e2c(0x1d3)][_0x730e2c(0x2b2)]());_0x3d549['addLoadListener'](this[_0x730e2c(0x40f)]['bind'](this));}else this['refreshNoMenuImage']();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x279)]=function(){const _0x3f1bd0=_0x2e2dc8;return Imported[_0x3f1bd0(0x346)]&&this['_actor'][_0x3f1bd0(0x2b2)]()!==''&&VisuMZ[_0x3f1bd0(0x1e6)][_0x3f1bd0(0x260)][_0x3f1bd0(0x361)][_0x3f1bd0(0x308)];},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x40f)]=function(){const _0x1294f4=_0x2e2dc8;VisuMZ[_0x1294f4(0x1e6)][_0x1294f4(0x260)]['Window'][_0x1294f4(0x3c8)][_0x1294f4(0x3ee)](this),this['drawParameterList']();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x186)]=function(_0x3d0ea1,_0x22e1b1,_0x2ad1db,_0x3fae2a,_0x23fd25){const _0x26ebfa=_0x2e2dc8,_0x53b9b2=ImageManager[_0x26ebfa(0x1f5)](_0x3d0ea1[_0x26ebfa(0x2b2)]()),_0x199b3a=this[_0x26ebfa(0x2f4)]-_0x53b9b2[_0x26ebfa(0x288)];_0x22e1b1+=_0x199b3a/0x2;if(_0x199b3a<0x0)_0x3fae2a-=_0x199b3a;Window_StatusBase[_0x26ebfa(0x1ab)][_0x26ebfa(0x186)][_0x26ebfa(0x3ee)](this,_0x3d0ea1,_0x22e1b1,_0x2ad1db,_0x3fae2a,_0x23fd25);},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x281)]=function(){const _0x3ccf93=_0x2e2dc8;VisuMZ[_0x3ccf93(0x1e6)]['Settings']['Window'][_0x3ccf93(0x31d)][_0x3ccf93(0x3ee)](this),this[_0x3ccf93(0x28a)]();},Window_ClassStatus[_0x2e2dc8(0x1ab)]['drawParameterList']=function(){const _0x1a2abe=_0x2e2dc8;this['resetFontSettings'](),VisuMZ['ClassChangeSystem'][_0x1a2abe(0x260)][_0x1a2abe(0x361)]['DrawParamJS'][_0x1a2abe(0x3ee)](this);},Window_ClassStatus[_0x2e2dc8(0x1ab)]['actorParams']=function(){const _0x3eacff=_0x2e2dc8;return Imported[_0x3eacff(0x299)]?VisuMZ[_0x3eacff(0x313)][_0x3eacff(0x260)][_0x3eacff(0x3fc)][_0x3eacff(0x1df)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x39b)]=function(){const _0x1e9e73=_0x2e2dc8;return VisuMZ[_0x1e9e73(0x1e6)][_0x1e9e73(0x260)][_0x1e9e73(0x361)][_0x1e9e73(0x18b)];},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1a7)]=function(){const _0x1eb1ec=_0x2e2dc8;return Imported[_0x1eb1ec(0x299)]&&VisuMZ[_0x1eb1ec(0x313)][_0x1eb1ec(0x260)][_0x1eb1ec(0x3fc)][_0x1eb1ec(0x2f9)];},Window_ClassStatus['prototype']['drawActorFace']=function(_0x5aa21b,_0xdead2,_0x32a8bb,_0xad1170,_0x4d5acc){const _0x1d7345=_0x2e2dc8;if(Imported[_0x1d7345(0x346)])switch(this[_0x1d7345(0x377)]()){case _0x1d7345(0x21e):break;case _0x1d7345(0x197):this[_0x1d7345(0x249)](_0x5aa21b,_0xdead2,_0x32a8bb,_0xad1170,_0x4d5acc);break;case _0x1d7345(0x1c3):this[_0x1d7345(0x387)](_0x5aa21b,_0xdead2,_0x32a8bb,_0xad1170,_0x4d5acc);break;default:this['prepareDrawActorFace'](_0x5aa21b,_0xdead2,_0x32a8bb,_0xad1170,_0x4d5acc);break;}else this['prepareDrawActorFace'](_0x5aa21b,_0xdead2,_0x32a8bb,_0xad1170,_0x4d5acc);},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x19a)]=function(_0x24e4bb,_0x2d7eea,_0x3fd0fe,_0x2b5e91,_0x4fac35){const _0x4e7a84=_0x2e2dc8,_0x6e2e88=ImageManager['loadFace'](_0x24e4bb[_0x4e7a84(0x38f)]());_0x6e2e88['addLoadListener'](Window_StatusBase[_0x4e7a84(0x1ab)]['drawActorFace'][_0x4e7a84(0x257)](this,_0x24e4bb,_0x2d7eea,_0x3fd0fe,_0x2b5e91,_0x4fac35));},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3e9)]=function(_0x1c4b21,_0x48e8fb){const _0x47c6b6=_0x2e2dc8,_0x9129cf=this[_0x47c6b6(0x17b)]();this[_0x47c6b6(0x36f)](ColorManager[_0x47c6b6(0x396)]());if(Imported['VisuMZ_0_CoreEngine']){const _0x5e720f=VisuMZ['CoreEngine'][_0x47c6b6(0x260)]['UI'][_0x47c6b6(0x26d)];this['drawText'](_0x5e720f,_0x1c4b21,_0x48e8fb,_0x9129cf,_0x47c6b6(0x183));}else this[_0x47c6b6(0x194)]('→',_0x1c4b21,_0x48e8fb,_0x9129cf,_0x47c6b6(0x183));},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x17b)]=function(){return 0x20;},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x330)]=function(_0x2b0292,_0x347e80,_0x269502,_0x580703){const _0x4c6038=_0x2e2dc8,_0x28143c=this[_0x4c6038(0x36a)]();Imported['VisuMZ_0_CoreEngine']?this[_0x4c6038(0x2da)](_0x347e80+_0x28143c,_0x269502,_0x580703,_0x2b0292,![]):(this['changeTextColor'](ColorManager['systemColor']()),this[_0x4c6038(0x194)](TextManager[_0x4c6038(0x173)](_0x2b0292),_0x347e80+_0x28143c,_0x269502,_0x580703),this[_0x4c6038(0x266)]());},Window_ClassStatus['prototype'][_0x2e2dc8(0x280)]=function(_0x4cb5c9,_0x1329f6,_0x31be73,_0x339e43){const _0x1c34b4=_0x2e2dc8,_0x38c8ab=this[_0x1c34b4(0x36a)]();let _0x1ed5a9=0x0;Imported['VisuMZ_0_CoreEngine']?_0x1ed5a9=this[_0x1c34b4(0x1d3)][_0x1c34b4(0x2a3)](_0x4cb5c9,!![]):_0x1ed5a9=this[_0x1c34b4(0x1d3)][_0x1c34b4(0x173)](_0x4cb5c9);const _0x39aeba=_0x1ed5a9;this[_0x1c34b4(0x194)](_0x1ed5a9,_0x1329f6,_0x31be73,_0x339e43-_0x38c8ab,_0x1c34b4(0x3af)),this[_0x1c34b4(0x266)]();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x275)]=function(_0x429ef9,_0x3fc7b3,_0x51e854,_0x376465){const _0x4f9031=_0x2e2dc8,_0x113756=this[_0x4f9031(0x36a)]();let _0x40034a=0x0,_0x3b3d81=0x0,_0x51b384='';if(this[_0x4f9031(0x1ff)]){Imported['VisuMZ_0_CoreEngine']?(_0x40034a=this[_0x4f9031(0x1d3)][_0x4f9031(0x2a3)](_0x429ef9,![]),_0x3b3d81=this[_0x4f9031(0x1ff)][_0x4f9031(0x2a3)](_0x429ef9,![]),_0x51b384=this[_0x4f9031(0x1ff)][_0x4f9031(0x2a3)](_0x429ef9,!![])):(_0x40034a=this[_0x4f9031(0x1d3)][_0x4f9031(0x173)](_0x429ef9),_0x3b3d81=this[_0x4f9031(0x1ff)][_0x4f9031(0x173)](_0x429ef9),_0x51b384=this[_0x4f9031(0x1ff)][_0x4f9031(0x173)](_0x429ef9));const _0x213c53=_0x40034a,_0x129527=_0x3b3d81;diffValue=_0x129527-_0x213c53,this['changeTextColor'](ColorManager[_0x4f9031(0x151)](diffValue)),this[_0x4f9031(0x194)](_0x51b384,_0x3fc7b3,_0x51e854,_0x376465-_0x113756,'right');}this[_0x4f9031(0x266)]();},Window_ClassStatus['prototype'][_0x2e2dc8(0x400)]=function(_0x5ef1c4,_0x5ecd3f,_0x4aa9cc,_0x7eeb9b){const _0x503722=_0x2e2dc8,_0x20d206=this[_0x503722(0x36a)]();let _0x2b6ce0=0x0,_0x1d26dd=0x0,_0xac43d5=![];if(this[_0x503722(0x1ff)]){Imported[_0x503722(0x299)]?(_0x2b6ce0=this[_0x503722(0x1d3)][_0x503722(0x2a3)](_0x5ef1c4,![]),_0x1d26dd=this[_0x503722(0x1ff)][_0x503722(0x2a3)](_0x5ef1c4,![]),_0xac43d5=String(this[_0x503722(0x1d3)][_0x503722(0x2a3)](_0x5ef1c4,!![]))[_0x503722(0x2fc)](/([%％])/i)):(_0x2b6ce0=this[_0x503722(0x1d3)][_0x503722(0x173)](_0x5ef1c4),_0x1d26dd=this['_tempActor'][_0x503722(0x173)](_0x5ef1c4),_0xac43d5=_0x2b6ce0%0x1!==0x0||_0x1d26dd%0x1!==0x0);const _0x2be4b5=_0x2b6ce0,_0x36cd8e=_0x1d26dd,_0x17a3bc=_0x36cd8e-_0x2be4b5;let _0x54f325=_0x17a3bc;if(_0xac43d5)_0x54f325=Math[_0x503722(0x237)](_0x17a3bc*0x64)+'%';_0x17a3bc!==0x0&&(this['changeTextColor'](ColorManager['paramchangeTextColor'](_0x17a3bc)),_0x54f325=(_0x17a3bc>0x0?_0x503722(0x3ae):_0x503722(0x2f7))['format'](_0x54f325),this[_0x503722(0x194)](_0x54f325,_0x5ecd3f+_0x20d206,_0x4aa9cc,_0x7eeb9b,'left'));}this[_0x503722(0x266)]();},Window_ClassStatus[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3b1)]=function(_0xf3cd2b,_0x160291,_0x2c0714,_0x15da88,_0x1f8b95){const _0x4c2b6c=_0x2e2dc8;if(VisuMZ[_0x4c2b6c(0x1e6)]['Settings'][_0x4c2b6c(0x361)]['DrawBackRect']===![])return;_0x1f8b95=Math[_0x4c2b6c(0x3e5)](_0x1f8b95||0x1,0x1);while(_0x1f8b95--){_0x15da88=_0x15da88||this[_0x4c2b6c(0x35e)](),this[_0x4c2b6c(0x1e8)][_0x4c2b6c(0x251)]=0xa0;const _0x11bab2=ColorManager[_0x4c2b6c(0x3c1)]();this[_0x4c2b6c(0x1e8)][_0x4c2b6c(0x23e)](_0xf3cd2b+0x1,_0x160291+0x1,_0x2c0714-0x2,_0x15da88-0x2,_0x11bab2),this[_0x4c2b6c(0x1e8)][_0x4c2b6c(0x251)]=0xff;}},ColorManager[_0x2e2dc8(0x3c1)]=function(){const _0xae0276=_0x2e2dc8,_0x3d764e=VisuMZ[_0xae0276(0x1e6)][_0xae0276(0x260)][_0xae0276(0x361)];let _0x132389=_0x3d764e[_0xae0276(0x37a)]!==undefined?_0x3d764e[_0xae0276(0x37a)]:0x13;return ColorManager[_0xae0276(0x21a)](_0x132389);},Window_ClassStatus['prototype']['drawActorResources']=function(_0x3317c8,_0x4407a5,_0x3c7284){const _0x3d15b4=_0x2e2dc8,_0x291fc2=VisuMZ['ClassChangeSystem']['Settings'][_0x3d15b4(0x361)][_0x3d15b4(0x35b)],_0x45d613=this[_0x3d15b4(0x1d3)]['currentClass']()['id'];for(const _0x22048b of _0x291fc2){switch(_0x22048b[_0x3d15b4(0x1d8)]()['trim']()){case'AP':if(!Imported[_0x3d15b4(0x2e7)])continue;this[_0x3d15b4(0x2d2)](this[_0x3d15b4(0x1d3)],_0x45d613,_0x3317c8,_0x4407a5,_0x3c7284,_0x3d15b4(0x3af)),_0x4407a5+=this[_0x3d15b4(0x35e)]();break;case'CP':if(!Imported[_0x3d15b4(0x258)])continue;this[_0x3d15b4(0x2e0)](this[_0x3d15b4(0x1d3)],_0x45d613,_0x3317c8,_0x4407a5,_0x3c7284,_0x3d15b4(0x3af)),_0x4407a5+=this['lineHeight']();break;case'JP':if(!Imported[_0x3d15b4(0x258)])continue;this['drawActorJobPoints'](this[_0x3d15b4(0x1d3)],_0x45d613,_0x3317c8,_0x4407a5,_0x3c7284,_0x3d15b4(0x3af)),_0x4407a5+=this['lineHeight']();break;case'SP':if(!Imported[_0x3d15b4(0x2e7)])continue;this['drawActorSkillPoints'](this[_0x3d15b4(0x1d3)],_0x45d613,_0x3317c8,_0x4407a5,_0x3c7284,'right'),_0x4407a5+=this[_0x3d15b4(0x35e)]();break;}}};function Window_ClassCommand(){const _0xbbc2d5=_0x2e2dc8;this[_0xbbc2d5(0x3dd)](...arguments);}Window_ClassCommand['prototype']=Object['create'](Window_Command[_0x2e2dc8(0x1ab)]),Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x34c)]=Window_ClassCommand,Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)]=function(_0x4ee763){const _0xc4df0c=_0x2e2dc8;Window_Command[_0xc4df0c(0x1ab)][_0xc4df0c(0x3dd)][_0xc4df0c(0x3ee)](this,_0x4ee763),this['deselect'](),this[_0xc4df0c(0x1c0)]();},Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x18f)]=function(){const _0xd50f3f=_0x2e2dc8;return this[_0xd50f3f(0x35e)]()*0x3+0x8;},Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x244)]=function(_0xe77f30){const _0x50194e=_0x2e2dc8;this[_0x50194e(0x1d3)]!==_0xe77f30&&(this['_actor']=_0xe77f30,this[_0x50194e(0x24d)]());},Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x24d)]=function(){const _0x115e65=_0x2e2dc8;Window_Command[_0x115e65(0x1ab)]['refresh'][_0x115e65(0x3ee)](this),this['refreshCursor']();if(this[_0x115e65(0x22f)])this['updateHelp']();},Window_ClassCommand['prototype'][_0x2e2dc8(0x161)]=function(_0x34b8d2,_0x2d2c3a){const _0x60c361=_0x2e2dc8;_0x2d2c3a=_0x2d2c3a||0x1,this['changePaintOpacity'](![]);const _0x3c07b3=ColorManager[_0x60c361(0x16c)](),_0x178736=ColorManager[_0x60c361(0x3d8)](),_0x3d1998=_0x34b8d2[_0x60c361(0x288)]/0x2,_0x1eb111=this['lineHeight']();while(_0x2d2c3a--){this[_0x60c361(0x1e8)][_0x60c361(0x20c)](_0x34b8d2['x'],_0x34b8d2['y'],_0x3d1998,_0x1eb111,_0x178736,_0x3c07b3),this[_0x60c361(0x1e8)]['gradientFillRect'](_0x34b8d2['x']+_0x3d1998,_0x34b8d2['y'],_0x3d1998,_0x1eb111,_0x3c07b3,_0x178736);}this[_0x60c361(0x368)](!![]);},Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2bd)]=function(_0x1f227d,_0x7ce1e9,_0x328bb6){const _0x5e9e04=_0x2e2dc8;if(!_0x7ce1e9)return;const _0x165893=VisuMZ['ClassChangeSystem']['RegExp'],_0x1f94d3=_0x7ce1e9['note'];let _0x5e93fd='';if(_0x1f94d3[_0x5e9e04(0x2fc)](_0x165893[_0x5e9e04(0x3cc)]))_0x5e93fd=String(RegExp['$1']);else _0x1f94d3[_0x5e9e04(0x2fc)](_0x165893[_0x5e9e04(0x3a3)])&&(_0x5e93fd=String(RegExp['$1']));if(_0x5e93fd){const _0x2cf1e4=ImageManager[_0x5e9e04(0x1f5)](_0x5e93fd);_0x2cf1e4[_0x5e9e04(0x3f8)](this[_0x5e9e04(0x317)]['bind'](this,_0x1f227d,_0x2cf1e4));}else this[_0x5e9e04(0x39c)](_0x7ce1e9,_0x328bb6);},Window_ClassCommand['prototype'][_0x2e2dc8(0x317)]=function(_0x4f11e0,_0x5861e2){const _0x1c8dd6=_0x2e2dc8,_0x2e1f84=this['itemRectWithPadding'](_0x4f11e0);let _0x39f145=_0x2e1f84['x']+this[_0x1c8dd6(0x36a)](),_0x51cea6=_0x2e1f84['y']+0x4,_0x2d2c25=_0x2e1f84[_0x1c8dd6(0x288)]-this[_0x1c8dd6(0x36a)]()*0x2,_0x80f805=Math['min'](this[_0x1c8dd6(0x35e)]()*0x3,_0x2e1f84[_0x1c8dd6(0x2b7)])-0x4,_0x766dc8=Math[_0x1c8dd6(0x1e0)](_0x2d2c25,_0x80f805);const _0x2c22d8=_0x766dc8/_0x5861e2['width'],_0x33f9b6=_0x766dc8/_0x5861e2[_0x1c8dd6(0x2b7)],_0x4e79a5=Math[_0x1c8dd6(0x1e0)](_0x2c22d8,_0x33f9b6,0x1);let _0x5414ad=Math[_0x1c8dd6(0x237)](_0x5861e2[_0x1c8dd6(0x288)]*_0x4e79a5),_0x238d2e=Math['round'](_0x5861e2[_0x1c8dd6(0x2b7)]*_0x4e79a5);_0x39f145+=Math[_0x1c8dd6(0x237)]((_0x766dc8-_0x5414ad)/0x2),_0x51cea6+=Math[_0x1c8dd6(0x237)]((_0x766dc8-_0x238d2e)/0x2);const _0x574092=_0x5861e2['width'],_0x4689e2=_0x5861e2[_0x1c8dd6(0x2b7)];this[_0x1c8dd6(0x1e8)][_0x1c8dd6(0x26a)][_0x1c8dd6(0x2c2)]=!![],this[_0x1c8dd6(0x1e8)][_0x1c8dd6(0x26e)](_0x5861e2,0x0,0x0,_0x574092,_0x4689e2,_0x39f145,_0x51cea6,_0x5414ad,_0x238d2e),this[_0x1c8dd6(0x1e8)][_0x1c8dd6(0x26a)][_0x1c8dd6(0x2c2)]=!![];},Window_ClassCommand['prototype'][_0x2e2dc8(0x39c)]=function(_0x524288,_0x2e56f3){const _0x5558e2=_0x2e2dc8;if(!_0x524288)return;const _0x4144bb=_0x524288[_0x5558e2(0x3cf)];let _0x31357e=_0x2e56f3['x']+this[_0x5558e2(0x36a)](),_0x5a2da5=_0x2e56f3['y']+0x4,_0x44ad6c=_0x2e56f3['width']-this['itemPadding']()*0x2,_0x379663=Math[_0x5558e2(0x1e0)](this[_0x5558e2(0x35e)]()*0x3,_0x2e56f3['height']),_0x3b7048=Math['min'](_0x44ad6c,_0x379663);_0x3b7048=Math['floor'](_0x3b7048/ImageManager[_0x5558e2(0x23b)])*ImageManager[_0x5558e2(0x23b)],_0x5a2da5+=(_0x379663-_0x3b7048)/0x2;const _0x393dd7=ImageManager['loadSystem'](_0x5558e2(0x335)),_0x1f22bf=ImageManager[_0x5558e2(0x23b)],_0x2acfb2=ImageManager[_0x5558e2(0x351)],_0x45822e=_0x4144bb%0x10*_0x1f22bf,_0x38e032=Math['floor'](_0x4144bb/0x10)*_0x2acfb2;this[_0x5558e2(0x1e8)][_0x5558e2(0x26a)][_0x5558e2(0x2c2)]=![],this['contents'][_0x5558e2(0x26e)](_0x393dd7,_0x45822e,_0x38e032,_0x1f22bf,_0x2acfb2,_0x31357e,_0x5a2da5,_0x3b7048,_0x3b7048),this[_0x5558e2(0x1e8)][_0x5558e2(0x26a)]['imageSmoothingEnabled']=!![];},Window_ClassCommand['prototype'][_0x2e2dc8(0x382)]=function(){const _0x689182=_0x2e2dc8;return VisuMZ[_0x689182(0x1e6)]['Settings'][_0x689182(0x361)]['DisplayedResources']||[];},Window_ClassCommand[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x172)]=function(_0x21fbf6,_0x5e2932){const _0x523071=_0x2e2dc8,_0x39f3c6=this[_0x523071(0x382)]();let _0x4ed5d2=_0x5e2932['y']+this[_0x523071(0x35e)](),_0x3bbdbe=0x0;const _0x4f1320=_0x5e2932['width']-this[_0x523071(0x36a)]()*0x2;for(const _0x2ebd66 of _0x39f3c6){if(_0x3bbdbe>=0x2)return;switch(_0x2ebd66){case'AP':if(!Imported[_0x523071(0x2e7)])continue;let _0x74e949=VisuMZ[_0x523071(0x17e)][_0x523071(0x260)][_0x523071(0x3ad)];if(!_0x74e949)continue;if(_0x74e949[_0x523071(0x33a)])continue;this[_0x523071(0x2d2)](this['_actor'],_0x21fbf6,_0x5e2932['x'],_0x4ed5d2,_0x4f1320,_0x523071(0x3af)),_0x4ed5d2+=this[_0x523071(0x35e)](),_0x3bbdbe++;break;case'CP':if(!Imported[_0x523071(0x258)])continue;let _0x4078c6=VisuMZ[_0x523071(0x1e6)][_0x523071(0x260)]['ClassPoints'];if(!_0x4078c6)continue;if(_0x4078c6[_0x523071(0x33a)])continue;this[_0x523071(0x2e0)](this[_0x523071(0x1d3)],_0x21fbf6,_0x5e2932['x'],_0x4ed5d2,_0x4f1320,'right'),_0x4ed5d2+=this[_0x523071(0x35e)](),_0x3bbdbe++;break;case'JP':if(!Imported[_0x523071(0x258)])continue;let _0x5e4072=VisuMZ[_0x523071(0x1e6)][_0x523071(0x260)]['JobPoints'];if(!_0x5e4072)continue;if(_0x5e4072[_0x523071(0x33a)])continue;this[_0x523071(0x331)](this[_0x523071(0x1d3)],_0x21fbf6,_0x5e2932['x'],_0x4ed5d2,_0x4f1320,'right'),_0x4ed5d2+=this[_0x523071(0x35e)](),_0x3bbdbe++;break;case'SP':if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;let _0x3a2fb7=VisuMZ[_0x523071(0x17e)]['Settings'][_0x523071(0x2f8)];if(!_0x3a2fb7)continue;if(_0x3a2fb7['SharedResource'])continue;this[_0x523071(0x33d)](this[_0x523071(0x1d3)],_0x21fbf6,_0x5e2932['x'],_0x4ed5d2,_0x4f1320,_0x523071(0x3af)),_0x4ed5d2+=this[_0x523071(0x35e)](),_0x3bbdbe++;break;}}};function Window_ClassTier(){this['initialize'](...arguments);}Window_ClassTier[_0x2e2dc8(0x1ab)]=Object[_0x2e2dc8(0x39f)](Window_ClassCommand['prototype']),Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x34c)]=Window_ClassTier,Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3dd)]=function(_0x4b0745){const _0x582631=_0x2e2dc8;Window_ClassCommand[_0x582631(0x1ab)][_0x582631(0x3dd)]['call'](this,_0x4b0745);},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x33f)]=function(){const _0x367d0c=_0x2e2dc8;return this[_0x367d0c(0x30c)];},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x18f)]=function(){const _0x57cc20=_0x2e2dc8;let _0x481124=Window_ClassCommand['prototype'][_0x57cc20(0x18f)][_0x57cc20(0x3ee)](this);if(this[_0x57cc20(0x1d3)]){const _0x58270e=this['_actor'][_0x57cc20(0x341)]()||0x1;_0x481124=Math[_0x57cc20(0x3e5)](_0x481124,this[_0x57cc20(0x253)]/_0x58270e);}return _0x481124;},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x2a2)]=function(){const _0x238aa4=_0x2e2dc8;if(this['_helpWindow']){if(this[_0x238aa4(0x188)]()){const _0x50ce5a=VisuMZ['ClassChangeSystem'][_0x238aa4(0x260)][_0x238aa4(0x3d3)];if(!_0x50ce5a)return;const _0x90a1b4=_0x50ce5a[this['currentExt']()-0x1];if(!_0x90a1b4)return;this['_helpWindow'][_0x238aa4(0x2df)](_0x90a1b4[_0x238aa4(0x27a)]);}else this[_0x238aa4(0x159)][_0x238aa4(0x2df)]('');}},Window_ClassTier['prototype']['makeCommandList']=function(){const _0x273c39=_0x2e2dc8;if(!this[_0x273c39(0x1d3)])return;const _0x529848=this[_0x273c39(0x1d3)]['totalMulticlass'](),_0x5756f1=VisuMZ['ClassChangeSystem'][_0x273c39(0x260)]['Multiclass'];for(let _0x3047eb=0x0;_0x3047eb<_0x529848;_0x3047eb++){const _0x5388da=_0x5756f1[_0x3047eb];if(!_0x5388da)continue;const _0x2b8eb4=_0x5388da['Name'],_0x43e63f=_0x3047eb+0x1,_0x52fd04=this['isEnabled'](_0x43e63f);this[_0x273c39(0x166)](_0x2b8eb4,_0x273c39(0x3d7),_0x52fd04,_0x43e63f);}},Window_ClassTier['prototype'][_0x2e2dc8(0x2ed)]=function(_0x1e66d0){const _0x38a5cf=_0x2e2dc8;if(this[_0x38a5cf(0x1d3)][_0x38a5cf(0x2dd)](_0x1e66d0))return![];return _0x1e66d0>0x0;},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x27d)]=function(_0x2f67f3){const _0x115a67=_0x2e2dc8;if(!this[_0x115a67(0x1d3)])return;const _0x450e96=this[_0x115a67(0x26b)](_0x2f67f3),_0x550bd6=this['_list'][_0x2f67f3]['ext']||0x1,_0xdc6431=this['_actor'][_0x115a67(0x1f4)](_0x550bd6),_0x264ca7=_0xdc6431?_0xdc6431['id']:0x0,_0x495a03=VisuMZ['ClassChangeSystem'][_0x115a67(0x260)]['Multiclass'];if(!_0x495a03)return;const _0x1c8a2b=_0x495a03[_0x550bd6-0x1];if(!_0x1c8a2b)return;let _0x1af04a=_0x450e96['x'],_0x298b8a=_0x450e96['y'],_0x1afed1=_0x450e96[_0x115a67(0x288)]-this[_0x115a67(0x36a)]()*0x2,_0x3df859=_0x450e96[_0x115a67(0x2b7)],_0x52ae9a=Math[_0x115a67(0x1e0)](_0x1afed1,_0x3df859,this[_0x115a67(0x35e)]()*0x3);_0x52ae9a=Math[_0x115a67(0x24b)](_0x52ae9a/ImageManager[_0x115a67(0x23b)])*ImageManager[_0x115a67(0x23b)],_0x1af04a+=_0x52ae9a+this[_0x115a67(0x36a)]()*0x4,this['resetFontSettings'](),this[_0x115a67(0x266)](),this[_0x115a67(0x161)](_0x450e96),this[_0x115a67(0x368)](this[_0x115a67(0x2ed)](_0x550bd6)),this[_0x115a67(0x2bd)](_0x2f67f3,_0xdc6431,_0x450e96),this[_0x115a67(0x36f)](ColorManager[_0x115a67(0x21a)](_0x1c8a2b['TextColor'])),this[_0x115a67(0x194)](_0x1c8a2b[_0x115a67(0x366)],_0x450e96['x'],_0x450e96['y'],_0x450e96['width'],_0x115a67(0x183)),this[_0x115a67(0x266)]();if(!_0xdc6431){this[_0x115a67(0x368)](![]);const _0x198ddd=Math[_0x115a67(0x237)](_0x450e96['y']+this['lineHeight']()+(_0x450e96['height']-this[_0x115a67(0x35e)]()*0x2)/0x2);this['drawText'](TextManager['classChange_multiclass_noClass'],_0x450e96['x'],_0x198ddd,_0x450e96[_0x115a67(0x288)],'center');return;}_0x298b8a+=this['lineHeight']();let _0x2e8d72=_0xdc6431['name'];_0x2e8d72=_0x2e8d72[_0x115a67(0x238)](/\x1I\[(\d+)\]/gi,''),_0x2e8d72=_0x2e8d72[_0x115a67(0x238)](/\\I\[(\d+)\]/gi,''),this[_0x115a67(0x194)](_0x2e8d72,_0x1af04a,_0x298b8a,_0x450e96['width']-_0x1af04a),_0x298b8a+=this[_0x115a67(0x35e)](),this[_0x115a67(0x3bf)](this[_0x115a67(0x1d3)],_0x264ca7,_0x1af04a,_0x298b8a-0x4),_0x298b8a+=this[_0x115a67(0x35e)](),this[_0x115a67(0x172)](_0x264ca7,_0x450e96),this['drawExtraContents'](_0x264ca7,_0x550bd6,_0x1c8a2b,_0x450e96);},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x204)]=function(){const _0x511a04=_0x2e2dc8,_0x33c348=VisuMZ[_0x511a04(0x1e6)][_0x511a04(0x260)][_0x511a04(0x361)][_0x511a04(0x178)];if(_0x33c348){_0x33c348[_0x511a04(0x401)](this,arguments);return;}const _0x8f5a3b=arguments[0x0],_0x28ee89=arguments[0x1],_0x1b57ee=arguments[0x2],_0x36b4c5=arguments[0x3],_0x1efa01=$dataClasses[_0x8f5a3b],_0xd4ae5e=Imported[_0x511a04(0x307)],_0x3421c0=!![],_0xae1dc8=0x16;let _0x1ba3b1=_0x36b4c5['x']+this[_0x511a04(0x36a)]()*0x4,_0x51e4bc=_0x36b4c5['y']+this[_0x511a04(0x35e)]()*3.25,_0x4f1d51=_0x36b4c5[_0x511a04(0x288)]-this[_0x511a04(0x36a)]()*0x8;if(_0x1b57ee[_0x511a04(0x168)]&&_0x51e4bc+this[_0x511a04(0x35e)]()<=_0x36b4c5['y']+_0x36b4c5[_0x511a04(0x2b7)]){let _0x220227=_0x1efa01[_0x511a04(0x2e1)][_0x511a04(0x403)](_0x4608b8=>_0x4608b8[_0x511a04(0x38d)]===Game_BattlerBase[_0x511a04(0x296)])[_0x511a04(0x268)](_0x3dd7e3=>$dataSystem['skillTypes'][_0x3dd7e3['dataId']])[_0x511a04(0x2ee)](',\x20'),_0x35262c='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x511a04(0x154)](TextManager[_0x511a04(0x191)],_0x220227,_0xae1dc8||0x16);if(_0x3421c0)_0x35262c=_0x35262c['replace'](/\\I\[(\d+)\]/gi,'');if(_0xd4ae5e)_0x35262c=_0x511a04(0x3b4)+_0x35262c;this['drawTextEx'](_0x35262c,_0x1ba3b1,_0x51e4bc,_0x4f1d51),_0x51e4bc+=this[_0x511a04(0x35e)]();}if(_0x1b57ee[_0x511a04(0x208)]&&_0x51e4bc+this[_0x511a04(0x35e)]()<=_0x36b4c5['y']+_0x36b4c5[_0x511a04(0x2b7)]){let _0x4f7ff8=_0x1efa01[_0x511a04(0x2e1)][_0x511a04(0x403)](_0x5e4207=>_0x5e4207['code']===Game_BattlerBase[_0x511a04(0x227)])[_0x511a04(0x268)](_0x148dea=>$dataSystem['weaponTypes'][_0x148dea['dataId']])[_0x511a04(0x2ee)](',\x20'),_0x2a2b7a=_0x511a04(0x32b)[_0x511a04(0x154)](TextManager['weapon'],_0x4f7ff8,_0xae1dc8||0x16);if(_0x3421c0)_0x2a2b7a=_0x2a2b7a[_0x511a04(0x238)](/\\I\[(\d+)\]/gi,'');if(_0xd4ae5e)_0x2a2b7a='<WordWrap>'+_0x2a2b7a;this[_0x511a04(0x1d6)](_0x2a2b7a,_0x1ba3b1,_0x51e4bc,_0x4f1d51),_0x51e4bc+=this[_0x511a04(0x35e)]();}if(_0x1b57ee[_0x511a04(0x338)]&&_0x51e4bc+this[_0x511a04(0x35e)]()<=_0x36b4c5['y']+_0x36b4c5['height']){let _0x16ecfa=_0x1efa01[_0x511a04(0x2e1)][_0x511a04(0x403)](_0x14c381=>_0x14c381[_0x511a04(0x38d)]===Game_BattlerBase[_0x511a04(0x3c5)])[_0x511a04(0x268)](_0x414729=>$dataSystem[_0x511a04(0x37b)][_0x414729[_0x511a04(0x1c7)]])['join'](',\x20'),_0x5b721f=_0x511a04(0x32b)[_0x511a04(0x154)](TextManager[_0x511a04(0x1ba)],_0x16ecfa,_0xae1dc8||0x16);if(_0x3421c0)_0x5b721f=_0x5b721f[_0x511a04(0x238)](/\\I\[(\d+)\]/gi,'');if(_0xd4ae5e)_0x5b721f=_0x511a04(0x3b4)+_0x5b721f;this['drawTextEx'](_0x5b721f,_0x1ba3b1,_0x51e4bc,_0x4f1d51),_0x51e4bc+=this[_0x511a04(0x35e)]();}},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x170)]=function(){const _0x4a4c1c=_0x2e2dc8;Window_ClassCommand[_0x4a4c1c(0x1ab)][_0x4a4c1c(0x170)][_0x4a4c1c(0x3ee)](this),this[_0x4a4c1c(0x357)]();},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x357)]=function(){const _0x2353a3=_0x2e2dc8;if(!this[_0x2353a3(0x235)]())return;if(!this[_0x2353a3(0x1d3)])return;Input[_0x2353a3(0x3a0)](_0x2353a3(0x38c))&&(this[_0x2353a3(0x1d3)]&&(this[_0x2353a3(0x27f)](this[_0x2353a3(0x395)]())?(this[_0x2353a3(0x409)](),this[_0x2353a3(0x2a2)]()):this[_0x2353a3(0x1a0)]()));},Window_ClassTier[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x235)]=function(){const _0x5e82a7=_0x2e2dc8;if(!this['active'])return![];if(!VisuMZ[_0x5e82a7(0x1e6)]['Settings'][_0x5e82a7(0x361)]['ShiftShortcutKey'])return![];return!![];},Window_ClassTier[_0x2e2dc8(0x1ab)]['canShiftRemoveClass']=function(_0x3996ba){const _0x5acbe9=_0x2e2dc8;if(!this[_0x5acbe9(0x1d3)])return;const _0x1dcd34=this[_0x5acbe9(0x395)]()+0x1;if(_0x1dcd34<=0x1)return![];if(this[_0x5acbe9(0x1d3)][_0x5acbe9(0x2dd)](_0x1dcd34))return![];if(!this[_0x5acbe9(0x1d3)][_0x5acbe9(0x1f4)](_0x1dcd34))return![];return!![];;},Window_ClassTier[_0x2e2dc8(0x1ab)]['processShiftRemoveShortcut']=function(){const _0x159c9e=_0x2e2dc8;SoundManager[_0x159c9e(0x153)](),this[_0x159c9e(0x1d3)][_0x159c9e(0x370)](0x0,this[_0x159c9e(0x395)]()+0x1),this[_0x159c9e(0x24d)](),SceneManager[_0x159c9e(0x3a8)]['_statusWindow']['refresh']();};function _0x3ee1(){const _0x2ef31a=['Game_Actor_equips','gainMulticlassRewardPoints','Window_ClassStatus_RectJS','1363012wrWHJl','CoreEngine','ConfirmAniPrimaryOffsetX','params','deadMembers','drawPicture','UnassignHelpDescription','ParamRates','gainJobPointsForMulticlasses','uiMenuStyle','stateRate','DrawFaceJS','_classChangeTier','getSkillPoints','EnemyJobPoints','Game_Actor_setCharacterImage','previousActor','ShiftButtonAssistText','actorClassFaceName','Game_Actor_traitObjects','changeExp','level','Window_ClassList_RectJS','ARRAYFUNC','maintainLevels','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','setTempActor','drawClassPoints','_ClassChangeSystem_preventLevelUpGain','Game_Actor_changeClass','drawUpdatedParamName','drawActorJobPoints','AutoUnlockRequirements','RestrictClassChangeTier','ClassUnlockRemoveActor','IconSet','Classes','ParseActorNotetags','EquipArmors','mainAreaTop','SharedResource','185388hvIAbu','TargetGainJobPoints','drawActorSkillPoints','addedSkillTypes','isWordWrapEnabled','expForClassLevel','totalMulticlass','getActorClassFaceIndex','addClassChangeSystemCommand','currentSymbol','splice','VisuMZ_1_MainMenuCore','classDescription','createClassTierWindow','_ClassChangeSystem_MainMenu','buttonAssistOffset3','classPointsFull','constructor','getJobPoints','pageup','_updateClassLearnedSkills','earnedClassPoints','iconHeight','Actor-%1-Class-%2','onActorChange','split','levelUpGainJobPoints','StartClassJobPoints','checkShiftRemoveShortcut','Game_Actor_tradeItemWithParty','STRUCT','Limit','DisplayedResources','_buttonAssistWindow','MainMenu','lineHeight','ClassChangeAnimation','StartingClassTier','Window','shown','UserGainClassPoints','onClassListCancel','pow','Name','inBattle','changePaintOpacity','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','itemPadding','PerAction','getActorClassBattlerName','Tier','popScene','changeTextColor','changeMulticlass','hide','currentClassLevelExp','loadTitle2','onClassListOk','Item-%1-%2','initMulticlass','graphicType','addClassChangeTierRestriction','mainAreaHeight','BackRectColor','armorTypes','padding','ShowMainMenu','version','Weapon-%1-%2','JSON','Class-%1-%2','visibleResources','Game_Action_applyItemUserEffect','bitmap','classIcon','multiclass','drawItemActorSvBattler','classPointsFmt','JobPointsAdd','Game_Actor_setBattlePortrait','cancel','shift','code','_backSprite1','faceName','classChange_multiclass_remove','actorClassFaceIndex','makeDeepCopy','getBackgroundOpacity','paramBaseForClass','index','systemColor','tradeItemWithParty','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','addClassPoints','parameters','paramValueFontSize','drawBigItemIcon','functionName','ClassChangeRemoveRestrictTier','create','isTriggered','ClassPointsAdd','PerEnemy','bigPicture','Game_BattlerBase_stateRate','ClassIcon','_priorityFaceIndex','debuffRate','_scene','onBattleStart','gainExp','\x1bi[%1]%2','update','AbilityPoints','(+%1)','right','createAnimationDummySprite','drawItemDarkRect','frames','#%1','<WordWrap>','isSceneBattle','ShowVictory','gainRewardsClassPoints','Game_Actor_getBattlePortraitFilename','createBackground','TierOnlyClass','ARRAYJSON','applyClassPoints','clamp','5061328tmWnWo','drawClassLevel','paramRate','getClassChangeBackColor2','updateClassLearnedSkills','members','initJobPoints','TRAIT_EQUIP_ATYPE','gain%1Points','onPersonalOk','DrawPortraitJS','Game_Actor_characterName','levelUpGainAbilityPoints','paramBase','classPicture','onMulticlassOk','_rewards','iconIndex','Game_BattlerBase_isEquipAtypeOk','Window_Base_databaseObjectName','createCustomBackgroundImages','Multiclass','add','ClassPointsLose','Game_Battler_gainSilentTp','tier','dimColor2','naturalUnlockClass','classChange_multiclass_ShiftHelp','Game_Actor_getMenuImage','setHelpWindow','initialize','activate','createKeyJS','getActorClassBattlePortrait','actor','makeCommandList','findMulticlassTier','textSizeEx','max','ext','traitObjects','log','drawRightArrow','classPointsTotal','_windowLayer','classTierWindowRect','attackStatesRate','call','CLASS_CHANGE_SHOW_CLASS_LEVEL','createClassChangeAnimation','commandPersonal','forceSelect','getClassChangeAnimationID','actorClassCharacterName','maxLvGaugeColor1','VictoryText','maxLevel','addLoadListener','Game_BattlerBase_stateResistSet','Actor-%1-%2','ParseClassNotetags','Param','ARRAYNUM','setClassPoints','checkMulticlasses','drawUpdatedParamValueDiff','apply','PerLevelUp','filter','isClassChangeCommandEnabled','LvExpGauge','battleMembers','Game_BattlerBase_attackElements','gainStartingJobPoints','processShiftRemoveShortcut','setCharacterImage','jobPointsFull','isUseSkillsStatesCoreUpdatedLayout','test','Game_Battler_onBattleStart','onMenuImageLoad','Game_BattlerBase_paramRate','databaseObjectName','applyJobPoints','name','applyClassChangeSystemUserEffect','LayoutStyle','_priorityBattlerName','setup','ConfirmAniSubclassOffsetY','newPage','paramchangeTextColor','Game_Actor_setFaceImage','playClassChange','format','classExpRate','AttackElements','SystemEnableClassChangeSystemMenu','addWindow','_helpWindow','addMulticlassTiers','_multiclasses','_tier','concat','getActorClassMenuPortrait','Game_Actor_battlerName','changeClassExp','drawFadedItemBackground','updatedLayoutStyle','Parse_ClassIcons','isRightInputMode','classAdjustHpMp','addCommand','isClassChangeCommandVisible','AddedStypes','getClassIdWithName','drawJobPoints','jobPoints','dimColor1','\x5cI[%1]','SParamRates','TargetGainClassPoints','processCursorMove','State-%1-%2','drawClassResources','param','setBattlerImage','classLevelUp','statusWindowRect','Window_ClassStatus_BgType','Window_ClassTier_ExtraJS','learnings','classPointsIcon','rightArrowWidth','enemy','Game_BattlerBase_addedSkills','SkillLearnSystem','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawGauge','ARRAYEVAL','Game_System_initialize','center','registerCommand','isClassAutoUnlockRequirementsMet','drawItemActorMenuImage','addJobPoints','currentExt','ClassPoints','equips','ParamValueFontSize','left','classChange','levelUpGainClassPoints','itemHeight','checkForAutoClassUnlocks','skill','getMulticlasses','setTier','drawText','loseClassPoints','_classIDs','sprite','needsPageButtons','isMVAnimation','prepareDrawActorFace','EnableLayout','Scene_Menu_createCommandWindow','gainStartingClassPoints','ClassUnlockRemoveGlobal','ChangeClassSound','playBuzzerSound','StartingClassPoints','JobPointsGain','push','uiInputPosition','ClassPointsSet','initClassChangeUnlocks','isUseParamNamesWithIcons','textColor','createCommandWindow','MulticlassRaiseLimit','prototype','_priorityFaceName','addClassChangeSystemCommandAutomatically','2239508CueTFN','TextCodeClassNames','setBackgroundType','boxWidth','buttonAssistSlotWindowShift','setMenuImage','unlockClass','_classId','_highestTier','arePageButtonsEnabled','JobPoints','highestTier','armor','AliveActors','_earnedClassPoints','removeChild','releaseUnequippableItems','184548FnGFvu','deactivate','isAlive','EnableMainMenu','svbattler','Game_Actor_levelUp','actorClassBattlePortrait','note','dataId','isBattleMember','_classLevel','Game_Actor_releaseUnequippableItems','hpRate','mhp','jobPointsFmt','TextFmt','Window_ClassTier_RectJS','playStaticSe','item','_list','_actor','AllowSameSubclassSelect','_targets','drawTextEx','_exp','toUpperCase','DebuffRates','pop','ALLOW_SELECT_SAME_SUBCLASS','ClassBattlerName','forceRemoveClassChangeAnimations','reduce','ExtDisplayedParams','min','resourceRate','gainRewardsJobPoints','process_VisuMZ_ClassChangeSystem','_priorityCharacterIndex','Game_BattlerBase_isEquipWtypeOk','ClassChangeSystem','removeUnlockedClass','contents','setBattlePortrait','optExtraExp','RegExp','maxLvGaugeColor2','classPointsVisible','playOkSound','getActorClassCharacterIndex','expRate','attackStates','mmp','createClassListWindow','getMulticlassAtTier','loadPicture','Game_BattlerBase_debuffRate','CLASS_CHANGE_ADJUST_HP_MP','getActorClassFaceName','Game_BattlerBase_xparam','getBattlePortraitFilename','classChangeMenuCommand','BgSettings','classPointsRate','levelUp','_tempActor','finalExpRate','setFaceImage','xparam','MAX_SAFE_INTEGER','drawExtraContents','getClassChangeTiersOnly','Icon','initClassPoints','EquipWeapons','Scene_Boot_onDatabaseLoaded','from','classPointsAbbr','gradientFillRect','EVAL','subject','scaleSprite','Game_Actor_setMenuImage','isClassExpGaugeDrawn','getInputButtonString','AttackStates','earnedJobPoints','sparam','getActorUnlockedClasses','jobPointsIcon','attackElements','centerSprite','getColor','VocabUnassignClass','maxTp','nextClassLevelExp','none','actorId','classLevel','jobPointsVisible','_priorityBattlePortrait','setMainMenuClassChangeSystemVisible','isBottomHelpMode','_priorityMenuImage','remove','TRAIT_EQUIP_WTYPE','removeClassChangeTierRestriction','General','getClassPoints','smoothSelect','Game_Actor_paramBase','loseJobPoints','elementRate','active','updateClassLevel','_classListWindow','buttonAssistKey3','setHandler','classListWindowRect','isShiftRemoveShortcutEnabled','addChild','round','replace','gainJobPoints','BattleManager_makeRewards','iconWidth','mpRate','characterIndex','fillRect','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','StateRates','indexOf','Game_BattlerBase_addedSkillTypes','ClassID','setActor','ShowClassLevel','actorClassCharacterIndex','initClassChangeSystemMainMenu','getAbilityPoints','drawItemActorSprite','ARRAYSTRUCT','floor','BattleManager_gainExp','refresh','sort','actorClassBattlerName','AbbrText','paintOpacity','setStatusWindow','innerHeight','makeRewards','isEquipWtypeOk','applyItemClassChangeSystemUserEffect','bind','VisuMZ_2_ClassChangeSystem','endBattle','isPlaytest','resetFontSettings','loseMulticlassTiers','_classTierWindow','Window_ClassList_BgType','ClassBattlePortrait','Settings','Tiers','_classChangeTierRestrictions','buttonAssistText3','nextActor','description','resetTextColor','Enable','map','BgFilename2','_context','itemRectWithPadding','process_VisuMZ_ClassChangeSystem_Notetags','ParamArrow','blt','UserGainJobPoints','Show','ParseAllNotetags','StartingJobPoints','gainSilentTp','displayRewards','drawUpdatedAfterParamValue','addOriginalCommands','Actors','changeClass','isMainMenuCoreMenuImageOptionAvailable','HelpDescription','isActor','ClassCharaName','drawItem','3732225wZGYyt','canShiftRemoveClass','drawUpdatedBeforeParamValue','refreshNoMenuImage','Game_BattlerBase_attackStates','ActorUnlockedClasses','setupClassChangeSystem','Window_MenuCommand_addOriginalCommands','isMainMenuClassChangeSystemVisible','ConvertParams','width','jobPointsTotal','drawParameterList','JobPointsRate','highestMulticlassTier','ChangeAdjusHpMp','VisuMZ_1_BattleCore','initClassLevels','gainClassPointsForMulticlasses','exp','_multiclassCheck','BattleCore','Game_Actor_characterIndex','_multiclassTiers','TRAIT_STYPE_ADD','_unlockedClasses','192300IWNluw','VisuMZ_0_CoreEngine','levelUpGainSkillPoints','Game_Actor_faceName','show','PLAY_ANI_FOR_UNASSIGN','STR','_classPoints','_backSprite2','MaintainLevels','updateHelp','paramValueByName','addedSkills','hideAdditionalSprites','uiHelpPosition','getUnlockedClasses','XParamRates','BattleManager_endBattle','determineActiveWindow','applyMulticlassObjects','initClassChangeRestrictions','status','registerActorClassImages','ClassFaceName','MulticlassSetLimit','clear','getMenuImage','learnSkill','refreshActor','createStatusWindow','includes','height','_commandWindow','applyItemUserEffect','getActorClassCharacterName','parse','checkForNewUnlockedClasses','drawBigItemImage','initClassChangeSystem','TextColor','enabled','paramRate%1','imageSmoothingEnabled','expGaugeColor2','Game_BattlerBase_elementRate','Scene_Menu_onPersonalOk','colSpacing','makeRewardsJobPoints','actorClassMenuPortrait','length','gainClassPoints','_earnedJobPoints','Armor-%1-%2','onDatabaseLoaded','setJobPoints','faceIndex','ClassPointsRate','jobPointsRate','drawActorAbilityPoints','Game_BattlerBase_attackStatesRate','expParams','makeRewardsClassPoints','displayRewardsClassPoints','pagedown','adjustSprite','skillId','drawParamText','trim','_jobPoints','isClassChangeTierRestricted','ClassMenuPortrait','setText','drawActorClassPoints','traits','currentClass','_tp','\x5cI[%1]%2','_priorityCharacterName','BattleManager_displayRewards','VisuMZ_2_SkillLearnSystem','characterName','setMulticlassTiers','Game_BattlerBase_sparam','classChange_multiclass_remove_help','Game_Actor_setBattlerImage','isEnabled','join','_statusWindow','_animations','_cache','prepareRefreshItemsEquipsCoreLayout','EnemyClassPoints','innerWidth','BgFilename1','StartClassClassPoints','(%1)','SkillPoints','DrawIcons','StartingMulticlasses','isAutoColorAffected','match','classPoints','Game_Actor_faceIndex','callUpdateHelp','Game_Party_initialize','_subject','jobPointsAbbr','antiEquipsCacheClear_BattleCore_ClassChangeSystem','4jWGJZt','setMainMenuClassChangeSystemEnabled','allMembers','VisuMZ_1_MessageCore','MenuPortraits','updateStatusWindow','exit','Points','_wordWrap','ClassDescription','FullText'];_0x3ee1=function(){return _0x2ef31a;};return _0x3ee1();}function Window_ClassList(){const _0x467bf1=_0x2e2dc8;this[_0x467bf1(0x3dd)](...arguments);}Window_ClassList['prototype']=Object['create'](Window_ClassCommand[_0x2e2dc8(0x1ab)]),Window_ClassList['prototype'][_0x2e2dc8(0x34c)]=Window_ClassList,Window_ClassList['prototype']['initialize']=function(_0x50e594){const _0x91bf64=_0x2e2dc8;this[_0x91bf64(0x15c)]=0x1,Window_ClassCommand[_0x91bf64(0x1ab)][_0x91bf64(0x3dd)][_0x91bf64(0x3ee)](this,_0x50e594);},Window_ClassList[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x1ee)]=function(){const _0xbc9dc6=_0x2e2dc8;SoundManager[_0xbc9dc6(0x153)]();},Window_ClassList[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x252)]=function(_0x1cabab){const _0x1e022d=_0x2e2dc8;this[_0x1e022d(0x2ef)]=_0x1cabab,this[_0x1e022d(0x2ff)]();},Window_ClassList['prototype'][_0x2e2dc8(0x2a2)]=function(){const _0x169e63=_0x2e2dc8;this[_0x169e63(0x159)]&&(this[_0x169e63(0x188)]()?this[_0x169e63(0x159)]['setItem'](this[_0x169e63(0x188)]()):this[_0x169e63(0x159)][_0x169e63(0x2df)](TextManager[_0x169e63(0x2eb)])),this[_0x169e63(0x1d3)]&&this['_statusWindow']&&this['updateStatusWindow']();},Window_ClassList[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x309)]=function(){const _0x49c3ad=_0x2e2dc8,_0x3a4e8a=this[_0x49c3ad(0x188)](),_0x3dc212=JsonEx[_0x49c3ad(0x392)](this[_0x49c3ad(0x1d3)]);_0x3dc212['_tempActor']=!![],_0x3a4e8a!==this[_0x49c3ad(0x1d3)][_0x49c3ad(0x2e2)]()&&(_0x3a4e8a?_0x3dc212[_0x49c3ad(0x370)](_0x3a4e8a['id'],this[_0x49c3ad(0x15c)]):_0x3dc212[_0x49c3ad(0x370)](0x0,this[_0x49c3ad(0x15c)])),this[_0x49c3ad(0x2ef)]['setTempActor'](_0x3dc212);},Window_ClassList[_0x2e2dc8(0x1ab)]['setTier']=function(_0x180b1b){const _0x53311b=_0x2e2dc8;this[_0x53311b(0x15c)]!==_0x180b1b&&(this['_tier']=_0x180b1b,this[_0x53311b(0x24d)]());},Window_ClassList[_0x2e2dc8(0x1ab)][_0x2e2dc8(0x3e2)]=function(){const _0x231d02=_0x2e2dc8;if(!this[_0x231d02(0x1d3)])return;if(this[_0x231d02(0x15c)]<=0x0)return;const _0x45e88f=DataManager['getActorUnlockedClasses'](this[_0x231d02(0x1d3)]);for(const _0x38d23b of _0x45e88f){if(!_0x38d23b)continue;let _0x1e1706=_0x38d23b[_0x231d02(0x413)];_0x1e1706=_0x1e1706[_0x231d02(0x238)](/\x1I\[(\d+)\]/gi,''),_0x1e1706=_0x1e1706[_0x231d02(0x238)](/\\I\[(\d+)\]/gi,'');const _0x4d9cfb=this[_0x231d02(0x2ed)](_0x38d23b);this[_0x231d02(0x166)](_0x1e1706,_0x231d02(0x18d),_0x4d9cfb,_0x38d23b);}this[_0x231d02(0x15c)]>0x1&&this[_0x231d02(0x166)]('',_0x231d02(0x18d),!![],null);},Window_ClassList[_0x2e2dc8(0x1db)]=VisuMZ[_0x2e2dc8(0x1e6)][_0x2e2dc8(0x260)][_0x2e2dc8(0x229)][_0x2e2dc8(0x1d4)]??!![],Window_ClassList['prototype']['isEnabled']=function(_0x3df2a4){const _0x2ba247=_0x2e2dc8;if(this[_0x2ba247(0x1d3)][_0x2ba247(0x2dd)](this['_tier']))return![];if(this['_tier']>0x1&&_0x3df2a4===this[_0x2ba247(0x1d3)][_0x2ba247(0x2e2)]())return![];if(_0x3df2a4){const _0x314cbc=this[_0x2ba247(0x1d3)]['findMulticlassTier'](_0x3df2a4['id']);if(_0x314cbc>0x0&&this[_0x2ba247(0x1d3)][_0x2ba247(0x2dd)](_0x314cbc))return![];const _0x34f7cf=DataManager[_0x2ba247(0x205)](_0x3df2a4);if(!_0x34f7cf[_0x2ba247(0x2b6)](this['_tier']))return![];if(!Window_ClassList['ALLOW_SELECT_SAME_SUBCLASS']){const _0x75ca04=this[_0x2ba247(0x1d3)][_0x2ba247(0x1f4)](this[_0x2ba247(0x15c)]);if(_0x75ca04===_0x3df2a4)return![];}}return this[_0x2ba247(0x15c)]>0x0;},Window_ClassList['prototype']['drawItem']=function(_0x588654){const _0x46a125=_0x2e2dc8;if(!this[_0x46a125(0x1d3)])return;const _0x3ca1a9=this[_0x46a125(0x26b)](_0x588654),_0x2f14f9=this[_0x46a125(0x15c)],_0xd51ae2=this[_0x46a125(0x1d2)][_0x588654][_0x46a125(0x3e6)],_0x479c97=_0xd51ae2?_0xd51ae2['id']:0x0,_0x5a2bfa=VisuMZ[_0x46a125(0x1e6)][_0x46a125(0x260)][_0x46a125(0x3d3)];if(!_0x5a2bfa)return;const _0x429575=_0x5a2bfa[_0x2f14f9-0x1];if(!_0x429575)return;let _0x1d8e58=_0x3ca1a9['x'],_0x489378=_0x3ca1a9['y'],_0x23e6fd=_0x3ca1a9[_0x46a125(0x288)]-this[_0x46a125(0x36a)]()*0x2,_0x511787=_0x3ca1a9[_0x46a125(0x2b7)],_0x48a771=Math[_0x46a125(0x1e0)](_0x23e6fd,_0x511787,this[_0x46a125(0x35e)]()*0x3);_0x48a771=Math[_0x46a125(0x24b)](_0x48a771/ImageManager[_0x46a125(0x23b)])*ImageManager[_0x46a125(0x23b)],_0x1d8e58+=_0x48a771+this[_0x46a125(0x36a)]()*0x4,this[_0x46a125(0x25b)](),this['resetTextColor'](),this[_0x46a125(0x161)](_0x3ca1a9),this[_0x46a125(0x368)](this[_0x46a125(0x2ed)](_0xd51ae2));if(!_0xd51ae2){this[_0x46a125(0x368)](![]);const _0x33eb4e=Math[_0x46a125(0x237)](_0x3ca1a9['y']+this[_0x46a125(0x35e)]()+(_0x3ca1a9[_0x46a125(0x2b7)]-this['lineHeight']()*0x2)/0x2);this[_0x46a125(0x194)](TextManager['classChange_multiclass_remove'],_0x3ca1a9['x'],_0x33eb4e,_0x3ca1a9[_0x46a125(0x288)],_0x46a125(0x183));return;}this[_0x46a125(0x2bd)](_0x588654,_0xd51ae2,_0x3ca1a9);const _0x54aaad=this[_0x46a125(0x1d3)][_0x46a125(0x3e3)](_0x479c97);if(_0x54aaad>0x0){const _0xe8846=_0x5a2bfa[_0x54aaad-0x1];_0xe8846&&(this[_0x46a125(0x36f)](ColorManager[_0x46a125(0x21a)](_0xe8846[_0x46a125(0x2bf)])),this['drawText'](_0xe8846[_0x46a125(0x366)],_0x3ca1a9['x'],_0x3ca1a9['y'],_0x3ca1a9[_0x46a125(0x288)],_0x46a125(0x183)),this[_0x46a125(0x266)]());}this[_0x46a125(0x368)](this[_0x46a125(0x2ed)](_0xd51ae2)),_0x489378+=this[_0x46a125(0x35e)]();let _0x38cd01=_0xd51ae2[_0x46a125(0x413)];_0x38cd01=_0x38cd01['replace'](/\x1I\[(\d+)\]/gi,''),_0x38cd01=_0x38cd01[_0x46a125(0x238)](/\\I\[(\d+)\]/gi,''),this[_0x46a125(0x194)](_0x38cd01,_0x1d8e58,_0x489378,_0x3ca1a9['width']-_0x1d8e58),_0x489378+=this[_0x46a125(0x35e)](),this[_0x46a125(0x3bf)](this[_0x46a125(0x1d3)],_0x479c97,_0x1d8e58,_0x489378-0x4),_0x489378+=this[_0x46a125(0x35e)](),this[_0x46a125(0x172)](_0x479c97,_0x3ca1a9);};