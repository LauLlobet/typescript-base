describe("Mars Rover", () => {
  it("should always start the rover at position 0:0:N", () => {
    const rover = new Rover();

    expect(rover.getPosition()).toBe("0:0:N");
  });

  it.each([
    ["M", "0:1:N"],
    ["MM", "0:2:N"],
    ["MMMMMMMMMM", "0:0:N"],
    ["MMMMMMMMMMM", "0:1:N"],
    ["R", "0:0:E"],
    ["RR", "0:0:S"],
    ["RRR", "0:0:W"],
    ["RRRR", "0:0:N"],
    ["L", "0:0:W"],
    ["LL", "0:0:S"],
    ["LLL", "0:0:E"],
    ["LLLL", "0:0:N"],
    ["RRM", "0:9:S"],
  ])("when given %s it should return %s", (input, output) => {
    const rover = new Rover();
    rover.execute(input);
    expect(rover.getPosition()).toBe(output);
  });
});


//-------------------- IMPLEMENTATION

type Direction = "N" | "E" | "S" | "W";

enum Command {
  Move = "M",
  TurnLeft = "L",
  TurnRight = "R",
}
export class Rover {
  private positionY = 0;
  private direction: Direction = "N";


execute(input: string) {
  const commands: string[] = input.split("");

  commands.forEach((command) => {
    if (this.isMoveCommand(command)) {
      if (this.direction === "N") {
        this.moveNorth();
      }
      if (this.direction === "S") {
        this.moveSouth();
      }
    }
    if (this.isRightCommand(command)) {
      this.turnRight();
    }
    if (this.isLeftCommand(command)) {
      this.turnLeft();
    }
  });
}

  getPosition(): string {
    return `0:${this.positionY}:${this.direction}`;
  }

  private isMoveCommand(command: string): boolean {
    return command === Command.Move;
  }

  private isLeftCommand(command: string): boolean {
    return command === Command.TurnLeft;
  }

  private isRightCommand(command: string): boolean {
    return command === Command.TurnRight;
  }

  private isAtNorthBoundary(): boolean {
    return this.positionY === 9;
  }

  private turnRight() {
    const nextDirection: Record<Direction, Direction> = {
      N: "E",
      E: "S",
      S: "W",
      W: "N",
    };

    this.direction = nextDirection[this.direction];
  }

  private turnLeft() {
    const nextDirection: Record<Direction, Direction> = {
      N: "W",
      W: "S",
      S: "E",
      E: "N",
    };

    this.direction = nextDirection[this.direction];
  }


  private moveNorth() {
    if (this.isAtNorthBoundary()) {
      this.positionY = 0;
    } else {
      this.positionY++;
    }
  }

  private moveSouth() {
    if (this.positionY === 0) {
      this.positionY = 9;
    } else {
      this.positionY--;
    }
  }
}
