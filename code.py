import sys
import math
import random
from random import choices
import fileinput
from collections import defaultdict
import glob, os 

def main():
    word = "I'm blue da ba dee da ba daa "
    third_law = "For every action there is an equal and opposite reaction."
    num_law = 3

    #for i in range(0, 50):
        #word += (" daa ", " ba ", " dee ")
    print(word)
    a = 2
    b = 3
    print(a+b)
    if num_law == 3:
      print(third_law)
    

#Charles Daniels told me this is good practice during an ACM meeting
if __name__ == "__main__":
    main()