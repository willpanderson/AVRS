import tkinter as tk

import subprocess
import time
from sys import platform
import threading
from tkinter import *
from tkinter import ttk
if platform == "linux" or platform == "linux2":
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
if platform == "darwin":
    from tkmacosx import Button

master=tk.Tk()
master.geometry("400x1280")
master.config(bg = 'green')


def vends(number):
 if number == 1:
    test = subprocess.Popen(["python3", "order.py"])
 if number == 2:
    test = subprocess.Popen(["python3", "main.py"])


num_b_w = 10
num_b_h = 6
b_b_w = 22
b_b_h = 6

num_b_text = 10
big_b_text = 8
font2 = ('Verdana', 20)

# Create label
T = tk.Label(master, width = b_b_w, height = (b_b_h)+4, bg = "green", text = "",font = ('Verdana', 15)).grid(columnspan = 2)

button1=tk.Button(master,width=b_b_w, height=num_b_w,bg = 'blue', text="Select Item",font = font2, command= lambda : vends(1)).grid(columnspan = 2)

s = tk.Label(master, width = b_b_w, height = 3, bg = "green", text = "",font = ('Verdana', 15)).grid(columnspan = 2)

button2=tk.Button(master,width=b_b_w, height=num_b_w,bg = 'blue', text="Pickup Order",font = font2,command=  lambda : vends(2)).grid(columnspan = 2)



#master.protocol("WM_DELETE_WINDOW", disable_event)
#master.attributes('-type', 'dock')
if platform == "darwin" or platform == "linux":
    master.wm_attributes('-fullscreen','true')
master.mainloop()







