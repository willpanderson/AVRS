import subprocess
import time
from sys import platform
import math
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from firebase_admin import auth
from getpass import getpass


def program_exit():
    exit()
def program_failure():
    print("I'm sorry, but we could not process your request. Please try again later")
    
# initializations
import urllib.request
def connect(host='http://www.uta.edu'):
    try:
        urllib.request.urlopen(host)
    except:
        print("No Internet Connection. Please check the connection and try again later.")
        print("Exiting Service Portal......")
        program_exit()

if platform == "linux" or platform == "darwin":
    cred = credentials.Certificate('avrs-29e3d-firebase-adminsdk-ugvi2-7038743c0d.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    docs = db.collection(u'snacks').stream()
    products = []

    for doc in docs:
        products.append(f'{doc.id}')


def order_place():
    exit_test = 0;
    Order = math.floor(100000 + random.random() * 900000)
    Snacks = []
    
    
    while exit_test != 1:
        item = input("Please enter the Item Name: ")
        amount= int(input("Please enter the amount of items you want: "))
        for i in range(0,amount):
            result = db.collection(u'snacks').document(item).get().to_dict()
            total_result = result['Total]
            reserved_result = result["Reserved"]
            if total_result <= 0 or reserved_result >= total_result:
                print("Item is Unavailable to Order at this time")
            else:
                db.collection('snacks').document(item).set({'Total': total_result-1,'Reserved': reserved_result+1})
                Snacks.append(item)
        exit_test = int(input("Want another snack? (0- yes, 1- no) :"))
        if exit_test == 1:
            break
    result = db.collection('orders').document(str(Order)).set({'Snacks': Snacks})
        
        

def item_refill():
    print("Selection")
    
def inventory_check():
    docs = db.collection(u'snacks').stream()
    try:
        for doc in docs:
            print(f'{doc.id} => {doc.to_dict()}')
    except:
        print("I'm sorry, but we could not process your request. Please try again later")
def order_list():
    try:
        order_docs = db.collection(u'orders').stream()

        for doc in docs:
            print(f'{order_doc.id} => {order_doc.to_dict()}')
        
    except:
        program_failure()
        
        
def order_remove():
    remove_order = input("Please enter the Order # to Remove: ")
    
    try:
        docs = db.collection(u'orders').document(str(remove_order)).delete()
    
    except:
        program_failure()
    
def item_remove():
    remove_item = input("Please enter the Item Name to Remove: ")
    
    try:
        docs = db.collection(u'snacks').document(str(remove_item)).delete()
    
    except:
        program_failure()
        
def item_install():
    name = input("Please enter a name for the new snack: ")
    total = input("Please enter the amount of snacks added:")
    data = {
    'Reserved': 0,
    'Total': int(total),
    }
    
    try:
        db.collection(u'snacks').document(name).set(data)
    
    except:
        program_failure()

def user_add():
    email_input = input("Please enter a email: ")
    secret = getpass("Please enter a password: ")
    name_input = input("Please enter a display name: ")
    
    user = auth.create_user(
    email= email_input,
    email_verified=False,
    password= secret,
    display_name= name_input)
    print('Sucessfully created new user: {0}'.format(user.display_name))
    
def user_removal():
    email = input("Please enter the email account associsted with the account you want to delete: ")
    user = auth.get_user_by_email(email)
    auth.delete_user(user.uid)
    print('Successfully deleted user')
    

def list_users():
# Iterate through all users. This will still retrieve users in batches,
# buffering no more than 1000 users in memory at a time.
    for user in auth.list_users().iterate_all():
        print('User: ' + format(user.display_name) + ' ' + format(user.email))
    


def main():
    connect()
    select = 0
    while select != 11:
        print("\n")
        print("****WELCOME TO THE Automated Vending and Reservation (AVRS) SERVICE PORTAL*****")
        print("\n")
        print("1. Place Order Test")
        print("2. List all Orders")
        print("3. Check Inventory Level")
        print("4. Refill Inventory for Items")
        print("5. Remove Orders from System")
        print("6. Remove Items from System")
        print("7. Add Items to the System")
        print("8. Remove User from System")
        print("9. Add User to the System")
        print("10. List all Users")
        print("11. Exit\n")
        select = int(input("Please select an option from the above menu: "))
        if select == 1:
            order_place()
        elif select == 2:
            order_list()
        elif select == 3:
            inventory_check()
        elif select == 4:
            item_refill()
        elif select == 5:
            order_remove()
        elif select == 6:
            item_remove()
        elif select == 7:
            item_install()
        elif select == 8:
            user_removal()
        elif select == 9:
            user_add()
        elif select == 10:
            list_users()
        elif select == 11:
            program_exit()
        else:
            print("Invalid choice")
        
if __name__ == "__main__":
    main()
