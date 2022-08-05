SRC1 = relay.c
OBJ1 = $(SRC1:.c=.o)
EXE = $(SRC1:.c=.e)

HFILES = relay.h
CFLAGS = -Wall -lpigpio -o

all : $(EXE)

$(EXE): $(OBJ1) $(HFILES)
	gcc $(CFLAGS) $(OBJ1) -o $(EXE)

$(OBJ1) : $(SRC1) $(HFILES)
	gcc -c $(CFLAGS) $(SRC1) -o $(OBJ1)
	
