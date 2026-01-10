#!/usr/bin/env python3
"""
Sigma-7 Research Station - OOP Text Adventure

Run this file to play the game!

Usage:
    python run_game.py

This is the main entry point. The engine is in engine/, 
and student code (reference implementations) is in student_reference/.
"""

import sys
import os

# Add the current directory to path so imports work correctly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from engine.game_loop import Game


def main():
    """Main entry point."""
    try:
        game = Game()
        game.start()
    except KeyboardInterrupt:
        print("\n\nGame interrupted. Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"\n\nError: {e}")
        print("The game encountered an error. Please check your code.")
        sys.exit(1)


if __name__ == "__main__":
    main()
