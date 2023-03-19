
// type EngineConfig = {
    
// }

export interface RenderObjectRect{
    x: number,
    y: number,
    w: number,
    h: number,
    color: string | CanvasGradient | CanvasPattern,
}


export interface EngineRender {
    fillRect: (x: number,y: number,w: number,h: number, color:string | CanvasGradient | CanvasPattern) => void,
    objectRect: (object:RenderObjectRect) => void,
    canvas: {width: number, height: number}
}

export interface EngineInput {
    keys: string[]
}


export interface EngineConfig {
    functions: {
        ready: (render:EngineRender) => void,
        update: (render:EngineRender, input:EngineInput) => void,
    }
}

export default class Engine {
    private canvas!: CanvasRenderingContext2D
    private config!: EngineConfig;

    init = (canvas: CanvasRenderingContext2D, config: EngineConfig) => {
        this.canvas = canvas
        this.config = config


        const render:EngineRender = {
            fillRect: (x: number,y: number,w: number,h: number, color:string | CanvasGradient | CanvasPattern) => {
                this.canvas.fillStyle = color
                this.canvas.fillRect(x,y,w,h)
            },
            objectRect: (object:RenderObjectRect) => {
                this.canvas.fillStyle = object.color
                this.canvas.fillRect(object.x,object.y,object.w,object.h)
            },
            canvas: {
                width: this.canvas.canvas.width,
                height: this.canvas.canvas.height
            }
        }

        
        let input_data: string[] = inputhandler()
        



        this.config.functions.ready(render)
        
        let input:EngineInput = {
            keys: input_data
        }

        window.setInterval(() => { this.config.functions.update(render,input) },13)
        
    }


    collisions = collisionhandler
}


const clamp = (num:number, min:number, max:number) => Math.min(Math.max(num, min), max);

const collisionhandler = {
    simplerect: (object1:RenderObjectRect,object2:RenderObjectRect):boolean => {
        if ((object1.x + object1.w) > object2.x && object1.x < (object2.x + object2.w)) {

            if ((object1.y + object1.h) > object2.y && object1.y < (object2.y + object2.h)) return true

        }
        return false
    },

    advancedrect: (object1:RenderObjectRect,object2:RenderObjectRect):{side: string,depth:number} => {
        // left/right detection
        if ((object1.x + object1.w) > object2.x && object1.x < (object2.x + object2.w)) {
            // top/down detection
            if ((object1.y + object1.h) > object2.y && object1.y < (object2.y + object2.h)) {
                // side detection (bigger wins)


                return collsidetetect(
                    object1.x,object1.y,object1.w,object1.h,
                    object2.x,object2.y,object2.w,object2.h
                    );

            }
            
        }
        return {side: "none",depth: 0}
    }

}




const collsidetetect = (x1:number,y1:number,w1:number,h1:number,x2:number,y2:number,w2:number,h2:number):{side: string,depth:number} => {
    // Modified version of:
    // https://stackoverflow.com/questions/56606799/how-to-detect-the-side-on-which-collision-occured

    let object1_Half = { x: (w1 /2), y: (h1 /2)}
    let object2_Half = { x: (w2 /2), y: (h2 /2)}

    let object1_center = { x: (x1 + w1/2), y: (y1 + h1/2)}

    let object2_center = { x: (x2 + w2/2), y: (y2 + h2/2)}

    let diff = {
        x: object1_center.x - object2_center.x,
        y: object1_center.y - object2_center.y
    }

    let minDist = {
        x: object1_Half.x + object2_Half.x,
        y: object1_Half.y + object2_Half.y
    }

    let depth = {
        x: diff.x > 0 ? minDist.x - diff.x : -minDist.x - diff.x,
        y: diff.y > 0 ? minDist.y - diff.y : -minDist.y - diff.y,
    }

    if(depth.x != 0 && depth.y != 0){
        if(Math.abs(depth.x) < Math.abs(depth.y)){
          // Collision along the X axis. React accordingly
          if(depth.x > 0){
            return {side: "left",depth: depth.x}
              
          }
          else{
                return {side: "right",depth: depth.x}
          }
        }
        else{
          // Collision along the Y axis.
          if(depth.y > 0){
                return {side: "up",depth: depth.y}
          }
          else{
                return {side: "down",depth: depth.y}
          }
        }
      }
    return {side: "none",depth: 0}
}




const inputhandler = () => {
    let input_data: string[] = []
    window.onkeydown= (egin) => {
        if (input_data.indexOf(egin.key) === -1) {
            input_data.push(egin.key)
        }
    }

    window.onkeyup= (egin) => {

        const index = input_data.indexOf(egin.key);
        if (index > -1) { // only splice array when item is found
            input_data.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
    return input_data
}


const renderhandler = {

}