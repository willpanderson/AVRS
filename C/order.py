import tkinter as tk
from tkinter import *
from tkinter.ttk import *
import subprocess
import time
from sys import platform
if platform == "linux" or platform == "linux2":
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
if platform == "darwin":
    from tkmacosx import Button
import threading
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import subprocess
# initializations
if platform == "linux" or platform == "darwin":
    cred = credentials.Certificate('avrs-29e3d-firebase-adminsdk-ugvi2-7038743c0d.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

master=tk.Tk()
master.geometry("400x1280")
master.config(bg = 'green')

Gpiopins = [21, 26, 20, 19, 16, 13]

docs = db.collection(u'snacks').stream()
products = []

for doc in docs:
    products.append(f'{doc.id}')

def final_vend(select):
    RELAIS_1_GPIO = Gpiopins[select-1]
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RELAIS_1_GPIO, GPIO.OUT)
    GPIO.setup(5,GPIO.IN)
    vending = True
    while vending:
        if GPIO.input(5):
            GPIO.output(RELAIS_1_GPIO, GPIO.LOW)
        else:
            GPIO.output(RELAIS_1_GPIO,GPIO.HIGH)
            vending = False
    

def vends(select):
    checker = products[select-1]
    result = db.collection(u'snacks').document(checker).get().to_dict()
    total_result = result['Total']
    
    if total_result != 0:
        if platform == "linux":
            final_vend(select)
        total_result = total_result - 1
        db.collection(u'snacks').document(checker).update({'Total': total_result})
   
            
def disable_event():
    pass
def pickuptask():
        test = subprocess.Popen(["python3", "main.py"])
        
def exittask():
    for i in Gpiopins:
        GPIO.setup(i, GPIO.OUT)
        GPIO.output(i, GPIO.HIGH)
    GPIO.setup(5, GPIO.OUT)
    GPIO.output(5, GPIO.HIGH)
    GPIO.cleanup()
    master.destroy()

label1 = tk.Label( master,bg = 'green')
label1.place(x = 0, y = 0)


# Create label

x_res = 400
y_res = 1280
    
# Show image using label

label1 = tk.Label(master,bg = 'green',)
label1.place(x = 0, y = 0)

label1 = tk.Label(master,bg = 'green',)
label1.place(x = 0, y = 0)


num_b_w = 10
num_b_h = 8
b_b_w = 22
b_b_h = 7

num_b_text = 10
big_b_text = 8
font2 = ('Verdana', 20)

# Create label



button1=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="1",font = font2, command= lambda : vends(1)).grid(row=3,column=0)

button2=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="2",font = font2,command=  lambda : vends(2)).grid(row=3,column=1)

button3=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="3",font = font2,command=  lambda : vends(3)).grid(row=4,column=0)

button4=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="4",font = font2,command=  lambda : vends(4)).grid(row=4,column=1)

button5=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="5",font = font2,command=  lambda : vends(5)).grid(row=5,column=0)

button6=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="6",font = font2,command=  lambda : vends(6)).grid(row=5,column=1)

button11=tk.Button(master,width=b_b_w, height=b_b_h,bg = 'green', text="Order Pick Up?",font = font2,command=  lambda : pickuptask()).grid(columnspan = 2)

button12=tk.Button(master,width=b_b_w, height=b_b_h, text="Return to Main Menu",bg = 'red',font = font2,command=  lambda : exittask()).grid(columnspan = 2)





master.protocol("WM_DELETE_WINDOW", disable_event)
#master.attributes('-type', 'dock')
master.wm_attributes('-fullscreen','true')
master.mainloop()





