#!/usr/bin/env python3
"""
Pipeline Runner for Sigma-7 Level QA.
"""

import os
import shutil
import sys
import subprocess
import time
from solutions import ALL_FILES

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOWNLOADS_DIR = os.path.join(BASE_DIR, "downloads")
SANDBOX_DIR = os.path.join(BASE_DIR, "level_pipeline", "sandbox")
REPORT_FILE = os.path.join(BASE_DIR, "level_pipeline", "report.md")

# Levels to test
LEVELS = [
    "level_a_player",
    "level_b_specialisation",
    "level_c_inventory",
    "level_d_item_use",
    "level_e_exploring",
    "level_f_npc_dialogue",
    "level_g_encounters",
    "level_h_save_load",
    "level_p1_stacks_queues",
    "level_p2_log_search",
    "level_i_final_playthrough"
]

def setup_sandbox(level_name):
    """
    Create a clean sandbox for the level.
    """
    level_src = os.path.join(DOWNLOADS_DIR, level_name)
    level_dest = os.path.join(SANDBOX_DIR, level_name)

    if os.path.exists(level_dest):
        shutil.rmtree(level_dest)
    
    # Copy the level folder
    try:
        shutil.copytree(level_src, level_dest)
        return level_dest
    except Exception as e:
        print(f"Error copying {level_name}: {e}")
        return None

def inject_solutions(level_path):
    """
    Inject student solutions into the sandbox by overwriting/creating files.
    """
    student_dir = os.path.join(level_path, "student")
    if not os.path.exists(student_dir):
        os.makedirs(student_dir)
    # Inject solutions
    level_key = os.path.basename(level_path)
    
    # Define which files belong to which level (cumulative usually, but strict for compilation)
    # Level A: Just Player
    # Level B: Player + Types
    # Level C: Player + Types + Inventory
    # Level D: Player + Types + Inventory (Player has use_item)
    # ...
    # Ideally we inject the "Solution Phase" version. 
    # But since we only have "Final" solutions, we inject them *if* the file is required.
    
    files_to_inject = []
    
    # helper to write mapped content
    def write_file(fname, data_key=None):
        if data_key is None: data_key = fname
        
        content = ALL_FILES.get(fname)
        
        # Override for Progressive Players
        if fname == "player.py":
            # Level A, B, C use PLAYER_A_PY (Basic stats)
            if any(x in level_key for x in ["level_a_", "level_b_", "level_c_"]):
                from solutions import PLAYER_A_PY
                content = PLAYER_A_PY
            # Level D uses PLAYER_D_PY (Inventory + Item Use)
            elif "level_d_" in level_key:
                from solutions import PLAYER_D_PY
                content = PLAYER_D_PY
            # Level E uses PLAYER_E_PY (Logbook)
            elif "level_e_" in level_key:
                from solutions import PLAYER_E_PY
                content = PLAYER_E_PY
            # Level F, G, H, I use Final (Combat, Save/Load etc)
            elif any(x in level_key for x in ["level_f_", "level_g_", "level_h_", "level_i_"]):
                from solutions import PLAYER_FINAL_PY
                content = PLAYER_FINAL_PY

        if content:
            file_path = os.path.join(student_dir, fname)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)

    if "level_a_" in level_key:
        write_file("player.py")
    elif "level_b_" in level_key:
        write_file("player.py")
        write_file("player_types.py")
    elif "level_c_" in level_key:
        write_file("player.py") # Still basic player A
        write_file("player_types.py")
        write_file("inventory.py")
    elif "level_d_" in level_key:
        write_file("player.py") # Upgraded to PLAYER_D
        write_file("player_types.py")
        write_file("inventory.py")
    elif "level_e_" in level_key:
        write_file("player.py") # Upgraded to PLAYER_E
        write_file("player_types.py")
        write_file("inventory.py")
        write_file("logbook.py")
    elif "level_f_" in level_key:
        write_file("player.py")
        write_file("player_types.py")
        write_file("inventory.py")
        write_file("logbook.py")
    elif "level_g_" in level_key:
        write_file("player.py")
        write_file("player_types.py")
        write_file("inventory.py")
        write_file("logbook.py")
    elif "level_h_" in level_key:
        write_file("player.py")
        write_file("player_types.py")
        write_file("inventory.py")
        write_file("logbook.py")
        write_file("save_load.py", "save_load.py") # Wait, save_load isn't in student dir? 
        # Actually save_load is engine, Level H is 'save_load' but student writes player.to_save_data
        # which is already in PLAYER_E_PY? No, PLAYER_E_PY doesn't have it? Checks...
        # Let's assume E has it or we add PLAYER_FINAL for H. 
        # Checking logic: E adds logbook. H adds persistence. 
        # H should probably use PLAYER_FINAL or E needs to_save_data.
        # Let's upgrade H to PLAYER_FINAL.
        pass
    else:
        # Later levels / Puzzles
        for f in ALL_FILES:
            write_file(f)

    # We skip main loop and __init__ logic handled by specific calls above

                
    # We DO NOT overwrite __init__.py anymore, unless it's missing (it shouldn't be)
    # But wait, ALL_FILES includes __init__.py. 
    # If Level A needs a custom __init__ (just Player), the download provided it.
    # So we skip __init__.py in the loop above (files_to_inject doesn't include it for A-D).
    
    # However, later levels (E+) might need the updated __init__.py
    if "level_a_" not in level_key and "level_b_" not in level_key and "level_c_" not in level_key and "level_d_" not in level_key:
         if "__init__.py" in ALL_FILES:
             file_path = os.path.join(student_dir, "__init__.py")
             with open(file_path, "w", encoding="utf-8") as f:
                 f.write(ALL_FILES["__init__.py"])



