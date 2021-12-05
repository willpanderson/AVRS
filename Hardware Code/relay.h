// relay to GPIO interpretation software
//
// Sean Slater (c) 2021
// AVRS team CSE senior design
// intended for raspberry pi 4 model B
//
// pinouts as follows:
// GPIO		-> relay
// ---------------------
// GPIO21 	-> IN1
// GPIO26 	-> IN2
// GPIO20 	-> IN3
// GPIO19 	-> IN4
// GPIO16 	-> IN5
// GPIO13 	-> IN6
// GPIO06 	-> IN7
// GPIO12 	-> IN8

// INCLUDES
#include <stdio.h>
#include <unistd.h>
#include <pigpio.h>

// DEFINES
#define NUM_OF_RELAYS 8					// number of relays in system
#define MAX_WAIT_DUR 					// maximum wait time before system gives up vending

// GLOBAL VARIABLES
int gpio_pins[8] = {21, 26, 20, 19, 16, 13, 6, 12};	// int array of each GPIO pin, index being relay number

int initGPIO();						// initialize the GPIO
int setRelay(int relay_number, int value);		// sets the specified relay to the specified value
int closeGPIO();					// close GPIO, reset to defaults
