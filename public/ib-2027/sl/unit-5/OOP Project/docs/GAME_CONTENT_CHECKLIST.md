# Sigma-7 Game Content Checklist

## ROOMS (10)
- [ ] Airlock (start)
- [ ] Storage Cage
- [ ] Main Corridor
- [ ] Engineering Bay
- [ ] Research Lab
- [ ] Crew Quarters
- [ ] Control Hub
- [ ] Research Archive
- [ ] Medical Bay
- [ ] Command Deck (final)

## ITEMS (13)
- [ ] Security Keycard (Storage Cage) → unlocks security_door
- [ ] Crowbar (Main Corridor) → opens storage_chest
- [ ] Flashlight (Chest in Storage)
- [ ] Shield Plate (Chest in Storage) → +15 armor consumable
- [ ] Power Cell (Engineering) → powers terminal_puzzle
- [ ] Personal Log (Crew Quarters) → lore
- [ ] Control Cell (Control Hub) → unlocks command_door
- [ ] Override Key (Research Archive) → enables escape_pod
- [ ] Med Patch (Research Lab) → +20 HP consumable
- [ ] Access Code Note (Research Lab) → puzzle hint
- [ ] Data Chip (Research Lab) → decrypt_bonus
- [ ] Med Kit (Medical Bay) → +50 HP consumable
- [ ] Stim Pack (Medical Bay) → +10 damage consumable
- [ ] Distress Beacon (Command Deck) → VICTORY ITEM

## NPCS (2)
- [ ] M-Unit 7 / Maintenance Drone (Main Corridor)
  - [ ] Ask about security door
  - [ ] Ask about escape pod
  - [ ] Ask what happened
  - [ ] Exit conversation
- [ ] Dr. Aria Chen (Crew Quarters)
  - [ ] What did you find?
  - [ ] How do we escape?
  - [ ] Why did SIGMA turn hostile?
  - [ ] Exit conversation

## ENEMIES (4)
- [ ] Sentry Droid (Airlock exit) - 40 HP
- [ ] Repair Bot (Engineering entry) - 55 HP
- [ ] Medical Unit (Medical Bay entry) - 35 HP
- [ ] Security Chief (Command Deck - BOSS) - 80 HP

## CONTAINERS
- [ ] Storage Chest (Storage Cage) - requires crowbar

## LOCKED DOORS
- [ ] security_door (Main Corridor→Research Lab) - keycard
- [ ] command_door (Control Hub→Command Deck) - control_cell

## PUZZLES
- [ ] terminal_puzzle (Control Hub)
- [ ] log_search_puzzle (Research Archive)

## COMMANDS TO TEST
- [ ] look, look <item>
- [ ] north/south/east/west (n/s/e/w)
- [ ] take <item>
- [ ] drop <item>
- [ ] inventory (i/inv/inven)
- [ ] use <item>
- [ ] use <item> on <target>
- [ ] talk <npc>
- [ ] status
- [ ] log, log <note>
- [ ] save
- [ ] load
- [ ] help (h/?)
- [ ] quit

## MECHANICS TO TEST
- [ ] Combat attack
- [ ] Combat defend (counter-attack)
- [ ] Combat use item
- [ ] Combat run
- [ ] Die and respawn
- [ ] Fog of war on map
- [ ] Door lock indicators on map
- [ ] Consumable feedback messages
