# First Programming Task

## Task description

### Roomies App (like Besties!)

* 60 school-aged children; 31 boys, 29 girls
* 10 dorm rooms, 4-8 children in each room
* Same-sex rooms only!
* Kicker: Each child can have a besties list of up to 4 roomates, and everyone is guaranteed at least 1 roommate from his/her besties list `assuming same-sex besties`
* Management needs this app completed, tested and launched by the end of the day!


## Planning

### Needs:
    *   Input list of children's names
        * Do we have both name and gender to start?
    *   For each of 60 children
        * identify child (login?)
        * input and store sex (gender identity?) for each child
            * include information: children will be assigned to same-sex rooms
        * input and store besties list with 0 to 4 besties
            * have them choose from registered children of the same sex, assuming we have sex information
        * edge case = intersex child
            * default to gender identity?
    * Develop algorithm to assign children a room
        * 10 rooms are available
        * must be same-sex
        * 4-8 children per room
        * case: besties of different sex/gender
            * ignore besties of different gender 
        * case: 0 besties
            * easy! place these people last
        * case: 1 bestie
            * must room with this bestie
        * case: 2, 3 or 4 besties
            * must room with at least one bestie
    * Test results
        * each child must be in a room with at least one bestie
        * optimize?
            * maximize number of besties placed together
            * equal numbers of children in each room
    * Details
        * make this nonspecific to the numbers of boys and girls
        * is there always a solution?
        * optimize to maximize the number of besties placed together?
        * assume: this is two problems: 5 rooms with boys in them, and 5 rooms with girls in them