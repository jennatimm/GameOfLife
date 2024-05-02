
class Automata {
    constructor(game) {
        this.cellWall = [];
        this.renewCells = [];
        this.count = 0;
        this.width = 200;
        this.height = 200;
        this.speed = 20;
        this.start = true;
        this.fillPattern = 1;
        for(let w = 0; w < this.width; w++) {
            this.cellWall[w] = [];
            this.renewCells[w] = [];
            for(let h = 0; h < this.height; h++){
                this.cellWall[w][h] = 0;
                this.renewCells[w][h] = 0;
            }
        }
        this.fillRandomly();

        document.getElementById("start").addEventListener("click", e=> {
            this.start = true;
        })
        
        document.getElementById("pause").addEventListener("click", e=> {
            this.start = false;
        })

        document.getElementById("reset").addEventListener("click", e=> {
            this.pickFill();
            this.start = false;
        })

        document.getElementById("random").addEventListener("click", e=> {
            this.fillPattern = 1;
            this.pickFill();
            this.start = false;
        })
        
        document.getElementById("death").addEventListener("click", e=> {
            this.fillPattern = 2;
            this.pickFill();
            this.start = false;
        })

        document.getElementById("lines").addEventListener("click", e=> {
            this.fillPattern = 3;
            this.pickFill();
            this.start = false;
        })

        document.getElementById("race").addEventListener("click", e=> {
            this.fillPattern = 4;
            this.pickFill();
            this.start = false;
        })
    };

    pickFill(){
        if (this.fillPattern == 1) {
            this.fillRandomly();
        } else if (this.fillPattern == 2) {
            this.quickDeath();
        }else if (this.fillPattern == 3) {
            this.lines();
        } else if (this.fillPattern == 4) {
            this.racingVibe();
        }
    }

    fillRandomly(){
        for(let w = 1; w < this.width - 1; w++) {
            for(let h = 1; h < this.height - 1; h++){
                this.cellWall[w][h] = this.random();
            }
        }
    };


    lines(){
        let one = true;
        let val = 2;
        for(let w = 1; w < this.width - 1; w++) {

            for(let h = 1; h < this.height - 1; h++){
                one = !one;
                val = (one) ? 3: 5;
                this.cellWall[w][h] = (h % val == 0) ? 1: 0;
            }
        }
    };

    racingVibe(){
        let one = true;
        let val = 2;
        for(let w = 1; w < this.width - 1; w++) {
            one = !one;
            for(let h = 1; h < this.height - 1; h++){
                val = (one) ? 2: 5;
                this.cellWall[w][h] = (h % val == 0) ? 1: 0;
            }
        }
    };

    quickDeath(){
        let one = true;
        let val = 2;
        for(let w = 1; w < this.width - 1; w++) {
            one = !one;
            for(let h = 1; h < this.height - 1; h++){
                val = (one) ? 2: 5;
                this.cellWall[w][h] = (h % val == 0) ? 0: 1;
            }
        }
    };


    draw(cellShell) {
        for(let w = 0; w < this.width; w++) {
            for(let h = 0; h < this.height; h++){
                if (this.cellWall[w][h]) {cellShell.fillRect((w - 1) * 8, (h - 1) * 8, 7, 7);}
            }
        }
    };



    update() {
        this.speed = parseInt(document.getElementById("speed").value, 20);
        if (this.start){
            let oldCells = this.cellWall;
            this.count++;
            if (this.count % this.speed == 0){
                for(let w = 1; w < this.width - 1; w++) {
                    for(let h = 1; h < this.height - 1; h++){
                        let fate = this.godsChoice(w, h, this.cellWall);
                        this.renewCells[w][h] = fate;
                    }
                }
                this.cellWall = this.renewCells;
                this.renewCells = oldCells;
            }
        }

    };

    // Any live cell with fewer than two live neighbors dies, as if by underpopulation. < 2 dies
    // Any live cell with two or three live neighbors survives to the next generation. 2 or 3 lives
    // Any live cell with more than three live neighbors dies, as if by overpopulation. > 3 dies
    // Any dead cell with exactly three live neighbors becomes alive, as if by reproduction. 3 lives
    godsChoice(w, h, c) {
        let isAlive = c[w][h];
        let neighborsCount = c[w - 1][h + 1] + c[w - 1][h] + c[w - 1][h - 1] +
                             c[w][h + 1]                   + c[w][h - 1] +
                             c[w + 1][h + 1] + c[w + 1][h] + c[w + 1][h - 1];

        if (neighborsCount < 2 || neighborsCount > 3) {
            isAlive = 0;
        } else if (neighborsCount == 3){
            isAlive = 1;
        }
        return isAlive;
    };

    random() {
        let r = Math.random();
        if (r > 0.5) {
            r = 1;
        } else {
            r = 0;
        }
        return r;
    };
};
