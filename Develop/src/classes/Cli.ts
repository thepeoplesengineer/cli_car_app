import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// TODO: update the vehicles property to accept Truck and Motorbike objects as well
class Cli {
    vehicles: (Car | Truck | Motorbike)[];
    selectedVehicleVin: string | undefined;
    exit: boolean = false;

    // TODO: Update the constructor to accept Truck and Motorbike objects as well
    constructor(vehicles: (Car | Truck | Motorbike)[]) {
        this.vehicles = vehicles;
    }

    static generateVin(): string {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }

    chooseVehicle(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectedVehicleVin',
                message: 'Select a vehicle to perform an action on',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    };
                }),
            },
        ]).then((answers) => {
            this.selectedVehicleVin = answers.selectedVehicleVin;
            this.performActions();
        });
    }

    createVehicle(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'vehicleType',
                message: 'Select a vehicle type',
                // TODO: Update the choices array to include Truck and Motorbike
                choices: ['Car', 'Truck', 'Motorbike'],
            },
        ]).then((answers) => {
            if (answers.vehicleType === 'Car') {
                this.createCar();
            } else if (answers.vehicleType === 'Truck') {
                this.createTruck();
            } else if (answers.vehicleType === 'Motorbike') {
                this.createMotorbike();
            }
        });
    }

    createCar(): void {
        // Existing createCar method...
    }

    // TODO: Implement the createTruck method
    createTruck(): void {
        inquirer.prompt([
            { type: 'input', name: 'color', message: 'Enter Color' },
            { type: 'input', name: 'make', message: 'Enter Make' },
            { type: 'input', name: 'model', message: 'Enter Model' },
            { type: 'input', name: 'year', message: 'Enter Year' },
            { type: 'input', name: 'weight', message: 'Enter Weight' },
            { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
            { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
        ]).then((answers) => {
            const truck = new Truck(
                Cli.generateVin(),
                answers.color,
                answers.make,
                answers.model,
                parseInt(answers.year),
                parseInt(answers.weight),
                parseInt(answers.topSpeed),
                [],
                parseInt(answers.towingCapacity)
            );
            // TODO: push the truck to the vehicles array
            this.vehicles.push(truck);
            // TODO: set the selectedVehicleVin to the vin of the truck
            this.selectedVehicleVin = truck.vin;
            // TODO: perform actions on the truck
            this.performActions();
        });
    }

    // TODO: Implement the createMotorbike method
    createMotorbike(): void {
        inquirer.prompt([
            { type: 'input', name: 'color', message: 'Enter Color' },
            { type: 'input', name: 'make', message: 'Enter Make' },
            { type: 'input', name: 'model', message: 'Enter Model' },
            { type: 'input', name: 'year', message: 'Enter Year' },
            { type: 'input', name: 'weight', message: 'Enter Weight' },
            { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
            { type: 'input', name: 'frontWheelDiameter', message: 'Enter Front Wheel Diameter' },
            { type: 'input', name: 'frontWheelBrand', message: 'Enter Front Wheel Brand' },
            { type: 'input', name: 'rearWheelDiameter', message: 'Enter Rear Wheel Diameter' },
            { type: 'input', name: 'rearWheelBrand', message: 'Enter Rear Wheel Brand' },
        ]).then((answers) => {
            const motorbikeWheels = [
                new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
                new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand)
            ];
            const motorbike = new Motorbike(
                Cli.generateVin(),
                answers.color,
                answers.make,
                answers.model,
                parseInt(answers.year),
                parseInt(answers.weight),
                parseInt(answers.topSpeed),
                motorbikeWheels
            );
            // TODO: push the motorbike to the vehicles array
            this.vehicles.push(motorbike);
            // TODO: set the selectedVehicleVin to the vin of the motorbike
            this.selectedVehicleVin = motorbike.vin;
            // TODO: perform actions on the motorbike
            this.performActions();
        });
    }

    // TODO: add a parameter to accept a truck object
    findVehicleToTow(truck: Truck): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'vehicleToTow',
                message: 'Select a vehicle to tow',
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle,
                    };
                }),
            },
        ]).then((answers) => {
            const vehicleToTow = answers.vehicleToTow;
            // TODO: check if the selected vehicle is the truck
            if (vehicleToTow === truck) {
                console.log("A truck can't tow itself.");
            } else {
                // TODO: tow the selected vehicle then perform actions on the truck to allow the user to select another action
                truck.tow(vehicleToTow);
            }
            this.performActions();
        });
    }

    performActions(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Select an action',
                // TODO: add options to tow and wheelie
                choices: [
                    'Print details',
                    'Start vehicle',
                    'Accelerate 5 MPH',
                    'Decelerate 5 MPH',
                    'Stop vehicle',
                    'Turn right',
                    'Turn left',
                    'Reverse',
                    'Tow a vehicle',
                    'Do a wheelie',
                    'Select or create another vehicle',
                    'Exit',
                ],
            },
        ]).then((answers) => {
            const selectedVehicle = this.vehicles.find(vehicle => vehicle.vin === this.selectedVehicleVin);
            if (!selectedVehicle) return;

            switch (answers.action) {
                case 'Print details':
                    selectedVehicle.printDetails();
                    break;
                case 'Start vehicle':
                    selectedVehicle.start();
                    break;
                case 'Accelerate 5 MPH':
                    selectedVehicle.accelerate(5);
                    break;
                case 'Decelerate 5 MPH':
                    selectedVehicle.decelerate(5);
                    break;
                case 'Stop vehicle':
                    selectedVehicle.stop();
                    break;
                case 'Turn right':
                    selectedVehicle.turn('right');
                    break;
                case 'Turn left':
                    selectedVehicle.turn('left');
                    break;
                case 'Reverse':
                    selectedVehicle.reverse();
                    break;
                // TODO: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument.
                case 'Tow a vehicle':
                    if (selectedVehicle instanceof Truck) {
                        this.findVehicleToTow(selectedVehicle);
                    } else {
                        console.log('Only trucks can tow vehicles.');
                    }
                    return; // TODO: After calling the findVehicleToTow method, return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
                // TODO: add statements to perform the wheelie action only if the selected vehicle is a motorbike
                case 'Do a wheelie':
                    if (selectedVehicle instanceof Motorbike) {
                        selectedVehicle.wheelie();
                    } else {
                        console.log('Only motorbikes can do a wheelie.');
                    }
                    break;
                case 'Select or create another vehicle':
                    this.startCli();
                    return;
                case 'Exit':
                    this.exit = true;
                    break;
            }
            if (!this.exit) {
                this.performActions();
            }
        });
    }

    startCli(): void {
        inquirer.prompt([
            {
                type: 'list',
                name: 'CreateOrSelect',
                message: 'Would you like to create a new vehicle or perform an action on an existing vehicle?',
                choices: ['Create a new vehicle', 'Select an existing vehicle'],
            },
        ]).then((answers) => {
            if (answers.CreateOrSelect === 'Create a new vehicle') {
                this.createVehicle();
            } else {
                this.chooseVehicle();
            }
        });
    }
}

// TODO: export the Cli class
export default Cli;