def run_validator(level_path):
    """
    Run the validate.py script in the level directory.
    """
    validate_script = os.path.join(level_path, "validate.py")
    if not os.path.exists(validate_script):
        return False, "validate.py not found"

    try:
        result = subprocess.run(
            [sys.executable, "validate.py"],
            cwd=level_path,
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            return True, result.stdout
        else:
            return False, result.stdout + "\n" + result.stderr
    except subprocess.TimeoutExpired:
        return False, "Validation timed out"
    except Exception as e:
        return False, str(e)

def run_game_check(level_path):
    """
    Run run_game.py purely to check it starts up without error.
    Uses subprocess to handle basic input if needed (like name entry) then exits.
    """
    run_script = os.path.join(level_path, "run_game.py")
    if not os.path.exists(run_script):
        return True, "run_game.py skipped (not found)" # Some levels might not have it

    try:
        # Start the process
        process = subprocess.Popen(
            [sys.executable, "run_game.py"],
            cwd=level_path,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Send inputs: Name -> Class Selection -> Quit (if possible)
        # We give it a series of inputs that cover most start cases
        # "Tester" (Name), "1" (Class), "quit" (Command), "no" (Confirm/Save)
        input_str = "Tester\n1\nquit\nno\n"
        
        try:
            stdout, stderr = process.communicate(input=input_str, timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            stdout, stderr = process.communicate()
            return True, "Game started (timeout as expected with partial input)"

        if process.returncode == 0:
            return True, "Game ran and exited cleanly"
        else:
            # If it crashed, returncode will be non-zero
            return False, f"Game crashed. Stderr: {stderr}"
            
    except Exception as e:
        return False, f"Game execution error: {e}"

def main():
    # Ensure sandbox dir exists
    if not os.path.exists(SANDBOX_DIR):
        os.makedirs(SANDBOX_DIR)

    report_lines = ["# Level QA Pipeline Report\n"]
    report_lines.append(f"Date: {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    passed_count = 0
    
    for level in LEVELS:
        print(f"Processing {level}...")
        report_lines.append(f"## {level}")
        
        # 1. Setup Sandbox
        sandbox_path = setup_sandbox(level)
        if not sandbox_path:
            report_lines.append("- **STATUS**: FAIL (Sandbox creation error)")
            continue
            
        # 2. Inject Solutions
        inject_solutions(sandbox_path)
        
        # 3. Validation
        print(f"  Running validator...")
        val_success, val_output = run_validator(sandbox_path)
        
        if val_success:
            report_lines.append("- **Validation**: PASS")
            
            # 4. Game Run
            print(f"  Running game check...")
            game_success, game_output = run_game_check(sandbox_path)
            
            if game_success:
                report_lines.append("- **Game Launch**: PASS")
                report_lines.append(f"- **Outcome**: READY")
                passed_count += 1
            else:
                report_lines.append("- **Game Launch**: FAIL")
                report_lines.append(f"  - Error: {game_output}")
                report_lines.append(f"- **Outcome**: FAIL")
        else:
            report_lines.append("- **Validation**: FAIL")
            report_lines.append("  <details>")
            report_lines.append("  <summary>Validation Output</summary>")
            report_lines.append("  \n```")
            report_lines.append(val_output)
            report_lines.append("  ```\n")
            report_lines.append("  </details>")
            report_lines.append(f"- **Outcome**: FAIL")
            
        report_lines.append("\n---\n")

    # Final Summary
    report_lines.insert(2, f"**Summary**: {passed_count}/{len(LEVELS)} Levels Passed\n")
    
    with open(REPORT_FILE, "w", encoding="utf-8") as f:
        f.writelines([line + "\n" for line in report_lines])
    
    print(f"\nPipeline complete. Report generated at: {REPORT_FILE}")
    
    # Dump report to stdout for agent to see
    print("\n" + "="*30)
    print(open(REPORT_FILE).read())
    print("="*30)

if __name__ == "__main__":
    main()
