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
// GPIOXX	-> IR_T
// GPIOXX	-> IR_R

// INCLUDES
#include <stdio.h>
#include <unistd.h>
#include <pigpio.h>

// DEFINES
#define NUM_OF_RELAYS 8					// number of relays
#define NUM_OF_MOTORS 6					// number of motors
#define MAX_WAIT_DUR 10 				// maximum wait time in seconds

// GLOBAL VARIABLES
int gpio_pins[8] = {21, 26, 20, 19, 16, 13, 6, 12};
										// int array of each GPIO pin, index being relay number

int initGPIO();							// initialize the GPIO
int setRelay(int relay_number, int value);
										// sets the specified relay to the specified value (1 on, 0 off)
void testRelays();						// tests relays in order for operation
int vendItem(int item_num);				// vends one item, returns success / fail
int closeGPIO();						// close GPIO, reset to defaults
