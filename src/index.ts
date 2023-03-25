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
let player:RenderObjectRect = eng.object.createRect("player",0,0,50,50,"white")

const player_speed = 5

eng.world.createRect("f1",0,450,200,100,"green")
eng.world.createRect("f2",200,350,280,50,"green")
eng.world.createRect("f3",400,450,400,100,"green")
eng.world.createRect("f4",800,350,280,50,"green")
eng.world.createRect("mainf",-200,700,1500,50,"red")
eng.world.createRect("f5",-200,600,100,25,"blue")



const ready = (canvas: EngineRender) => {
    console.log("ready");
    canvas.fillRect(1,1,50,50,"black")
}

let blackframe = 0

let grav = 1
var pvel = {x:0,y:0}
let onground = false
const update = (render:EngineRender,input:EngineInput) => {
    
    

    


    
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
    
    pvel.y += grav
    Object.keys(eng.world.list).forEach((key) => {
        let obj = eng.world.getObject(key)
        let cl = eng.collisions.advancedrect(player,obj)
        let sensitivity = 0
        if (cl.side =="up" && pvel.y <= 0) {
            player.y += cl.depth
            pvel.y = 0
        }
        if (cl.side =="down" && pvel.y >= 0) {
            onground = true
            player.y += cl.depth
            pvel.y = 0
            
            
        } else {
            
        }
        if (cl.side == "left" && pvel.x <= 0) {
            player.x += cl.depth
        }
        if (cl.side =="right" && pvel.x >= 0) {
            player.x += cl.depth
        }
        
    }
    )

    if (player.x < 50) {
        player.x = 50
        eng.world.moveWorld(-pvel.x,0)
    } 

    if (player.x +player.w > 450) {
        player.x  = 450-player.w
        eng.world.moveWorld(-pvel.x,0)
    }

    if (player.y < 50) {
        player.y = 50
        eng.world.moveWorld(0,-pvel.y)
    } 

    if (player.y + player.h > 450) {
        player.y  = 450-player.h
        eng.world.moveWorld(0,-pvel.y)
    } 
    

    if (pvel.y > 15) {
        pvel.y = 15
    }
    
    



    render.fillRect(0,0,render.canvas.width, render.canvas.height,"black")

    render.objectRect(player)

    Object.keys(eng.world.list).forEach((key) => {
        render.objectRect(eng.world.getObject(key))
    })
}


        

const input = (canvas: CanvasRenderingContext2D, event: KeyboardEvent) => {
    console.log(event.key);
    
}
