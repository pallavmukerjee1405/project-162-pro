AFRAME.registerComponent("bowling-balls",{
    init: function(){
        this.Bowl();
    },

    Bowl: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key === "z"){
                var bowl=document.createElement("a-entity");

                bowl.setAttribute("geometry",{
                    primitive:"sphere",
                    radius:0.5,
                });

                bowl.setAttribute("material","color","black");

                var cam=document.querySelector("#camera");

                pos=cam.getAttribute("position");

                bowl.setAttribute("position",{
                    x:pos.x,
                    y:pos.y,
                    z:pos.z,
                });

                var camera=document.querySelector("#camera").object3D;

                var direction=new THREE.Vector3();
                camera.getWorldDirection(direction);

                bowl.setAttribute("velocity",direction.multiplyScalar(-10));

                var scene=document.querySelector("#scene");

                bowl.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                  });
          
                  bowl.addEventListener("collide",this.removeBall);

                scene.appendChild(bowl);

            }
        });
    },

    removeBall: function (e) {
    
        //bullet element
        var element=e.detail.target.el;
    
    
        //element which is hit
        var elementHit=e.detail.body.el;
     
    
        if (elementHit.id.includes("pin")) 
          {
            
    
            //impulse and point vector
            var impulse=new CANNON.Vec3(0,1,-15);
            var worldPoint=new CANNON.Vec3().copy(elementHit.getAttribute("position"));
    
            elementHit.body.applyForce(impulse,worldPoint);
            
    
            //remove event listener
            element.removeEventListener("collide",this.removeBall);
            
            
            //remove the bullets from the scene
            var scene=document.querySelector("#scene");
            scene.removeChild(element);
          
        }
      },
});