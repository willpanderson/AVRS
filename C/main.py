import tkinter as tk
from tkinter import *
from tkinter.ttk import *
import time
from sys import platform
if platform == "linux" or platform == "linux2":
    import RPi.GPIO as GPIO
    GPIO.setmode(GPIO.BCM)
if platform == "darwin":
    from tkmacosx import Button

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import subprocess
# initializations
if platform == "linux" or platform == "darwin":
    cred = credentials.Certificate('avrs-29e3d-firebase-adminsdk-ugvi2-7038743c0d.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

def disable_event():
    pass



master=tk.Tk()
master.geometry("400x1280")
master.config(bg = 'green')


Gpiopins = [21, 26, 20, 19, 16, 13, 6, 12]
GPIOInterrupt = 5

"""SnackList = [Gum, Lays, Peanuts, Skittles, Snickers, Twinkies]"""
if platform == "linux" or platform == "darwin":
    docs = db.collection(u'snacks').stream()
    products = []

    for doc in docs:
        products.append(f'{doc.id}')
 
def final_vend(mapper,text1):
        GPIO.setmode(GPIO.BCM)
        for d in range(len(mapper)):
            name = mapper[d]
            select = products.index(name)
            if platform == "linux" or platform == "linux2":
                RELAIS_1_GPIO = Gpiopins[select]
                GPIO.setup(RELAIS_1_GPIO, GPIO.OUT)
                GPIO.output(RELAIS_1_GPIO, GPIO.LOW)
                GPIO.setup(5, GPIO.IN)
                vending = True
                while vending:
                    print(GPIO.input(5))
                    if GPIO.input(5):
                        GPIO.output(RELAIS_1_GPIO, GPIO.LOW)
                    else:
                        GPIO.output(RELAIS_1_GPIO, GPIO.HIGH)
                        vending = False
                time.sleep(2)
                print(Gpiopins[select])
        print("Finished Vending.")
            #db.collection('orders').document(text1).delete()

def vends(select):
    if select == -1:
        text1 = T.cget("text")
        if text1 == '0000':
            master.destroy()
            for i in Gpiopins:
                GPIO.setup(i, GPIO.OUT)
                GPIO.output(i, GPIO.HIGH)
        result = db.collection('orders').document(text1).get()
        if result.exists:
            on_result = result.to_dict()
            mapper = list(on_result['Snacks'])
            final_vend(mapper,text1)
            T.after(3000, vends(-2))
        
            
        else:
            T.after(3000, vends(-2))
            T.configure(bg = 'red')
            master.config(bg = 'red')
            
    elif select == -2:
        select2 = ""
        T.configure(text = select2)
        T.configure(bg = 'green')
        master.config(bg = 'green')
        
    else:
        text2 = T.cget("text") + str(select)
        T.configure(text = text2)


x_res = 400
y_res = 1280
    
# Show image using label

label1 = tk.Label(master,bg = 'green',)
label1.place(x = 0, y = 0)

def exittask():
    for i in Gpiopins:
        GPIO.setup(i, GPIO.OUT)
        GPIO.output(i, GPIO.HIGH)
    GPIO.setup(5, GPIO.OUT)
    GPIO.output(5, GPIO.HIGH)
    GPIO.cleanup()
    master.destroy()

num_b_w = 10
num_b_h = 4
b_b_w = 22
b_b_h = 5

num_b_text = 10
big_b_text = 8
font2 = ('Verdana', 20)

# Create label

T = tk.Label(master, width = b_b_w, height = (b_b_h)+4, bg = "green", text = "",font = ('Verdana', 15))

T.grid(columnspan = 2)

button1=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="1",font = font2, command= lambda : vends(1)).grid(row=3,column=0)

button2=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="2",font = font2,command=  lambda : vends(2)).grid(row=3,column=1)

button3=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="3",font = font2,command=  lambda : vends(3)).grid(row=4,column=0)

button4=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="4",font = font2,command=  lambda : vends(4)).grid(row=4,column=1)

button5=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="5",font = font2,command=  lambda : vends(5)).grid(row=5,column=0)

button6=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="6",font = font2,command=  lambda : vends(6)).grid(row=5,column=1)

button7=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="7",font = font2,command=  lambda : vends(7)).grid(row=6,column=0)

button8=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="8",font = font2,command=  lambda : vends(8)).grid(row=6,column=1)

button9=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="9",font = font2,command=  lambda : vends(9)).grid(row=7,column=0)

button10=tk.Button(master,width=num_b_w, height=num_b_h,bg = 'blue', text="0",font = font2,command=  lambda : vends(0)).grid(row=7,column=1)

button11=tk.Button(master,width=b_b_w, height=b_b_h,bg = 'green', text="Pick Up Order",font = font2,command=  lambda : vends(-1)).grid(columnspan = 2)

button12=tk.Button(master,width=b_b_w, height=b_b_h, text="Return to Main Menu",bg = 'red',font = font2,command=  lambda : exittask()).grid(columnspan = 2)

master.protocol("WM_DELETE_WINDOW", disable_event)
#master.attributes('-type', 'dock')
master.wm_attributes('-fullscreen','true')
master.mainloop()
