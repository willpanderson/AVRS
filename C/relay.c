// relay to GPIO interpretation software
//
// Sean Slater (c) 2021
// AVRS team CSE senior design
// intended for raspberry pi 4 model B

// COMPILE COMMAND (PRE-CMAKE): gcc -Wall -o relay relay.c -lpigpio

// INCLUDES
#include "relay.h"

// FUNCTIONS
void _IRReceived() {
	// set IR_R flag true		// <-------------------------------------------- stopped here, might change this
}

int initGPIO() {
	if(!gpioInitialise())		// initialize the GPIO
		return 1;				// failed to initialize

	int i;
	for (i=0; i<NUM_OF_RELAYS; i++) {
								// iterate over relays
		gpioSetMode(gpio_pins[i], PI_OUTPUT);
								// set pin directions to output
								// might also need to set drive strength here
		gpioWrite(gpio_pins[i], 1);
								// set relay off
	}

	return 0;
}

int setRelay(int relay_number, int value) {
	if(relay_number < 0 || relay_number > NUM_OF_RELAYS)
								// check relay
		return 1;				// relay is out of range
	if(value < 0 || value > 1)	// check value
		return 1;				// value is out of range
	gpioWrite(gpio_pins[relay_number], !value);
								// set relay
	return 0;					// return success
}

void testRelays() {				// rotates through relays testing operation
	int i, j, k;				// ints for rotating through relays
	i = 0;						// reset i, start state is relay IN1
	j = 7;						// reset j, start state is relay IN8
	k = 0;						// reset k

	while (k<1) {				// loop through each relay and enable / disable each for 1s; 1 time
		setRelay(i, 1);			// set previous on
		setRelay(j, 0);			// set current off
		i++;					// increment current index
		j++;					// increment previous index

		if (i>5) {				// check if at end of array
			i = 0;				// reset index
			k++;
		}
		if(j>5)
			j = 0;
		usleep(1000000);		// wait for 1s *might not be interrupt safe!

	}
}

int vendItem(int item_num) {
	int was_vended;				// flag for vending status
	int x;						// wait counter
	
	setRelay(item_num, 1);		// set relay on
	// set timer
	// set IR_T
	was_vended = 0;				// set was_vended false
	x = 0;
	while (x < MAX_WAIT_DUR) {	// wait max duration
		sleep(1);
		x++;
	}
	setRelay(item_num, 0);		// set relay off
	// > receive IR_R flag, set was_vended true
	was_vended = 1;				// ~ remove this after interrupts are made
	if (was_vended) {			// check was_vended, exit un/successful
		return 0;				// vend successful
	} else {
		return 1;				// vend unsuccessful
	}
}

int closeGPIO() {
	int i;
	for (i=0; i<NUM_OF_RELAYS; i++) {
								// iterate over relays
		gpioWrite(gpio_pins[i], 1);
								// set relay off
	}

	gpioTerminate();			// stop GPIO

	return 0;
}

int main (int argc, char* argv[]) {
	if(initGPIO())				// initialize
		return 1;				// error initializing
	/* vvv code goes here vvv */

	if(vendItem(0)) {
		printf("vend fail\n");
		return 1;
	}
	
	printf("vend success\n");

	/* ^^^ code goes here ^^^ */
	closeGPIO();				// closes GPIO
	return 0;					// exit successful
}

