import Engine, { EngineConfig, EngineInput, EngineRender, RenderObjectRect } from "./engine.js"

const gameConfig:EngineConfig = {
    functions: {
        ready: (render) => ready(render),
        update: (render,input) => update(render,input)
    }
}

const eng = new Engine()
window.onload = () => {
    const canvasElement: HTMLCanvasElement = (document.getElementById("game") as HTMLCanvasElement);
    const ctx = canvasElement.getContext("2d");
    
    if (ctx != null) {
       eng.init(ctx, gameConfig) 
    } else {
        alert("No canvas")
    }
    
}

// Game
let player:RenderObjectRect = {x: 0, y: 0,w: 50,h:50,color: "white"}

const player_speed = 5

let enemy:RenderObjectRect = {x: 0, y: 450,w: 280,h:100,color: "green"}
let enemy2:RenderObjectRect = {x: 360, y: 450,w: 250,h:50,color: "green"}


const ready = (canvas: EngineRender) => {
    console.log("ready");
    canvas.fillRect(1,1,50,50,"black")
}

let blackframe = 0

let grav = 0.5
var pvel = {x:0,y:0}
let onground = false
const update = (render:EngineRender,input:EngineInput) => {
    
    

    

    let coll = [
        enemy,
        enemy2,
    ]
    
    
    pvel.x = 0
    
    if (pvel.y > 1) onground = false

    input.keys.forEach(key => {
        if (key === "ArrowUp" && onground) {onground = false ;pvel.y = -20}
        // if (key === "ArrowDown") pvel.y = player_speed
        if (key === "ArrowLeft") pvel.x = -player_speed
        if (key === "ArrowRight") pvel.x = player_speed
    });

    player.x += pvel.x
    player.y += pvel.y
    
    coll.forEach((obj) => {
        
        let cl = eng.collisions.advancedrect(player,obj)
        let sensitivity = 0
        if (cl.side =="up" && pvel.y <= 0) {
            player.y += cl.depth
        }
        if (cl.side =="down" && pvel.y >= 0) {
            onground = true
            player.y += cl.depth
            pvel.y = 0
            
            
        } else {
            pvel.y += grav
        }
        if (cl.side == "left" && pvel.x <= 0) {
            player.x += cl.depth
        }
        if (cl.side =="right" && pvel.x >= 0) {
            player.x += cl.depth
        }
        
    }
    )


    if (pvel.y > 15) {
        pvel.y = 15
    }
    
    



    render.fillRect(0,0,render.canvas.width, render.canvas.height,"black")

    render.objectRect(player)
    render.objectRect(enemy)
    render.objectRect(enemy2)
}


        

const input = (canvas: CanvasRenderingContext2D, event: KeyboardEvent) => {
    console.log(event.key);
    
}
