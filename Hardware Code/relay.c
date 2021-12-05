// relay to GPIO interpretation software
//
// Sean Slater (c) 2021
// AVRS team CSE senior design
// intended for raspberry pi 4 model B

// INCLUDES
#include "relay.h"

// FUNCTIONS
int initGPIO() {
	if(!gpioInitialise())				// initialize the GPIO
		return 1;				// failed to initialize

	int i;
	for (i=0; i<NUM_OF_RELAYS; i++) {		// iterate over relays
		gpioSetMode(gpio_pins[i], PI_OUTPUT);	// set pin directions to output
							// might also need to set drive strength here
	}

	return 0;
}

int setRelay(int relay_number, int value) {
	if(relay_number < 0 || relay_number > NUM_OF_RELAYS)
							// check relay
		return 1;				// relay is out of range
	if(value < 0 || value > 1)			// check value
		return 1;				// value is out of range
	gpioWrite(gpio_pins[relay_number], value);	// set relay
	return 0;					// return success
}

int closeGPIO() {
	int i;
	for (i=0; i<NUM_OF_RELAYS; i++) {		// iterate over relays
		gpioWrite(gpio_pins[i], 1);		// set every relay off
	}

	gpioTerminate();				// stop GPIO

	return 0;
}

int main (int argc, char* argv[]) {
	if(initGPIO())					// initialize
		return 1;				// error initializing
	int i, j, k;
	i = 0;						// reset i, start state is relay IN1
	j = 7;						// reset j, start state is relay IN8
	k = 0;						// reset k
	while (k<10) {					// loop through each relay and enable / disable each for 1s; 10 times
		setRelay(i, 0);				// set previous low
		setRelay(j, 1);				// set current high
		i++;					// increment current index
		j++;					// increment previous index
		if (i>7) {				// check if at end of array
			i = 0;				// reset index
			k++;
		}
		if(j>7)
			j = 0;
		usleep(1000000);			// wait for 1s *might not be interrupt safe!
	}

	closeGPIO();					// closes GPIO

	return 0;					// exit
}
