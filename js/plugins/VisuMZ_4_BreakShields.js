//=============================================================================
// VisuStella MZ - Break Shields
// VisuMZ_4_BreakShields.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_BreakShields = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BreakShields = VisuMZ.BreakShields || {};
VisuMZ.BreakShields.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.06] [BreakShields]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Break_Shields_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin introduces a new mechanic called Break Shields. Actors and/or
 * enemies can have them. Whenever a battler is struck with an elemental
 * weakness, their Break Shield is reduced by 1 (unless modified by a notetag).
 * Once the battler's Break Shield reaches a score of 0, a state is then
 * applied to the battler (usually a stun state). Once the Break state wears
 * off, the battler will regain their Break Shields again. This can be used to
 * create complex battle depth for your game.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Control how Break Shields are calculated alongside how many hits are
 *   required for each actor and/or enemy to enter the Break Stun state.
 * * Display the Break Shields on the screen and relay the information to your
 *   players through icons.
 * * Play animations when hitting a weakness and reducing Break Shields.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_0_CoreEngine
 *
 * Two of the animation Plugin Parameters require the Core Engine to play them.
 * This is due to how the Core Engine allows playing animations without halting
 * the battle system to allow for a seamless flow despite relaying the Break
 * Shield reduction visual feedback.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 *
 * VisuMZ_2_BattleSystemSTB
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === Break Shield Calculation-Related Notetags ===
 * 
 * ---
 *
 * <Break Shields: x>
 *
 * - Used for: Actor, Class, Enemy Notetags
 * - Declares the base amount of Break Shields this battler will have.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number representing the base amount of Break Shields to
 *   give this battler.
 * - If both the Actor and Class database object has this notetag, priority
 *   will be given to the Class before the Actor.
 *
 * ---
 *
 * <Break Shields: +x>
 * <Break Shields: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Allows trait objects to alter the amount of Break Shields battlers have
 *   whenever their Break Shields are reset.
 * - Replace 'x' with a number representing the Break Shields to increase or
 *   decrease the amount by.
 * - Total Break Shields cannot go under 1 and cannot go whatever the maximum
 *   is declared inside the Plugin Parameters.
 *
 * ---
 * 
 * === Break Shield Alteration-Related Notetags ===
 * 
 * ---
 *
 * <Break Reduce: x>
 *
 * - Used for: Skill, Item Notetags
 * - Reduces the target's Break Shield by x if this action hits a weakness.
 * - This will ignore the default setting from the Plugin Parameters.
 * - Replace 'x' with a number to determine how many Break Shields to reduce.
 * - If Break Shields reach 0, the target will enter a Stun state.
 *
 * ---
 *
 * <Change Break Shield: x>
 *
 * - Used for: Skill, Item Notetags
 * - This will change the target battler's Break Shield value to x if the
 *   battler isn't currently stunned.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value to change the target battler's Break
 *   Shield value to.
 *
 * ---
 *
 * <Increase Break Shield: +x>
 * <Decrease Break Shield: -x>
 *
 * - Used for: Skill, Item Notetags
 * - This will either increase the target battler's break shield by x or
 *   decrease the target battler's break shield by x.
 * - Happens after the Change Break Shield notetag.
 * - No effect if you don't use this notetag.
 * - Replace 'x' with a number value representing the amount to alter the
 *   target's Break Shields by.
 *
 * ---
 * 
 * === Element-Related Notetags ===
 * 
 * ---
 *
 * <Protect Element: id>
 * <Protect Elements: id, id, id>
 * 
 * <Protect Element: name>
 * <Protect Elements: name, name, name>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Specified element(s) will be guarded and Break Shields cannot be reduced
 *   when struck with that element (as long as the requirement is above 100%).
 * - The element rate for those will cap at 100%, preventing extra damage from
 *   being dealt despite having weaknesses, although custom JS effects will
 *   bypass this.
 * - Replace 'id' with a number value representing the ID(s) of the element(s).
 * - Replace 'name' with the name(s) of the element(s).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Customize the mechanical settings for Break Shields.
 *
 * ---
 *
 * Break Shields
 * 
 *   Affect: Actors?:
 *   - Do Break Shields affect actors?
 * 
 *   Affect: Enemies?:
 *   - Do Break Shields affect actors?
 * 
 *   Base Shield Value:
 *   - The starting amount of shields a battler has.
 *   - Can be altered through notetags.
 * 
 *   Maximum Shields:
 *   - The maximum amount of shields a battler can have.
 *   - This is a hard cap.
 * 
 *   Stun State ID:
 *   - This is the state to be applied when all Break Shields are reduced to 0.
 * 
 *   JS: On Break Stun:
 *   - Runs this code when a battler loses all Break Shields.
 *   - user = attacker; target = break stun target
 *
 * ---
 *
 * Animation
 * 
 *   Reduce Animation ID:
 *   - Play this animation when Break Shields are reduced.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *   Stun Animation ID:
 *   - Play this animation when Break Stun is achieved.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 * ---
 *
 * Weaknesses
 * 
 *   Minimum Rate:
 *   - What is the minimum element rate for an attack to be considered striking
 *     a weakness?
 * 
 *   Default Reduction:
 *   - Default reduction amount for Break Shields when striking an elemental
 *     weakness.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * Customize the UI settings for Break Shields.
 *
 * ---
 *
 * Icons
 * 
 *   Break Shield Icon:
 *   - Icon used to represent Break Shields.
 * 
 *   Stun State Icon:
 *   - Icon used to represent Break Stun if the Break Stun state does NOT have
 *     an icon assigned to it.
 * 
 *     Show Turns?:
 *     - Show how many turns are remaining with the Break Stun?
 * 
 *     Stun Text Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Protect Icon:
 *   - Icon used to represent Protected Elements.
 *   - Used for other plugins.
 * 
 *   Font Size:
 *   - What is the font size used to display the turns and Break Shields
 *     remaining?
 *
 * ---
 *
 * Battlers > Actors/Enemies
 * 
 *   Show Battler Icon?:
 *   - Show Break Shield icons on the SV_Actor/enemy battlers?
 * 
 *   Position:
 *   - Where on the battler would you like to place the icon?
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 * 
 *   Name: Attach Shields (Enemies Only)
 *   - Attach the Break Shield icon to the enemy name?
 *   - Overrides direct attachment.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *     Attach: Offset X:
 *     - How much to offset the attached icon's X position by?
 *     - Negative goes left. Positive goes right.
 * 
 *     Attach: Offset Y:
 *     - How much to offset the attached icon's Y position by?
 *     - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Battle Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the Battle Status?
 * 
 *   Auto-Position?:
 *   - Automatically position the Break Shield icon?
 *   - If not, it'll position it to the upper left.
 * 
 *   Offset X:
 *   - How much to offset the icon X position by?
 *   - Negative goes left. Positive goes right.
 * 
 *   Offset Y:
 *   - How much to offset the icon Y position by?
 *   - Negative goes up. Positive goes down.
 *
 * ---
 *
 * Menu Status
 * 
 *   Show Break Shields?:
 *   - Show Break Shield icons in the menu scenes?
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
 * Version 1.06: June 13, 2024
 * * Bug Fixes!
 * ** Fixed a bug where turn color would not update even if break stun is over.
 *    Fix made by Olivia.
 * * Feature Update!
 * ** Updated Break Shield icon to no longer be frame dependent in order to
 *    avoid pixel bleeding during zooms. Update made by Olivia.
 * 
 * Version 1.05: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > Mechanics > JS: On Break Stun
 * **** Runs this code when a battler loses all Break Shields.
 * *** Plugin Parameters > UI > Stun Text Color
 * **** Changes the text color used for stun turns left.
 * 
 * Version 1.04: November 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug where a crash would occur if a non-actor type finds its way
 *    into the status window. Fix made by Olivia.
 * 
 * Version 1.03: March 16, 2023
 * * Bug Fixes!
 * ** Notetags from Elements and Status Menu Core for increasing Dealt Element
 *    damage will no longer force a Break Shield reduction when an attack has
 *    an attached element that the enemy is not weak to. Fix made by Arisu.
 * 
 * Version 1.02: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 *
 * Version 1.01: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.00 Official Release Date: April 30, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BreakShields
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Customize the mechanical settings for Break Shields.
 * @default {"BreakShields":"","AffectActors:eval":"true","AffectEnemies:eval":"true","Base:num":"1","Max:num":"99","StunState:num":"13","Animation":"","ReduceAniID:num":"2","StunAniID:num":"15","Weaknesses":"","MinRate:num":"1.05","Reduction:num":"1"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Customize the UI settings for Break Shields.
 * @default {"Icons":"","ShieldIcon:num":"81","StunIcon:num":"6","ShowStunTurns:eval":"false","ProtectIcon:num":"128","FontSize:num":"22","Battlers":"","Actors":"","ActorDisplayIcon:eval":"false","ActorDisplayPosition:str":"bottom center","ActorOffsetX:num":"+0","ActorOffsetY:num":"+8","Enemies":"","EnemyDisplayIcon:eval":"true","EnemyDisplayPosition:str":"bottom center","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+8","NameAttachShieldIcon:eval":"true","AttachShieldOffsetX:num":"+0","AttachShieldOffsetY:num":"+0","BattleStatus":"","BattleStatusDisplayIcons:eval":"true","BattleStatusAutoPosition:eval":"true","BattleStatusOffsetX:num":"+0","BattleStatusOffsetY:num":"+0","MenuStatus":"","MenuStatusBreakShieldIcons:eval":"true"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BreakShields
 * @text Break Shields
 *
 * @param AffectActors:eval
 * @text Affect: Actors?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param AffectEnemies:eval
 * @text Affect: Enemies?
 * @parent BreakShields
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do Break Shields affect actors?
 * @default true
 *
 * @param Base:num
 * @text Base Shield Value
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The starting amount of shields a battler has.
 * Can be altered through notetags.
 * @default 1
 *
 * @param Max:num
 * @text Maximum Shields
 * @parent BreakShields
 * @type number
 * @min 1
 * @desc The maximum amount of shields a battler can have.
 * This is a hard cap.
 * @default 99
 *
 * @param StunState:num
 * @text Stun State ID
 * @parent BreakShields
 * @type state
 * @desc This is the state to be applied when all Break Shields
 * are reduced to 0.
 * @default 13
 *
 * @param OnBreakStunJS:func
 * @text JS: On Break Stun
 * @parent BreakShields
 * @type note
 * @desc Runs this code when a battler loses all Break Shields.
 * user = attacker; target = break stun target
 * @default "// Insert Code Here"
 *
 * @param Animation
 *
 * @param ReduceAniID:num
 * @text Reduce Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Shields are reduced.
 * Requires VisuMZ_0_CoreEngine.
 * @default 2
 *
 * @param StunAniID:num
 * @text Stun Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when Break Stun is achieved.
 * Requires VisuMZ_0_CoreEngine.
 * @default 15
 *
 * @param Weaknesses
 *
 * @param MinRate:num
 * @text Minimum Rate
 * @parent Weaknesses
 * @desc What is the minimum element rate for an attack to be
 * considered striking a weakness?
 * @default 1.05
 *
 * @param Reduction:num
 * @text Default Reduction
 * @parent Weaknesses
 * @type number
 * @min 1
 * @desc Default reduction amount for Break Shields when striking
 * an elemental weakness.
 * @default 1
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param Icons
 *
 * @param ShieldIcon:num
 * @text Break Shield Icon
 * @parent Icons
 * @desc Icon used to represent Break Shields.
 * @default 81
 *
 * @param StunIcon:num
 * @text Stun State Icon
 * @parent Icons
 * @desc Icon used to represent Break Stun if the Break Stun state
 * does NOT have an icon assigned to it.
 * @default 6
 *
 * @param ShowStunTurns:eval
 * @text Show Turns?
 * @parent StunIcon:num
 * @type boolean
 * @on Show Turns
 * @off Hide Turns
 * @desc Show how many turns are remaining with the Break Stun?
 * @default false
 *
 * @param StunTextColor:str
 * @text Stun Text Color
 * @parent StunIcon:num
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ProtectIcon:num
 * @text Protect Icon
 * @parent Icons
 * @desc Icon used to represent Protected Elements.
 * Used for other plugins.
 * @default 128
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Icons
 * @number
 * @min 1
 * @desc What is the font size used to display the turns and
 * Break Shields remaining?
 * @default 22
 *
 * @param Battlers
 * 
 * @param Actors
 * @parent Battlers
 *
 * @param ActorDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the SV_Actor battlers?
 * @default false
 *
 * @param ActorDisplayPosition:str
 * @text Position
 * @parent Actors
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param ActorOffsetX:num
 * @text Offset X
 * @parent Actors
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param ActorOffsetY:num
 * @text Offset Y
 * @parent Actors
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 * 
 * @param Enemies
 * @parent Battlers
 *
 * @param EnemyDisplayIcon:eval
 * @text Show Battler Icon?
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons on the enemy battlers?
 * @default true
 *
 * @param EnemyDisplayPosition:str
 * @text Position
 * @parent Enemies
 * @type combo
 * @option top left
 * @option top center
 * @option top right
 * @option middle left
 * @option middle center
 * @option middle right
 * @option bottom left
 * @option bottom center
 * @option bottom right
 * @desc Where on the battler would you like to place the icon?
 * @default bottom center
 *
 * @param EnemyOffsetX:num
 * @text Offset X
 * @parent Enemies
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param EnemyOffsetY:num
 * @text Offset Y
 * @parent Enemies
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +8
 *
 * @param NameAttachShieldIcon:eval
 * @text Name: Attach Shields
 * @parent Enemies
 * @type boolean
 * @on Attach
 * @off Normal Position
 * @desc Attach the Break Shield icon to the enemy name?
 * Overrides direct attachment. Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param AttachShieldOffsetX:num
 * @text Attach: Offset X
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param AttachShieldOffsetY:num
 * @text Attach: Offset Y
 * @parent NameAttachShieldIcon:eval
 * @desc How much to offset the attached icon's Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param BattleStatus
 * @text Battle Status
 *
 * @param BattleStatusDisplayIcons:eval
 * @text Show Break Shields?
 * @parent BattleStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the Battle Status?
 * @default true
 *
 * @param BattleStatusAutoPosition:eval
 * @text Auto-Position?
 * @parent BattleStatus
 * @type boolean
 * @on Auto-Position
 * @off Manual Position
 * @desc Automatically position the Break Shield icon?
 * If not, it'll position it to the upper left.
 * @default true
 *
 * @param BattleStatusOffsetX:num
 * @text Offset X
 * @parent BattleStatus
 * @desc How much to offset the icon X position by?
 * Negative goes left. Positive goes right.
 * @default +0
 *
 * @param BattleStatusOffsetY:num
 * @text Offset Y
 * @parent BattleStatus
 * @desc How much to offset the icon Y position by?
 * Negative goes up. Positive goes down.
 * @default +0
 * 
 * @param MenuStatus
 * @text Menu Status
 *
 * @param MenuStatusBreakShieldIcons:eval
 * @text Show Break Shields?
 * @parent MenuStatus
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show Break Shield icons in the menu scenes?
 * @default true
 *
 */
//=============================================================================

function _0x2c81(){const _0x11a144=['e\x20Plugin\x20M','ettings','kvrzb','RegExp','ned','NUM','ired\x20plugi','M_WEAKNESS','hieldsDefa','_needRefre','createAtta','oFWRb','_actor','Bkoyc','or_setBatt','IuvnI','baseBreakS','IdWithName','ayIcon','resetBreak','_numberVal','LDS_STUN_A','layBreakSh','ShieldIcon','WeaknessWi','5|4|6|1|3|','Stun','1|0|2|4|3','atusBreakB','deathState','my_setBatt','BaseBreakS','kYVwI','split','QpCpt','Window_Bat','ARRAYFUNC','kRWQB','updateIcon','myName_cre','lue','BreakShiel','erDisplay','EVAL','eePpw','prototype','actor','iconWidth','_autoPosit','Game_Battl','attleCore','kShieldIco','move','kShieldMul','resetFontS','version','427RKmjzH','battleLayo','createInne','xXRxY','590610WJIWNC','BfmWk','iZTRY','parse','HRogd','uriBW','textWidth','BMITu','yPWiC','ZLbbN','eExploited','ageFlat','FontSize','INhNI','ON_NAME','map','ShowFacesL','played','VisuMZ_2_B','BattleStat','getProtect','MenuStatus','lyjhu','LDS_ACTORS','con','addState','eBreakShie','DqzlE','install\x20%2','xAnimation','EITQF','ected','ity','qVbzz','StunIcon','VisuMZ_1_B','n_calcUser','_spriteset','ields','blt','ConvertPar','placeBreak','usOffsetX','eRate','awActorIco','8|6|1|5','_breakStun','VisuMZ_0_C','anchor','d_ShieldIc','FFSET_X','AwNyj','center','tiLayerHpG','sgjyU','test','pGauge','lements','ioning','T_REDUCTIO','ist.\x0aIt\x20is','isAppeared','stbCannotB','amage','nSprite','usAutoPosi','VcdKz','JxsAU','contents','hFDkl','EnemyOffse','IconSet','reorder\x20th','ARRAYNUM','setBreakSh','target','ager.','lay','eFlat','_lineHeigh','tleStatus_','fontSize','serEffect','kKoon','AffectEnem','LDS_BASE','shouldDisp','ShieldBrok','hpLVS','setup','dSprites','thPadding','huAqh','addedBreak','actor%1-br','ndex','agePlus','ldOffsetY','Reduction','rWPAu','myName_upd','ceil','Max','SETTINGS','716331TcpvcD','_ATTACH_OF','Mechanics','DfSbU','d_StunIcon','battler','ndancy','YktyW','BREAK_SHIE','calcUserEl','requestFau','members','push','_subject','LDS_STUN_S','n_applyIte','UwfmL','createBrea','call','ElementDam','duction','#%1','tAfSs','ateAttache','LDS_DISPLA','rrectly\x20pl','LDS_REDUCE','traitObjec','mentRate','currentBre','enemy','usOffsetY','Sprite_Act','\x20%3\x20plugin','ePlus','istStyle','on\x20does\x20no','topBreakSh','item','bGVKK','301824VWWpHl','ldOffsetX','dlUJU','min','leRate','isDead','PkhDA','ActorDispl','n.\x0aPlease\x20','numberFont','includes','\x20a\x20Tier\x20%2','currentCla','Y_AUTO','Base','removeBatt','AffectActo','default','vyxXM','OnBreakStu','descriptio','NameAttach','_battler','_elementID','mjkSl','mSTB','StunTextCo','bwqQJ','Face','CON','eldIconDis','extColor','d_ProtectI','ger_setup','initMember','NIMATION','14VceObb','erBase_ele','setBattler','LDS_MINIMU','fontFace','MinRate','status','oreEngine','ayPosition','0|4|3|2|1','breakStunT','_numberSpr','isEnemy','update','drawActorI','\x20largest\x20t','clamp','getElement','age','LDS_MENU_I','eld','_displayVa','_ANIMATION','trim','loadBitmap','drawText','FSET_Y','note','abled','akShieldRe','_calcRawBr','ShowStunTu','kmBhX','refresh','LD_BATTLER','ProtectIco','d_StunTurn','create','BreakReduc','_iconIndex','nned','ehXwh','339195hlzYaX','ugin\x27s.\x20Pl','usDisplayI','alterBreak','ing\x20a\x20requ','Shields','StunAniID','createNumb','tusBase_dr','Shield','qFflt','e\x20plugin\x20l','Game_Actor','TDMJD','cons','isActor','eiZfr','HaLpb','loadSystem','Sprite_Ene','403184GyDyCM','Y_OFFSET_Y','_currentBr','Sprite','CONS','round','isBreakShi','or_initMem','drawItemSt','itemBreakS','29989MvtZRU','lor','calcElemen','0|2','originalEl','attleSyste','isSceneBat','STRUCT','drawActorB','TATE','BattleLayo','startBreak','ldSprite','HpGauge','hields','ByBreakShi','atus','match','_ATTACH_IC','Elements','_enemy','VhNPq','applyBreak','updateFram','bitmap','itSystemEn','aced\x20over\x20','EjQFu','show','JzUES','FzjcH','MkMUP','executeDam','%1\x20is\x20miss','applyChang','er_removeB','EOqhO','textColor','\x20into\x20the\x20','AlterBreak','dIcons','Position','_resetting','akShieldEl','ceAnimatio','Y_OFFSET_X','gWfjx','18VecmQm','ams','enAnimatio','executeBre','isStateAff','leStates','Compatibil','isBreakStu','fuOhO','LDS_MAX','ementRate','ProtectedE','applyItemU','gZcwH','hieldReduc','ite','_inBattle','FSET_X','onBreakStu','sXKZT','updateAtta','_srcBitmap','zUYTG','contains','elements','Y_ICONS','actorId','lineHeight','XeTcE','LDS_ENEMIE','ease\x20updat','orSMo','qNtzM','Zvvew','attleState','qodpK','_DISPLAY_I','user','breakShiel','ist\x20from\x20s','ARRAYEVAL','OSITION','_lastIconI','JSON','EnemyDispl','Plugin\x20Man','bDknO','tion','isSTB','eakShield','rNMSW','ementDamag','isAffected','_DISPLAY_O','ActorOffse','initialize','PqcDf','OyFiU','gUQbH','bers','ShieldRedu','t\x20match\x20pl','exit','BWSyA','parameters','updateNumb','_scene','3|0|1|4|2','eakShieldE','_enemyId','aced\x20on\x20th','shAllEnemy','_RATE','iconHeight','elementRat','olgob','akShield','Qyaew','_breakShie','addChild','edWeakness','ndows','calcRawBre','MultiLayer','eakShieldI','name','ult','BattleMana','atusBreakS','Settings','55vyVfEf','toUpperCas','findTarget','ReduceAniI','%1\x20is\x20inco','updateBrea','chedSprite','pWxPH','width','floor','26736ZFbitr','auge','UlfsF','constructo','max','ies','gYdYd','iconIndex','getColor','itemRect','opacity','ield','Game_Actio','hield','mUserEffec','format','mpAiW','AttachShie','FoZeE','qwETF','isHpEffect','VisuMZ_4_M','anager.','LDS_DEFAUL','height','FFSET_Y','uLMKX','_DISPLAY_P','wEXaW','tle','nJS','ler'];_0x2c81=function(){return _0x11a144;};return _0x2c81();}const _0xc3c273=_0x3ec0;(function(_0x2132e3,_0x1d889f){const _0x1e8233=_0x3ec0,_0x4c5283=_0x2132e3();while(!![]){try{const _0x446995=parseInt(_0x1e8233(0x16a))/(0x8d*-0x2b+0x259e+-0xdee)*(-parseInt(_0x1e8233(0x30d))/(0x25*-0x67+0x1*-0x18c7+-0x2*-0x13d6))+parseInt(_0x1e8233(0x2c1))/(-0x5a*-0x13+-0x1097*0x1+-0xa*-0xfe)+parseInt(_0x1e8233(0x2e9))/(0x13*0x1c7+-0x1db9+-0x408)+-parseInt(_0x1e8233(0x14c))/(-0x26a4+0x9ee*-0x3+-0x16d1*-0x3)+-parseInt(_0x1e8233(0x1fd))/(0x10d*-0x13+0x29*0x6d+0x288)*(parseInt(_0x1e8233(0x255))/(-0xe7d+0x6*0x3f1+0x491*-0x2))+parseInt(_0x1e8233(0x160))/(0x2d*-0x93+0x2d9*0xa+-0x29b)*(parseInt(_0x1e8233(0x199))/(-0xe7*-0x1+0x1c69+0x5*-0x5db))+-parseInt(_0x1e8233(0x259))/(0x1d31+-0x1*0xaaf+0x2*-0x93c)*(-parseInt(_0x1e8233(0x1f3))/(-0x2382+0x2*0xf3d+0x513));if(_0x446995===_0x1d889f)break;else _0x4c5283['push'](_0x4c5283['shift']());}catch(_0x1ecaca){_0x4c5283['push'](_0x4c5283['shift']());}}}(_0x2c81,-0x4780e+0x366ff+0x38503));function _0x3ec0(_0x2678da,_0x462ed9){const _0x4bc0f1=_0x2c81();return _0x3ec0=function(_0x20b8cd,_0x148b6a){_0x20b8cd=_0x20b8cd-(0x1918+0x81*-0x1c+-0x9cd);let _0x586d5e=_0x4bc0f1[_0x20b8cd];return _0x586d5e;},_0x3ec0(_0x2678da,_0x462ed9);}var label=_0xc3c273(0x246)+'ds',tier=tier||-0x25af*-0x1+-0x1d0*-0x5+-0x2ebf,dependencies=[],pluginData=$plugins['filter'](function(_0xf18ba6){const _0x1e67a2=_0xc3c273,_0x19eb84={'bGVKK':function(_0x266883,_0x212e12){return _0x266883+_0x212e12;}};return _0xf18ba6[_0x1e67a2(0x313)]&&_0xf18ba6[_0x1e67a2(0x2fd)+'n'][_0x1e67a2(0x2f3)](_0x19eb84['bGVKK'](_0x19eb84[_0x1e67a2(0x2e8)]('[',label),']'));})[-0x504+-0x1928+0x1e2c];VisuMZ[label][_0xc3c273(0x1f2)]=VisuMZ[label][_0xc3c273(0x1f2)]||{},VisuMZ[_0xc3c273(0x281)+_0xc3c273(0x19a)]=function(_0xcc722,_0xf33c61){const _0x49c5a0=_0xc3c273,_0x1b6e33={'fuOhO':function(_0x371de6,_0x4e055f){return _0x371de6(_0x4e055f);},'dlUJU':_0x49c5a0(0x222),'eeTDv':function(_0x17fae3,_0x5a707b){return _0x17fae3!==_0x5a707b;},'mvGcu':_0x49c5a0(0x2a2),'Bkoyc':function(_0x3a2d6a,_0x1cd8eb){return _0x3a2d6a!==_0x1cd8eb;},'YJTOs':_0x49c5a0(0x248),'HaLpb':function(_0x3480ee,_0x5ae3ec){return _0x3480ee!==_0x5ae3ec;},'jGpvm':_0x49c5a0(0x1c1),'uriBW':function(_0x120714,_0x416afa){return _0x120714!==_0x416afa;},'iZTRY':_0x49c5a0(0x1c4),'KXlkj':function(_0xfcf501,_0x36d6be){return _0xfcf501!==_0x36d6be;},'qNtzM':'ARRAYJSON','JxsAU':'FUNC','UMUPO':function(_0x55beda,_0x299e72){return _0x55beda!==_0x299e72;},'RcUPG':'return\x200','lyjhu':_0x49c5a0(0x241),'uLMKX':function(_0x249154,_0x46298a){return _0x249154!==_0x46298a;},'INhNI':'STR','woeCT':function(_0x3d8847,_0x40d7a5){return _0x3d8847(_0x40d7a5);},'hFDkl':'ARRAYSTR','eiZfr':function(_0x520204,_0x331bbf){return _0x520204!==_0x331bbf;},'wsnwi':_0x49c5a0(0x171),'pOqoT':function(_0x5acc12,_0x11d890){return _0x5acc12!==_0x11d890;},'sXKZT':'ARRAYSTRUC'+'T','gUQbH':function(_0x134f96,_0x394926){return _0x134f96!==_0x394926;}};for(const _0x4b1cc2 in _0xf33c61){if(_0x4b1cc2['match'](/(.*):(.*)/i)){const _0x5f4779=_0x1b6e33[_0x49c5a0(0x1a1)](String,RegExp['$1']),_0x409799=_0x1b6e33[_0x49c5a0(0x1a1)](String,RegExp['$2'])[_0x49c5a0(0x1f4)+'e']()[_0x49c5a0(0x139)]();let _0x4855c2,_0x186104,_0x5f3de7;switch(_0x409799){case _0x1b6e33[_0x49c5a0(0x2eb)]:_0x4855c2=_0x1b6e33['eeTDv'](_0xf33c61[_0x4b1cc2],'')?_0x1b6e33[_0x49c5a0(0x1a1)](Number,_0xf33c61[_0x4b1cc2]):0x175a+0x2026+-0x3780;break;case _0x1b6e33['mvGcu']:_0x186104=_0x1b6e33[_0x49c5a0(0x22a)](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104[_0x49c5a0(0x268)](_0x502154=>Number(_0x502154));break;case _0x1b6e33['YJTOs']:_0x4855c2=_0x1b6e33[_0x49c5a0(0x15d)](_0xf33c61[_0x4b1cc2],'')?_0x1b6e33[_0x49c5a0(0x1a1)](eval,_0xf33c61[_0x4b1cc2]):null;break;case _0x1b6e33['jGpvm']:_0x186104=_0x1b6e33[_0x49c5a0(0x25e)](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104[_0x49c5a0(0x268)](_0x2a02fd=>eval(_0x2a02fd));break;case _0x1b6e33[_0x49c5a0(0x25b)]:_0x4855c2=_0x1b6e33['KXlkj'](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):'';break;case _0x1b6e33[_0x49c5a0(0x1b9)]:_0x186104=_0x1b6e33[_0x49c5a0(0x15d)](_0xf33c61[_0x4b1cc2],'')?JSON['parse'](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104[_0x49c5a0(0x268)](_0x12ed17=>JSON[_0x49c5a0(0x25c)](_0x12ed17));break;case _0x1b6e33[_0x49c5a0(0x29c)]:_0x4855c2=_0x1b6e33['UMUPO'](_0xf33c61[_0x4b1cc2],'')?new Function(JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2])):new Function(_0x1b6e33['RcUPG']);break;case _0x1b6e33[_0x49c5a0(0x26f)]:_0x186104=_0x1b6e33[_0x49c5a0(0x217)](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104[_0x49c5a0(0x268)](_0x297245=>new Function(JSON[_0x49c5a0(0x25c)](_0x297245)));break;case _0x1b6e33[_0x49c5a0(0x266)]:_0x4855c2=_0x1b6e33[_0x49c5a0(0x15d)](_0xf33c61[_0x4b1cc2],'')?_0x1b6e33['woeCT'](String,_0xf33c61[_0x4b1cc2]):'';break;case _0x1b6e33[_0x49c5a0(0x29e)]:_0x186104=_0x1b6e33[_0x49c5a0(0x15c)](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104['map'](_0xbafddd=>String(_0xbafddd));break;case _0x1b6e33['wsnwi']:_0x5f3de7=_0x1b6e33['pOqoT'](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):{},_0x4855c2=VisuMZ[_0x49c5a0(0x281)+_0x49c5a0(0x19a)]({},_0x5f3de7);break;case _0x1b6e33[_0x49c5a0(0x1ac)]:_0x186104=_0x1b6e33[_0x49c5a0(0x1d3)](_0xf33c61[_0x4b1cc2],'')?JSON[_0x49c5a0(0x25c)](_0xf33c61[_0x4b1cc2]):[],_0x4855c2=_0x186104[_0x49c5a0(0x268)](_0x501c2b=>VisuMZ[_0x49c5a0(0x281)+_0x49c5a0(0x19a)]({},JSON[_0x49c5a0(0x25c)](_0x501c2b)));break;default:continue;}_0xcc722[_0x5f4779]=_0x4855c2;}}return _0xcc722;},(_0x403b64=>{const _0x53eebf=_0xc3c273,_0x310f32={'zUYTG':function(_0x5c062b,_0x5584d5){return _0x5c062b(_0x5584d5);},'XsRYl':_0x53eebf(0x18b)+_0x53eebf(0x150)+_0x53eebf(0x223)+_0x53eebf(0x2f1)+_0x53eebf(0x275)+_0x53eebf(0x190)+_0x53eebf(0x1c6)+_0x53eebf(0x2a5),'FzjcH':function(_0x1b6106,_0x4e022c){return _0x1b6106!==_0x4e022c;},'UwfmL':function(_0x1b144e,_0x28e582){return _0x1b144e(_0x28e582);},'PqcDf':'%1\x27s\x20versi'+_0x53eebf(0x2e5)+_0x53eebf(0x1d6)+_0x53eebf(0x14d)+_0x53eebf(0x1b7)+'e\x20it\x20in\x20th'+_0x53eebf(0x21d)+_0x53eebf(0x213),'huAqh':function(_0x3d101e,_0x17ea95){return _0x3d101e(_0x17ea95);},'iuptA':function(_0x5759ad,_0x6ee7b4){return _0x5759ad<_0x6ee7b4;},'xXRxY':_0x53eebf(0x1f7)+_0x53eebf(0x2da)+_0x53eebf(0x1df)+_0x53eebf(0x157)+_0x53eebf(0x295)+_0x53eebf(0x2f4)+'\x20plugin\x20pl'+_0x53eebf(0x184)+'other\x20Tier'+_0x53eebf(0x2e2)+'s.\x0aPlease\x20'+_0x53eebf(0x2a1)+'e\x20plugin\x20l'+_0x53eebf(0x1c0)+'mallest\x20to'+_0x53eebf(0x131)+'ier\x20number'+'s.'},_0x930ea3=_0x403b64[_0x53eebf(0x1ee)];for(const _0x23f930 of dependencies){if(!Imported[_0x23f930]){_0x310f32[_0x53eebf(0x1af)](alert,_0x310f32['XsRYl'][_0x53eebf(0x20c)](_0x930ea3,_0x23f930)),SceneManager[_0x53eebf(0x1d7)]();break;}}const _0x1f325a=_0x403b64[_0x53eebf(0x2fd)+'n'];if(_0x1f325a['match'](/\[Version[ ](.*?)\]/i)){const _0x4ad379=_0x310f32['zUYTG'](Number,RegExp['$1']);_0x310f32[_0x53eebf(0x188)](_0x4ad379,VisuMZ[label][_0x53eebf(0x254)])&&(_0x310f32[_0x53eebf(0x2d1)](alert,_0x310f32[_0x53eebf(0x1d1)][_0x53eebf(0x20c)](_0x930ea3,_0x4ad379)),SceneManager[_0x53eebf(0x1d7)]());}if(_0x1f325a[_0x53eebf(0x17b)](/\[Tier[ ](\d+)\]/i)){const _0x52334b=_0x310f32[_0x53eebf(0x2b5)](Number,RegExp['$1']);_0x310f32['iuptA'](_0x52334b,tier)?(_0x310f32[_0x53eebf(0x1af)](alert,_0x310f32[_0x53eebf(0x258)][_0x53eebf(0x20c)](_0x930ea3,_0x52334b,tier)),SceneManager[_0x53eebf(0x1d7)]()):tier=Math[_0x53eebf(0x201)](_0x52334b,tier);}VisuMZ[_0x53eebf(0x281)+_0x53eebf(0x19a)](VisuMZ[label][_0x53eebf(0x1f2)],_0x403b64[_0x53eebf(0x1d9)]);})(pluginData),VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x220)]={'BreakReduce':/<BREAK (?:REDUCE|REDUCTION):[ ](\d+)>/i,'SetBreakShield':/<(?:SET|CHANGE) BREAK (?:SHIELD|SHIELDS): (\d+)>/i,'AlterBreakShield':/<(?:INCREASE|DECREASE|ALTER) BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'ProtectedElements':/<PROTECT (?:ELEMENT|ELEMENTS):[ ](.*)>/i,'AddedBreakShields':/<BREAK (?:SHIELD|SHIELDS): ([\+\-]\d+)>/i,'BaseBreakShields':/<BREAK (?:SHIELD|SHIELDS): (\d+)>/i},DataManager[_0xc3c273(0x133)+_0xc3c273(0x22e)]=function(_0x2a132b){const _0x2159d3=_0xc3c273;_0x2a132b=_0x2a132b[_0x2159d3(0x1f4)+'e']()[_0x2159d3(0x139)](),this[_0x2159d3(0x300)+'s']=this[_0x2159d3(0x300)+'s']||{};if(this[_0x2159d3(0x300)+'s'][_0x2a132b])return this['_elementID'+'s'][_0x2a132b];let _0x2ae5b0=0x2a3+0x1f4*-0xb+0x12da;for(const _0x1360d4 of $dataSystem[_0x2159d3(0x1b1)]){if(!_0x1360d4)continue;let _0x18ee76=_0x1360d4[_0x2159d3(0x1f4)+'e']();_0x18ee76=_0x18ee76['replace'](/\x1I\[(\d+)\]/gi,''),_0x18ee76=_0x18ee76['replace'](/\\I\[(\d+)\]/gi,''),this[_0x2159d3(0x300)+'s'][_0x18ee76]=_0x2ae5b0,_0x2ae5b0++;}return this[_0x2159d3(0x300)+'s'][_0x2a132b]||0x1e8f*-0x1+-0x73c*0x3+0x3443;},ImageManager[_0xc3c273(0x1bf)+_0xc3c273(0x28a)+'on']=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x234)],ImageManager[_0xc3c273(0x1bf)+_0xc3c273(0x2c5)]=VisuMZ[_0xc3c273(0x246)+'ds']['Settings']['UI'][_0xc3c273(0x27b)],ImageManager[_0xc3c273(0x1bf)+_0xc3c273(0x146)+'s']=VisuMZ[_0xc3c273(0x246)+'ds']['Settings']['UI'][_0xc3c273(0x141)+'rns'],ImageManager[_0xc3c273(0x1bf)+_0xc3c273(0x309)+_0xc3c273(0x271)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x145)+'n'],ColorManager[_0xc3c273(0x205)]=function(_0x21b8bd){const _0x5dd7d9=_0xc3c273,_0x285a55={'EITQF':function(_0x4abff8,_0x45cdfd){return _0x4abff8(_0x45cdfd);},'bwqQJ':_0x5dd7d9(0x2d6),'gYdYd':function(_0x5f4985,_0x522a80){return _0x5f4985(_0x522a80);}};return _0x21b8bd=_0x285a55[_0x5dd7d9(0x277)](String,_0x21b8bd),_0x21b8bd[_0x5dd7d9(0x17b)](/#(.*)/i)?_0x285a55[_0x5dd7d9(0x304)][_0x5dd7d9(0x20c)](_0x285a55[_0x5dd7d9(0x203)](String,RegExp['$1'])):this['textColor'](_0x285a55[_0x5dd7d9(0x203)](Number,_0x21b8bd));},SceneManager[_0xc3c273(0x170)+_0xc3c273(0x21a)]=function(){const _0x385f6b=_0xc3c273,_0x252ed0={'kYVwI':function(_0x93673e,_0x1c7ac8){return _0x93673e===_0x1c7ac8;}};return this[_0x385f6b(0x1db)]&&_0x252ed0[_0x385f6b(0x23d)](this[_0x385f6b(0x1db)][_0x385f6b(0x200)+'r'],Scene_Battle);},VisuMZ[_0xc3c273(0x246)+'ds']['BattleMana'+_0xc3c273(0x30a)]=BattleManager[_0xc3c273(0x2b2)],BattleManager[_0xc3c273(0x2b2)]=function(_0x806ff6,_0x315be5,_0x2a3c96){const _0x52584a=_0xc3c273;VisuMZ[_0x52584a(0x246)+'ds'][_0x52584a(0x1f0)+_0x52584a(0x30a)][_0x52584a(0x2d3)](this,_0x806ff6,_0x315be5,_0x2a3c96),$gameParty[_0x52584a(0x230)+_0x52584a(0x151)](),$gameTroop[_0x52584a(0x230)+'Shields']();},Game_Action[_0xc3c273(0x2c9)+_0xc3c273(0x310)+'M_WEAKNESS'+'_RATE']=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)][_0xc3c273(0x312)],Game_Action[_0xc3c273(0x2c9)+_0xc3c273(0x214)+_0xc3c273(0x294)+'N']=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)][_0xc3c273(0x2bb)],VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x209)+'n_executeD'+_0xc3c273(0x298)]=Game_Action['prototype']['executeDam'+_0xc3c273(0x134)],Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x18a)+'age']=function(_0x4faee4,_0x280d0b){const _0x3f962c=_0xc3c273,_0x48e99f={'PUKho':function(_0x5071b2,_0x430ed3){return _0x5071b2>_0x430ed3;}};VisuMZ[_0x3f962c(0x246)+'ds'][_0x3f962c(0x209)+'n_executeD'+_0x3f962c(0x298)][_0x3f962c(0x2d3)](this,_0x4faee4,_0x280d0b),!!_0x4faee4&&_0x48e99f['PUKho'](_0x280d0b,0x1*-0xd97+-0x61*-0x61+-0x172a)&&_0x4faee4[_0x3f962c(0x1cd)+_0x3f962c(0x179)+'eld']()&&this[_0x3f962c(0x211)]()&&this[_0x3f962c(0x19c)+_0x3f962c(0x13f)+_0x3f962c(0x2d5)](_0x4faee4,_0x280d0b);},Game_Action['prototype'][_0xc3c273(0x19c)+_0xc3c273(0x13f)+_0xc3c273(0x2d5)]=function(_0x2b39ee,_0x5cc9e3){const _0xa0feae=_0xc3c273,_0x46a563={'oFWRb':function(_0x2c7c2f,_0x2e345e){return _0x2c7c2f>=_0x2e345e;},'TDMJD':function(_0x5e9270,_0x128d1c){return _0x5e9270*_0x128d1c;}};if(!_0x2b39ee['isBreakStu'+_0xa0feae(0x14a)]()){var _0x1f393d=this[_0xa0feae(0x1eb)+_0xa0feae(0x195)+_0xa0feae(0x1a3)](_0x2b39ee);if(_0x46a563[_0xa0feae(0x228)](_0x1f393d,Game_Action[_0xa0feae(0x2c9)+'LDS_MINIMU'+_0xa0feae(0x224)+_0xa0feae(0x1e1)])){var _0x5cc9e3=_0x46a563[_0xa0feae(0x159)](-(0x235f*-0x1+0x1afb*0x1+-0x1*-0x865),this[_0xa0feae(0x169)+'hieldReduc'+_0xa0feae(0x1c8)]());_0x2b39ee[_0xa0feae(0x175)+'ShieldRedu'+_0xa0feae(0x196)+'n'](),_0x2b39ee['alterBreak'+_0xa0feae(0x155)](_0x5cc9e3);}}},Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x1eb)+'akShieldEl'+'ementRate']=function(_0x5bb894){const _0x51a275=_0xc3c273;this[_0x51a275(0x140)+_0x51a275(0x1dd)+'leRate']=!![];const _0x27a517=this[_0x51a275(0x16c)+'tRate'](_0x5bb894);return this[_0x51a275(0x140)+'eakShieldE'+'leRate']=undefined,_0x27a517;},VisuMZ[_0xc3c273(0x246)+'ds']['Game_Actio'+_0xc3c273(0x27d)+_0xc3c273(0x2d4)+_0xc3c273(0x2b9)]=Game_Action['prototype']['calcUserEl'+_0xc3c273(0x1cc)+_0xc3c273(0x2e3)],Game_Action['prototype'][_0xc3c273(0x2ca)+_0xc3c273(0x1cc)+_0xc3c273(0x2e3)]=function(_0x322374,_0x31a70b){const _0x42eb2c=_0xc3c273;if(this['_calcRawBr'+'eakShieldE'+'leRate'])return 0x167*-0x2+0x1*-0x25ce+-0x289c*-0x1;return VisuMZ['BreakShiel'+'ds'][_0x42eb2c(0x209)+'n_calcUser'+_0x42eb2c(0x2d4)+'agePlus'][_0x42eb2c(0x2d3)](this,_0x322374,_0x31a70b);},VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x209)+_0xc3c273(0x27d)+_0xc3c273(0x2d4)+'ageRate']=Game_Action['prototype']['calcUserEl'+'ementDamag'+'eRate'],Game_Action[_0xc3c273(0x24a)]['calcUserEl'+'ementDamag'+_0xc3c273(0x284)]=function(_0x4b28b7,_0xf6603e){const _0x2b32a2=_0xc3c273;if(this[_0x2b32a2(0x140)+_0x2b32a2(0x1dd)+_0x2b32a2(0x2ed)])return-0x92b+0x1*0x14ea+-0xa7*0x12;return VisuMZ[_0x2b32a2(0x246)+'ds'][_0x2b32a2(0x209)+_0x2b32a2(0x27d)+'ElementDam'+'ageRate'][_0x2b32a2(0x2d3)](this,_0x4b28b7,_0xf6603e);},VisuMZ[_0xc3c273(0x246)+'ds']['Game_Actio'+'n_calcUser'+_0xc3c273(0x2d4)+'ageFlat']=Game_Action[_0xc3c273(0x24a)]['calcUserEl'+_0xc3c273(0x1cc)+'eFlat'],Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x2ca)+'ementDamag'+_0xc3c273(0x2a7)]=function(_0x39e923,_0x2dd69b){const _0x5bafbb=_0xc3c273;if(this[_0x5bafbb(0x140)+_0x5bafbb(0x1dd)+_0x5bafbb(0x2ed)])return 0x40c+0x173a*-0x1+0x132e;return VisuMZ[_0x5bafbb(0x246)+'ds'][_0x5bafbb(0x209)+_0x5bafbb(0x27d)+_0x5bafbb(0x2d4)+_0x5bafbb(0x264)][_0x5bafbb(0x2d3)](this,_0x39e923,_0x2dd69b);},Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x169)+_0xc3c273(0x1a7)+_0xc3c273(0x1c8)]=function(){const _0xea3b6a=_0xc3c273,_0x472b54={'FoZeE':function(_0x92521c,_0xa00868){return _0x92521c(_0xa00868);}},_0x56f0bc=VisuMZ[_0xea3b6a(0x246)+'ds'][_0xea3b6a(0x220)];return this[_0xea3b6a(0x2e7)]()[_0xea3b6a(0x13d)][_0xea3b6a(0x17b)](_0x56f0bc[_0xea3b6a(0x148)+'e'])?_0x472b54[_0xea3b6a(0x20f)](parseInt,RegExp['$1']):Game_Action[_0xea3b6a(0x2c9)+_0xea3b6a(0x214)+_0xea3b6a(0x294)+'N'];},VisuMZ[_0xc3c273(0x246)+'ds']['Game_Actio'+_0xc3c273(0x2d0)+'mUserEffec'+'t']=Game_Action[_0xc3c273(0x24a)]['applyItemU'+_0xc3c273(0x2ab)],Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x1a5)+'serEffect']=function(_0x58bb88){const _0x36dae6=_0xc3c273;VisuMZ['BreakShiel'+'ds']['Game_Actio'+'n_applyIte'+_0x36dae6(0x20b)+'t'][_0x36dae6(0x2d3)](this,_0x58bb88),!!_0x58bb88&&_0x58bb88['isAffected'+_0x36dae6(0x179)+_0x36dae6(0x136)]()&&this[_0x36dae6(0x18c)+_0x36dae6(0x273)+'ld'](_0x58bb88);},Game_Action[_0xc3c273(0x24a)][_0xc3c273(0x18c)+'eBreakShie'+'ld']=function(_0x37ee62){const _0x3a1202=_0xc3c273,_0x47ed76={'DqzlE':function(_0x5046bc,_0x556f90){return _0x5046bc(_0x556f90);}};if(!_0x37ee62[_0x3a1202(0x1a0)+'nned']()){const _0x300d52=VisuMZ[_0x3a1202(0x246)+'ds'][_0x3a1202(0x220)];this['item']()[_0x3a1202(0x13d)]['match'](_0x300d52['SetBreakSh'+_0x3a1202(0x208)])&&(_0x37ee62[_0x3a1202(0x2a3)+'ield'](_0x47ed76[_0x3a1202(0x274)](parseInt,RegExp['$1'])),$gameTemp[_0x3a1202(0x226)+_0x3a1202(0x1e0)+_0x3a1202(0x235)+_0x3a1202(0x1ea)]=!![]),this[_0x3a1202(0x2e7)]()[_0x3a1202(0x13d)]['match'](_0x300d52[_0x3a1202(0x191)+'Shield'])&&(_0x37ee62[_0x3a1202(0x14f)+_0x3a1202(0x155)](_0x47ed76[_0x3a1202(0x274)](parseInt,RegExp['$1'])),$gameTemp[_0x3a1202(0x226)+'shAllEnemy'+_0x3a1202(0x235)+_0x3a1202(0x1ea)]=!![]);}},VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x24e)+_0xc3c273(0x30e)+'mentRate']=Game_BattlerBase[_0xc3c273(0x24a)][_0xc3c273(0x1e3)+'e'],Game_BattlerBase[_0xc3c273(0x24a)][_0xc3c273(0x1e3)+'e']=function(_0x1ecbd6){const _0x45e2b2=_0xc3c273;var _0x4f9134=VisuMZ[_0x45e2b2(0x246)+'ds'][_0x45e2b2(0x24e)+_0x45e2b2(0x30e)+_0x45e2b2(0x2dd)][_0x45e2b2(0x2d3)](this,_0x1ecbd6);return this['getProtect'+_0x45e2b2(0x1e9)+_0x45e2b2(0x17d)]()[_0x45e2b2(0x1b0)](_0x1ecbd6)?Math[_0x45e2b2(0x2ec)](-0x80b*0x1+0x135e+-0xb52,_0x4f9134):_0x4f9134;},Game_BattlerBase['prototype'][_0xc3c273(0x16e)+_0xc3c273(0x1a3)]=function(_0x39a1b9){const _0x5e3120=_0xc3c273;return VisuMZ['BreakShiel'+'ds'][_0x5e3120(0x24e)+'erBase_ele'+'mentRate'][_0x5e3120(0x2d3)](this,_0x39a1b9);},Game_Battler[_0xc3c273(0x2c9)+_0xc3c273(0x2ae)]=VisuMZ[_0xc3c273(0x246)+'ds']['Settings'][_0xc3c273(0x2c3)][_0xc3c273(0x2f7)],Game_Battler[_0xc3c273(0x2c9)+_0xc3c273(0x1a2)]=VisuMZ['BreakShiel'+'ds']['Settings'][_0xc3c273(0x2c3)][_0xc3c273(0x2bf)],Game_Battler['BREAK_SHIE'+_0xc3c273(0x2cf)+_0xc3c273(0x173)]=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)]['StunState'],Game_Battler['BREAK_SHIE'+_0xc3c273(0x2db)+_0xc3c273(0x138)]=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['Mechanics'][_0xc3c273(0x1f6)+'D'],Game_Battler['BREAK_SHIE'+_0xc3c273(0x232)+_0xc3c273(0x30c)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)][_0xc3c273(0x152)],Game_Battler['BREAK_SHIE'+_0xc3c273(0x270)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)][_0xc3c273(0x2f9)+'rs'],Game_Battler[_0xc3c273(0x2c9)+_0xc3c273(0x1b6)+'S']=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)][_0xc3c273(0x2c3)][_0xc3c273(0x2ad)+_0xc3c273(0x202)],VisuMZ[_0xc3c273(0x246)+'ds']['Game_Battl'+_0xc3c273(0x18d)+_0xc3c273(0x1bb)+'s']=Game_Battler['prototype'][_0xc3c273(0x2f8)+_0xc3c273(0x19e)],Game_Battler['prototype'][_0xc3c273(0x2f8)+_0xc3c273(0x19e)]=function(){const _0x2c57bb=_0xc3c273;VisuMZ[_0x2c57bb(0x246)+'ds'][_0x2c57bb(0x24e)+_0x2c57bb(0x18d)+_0x2c57bb(0x1bb)+'s']['call'](this),this['resetBreak'+_0x2c57bb(0x155)]();},Game_Battler['prototype'][_0xc3c273(0x1cd)+_0xc3c273(0x179)+_0xc3c273(0x136)]=function(){return![];},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x230)+_0xc3c273(0x155)]=function(){const _0x29b352=_0xc3c273;this[_0x29b352(0x1cd)+'ByBreakShi'+_0x29b352(0x136)]()&&this[_0x29b352(0x2a3)+_0x29b352(0x208)](this['topBreakSh'+'ield']());},Game_Battler['prototype'][_0xc3c273(0x22d)+_0xc3c273(0x20a)]=function(){return Game_Battler['BREAK_SHIE'+'LDS_BASE'];},Game_Battler['prototype'][_0xc3c273(0x2e6)+_0xc3c273(0x208)]=function(){const _0x307d89=_0xc3c273;var _0x3c2bd8=this['baseBreakS'+'hield']();return _0x3c2bd8=this['addedBreak'+_0x307d89(0x151)](_0x3c2bd8),_0x3c2bd8['clamp'](-0xfe+-0xcdc*-0x3+-0x2595,Game_Battler[_0x307d89(0x2c9)+'LDS_MAX']);},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x2b6)+_0xc3c273(0x151)]=function(_0x4b1f0f){const _0x4d6052=_0xc3c273,_0x4a0711={'qodpK':function(_0x40978f,_0x24ab9f){return _0x40978f(_0x24ab9f);}},_0xd085b3=VisuMZ[_0x4d6052(0x246)+'ds'][_0x4d6052(0x220)];for(const _0x22147f of this['traitObjec'+'ts']()){if(!_0x22147f)continue;_0x22147f[_0x4d6052(0x13d)]['match'](_0xd085b3['AddedBreak'+'Shields'])&&(_0x4b1f0f+=_0x4a0711[_0x4d6052(0x1bc)](Number,RegExp['$1'])||0x13c5+0x2c5*-0x5+-0x5ec);}return _0x4b1f0f;},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x2de)+_0xc3c273(0x1e5)]=function(){const _0x36ad3d=_0xc3c273,_0x58a5d1={'gWfjx':function(_0x11ad2d,_0x43a7e1){return _0x11ad2d===_0x43a7e1;}};return _0x58a5d1[_0x36ad3d(0x198)](this[_0x36ad3d(0x162)+'eakShield'],undefined)&&this[_0x36ad3d(0x2a3)+_0x36ad3d(0x208)](this[_0x36ad3d(0x2e6)+_0x36ad3d(0x208)]()),this[_0x36ad3d(0x162)+_0x36ad3d(0x1ca)];},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x2a3)+_0xc3c273(0x208)]=function(_0x5d0481){const _0x578aee=_0xc3c273,_0x35ed7a={'ZhmAD':function(_0x54d8fe,_0x402fd7){return _0x54d8fe<=_0x402fd7;}};this[_0x578aee(0x1cd)+_0x578aee(0x179)+_0x578aee(0x136)]()&&(this[_0x578aee(0x162)+_0x578aee(0x1ca)]=Math['ceil'](_0x5d0481),this[_0x578aee(0x162)+_0x578aee(0x1ca)]=this[_0x578aee(0x162)+_0x578aee(0x1ca)][_0x578aee(0x132)](0x4a*-0x86+-0x23dc+-0xf8*-0x4d,Game_Battler['BREAK_SHIE'+_0x578aee(0x1a2)]),_0x35ed7a['ZhmAD'](this[_0x578aee(0x162)+_0x578aee(0x1ca)],0xb5d*0x1+0xfbc+-0x7*0x3df)&&this[_0x578aee(0x180)+_0x578aee(0x237)](),this['refresh']());},Game_Battler[_0xc3c273(0x24a)]['alterBreak'+_0xc3c273(0x155)]=function(_0x5a31c0){const _0x1e8681=_0xc3c273,_0x177313={'BWSyA':function(_0x2f0d60,_0x15e504){return _0x2f0d60+_0x15e504;}};this[_0x1e8681(0x2a3)+_0x1e8681(0x208)](_0x177313[_0x1e8681(0x1d8)](this[_0x1e8681(0x2de)+'akShield'](),_0x5a31c0));},Game_Battler['prototype'][_0xc3c273(0x180)+_0xc3c273(0x237)]=function(){const _0x23f9c2=_0xc3c273,_0x43cb22={'kKoon':_0x23f9c2(0x238)},_0x4121bc=_0x43cb22[_0x23f9c2(0x2ac)][_0x23f9c2(0x23e)]('|');let _0xe0c3cb=0x1d51+0x179*-0x1+-0x1bd8;while(!![]){switch(_0x4121bc[_0xe0c3cb++]){case'0':var _0x3829b1=Game_Battler[_0x23f9c2(0x2c9)+_0x23f9c2(0x2cf)+_0x23f9c2(0x173)];continue;case'1':this['setBreakSh'+_0x23f9c2(0x208)](this['topBreakSh'+'ield']());continue;case'2':this[_0x23f9c2(0x272)](_0x3829b1);continue;case'3':this[_0x23f9c2(0x1ab)+_0x23f9c2(0x21b)]();continue;case'4':this[_0x23f9c2(0x175)+_0x23f9c2(0x2b0)+_0x23f9c2(0x19b)+'n']();continue;}break;}},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x1a0)+_0xc3c273(0x14a)]=function(){const _0x1750a8=_0xc3c273;return this[_0x1750a8(0x19d)+_0x1750a8(0x278)](Game_Battler['BREAK_SHIE'+_0x1750a8(0x2cf)+_0x1750a8(0x173)]);},Game_Battler[_0xc3c273(0x24a)]['startBreak'+_0xc3c273(0x1d5)+_0xc3c273(0x196)+'n']=function(){const _0x3a9841=_0xc3c273;if(Imported[_0x3a9841(0x288)+_0x3a9841(0x314)]&&Game_Battler[_0x3a9841(0x2c9)+'LDS_REDUCE'+_0x3a9841(0x138)]){var _0x163947=Game_Battler[_0x3a9841(0x2c9)+_0x3a9841(0x2db)+'_ANIMATION'];$gameTemp[_0x3a9841(0x2cb)+_0x3a9841(0x276)]([this],_0x163947,![],![]);}},Game_Battler[_0xc3c273(0x24a)]['startBreak'+_0xc3c273(0x2b0)+'enAnimatio'+'n']=function(){const _0xb7a3fe=_0xc3c273;if(Imported[_0xb7a3fe(0x288)+_0xb7a3fe(0x314)]&&Game_Battler['BREAK_SHIE'+_0xb7a3fe(0x232)+_0xb7a3fe(0x30c)]){var _0x21e64f=Game_Battler['BREAK_SHIE'+_0xb7a3fe(0x232)+_0xb7a3fe(0x30c)];$gameTemp[_0xb7a3fe(0x2cb)+_0xb7a3fe(0x276)]([this],_0x21e64f,![],![]);}},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x1ab)+_0xc3c273(0x21b)]=function(){const _0x759ef7=_0xc3c273,_0x40fb50={'ExXMm':'7|4|0|2|3|'+_0x759ef7(0x286),'Zvvew':_0x759ef7(0x2a4),'AwNyj':_0x759ef7(0x1be)},_0x1188b5=_0x40fb50['ExXMm']['split']('|');let _0x2d2c87=-0x259f+0x1*-0x1e99+0x4438*0x1;while(!![]){switch(_0x1188b5[_0x2d2c87++]){case'0':window['a']=BattleManager[_0x759ef7(0x2ce)];continue;case'1':window['a']=undefined;continue;case'2':window['b']=this;continue;case'3':VisuMZ[_0x759ef7(0x246)+'ds']['Settings']['Mechanics'][_0x759ef7(0x2fc)+'nJS']&&VisuMZ[_0x759ef7(0x246)+'ds'][_0x759ef7(0x1f2)][_0x759ef7(0x2c3)]['OnBreakStu'+_0x759ef7(0x21b)]['call'](this);continue;case'4':window[_0x40fb50[_0x759ef7(0x1ba)]]=BattleManager['_subject'];continue;case'5':window['b']=undefined;continue;case'6':window[_0x40fb50[_0x759ef7(0x1ba)]]=undefined;continue;case'7':window[_0x40fb50[_0x759ef7(0x28c)]]=BattleManager['_subject'];continue;case'8':window[_0x40fb50[_0x759ef7(0x28c)]]=undefined;continue;}break;}},Game_Battler[_0xc3c273(0x24a)][_0xc3c273(0x26d)+_0xc3c273(0x1e9)+_0xc3c273(0x17d)]=function(){const _0x3ba5de=_0xc3c273,_0x2ace2b={'BMITu':function(_0x30dfef,_0x34b364){return _0x30dfef-_0x34b364;},'qwETF':function(_0x4dc309,_0x419213){return _0x4dc309(_0x419213);}},_0x283b54=VisuMZ[_0x3ba5de(0x246)+'ds']['RegExp'];let _0x36ee83=[];for(const _0x229f5f of this[_0x3ba5de(0x2dc)+'ts']()){if(!_0x229f5f)continue;if(_0x229f5f[_0x3ba5de(0x13d)][_0x3ba5de(0x17b)](_0x283b54[_0x3ba5de(0x1a4)+_0x3ba5de(0x292)])){const _0x401423=RegExp['$1'][_0x3ba5de(0x23e)](',')[_0x3ba5de(0x268)](_0x50cb04=>_0x50cb04[_0x3ba5de(0x139)]());for(const _0x382943 of _0x401423){const _0x2a60da=/^\d+$/[_0x3ba5de(0x290)](_0x382943);if(_0x2a60da)_0x36ee83[_0x3ba5de(0x2cd)](_0x2ace2b[_0x3ba5de(0x210)](Number,_0x382943));else{const _0x212cf9=DataManager['getElement'+_0x3ba5de(0x22e)](_0x382943);if(_0x212cf9)_0x36ee83[_0x3ba5de(0x2cd)](_0x212cf9);}}}}return _0x36ee83['sort'](function(_0x28d8c6,_0x1a0284){const _0x39346a=_0x3ba5de;return _0x2ace2b[_0x39346a(0x260)](_0x28d8c6,_0x1a0284);}),_0x36ee83;},Game_Actor[_0xc3c273(0x24a)][_0xc3c273(0x1cd)+_0xc3c273(0x179)+_0xc3c273(0x136)]=function(){const _0x30348d=_0xc3c273;if(Imported[_0x30348d(0x26b)+_0x30348d(0x16f)+_0x30348d(0x302)]&&BattleManager['isSTB']()&&BattleManager['isSTBExplo'+_0x30348d(0x183)+'abled']())return this[_0x30348d(0x297)+_0x30348d(0x263)]()?!![]:![];return Game_Battler[_0x30348d(0x2c9)+'LDS_ACTORS'];},Game_Actor['prototype'][_0xc3c273(0x22d)+_0xc3c273(0x20a)]=function(){const _0x5bef1d=_0xc3c273,_0x59a753={'OyFiU':function(_0x47469a,_0x471a03){return _0x47469a(_0x471a03);}},_0x57ab41=VisuMZ[_0x5bef1d(0x246)+'ds']['RegExp'];let _0x110cc4=Game_Battler[_0x5bef1d(0x24a)][_0x5bef1d(0x22d)+'hield'][_0x5bef1d(0x2d3)](this);if(!!this[_0x5bef1d(0x2f5)+'ss']()&&this[_0x5bef1d(0x2f5)+'ss']()['note'][_0x5bef1d(0x17b)](_0x57ab41[_0x5bef1d(0x23c)+_0x5bef1d(0x178)]))_0x110cc4=_0x59a753[_0x5bef1d(0x1d2)](parseInt,RegExp['$1']);else this['actor']()&&this[_0x5bef1d(0x24b)]()[_0x5bef1d(0x13d)]['match'](_0x57ab41['BaseBreakS'+_0x5bef1d(0x178)])&&(_0x110cc4=_0x59a753['OyFiU'](parseInt,RegExp['$1']));return Math[_0x5bef1d(0x201)](0x2a5*-0x1+0x382*0x1+0xdc*-0x1,_0x110cc4);},VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x158)+'_refresh']=Game_Actor[_0xc3c273(0x24a)][_0xc3c273(0x143)],Game_Actor[_0xc3c273(0x24a)][_0xc3c273(0x143)]=function(){const _0x227066=_0xc3c273;VisuMZ[_0x227066(0x246)+'ds'][_0x227066(0x158)+'_refresh']['call'](this),!$gameParty['inBattle']()&&!this[_0x227066(0x194)+_0x227066(0x246)+'d']&&(this[_0x227066(0x194)+_0x227066(0x246)+'d']=!![],this['resetBreak'+_0x227066(0x155)](),this['_resetting'+_0x227066(0x246)+'d']=undefined);},Game_Enemy['prototype'][_0xc3c273(0x1cd)+_0xc3c273(0x179)+'eld']=function(){const _0x304cfa=_0xc3c273;if(Imported[_0x304cfa(0x26b)+'attleSyste'+_0x304cfa(0x302)]&&BattleManager[_0x304cfa(0x1c9)]()&&BattleManager['isSTBExplo'+_0x304cfa(0x183)+_0x304cfa(0x13e)]())return this[_0x304cfa(0x297)+_0x304cfa(0x263)]()?!![]:![];return Game_Battler['BREAK_SHIE'+_0x304cfa(0x1b6)+'S'];},Game_Enemy[_0xc3c273(0x24a)][_0xc3c273(0x22d)+_0xc3c273(0x20a)]=function(){const _0x1326a0=_0xc3c273,_0x17896a={'YktyW':function(_0x57381f,_0x1cde09){return _0x57381f(_0x1cde09);}},_0x3331f3=VisuMZ[_0x1326a0(0x246)+'ds'][_0x1326a0(0x220)];let _0x4b3154=Game_Battler[_0x1326a0(0x24a)]['baseBreakS'+_0x1326a0(0x20a)][_0x1326a0(0x2d3)](this);return this[_0x1326a0(0x2df)]()&&this[_0x1326a0(0x2df)]()[_0x1326a0(0x13d)][_0x1326a0(0x17b)](_0x3331f3['BaseBreakS'+_0x1326a0(0x178)])&&(_0x4b3154=_0x17896a[_0x1326a0(0x2c8)](parseInt,RegExp['$1'])),Math[_0x1326a0(0x201)](0x7b*-0x15+-0x1*0xbc0+0x15d8,_0x4b3154);},Game_Unit[_0xc3c273(0x24a)][_0xc3c273(0x230)+_0xc3c273(0x151)]=function(){const _0x31bf8d=_0xc3c273;var _0x39f4ad=this['_inBattle'];this[_0x31bf8d(0x1a9)]=![];for(const _0x3ac9fe of this[_0x31bf8d(0x2cc)]()){_0x3ac9fe&&_0x3ac9fe[_0x31bf8d(0x230)+_0x31bf8d(0x155)]();}this[_0x31bf8d(0x1a9)]=_0x39f4ad;},Sprite_Battler[_0xc3c273(0x24a)]['createBrea'+_0xc3c273(0x250)+_0xc3c273(0x299)]=function(){const _0x121af6=_0xc3c273;this[_0x121af6(0x1e7)+'ldSprite']=new Sprite_BreakShieldIcon(),this[_0x121af6(0x1e8)](this[_0x121af6(0x1e7)+_0x121af6(0x176)]);},Sprite_Actor['BREAK_SHIE'+'LD_BATTLER'+_0xc3c273(0x1bd)+_0xc3c273(0x306)]=VisuMZ[_0xc3c273(0x246)+'ds']['Settings']['UI'][_0xc3c273(0x2f0)+_0xc3c273(0x22f)],Sprite_Actor['BREAK_SHIE'+'LD_BATTLER'+_0xc3c273(0x218)+_0xc3c273(0x1c2)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x2f0)+_0xc3c273(0x315)],Sprite_Actor[_0xc3c273(0x2c9)+'LD_BATTLER'+'_DISPLAY_O'+_0xc3c273(0x28b)]=VisuMZ[_0xc3c273(0x246)+'ds']['Settings']['UI']['ActorOffse'+'tX'],Sprite_Actor[_0xc3c273(0x2c9)+'LD_BATTLER'+'_DISPLAY_O'+'FFSET_Y']=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x1cf)+'tY'],VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x2e1)+_0xc3c273(0x167)+_0xc3c273(0x1d4)]=Sprite_Actor[_0xc3c273(0x24a)][_0xc3c273(0x30b)+'s'],Sprite_Actor[_0xc3c273(0x24a)][_0xc3c273(0x30b)+'s']=function(){const _0x3e2858=_0xc3c273;VisuMZ[_0x3e2858(0x246)+'ds'][_0x3e2858(0x2e1)+'or_initMem'+'bers'][_0x3e2858(0x2d3)](this),this[_0x3e2858(0x166)+_0x3e2858(0x307)+'played']()&&this[_0x3e2858(0x2d2)+'kShieldIco'+_0x3e2858(0x299)]();},Sprite_Actor[_0xc3c273(0x24a)][_0xc3c273(0x166)+'eldIconDis'+_0xc3c273(0x26a)]=function(){const _0x142198=_0xc3c273,_0x562912={'PnYHw':function(_0x4dc2d0,_0x5738ef){return _0x4dc2d0===_0x5738ef;}};return Sprite_Actor[_0x142198(0x2c9)+_0x142198(0x144)+'_DISPLAY_I'+'CON']&&_0x562912['PnYHw'](this[_0x142198(0x200)+'r'],Sprite_Actor);},VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x2e1)+_0xc3c273(0x22b)+_0xc3c273(0x21c)]=Sprite_Actor['prototype'][_0xc3c273(0x30f)],Sprite_Actor[_0xc3c273(0x24a)][_0xc3c273(0x30f)]=function(_0xe3c70b){const _0x460d83=_0xc3c273;VisuMZ['BreakShiel'+'ds'][_0x460d83(0x2e1)+_0x460d83(0x22b)+_0x460d83(0x21c)]['call'](this,_0xe3c70b),this[_0x460d83(0x1e7)+_0x460d83(0x176)]&&this[_0x460d83(0x1e7)+_0x460d83(0x176)][_0x460d83(0x2b2)](this[_0x460d83(0x229)],!![]);},Sprite_Enemy[_0xc3c273(0x2c9)+_0xc3c273(0x144)+'_DISPLAY_I'+_0xc3c273(0x306)]=VisuMZ[_0xc3c273(0x246)+'ds']['Settings']['UI'][_0xc3c273(0x1c5)+_0xc3c273(0x22f)],Sprite_Enemy[_0xc3c273(0x2c9)+_0xc3c273(0x144)+_0xc3c273(0x218)+_0xc3c273(0x1c2)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x1c5)+_0xc3c273(0x315)],Sprite_Enemy[_0xc3c273(0x2c9)+_0xc3c273(0x144)+_0xc3c273(0x1ce)+_0xc3c273(0x28b)]=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x29f)+'tX'],Sprite_Enemy['BREAK_SHIE'+_0xc3c273(0x144)+_0xc3c273(0x1ce)+'FFSET_Y']=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x29f)+'tY'],Sprite_Enemy[_0xc3c273(0x2c9)+'LD_BATTLER'+_0xc3c273(0x17c)+_0xc3c273(0x267)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x2fe)+'ShieldIcon'],Sprite_Enemy['BREAK_SHIE'+_0xc3c273(0x144)+'_ATTACH_OF'+_0xc3c273(0x1aa)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x20e)+_0xc3c273(0x2ea)],Sprite_Enemy[_0xc3c273(0x2c9)+'LD_BATTLER'+_0xc3c273(0x2c2)+_0xc3c273(0x13c)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x20e)+_0xc3c273(0x2ba)],VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x15f)+'my_initMem'+_0xc3c273(0x1d4)]=Sprite_Enemy[_0xc3c273(0x24a)][_0xc3c273(0x30b)+'s'],Sprite_Enemy[_0xc3c273(0x24a)][_0xc3c273(0x30b)+'s']=function(){const _0x9f9142=_0xc3c273;VisuMZ['BreakShiel'+'ds'][_0x9f9142(0x15f)+'my_initMem'+_0x9f9142(0x1d4)][_0x9f9142(0x2d3)](this),this['isBreakShi'+_0x9f9142(0x307)+_0x9f9142(0x26a)]()&&this[_0x9f9142(0x2d2)+_0x9f9142(0x250)+_0x9f9142(0x299)]();},Sprite_Enemy[_0xc3c273(0x24a)][_0xc3c273(0x166)+'eldIconDis'+'played']=function(){const _0x365d10=_0xc3c273;return Imported['VisuMZ_1_B'+_0x365d10(0x24f)]&&Sprite_Enemy[_0x365d10(0x2c9)+_0x365d10(0x144)+_0x365d10(0x17c)+_0x365d10(0x267)]?![]:Sprite_Enemy[_0x365d10(0x2c9)+_0x365d10(0x144)+'_DISPLAY_I'+_0x365d10(0x306)];},VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x15f)+'my_setBatt'+_0xc3c273(0x21c)]=Sprite_Enemy['prototype'][_0xc3c273(0x30f)],Sprite_Enemy['prototype'][_0xc3c273(0x30f)]=function(_0xde44c3){const _0x58bae7=_0xc3c273;VisuMZ[_0x58bae7(0x246)+'ds'][_0x58bae7(0x15f)+_0x58bae7(0x23b)+_0x58bae7(0x21c)][_0x58bae7(0x2d3)](this,_0xde44c3),this[_0x58bae7(0x1e7)+'ldSprite']&&this[_0x58bae7(0x1e7)+_0x58bae7(0x176)]['setup'](this[_0x58bae7(0x17e)],!![]);};function Sprite_BreakShieldIcon(){const _0x33c022=_0xc3c273;this[_0x33c022(0x1d0)](...arguments);}Sprite_BreakShieldIcon[_0xc3c273(0x24a)]=Object[_0xc3c273(0x147)](Sprite['prototype']),Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x200)+'r']=Sprite_BreakShieldIcon,Sprite_BreakShieldIcon[_0xc3c273(0x24a)]['initialize']=function(){const _0x360bcc=_0xc3c273;Sprite[_0x360bcc(0x24a)]['initialize'][_0x360bcc(0x2d3)](this),this[_0x360bcc(0x30b)+'s'](),this[_0x360bcc(0x13a)](),this[_0x360bcc(0x153)+'erDisplay']();},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x30b)+'s']=function(){const _0xe67d35=_0xc3c273,_0x164c13={'wEXaW':_0xe67d35(0x236)+_0xe67d35(0x16d)},_0x35a27a=_0x164c13[_0xe67d35(0x219)][_0xe67d35(0x23e)]('|');let _0x48ddf5=-0x11*0xb9+-0xc24+0xd*0x1e1;while(!![]){switch(_0x35a27a[_0x48ddf5++]){case'0':this[_0xe67d35(0x289)]['x']=0x7*-0x515+0x8*-0x2+-0x3*-0xbe1+0.5;continue;case'1':this[_0xe67d35(0x231)+'ue']='';continue;case'2':this[_0xe67d35(0x289)]['y']=0x14d+-0xe6f+0xd22+0.5;continue;case'3':this[_0xe67d35(0x137)+_0xe67d35(0x245)]='';continue;case'4':this[_0xe67d35(0x24d)+_0xe67d35(0x293)]=![];continue;case'5':this[_0xe67d35(0x2ff)]=null;continue;case'6':this['_iconIndex']=0x5*0x2db+-0x56*0x1b+0x535*-0x1;continue;}break;}},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x13a)]=function(){const _0x1b3ff3=_0xc3c273,_0x24da95={'sgjyU':_0x1b3ff3(0x2a0)};this[_0x1b3ff3(0x182)]=new Bitmap(ImageManager[_0x1b3ff3(0x24c)],ImageManager['iconHeight']),this[_0x1b3ff3(0x1ae)]=ImageManager[_0x1b3ff3(0x15e)](_0x24da95[_0x1b3ff3(0x28f)]);},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x153)+_0xc3c273(0x247)]=function(){const _0x598142=_0xc3c273,_0x4f285d={'IlVGx':_0x598142(0x1dc)},_0x269411=_0x4f285d['IlVGx'][_0x598142(0x23e)]('|');let _0x385cce=-0x5*-0x5f6+0x672+-0x2440;while(!![]){switch(_0x269411[_0x385cce++]){case'0':this[_0x598142(0x318)+_0x598142(0x1a8)][_0x598142(0x182)]=new Bitmap(ImageManager['iconWidth'],ImageManager[_0x598142(0x1e2)]);continue;case'1':this[_0x598142(0x318)+_0x598142(0x1a8)]['anchor']['x']=-0x172b+0x2520+-0xdf5+0.5;continue;case'2':this[_0x598142(0x1e8)](this[_0x598142(0x318)+_0x598142(0x1a8)]);continue;case'3':this['_numberSpr'+_0x598142(0x1a8)]=new Sprite();continue;case'4':this[_0x598142(0x318)+_0x598142(0x1a8)]['anchor']['y']=0x7*-0x9c+0x19af+-0x156b+0.5;continue;}break;}},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x2b2)]=function(_0x2ee08f,_0x12a0ea){const _0x5e5617=_0xc3c273,_0x2fecc7={'eePpw':function(_0x48fb7e,_0x407428){return _0x48fb7e!==_0x407428;}};_0x2fecc7[_0x5e5617(0x249)](this[_0x5e5617(0x2ff)],_0x2ee08f)&&(this[_0x5e5617(0x2ff)]=_0x2ee08f),this[_0x5e5617(0x24d)+_0x5e5617(0x293)]=_0x12a0ea;},Sprite_BreakShieldIcon[_0xc3c273(0x24a)]['update']=function(){const _0x35356d=_0xc3c273,_0x42717b={'rNMSW':_0x35356d(0x316)};Sprite[_0x35356d(0x24a)][_0x35356d(0x12f)][_0x35356d(0x2d3)](this);if(this['shouldDisp'+_0x35356d(0x2a6)]()){const _0x26ba73=_0x42717b[_0x35356d(0x1cb)][_0x35356d(0x23e)]('|');let _0x4b1ab8=0x5f*-0x3+-0x20d6+-0x3*-0xb51;while(!![]){switch(_0x26ba73[_0x4b1ab8++]){case'0':this[_0x35356d(0x207)]=-0x103c*0x2+-0x13de*-0x1+-0x1*-0xd99;continue;case'1':this['updateAuto'+_0x35356d(0x193)]();continue;case'2':this[_0x35356d(0x1da)+'er']();continue;case'3':this[_0x35356d(0x181)+'e']();continue;case'4':this[_0x35356d(0x243)]();continue;}break;}}else this[_0x35356d(0x207)]=-0x5dc*0x2+-0x23f3+0x2fab;},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x2af)+_0xc3c273(0x2a6)]=function(){const _0x4bbae4=_0xc3c273;return this[_0x4bbae4(0x2ff)]&&this[_0x4bbae4(0x2ff)][_0x4bbae4(0x296)]()&&this[_0x4bbae4(0x2ff)]['isAffected'+_0x4bbae4(0x179)+_0x4bbae4(0x136)]();},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x243)]=function(){const _0x23dcd7=_0xc3c273,_0x52a3e8={'yPWiC':function(_0x56f9a4,_0x23c678){return _0x56f9a4>_0x23c678;},'EOqhO':function(_0x51598c,_0x425619){return _0x51598c<=_0x425619;}};if(this[_0x23dcd7(0x2ff)][_0x23dcd7(0x2ee)]()){const _0x6c3667=$dataStates[this[_0x23dcd7(0x2ff)][_0x23dcd7(0x23a)+'Id']()];_0x6c3667&&_0x52a3e8['yPWiC'](_0x6c3667[_0x23dcd7(0x204)],-0x155b+-0x130f+0x286a)?this[_0x23dcd7(0x149)]=_0x6c3667[_0x23dcd7(0x204)]:this[_0x23dcd7(0x149)]=-0x88f*-0x4+-0x929+0x395*-0x7,this['_numberVal'+'ue']='';}else{if(this[_0x23dcd7(0x2ff)][_0x23dcd7(0x1a0)+'nned']()){const _0x16c782=$dataStates[Game_Battler[_0x23dcd7(0x2c9)+_0x23dcd7(0x2cf)+_0x23dcd7(0x173)]];_0x16c782&&_0x52a3e8[_0x23dcd7(0x261)](_0x16c782[_0x23dcd7(0x204)],0x78e+-0xf15+0x787)?this[_0x23dcd7(0x149)]=_0x16c782[_0x23dcd7(0x204)]:this[_0x23dcd7(0x149)]=ImageManager['breakShiel'+_0x23dcd7(0x2c5)];if(ImageManager[_0x23dcd7(0x1bf)+_0x23dcd7(0x146)+'s']){this[_0x23dcd7(0x231)+'ue']=this[_0x23dcd7(0x2ff)]['_stateTurn'+'s'][_0x16c782['id']]||0x244f+-0x1*-0x7fa+-0x2c49;if(_0x52a3e8[_0x23dcd7(0x18e)](this[_0x23dcd7(0x231)+'ue'],-0x2490+0x1*0x2499+-0x9))this['_numberVal'+'ue']='';}else this['_numberVal'+'ue']='';}else this[_0x23dcd7(0x149)]=ImageManager['breakShiel'+_0x23dcd7(0x28a)+'on'],this[_0x23dcd7(0x231)+'ue']=this[_0x23dcd7(0x2ff)][_0x23dcd7(0x2de)+'akShield']();}},Sprite_BreakShieldIcon[_0xc3c273(0x24a)][_0xc3c273(0x181)+'e']=function(){const _0x597fd2=_0xc3c273,_0x34c106={'qcptd':function(_0x35c937,_0x2fbee8){return _0x35c937===_0x2fbee8;},'kmBhX':function(_0x37768e,_0x2dda48){return _0x37768e*_0x2dda48;},'mpAiW':function(_0xa4f979,_0xd31454){return _0xa4f979%_0xd31454;},'vyxXM':function(_0x27ba87,_0x1d305a){return _0x27ba87/_0x1d305a;}};if(_0x34c106['qcptd'](this[_0x597fd2(0x1c3)+_0x597fd2(0x2b8)],this['_iconIndex']))return;this[_0x597fd2(0x1c3)+_0x597fd2(0x2b8)]=this[_0x597fd2(0x149)];const _0x45853e=ImageManager[_0x597fd2(0x24c)],_0x25ad69=ImageManager[_0x597fd2(0x1e2)],_0x482417=_0x34c106[_0x597fd2(0x142)](_0x34c106[_0x597fd2(0x20d)](this[_0x597fd2(0x149)],0x1*-0x22+0x1*0xcfb+-0xcc9),_0x45853e),_0x1ccef5=_0x34c106[_0x597fd2(0x142)](Math[_0x597fd2(0x1fc)](_0x34c106[_0x597fd2(0x2fb)](this[_0x597fd2(0x149)],-0x746+-0xfca+-0x4a0*-0x5)),_0x25ad69),_0x170a69=this['_srcBitmap'],_0x37e646=this[_0x597fd2(0x182)];_0x37e646['clear'](),_0x37e646[_0x597fd2(0x280)](_0x170a69,_0x482417,_0x1ccef5,_0x45853e,_0x25ad69,0x12a+-0x4*-0x854+-0x227a,-0x15a8+-0x22a4+0x384c,_0x37e646['width'],_0x37e646[_0x597fd2(0x215)]);},Sprite_BreakShieldIcon[_0xc3c273(0x24a)]['updateNumb'+'er']=function(){const _0x250f31=_0xc3c273,_0x200bec={'orSMo':function(_0x4ee2d3,_0x149a96){return _0x4ee2d3===_0x149a96;},'kSaSd':function(_0x1ebf79,_0x51eadc){return _0x1ebf79===_0x51eadc;},'VcdKz':_0x250f31(0x28d)};if(_0x200bec[_0x250f31(0x1b8)](this['_displayVa'+_0x250f31(0x245)],this['_numberVal'+'ue'])&&_0x200bec['kSaSd'](this[_0x250f31(0x287)+_0x250f31(0x221)],this[_0x250f31(0x2ff)]['isBreakStu'+_0x250f31(0x14a)]()))return;this[_0x250f31(0x137)+_0x250f31(0x245)]=this[_0x250f31(0x231)+'ue'],this[_0x250f31(0x287)+_0x250f31(0x221)]=this[_0x250f31(0x2ff)]['isBreakStu'+_0x250f31(0x14a)]();const _0x76ae04=this[_0x250f31(0x318)+_0x250f31(0x1a8)][_0x250f31(0x182)];_0x76ae04[_0x250f31(0x311)]=$gameSystem['numberFont'+'Face'](),_0x76ae04[_0x250f31(0x2aa)]=VisuMZ[_0x250f31(0x246)+'ds'][_0x250f31(0x1f2)]['UI']['FontSize'],_0x76ae04['clear'](),_0x76ae04[_0x250f31(0x18f)]=this[_0x250f31(0x317)+_0x250f31(0x308)](),_0x76ae04[_0x250f31(0x13b)](this[_0x250f31(0x137)+_0x250f31(0x245)],-0xefa+0x1*0x2165+0x17*-0xcd,-0x73*0x17+-0x2043+-0x1*-0x2a98,_0x76ae04[_0x250f31(0x1fb)],_0x76ae04[_0x250f31(0x215)],_0x200bec[_0x250f31(0x29b)]);},Sprite_BreakShieldIcon['prototype'][_0xc3c273(0x317)+'extColor']=function(){const _0x125db1=_0xc3c273;if(this[_0x125db1(0x2ff)][_0x125db1(0x1a0)+_0x125db1(0x14a)]()){const _0x5c1100=VisuMZ['BreakShiel'+'ds'][_0x125db1(0x1f2)]['UI'][_0x125db1(0x303)+_0x125db1(0x16b)]??-0xdf*-0x19+-0x19de+0x429;return ColorManager[_0x125db1(0x205)](_0x5c1100);}else return ColorManager['normalColo'+'r']();},Sprite_BreakShieldIcon[_0xc3c273(0x24a)]['updateAuto'+'Position']=function(){const _0x4aa5e6=_0xc3c273,_0x162c6f={'tAfSs':function(_0x38c471,_0x1884d6){return _0x38c471/_0x1884d6;},'BfmWk':function(_0x1e0a30,_0x4c5100){return _0x1e0a30*_0x4c5100;},'ehXwh':function(_0x146f01,_0x28d18f){return _0x146f01*_0x28d18f;}};if(!this['_autoPosit'+'ioning'])return;if(!SceneManager[_0x4aa5e6(0x170)+'tle']())return;if(!SceneManager['_scene'][_0x4aa5e6(0x27e)])return;const _0x3dc802=SceneManager['_scene'][_0x4aa5e6(0x27e)][_0x4aa5e6(0x1f5)+_0x4aa5e6(0x163)](this[_0x4aa5e6(0x2ff)]);if(!_0x3dc802)return;const _0x297f91=this[_0x4aa5e6(0x2ff)]['isActor']()?Sprite_Actor:Sprite_Enemy,_0x2a38f4=_0x297f91[_0x4aa5e6(0x2c9)+'LD_BATTLER'+_0x4aa5e6(0x218)+_0x4aa5e6(0x1c2)];this['x']=0x16f*-0x9+-0xcba*-0x1+0x3*0xf;if(_0x2a38f4['match'](/left/i))this['x']=Math[_0x4aa5e6(0x1fc)](_0x162c6f[_0x4aa5e6(0x2d7)](_0x3dc802['width'],-(0x2db+-0xa6d*-0x1+0x2*-0x6a3)));else _0x2a38f4['match'](/right/i)&&(this['x']=Math[_0x4aa5e6(0x2be)](_0x162c6f['tAfSs'](_0x3dc802[_0x4aa5e6(0x1fb)],0x79*-0x49+-0x212a+-0xe7*-0x4b)));this['x']+=_0x297f91[_0x4aa5e6(0x2c9)+_0x4aa5e6(0x144)+_0x4aa5e6(0x1ce)+_0x4aa5e6(0x28b)],this['y']=0x1231+0x109*0x23+-0xc*0x489;if(_0x2a38f4[_0x4aa5e6(0x17b)](/top/i))this['y']=_0x162c6f[_0x4aa5e6(0x25a)](_0x3dc802[_0x4aa5e6(0x215)],-(0x1*-0x920+0x377*-0x9+0x2850));else _0x2a38f4['match'](/middle/i)&&(this['y']=Math['round'](_0x162c6f[_0x4aa5e6(0x14b)](_0x3dc802[_0x4aa5e6(0x215)],-(0x1fec*0x1+-0x4*-0x77b+-0x7bb*0x8+0.5))));this['y']+=_0x297f91[_0x4aa5e6(0x2c9)+'LD_BATTLER'+_0x4aa5e6(0x1ce)+_0x4aa5e6(0x216)];};Imported[_0xc3c273(0x27c)+'attleCore']&&Sprite_Enemy[_0xc3c273(0x2c9)+'LD_BATTLER'+_0xc3c273(0x17c)+_0xc3c273(0x267)]&&(VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x15f)+_0xc3c273(0x244)+_0xc3c273(0x2d8)+_0xc3c273(0x2b3)]=Sprite_EnemyName['prototype'][_0xc3c273(0x227)+_0xc3c273(0x1f9)+'s'],Sprite_EnemyName[_0xc3c273(0x24a)][_0xc3c273(0x227)+_0xc3c273(0x1f9)+'s']=function(){const _0x5a1197=_0xc3c273;VisuMZ[_0x5a1197(0x246)+'ds'][_0x5a1197(0x15f)+_0x5a1197(0x244)+_0x5a1197(0x2d8)+_0x5a1197(0x2b3)][_0x5a1197(0x2d3)](this),this['_breakShie'+_0x5a1197(0x176)]=new Sprite_BreakShieldIcon(),this[_0x5a1197(0x1e8)](this['_breakShie'+_0x5a1197(0x176)]);},VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x15f)+_0xc3c273(0x2bd)+_0xc3c273(0x2d8)+_0xc3c273(0x2b3)]=Sprite_EnemyName[_0xc3c273(0x24a)][_0xc3c273(0x1ad)+_0xc3c273(0x1f9)+'s'],Sprite_EnemyName[_0xc3c273(0x24a)][_0xc3c273(0x1ad)+_0xc3c273(0x1f9)+'s']=function(){const _0x3bb903=_0xc3c273;VisuMZ['BreakShiel'+'ds'][_0x3bb903(0x15f)+_0x3bb903(0x2bd)+_0x3bb903(0x2d8)+_0x3bb903(0x2b3)][_0x3bb903(0x2d3)](this),this[_0x3bb903(0x1f8)+'kShieldIco'+_0x3bb903(0x299)]();},Sprite_EnemyName[_0xc3c273(0x24a)][_0xc3c273(0x1f8)+'kShieldIco'+_0xc3c273(0x299)]=function(){const _0x66f8ea=_0xc3c273,_0x438687={'PkhDA':function(_0x20e3b1,_0x7fc983){return _0x20e3b1!==_0x7fc983;},'UlfsF':function(_0x261c64,_0x192f46){return _0x261c64-_0x192f46;},'WaOQS':function(_0x384abb,_0x405ae4){return _0x384abb/_0x405ae4;},'JzUES':function(_0x8922a1,_0x302fba){return _0x8922a1+_0x302fba;}};if(!this[_0x66f8ea(0x1e7)+'ldSprite'])return;_0x438687[_0x66f8ea(0x2ef)](this['_battler'],this['_breakShie'+_0x66f8ea(0x176)][_0x66f8ea(0x2ff)])&&this[_0x66f8ea(0x1e7)+_0x66f8ea(0x176)]['setup'](this[_0x66f8ea(0x2ff)],![]);const _0x29d48c=this[_0x66f8ea(0x25f)]();this[_0x66f8ea(0x2a8)+'t']=this[_0x66f8ea(0x2a8)+'t']||Window_Base[_0x66f8ea(0x24a)][_0x66f8ea(0x1b4)](),this[_0x66f8ea(0x1e7)+'ldSprite']['x']=_0x438687[_0x66f8ea(0x1ff)](Math[_0x66f8ea(0x165)](_0x438687['WaOQS'](_0x438687[_0x66f8ea(0x187)](_0x29d48c,ImageManager[_0x66f8ea(0x24c)]),-(-0x713+0x9e*-0x1f+0x1a37))),-0xe45+0x19*-0x28+0x1235),this['_breakShie'+_0x66f8ea(0x176)]['y']=_0x438687['WaOQS'](this[_0x66f8ea(0x2a8)+'t'],0x1551+-0x3*0x5fb+0x35e*-0x1),this['_breakShie'+_0x66f8ea(0x176)]['x']+=Sprite_Enemy[_0x66f8ea(0x2c9)+_0x66f8ea(0x144)+_0x66f8ea(0x2c2)+_0x66f8ea(0x1aa)]||0x27e*0x8+0x2426+-0x959*0x6,this[_0x66f8ea(0x1e7)+_0x66f8ea(0x176)]['y']+=Sprite_Enemy[_0x66f8ea(0x2c9)+_0x66f8ea(0x144)+_0x66f8ea(0x2c2)+_0x66f8ea(0x13c)]||-0xe*-0x1d5+-0x2ba*-0xb+-0x37a4,this['updateBrea'+_0x66f8ea(0x252)+'tiLayerHpG'+_0x66f8ea(0x1fe)]();},Sprite_EnemyName[_0xc3c273(0x24a)][_0xc3c273(0x1f8)+'kShieldMul'+_0xc3c273(0x28e)+_0xc3c273(0x1fe)]=function(){const _0x160438=_0xc3c273,_0x248293={'MkMUP':function(_0x454888,_0x19eb12){return _0x454888*_0x19eb12;}};if(!Imported[_0x160438(0x212)+'ultiLayerH'+_0x160438(0x291)])return;if(!this[_0x160438(0x2ff)]['showMultiL'+'ayerHpGaug'+'e']())return;if(!Sprite_MultiLayerHpStates[_0x160438(0x2c0)][_0x160438(0x1bf)+'ds'])return;const _0x324d89=VisuMZ[_0x160438(0x1ec)+_0x160438(0x177)][_0x160438(0x19f)+_0x160438(0x279)][_0x160438(0x2c6)]['reduceRedu'+_0x160438(0x2c7)];_0x324d89['breakShiel'+'ds']&&Sprite_MultiLayerHpStates[_0x160438(0x2c0)][_0x160438(0x186)]&&(this[_0x160438(0x1e7)+_0x160438(0x176)]['y']+=_0x248293[_0x160438(0x189)](Graphics['height'],-0x32f*0x3+-0x1*-0x153+0x844));});;Window_Base[_0xc3c273(0x24a)][_0xc3c273(0x172)+'reakShield'+'s']=function(_0x56d5a5,_0x27835d,_0x18c760){const _0x34fa88=_0xc3c273,_0x56481e={'Qyaew':_0x34fa88(0x28d)};if(!_0x56d5a5)return;const _0x552fe8=this['_battler'],_0x905e79=this[_0x34fa88(0x149)],_0x523421=this[_0x34fa88(0x231)+'ue'];this[_0x34fa88(0x2ff)]=_0x56d5a5,Sprite_BreakShieldIcon[_0x34fa88(0x24a)][_0x34fa88(0x243)][_0x34fa88(0x2d3)](this),this['drawIcon'](this['_iconIndex'],_0x27835d,_0x18c760),this[_0x34fa88(0x253)+'ettings'](),this[_0x34fa88(0x29d)][_0x34fa88(0x311)]=$gameSystem[_0x34fa88(0x2f2)+_0x34fa88(0x305)](),this['contents'][_0x34fa88(0x2aa)]=VisuMZ['BreakShiel'+'ds']['Settings']['UI'][_0x34fa88(0x265)],this[_0x34fa88(0x29d)]['textColor']=this[_0x34fa88(0x2ff)][_0x34fa88(0x1a0)+'nned']()?ColorManager[_0x34fa88(0x205)](VisuMZ[_0x34fa88(0x246)+'ds'][_0x34fa88(0x1f2)]['UI']['StunTextCo'+_0x34fa88(0x16b)]):ColorManager['normalColo'+'r'](),this[_0x34fa88(0x29d)][_0x34fa88(0x13b)](this['_numberVal'+'ue'],_0x27835d,_0x18c760,ImageManager[_0x34fa88(0x24c)],ImageManager[_0x34fa88(0x1e2)],_0x56481e[_0x34fa88(0x1e6)]),this[_0x34fa88(0x2ff)]=_0x552fe8,this[_0x34fa88(0x149)]=_0x905e79,this[_0x34fa88(0x231)+'ue']=_0x523421,this[_0x34fa88(0x253)+_0x34fa88(0x21e)]();},Window_StatusBase['BREAK_SHIE'+_0xc3c273(0x135)+'CONS']=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x26e)+_0xc3c273(0x246)+_0xc3c273(0x192)],VisuMZ['BreakShiel'+'ds']['Window_Sta'+_0xc3c273(0x154)+'awActorIco'+'ns']=Window_StatusBase['prototype']['drawActorI'+'cons'],Window_StatusBase[_0xc3c273(0x24a)][_0xc3c273(0x130)+_0xc3c273(0x15a)]=function(_0x3bc32d,_0x556582,_0x2c8826,_0x1be503){const _0x4a097c=_0xc3c273,_0x357a97={'VhNPq':function(_0x465940,_0x4e9e78){return _0x465940||_0x4e9e78;},'kRWQB':function(_0x55b809,_0x36637b){return _0x55b809+_0x36637b;},'IuvnI':function(_0x539009,_0x2a35fc){return _0x539009/_0x2a35fc;},'byvhw':function(_0x544665,_0x2643cf){return _0x544665+_0x2643cf;}};_0x1be503=_0x357a97[_0x4a097c(0x17f)](_0x1be503,-0x1*0x70c+0xd89+-0x5ed);if(this['shouldDisp'+'layBreakSh'+_0x4a097c(0x27f)](_0x3bc32d)){const _0x5e2b1c=_0x357a97['kRWQB'](_0x556582,Math['round'](_0x357a97[_0x4a097c(0x22c)](ImageManager['iconWidth'],0x1bc7+-0x3*-0x809+-0x53*0xa0))),_0x17fe68=_0x357a97[_0x4a097c(0x242)](_0x357a97['byvhw'](_0x2c8826,Math[_0x4a097c(0x165)](_0x357a97[_0x4a097c(0x22c)](ImageManager[_0x4a097c(0x1e2)],-0x220f+0x9d*0x25+0xb60))),0x1*-0xfcf+-0x1*0x249b+0x346c);this[_0x4a097c(0x282)+_0x4a097c(0x234)](_0x3bc32d,_0x5e2b1c,_0x17fe68),_0x556582+=ImageManager[_0x4a097c(0x24c)],_0x1be503-=ImageManager[_0x4a097c(0x24c)];}VisuMZ['BreakShiel'+'ds']['Window_Sta'+_0x4a097c(0x154)+_0x4a097c(0x285)+'ns'][_0x4a097c(0x2d3)](this,_0x3bc32d,_0x556582,_0x2c8826,_0x1be503);},Window_StatusBase['prototype']['shouldDisp'+_0xc3c273(0x233)+_0xc3c273(0x27f)]=function(_0x27c7c9){const _0x20e3ac=_0xc3c273;if(!_0x27c7c9)return![];if(!Window_StatusBase[_0x20e3ac(0x2c9)+'LDS_MENU_I'+_0x20e3ac(0x164)])return![];if(_0x27c7c9[_0x20e3ac(0x15b)]())return Game_Battler[_0x20e3ac(0x2c9)+_0x20e3ac(0x270)];else return _0x27c7c9[_0x20e3ac(0x319)]()?Game_Battler[_0x20e3ac(0x2c9)+'LDS_ENEMIE'+'S']:!![];},Window_StatusBase['prototype']['placeBreak'+'ShieldIcon']=function(_0x536000,_0x3346f6,_0x20a3fb){const _0x1404a5=_0xc3c273,_0x54ef8d={'FHeBA':_0x1404a5(0x2b7)+_0x1404a5(0x1ed)+_0x1404a5(0x271)},_0x30f727=(_0x536000[_0x1404a5(0x15b)]()?_0x536000[_0x1404a5(0x1b3)]():_0x536000[_0x1404a5(0x1de)])||-0x1*-0x555+0xd*0x14d+0xdb*-0x1a,_0x2149e1=_0x54ef8d['FHeBA'][_0x1404a5(0x20c)](_0x30f727),_0x18a999=this[_0x1404a5(0x257)+'rSprite'](_0x2149e1,Sprite_BreakShieldIcon);_0x18a999[_0x1404a5(0x2b2)](_0x536000,![]),_0x18a999[_0x1404a5(0x251)](_0x3346f6,_0x20a3fb),_0x18a999['show']();},Window_BattleStatus[_0xc3c273(0x2c9)+_0xc3c273(0x2d9)+_0xc3c273(0x1b2)]=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['UI']['BattleStat'+_0xc3c273(0x14e)+_0xc3c273(0x15a)],Window_BattleStatus[_0xc3c273(0x2c9)+_0xc3c273(0x2d9)+_0xc3c273(0x2f6)]=VisuMZ['BreakShiel'+'ds'][_0xc3c273(0x1f2)]['UI'][_0xc3c273(0x26c)+_0xc3c273(0x29a)+_0xc3c273(0x1c8)],Window_BattleStatus[_0xc3c273(0x2c9)+_0xc3c273(0x2d9)+_0xc3c273(0x197)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI']['BattleStat'+_0xc3c273(0x283)],Window_BattleStatus[_0xc3c273(0x2c9)+_0xc3c273(0x2d9)+_0xc3c273(0x161)]=VisuMZ[_0xc3c273(0x246)+'ds'][_0xc3c273(0x1f2)]['UI']['BattleStat'+_0xc3c273(0x2e0)],VisuMZ['BreakShiel'+'ds']['Window_Bat'+_0xc3c273(0x2a9)+_0xc3c273(0x168)+'atus']=Window_BattleStatus[_0xc3c273(0x24a)]['drawItemSt'+_0xc3c273(0x17a)],Window_BattleStatus['prototype'][_0xc3c273(0x168)+_0xc3c273(0x17a)]=function(_0x41e748){const _0x4bd697=_0xc3c273;VisuMZ[_0x4bd697(0x246)+'ds'][_0x4bd697(0x240)+'tleStatus_'+_0x4bd697(0x168)+_0x4bd697(0x17a)][_0x4bd697(0x2d3)](this,_0x41e748),this[_0x4bd697(0x168)+'atusBreakS'+_0x4bd697(0x178)](_0x41e748);},Window_BattleStatus['prototype'][_0xc3c273(0x168)+'atusBreakS'+_0xc3c273(0x178)]=function(_0x237b69){const _0x4f4d4c=_0xc3c273;if(!Window_BattleStatus[_0x4f4d4c(0x2c9)+'LDS_DISPLA'+_0x4f4d4c(0x1b2)])return;if(!Game_Battler[_0x4f4d4c(0x2c9)+_0x4f4d4c(0x270)])return;const _0x29253b=this['actor'](_0x237b69);if(!_0x29253b[_0x4f4d4c(0x1cd)+_0x4f4d4c(0x179)+_0x4f4d4c(0x136)]())return;if(!Window_BattleStatus[_0x4f4d4c(0x2c9)+_0x4f4d4c(0x2d9)+_0x4f4d4c(0x2f6)])this['drawItemSt'+'atusBreakS'+_0x4f4d4c(0x225)+_0x4f4d4c(0x1ef)](_0x237b69);else!Imported[_0x4f4d4c(0x27c)+_0x4f4d4c(0x24f)]?this['drawItemSt'+_0x4f4d4c(0x1f1)+'hieldsDefa'+_0x4f4d4c(0x1ef)](_0x237b69):this[_0x4f4d4c(0x168)+_0x4f4d4c(0x239)+_0x4f4d4c(0x24f)](_0x237b69);},Window_BattleStatus[_0xc3c273(0x24a)][_0xc3c273(0x168)+_0xc3c273(0x1f1)+_0xc3c273(0x225)+_0xc3c273(0x1ef)]=function(_0x5ea59b){const _0x32705b=_0xc3c273,_0x3f8fbf={'qVbzz':function(_0xd42cc7,_0x54828f){return _0xd42cc7/_0x54828f;},'pWxPH':function(_0x5e3191,_0x552759){return _0x5e3191+_0x552759;},'YZAHl':function(_0x236c63,_0x51909a){return _0x236c63-_0x51909a;},'HRogd':function(_0x4e6924,_0x8b3f02){return _0x4e6924+_0x8b3f02;},'EjQFu':function(_0x140285,_0x131904){return _0x140285+_0x131904;}},_0x54c6df=this['actor'](_0x5ea59b),_0x2fdba7=this['itemRectWi'+_0x32705b(0x2b4)](_0x5ea59b),_0x43694b=Math['round'](_0x3f8fbf[_0x32705b(0x27a)](ImageManager[_0x32705b(0x24c)],-0xe*-0x241+-0x1ad+-0x1ddf));let _0x5492c4=_0x3f8fbf[_0x32705b(0x1fa)](_0x3f8fbf['YZAHl'](_0x3f8fbf[_0x32705b(0x1fa)](_0x2fdba7['x'],_0x43694b),0x2b2+-0x18*0x15+0x1a*-0x7),Window_BattleStatus[_0x32705b(0x2c9)+_0x32705b(0x2d9)+'Y_OFFSET_X']),_0x1c50a1=_0x3f8fbf[_0x32705b(0x25d)](_0x3f8fbf[_0x32705b(0x185)](_0x3f8fbf['pWxPH'](_0x2fdba7['y'],_0x43694b),-0x1*0xebb+0x1615+-0x756),Window_BattleStatus[_0x32705b(0x2c9)+_0x32705b(0x2d9)+_0x32705b(0x161)]);this['placeBreak'+_0x32705b(0x234)](_0x54c6df,_0x5492c4,_0x1c50a1);},Window_BattleStatus['prototype'][_0xc3c273(0x168)+_0xc3c273(0x239)+_0xc3c273(0x24f)]=function(_0x539e87){const _0x487bd2=_0xc3c273,_0x53b8c1={'bDknO':function(_0x30112d,_0x5b9ecb){return _0x30112d+_0x5b9ecb;},'rWPAu':function(_0x5e87f6,_0x427457){return _0x5e87f6/_0x427457;},'qFflt':function(_0x1e4436,_0xbc5f1){return _0x1e4436-_0xbc5f1;},'kvrzb':function(_0x2401c1,_0x1afd88){return _0x2401c1-_0x1afd88;},'XeTcE':function(_0x3c07ce,_0x433322){return _0x3c07ce-_0x433322;},'QpCpt':function(_0x365ce7,_0x3dcf51){return _0x365ce7<_0x3dcf51;},'uSXEa':function(_0x3269d6,_0xa33448){return _0x3269d6-_0xa33448;},'DfSbU':function(_0x484767,_0x2aee22){return _0x484767/_0x2aee22;},'olgob':function(_0x5b0c01,_0x1e6d86){return _0x5b0c01-_0x1e6d86;},'gZcwH':function(_0x1ceab4,_0x1f52b8){return _0x1ceab4+_0x1f52b8;},'hpLVS':function(_0x6b513b,_0x20c393){return _0x6b513b+_0x20c393;},'rSZYR':function(_0x14cad4,_0xdf6897){return _0x14cad4+_0xdf6897;},'hOuXz':'list','ZLbbN':'portrait','PGTkJ':_0x487bd2(0x2fa),'mjkSl':'border','SeluU':function(_0xed07e3,_0x5fa841){return _0xed07e3+_0x5fa841;}},_0x1ed4b7=this['actor'](_0x539e87),_0x1ed853=this[_0x487bd2(0x206)](_0x539e87),_0x120282=Math['round'](_0x53b8c1[_0x487bd2(0x1c7)](_0x1ed853['x'],_0x53b8c1['rWPAu'](_0x53b8c1[_0x487bd2(0x156)](_0x1ed853[_0x487bd2(0x1fb)],-0x4*-0x286+0x334*-0x2+-0x330),-0x120e+0x79d*0x1+0x6b*0x19))),_0x14af22=this['nameY'](_0x1ed853),_0x7ebca6=Math[_0x487bd2(0x165)](_0x53b8c1[_0x487bd2(0x2bc)](ImageManager[_0x487bd2(0x24c)],0x136+-0x1c33*0x1+-0x1aff*-0x1));let _0x21ae6f=_0x53b8c1[_0x487bd2(0x21f)](_0x53b8c1[_0x487bd2(0x1b5)](_0x120282,_0x7ebca6),0x83*0x1f+-0x255c+-0x1*-0x1583),_0x132277=_0x53b8c1[_0x487bd2(0x1c7)](_0x14af22,_0x7ebca6);_0x53b8c1[_0x487bd2(0x23f)](_0x53b8c1['uSXEa'](_0x21ae6f,_0x53b8c1[_0x487bd2(0x2c4)](ImageManager[_0x487bd2(0x24c)],0x1*0x1e54+-0x170c+0x2*-0x3a3)),_0x1ed853['x'])&&(_0x21ae6f=_0x53b8c1[_0x487bd2(0x1e4)](_0x53b8c1[_0x487bd2(0x1a6)](_0x120282,_0x7ebca6),-0x1*-0x84a+-0x1505+0xcbf),_0x132277=_0x53b8c1['qFflt'](_0x14af22,_0x7ebca6));let _0x52b9c9=_0x53b8c1[_0x487bd2(0x2b1)](_0x53b8c1[_0x487bd2(0x2b1)](_0x1ed853['x'],_0x7ebca6),-0x6*-0x599+0xcc+-0x225e),_0x57526b=_0x53b8c1['rSZYR'](_0x53b8c1[_0x487bd2(0x1a6)](_0x1ed853['y'],_0x7ebca6),0x1ab2+-0xc48*0x2+-0x21e*0x1);const _0x1539e5=this[_0x487bd2(0x256)+'utStyle']();switch(_0x1539e5){case _0x53b8c1['hOuXz']:!VisuMZ['BattleCore'][_0x487bd2(0x1f2)][_0x487bd2(0x174)+'ut'][_0x487bd2(0x269)+_0x487bd2(0x2e4)]&&(_0x52b9c9=_0x53b8c1['qFflt'](_0x53b8c1[_0x487bd2(0x1a6)](_0x1ed853['x'],_0x1ed853['width']),ImageManager[_0x487bd2(0x24c)]));break;case'xp':case _0x53b8c1[_0x487bd2(0x262)]:case _0x53b8c1['PGTkJ']:case _0x53b8c1[_0x487bd2(0x301)]:_0x52b9c9=_0x21ae6f,_0x57526b=_0x53b8c1['SeluU'](_0x132277,ImageManager[_0x487bd2(0x1e2)]);break;}_0x52b9c9+=Window_BattleStatus[_0x487bd2(0x2c9)+'LDS_DISPLA'+_0x487bd2(0x197)],_0x57526b+=Window_BattleStatus['BREAK_SHIE'+_0x487bd2(0x2d9)+_0x487bd2(0x161)],this['placeBreak'+_0x487bd2(0x234)](_0x1ed4b7,_0x52b9c9,_0x57526b);};