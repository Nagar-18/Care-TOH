import React from 'react'
import {useState} from 'react'
import './style.css'
const Tower = () => {
const [moves, setMoves] = useState(0);
  const [discs, setDiscs] = useState(0); 
  const [hold, setHold] = useState(null);
   const [ans, setAns] = useState(null);
   const [currIndex, setCurrIndex] = useState(-1);
 const [towers, setTowers] = useState([
    [[], 'line1'],
    [[], 'line2'],
    [[], 'line3']
  ]);

function towerOfHanoi(n, source, auxiliary, destination) {
  const movements = [];

    function moveDisk(disk, from, to) {
        movements.push([disk, from, to]);
    }

    function hanoiRecursive(n, source, auxiliary, destination) {
        if(n==0)return;
        if (n === 1) {
            moveDisk(1, source, destination);
            return;
        }

        hanoiRecursive(n - 1, source, destination, auxiliary);
        moveDisk(n, source, destination);
        hanoiRecursive(n - 1, auxiliary, source, destination);
    }

    hanoiRecursive(n, source, auxiliary, destination);
      setAns(movements);
  return movements;
}


  const clear = () => {
    
    setTowers([
      [[], 'line1'],
      [[], 'line2'],
      [[], 'line3']
    ]);

    
  };
    const remove = () => {
    
   towers.forEach((tower) => {
        // console.log(tower)
      if (tower[0].length >= 0) {
        
  
                document.querySelector(`.${tower[1]}`).innerHTML=''
       
      }
    });
    
  };

  const drawDiscs = () => {
   
    remove();


    // console.log(towers);
   
    towers.forEach((tower) => {
      if (tower[0].length > 0) {
        
       tower[0].map((disc) => 
            {
                document.querySelector(`.${tower[1]}`).appendChild(
                    document.createElement("li")
                    //  <li key={`disc${disc}`} id={`disc${disc}`} value={disc}></li>
                ).setAttribute("id",`disc${disc}`)
           }
        );
      }
    });
  };

  const init = () => {
     console.log(discs);
    if(discs<=0||discs>7)
    {
        alert('Number of discs should be greater than 0 and less than 8');
        return;
    }
    clear();
    setTowers([
      [[], 'line1'],
      [[], 'line2'],
      [[], 'line3']
    ]);
    setMoves(0);
    setHold(null);

    let temp=new Array(discs);
    for(let i=discs;i>0;i--)
    {
        temp[discs-i]=i;
    }
 let arr=[
      [ temp, 'line1'],
      [[], 'line2'],
      [[], 'line3']
    ]
   setTowers(arr);


    drawDiscs();
    
    const movements = towerOfHanoi(discs, 0, 1, 2);

    setAns(movements);
  };

  const handle = (tower) => {
  
   if(tower>currIndex){ 
   if(tower>=0&&tower<=ans.length)
     {
       
        
        const move = moveDisc(ans[tower][1],ans[tower][2]);

      setMoves((moves)=>moves + 1);
      if (move === 1) {
        {
          
            drawDiscs();
        }
      } 
      setHold(null);
    }setCurrIndex(tower);
}

 else   if(tower>=0&&tower<=ans.length)
     {
        
        
        const move = moveDisc(ans[tower+1][2],ans[tower+1][1]);

      setMoves((moves)=>moves + 1);
      if (move === 1) {
        {
          
            drawDiscs();
        }
      } 
      setHold(null);
      setCurrIndex(tower);
    }
    else{

     const move = moveDisc(ans[0][2],ans[0][1]);

      setMoves((moves)=>moves + 1);
      if (move === 1) {
        {
          
            drawDiscs();
        }
      } 
      setHold(null);
      setCurrIndex(-1);
    }




 
  
  
  };

  const moveDisc = (a, b) => {
   
    const from = towers[a][0];
    const to = towers[b][0];

    if (from.length === 0) return 0;
    else if (to.length === 0) {
      to.push(from.pop());
       
      return 1;
    } else if (from[from.length - 1] > to[to.length - 1]) {
         
      return 0;
      
    } else {
      to.push(from.pop());
      
      return 1;
    }
   
  };

 

  return (
    <div id="canvas">
      
      <br />
      <br />
      <div id="towers">
        <div className="t" value="0" >
          <ul id="t1" value="0" className="base">
            <ul className="line1"></ul>
          </ul>
        </div>
        <div className="t" value="1">
          <ul id="t2" value="1" className="base">
            <ul className="line2"></ul>
          </ul>
        </div>
        <div className="t" value="2" >
          <ul id="t3" value="2" className="base">
            <ul className="line3"></ul>
          </ul>
        </div>
      </div>
      <br />
      <br/>
       <div id="discno">
        <button type="button" className="buttons"  onClick={() => handle(currIndex-1)}>
         prev
        </button>
        <button type="button" className="buttons" onClick={() => handle(currIndex+1)}>
         Next
        </button>
        </div>
      <br />
      <br />
      <div id="discno">
        Enter Number of Discs:{' '}
        <input
          type="number"
          style={{color:"wheat"}}
          id="box"
          max="7"
          min="1"
        //   value={discs}
          onChange={(e) => setDiscs(e.target.value)}
        />
     </div>
      <br />
      <br />
       <div id="restart">
        <button type="button" className="buttons" onClick={() => init()}>
          Restart
        </button>
        <p>Double Click to start</p>
      </div></div>
    
  );
};

export default Tower
